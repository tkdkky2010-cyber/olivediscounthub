"use client";

import { useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Shield } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { useCurrencyContext } from "@/context/CurrencyContext";
import { getProductTranslation, getBrandTranslation } from "@/data/product-translations";

export default function CartDrawer() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartCount, isDrawerOpen, closeDrawer } = useCart();
    const { formatPrice, loading } = useCurrencyContext();
    const locale = useLocale();
    const t = useTranslations("Cart");

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isDrawerOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeDrawer();
        };
        if (isDrawerOpen) document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isDrawerOpen, closeDrawer]);

    const totalAmountInKRW = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalOriginalKRW = cart.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
    const savingsKRW = totalOriginalKRW - totalAmountInKRW;

    const FREE_SHIPPING_THRESHOLD = 50000;
    const shippingCostKRW = totalAmountInKRW > FREE_SHIPPING_THRESHOLD ? 0 : 3000;
    const finalTotalKRW = totalAmountInKRW + shippingCostKRW;
    const shippingProgress = Math.min((totalAmountInKRW / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totalAmountInKRW;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={closeDrawer}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white dark:bg-gray-900 z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={20} className="text-primary" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("title")}</h2>
                        {cartCount > 0 && (
                            <span className="ml-1 bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeDrawer}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Empty State */}
                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-5">
                            <ShoppingBag className="w-9 h-9 text-gray-300 dark:text-gray-600" />
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t("empty")}</p>
                        <p className="text-sm text-gray-400">{t("emptyDesc")}</p>
                    </div>
                ) : (
                    <>
                        {/* Free Shipping Progress */}
                        {totalAmountInKRW < FREE_SHIPPING_THRESHOLD && (
                            <div className="px-5 py-3 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800/30">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Truck size={14} className="text-green-600" />
                                    <span className="text-xs font-medium text-green-700 dark:text-green-400">
                                        {t("freeShippingProgress", { amount: formatPrice(amountToFreeShipping) })}
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-green-100 dark:bg-green-800/40 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                                        style={{ width: `${shippingProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                    {/* Image */}
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white dark:bg-gray-700 flex-shrink-0">
                                        <img
                                            src={item.imageUrl}
                                            alt={getProductTranslation(item.id, item.name, locale)}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wide">
                                            {getBrandTranslation(item.brand, locale)}
                                        </p>
                                        <h4 className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight mb-1">
                                            {getProductTranslation(item.id, item.name, locale)}
                                        </h4>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                {loading ? "..." : formatPrice(item.price)}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${item.quantity <= 1 ? "text-gray-300 dark:text-gray-600" : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 ml-1"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Footer */}
                        <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-4 space-y-3 bg-gray-50/50 dark:bg-gray-800/30">
                            {/* Subtotal */}
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">{t("subtotal")}</span>
                                <span className="font-medium text-gray-700 dark:text-gray-300">{loading ? "..." : formatPrice(totalAmountInKRW)}</span>
                            </div>

                            {/* Savings */}
                            {savingsKRW > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-600">{t("savings")}</span>
                                    <span className="text-green-600 font-bold">-{formatPrice(savingsKRW)}</span>
                                </div>
                            )}

                            {/* Shipping */}
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">{t("shipping")}</span>
                                {shippingCostKRW > 0 ? (
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{formatPrice(shippingCostKRW)}</span>
                                ) : (
                                    <span className="text-green-600 font-bold">{t("free")}</span>
                                )}
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-end">
                                <div>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{t("total")}</span>
                                    <p className="text-[10px] text-gray-400">{t("tax")}</p>
                                </div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    {loading ? "..." : formatPrice(finalTotalKRW)}
                                </span>
                            </div>

                            {/* Checkout Button */}
                            <button
                                className="w-full py-3.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold text-sm hover:from-green-700 hover:to-green-600 transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                                onClick={() => alert("Checkout is disabled for this demo.")}
                            >
                                {t("checkout")}
                            </button>

                            {/* Secure */}
                            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                                <Shield size={12} className="text-green-500" />
                                {t("secure")}
                            </div>

                            {/* Clear Cart */}
                            <button
                                onClick={() => { if (confirm(t("clearCartConfirm"))) clearCart(); }}
                                className="w-full text-center text-xs text-gray-400 hover:text-red-500 transition-colors pt-1"
                            >
                                {t("clearCart")}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
