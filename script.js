
var menuItems = [
    {
      "itemName": "Chicken Biryani",
      "price": 200
    },
  
    {  "itemName": "Mutton Biryani",
      "price": 220
    },
  
      {"itemName": "Fish Biryani",
      "price": 240
    },

    {"itemName": "Paneer Biryani",
    "price": 180
    },
  
    {  "itemName": "Butter Naan",
      "price": 20
    },
  
    {  "itemName":"Spicy Delight Veg Pizza",
      "price": 120
    },
    {  "itemName": "Nonveg Loaded Pizza",
      "price": 180
    },
  
    {
      "itemName": "Home Country Fries & Chilli Flakes",
      "price": 105
    },
    {  "itemName": "Chicken Salad Appetizers",
        "price": 250
    },

    {  "itemName":"Chicken Cheesy Burger",
      "price": 120
    },
  
      {"itemName": "Panner Cheesy Burger",
      "price": 80
    },
  
    {  "itemName": "Death By Chocolate Desert",
      "price": 180
    },
    {  "itemName": "Oreo Brownie Milkshake",
      "price": 200
    },
    {  "itemName": "Diet Coke",
        "price": 50
    },


  ];
  
var tableItems= [
    {
      "tableNumber":"1",
      "tableName":"Table-1",
      "billAmount" : 0,
      "items": 0,
      "itemsAndQuantity":{}
     
    },
    {
      "tableNumber":"2",
      "tableName":"Table-2",
      "billAmount" : 0,
      "items":0,
      "itemsAndQuantity":{}
      

    },
    {
      "tableNumber":"3",
      "tableName":"Table-3",
      "billAmount" : 0,
      "items":0,
      "itemsAndQuantity":{}
    },
    {
      "tableNumber":"4",
      "tableName":"Table-4",
      "billAmount" : 0,
      "items":0,
      "itemsAndQuantity":{}
    }
  ];
  
  

  var menu = document.getElementById("foodmenu");
  var tables = document.getElementById("tablemenu");
  
showContent();


function showContent(){


    for (var i = 0; i <menuItems.length; i++){
         
        menu.innerHTML += "<div class='menuDiv' id='" + i + "' draggable = 'true' ondragstart='dragStart(event)''><br><h4 style = 'text-align:center'>" + menuItems[i].itemName + "</h4><br><h4 style = 'text-align:center'> Rs." + menuItems[i].price + "</div><br><hr>";
    }
    

   
    for (var i = 0; i <tableItems.length; i++){
        tables.innerHTML +="<div onclick = 'openBill(" + i + ")' id='" + i + "' ondrop='afterDrop(event)' ondragover='allowDrop(event)' class='tableDiv'><h4 style = 'text-align:center'>Table-" + tableItems[i].tableNumber + "</h4><br><p style = 'text-align:center'> Rs. " + tableItems[i].billAmount + " | Total items: "+tableItems[i].items+"</p>"
        
    }


   

}



function allowDrop(event) {
    event.preventDefault();
}


function dragStart(event) {
    console.log(event.target.id);
    event.dataTransfer.setData("text", event.target.id);
}


function afterDrop(event){

    event.preventDefault();
 
    var currentDishIndex=event.dataTransfer.getData("text");
    var currentTableIndex=event.target.id;    

    if(currentTableIndex!==undefined || currentTableIndex!==''){
        var myMap=tableItems[currentTableIndex].itemsAndQuantity;
    
        tableItems[currentTableIndex].billAmount+=menuItems[currentDishIndex].price;
        tableItems[currentTableIndex].items+=1*1;

        if(myMap[currentDishIndex]!==undefined){
            myMap[currentDishIndex]=myMap[currentDishIndex]*1+1;
        
        }
        else{
            tableItems[currentTableIndex].itemsAndQuantity[currentDishIndex]=1;
        }
 
        reload();
        
    }
    else
    {
            alert("Please Drag Properly");
    }
  
    

}


