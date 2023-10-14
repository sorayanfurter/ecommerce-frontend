import { Product } from "./product.model";

export interface MyOrderDetails {
orderId : number;
orderFullName: string;
orderFullAddress: string;
orderContactNumber: string;
alternativeContactNumber: string;
orderStatus: string;
orderAmount: number;
product: Product;
user: any;


}
