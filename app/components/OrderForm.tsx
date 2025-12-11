"use client";

import { useEffect, useState } from "react";
import { User, Package, Truck, Check, Wallet, ShoppingCart, X } from "lucide-react";
import Products from "./Products";

export interface ProductInterface {
    id: string;
    title: string;
    price: number;
    detail: string;
    image_url: string;
    stock?: string;
}
interface CartItem extends ProductInterface {
    quantity: 1;
}

export default function OrderForm() {
    const [deliveryMethod, setDeliveryMethod] = useState("inside_dhaka");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        address: "",
        specialRequests: ""
    });

    useEffect(() => {
        const loadCart = () => {
            const stored = sessionStorage.getItem('cart');
            if (stored) {
                const items: CartItem[] = JSON.parse(stored);
                setCartItems(items);
            }
        };

        loadCart();

        const handleCartUpdate = () => loadCart();
        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const getDeliveryPrice = () => {
        switch (deliveryMethod) {
            case "inside_dhaka": return 70;
            case "outside_dhaka": return 100;
            case "outside_bangladesh": return 130;
            default: return 0;
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
    const total = subtotal + getDeliveryPrice();

    const generateOrderId = () => {
        const now = new Date();

        const YYYY = now.getFullYear().toString();
        const MM = (now.getMonth() + 1).toString().padStart(2, '0');
        const DD = now.getDate().toString().padStart(2, '0');
        const HH = now.getHours().toString().padStart(2, '0');
        const mm = now.getMinutes().toString().padStart(2, '0');

        const timestamp = `${YYYY}${MM}${DD}${HH}${mm}`;

        return 'INV-' + timestamp + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Please add at least one product.");
            return;
        }

        setSubmitting(true);

        const orderId = generateOrderId();
        const productList = cartItems.map(p => p.title).join(', ');

        const submissionData = {
            id: orderId,
            name: formData.name,
            mobile: `"${formData.mobile}"`,
            address: formData.address,
            product: productList,
            quantity: 1,
            price: total,
            shipping: deliveryMethod === "inside_dhaka" ? "Inside" :
                deliveryMethod === "outside_dhaka" ? "Outside" : "Subarea",
            payment: 'COD',
            instruction: formData.specialRequests
        };

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                alert("Order placed successfully! ✅ Your Order ID: " + orderId);
                setFormData({ name: "", mobile: "", address: "", specialRequests: "" });
                setCartItems([]);
                sessionStorage.removeItem('cart');
                window.dispatchEvent(new CustomEvent('cartUpdated'));
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const BDTFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'BDT',
        minimumFractionDigits: 0,
    });

    return (
        <section id="order-form" className="py-20 bg-gray-50 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                        Place your order
                    </p>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900">
                        এখনই অর্ডার করুন
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        নিচে আপনার বিবরণ পূরণ করুন এবং আমরা আপনার অর্ডার প্রক্রিয়া করব।
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid flex-row-reverse md:grid-cols-2 gap-10 bg-white rounded-3xl p-8 md:p-12">
                    {/* Left: Billing */}
                    <div className="space-y-8 order-2 md:order-1">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Billing Details</h3>
                        </div>

                        <div className="grid gap-6">
                            <input type="text" placeholder="Full Name *" required value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-5 py-4 border text-gray-800 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />

                            <input type="tel" placeholder="Phone Number *" required value={formData.mobile}
                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                className="w-full px-5 py-4 border text-gray-800 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />

                            <textarea rows={2} placeholder="Street Address *" required value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-5 py-4 border text-gray-800 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />

                            <textarea rows={4} placeholder="Special Requests (optional)" value={formData.specialRequests}
                                onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                                className="w-full px-5 py-4 border text-gray-800 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                                maxLength={500} />

                            <div className="mt-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Truck className="w-5 h-5 text-orange-600" />
                                    <h3 className="text-xl font-semibold text-gray-900">Shipping</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { id: "inside_dhaka", label: "ঢাকা সিটির মধ্যে:", price: "BDT 70" },
                                        { id: "outside_dhaka", label: "ঢাকার পার্শ্ববর্তী এলাকায় :", price: "BDT 100" },
                                        { id: "outside_bangladesh", label: "ঢাকার বাহিরে:", price: "BDT 130" },
                                    ].map(option => (
                                        <label key={option.id}
                                            className={`flex items-center justify-between p-5 border rounded-xl cursor-pointer transition-all ${deliveryMethod === option.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}>
                                            <div className="flex items-center gap-4">
                                                <input type="radio" name="delivery" value={option.id}
                                                    checked={deliveryMethod === option.id}
                                                    onChange={e => setDeliveryMethod(e.target.value)}
                                                    className="w-5 h-5 text-orange-600" />
                                                <p className="font-medium text-gray-900">{option.label}</p>
                                            </div>
                                            <span className="font-semibold text-gray-900">{option.price}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Details */}
                    <div className="space-y-8 order-1 md:order-2">
                        <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-orange-600" />
                            <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
                        </div>

                        <Products />

                        {/* Payment Info */}
                        <div className="mt-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Wallet className="w-5 h-5 text-orange-600" />
                                <h3 className="text-xl font-semibold text-gray-900">Payment Method</h3>
                            </div>
                            <div className="p-5 border border-orange-500 bg-orange-50 rounded-xl">
                                <p className="font-medium text-gray-900">Cash on Delivery</p>
                            </div>
                        </div>

                        {/* Order Summary */}
                        {cartItems.length > 0 && (
                            <div className="mt-6 p-6 bg-gray-50 rounded-xl space-y-3">
                                <h4 className="font-semibold text-gray-900">Order Summary</h4>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-900">Subtotal:</span>
                                    <span className="font-medium text-gray-900">{BDTFormatter.format(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-900">Delivery:</span>
                                    <span className="font-medium text-gray-900">{getDeliveryPrice()}৳</span>
                                </div>
                                <div className="pt-3 border-t border-gray-200 flex justify-between">
                                    <span className="font-bold text-gray-900">Total:</span>
                                    <span className="font-bold text-orange-600 text-lg">
                                        {BDTFormatter.format(total)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <div className="md:col-span-2 flex justify-center mt-10">
                            <button type="submit" disabled={submitting || cartItems.length === 0}
                                className="inline-flex items-center gap-3 px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                <Check className="w-6 h-6" />
                                {submitting ? "Processing..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}