export interface Transaction{
    $key:string;
    keyProduct:string;
    datePayment:string;
    amount:number;
    unitPrice: number;
    totalPrice: number;
    keyChat?:string;
    status:number; // 1 todavía no ricibió el producto - 2 recibió el producto - 3 Devolucion del dinero / compra cacelada 
    tokenMp: string;
    keySeller: string;
    keyBuyer: string;
}