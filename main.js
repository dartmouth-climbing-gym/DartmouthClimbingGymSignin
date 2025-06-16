// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBvDOY1RganlcrHPOKqANwEVxVr5m1KZwI",
  authDomain: "dartmouth-climbing-gym.firebaseapp.com",
  projectId: "dartmouth-climbing-gym",
  storageBucket: "dartmouth-climbing-gym.appspot.com",
  messagingSenderId: "862046563935",
  appId: "1:862046563935:web:3e09993dd977d85277b5ea"
};

const USAGE_LOG_REF = "usage_log_test";
const PUBLIC_REF = "public_test";
const USERS_REF = "users_test";

var user = null;
let lastSigned = 0;

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Anonymous sign-in for waiver page
async function anonymousLogin() {
  try {
    await firebase.auth().signInAnonymously();
  } catch (err) {
    console.error('Anonymous login failed', err);
  }
}
anonymousLogin();

// Attach listeners once auth state is ready
firebase.auth().onAuthStateChanged((u) => {
  user = u;
  // Waiver form listener
  const waiverForm = document.getElementById('waiverform');
  if (waiverForm) {
    waiverForm.addEventListener('submit', signWaiver);
  }
  // Existing admin logic
  if (user) loadpage();
});

// Validate based on category
function validateInput(category, id) {
  const regex = {
    'Undergraduate': /^f00\d[0-9a-zA-Z]{3}$/,
    'Faculty': /^d\d{4}[0-9a-zA-Z]{2}$/,
    'Other': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };
  return regex[category].test(id);
}

// Waiver submission handler
async function signWaiver(event) {
  event.preventDefault();

  const currentTime = Date.now();
  if (currentTime - lastSigned < 5000) { // 5 second rate-limit
    alert("Please wait a few seconds before signing again.");
    return;
  }
  // Stamp immediately to enforce rate limit before any await
  lastSigned = currentTime;

  const category = document.getElementById('category').value;
  const id = document.getElementById('id').value.trim().toLowerCase();
  const name = document.getElementById('name').value.trim();

  if (!validateInput(category, id)) {
    alert('Invalid ID or Email format.');
    return;
  }

  try {
    const userRef = db.collection(USERS_REF).doc(id);
    const docSnap = await userRef.get();
    if (docSnap.exists) {
      alert('Waiver already signed.');
      return;
    }
    await userRef.set({ id, name, category });
    alert('Waiver signed successfully!');
    document.getElementById('waiverform').reset();
  } catch (err) {
    console.error('Error signing waiver', err);
    alert('Failed to sign waiver. Please try again.');
  }
}

// Existing backend helpers and admin functions
async function fbusersignin(email, password) {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((cred) => { user = cred.user; return true; })
    .catch(() => false);
}

async function getName(netid) {
  const doc = await db.collection(USERS_REF).doc(netid).get();
  return doc.exists ? doc.data().name : null;
}

async function getpw() {
  const doc = await db.collection('admin').doc('identification').get();
  return doc.exists ? doc.data().pw : null;
}

async function signinout() {
  const netid = document.getElementById("netid").value.toLowerCase();
  const time = Date.now();
  const name = await getName(netid);
  if (!name) { alert("Please sign the waiver first!"); return false; }
  const ref = db.collection(USAGE_LOG_REF);
  const snapshot = await ref.where('netid', '==', netid).where('signout', '==', 0).get();
  if (snapshot.empty) { await signin(netid, time); alert("signed in!"); return true; }
  let found = false;
  snapshot.forEach(doc => {
    if (doc.data().signout === 0) {
      doc.ref.update({ signout: time });
      anon_signout(doc.data().signin);
      found = true;
    }
  });
  if (!found) { await signin(netid, time); alert("signed in!"); } else { alert("signed out!"); }
  return true;
}

async function anon_signout(timein) {
  const snapshot = await db.collection(PUBLIC_REF).where('signin', '==', timein).get();
  if (!snapshot.empty) {
    snapshot.docs[0].ref.delete();
  }
}

