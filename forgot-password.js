import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
getAuth,
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

/* Firebase */

const firebaseConfig = {

apiKey:"AIzaSyBvvJBsJCIcDfUsoIsOvkmd_HLOp8aUcWk",

authDomain:"smsvault.firebaseapp.com",

projectId:"smsvault",

storageBucket:"smsvault.firebasestorage.app",

messagingSenderId:"775113064439",

appId:"1:775113064439:web:c6b5269de8c633e2c7b8f2",

measurementId:"G-XJF6BPG72S"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/* Elements */

const email = document.getElementById("email");

const resetBtn = document.getElementById("resetBtn");

const messageBox = document.getElementById("messageBox");

let countdown = 60;
let timer = null;

/* Message Functions */

function showSuccess(message){

messageBox.innerHTML = message;

messageBox.className = "success-message";

}

function showError(message){

messageBox.innerHTML = message;

messageBox.className = "error-message";

}
/* ===========================
   SEND RESET EMAIL
=========================== */

resetBtn.addEventListener("click", async () => {

const userEmail = email.value.trim();

if(userEmail===""){

showError("Please enter your email address.");

return;

}

try{

await sendPasswordResetEmail(auth,userEmail);

showSuccess(`

<b>Reset link sent successfully!</b><br><br>

A password reset link has been sent to your email.<br><br>

Check your <b>Spam</b> folder if you don't see it in your Inbox.<br><br>

Tap <b>"Not spam"</b>, then return to your Inbox and open the reset email.<br><br>

This helps future emails arrive directly in your Inbox.

`);

startCountdown();

}catch(error){

switch(error.code){

case "auth/user-not-found":

showError("No account exists with this email address.");

break;

case "auth/invalid-email":

showError("Please enter a valid email address.");

break;

case "auth/missing-email":

showError("Please enter your email address.");

break;

case "auth/too-many-requests":

showError("Too many requests. Please try again later.");

break;

default:

showError("Unable to send reset email. Please try again.");

}

}

});


/* ===========================
   COUNTDOWN
=========================== */

function startCountdown(){

clearInterval(timer);

countdown=60;

resetBtn.disabled=true;

resetBtn.innerHTML=`Resend in ${countdown}s`;

timer=setInterval(()=>{

countdown--;

resetBtn.innerHTML=`Resend in ${countdown}s`;

if(countdown<=0){

clearInterval(timer);

resetBtn.disabled=false;

resetBtn.innerHTML="Send reset code";

}

},1000);

}
