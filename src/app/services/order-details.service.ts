import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/userDetails';
import { OrderDetails } from '../models/orderDetails';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  private basePaymentsURL = 'https://localhost:8080'; //Dummy Server URL
  constructor(private http: HttpClient) {}

  public resetOrderDetails(): void {
    localStorage.removeItem('OrderDetails');
  }

  public getUserOrderDetails(): [UserDetails, OrderDetails] {
    let orderDetails = JSON.parse(localStorage.getItem('OrderDetails'));
    return orderDetails?.length
      ? JSON.parse(localStorage.getItem('OrderDetails'))
      : [{}, {}];
  }

  public setUserOrderDetails(
    userDetails: UserDetails,
    orderDetails: OrderDetails
  ): void {
    localStorage.setItem(
      'OrderDetails',
      JSON.stringify([userDetails, orderDetails])
    );
  }

  public setUpiMethod(upiType: string): Observable<any> {
    return this.http.post(`${this.basePaymentsURL}/${upiType}`, {});
  }

  public sendUpiRequestOnMessage(requestData): Observable<any> {
    return this.http.post(`${this.basePaymentsURL}/sendSms`, {
      params: new HttpParams()
        .set('mobileNumber', requestData.mobile)
        .set('amount', requestData.amount),
    });
  }
}
