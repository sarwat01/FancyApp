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
    this.getUserAndPassword();
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      language: ['en'],
    });
    this.langList = this.translate.getAvailableLangs();
    this.currentLang = this.translate.getActiveLang();
  }

  getUserAndPassword() {
    let newUsername: '';
    let newPassword: '';
    const link = `http://user.fancynet.net:1995/api/v1/storgae`;
    setTimeout(() => {
      this.apiRest.get(link).subscribe((ptr: any) => {
        newUsername = ptr.username;
        newPassword = ptr.password;
        if (newUsername != '' && newPassword != null) {
          this.loginForm.value.username = newUsername;
          this.loginForm.value.password = newPassword;
          this.encryption1();
        }
      });
    }, 100); // Delay of 100ms before posting the message
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
      console.log(this.originalText);
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
      console.log(success);
      if(success){
        this.router.navigate(['/Home']);
      } 
    });
  }
}
