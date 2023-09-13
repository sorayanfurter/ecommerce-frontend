import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductServiceService } from '../_services/product-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0
  }

  constructor(private productService:ProductServiceService){}
  ngOnInit(): void {

  }

   addProduct(productForm: NgForm){
    this.productService.addProduct(this.product).subscribe(
      (response:Product)=> {
        console.log(response);
      },
      (error:HttpErrorResponse)=> {
        console.log(error)
      }
    )
   }

}
