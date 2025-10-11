import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Auth/services/auth.service';
import { TranslocoService } from '@ngneat/transloco';
import { RestApiService } from '../../Auth/shared.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { interval, Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';



@Component({
  selector: 'app-fib',
  templateUrl: './fib.component.html',
  styleUrls: ['./fib.component.css']
})
export class FIBComponent implements OnInit {
  balanceStatusSubscription: Subscription | undefined;

  Api = environment.apiUrl;
  payload: any;
  price: number
  paymentId: any
  token: any
  packages: any = [];
  currentPackage: any = {};
  balanceInfo: any = {}
  expirationDateFormatted: string = '';
  isProfileExpired: boolean = false;
  selectedBank: string | null = null;
  banks = [
    {
      id: 'FIB',
      name: 'FIB',
      image: '../../../../assets/images/Desktop.png'
    },
   /*  {
      id: 'Other',
      name: 'FastPay',
 image: '../../../../assets/images/fastpay.png'
    }  */
  ];
  cardAmounts: any = [];
  paymentResponse: any = null;
  loading: boolean = false;
  errorMessage: string = '';
  showJson = false;
  langList: any[] = [];
  currentLang: string;
  data: any
  username: any;
  password: any;
  fcm: any;
 isLoading = false;

  constructor(private http: HttpClient,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
    private tostService: ToastrService,
    private service: TranslocoService,
    private translate: TranslocoService,
    private apiRest: RestApiService
  ) {
    translate.langChanges$.subscribe((lang) => {
      this.currentLang = lang;
      console.log('Language changed to', this.currentLang);
    });
  }

  ngOnInit(): void {
    this.getInfo()
    this.getAllpackage();
    this.getCurrentPackage()
    this.getBalanceInfo()

    // Send a log to React Native WebView
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'LOG',
        message: '📡 Angular is ready (ngOnInit triggered)',
      }));
    }

    // Optionally: Request credentials
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'REQUEST_CREDENTIALS' }));
    }

    // Listen for credentials
    window.addEventListener('message', this.handleCredentialMessage);
  }
  ngOnDestroy(): void {
    // ✅ Clean up listener
    window.removeEventListener('message', this.handleCredentialMessage);
  }

  // ✅ Define the method here
  handleCredentialMessage = (event: MessageEvent) => {

    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

      if (data && data.username) {

        this.username = data.username
        this.password = data.password
        this.fcm = data.fcm

        // Proceed with your login logic here
      } else {
        // Ignore empty/invalid messages
        console.log('Ignored invalid message:', data);
      }
    } catch (error) {
      console.error('❌ Error handling message from RN:', error);
    }
  };

  getCurrentPackage() {
    const link = `${environment.apiUrl}/api/index.php/api/service`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      this.currentPackage = ptr.data.price;
    });
  }
  getBalanceInfo() {
    const link = `${environment.apiUrl}/api/index.php/api/service`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      this.balanceInfo = ptr.data;

      const expirationDate = new Date(this.balanceInfo.expiration);
      const now = new Date();

      this.isProfileExpired = expirationDate < now;

      // Format date as DD/MM/YYYY HH:mm (month as number)
      const day = expirationDate.getDate().toString().padStart(2, '0');
      const month = (expirationDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
      const year = expirationDate.getFullYear();

      const hours = expirationDate.getHours().toString().padStart(2, '0');
      const minutes = expirationDate.getMinutes().toString().padStart(2, '0');

      this.expirationDateFormatted = `${day}/${month}/${year} ${hours}:${minutes}`;
    });
  }


  changePackage: any = {
    new_service: ' ',
    current_password: 'true',
  };

  getAllpackage(): void {
    const link = `${environment.apiUrl}/api/index.php/api/packages`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      const filteredAndSorted = ptr?.data
        ?.filter((pkg: any) => pkg.name !== 'Family' && pkg.price !== 25000)
        .sort((a: any, b: any) => a.price - b.price); // Sort ascending by price

      this.cardAmounts = filteredAndSorted;
      this.packages = filteredAndSorted;

    });
  }



  getInfo() {
    const link = `${environment.apiUrl}/api/index.php/api/user`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      this.data = ptr.data
      console.log(this.data);

    });
  }

  selectBank(bank: string): void {
    this.selectedBank = bank;
    this.errorMessage = '';
    this.paymentResponse = null;
  }

  createPayment(amounts: number) {
    const payload: any = {
      amount: amounts,
      username: this.data.username,
      userId: this.data.id,
      bankName: "FIB"
    };

    if (this.fcm) {
      payload.fcm = this.fcm;
    }
 this.getBalanceStatus(payload.userId)
    const link = `${environment.localserver}/api/v1/payments/create`;
    this.apiRest.post(link, payload).subscribe(
      (res: any) => {
        const appLink = res.data?.fibPayment?.personalAppLink;
        if (appLink) {
          window.ReactNativeWebView?.postMessage(JSON.stringify({
      type: 'OPEN_UPI',
      url: appLink
    }));
        this.getBalanceStatus(payload.userId)
          } else {
          console.error('App link is missing in the response');
        }
      },
      (error) => {
        console.error('Payment creation failed:', error);
      }
    ); 

  }

