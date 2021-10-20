import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { PaymentComponent } from './payment/payment.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'payments', component: PaymentComponent },
  { path: 'paymentComplete', component: OrderCompleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
