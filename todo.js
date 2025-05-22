
import{serverTimestamp, updateDoc,doc, deleteDoc ,auth,db, collection, addDoc ,onSnapshot ,query,orderBy,onAuthStateChanged } from "./firebase.js";




let cheackAuth =(user)=>{

    if(user ){
        let addTodo = document.getElementById("addTodo")

  
  
  
  
  
// if (addTodo.value) {
    
    
    
    
    addTodo.addEventListener("click", async()=>{
      
        let todo =document.getElementById("todo")
        
        let todoData = {
          todo:todo.value ,
          completed :false,
          timeatamp:serverTimestamp(),
        }
        
        let dbRef  =collection(db,user.uid)
        

await addDoc(dbRef,todoData)


console.log("todo added");


console.log(todoData);
todo.value =""
})




let list =document.getElementById("list")

let getTodos = async ()=>{
    let collectionRef  =collection(db,user.uid)
    
    let dbRef = query(collectionRef,orderBy("timeatamp" ,"asc"))
    
    await onSnapshot(dbRef,(snapshot)=>{
        list.innerHTML=""
        
        snapshot.forEach((doc) => {
            let data =doc.data()
            // console.log(data?.timeatamp?.toDate?.());
            

let fireStoreDate = data?.timeatamp?.toDate?.()
let time = moment(fireStoreDate).format(' hh:mm:ss');
let date  =  moment(fireStoreDate).format('DD/MM/YYYY');




list.innerHTML+=`<li>  <label class="todo-checkbox">
<input 
type="checkbox" 
${data.completed ? 'checked' : ''}
onClick="completeTodo('${doc.id}',${data.completed})"
/>
<span class="checkmark"></span>
<span class="todo-text">${data.todo}</span>

</label>
<div class="time-date-display">
<div class="time">${time}</div>&nbsp;&nbsp;&nbsp<div class="date">${date}</div>




<br><br>   <button class="delete-btn" onClick="deleteTodo('${doc.id}')" > <i class="fas fa-trash-alt"></i> Delete</button>&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp<button class="edit-btn" id="editTodo"   onClick="editTodo('${doc.id}','${data.todo}')">  <i class="fas fa-edit"></i> Edit</button><li/>


   <hr> </div>`
   
   
   
   
   
   
   
   
});

})




}

getTodos()


let profileView =()=>{
    location="profile.html"
}



let viewProfile = document.getElementById("viewProfile")
viewProfile.addEventListener("click",profileView)







let deleteTodo = async(id)=>{
    await deleteDoc(doc(db,  user.uid,id));

}




let editTodo = async(id , oldValue)=>{
    
    let editValue=prompt("Enter Your Edit Todo",oldValue)
    
    
    await updateDoc(doc(db,  user.uid,id),{
        
        todo:editValue
        
        
        
    });
    
}







let completeTodo = async(id , completed) =>{
    
    
    
    await updateDoc(doc(db,  user.uid,id),{
        
        completed: !completed
        
        
    });
    
}



window.deleteTodo = deleteTodo
window.editTodo = editTodo
window.completeTodo = completeTodo




}
else{
    // location="index.html"
    Swal.fire({
        icon: 'warning',
        title: 'Field Required',
        text: 'Please fill this field.',
        confirmButtonText: 'OK'
      });
}
}

onAuthStateChanged(auth,cheackAuth)