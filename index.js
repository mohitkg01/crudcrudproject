const myForm=document.querySelector('#my-form');
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const userList=document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);
userList.addEventListener('click',removeIt);

//Adding reterive details
window.addEventListener("DOMContentLoaded",reteriveDetails)


function onSubmit(e){
    e.preventDefault();
    if(nameInput==='' || emailInput===''){
        msg.innerHTML='please enter all field';
    }else{
        const li=document.createElement('li');
        li.appendChild(document.createTextNode(
            `${nameInput.value} : ${emailInput.value}`
        ));
       
        //Adding delete btn
        //var name=JSON.stringify(nameInput.value);
        const deleteBtn=document.createElement('button');
        deleteBtn.className='btn btn-danger btn-sm float-right delete';

        deleteBtn.appendChild(document.createTextNode('delete'));
        li.appendChild(deleteBtn);
        //deleteBtn.addEventListener('click',removeIt);

        // Adding edit btn
        const editBtn=document.createElement('button');
        editBtn.className='btn btn-danger btn-sm float-right edit';

        editBtn.appendChild(document.createTextNode('edit'));
        li.appendChild(editBtn);
       
        editBtn.addEventListener('click',editItem);
        
        //Calling by Apis
        axios.post("https://crudcrud.com/api/0215f99c8d4d41aba34ac5d3642f2f3e/Datas",{
            name:nameInput.value,
            email:emailInput.value
        })
        .then((response)=>{
            console.log(response);
            //addimg in local storage
            localStorage.setItem(response.data._id,JSON.stringify(response.data));
        })
        .catch((err)=>{
            console.log(err);
        })

        //Adding local storage
        
        // localStorage.setItem(name,`name:${nameInput.value}  email:${emailInput.value}`);
        // nameInput.value='';
        // emailInput.value='';

        //Adding to the list
        userList.appendChild(li);
        nameInput.value = '';
        emailInput.value = '';
    }  
}



//Remove items

function removeIt(e) {
    if (e.target.classList.contains('delete')) {
      if (confirm('Are You Sure?')) {
        const li = e.target.parentElement;
        const itemId = li.id;
  
        // Deleting from the API
        axios.delete(`https://crudcrud.com/api/0215f99c8d4d41aba34ac5d3642f2f3e/Datas/${itemId}`)
          .then((res) => {
            // Removing from the UI
            userList.removeChild(li);
  
            // Removing from local storage
            localStorage.removeItem(itemId);
          })
          .catch((err) => console.log(err));
      }
    }
  }

// function removeIt(e){
   
//     console.log(_id);
//     axios.delete(`https://crudcrud.com/api/393c296022594ad3b2720c9a62634544/Datas/${_id}`)
//     .then((res)=>{
//         userList.removeAttribute(userId);
        
//     })
//     .catch((err)=>console.log(err));
//     if(e.target.classList.contains('delete')){
//         if(confirm('Are You Sure?')){
//             var li=e.target.parentElement;
//             var name=JSON.stringify(li.firstChild.textContent.split(':')[0].trim());
//             //console.log(name);
//             userList.removeChild(li);
            
//             localStorage.removeItem(name);
    
           
//         }
//    }
//}

function editItem(e){
     var li=e.target.parentElement;
     const itemId=li.id;
    //  const newName=
    //  const newEmail=
     axios.put(`https://crudcrud.com/api/0215f99c8d4d41aba34ac5d3642f2f3e/Datas/${itemId}`,{
        name:nameInput.value,
        email:emailInput.value
     })
     .then((res)=>{
        //removing the user
        userList.removeChild(li);
      //remove the user from local storage
        localStorage.removeItem(itemId);

        //creating a new li element with updated data
        const updateLi=document.createElement('li');
        updateLi.id = itemId;
        updateLi.appendChild(document.createTextNode(`${newName}: ${newEmail}`));
        //Adding delete btn
        const deleteBtn=document.createElement('button');
        deleteBtn.className='btn btn-danger btn-sm float-right delete';

        deleteBtn.appendChild(document.createTextNode('delete'));
        updateLi.appendChild(deleteBtn);

        // Adding edit btn
        const editBtn=document.createElement('button');
        editBtn.className='btn btn-danger btn-sm float-right edit';

        editBtn.appendChild(document.createTextNode('edit'));
        updateLi.appendChild(editBtn);
       
        //adding event listners
        deleteBtn.addEventListener('click',removeIt)
        editBtn.addEventListener('click',editItem);   
     
        userList.appendChild(updateLi);  
     })
     .catch((err)=>console.log(err));
    // var name=JSON.stringify(li.firstChild.textContent.split(':')[0].trim());
    // var name=li.firstChild.textContent.split(':')[0].trim();
     //var email=li.firstChild.textContent.split(':')[1].trim();
    
    // //set the value
    // var n=JSON.parse(name);
    // nameInput.value=name;
    // emailInput.value=email;
     //removing the user
     //userList.removeChild(li);
     //remove the user from local storage
    // localStorage.removeItem(itemId);
   

  
}

// function reteriveDetails(){
//     const datas = Object.values(localStorage);
    
    
//     console.log(datas.length);
//         for(let i=0;i<datas.length;i++){
//             const data=JSON.parse(datas[i]);
//             const name=data.name;
//             const email=data.email;


//             const li=document.createElement("li");
//             li.appendChild(document.createTextNode(`${name}: ${email}`));
            
    
//             //adding delete btn
//             const delBtn=document.createElement('button');
//             delBtn.className='btn btn-secondary btn-sm float-right delete';
//             delBtn.appendChild(document.createTextNode('delete'));
//             li.appendChild(delBtn);
    

//             //Adding edit btn
//             const editBtn=document.createElement('button');
//             editBtn.className='btn btn-secondary btn-sm float-right edit';
//             editBtn.appendChild(document.createTextNode('edit'));
//             li.appendChild(editBtn);

        
//             editBtn.addEventListener('click', editItem);
        
//             userList.appendChild(li);
//     }  
// }
function reteriveDetails(){
    axios.get("https://crudcrud.com/api/0215f99c8d4d41aba34ac5d3642f2f3e/Datas")
    .then((res)=>{
       const uesrList = document.getElementById("userList");
       res.data.forEach((item) => {
        const li = document.createElement("li");
        li.id = item._id;
        li.appendChild(document.createTextNode(`${item.name}: ${item.email}`));
        // for(let i=0;i<res.data.length;i++){
        //     const d=res.data[i];


        //     const li=document.createElement("li");
        //     li.appendChild(document.createTextNode(`${d.name}:${d.email}`));
            

            //Adding Edit button
            const deleteBtn=document.createElement('button');
            deleteBtn.className='btn btn-secondary btn-sm float-right delete';
            deleteBtn.appendChild(document.createTextNode('delete'));
            li.appendChild(deleteBtn);

            //Adding edit btn
            const editBtn=document.createElement('button');
            editBtn.className='btn btn-secondary btn-sm float-right edit';
            editBtn.appendChild(document.createTextNode('edit'));
            li.appendChild(editBtn);

            editBtn.addEventListener('click',editItem);

            userList.appendChild(li);
      
        });
    })
    .catch((err)=>console.log(err))
}