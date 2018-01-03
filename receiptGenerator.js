//This script is for adding up the pizza choices for Bob's Pizza

function resetForm() {
    document.forms[0].reset();
}
    

function findTotalPrice () {
    
    var totalPrice = 0
    var orderForm = document.forms[0];
    
    //Find pizza size
    switch (orderForm.pizzaSize.value) {
        case "size1": 
            totalPrice += 6;
            generateOptionElem("Personal Pizza", "$6");
            break;
        case "size2":
            totalPrice += 10;
            generateOptionElem("Medium Pizza", "$10");
            break;
        case "size3":
            totalPrice += 14;
            generateOptionElem("Large Pizza", "$14");
            break;
        case "size4":
            totalPrice += 16;
            generateOptionElem("Extra Large Pizza", "$16");
            break;
    }   
    
    //Determine if the stuffed crust(crust3) has been checked
    if (document.getElementById("crust3").checked == true) {
        totalPrice += 3;
    }
    
    //Determine if extra cheese has been checked
    if (document.getElementById("cheese3").checked == true)
        totalPrice += 3;
        
        
    //Determine extra toppings -- first meat and first veggie are free
    var numMeats = 0;
    var numVeggies = 0;
    var meats = document.getElementsByName("meats");
    var veggies = document.getElementsByName("veggies");
    
    for (var i = 0; i < meats.length; i++) {
        if (meats[i].checked == true)
            numMeats++;
    }
    
    for (var i = 0; i < veggies.length; i++) {
        if (veggies[i].checked == true)
            numVeggies++;
    }
    
    if (numMeats - 1 >= 1) 
        totalPrice += (numMeats - 1);
    if (numVeggies -1 >= 1)
        totalPrice += (numVeggies - 1);
    
    console.log(totalPrice);
    
    generateOptionElem("", "");
    generateOptionElem("<strong>Total</strong>", "$" + totalPrice)
}



function generateOptionElem (option, price) {
    var invoice = document.getElementById("invoice");
    var newRow = document.createElement("tr");

    newRow.innerHTML = option;
    invoice.appendChild(newRow);
    
    var newPriceElem = document.createElement("td");
    
    newPriceElem.innerHTML = price;
    newRow.appendChild(newPriceElem);
}

function clearInvoice () {
    var elements = document.getElementsByTagName("td");
    while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
    
    elements = document.getElementsByTagName("tr");
    while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
}