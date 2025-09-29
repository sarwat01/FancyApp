import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Auth/services/auth.service';
import { TranslocoService } from '@ngneat/transloco';
import { RestApiService } from '../../Auth/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  private messageEventListener: EventListenerOrEventListenerObject;
  aa: any;
  newUser: any;
  newPassword: any;
  model: any = {};
  Api = environment.apiUrl;
  payload: any;
  originalText: any;
  loginForm: FormGroup;
  langList: any[] = [];
  currentLang: string;
  ngZone: any;
  username: any;
  password: any;
  fcm:any

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
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

  ngOnInit() {
    //this.decriptData()
    setTimeout(() =>  this.getUserAndPassword(), 90);
   
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      language: ['en'],
    });
    this.langList = this.translate.getAvailableLangs();
    this.currentLang = this.translate.getActiveLang();
  
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



// ✅ Define the method here
 handleCredentialMessage = (event: MessageEvent) => {
  try {
    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

    if (data && data.username) {
     
      this.username = data.username
      this.password = data.password
      this.fcm= data.fcm
      this.autoLogin()
      // Proceed with your login logic here
    } else {
      // Ignore empty/invalid messages
      console.log('Ignored invalid message:', data);
    }
  } catch (error) {
    console.error('❌ Error handling message from RN:', error);
  }
};
 


   ngOnDestroy(): void {
    // ✅ Clean up listener
    window.removeEventListener('message', this.handleCredentialMessage);
  }

  autoLogin() {
     
   const loginForm = {
      username: this.username,
      password: this.password,
      language: ['en'],
    }
 const CryptoJS = require('crypto-js');
      const cypData = CryptoJS.AES.encrypt(
        JSON.stringify(loginForm),
        'abcdefghijuklmno0123456789012345'
      );
      this.payload = { payload: cypData.toString() };

 this.login(loginForm);

     
     
     
  }


   
  decriptData(){
     const CryptoJS = require('crypto-js');
     const cipherText =  "U2FsdGVkX19/YRlwNS/8Sy+s9b8cJ5QxKhH5N7QDqiDSfs363bMMj591TgZZuibijve0/zyL/adDLAsc7UtEqJiH7RS20CL2IWEG/j7lHRN2jOrr0WeWpa3rn5W4sqdPbpHUgmK60YTLbFP2nWuu00oP4abIFbAaB+5ubJ16h0+Y84tDNHSJ89wWpA1yYP1TR4XwmjISlwpSuGTQZUAzSsgDWOWuq95SMrO1xVEtdOqN8tRpZmGadU3pSf24oexJLLDlaLO30nAj4zli2KNNa5rKwOrATQzINoxW+uzs+xsVtNFWRPAr2/6l6IzFIV01"
    const bytes = CryptoJS.AES.decrypt(
      cipherText,
      'abcdefghijuklmno0123456789012345'
    );
    this.originalText = bytes.toString(CryptoJS.enc.Utf8);
    
  }

  getUserAndPassword() {
   const apiUrl = 'http://localhost:1995/api/v1/storgae'; // ✅ Fixed URL quotes

this.apiRest.get(apiUrl).subscribe(
  (response: any) => {
     const newUsername = response.username?.trim() || '';
    const newPassword = response.password?.trim() || '';

    // Only proceed if both values are non-empty
    if (newUsername && newPassword) {
      this.loginForm.patchValue({
        username: newUsername,
        password: newPassword
      });

      console.log({newUsername:newUsername ,
         newPassword:newPassword});
      
      // ✅ Now call encryption1() only if values are valid
      //this.encryption1();
    }
  },
  (error) => {
    console.error('Failed to fetch credentials:', error);
  }
);
}
 
  setLang(l) {
    this.translate.setActiveLang(l.target.value);
  }

  encryption() {
    if (
      this.loginForm.value.username == '' ||
      this.loginForm.value.password == ''
    ) {
      this.tostService.warning(
        this.translate.translate('balance.enptyUserPass')
      );
    } else {
      /* window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'login',
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }));  */
      const CryptoJS = require('crypto-js');
      const cypData = CryptoJS.AES.encrypt(
        JSON.stringify(this.loginForm.value),
        'abcdefghijuklmno0123456789012345'
      );
      this.payload = { payload: cypData.toString() };

      this.login(this.loginForm.value);

      const cipherText = this.payload.payload;
      const bytes = CryptoJS.AES.decrypt(
        cipherText,
        'abcdefghijuklmno0123456789012345'
      );
      this.originalText = bytes.toString(CryptoJS.enc.Utf8);
     
    }
  }

  encryption1() {
    const CryptoJS = require('crypto-js');
    const cypData = CryptoJS.AES.encrypt(
      JSON.stringify(this.loginForm.value),
      'abcdefghijuklmno0123456789012345'
    );
    this.payload = { payload: cypData.toString() };
    this.login(this.loginForm.value);
    const cipherText = this.payload.payload;
    const bytes = CryptoJS.AES.decrypt(
      cipherText,
      'abcdefghijuklmno0123456789012345'
    );
    this.originalText = bytes.toString(CryptoJS.enc.Utf8);
  }

  login(value) {
    this.authService.login(this.payload, value).subscribe((success) => {
   if (success) {
        this.router.navigate(['/Home']);
         this.loginForm.patchValue({
            username: '',
            password: ''
          });
      }
    });
  }
}
