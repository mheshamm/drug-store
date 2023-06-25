import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { TestComponent } from '../shared/components/test/test.component';
import { CreateOrderComponent } from '../feature/orders/components/create-order/create-order.component';
import { OrdersPageComponent } from '../feature/orders/pages/orders-page/orders-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/' + 'orders', pathMatch: 'full' },
  {
    path:'',
    component : LayoutComponent ,

    children : [

      {
        path : 'orders',
        loadComponent: () =>
      import('../feature/orders/pages/orders-page/orders-page.component').then(
        (x) => x.OrdersPageComponent
      ),
        data : {
          breadcrumb: {
            label: 'Home',
            icon: 'home',
          },
        }
      }
    ],

  }
  ,
  {
    path : '**',
    redirectTo : '/orders',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
