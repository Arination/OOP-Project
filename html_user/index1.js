var cartItems = {};

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
  cartList.innerHTML = "";

  for (var itemId in cartItems) {
    if (cartItems.hasOwnProperty(itemId)) {
      var listItem = document.createElement("li");
      listItem.innerText = 'Item ' + itemId + ' - Quantity: ' + cartItems[itemId];
      cartList.appendChild(listItem);
    }
  }

  // Update quantity display for menu items
  for (var i = 1; i <= 30; i++) {
    var quantityDiv = document.getElementById('quantity-' + i);
    if (cartItems[i]) {
      quantityDiv.textContent = cartItems[i];
    } else {
      quantityDiv.textContent = '0';
    }
  }
}

function placeOrder() {
  if (Object.keys(cartItems).length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }

  var orderText = "Order Placed for:\n";
  for (var itemId in cartItems) {
    if (cartItems.hasOwnProperty(itemId)) {
      orderText += "Item " + itemId + " - Quantity: " + cartItems[itemId] + "\n";
    }
  }

  // Display order details in a popup
  alert(orderText);

  // Clear the cart
  cartItems = {};
  updateCart();
}
