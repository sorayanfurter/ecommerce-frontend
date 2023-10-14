import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns = ['Name', 'Address', 'Contact Number', 'Amount', 'Status'];

  myOrderDetails: MyOrderDetails[] = [];
  constructor(private productService: ProductServiceService){}

  ngOnInit(): void{
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.productService.getMyOrders().subscribe(
      (resp: MyOrderDetails[])=>{
        console.log(resp)
        this.myOrderDetails = resp;
      }, (err:any) => {
        console.log(err)
      }
    );
  }

}
