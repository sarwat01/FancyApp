import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestApiService } from '../../Auth/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';
import { Chart, ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-user-traffic',
  templateUrl: './user-traffic.component.html',
  styleUrls: ['./user-traffic.component.css']
})
export class UserTrafficComponent implements OnInit {
  total=0
  data: any;
  Api = environment.apiUrl;
  langList: any[] = [];
  currentLang: string;
  payload: any;
  year: number = 2025;
   
month: number = 9; // September (changeable via UI)
trafficTable: { rx: number; tx: number; total: number }[] = [];
years: number[] = [];
selectedYear: number = new Date().getFullYear();
monthNames = [
    '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'
  ];


  constructor(
    private apiRest: RestApiService,
    public actRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private translate: TranslocoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  
    translate.langChanges$.subscribe(lang => {
      this.currentLang = lang;
      console.log('Language changed to', this.currentLang);

    });
  }
 ngOnInit(): void {

  const today = new Date();
  this.month = today.getMonth() + 1;
  this.year = today.getFullYear();

  const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear - i);
    }

  this.userTraffic(); // initial load
}



 onYearChange(): void {
    this.userTraffic();
  }

  onDateChange(): void {
  this.userTraffic();
}

 loading = false;

userTraffic(): void {
  this.total=0
  this.loading = true;

  const data = {
    report_type: "daily",
    month: this.month,
    year: this.selectedYear,
    user_id: null,
  };

  const CryptoJS = require("crypto-js");
  const cypData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "abcdefghijuklmno0123456789012345"
  );

  const payload = { payload: cypData.toString() };
  const link = `${environment.apiUrl}/api/index.php/api/traffic`;

  this.apiRest.post(link, payload).subscribe({
    next: (ptr: any) => {
      this.loading = false;
      this.trafficTable = ptr.data.rx.map((rx: number, index: number) => ({
        rx: rx || 0,
        tx: ptr.data.tx[index] || 0,
        total: ptr.data.total[index] || 0,
      }));

      ptr.data.total.forEach(element => {
        console.log(element);
        this.total +=element
      });
    },
    error: (err) => {
      this.loading = false;
      console.error("Error!!", err);
    },
  });
}
  
 /*   userTraffic(): void {
    const data = {
      "page":1,
      "count":15,
      "sortBy":"radacctid",
      "direction":"desc"
    }; 
    const CryptoJS = require('crypto-js');
      const cypData = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        'abcdefghijuklmno0123456789012345'
      );
     const payload = { payload: cypData.toString() };
     const link = `${environment.apiUrl}/api/index.php/api/index/traffic`;
      this.apiRest.post(link,payload).subscribe((ptr: any) => {
        console.log(ptr);
        
       this.data=ptr.data
      
        });
    } */
    
formatBytes(bytes: number, decimals = 2): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

}
