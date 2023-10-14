import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { Observable, map } from 'rxjs';
import { ProductServiceService } from './_services/product-service.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService  implements Resolve<Product[]> {

  //let isSingleProductCheckout = false;

  constructor(private productService:ProductServiceService, private imageProcessingService: ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return this.productService.getProductDetails(isSingleProductCheckout, id)
    .pipe(
      map(
        (x:any, i:any) => x.map((product: Product) => this.imageProcessingService.createImages(product))
      )
    );
  }
}
