import { Ask } from "./Ask";
import { Review } from "./Review";

export interface Product {
    $key?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    outstanding: number; // 1 normal - 2 premium - 3 ultra premium
    views: number;
    asks?: Ask[];
    reviews?: Review[];
    offer?: number;
    ubication: string;
    sales:number;
    condition: number; // 1 nuevo - 2 usado
    keyOwner: string;
}