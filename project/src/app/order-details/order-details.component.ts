import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { DataSource } from '@angular/cdk/collections';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColummns: string[] = ['Id', 'Product Name', 'Name', 'Address','Contact Number', 'Status', 'Action' ]
  dataSource: any[] = [];
  status:string ='All';

  constructor(private productService:ProductServiceService){}

  ngOnInit(): void{
    this.getAllOrderDetailsForAdmin(this.status);

  }

  getAllOrderDetailsForAdmin(statusParameter:string){
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (resp)=> {
        this.dataSource = resp;
        console.log(resp);
      }, (err)=> {
        console.log(err);
      }
    );
  }

  markAsDelivered(orderId:number){
   this.productService.markAsDelivered(orderId).subscribe(
    (resp)=> {
      this.getAllOrderDetailsForAdmin(this.status);
    }, (err)=> {
      console.log(err);
    }
   )
  }

}