getBalanceStatus(userId: string) {
   
  this.isLoading = true;

  const link = `${environment.localserver}/api/v1/localpayments/latest/${userId}`;

  this.balanceStatusSubscription = interval(2000) // every 2 seconds
    .pipe(
      switchMap(() => this.apiRest.get(link)),
      takeWhile((res: any) => res.data?.status !== 'success', true) // continue until status === 'success'
    )
    .subscribe((res: any) => {
       if (res.data?.status === 'success') {
         this.router.navigate(['/Home']);
         this.isLoading = false;
         
   // Stop subscription (just to be safe — although takeWhile(true) will complete)
        if (this.balanceStatusSubscription) {
          this.balanceStatusSubscription.unsubscribe();
        }

        console.log('Payment successful');
      } else {
        console.log('Waiting for success status...');
      }
    }, error => {
      console.error('Error while checking status:', error);
      this.isLoading = false;
    });
}

  /*  onChange(value: string,price:number): void {
   this.changePackage.new_service = value;
    this.encryption();
  }
 */
  confirmAndChange(value: string, price: number): void {
    Swal.fire({
      title: `دڵنیایت لە کڕینی کارتی ${price} لە ڕێگەی FIB`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'بەڵێ',
      cancelButtonText: 'نەخێر',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.onChange(value, price);
        /*  Swal.fire({
           title: 'سەرکەوتووبوو',
           text: 'پەکەج بەسەرکەوتوویی گۆڕدرا',
           icon: 'success',
           timer: 2000,
           showConfirmButton: false,
         }); */
      }
    });
  }

  onChange(value: string, price: number): void {

    if (price === this.currentPackage) {
      this.createPayment(price);
    } else {
      this.price = price
      this.changePackage.new_service = value;
      this.encryption();
    }
  }

  encryption() {
    const CryptoJS = require('crypto-js');
    const cypData = CryptoJS.AES.encrypt(
      JSON.stringify(this.changePackage),
      'abcdefghijuklmno0123456789012345'
    );
    this.payload = { payload: cypData.toString() };
    this.updatePackage();

  }

  updatePackage() {
    const link = `${this.Api}/api/index.php/api/service`;
    this.apiRest.post(link, this.payload).subscribe((ptr: any) => {
      if (ptr.message == 'rsp_service_change_user_active') {
        this.createPayment(this.price);
        this.getAllpackage();
      } else if (ptr.message == 'rsp_service_change_success') {
        this.createPayment(this.price);
        this.getAllpackage();
      }
    });
  }


 
 

  reset() {
    this.selectedBank = null;
    this.paymentResponse = null;
    this.errorMessage = null;
    this.loading = false;
    this.showJson = false;
  }



 
}
