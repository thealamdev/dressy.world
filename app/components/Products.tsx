"use client";

import { ProductService } from '@/services/ProductService';
import { useEffect, useState } from 'react';
import { ProductInterface } from './OrderForm';
import Image from 'next/image';

export default function Products() {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    useEffect(() => {
        // Load products
        ProductService()
            .then((data) => setProducts(data))
            .finally(() => setLoading(false));

        // Restore selected products from sessionStorage
        const storedCart: ProductInterface[] = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const selectedIds = storedCart.map(p => p.id);
        setSelectedProducts(selectedIds);
    }, []);

    const BDTFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'BDT',
        minimumFractionDigits: 0,
    });

    const handleCheckboxChange = (product: ProductInterface, checked: boolean) => {
        const existing: ProductInterface[] = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const productId = product.id;

        if (checked) {
            const alreadyAdded = existing.some((p) => p.id === productId);
            if (!alreadyAdded) {
                const updatedCart = [...existing, { ...product, quantity: 1 }];
                sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            }

            setSelectedProducts((prev) => [...prev, productId]);
        } else {
            const updatedCart = existing.filter((p) => p.id !== productId);
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));

            setSelectedProducts((prev) => prev.filter((id) => id !== productId));
        }

        window.dispatchEvent(new CustomEvent('cartUpdated'));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="bg-white px-4">
            <div className="max-w-4xl mx-auto">
                <p className="text-orange-500 pb-3 text-sm font-semibold uppercase tracking-wider text-center">
                    Our Products
                </p>
                <div className="grid grid-cols-1 gap-6">
                    {products.map((product) => (
                        <label
                            key={product.id}
                            className="flex gap-4 items-center p-4 border rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <input
                                type="checkbox"
                                checked={selectedProducts.includes(product.id)}
                                onChange={(e) => handleCheckboxChange(product, e.target.checked)}
                                className="w-6 h-6 accent-orange-500 mr-4"
                            />
                            <Image
                                width={60}
                                height={60}
                                src={product.image_url}
                                alt='product-image'
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-5.5">{product.title}</h3>
                                    {product.stock && (
                                        <span className="text-sm text-white bg-orange-500 px-3 py-1 rounded-full mt-2 inline-block">
                                            {product.stock}
                                        </span>
                                    )}
                                </div>

                                <span className="text-orange-600 font-extrabold text-xl">
                                    {BDTFormatter.format(product.price)}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
