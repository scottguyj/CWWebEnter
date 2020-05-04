import { Component, OnInit } from '@angular/core';
import { Product } from './../../model/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from './../../service/api.service';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  submitted = false;
  editProductForm: FormGroup;
  productData: Product[];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(){
    this.updateProductInfo();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getProduct(id);
    

    this.editProductForm= this.fb.group({
      name:['', [Validators.required]],
      location: ['', [Validators.required]],
      expiry:['', [Validators.required]],
      amount:['',[Validators.required, Validators.pattern('^[0-9]+$')]],
      days:['0',[Validators.pattern('^[0-9]+$')]]
    })
  }

  get myForm(){
    return this.editProductForm.controls;
  }

  getProduct(id){
    this.apiService.getProduct(id).subscribe(data => {
      this.editProductForm.setValue({
        name: data['name'],
        location: data['location'],
        expiry: data['expiry'],
        amount: data['amount'],
        days: data['days']
      });
    });
  }

  updateProductInfo(){
    this.editProductForm = this.fb.group({
      name:['', [Validators.required]],
      location: ['', [Validators.required]],
      expiry:['', [Validators.required]],
      amount:['',[Validators.required, Validators.pattern('^[0-9]+$')]],
      days:['0',[Validators.pattern('^[0-9]+$')]]
    })
  }

  

  onSubmit(){
    //input Sanitizer
    var name = this.editProductForm.value['name'];
    var cleanName = name.replace(/[^a-zA-Z0-9]/g,'');

    var location = this.editProductForm.value['location'];
    var cleanLocation = location.replace(/[^a-zA-Z0-9]/g,'');

    var expiryNew = this.editProductForm.value['expiry'];
    var amountNew = this.editProductForm.value['amount'];
    var daysNew = this.editProductForm.value['days'];

    this.editProductForm.setValue({name: cleanName, location: cleanLocation, expiry: expiryNew, amount: amountNew, days:daysNew})

    if(!this.editProductForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure you want to Update this product?')){
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateProduct(id, this.editProductForm.value).subscribe(res => {
          this.router.navigateByUrl('/product-screen');
          console.log('Product Updated!')
        }, (err) => {
          console.log(err)
        })
      }
    }
  }

}

export class DateValidator {
    static usDate(control: FormControl): { [key: string]: any } {
      let usDatePattern = /^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/;

      if (!control.value.match(usDatePattern))
          return { "usDate": true };

      return null;
  }
}
