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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

firebase.auth().onAuthStateChanged((user) => {
  if(user) loadpage();
});

async function fbusersignin(email, password) {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    user = userCredential.user;
    return true
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    return false;
  });
}

async function signWaiver() {
  const netid = document.getElementById("netid").value.toLowerCase();
  const name = document.getElementById("name").value;
  const data = {
    netid: netid,
    name: name
  }
  await db.collection(USERS_REF).doc(netid).set(data);
  alert("Signed Waiver!");
}

async function getName(netid) {
  const userdoc = db.collection(USERS_REF).doc(netid);
  const doc = await userdoc.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data().name;
  }
}

async function checkApproved(netid) {
  const userdoc = db.collection(USERS_REF).doc(netid);
  const doc = await userdoc.get();
  if (!doc.exists) {
    return false;
  } else {
    return (typeof(doc.data().monitor_approved) != 'undefined') && (doc.data().monitor_approved);
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
  const approved = await checkApproved(netid);
  if(!approved) {
    alert("Please have a monitor approve your payment status first!");
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

/**
 * Signs out all climbers currently signed in on the public webpage - updates firestore
 * @returns nothing
 * @author Sebastian Frazier
 */
async function signout_all() {
  const ref = await db.collection(PUBLIC_REF).get(); // Public climbers sheet
  const snapshot = await db.collection(USAGE_LOG_REF).where('signout', '==', 0).get();
  const time = Date.now();

  await ref.forEach(doc => {
    anon_signout(doc.data().signin) // signout each climber currently signed in
  })

  await snapshot.forEach(doc => {
      doc.ref.update({signout: time}); // Update the firebase
  });
  alert("Signed out all!")
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

async function settable() {
  const ref = db.collection(USAGE_LOG_REF);
  const snapshot = await ref.where("signout", "==", 0).get();
  var table = "<tr><th>Net ID</th><th>Name</th><th>Sign In Time</th><th>Time Climbing</th></tr>";
  snapshot.forEach(doc => {
    getName(doc.data().netid).then(name => {
      table += "<tr><td>" + doc.data().netid + "</td><td>" + name + "</td><td>" + new Date(doc.data().signin).toLocaleTimeString()+"</td><td>" + Math.round((Date.now()-doc.data().signin)/60000) + " minutes</td></tr>";
      document.getElementById("climbers").innerHTML = table;
    });
  });
  document.getElementById("climbers").innerHTML = table;
}

/**
* @function - Set values for OPO payment table on DCG Website - do not alter firestore values
* @returns nothing
* @author Sebastian Frazier
 */
async function setopotable() {
  const ref = db.collection(USERS_REF); // All known users
  snapshot = await ref.get();
  var table = "<tr><th>Net ID</th><th>Name</th><th>Approved</th></tr>"; //table of climbers approved by Monitor
  snapshot.forEach(doc => {
    tempnetid = doc.data().netid
    getName(tempnetid).then(name => {
      table += "<tr><td>" + tempnetid + "</td><td>" + name + "</td><td>" + "</td><input type='checkbox' onchange=opoapprove(tempnetid) ><td>"; // Update table on webpage
      document.getElementById("payments").innerHTML = table;
    });
  });
  document.getElementById("payments").innerHTML = table;
}
/**
* @function: Sets payment approval status of user as true or false in firestore
* @param netid - netid of user being (un)approved for payment
* @returns nothing
* @author Sebastian Frazier
 */
async function opoapprove(netid) {
  const ref = db.collection(USERS_REF); // All users
  snapshot = await ref.where("netid", "==", netid).where("monitor_approved", "==", true).get();

  if (snapshot.empty) {
    alert("user not found!"); // check if no approved climbers
  }
  else {
    snapshot.forEach(doc => {
      if (doc.data().opo_approved !== undefined) doc.ref.update({opo_approved: !doc.data().opo_approved}) // If climber has no value & is checked off by OPO, approve them

      else doc.ref.update({opo_approved: true}) // If climber has a value, reverse it on click (allows approval and unapproval).
      });
  }
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

/**
 * Downloads CSV file of all signins/outs of the climbing gym for OPO usage
 * @returns nothing
 * @author Luc Cote
 */
async function downloadcsv() {
  const ref = db.collection(USAGE_LOG_REF); // all known signins
  const snapshot = await ref.where("signout", "!=", 0).get(); // only collect where users have signed out too
  var csv = "netid,signin,signout\n"; // create csv file
  snapshot.forEach(doc => {
    try{
      csv += doc.data().netid + "," + new Date(doc.data().signin).toLocaleString().replaceAll(',','') + "," + new Date(doc.data().signout).toLocaleString().replaceAll(',','') + "\n"; // Add climber data to a CSV file
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

async function addpayinguser() {
  const netid = document.getElementById("netid").value.toLowerCase();
  const ref = db.collection(USERS_REF);
  const snapshot = await ref.where('netid', '==', netid).get();
  if (snapshot.empty) {
    alert("user not found!");
  }
  else {
    snapshot.forEach(doc => {
      doc.ref.update({monitor_approved: true});
    });
    alert("User Approved!");
  }
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

/**
 * Create & download a CSV file from a given data source.
 * @param csv_data
 * @returns nothing
 * @author _
 */
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