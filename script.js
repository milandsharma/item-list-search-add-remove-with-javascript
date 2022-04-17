var form =document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");

// form submit event
form.addEventListener("submit", addItem);
//dlt addEventListener
itemList.addEventListener("click",removeItem);
//filter addEventListener
filter.addEventListener("click",filterItem);

// add item
function addItem(e){
    e.preventDefault();
    //get input value
    var newItem = document.getElementById('item').value;

    //create new element
    var li = document.createElement('li');

    //add class to element
    li.className = 'list-group-item';

    //add textnode with input value
    li.appendChild(document.createTextNode(newItem));
    
    //create dlt btn
    var dlt = document.createElement('button')
    dlt.className = 'btn btn-danger btn-sm float-right delete mx-5';
    //append textNode
    dlt.appendChild(document.createTextNode("X"));

    //append btn to li
    li.appendChild(dlt);

    itemList.appendChild(li);
}

//removeItem
function removeItem(e){
    if(e.target.classList.contains("delete")){
       if(confirm("Are you sure you want to delete")){
           var li =e.target.parentElement;
            itemList.removeChild(li);
       } 
    }
}

// filter items
function filterItem(e){
    //lowercase
    var text = e.target.value.toLowerCase();
    //get list of items
    var items = itemList.getElementsByTagName('li');
    Array.from(items).forEach(function(item){
        var itemName = item.firsChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
}