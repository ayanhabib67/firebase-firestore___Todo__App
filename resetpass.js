import { auth,sendPasswordResetEmail } from "./firebase.js";


let reset = ()=>{

  let registerpasswordBtn = document.getElementById("register-password-Btn")
  

if (registerpasswordBtn.value) {
  
  
  sendPasswordResetEmail(auth, registerpasswordBtn.value)
  .then(() => {
    
      console.log("yes");
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: error,
        confirmButtonText: 'OK'
      });
      // ..
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

let sendEmail = document.getElementById("Send-Email")
sendEmail.addEventListener("click",reset)


