import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { OrderDetails } from '../models/orderDetails';
import { UserDetails } from '../models/userDetails';
import { OrderDetailsService } from '../services/order-details.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public userDetails: UserDetails;
  public orderDetails: OrderDetails;
  public smsMobile: number;
  public DEVICE_TYPE = {
    // goes inside static.config
    ANDROID: true,
    IOS: false,
  };

  constructor(
    private orderDetailsService: OrderDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    [this.userDetails, this.orderDetails] =
      this.orderDetailsService.getUserOrderDetails();
  }

  onUpiPay(upiType: string): void {
    if (!this.userDetails?.name) {
      this.paymentSuccess(false);
    } else {
      this.orderDetailsService.setUpiMethod(upiType).subscribe(
        (response) => {
          console.log(response);
          this.paymentSuccess(true);
        },
        (error) => {
          console.log(error);
          this.paymentSuccess(true); //calling Payment Success irespective of Payment resp from dummy server.
        }
      );
    }
  }

  onSmsPay(): void {
    if (
      (!this.smsMobile && !this.userDetails.phone) ||
      !this.orderDetails.amount
    ) {
      this.paymentSuccess(false);
    } else {
      const requestDetails = {
        mobile: this.smsMobile ? this.smsMobile : this.userDetails.phone,
        amount: this.orderDetails.amount,
      };
      this.orderDetailsService
        .sendUpiRequestOnMessage(requestDetails)
        .subscribe(
          (response) => {
            console.log(response);
            this.paymentSuccess(true);
          },
          (error) => {
            console.log(error);
            this.paymentSuccess(true); //calling Payment Success irespective of Payment resp from dummy server.
          }
        );
    }
  }

  private paymentSuccess(success: boolean): void {
    success
      ? this.router.navigate(['/paymentComplete'])
      : this.router.navigate(['']);
  }
}
