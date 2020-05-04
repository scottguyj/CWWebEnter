import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductScreenComponent } from './components/product-screen/product-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http'

import {ApiService} from './service/api.service';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductAboutComponent } from './components/product-about/product-about.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductScreenComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductAboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
