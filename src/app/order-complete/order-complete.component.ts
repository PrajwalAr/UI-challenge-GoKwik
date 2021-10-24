import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from '../services/order-details.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss'],
})
export class OrderCompleteComponent implements OnInit {
  constructor(private orderDetailsService: OrderDetailsService) {}

  ngOnInit(): void {
    this.orderDetailsService.resetOrderDetails();
  }
}
