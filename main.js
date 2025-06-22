// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBvDOY1RganlcrHPOKqANwEVxVr5m1KZwI",
  authDomain: "dartmouth-climbing-gym.firebaseapp.com",
  projectId: "dartmouth-climbing-gym",
  storageBucket: "dartmouth-climbing-gym.appspot.com",
  messagingSenderId: "862046563935",
  appId: "1:862046563935:web:3e09993dd977d85277b5ea"
};

const USAGE_LOG_REF = "usage_log";
const PUBLIC_REF = "public";
const USERS_REF = "users";

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

// From previous version
async function getName(netid) {
  const userdoc = db.collection(USERS_REF).doc(netid);
  const doc = await userdoc.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data().name;
  }
}

async function getpw() {
  const ref = db.collection('admin').doc('identification');
  const doc = await ref.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data().pw;
  }
}

async function signinout(){
  const netid = document.getElementById("netid").value.toLowerCase();
  const time = Date.now();
  const name = await getName(netid);
  if(name == null){
    alert("Please sign the waiver first!");
    return false;
  }
  
  const ref = db.collection(USAGE_LOG_REF);
  const snapshot = await ref.where('netid', '==', netid).where('signout', '==', 0).get();
  if (snapshot.empty) {
    await signin(netid, time);
    alert("signed in!");
    return true;
  }
  var found = false;
  await snapshot.forEach(doc => {
    if(doc.data().signout == 0) {
      doc.ref.update({signout: time});
      timein = doc.data().signin;
      anon_signout(timein);
      found = true;
    }
  });
  if(!found) {
    await signin(netid, time);
    // await addtocount(1);
    alert("signed in!");
  } else {
    // await addtocount(-1);
    alert("signed out!");
  }
  return true;
}

async function anon_signout(timein) {
  const ref = db.collection(PUBLIC_REF);
  const snapshot = await ref.where('signin', '==', timein).get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }
  found = 0;
  snapshot.forEach(doc => {
    if(found == 0){
      doc.ref.delete();
      found = 1;
    }
  });
}

async function signout_individual(netid, timein) {
  const usageRef = db.collection(USAGE_LOG_REF);
  const snapshot = await usageRef
    .where('netid', '==', netid)
    .where('signin', '==', timein)
    .where('signout', '==', 0)
    .get();

  const time = Date.now();

  if (snapshot.empty) {
    alert(`No active session found for ${netid}`);
    return;
  }

  snapshot.forEach(doc => {
    doc.ref.update({ signout: time });
  });

  await anon_signout(timein);
  alert(`Signed out ${netid}`);
  await settable(); // refresh the table
}

async function signout_all() {
  const confirmation = confirm("You are about to sign out everyone. Are you sure?");
  if (!confirmation) return;

  const ref = await db.collection(PUBLIC_REF).get();
  const snapshot = await db.collection(USAGE_LOG_REF).where('signout', '==', 0).get();
  const time = Date.now();

  await ref.forEach(doc => {
    anon_signout(doc.data().signin);
  });

  await snapshot.forEach(doc => {
    doc.ref.update({ signout: time });
  });

  alert("Signed out all!");
  await settable(); // give time to load user
}

async function signin(netid, time) {
  const data = {
    netid: netid,
    signin: time,
    signout: 0
  }
  const anon_data = {
    signin: time,
  }
  await db.collection(USAGE_LOG_REF).add(data);
  await db.collection(PUBLIC_REF).add(anon_data);
  // const name = getName(netid);
}

// Updated with signout one
async function settable() {
  const ref = db.collection(USAGE_LOG_REF);
  const snapshot = await ref.where("signout", "==", 0).get();
  var table = "<tr><th>Net ID</th><th>Name</th><th>Sign In Time</th><th>Time Climbing</th><th>Actions</th></tr>";

  snapshot.forEach(doc => {
    const netid = doc.data().netid;
    const timein = doc.data().signin;

    getName(netid).then(name => {
      table += `
        <tr>
          <td>${netid}</td>
          <td>${name}</td>
          <td>${new Date(timein).toLocaleTimeString()}</td>
          <td>${Math.round((Date.now() - timein) / 60000)} minutes</td>
          <td><button class="btn btn-danger btn-sm" onclick="signout_individual('${netid}', ${timein})">Sign Out</button></td>
        </tr>`;
      document.getElementById("climbers").innerHTML = table;
    });
  });

  document.getElementById("climbers").innerHTML = table;
}

async function settablecount() {
  const ref = db.collection(PUBLIC_REF);
  const snapshot = await ref.get();
  var table = "<tr><th>Sign In Time</th><th>Time Climbing</th></tr>";
  snapshot.forEach(doc => {
    climbers += 1;
    table += "<tr><td>" + new Date(doc.data().signin).toLocaleTimeString()+"</td><td>" + Math.round((Date.now()-doc.data().signin)/60000) + " minutes</td></tr>";
    document.getElementById("climbers").innerHTML = table;
  });
  document.getElementById("num").innerHTML = "Active Climbers: " + snapshot.size;
}

async function downloadcsv() {
  const ref = db.collection(USAGE_LOG_REF);
  const snapshot = await ref.where("signout", "!=", 0).get();
  var csv = "netid,signin,signout\n";
  snapshot.forEach(doc => {
    try{
      csv += doc.data().netid + "," + new Date(doc.data().signin).toLocaleString().replaceAll(',','') + "," + new Date(doc.data().signout).toLocaleString().replaceAll(',','') + "\n";
    } catch(err) {
      console.log(err);
    }
  });
  downloadCSVFile(csv);
}

async function getcount() {
  const ref = db.collection(PUBLIC_REF).doc('info');
  const doc = await ref.get();
  if (!doc.exists) {
    return 0;
  } else {
    return doc.data().climbers;
  }
}

async function addtocount(num) {
  const currcount = await getcount();
  console.log("Current climbers are: ", currcount);
  const newcount = currcount + num;
  const data = {
    climbers: newcount
  };
  await db.collection(PUBLIC_REF).doc("info").set(data);
}


async function adminsignin() {
  const upw = document.getElementById("password").value;
  const success = await fbusersignin("climbinggym@dartmouth.edu", upw);
  if(success) {
    document.getElementById("admin").style.display = "block";
    document.getElementById("signin").style.display = "none";
    settable();
    setInterval(settable, 60000);
  } else {
    alert("Incorrect password!");
  }
}

function downloadCSVFile(csv_data) {
 
  // Create CSV file object and feed our
  // csv_data into it
  CSVFile = new Blob([csv_data], { type: "text/csv" });

  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement('a');

  // Download csv file
  temp_link.download = "cdg_signins.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}