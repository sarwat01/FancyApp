import { Component, OnInit } from '@angular/core';
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
  model: any = {};

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
    private service:TranslocoService, 
    private translate: TranslocoService,
    private apiRest: RestApiService,
  ) {
    translate.langChanges$.subscribe(lang => {
      this.currentLang = lang;
      console.log('Language changed to', this.currentLang);
 
  });
  
  }

  ngOnInit() { 
  this.authService.removeTokens(); 
 this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      language: ['en'],
    });


    this.langList = this.translate.getAvailableLangs();
    this.currentLang = this.translate.getActiveLang();
  }

  setLang(l) {
    this.translate.setActiveLang(l.target.value);
     
 } 
  encryption() {
    if (
      this.loginForm.value.username == '' ||
      this.loginForm.value.password == ''
    ) {
      this.tostService.warning(this.translate.translate('balance.enptyUserPass')) 
   
    } else {
      const CryptoJS = require('crypto-js');
      const cypData = CryptoJS.AES.encrypt(
        JSON.stringify(this.loginForm.value),
        'abcdefghijuklmno0123456789012345'
      );
      this.payload = { payload: cypData.toString() };
      this.login();

      /* decriptData */
      const cipherText = this.payload.payload;
      const bytes = CryptoJS.AES.decrypt(
        cipherText,
        'abcdefghijuklmno0123456789012345'
      );
      this.originalText = bytes.toString(CryptoJS.enc.Utf8);
    }
  }
 
  
  login() {
    this.authService.login(this.payload).subscribe((success) => {
      if (success) {
        
      } else {
        this.router.navigate(['/Home']);
      }
      
    });
  }
}
