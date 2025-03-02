export const deliveryOption= [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];
export function getDeliveryOption(deliveryOptionId) {
    const option = deliveryOption.find((option) => option.id === deliveryOptionId);
    return option || deliveryOption[0]; // Return the first option as default
  }