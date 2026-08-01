// =============================
// SMSVault Authentication Helper
// =============================

const authMessage = document.getElementById("authMessage");

function showSuccess(message){

if(!authMessage) return;

authMessage.className = "auth-message success";
authMessage.innerHTML = message;
authMessage.style.display = "block";

setTimeout(()=>{
authMessage.style.display = "none";
},3000);

}

function showError(message){

if(!authMessage) return;

authMessage.className = "auth-message error";
authMessage.innerHTML = message;
authMessage.style.display = "block";

setTimeout(()=>{
authMessage.style.display = "none";
},4000);

}

function getFirebaseError(error){

switch(error.code){

case "auth/invalid-email":
return "Please enter a valid email address.";

case "auth/user-not-found":
return "Account not found.";

case "auth/wrong-password":
return "Invalid email or password.";

case "auth/invalid-credential":
return "Invalid email or password.";

case "auth/email-already-in-use":
return "This email is already registered.";

case "auth/weak-password":
return "Password must contain at least 6 characters.";

case "auth/network-request-failed":
return "No internet connection.";

case "auth/too-many-requests":
return "Too many attempts. Please try again later.";

case "auth/missing-password":
return "Please enter your password.";

case "auth/missing-email":
return "Please enter your email address.";

default:
return "Something went wrong. Please try again.";

}

}
