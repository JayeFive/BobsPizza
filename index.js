/* 
 * This script holds the functions that modify the live price boxes
 */

const prices = { 
  pizzaSize: [6, 10, 14, 16],
  pizzaCrust: [0, 0, 3, 0, 0],
  pizzaCheese: [0, 0, 3],         
  pizzaSauce: [0, 0, 0, 0]
};

// Event handler for radio button changes
var radioButtonLabels = document.getElementsByClassName("radio-btn-label");

for (var i = 0; i < radioButtonLabels.length; i++) {
  
  radioButtonLabels[i].addEventListener('click', function() {
    updateRadioButtonPrice (this.firstElementChild.id.slice(-1), this.firstElementChild.name);
  }, false);
  
}

// Event handler for the refresh button in the navbar
document.getElementById('refresh-button').addEventListener("click", resetForm, false);

// Manually set all radio buttons to their default value and clear all checkboxes and price boxes
function resetForm() {
  console.log('this worked');
  document.getElementById("pizzaSize3").checked = true;
}


function clearInvoice () {
  var elements = document.getElementsByTagName("td");
  while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
    
  elements = document.getElementsByTagName("tr");
  while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
}

// Live update of price boxes next to radio buttons
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

var totalExtraPrice = 0;

// Live update of price boxes next to checkboxes
function updateCheckedButtonPrice (priceId, elemName) {
  // Find the number of checked checkboxes
  var numChecked = getCheckedBoxes(elemName);
  var priceBoxes = document.getElementsByClassName(elemName);
  var changedElement = document.getElementById(elemName + "Price" + priceId);
  //Check if the user just selected or deselected a topping
  if (document.getElementById(elemName + priceId).checked) {
    // Check if the first free topping has already been selected 
    if (numChecked > 1) {     // If so, add a dollar to the newly selected topping
      changedElement.innerHTML = (1).toFixed(2);
      totalExtraPrice++;
    }   // If first free topping has not been selected, do nothing
  } else { // if the user just deselected a topping, firstly set that price box to 0.00
    changedElement.innerHTML = (0).toFixed(2);
    totalExtraPrice--;
    //Compare the number of selected toppings with the total extra price 
    if(totalExtraPrice === numChecked) {
      // Search through the prices to find the first one that's not 0.00, clear it and leave the function
      for (var i = 0; i < priceBoxes.length; i++) {
        
        if (Number(priceBoxes[i].innerHTML) === 1) {
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
