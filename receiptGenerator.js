//This script is for adding up the pizza choices for Bob's Pizza

const prices = { pizzaSize: [6, 10, 14, 16],
                 pizzaCrust: [0, 0, 3, 0, 0],
                 pizzaCheese: [0, 0, 3],         
                 pizzaSauce: [0, 0, 0, 0] };

var numMeats = 0;
var numVeggies = 0;


function resetForm() {
    document.forms[0].reset();
}
    

function findTotalPrice () {
    
    var totalPrice = 0
    var orderForm = document.forms[0];
    
    
    console.log(orderForm.pizzaSize.name);
    //Find pizza size
    switch (orderForm.pizzaSize.id) {
        case "personalSize": 
            totalPrice += 6;
            generateOptionElem(orderForm.pizzaSize.id, orderForm.pizzaSize.value);
            break;
        case "mediumSize":
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
    
    
    //Determine crust type line item
    var crusts = document.getElementsByName("crust");
    for (var i = 0; i < crusts.length; i++) {
        if (crusts[i].checked == true && crusts[i].id == "crust3") { //crust3(stuffed crust) costs extra
            generateOptionElem(crusts[i].value, "$3");
            totalPrice += 3;
        } else if (crusts[i].checked == true && crusts[i].id != "crust3")
            generateOptionElem(crusts[i].value, "$0");
    }
    
    
    //Determine extra cheese line item
    var cheeses = document.getElementsByName("cheese");
    for (var i = 0; i < cheeses.length; i++) {
        if (cheeses[i].checked == true && cheeses[i].id == "cheese3") { //cheese3(extra cheese) costs extra
            generateOptionElem(cheeses[i].value, "$3");
            totalPrice += 3;
        } else if (cheeses[i].checked == true && cheeses[i].id != "cheese3")
            generateOptionElem(cheeses[i].value, "$0");
    }
    

    //Determine sauce line item
    var sauces = document.getElementsByName("sauce");
    for (var i = 0; i < sauces.length; i++) {
        if (sauces[i].checked == true)
            generateOptionElem(sauces[i].value, "$0");
    }
        
        
        
    //Determine extra toppings -- first meat and first veggie are free
    var meats = document.getElementsByName("meats");
    var veggies = document.getElementsByName("veggies");
    
    for (var i = 0; i < meats.length; i++) {
        if (meats[i].checked == true) {
            numMeats++;
            if (numMeats <= 1)
                generateOptionElem(meats[i].value, "$0");
            else
                generateOptionElem(meats[i].value, "$1");
        }
    }
    
    for (var i = 0; i < veggies.length; i++) {
        if (veggies[i].checked == true) {
            numVeggies++;
            if (numVeggies <= 1)
                generateOptionElem(veggies[i].value, "$0");
            else
                generateOptionElem(veggies[i].value, "$1");
        }
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




function updateRadioButtonPrice (priceId, elemName) {
    
    // Set the correct price from the prices object
    document.getElementById(elemName + "Price" + priceId).innerHTML = prices[elemName][priceId - 1].toFixed(2);
    
    // Set all other price boxes to 0.00
    for (var i = 1; i <= document.getElementsByName(elemName).length; i++) {
        if (i != priceId) {
            document.getElementById(elemName + "Price" + i).innerHTML = (0).toFixed(2); 
        } 
    }
}

function updateCheckedButtonPrice (priceId, elemName) {
    // Find the number of checked checkboxes
    var numChecked = getCheckedBoxes(elemName);
    var priceBoxes = document.getElementsByClassName(elemName);
    var changedElement = document.getElementById(elemName + "Price" + priceId);
    var totalExtraPrice = 0;
    
    //Check if the user just selected or deselected a topping
    if (document.getElementById(elemName + priceId).checked) {
        // Check if the first free topping has already been selected 
        if (numChecked > 1) {
            // If so, add a dollar to the newly selected topping
            changedElement.innerHTML = (1).toFixed(2);
        }   // If first free topping has not been selected, do nothing
    } else { // if the user just deselected a topping, firstly set that price box to 0.00
        changedElement.innerHTML = (0).toFixed(2;)
        for (var i = 1; i <= priceBoxes.length; i++) {
             totalExtraPrice += Number(document.getElementById(elemName + "Price" + i).innerHTML);
        }   //Compare the number of selected toppings with the total extra price calculated in the for loop above
        if(totalExtraPrice === numChecked) {
            // Search through the prices to find the first one that's not 0.00, clear it and leave the function
            for (var i = 0; i < priceBoxes.length; i++) {
                    console.log(priceBoxes[i].innerHTML);
                if (Number(priceBoxes[i].innerHTML) == 1) {
                    priceBoxes[i].innerHTML = (0).toFixed(2);
                    return;
                }
            }
        }   
    }
}

// function to check the number of checked boxes
function getCheckedBoxes (inputName) {
  var checkboxes = document.getElementsByName(inputName);   
  var numChecked = 0;

  for (var i = 0; i < checkboxes.length; i++) {
     // If the checkbox is checked, increment the return variable
     if (checkboxes[i].checked) {
        numChecked++;
     }
  }
  return numChecked;
}