import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/payments/create';

  constructor(private http: HttpClient) {}

  createPayment(token: string, amount: number): Observable<any> {
    return this.http.post(this.apiUrl, { token, amount });
  }
}
