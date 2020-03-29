export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function cardnumberValidator(inputCardNo) {
  let cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  if (inputCardNo.match(cardno)) {
    return true;
  } else {
    return false;
  }
}

export function isUsZipCode(postalCode) {
  let regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
  if (regexp.test(postalCode)) {
    return true;
  } else {
    return false;
  }
}

export function compareObjects(propsObject, stateObject) {
  if (propsObject) {
    if (propsObject.credit_card !== stateObject.creditCard) return false;
    if (propsObject.address_1 !== stateObject.addressLine1) return false;
    if (propsObject.address_2 !== stateObject.addressLine2) return false;
    if (propsObject.city !== stateObject.city) return false;
    if (propsObject.region !== stateObject.region) return false;
    if (propsObject.postal_code !== stateObject.postalCode) return false;
    if (propsObject.country !== stateObject.country) return false;
    if (propsObject.mob_phone !== stateObject.mobPhone) return false;
  }
  return true;
}

export function createOrderObject(payload) {
  let totalPrice = payload.cartItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);
  let order = {
    customerId: payload.loggedInUser.customer_id,
    totalPrice
  };
  let orderDetail = payload.cartItems.map(item => {
    return { product_id: item.product_id, quantity: item.quantity };
  });
  return { order, orderDetail };
}
