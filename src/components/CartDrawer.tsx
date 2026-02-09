"use client";

import { useEffect } from "react";
import { X, Trash2, Plus, Minus } from "lucide-react";
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
    const TAX_RATE = 0.10;
    const taxAmountKRW = Math.round(totalAmountInKRW * TAX_RATE);
    const shippingCostKRW = 0; // Free shipping
    const finalTotalKRW = totalAmountInKRW + shippingCostKRW + taxAmountKRW;

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
                {/* Green Header */}
                <div className="flex items-center justify-between px-5 py-4 bg-[#4CAF50]">
                    <h2 className="text-lg font-bold text-white">{t("title")}</h2>
                    <button
                        onClick={closeDrawer}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={22} className="text-white" />
                    </button>
                </div>

                {/* Cart Content Area */}
                <div className="flex-1 overflow-y-auto">
                    {cart.length === 0 ? (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center h-full text-center px-6">
                            {/* Shopping Cart SVG Icon */}
                            <svg
                                width="100"
                                height="100"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mb-6 text-gray-300"
                            >
                                <path d="M25 25H15L5 85H80L70 25H60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M35 25C35 16.7 41.7 10 50 10C58.3 10 65 16.7 65 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="30" cy="90" r="5" fill="currentColor"/>
                                <circle cx="65" cy="90" r="5" fill="currentColor"/>
                                <path d="M20 40H65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M22 50H63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M24 60H61" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <p className="text-base text-gray-400">{t("empty")}</p>
                        </div>
                    ) : (
                        /* Cart Items */
                        <div className="px-4 py-3 space-y-3">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                    {/* Product Image */}
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white dark:bg-gray-700 flex-shrink-0 border border-gray-100">
                                        <img
                                            src={item.imageUrl}
                                            alt={getProductTranslation(item.id, item.name, locale)}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-0.5">
                                            {getBrandTranslation(item.brand, locale)}
                                        </p>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight mb-2">
                                            {getProductTranslation(item.id, item.name, locale)}
                                        </h4>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                {loading ? "..." : formatPrice(item.price)}
                                            </span>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-0.5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className={`w-7 h-7 flex items-center justify-center rounded-full border text-xs transition-colors ${
                                                        item.quantity <= 1
                                                            ? "text-gray-300 border-gray-200 dark:text-gray-600 dark:border-gray-600"
                                                            : "text-gray-600 border-gray-300 dark:text-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    }`}
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-7 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-500 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 ml-1 transition-colors"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart */}
                            {cart.length > 0 && (
                                <button
                                    onClick={() => { if (confirm(t("clearCartConfirm"))) clearCart(); }}
                                    className="w-full text-center text-xs text-gray-400 hover:text-red-500 transition-colors py-2"
                                >
                                    {t("clearCart")}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Summary Footer - Always Visible */}
                <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4">
                    {/* Product Amount */}
                    <div className="flex justify-between items-center py-1.5">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{t("productAmount")}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {loading ? "..." : formatPrice(totalAmountInKRW)}
                        </span>
                    </div>

                    {/* Shipping Fee */}
                    <div className="flex justify-between items-center py-1.5">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{t("shipping")}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {loading ? "..." : formatPrice(shippingCostKRW)}
                        </span>
                    </div>

                    {/* Tax (10%) */}
                    <div className="flex justify-between items-center py-1.5">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{t("taxRate")}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {loading ? "..." : formatPrice(taxAmountKRW)}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

                    {/* Total Amount */}
                    <div className="flex justify-between items-center py-1.5">
                        <span className="text-base font-bold text-gray-900 dark:text-white">{t("totalAmount")}</span>
                        <span className="text-base font-bold text-gray-900 dark:text-white">
                            {loading ? "..." : formatPrice(finalTotalKRW)}
                        </span>
                    </div>

                    {/* Order Button */}
                    <button
                        disabled={cart.length === 0}
                        className={`w-full py-3.5 rounded-lg font-bold text-sm mt-3 transition-all ${
                            cart.length === 0
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                : "bg-[#4CAF50] text-white hover:bg-[#43A047] shadow-lg shadow-green-600/20"
                        }`}
                        onClick={() => {
                            if (cart.length > 0) {
                                alert("Checkout is disabled for this demo.");
                            }
                        }}
                    >
                        {t("order")}
                    </button>
                </div>
            </div>
        </>
    );
}
