import { Component, OnInit, NgZone, Sanitizer } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './../../service/api.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent implements OnInit {
  submitted = false;
  productForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit(){
  }

  mainForm(){
    this.productForm = this.fb.group({
      name:['', [Validators.required]],
      location: ['', [Validators.required]],
      expiry:['', [Validators.required, DateValidator.usDate]],
      amount:['',[Validators.required]],
      days:['0',[Validators.pattern('^[0-9]+$')]]
    })
  }

  get myForm(){
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    //input Sanitizer
    var name = this.productForm.value['name'];
    var cleanName = name.replace(/[^a-zA-Z0-9 ]/g,'');

    var location = this.productForm.value['location'];
    var cleanLocation = location.replace(/[^a-zA-Z0-9 ]/g,'');

    var expiryNew = this.productForm.value['expiry'];

    var amount = this.productForm.value['amount'];
    var amountNew = amount.replace(/[^a-zA-Z0-9 ]/g,'');

    var daysNew = this.productForm.value['days'];

    this.productForm.setValue({name: cleanName, location: cleanLocation, expiry: expiryNew, amount: amountNew, days:daysNew})
    if(!this.productForm.valid){
      return false;
    } else {
      this.apiService.createProduct(this.productForm.value).subscribe((res) => {
        console.log('Employee successfully added!')
        this.ngZone.run(()=> this.router.navigateByUrl('/product-screen'))
      }, (err) => {
        console.log(err);
      })
    }
  }

}
import { FormControl } from '@angular/forms';


export class DateValidator {
  static usDate(control: FormControl): { [key: string]: any } {
    let usDatePattern = /^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/;

    if (!control.value.match(usDatePattern))
        return { "usDate": true };

    return null;
}
}
