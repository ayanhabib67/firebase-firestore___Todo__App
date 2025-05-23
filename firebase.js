  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
  import {updateProfile, getAuth, GoogleAuthProvider,signInWithPopup ,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut, deleteUser,sendEmailVerification,sendPasswordResetEmail }  from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
 import { query,orderBy, deleteDoc , serverTimestamp ,onSnapshot , getFirestore ,collection,  getDoc,addDoc ,doc, setDoc,updateDoc} from"https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js"



  const firebaseConfig = {
    apiKey: "AIzaSyDFTrO1AgxhaYggK-pWVWrlDBNgVhkXp6U",
    authDomain: "smit-project-22d52.firebaseapp.com",
    projectId: "smit-project-22d52",
    storageBucket: "smit-project-22d52.firebasestorage.app",
    messagingSenderId: "618640502669",
    appId: "1:618640502669:web:e8fa3adc8fa6e466f597c4",
    measurementId: "G-XLHBN6SWCK"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);




  const googleProvider = new GoogleAuthProvider();



export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
     deleteUser,
     sendEmailVerification,
     sendPasswordResetEmail,
     GoogleAuthProvider,
     googleProvider ,
     signInWithPopup,
     db,
     collection,
    addDoc ,
    doc, 
    setDoc,
    getDoc,
    updateProfile,
    updateDoc,
    serverTimestamp,
    onSnapshot ,
    query,
    orderBy,
    deleteDoc


}

