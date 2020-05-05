import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductScreenComponent} from './components/product-screen/product-screen.component';
import { ProductCreateComponent} from './components/product-create/product-create.component';
import { ProductEditComponent} from './components/product-edit/product-edit.component';
import { ProductAboutComponent} from './components/product-about/product-about.component';

//Setting up the routes of the web app

const routes: Routes = [{
  path:'', pathMatch: 'full', redirectTo: 'product-screen'},
  {path: 'product-screen', component: ProductScreenComponent },
  {path: 'create-product', component: ProductCreateComponent},
  {path: 'edit-product/:id', component: ProductEditComponent},
  {path: 'about-product', component: ProductAboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
