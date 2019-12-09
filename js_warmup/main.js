//single element selector
//document.getElementById("");
//document.querySelector("");

//multiple elements selector
//document.querySelectorAll("");
//document.getElementsByClassName("");


// const items = document.querySelector('.items');
// console.log(items)
 
// //items.firstElementChild.remove()
// //items.firstElementChild.textContent = "changed."
// //items.children[2].innerText = "second"

// const btn = document.querySelector(".btn");
// btn.style.background = 'gray'
const myForm = document.querySelector(".content")
const name = document.querySelector("#name")
const email = document.querySelector("#email")
const btn = document.querySelector(".btn")
const message = document.querySelector(".message")
const ul = document.querySelector(".items")
myForm.addEventListener("submit", myFunction);

function myFunction (e) {
    e.preventDefault();
    //console.log(name.value);
    if(name.value === '' || email.value===''){
        message.classList.add("error")
        message.innerHTML = "Name and Email should NOT be empty." ;
        setTimeout(() => message.remove(),1000)
    }else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${name.value} : ${email.value}`))
        ul.appendChild(li);

        //clear the field
        name.value = '';
        email.value='';

    }
}
