import { NativePurchases, PURCHASE_TYPE } from '@capgo/native-purchases';

// Google Play In-App Billing Product IDs
export const GOOGLE_PLAY_PRODUCTS = {
  monthly: {
    productId: 'jarify_monthly',
    planId: 'jarify-monthly-plan', // Base Plan ID from Google Play Console
  },
  yearly: {
    productId: 'jarify_yearly',
    planId: 'jarify-yearly-plan', // Base Plan ID from Google Play Console
  },
} as const;

export type PlanType = keyof typeof GOOGLE_PLAY_PRODUCTS;

// Pricing information (for display purposes - fallback when store unavailable)
export const PRICING = {
  monthly: {
    price: 2.99,
    currency: 'USD',
    displayPrice: '$2.99/mo',
    yearlyEquivalent: 35.88,
  },
  yearly: {
    price: 23.88,
    pricePerMonth: 1.99,
    currency: 'USD',
    displayPrice: '$1.99/mo',
    displayYearlyPrice: '$23.88/year',
    savings: 12.00,
  },
} as const;

// Check if billing is supported on this device
export const isBillingSupported = async (): Promise<boolean> => {
  try {
    const { isBillingSupported } = await NativePurchases.isBillingSupported();
    return isBillingSupported;
  } catch (error) {
    console.log('Billing support check failed:', error);
    return false;
  }
};

// Get product info from the store
export const getProducts = async () => {
  try {
    const { products } = await NativePurchases.getProducts({
      productIdentifiers: [
        GOOGLE_PLAY_PRODUCTS.monthly.productId,
        GOOGLE_PLAY_PRODUCTS.yearly.productId,
      ],
      productType: PURCHASE_TYPE.SUBS,
    });
    return products;
  } catch (error) {
    console.error('Failed to get products:', error);
    return [];
  }
};

// Handle subscription purchase
export const handlePurchase = async (plan: PlanType): Promise<boolean> => {
  const product = GOOGLE_PLAY_PRODUCTS[plan];
  
  console.log(`Initiating purchase for product: ${product.productId}`);
  
  try {
    // Check if billing is supported
    const supported = await isBillingSupported();
    if (!supported) {
      console.log('Billing not supported on this device');
      // For web/testing, return true to allow flow to continue
      return true;
    }

    // Make subscription purchase
    const result = await NativePurchases.purchaseProduct({
      productIdentifier: product.productId,
      planIdentifier: product.planId, // Required for Android subscriptions
      productType: PURCHASE_TYPE.SUBS,
      quantity: 1,
    });

    console.log('Purchase successful!', result.transactionId);
    
    // Store premium status
    localStorage.setItem('jarify_premium', 'true');
    localStorage.setItem('jarify_plan', plan);
    localStorage.setItem('jarify_transaction_id', result.transactionId);
    
    return true;
  } catch (error: any) {
    console.error('Purchase failed:', error);
    
    // Handle user cancellation gracefully
    if (error.message?.includes('cancelled') || error.message?.includes('canceled')) {
      console.log('User cancelled the purchase');
      return false;
    }
    
    throw error;
  }
};

// Restore previous purchases
export const restorePurchases = async (): Promise<boolean> => {
  try {
    // First restore purchases
    await NativePurchases.restorePurchases();
    console.log('Restore initiated successfully');
    
    // Then get the current purchases
    const { purchases } = await NativePurchases.getPurchases({
      productType: PURCHASE_TYPE.SUBS,
    });
    
    console.log('Current purchases:', purchases);
    
    if (purchases && purchases.length > 0) {
      // Check if any of our subscription products are in the restored purchases
      const hasActiveSubscription = purchases.some(
        (p: any) => 
          p.productIdentifier === GOOGLE_PLAY_PRODUCTS.monthly.productId ||
          p.productIdentifier === GOOGLE_PLAY_PRODUCTS.yearly.productId
      );
      
      if (hasActiveSubscription) {
        localStorage.setItem('jarify_premium', 'true');
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Failed to restore purchases:', error);
    return false;
  }
};

// Open subscription management (Google Play subscriptions page)
export const manageSubscriptions = async (): Promise<void> => {
  try {
    await NativePurchases.manageSubscriptions();
  } catch (error) {
    console.error('Failed to open subscription management:', error);
    // Fallback: open Google Play subscriptions page in browser
    window.open('https://play.google.com/store/account/subscriptions', '_blank');
  }
};

// Check if user has active premium subscription
export const isPremiumActive = (): boolean => {
  return localStorage.getItem('jarify_premium') === 'true';
};

// Get current plan
export const getCurrentPlan = (): PlanType | null => {
  const plan = localStorage.getItem('jarify_plan');
  return plan as PlanType | null;
};
