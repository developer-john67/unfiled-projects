import { cart, removeFromCart, updateDeliveryOption } from './cart.js';
import { products, getProduct } from './product.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption, getDeliveryOption } from './deliveryoption.js';
import { renderPaymentSummary } from './payment.js';

dayjs();
console.log(dayjs());

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOptions = getDeliveryOption(deliveryOptionId);
    
    const today = dayjs();
    const deliveryDate = today.add(deliveryOptions.deliveryDays, 'Days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    

    cartSummaryHTML += `
      <div class="cart-item-container" data-cart-item-container="${matchingProduct.id}">
        <div class="delivery-date">
          ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${(matchingProduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
    console.log(matchingProduct.id);
  });
  
  

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  attachEventListeners();
};



function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryOption.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'Days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = option.priceCents === 0 ? 'FREE' : `$${(option.priceCents / 100).toFixed(2)} -`;
    const isChecked = option.id === cartItem.deliveryOptionId;
    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${option.id}">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>
    `;
  });
  return html;
};

function attachEventListeners() {
  document.querySelector('.js-order-summary').addEventListener('click', (event) => {
    const deleteLink = event.target.closest('.js-delete-link');
    if (deleteLink) {
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`[data-cart-item-container="${productId}"]`).remove();
      renderOrderSummary();
      renderPaymentSummary();
    }

    const deliveryOption = event.target.closest('.js-delivery-option');
    if (deliveryOption) {
      const { productId, deliveryOptionId } = deliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    }
  });
}