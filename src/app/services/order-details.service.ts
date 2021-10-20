import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { UserDetails } from '../models/userDetails';
import { OrderDetails } from '../models/orderDetails';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  private basePaymentsURL = 'https://localhost:8080';
  private orderDetailsSubject = new ReplaySubject(1);
  private orderDetails = this.orderDetailsSubject.asObservable();
  constructor(private http: HttpClient) {}

  private resetOrderDetails(): void {
    this.orderDetailsSubject.next({});
  }

  public getUserOrderDetails(): Observable<any> {
    return this.orderDetails;
  }

  public setUserOrderDetails(
    userDetails: UserDetails,
    orderDetails: OrderDetails
  ): void {
    this.orderDetailsSubject.next([userDetails, orderDetails]);
  }

  public setUpiMethod(upiType: string): void {
    this.http.post(`${this.basePaymentsURL}/${upiType}`, {}).subscribe(
      //Errors can be caught even before subscribing to an observable using CatchError operator, here i'm logging error for visualization.
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.resetOrderDetails();
  }

  public sendUpiRequestOnMessage(requestData): void {
    this.http
      .post(`${this.basePaymentsURL}/Send`, {
        params: new HttpParams()
          .set('mobileNumber', requestData.mobile)
          .set('amount', requestData.amount),
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    this.resetOrderDetails();
  }
}
