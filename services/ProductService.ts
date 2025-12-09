"use server";

import { ProductInterface } from "@/app/components/OrderForm";

export async function ProductService(): Promise<ProductInterface[]> {
    const url = "https://script.google.com/macros/s/AKfycbwnRbKptruzBPneY4XhPo8pAS7VQFDS3Rq14UlCIFjSrvyVKQtyGLzHpSBKtY_f_BNRJQ/exec";
    const res = await fetch(url, {
        method: "GET",
        mode: "cors",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json() as Promise<ProductInterface[]>;
}