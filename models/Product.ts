import { Ask } from "./Ask";
import { Review } from "./Review";

export interface Product {

    $key?: string;
    name: string;
    description: string;
    price: number;
    ubicacion: any;
    ubicacionGPS:any;
    type: string;
    pisoDp:any;
    plan: number; // 1 normal - 2 premium - 3 ultra premium
    views: number;
    prestaciones:any;
    normas:any;
    images:any[];
    imagesTemp?:any[]
    asks?: Ask[];
    reviews?: Review[];
    offer?: number;
    sales:number;
    keyOwner: string;
}