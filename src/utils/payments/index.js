export const paymentApiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://darthvader.fronix.se/payment-api';

export { default as updatePayment } from './updatePayment'
export {default as addPaymentUser } from './addPaymentUser';
export {default as deletePaymentUser} from './deletePaymentUser';
export {default as updatePrice} from './updatePrice';
export {default as GetUsdSekRate} from './currencyRate';
