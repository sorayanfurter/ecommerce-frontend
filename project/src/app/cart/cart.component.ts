import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];

  cartDetails:any[] = [];

  constructor(private productService: ProductServiceService, private router: Router){}

  ngOnInit():void{
    this.getCartDetails();

  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response:any)=>{
        console.log(response);
        this.cartDetails = response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  checkOut(){
    this.router.navigate(['/buyProduct', {isSingleProductCheckout:false,id: 0}]);

  /*
  this.productService.getProductDetails(false, 0).subscribe(
    (resp)=> {
      console.log(resp);
    }, (err)=> {
      console.log(err);
    }
  )*/
  }

  deleteCartItem(cartId:number){
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp)=> {
        console.log(resp)
        this.getCartDetails();
      }, (err)=> {
        console.log(err);
      }
    )

  }

}
