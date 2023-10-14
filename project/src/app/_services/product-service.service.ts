import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>("http://localhost:8080/addNewProduct", product);
  }

  public getAllProducts(pageNumber:number, searchKeyword:string = ""){
    return this.httpClient.get<Product[]>("http://localhost:8080/getAllProducts?pageNumber=" + pageNumber + "&searchKey=" + searchKeyword);
  }

  public getProductDetailsById(productId:any){
   return this.httpClient.get<Product>("http://localhost:8080/getProductDetailsById/" + productId);
  }

  public deleteProduct(productId:number){
    return this.httpClient.delete("http://localhost:8080/deleteProductDetails/" + productId);
  }

  public getProductDetails(isSingleProductCheckout:any, productId:any){
    return this.httpClient.get<Product[]>("http://localhost:8080/getProductDetails/"+isSingleProductCheckout +"/"+productId);
  }

  public getAllOrderDetailsForAdmin(status:string): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:8080/getAllOrderDetails/" + status);
  }

  public getMyOrders(): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:8080/getOrderDetails");
  }

  public placeOrder(orderDetails:OrderDetails, isSingleProductCheckOut: string){
    return this.httpClient.post("http://localhost:8080/placeOrder/" + isSingleProductCheckOut , orderDetails);
  }

  public addToCart(productId:number){
    return this.httpClient.get("http://localhost:8080/addToCart/" + productId);
  }

  public getCartDetails(){
    return this.httpClient.get("http://localhost:8080/getCartDetails");
  }

  public deleteCartItem(cartId:number){
    return this.httpClient.delete("http://localhost:8080/deleteCartItem/" + cartId);
  }

  public markAsDelivered(orderId:number){
    return this.httpClient.get("http://localhost:8080/markOrderAsDelivered/" + orderId);
  }


}
