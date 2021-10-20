import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { OrderDetails } from '../models/orderDetails';
import { UserDetails } from '../models/userDetails';
import { OrderDetailsService } from '../services/order-details.service';

enum ORDER {
  USER_DETAILS,
  ORDER_DETAILS,
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  public userDetails: UserDetails;
  public orderDetails: OrderDetails;
  public smsMobile: number;
  private orderDetailsSubscription: Subscription;
  public DEVICE_TYPE = {
    // goes inside static.config
    ANDROID: true,
    IOS: false,
  };

  constructor(
    private orderDetailsService: OrderDetailsService,
    private router: Router
  ) {
    this.orderDetailsSubscription = this.orderDetailsService // Idealy should be fetched by router's resolver
      .getUserOrderDetails() // considering the scale of application, i have made use of RXJS Replay subject instead
      .subscribe((userOrderDetails) => {
        this.userDetails = {
          ...userOrderDetails[ORDER.USER_DETAILS],
        };
        this.orderDetails = {
          ...userOrderDetails[ORDER.ORDER_DETAILS],
        };
      });
  }

  ngOnInit(): void {}

  onUpiPay(upiType: string): void {
    if (!this.userDetails?.name) {
      this.paymentSuccessFlow(false);
    } else {
      this.orderDetailsService.setUpiMethod(upiType);
      this.paymentSuccessFlow(true);
    }
  }

  onSmsPay(): void {
    if (!this.smsMobile && !this.userDetails.phone) {
      this.paymentSuccessFlow(false);
    } else {
      const requestDetails = {
        mobile: this.smsMobile ? this.smsMobile : this.userDetails.phone,
        amount: this.orderDetails.amount,
      };
      this.orderDetailsService.sendUpiRequestOnMessage(requestDetails);
      this.paymentSuccessFlow(true);
    }
  }

  paymentSuccessFlow(success: boolean): void {
    success
      ? this.router.navigate(['/paymentComplete'])
      : this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.orderDetailsSubscription.unsubscribe();
  }
}
