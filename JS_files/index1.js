const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.sign-up-link');
const btnpopup = document.querySelector('.btnLogin-popup')
const iconClose = document.querySelector('.icon-close')


signupLink.addEventListener('click', ()=>{
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
  wrapper.classList.remove('active');
});

btnpopup.addEventListener('click', ()=>{
  wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', ()=>{
  wrapper.classList.remove('active-popup','active');
});

var cartItems = {};
var itemPrices = {
  'burger': 59,
  'chilliPotato': 99,
  'dosa': 89,
  'noodles': 59,
  'pizza': 119,
  'poori': 99,
  'sandwich': 59,
  'soup': 89,
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function increaseQuantity(itemId) {
  cartItems[itemId] = (cartItems[itemId] || 0) + 1;
  updateCart();
}

function decreaseQuantity(itemId) {
  if (cartItems[itemId]) {
    cartItems[itemId]--;
    if (cartItems[itemId] === 0) {
      delete cartItems[itemId];
    }
    updateCart();
  }
}

function updateCart() {
  var cartList = document.getElementById("food-cart");
  var totalBill = 0;
  cartList.innerHTML = "";

  for (var itemId in cartItems) {
    if (cartItems.hasOwnProperty(itemId)) {
      var listItem = document.createElement("li");
      listItem.innerText = capitalizeFirstLetter(itemId) + ' - Quantity: ' + cartItems[itemId];
      cartList.appendChild(listItem);
      totalBill += itemPrices[itemId] * cartItems[itemId];

      // Update quantity display for menu items
      var quantityDiv = document.getElementById('quantity-' + itemId);
      quantityDiv.textContent = cartItems[itemId];
    }
  }

  var totalBillElement = document.getElementById("total-bill");
  totalBillElement.innerText = totalBill.toFixed(2);
}

function placeOrder() {
  if (Object.keys(cartItems).length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }

  var orderText = "Order Placed for:\n";
  var totalBill = 0;
  for (var itemId in cartItems) {
    if (cartItems.hasOwnProperty(itemId)) {
      orderText += capitalizeFirstLetter(itemId) + " - Quantity: " + cartItems[itemId] + "\n";
      totalBill += itemPrices[itemId] * cartItems[itemId];
    }
  }

  // Generate OTP
  var otp = Math.floor(1000 + Math.random() * 9000);

  // Display order details and OTP in a popup
  var orderSummary = orderText + "\nTotal Bill: ₹" + totalBill.toFixed(2) + "\n\nOTP: " + otp;
  alert("Order Placed!\n\n" + orderSummary);

  // Clear the cart and reset quantity to zero
  cartItems = {};
  updateCart();
  resetQuantity();
}

function resetQuantity() {
  var quantityElements = document.getElementsByClassName("quantity");
  for (var i = 0; i < quantityElements.length; i++) {
    quantityElements[i].textContent = '0';
  }
}
