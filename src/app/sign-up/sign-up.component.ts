import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDetails } from '../models/orderDetails';
import { UserDetails } from '../models/userDetails';
import { OrderDetailsService } from '../services/order-details.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userName: string;
  userEmail: string;
  userMobile: number;
  userAddress: string;
  constructor(
    private orderDetailsService: OrderDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSignUp(formData: NgForm) {
    const userDetails: UserDetails = {
      ...formData.value,
    };
    const orderDetails: OrderDetails = {
      // since i couldn't find the flow for COD , i have made the deafult Payment type as UPI for now.
      orderType: 'UPI',
      amount: Math.floor(Math.random() * 1000),
    };
    this.orderDetailsService.setUserOrderDetails(userDetails, orderDetails);
    this.router.navigate(['payments']);
  }
}
