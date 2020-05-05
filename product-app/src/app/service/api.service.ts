import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUri:string = '/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //Create Product
  createProduct(data): Observable<any> {
    let url = `${this.baseUri}/add-product`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
      )  
  }

  //Get all Products
  getProducts(){
    return this.http.get(`${this.baseUri}/products`)
  }

  // Get a Product
  getProduct(id): Observable<any> {
    let url = `${this.baseUri}/product/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update product
  updateProduct(id, data): Observable<any> {
    let url = `${this.baseUri}/edit-product/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  
  //Delete a product

  deleteProduct(id): Observable<any> {
    let url = `${this.baseUri}/delete-product/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //error Handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `ErrorCode: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
