import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { Product } from 'src/app/model/product';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-product-screen',
  templateUrl: './product-screen.component.html',
  styleUrls: ['./product-screen.component.css']
})
export class ProductScreenComponent implements OnInit {

  Products: any = [];
  
  

  

  constructor(
    private apiService: ApiService
  ) { 
    this.readProducts();
    this.Products.forEach(function (item, index){
      console.log(item, index)
    })
  }

  ngOnInit() {}

  readProducts(){
    this.apiService.getProducts().subscribe((data) => {
      this.Products = data;
    })
  }


  removeProduct(product, index) {
    if(window.confirm('Are you sure?')) {
      this.apiService.deleteProduct(product._id).subscribe((data) => {
        this.Products.splice(index, 1);
      })
    }
  }
}





