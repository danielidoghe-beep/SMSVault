import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
GoogleAuthProvider,
signInWithRedirect,
getRedirectResult,
updateProfile
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

/* Firebase */

const firebaseConfig={

apiKey:"AIzaSyBvvJBsJCIcDfUsoIsOvkmd_HLOp8aUcWk",

authDomain:"smsvault.firebaseapp.com",

projectId:"smsvault",

storageBucket:"smsvault.firebasestorage.app",

messagingSenderId:"775113064439",

appId:"1:775113064439:web:c6b5269de8c633e2c7b8f2",

measurementId:"G-XJF6BPG72S"

};

const app=initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);

const provider=new GoogleAuthProvider();

/* Elements */

const form=document.getElementById("signupForm");

const firstName=document.getElementById("firstName");

const lastName=document.getElementById("lastName");

const email=document.getElementById("email");

const password=document.getElementById("password");

const googleBtn=document.getElementById("googleSignup");
/* ===========================
   EMAIL SIGN UP
=========================== */

form.addEventListener("submit", async(e)=>{

e.preventDefault();

const fName=firstName.value.trim();
const lName=lastName.value.trim();
const userEmail=email.value.trim();
const userPassword=password.value;

if(fName===""){
showError("Please enter your first name.");
return;
}

if(lName===""){
showError("Please enter your last name.");
return;
}

if(userEmail===""){
showError("Please enter your email address.");
return;
}

if(userPassword.length<6){
showError("Password must contain at least 6 characters.");
return;
}

try{

showLoader();

/* Create Account */

const credential=
await createUserWithEmailAndPassword(
auth,
userEmail,
userPassword
);

const user=credential.user;

/* Update Firebase Profile */

await updateProfile(user,{

displayName:fName

});

/* Save User */

await setDoc(doc(db,"users",user.uid),{

uid:user.uid,

firstName:fName,

lastName:lName,

fullName:fName+" "+lName,

displayName:fName,

email:user.email,

photoURL:"",

walletBalance:0,

totalSpent:0,

accountType:"User",

createdAt:serverTimestamp(),

notification:{
title:"Welcome!",
message:"Your account has been successfully created.",
read:false
}

});

/* Success */

showSuccess("Account created successfully! Redirecting...");

/* Save Notification */

sessionStorage.setItem(
"welcomeNotification",
"Your account has been successfully created."
);

/* Redirect */

setTimeout(()=>{

window.location.href="dashboard.html";

},1500);

}catch(error){

hideLoader();

showError(getFirebaseError(error));

}

});
/* ===========================
   GOOGLE SIGN UP
=========================== */

googleBtn.addEventListener("click", async()=>{

try{

showLoader();

await signInWithRedirect(auth,provider);

}catch(error){

hideLoader();

showError(getFirebaseError(error));

}

});

/* ===========================
   GOOGLE REDIRECT RESULT
=========================== */

getRedirectResult(auth)

.then(async(result)=>{

if(!result) return;

const user=result.user;

/* Get Display Name */

let displayName=user.displayName;

if(!displayName || displayName.trim()===""){

displayName=user.email.split("@")[0];

}

/* Save User */

await setDoc(doc(db,"users",user.uid),{

uid:user.uid,

firstName:displayName,

lastName:"",

fullName:displayName,

displayName:displayName,

email:user.email,

photoURL:user.photoURL || "",

walletBalance:0,

totalSpent:0,

accountType:"User",

createdAt:serverTimestamp(),

notification:{
title:"Welcome!",
message:"Your account has been successfully created.",
read:false
}

},{merge:true});

/* Success */

showSuccess("Account created successfully! Redirecting...");

/* Dashboard Notification */

sessionStorage.setItem(
"welcomeNotification",
"Your account has been successfully created."
);

setTimeout(()=>{

window.location.href="dashboard.html";

},1500);

})

.catch((error)=>{

hideLoader();

showError(getFirebaseError(error));

});

/* ===========================
   PASSWORD SHOW/HIDE
=========================== */

const togglePassword=document.getElementById("togglePassword");

togglePassword.addEventListener("click",()=>{

if(password.type==="password"){

password.type="text";

togglePassword.innerHTML='<i class="fa-regular fa-eye-slash"></i>';

}else{

password.type="password";

togglePassword.innerHTML='<i class="fa-regular fa-eye"></i>';

}

});

/* ===========================
   SIDE MENU
=========================== */

const menuBtn=document.getElementById("menuBtn");

const menuOverlay=document.getElementById("menuOverlay");

menuBtn.addEventListener("click",()=>{

menuOverlay.classList.toggle("show");

});

menuOverlay.addEventListener("click",(e)=>{

if(e.target===menuOverlay){

menuOverlay.classList.remove("show");

}

});

/* ===========================
   LOADER
=========================== */

const loader=document.getElementById("pageLoader");

function showLoader(){

loader.classList.add("show");

}

function hideLoader(){

loader.classList.remove("show");

}