function searchingMenu(){
    var currentSubstring=document.getElementById("menusearch").value;
    
    currentSubstring=currentSubstring.toUpperCase();
    menu.innerHTML='';
    

    for(var i=0;i<menuItems.length;i++){

        var currentItemName=menuItems[i].itemName;
        
        
        if(currentItemName.toUpperCase().search(currentSubstring)>-1){

            menu.innerHTML += "<div class='menuDiv' id='" + i + "' draggable = 'true' ondragstart='dragStart(event)''><br><h4 style = 'text-align:center'>" + menuItems[i].itemName + "</h4><br><h4 style = 'text-align:center'> Rs." + menuItems[i].price + "</div><br><hr>";
        }
        
    }


}

function searchingTables(){

    var currentSubstring=document.getElementById("tablesearch").value;
    currentSubstring=currentSubstring.toUpperCase();
    tables.innerHTML='';
    for(var i=0;i<tableItems.length;i++){

        var currentTableName=tableItems[i].tableName;
        
        
        if(currentTableName.toUpperCase().search(currentSubstring)>-1){

            tables.innerHTML +="<div onclick = 'openBill(" + i + ")' id='" + i + "' ondrop='afterDrop(event)' ondragover='allowDrop(event)' class='tableDiv'><h4 style = 'text-align:center'>Table-" + tableItems[i].tableNumber + "</h4><br><p style = 'text-align:center'> Rs. " + tableItems[i].billAmount + " | Total items: "+tableItems[i].items+"</p>"
        
    }
        
    }



}

function openBill(i){

    var modal = document.getElementById('myBill');
   

    var myMap=tableItems[i].itemsAndQuantity;
    modal.style.display = "block";


    var billContent = "<tr><th style = 'text-align:center'>Item</th><th style = 'text-align:center'>Quantity</th><th style = 'text-align:center'>Total Price</th><th style = 'text-align:center'>Delete</th></tr><br>";
    for(var it in myMap){
        var totalPrice= myMap[it] * menuItems[it].price;
        billContent += "<tr><td align='center'>" + menuItems[it].itemName + "</td><td align='center'><input type='number' id='"+i+"' oninput='modifyBill(" + i +"," + it + ")' value="+ myMap[it] +"></td><td align='center'>"+ totalPrice +"</td><td align='center'><button onclick='deleteItem(" + i +"," + it + ")'>Delete</button></td></tr><br>";
    }

    document.getElementById("billcontent").innerHTML = 
        "<div class='billDiv'><b><h3 class='bill-heading' align='center'>Bill of Table Number : " + tableItems[i].tableNumber + "</h3></b><table style='width:100%'>" + billContent + "</table><br><br><h5 align='center'> Total Amount : Rs. " + tableItems[i].billAmount + "<br></h5><div align='center' class='bill-button'><button  id='final-bill' onclick='generateBill(" + i + ")'>Generate Bill/Close Session</button></div>";


    
}



function modifyBill(i,it){

    var quantity=document.getElementById(i).value;
    var currentTableIndex=i;
    var currentItemIndex=it;


    var myMap=tableItems[currentTableIndex].itemsAndQuantity;
    
    if(myMap[currentItemIndex]!==undefined){
            myMap[currentItemIndex]=quantity;
    }

    tableItems[currentTableIndex].billAmount=0;
    tableItems[currentTableIndex].items=0;

    for(var currentItem in myMap){
        tableItems[currentTableIndex].billAmount+= myMap[currentItem] * menuItems[currentItem].price;
        tableItems[currentTableIndex].items+=myMap[currentItem] * 1;
    }

    document.getElementById('billcontent').innerHTML='';

    
    openBill(currentTableIndex);
    reload();

    
}

function deleteItem(i,it){

    delete tableItems[i].itemsAndQuantity[it];

    modifyBill(i,it);

}



function generateBill(i){


    
    document.getElementById("billcontent").innerHTML = "<h3 style = 'text-align:center'> Bill Generated</h3><h3 style = 'text-align:center'> Pay Rs." + tableItems[i].billAmount + "</h3>";
    tableItems[i].items = 0;
    tableItems[i].billAmount = 0;
    tableItems[i].itemsAndQuantity={};

    reload();
}


function reload(){

    tables.innerHTML='';
    menu.innerHTML='';
    showContent();

}