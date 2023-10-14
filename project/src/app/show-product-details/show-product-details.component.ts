import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit{

  showLoadMoreProductsButton= false;
  showTable= false;
  pageNumber:number = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price','Images', 'Edit', 'Delete'];


  constructor(private productService: ProductServiceService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router){}

 ngOnInit(): void {
  this.getAllProducts();
  }

  searchByKeyword(searchkeyword:string){
  this.pageNumber = 0;
  this.productDetails = [];
  this.getAllProducts(searchkeyword);


  }

  public getAllProducts(searchKeyword:string = '') {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKeyword)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    ).subscribe(
      (resp: Product[])=> {
      console.log(resp)
      resp.forEach((product => this.productDetails.push(product)));
      this.showTable = true;
      if(resp.length == 6){
        this.showLoadMoreProductsButton =true;
      } else {
        this.showLoadMoreProductsButton = false;
      }
     // this.productDetails = resp;
      }, (error: HttpErrorResponse) =>{
        console.log(error);
      }
      );
  }

  deleteProduct(productId:number){
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
       this.getAllProducts();
      },
      (error:HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data:{
        images:product.productImages
      },
      height:'500px',
      width:'800px'
    });
  }

  editProductDetails(productId:number){
    this.router.navigate(['/addNewProduct', {productId: productId}]);
  }

  loadMoreProducts(){
  this.pageNumber = this.pageNumber + 1;
  this.getAllProducts();
  }

}
