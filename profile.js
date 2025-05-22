


import { auth,onAuthStateChanged ,getDoc ,signOut, deleteUser,sendEmailVerification, doc ,db ,signInWithPopup,googleProvider } from "./firebase.js";




let logout = ()=>{
    signOut(auth).then(() => {

        // console.log("logout  sucessfull");
        
        // location="index.html"
        
      }).catch((error) => {
        Swal.fire({
          title: 'Login Failed',
          text: error,
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      });


}

let LogoutBtn = document.getElementById("Logout-Btn")
LogoutBtn.addEventListener("click",logout)







let deleted = ()=>{
    const user = auth.currentUser; 
    deleteUser(user).then(() => {
        console.log(user);
        
      }).catch((error) => {
        

        Swal.fire({
          icon: 'error',
          title: 'An error occurred',
          text: error,
          confirmButtonText: 'OK'
        });
      });
} 

let deletedBtn = document.getElementById("deleted-Btn")
deletedBtn.addEventListener("click",deleted)





let googlrVarify = ()=>{

    sendEmailVerification(auth.currentUser)
    .then(() => {
      
      console.log("yes");
      Swal.fire({
        icon: 'info',
        title: 'Verification',
        text: 'Verification will be sent to your email/phone.',
        confirmButtonText: 'OK'
      })
      
      
    })
    .catch((error)=>{
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: error,
        confirmButtonText: 'OK'
      });
    })


}
let varifyBtn = document.getElementById("varify-Btn")
varifyBtn.addEventListener("click",googlrVarify)






let spinner = document.getElementById("spinner")
let content = document.getElementById("content")



let getData = async ()=>{
  let user =auth.currentUser
    const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

spinner.style.display="none"
  content.style.display="block"
let div =document.getElementById("div")
let div2 =document.getElementById("div2")
div.innerHTML=`${docSnap.data().name}<br>`
div2.innerHTML=`${docSnap.data().email}`
// console.log(docSnap);

} else {
console.log("No such document!");
spinner.style.display="none"
  content.style.display="block"
signInWithPopup(auth, googleProvider)
.then((result) => {
  const user = result.user.displayName;
  let email = result.user.email
  console.log(user,email); 
  let div3 =document.getElementById("div3")
  let div4 =document.getElementById("div4")
  div3.innerHTML=`${user}`
  div4.innerHTML=`${email}`

})
  .catch((error) => {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'An error occurred',
      text: error,
      confirmButtonText: 'OK'
    });
});
}
}




onAuthStateChanged(auth, (user) => {
if (user) {
  getData(user); 
  checkEmailVarify(user)
  
  // console.log("User",user);
} else {
  console.log("No user logged in");
  
  
  location = "index.html";
}
});






let checkEmailVarify =(user)=>{
if (user.emailVerified) {
varifyBtn.style.display ="none"
let verification = document.getElementById("verification")
verification.innerHTML=` <div class="verification-status" id="verification">
            <i class="fas fa-check-circle"></i>
            <span id="verification-status" > Verified</span>
        </div>`
}
}


let home = document.getElementById("home")
home.addEventListener("click",()=>{
  location="todo.html"
})






