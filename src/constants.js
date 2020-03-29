export const API_ENDPOINT = `http://localhost:3000`;
export const API_GET_CATEGORIES = `${API_ENDPOINT}/category/get-all-categories`;
export const API_LOGIN = `${API_ENDPOINT}/login`;
export const API_SIGNUP = `${API_ENDPOINT}/signup`;
export const API_CONFIGURATIONS = `${API_ENDPOINT}/configurations/get-configurations`;
export const API_GET_ALL_PRODUCTS = `${API_ENDPOINT}/product/get-all-products`;
export const API_GET_PRODUCT_BY_ID = `${API_ENDPOINT}/product/get-product-by-id`;
export const API_GET_PRODUCTS_BY_CATEGORY = `${API_ENDPOINT}/product/get-product-by-category`;
export const API_UPDATE_USER_INFORMATION = `${API_ENDPOINT}/customer/update-user-information`;
export const API_GET_USER_INFORMATION = `${API_ENDPOINT}/customer/get-user-information`
export const API_PLACE_ORDER = `${API_ENDPOINT}/order/create-order`

export const API_ENDPOINT_IMAGES = `http://localhost:3002`;

export const FOOTER_ITEMS = {
  questions: [
    { name: 'Help', link: '/help' },
    { name: 'Track Order', link: '/trackOrder' },
    { name: 'Returns', link: '/returns' }
  ],
  whatsInStore: [
    { name: 'Women', link: '/women' },
    { name: 'Men', link: '/men' },
    { name: 'Kids', link: '/kids' },
    { name: 'Shoes', link: '/shoes' },
    { name: 'Brands', link: '/brands' }
  ],
  followUs: [
    { name: 'Facebook', link: 'www.facebook.com' },
    { name: 'Twitter', link: 'www.twitter.com' },
    { name: 'Instagram', link: 'www.instagram.com' }
  ]
};

export const FOOTER_HEADINGS = ['QUESTIONS', `WHAT'S IN STORE`, 'FOLLOW US'];
