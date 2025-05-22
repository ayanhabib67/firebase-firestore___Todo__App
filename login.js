import { auth, signInWithEmailAndPassword, signInWithPopup,onAuthStateChanged,GoogleAuthProvider ,googleProvider} from "./firebase.js";
import { saveUserToDataBase } from "./register.js";




let checkAuth = (user) => {
  if (user) {
    saveUserToDataBase(user).then(() => {
      location = "todo.html";
    }).catch((error) => {
      console.log( error);
    });
  } else {
    // location = "index.html";
  }
};

onAuthStateChanged(auth, checkAuth);










let login = ()=>{


    let loginEmail = document.getElementById("login-email")
    let loginPassword =document.getElementById("login-password")



    if(loginEmail.value || loginPassword.value){

      
      signInWithEmailAndPassword(auth, loginEmail.value , loginPassword.value)
      .then((userCredential) => {
        
        location ="todo.html"
        console.log("done login");
        
        
        const user = userCredential.user;
        
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(" not done login");

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


let loginBtn = document.getElementById("login-btn")


loginBtn&&loginBtn.addEventListener("click",login)










 export  let  google = ()=>{
   signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      location="todo.html"
      
      
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      
    });


}



let googleBtn = document.getElementById("google-Btn")
googleBtn&&googleBtn.addEventListener("click",google) 


