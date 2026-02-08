"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { translateText } from "@/lib/translate";
import { useCart } from "@/context/CartContext";
import { useCurrencyContext } from '@/context/CurrencyContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Truck, Shield } from "lucide-react";

export default function CartPage() {
    const t = useTranslations("Cart");
    const locale = useLocale();
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const { formatPrice, currency, loading } = useCurrencyContext();

    // Calculate totals using sale price (item.price) in KRW
    const totalAmountInKRW = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    // Savings calculation
    const totalOriginalKRW = cart.reduce((sum, item) => {
        return sum + ((item.originalPrice || item.price) * item.quantity);
    }, 0);
    const savingsKRW = totalOriginalKRW - totalAmountInKRW;

    // Free shipping over 50,000 KRW
    const FREE_SHIPPING_THRESHOLD = 50000;
    const shippingCostKRW = totalAmountInKRW > FREE_SHIPPING_THRESHOLD ? 0 : 3000;
    const finalTotalKRW = totalAmountInKRW + shippingCostKRW;

    // Progress to free shipping
    const shippingProgress = Math.min((totalAmountInKRW / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totalAmountInKRW;

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('empty')}</h1>
                <p className="text-gray-400 mb-10 max-w-sm">{t('emptyDesc')}</p>
                <Link
                    href="/"
                    className="px-10 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-bold hover:from-green-700 hover:to-green-600 transition-all shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30 hover:-translate-y-0.5"
                >
                    {t('startShopping')}
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{t('title')}</h1>
                    <p className="text-sm text-gray-400 mt-1">{cart.reduce((sum, item) => sum + item.quantity, 0)} {t('items')}</p>
                </div>
                <button
                    onClick={() => {
                        if (confirm(t('clearCartConfirm'))) {
                            clearCart();
                        }
                    }}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
                >
                    {t('clearCart')}
                </button>
            </div>

            {/* Free Shipping Progress */}
            {totalAmountInKRW < FREE_SHIPPING_THRESHOLD && (
                <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Truck size={16} className="text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                            {t('freeShippingProgress', { amount: formatPrice(amountToFreeShipping) })}
                        </span>
                    </div>
                    <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                            style={{ width: `${shippingProgress}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Cart Items List */}
                <div className="flex-1 space-y-4">
                    {cart.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Image */}
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                                <Image
                                    src={item.imageUrl}
                                    alt={translateText(item.name, locale)}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-1">
                                    {translateText(item.brand, locale)}
                                </p>
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 mb-2">
                                    {translateText(item.name, locale)}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-gray-900">
                                        {loading ? '...' : formatPrice(item.price)}
                                    </span>
                                    {item.originalPrice > item.price && (
                                        <span className="text-xs text-gray-400 line-through">
                                            {formatPrice(item.originalPrice)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity & Remove */}
                            <div className="flex items-center gap-4 sm:gap-6">
                                <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${item.quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'}`}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-9 h-9 flex items-center justify-center rounded-full text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Sidebar */}
                <div className="lg:w-[380px] flex-shrink-0">
                    <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 p-6 lg:p-8 sticky top-24 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('summary')}</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>{t('subtotal')}</span>
                                <span className="font-medium text-gray-700">{loading ? '...' : formatPrice(totalAmountInKRW)}</span>
                            </div>

                            {savingsKRW > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-600 flex items-center gap-1">
                                        <Sparkles size={14} />
                                        {t('savings')}
                                    </span>
                                    <span className="text-green-600 font-bold">-{formatPrice(savingsKRW)}</span>
                                </div>
                            )}

                            <div className="flex justify-between text-sm text-gray-500">
                                <span>{t('shipping')}</span>
                                {shippingCostKRW > 0 ? (
                                    <span className="font-medium text-gray-700">{formatPrice(shippingCostKRW)}</span>
                                ) : (
                                    <span className="text-green-600 font-bold">{t('free')}</span>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-5 mb-6">
                            <div className="flex justify-between items-end">
                                <span className="text-base font-bold text-gray-900">{t('total')}</span>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-gray-900 block">
                                        {loading ? '...' : formatPrice(finalTotalKRW)}
                                    </span>
                                    <span className="text-[11px] text-gray-400">{t('tax')}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold text-base hover:from-green-700 hover:to-green-600 transition-all shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                            onClick={() => alert('Checkout is disabled for this demo.')}
                        >
                            {t('checkout')}
                            <ArrowRight size={18} />
                        </button>

                        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <Shield size={14} className="text-green-500" />
                            {t('secure')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
