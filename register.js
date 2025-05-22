import { setDoc,doc,db, auth, createUserWithEmailAndPassword,onAuthStateChanged } from "./firebase.js";


let checkAuth = (user) => {
  if (user) {
    saveUserToDataBase(user).then(() => {
      location = "todo.html";
    }).catch((error) => {
      console.log( error);
    });
  }
};

onAuthStateChanged(auth, checkAuth);


export let saveUserToDataBase = async (user)=>{
  try {
    let fullName  = document.getElementById("register-fullName")
    if (fullName.value) {
      
      
      await setDoc(doc(db, "users", user.uid), {
        email : user.email,
        uid: user.uid,
        name: fullName.value
      });
      console.log("user Data adit");
      if (user) {
        location="todo.html";
        
      }
      
    }else{

      Swal.fire({
        icon: 'warning',
        title: 'Required!',
        text: 'Please fill this field.',
        confirmButtonText: 'OK'
      });

    }
    } catch (e) {
      console.error("Error adding document: ", e);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: e,
        confirmButtonText: 'OK'
      });
    }
  }
  
  
  let redister = ()=>{

let  registerEmail = document.getElementById("register-email")
let registerPassword  = document.getElementById("register-password")
      

if(registerEmail.value || registerPassword.value ){

  
  createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
  .then((userCredential) => {
    
    console.log("User saved");
    const user = userCredential.user;
    saveUserToDataBase (user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log("User not saved");
    Swal.fire({
      icon: 'error',
      title: 'An error occurred',
      text: error,
      confirmButtonText: 'OK'
    });


    
  });
}else{
  Swal.fire({
    icon: 'warning',
    title: 'Required!',
    text: 'Please fill this field.',
    confirmButtonText: 'OK'
  });
}
  }
  
let registerBtn = document.getElementById("Register-btn")


registerBtn&&registerBtn.addEventListener("click",redister)


 
  