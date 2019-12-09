
// //console.dir(document)
// // check out what's inside DOM
// console.log(document.domain)

// var itemList = document.querySelector('#items');

// //parentNode // parentElement   property

// // console.log(itemList.parentNode)
// // itemList.parentNode.style.backgroundColor = "lightgray"

// //create a new div in html 

// var newDiv = document.createElement('div')
// console.log(newDiv);
// newDiv.className = "hello";
// newDiv.id ="say-hello";
// newDiv.setAttribute('title', 'atr1')

// //create a text node 
// var newDivText = document.createTextNode('hello world');
// //add text to div
// newDiv.appendChild(newDivText)
// // inset this new div to our DOM

// var container = document.querySelector('header .container');
// var h1 = document.querySelector('header h1');
// container.insertBefore(newDiv, h1)


// //Event Listner
// var button = document.getElementById("button").addEventListener(
//     'click', buttonClick
// )
// function buttonClick (e) {
//     // document.getElementById('header-title').textContent = 'Changed'
//     // document.querySelector('#main').style.backgroundColor = "green"
//     console.log(e.target)
// }

//TODO 1 : input item and submit. Then the item is added to the list

var inputForm = document.getElementById('addForm').addEventListener('submit', addItem);
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');


itemList.addEventListener('click', removeItem)
filter.addEventListener('keyup', filterItems)

function addItem(e) {
    e.preventDefault();
    var itemInput = document.getElementById('item').value;
    console.log(itemInput)
    //const listItem = document.createElement('li')
    var item = document.createElement('li');
    item.className = 'list-group-item';
    console.log(item);
    item.textContent = itemInput;

    //create the X button and add it to he list item
    var xButton = document.createElement('button')
    xButton.className = 'btn btn-danger btn-sm float-right delete'
    console.log(xButton);
    xButton.textContent = 'X';
    item.appendChild(xButton)
    //add newly created li to the list 
    itemList.appendChild(item)

    //clear the field
    
}

function removeItem(e) {
    //we can check if we clicked on the item bar itself or on button 
    //by checking this parameter e.target.classList
    if(e.target.classList.contains('delete')){
        console.log(1);
        if(confirm('Sure to delete?')) {
            var li = e.target.parentElement;
            li.remove();
        }
    }
}


function filterItems(e) {
    var filterText = e.target.value.toLowerCase();
    console.log(filterText);
    //get all the items
    var items = itemList.getElementsByTagName('li');
    //convert HTML collection to array
    Array.from(items).forEach(function(item) {
        var itemname = item.firstChild.textContent;
        console.log(itemname);
        if(itemname.toLowerCase().indexOf(filterText) != -1) {
            item.style.display = 'block';
        }else {
            item.style.display = 'none';
        }
    })
}



