//This script is for adding up the pizza choices for Bob's Pizza




function findTotalPrice () {
    
    var totalPrice = 0
    var orderForm = document.forms[0];
    
    //Find pizza size
    switch (orderForm.pizzaSize.value) {
        case "size1": 
            totalPrice += 6;
            break;
        case "size2":
            totalPrice += 10;
            break;
        case "size3":
            totalPrice += 14;
            break;
        case "size4":
            totalPrice += 16;
            break;
    }   
    
    //Determine if the stuffed crust(crust3) has been checked
    if (document.getElementById("crust3").checked == true)
        totalPrice += 3;
    
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
}