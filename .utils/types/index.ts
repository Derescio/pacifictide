// Centralized shared types for emails and quoting flows.

export interface CartItemOption {
    type: string;
    price: number;
}

export interface CartConfigurationSize {
    label?: string;
    key?: string;
}

export interface CartConfiguration {
    size?: CartConfigurationSize;
    woodType?: { name: string };
    stove?: { name: string; wifi?: boolean };
    installation?: { name: string };
    delivery?: { included: boolean; cost: number };
    upgrades?: Array<{ name: string; price: number }>;
    heaterOptions?: Array<{ name: string; price: number }>;
}

export interface CartItem {
    name: string;
    qty: number;
    price: number;
    image?: string;
    configuration?: CartConfiguration;
    selectedOptions?: Record<string, CartItemOption>;
}

export interface CartSummary {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

export interface EmailRequest {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    postalcode?: string;
    isConsultation?: boolean;
    isCartQuote?: boolean;
    cartItems?: CartItem[];
    cartSummary?: CartSummary;
    preferredDate?: string;
    preferredTime?: string;
    saunaType?: string;
    budgetRange?: string;
    contactMethod?: string;
    province?: string;
    address?: string;
    city?: string;
}

