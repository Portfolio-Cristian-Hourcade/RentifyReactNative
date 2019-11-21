import { Message } from "./Message";

export interface Chat{
    $key:string;
    keySeller:string;
    keyBuyer:string;
    keyProduct:string;
    keyCompra?:string;
    messages:Message[];
    dateStart:string;
    dateFinish:string;
    status:number; // 1 Online - 2 Chat cerrado.
}