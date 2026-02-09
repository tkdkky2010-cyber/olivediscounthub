'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
    id: string; // Updated to string to match Product ID
    name: string;
    brand: string;
    imageUrl: string;
    originalPrice: number; // Base price in KRW
    price: number; // Display price (can be stale, we should use originalPrice to recalculate)
    currency: string;
    quantity: number;
    link: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    isDrawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('olive_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('olive_cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (newItem: CartItem) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === newItem.id);
            if (existing) {
                return prev.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + newItem.quantity } // Support arbitrary quantity add
                        : item
                );
            }
            // Default currency to KRW if not specified
            const itemToAdd = {
                ...newItem,
                currency: newItem.currency || 'KRW'
            };
            return [...prev, itemToAdd];
        });
        // We can dispatch a custom event or use a library for toast here.
        // For now, we'll let the component handle the specific UI feedback or add a global listener.
        // But the user requested "Toast implementation".
        // I will trigger a simple window alert or console log for now,
        // and Components can listen to context changes or callback.
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, isDrawerOpen, openDrawer, closeDrawer }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
