"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/hooks/useCurrency";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const t = useTranslations("Cart");
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    // We need locale for currency
    const [locale, setLocale] = useState('en');

    useEffect(() => {
        params.then(p => setLocale(p.locale));
    }, [params]);

    const getTargetCurrency = (loc: string) => {
        if (loc === 'ko') return 'KRW';
        if (loc === 'en') return 'USD';
        if (loc.startsWith('es')) return 'EUR';
        if (loc.startsWith('pt')) return 'EUR';
        if (loc === 'es-MX') return 'MXN';
        if (loc === 'pt-BR') return 'BRL';
        if (loc === 'ru') return 'RUB';
        return 'USD';
    };

    const targetCurrency = getTargetCurrency(locale);
    const { formatPrice, loading: ratesLoading } = useCurrency(targetCurrency);

    // Calculate Total
    // Use originalPrice (KRW) as base if available, otherwise fallback to price (legacy)
    const { getConvertedPrice } = useCurrency(targetCurrency);

    const totalAmount = cart.reduce((sum, item) => {
        const itemPrice = item.originalPrice ? getConvertedPrice(item.originalPrice) : item.price;
        return sum + (itemPrice * item.quantity);
    }, 0);

    const shippingCost = totalAmount > 50000 ? 0 : 3000;
    const finalTotal = totalAmount;

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBagIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link
                    href="/"
                    className="px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart ({cart.length})</h1>
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to clear your cart?')) {
                            clearCart();
                        }
                    }}
                    className="text-sm text-gray-500 hover:text-red-500 underline"
                >
                    Clear Cart
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="flex-1 space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                            {/* Image */}
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium mb-1">{item.brand}</p>
                                <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2">
                                    {item.name}
                                </h3>
                                <div className="text-lg font-bold text-gray-900">
                                    {ratesLoading ? '...' : formatPrice(item.originalPrice ? getConvertedPrice(item.originalPrice) : item.price)}
                                </div>
                            </div>

                            {/* Quantity & Remove */}
                            <div className="flex items-center gap-6 mt-4 sm:mt-0">
                                <div className="flex items-center border border-gray-200 rounded-full">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className={`w-8 h-8 flex items-center justify-center transition-colors ${item.quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-green-600'}`}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-50"
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Sidebar */}
                <div className="lg:w-96 flex-shrink-0">
                    <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{ratesLoading ? '...' : formatPrice(totalAmount)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-8">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-gray-900 block">
                                        {ratesLoading ? '...' : formatPrice(finalTotal)}
                                    </span>
                                    <span className="text-xs text-gray-500">Including tax</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                            onClick={() => alert('Checkout is disabled for this demo.')}
                        >
                            Proceed to Checkout
                            <ArrowRight size={20} />
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShoppingBagIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
    );
}
