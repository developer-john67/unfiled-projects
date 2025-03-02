export let cart = JSON.parse(localStorage.getItem('cart')) || [];

if (!Array.isArray(cart)) {
  cart = [];
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
};

export function removeFromCart(productId) {
  const index = cart.findIndex(cartItem => cartItem.productId === productId);
  
  if (index !== -1) {
    cart.splice(index, 1);
    saveToStorage();
  }
};

export function updateDeliveryOption(productId, deliveryId) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryId;
    saveToStorage();
  }
};