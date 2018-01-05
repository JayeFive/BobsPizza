
var numMeats = 0;
var numVeggies = 0;

// This function runs the receipt modal
// Needs desperately to be refactored
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
    if (sauces[i].checked == true) {
      generateOptionElem(sauces[i].value, "$0");
    }
  }
        
        
        
  //Determine extra toppings -- first meat and first veggie are free
  var meats = document.getElementsByName("meats");
  var veggies = document.getElementsByName("veggies");
  
  for (var i = 0; i < meats.length; i++) {
    if (meats[i].checked == true) {
      numMeats++;
      if (numMeats <= 1) {
        generateOptionElem(meats[i].value, "$0");
      } else {
        generateOptionElem(meats[i].value, "$1");
      }
    }
  }
    
  for (var i = 0; i < veggies.length; i++) {
    if (veggies[i].checked == true) {
      numVeggies++;
      if (numVeggies <= 1) {
        generateOptionElem(veggies[i].value, "$0");
      } else {
        generateOptionElem(veggies[i].value, "$1");
      }
    }
  }
    
  if (numMeats - 1 >= 1) {
        totalPrice += (numMeats - 1);
  }
  if (numVeggies -1 >= 1) {
    totalPrice += (numVeggies - 1);
  }
    
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