async function signout_individual(netid, timein) {
  const snapshot = await db.collection(USAGE_LOG_REF)
    .where('netid','==',netid).where('signin','==',timein).where('signout','==',0).get();
  if (snapshot.empty) { alert(`No active session for ${netid}`); return; }
  const time = Date.now();
  snapshot.docs.forEach(doc => doc.ref.update({ signout: time }));
  await anon_signout(timein);
  alert(`Signed out ${netid}`);
  await settable();
}

async function signout_all() {
  if (!confirm("You are about to sign out everyone. Are you sure?")) return;
  const anonSnap = await db.collection(PUBLIC_REF).get();
  anonSnap.forEach(doc => anon_signout(doc.data().signin));
  const snap = await db.collection(USAGE_LOG_REF).where('signout','==',0).get();
  const time = Date.now();
  snap.docs.forEach(doc => doc.ref.update({ signout: time }));
  alert("Signed out all!");
  await settable();
}

async function signin(netid, time) {
  await db.collection(USAGE_LOG_REF).add({ netid, signin: time, signout: 0 });
  await db.collection(PUBLIC_REF).add({ signin: time });
}

async function settable() {
  const ref = db.collection(USAGE_LOG_REF);
  const snapshot = await ref.where("signout","==",0).get();
  let table = `<tr><th>Net ID</th><th>Name</th><th>Sign In Time</th><th>Time Climbing</th><th>Actions</th></tr>`;
  snapshot.docs.forEach(doc => {
    const { netid, signin } = doc.data();
    getName(netid).then(name => {
      table += `<tr><td>${netid}</td><td>${name}</td><td>${new Date(signin).toLocaleTimeString()}</td><td>${Math.round((Date.now()-signin)/60000)} minutes</td><td><button class="btn btn-danger btn-sm" onclick="signout_individual('${netid}',${signin})">Sign Out</button></td></tr>`;
      document.getElementById("climbers").innerHTML = table;
    });
  });
  document.getElementById("climbers").innerHTML = table;
}

async function settablecount() {
  const snapshot = await db.collection(PUBLIC_REF).get();
  let table = `<tr><th>Sign In Time</th><th>Time Climbing</th></tr>`;
  snapshot.docs.forEach(doc => {
    const time = doc.data().signin;
    table += `<tr><td>${new Date(time).toLocaleTimeString()}</td><td>${Math.round((Date.now()-time)/60000)} minutes</td></tr>`;
  });
  document.getElementById("climbers").innerHTML = table;
  document.getElementById("num").innerHTML = `Active Climbers: ${snapshot.size}`;
}

async function downloadcsv() {
  const snapshot = await db.collection(USAGE_LOG_REF).where("signout","!=",0).get();
  let csv = "netid,signin,signout\n";
  snapshot.docs.forEach(doc => {
    const { netid, signin, signout } = doc.data();
    csv += `${netid},${new Date(signin).toLocaleString().replaceAll(',', '')},${new Date(signout).toLocaleString().replaceAll(',', '')}\n`;
  });
  downloadCSVFile(csv);
}

async function getcount() {
  const doc = await db.collection(PUBLIC_REF).doc('info').get();
  return doc.exists ? doc.data().climbers : 0;
}

async function addtocount(num) {
  const curr = await getcount();
  await db.collection(PUBLIC_REF).doc('info').set({ climbers: curr + num });
}

async function adminsignin() {
  const pw = document.getElementById("password").value;
  if (await fbusersignin("climbinggym@dartmouth.edu", pw)) {
    document.getElementById("admin").style.display = "block";
    document.getElementById("signin").style.display = "none";
    settable();
    setInterval(settable, 60000);
  } else {
    alert("Incorrect password!");
  }
}

function downloadCSVFile(csv_data) {
  const blob = new Blob([csv_data], { type: "text/csv" });
  const link = document.createElement('a');
  link.download = "dcg_signins.csv";
  link.href = URL.createObjectURL(blob);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}