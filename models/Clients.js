export interface Clients {
    $key: string;
    email: string;
    wallet: Wallet[];
    keysFavorite: string[];
    keysHistory: string[];
    keysShopping: string[];
    keysSales: string[];
    notification: Notification[];
    keysProduct: string[];
    keysChats: string[];
}