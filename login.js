import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithRedirect,
getRedirectResult,
setPersistence,
browserLocalPersistence,
browserSessionPersistence,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

/* Firebase Config */

const firebaseConfig = {

apiKey: "AIzaSyBvvJBsJCIcDfUsoIsOvkmd_HLOp8aUcWk",

authDomain: "smsvault.firebaseapp.com",

projectId: "smsvault",

storageBucket: "smsvault.firebasestorage.app",

messagingSenderId: "775113064439",

appId: "1:775113064439:web:c6b5269de8c633e2c7b8f2",

measurementId: "G-XJF6BPG72S"

};

/* Initialize */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

/* Elements */

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const remember = document.getElementById("remember");

const googleBtn = document.getElementById("googleLogin");
/* ===========================
   EMAIL & PASSWORD LOGIN
=========================== */

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const userEmail = email.value.trim();
const userPassword = password.value;

if(userEmail === ""){

showError("Please enter your email address.");
return;

}

if(userPassword === ""){

showError("Please enter your password.");
return;

}

try{

/* Remember Me */

await setPersistence(
auth,
remember.checked
? browserLocalPersistence
: browserSessionPersistence
);

/* Show Loading */

showLoader();

/* Sign In */

await signInWithEmailAndPassword(
auth,
userEmail,
userPassword
);

/* Success */

showSuccess("Login successful! Redirecting...");

/* Go to Dashboard */

setTimeout(()=>{

window.location.href="dashboard.html";

},1500);

}catch(error){

hideLoader();

showError(getFirebaseError(error));

}

});
/* ===========================
   GOOGLE SIGN IN (REDIRECT)
=========================== */

googleBtn.addEventListener("click", async () => {

try{

showLoader();

await signInWithRedirect(auth, provider);

}catch(error){

hideLoader();

showError(getFirebaseError(error));

}

});

/* ===========================
   GOOGLE REDIRECT RESULT
=========================== */

getRedirectResult(auth)
.then((result)=>{

if(result && result.user){

showSuccess("Login successful! Redirecting...");

setTimeout(()=>{

window.location.href="dashboard.html";

},1500);

}

})
.catch((error)=>{

hideLoader();

showError(getFirebaseError(error));

});

/* ===========================
   ALREADY LOGGED IN
=========================== */

onAuthStateChanged(auth, (user)=>{

if(user){

showLoader();

setTimeout(()=>{

window.location.href="dashboard.html";

},1000);

}

});
