import { loadStripe } from '@stripe/stripe-js';
import { getApiUrl } from './config';

let stripePromise: Promise<any> | null = null;

export const getStripe = async () => {
  if (!stripePromise) {
    // Fetch publishable key from backend
    const response = await fetch(getApiUrl('/api/payments/config'));
    const { publishableKey } = await response.json();
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};
