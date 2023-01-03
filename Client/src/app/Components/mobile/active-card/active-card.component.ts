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
@Component({
  selector: 'app-active-card',
  templateUrl: './active-card.component.html',
  styleUrls: ['./active-card.component.css'],
})
export class ActiveCardComponent implements OnInit {
  model: any = {};

  originalText: any;
  cardData: FormGroup;
  cardPin: any;
  data: any = {};
  packages: any = {};
  currentPackage: any = {};
  Api = environment.apiUrl;
  langList: any[] = [];
  currentLang: string;
  payload: any;

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
  /* "new_service":"2","current_password":true */
  changePackage: any = {
    new_service: ' ',
    current_password: 'true',
  };

  ngOnInit(): void {
    this.langList = this.translate.getAvailableLangs();
    this.currentLang = this.translate.getActiveLang();
    
    this.getCurrentPackage();
    this.getAllpackage();
    this.cardData = this.formBuilder.group({
      pin: [''],
    });
  }
  logout() {
    this.authService.removeTokens()
    this.router.navigate(['/']);
    
  }
  setLang(l) {
    this.translate.setActiveLang(l.target.value);
 }


  getCurrentPackage() {
    const link = `${environment.apiUrl}/api/index.php/api/service`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      this.currentPackage = ptr.data;
    });
  }
  getAllpackage(): void {
    const link = `${environment.apiUrl}/api/index.php/api/packages`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      this.packages = ptr.data;
    });
  }

  onChange(value: string): void {
    this.changePackage.new_service = value;
    this.encryption();
  }

  encryption() {
    const CryptoJS = require('crypto-js');
    const cypData = CryptoJS.AES.encrypt(
      JSON.stringify(this.changePackage),
      'abcdefghijuklmno0123456789012345'
    );
    this.payload = { payload: cypData.toString() };
    this.updatePackage();

    /* decriptData */
    const cipherText = this.payload.payload;
    const bytes = CryptoJS.AES.decrypt(
      cipherText,
      'abcdefghijuklmno0123456789012345'
    );
    const aoriginText = bytes.toString(CryptoJS.enc.Utf8);
  }

  updatePackage() {
    const link = `${this.Api}/api/index.php/api/service`;
    this.apiRest.post(link, this.payload).subscribe((ptr: any) => {
      if (ptr.message == 'rsp_service_change_user_active') {
        this.getAllpackage();
        this.toastService.warning(this.translate.translate('activeCard.rsp_service_change_user_active'))
        
      } else if (ptr.message == 'rsp_service_change_success') {
        this.toastService.success(this.translate.translate('activeCard.rsp_service_change_success'))
      }
    });
  }

  submit() {
    const CryptoJS = require('crypto-js');
    const cypData = CryptoJS.AES.encrypt(
      JSON.stringify(this.cardData.value),
      'abcdefghijuklmno0123456789012345'
    );
    this.cardPin = { payload: cypData.toString() };

    /* decriptData */
    const cipherText = this.cardPin.payload;
    const bytes = CryptoJS.AES.decrypt(
      cipherText,
      'abcdefghijuklmno0123456789012345'
    );
    const aoriginText = bytes.toString(CryptoJS.enc.Utf8);

    console.log(aoriginText);

    const link = `${this.Api}/api/index.php/api/redeem`;
    this.apiRest.post(link, this.cardPin).subscribe((ptr: any) => {
      if (ptr.message == 'rsp_card_used') {
        this.toastService.warning(this.translate.translate('activeCard.rsp_card_used')) 
      } else if (ptr.message == 'rsp_invalid_card') {
        this.toastService.warning(this.translate.translate('activeCard.rsp_invalid_card')) 
      
      } else if(ptr.message == 'rsp_success') {
        this.toastService.warning(this.translate.translate('activeCard.rsp_success')) 
        this.router.navigate(['/Home']);
       }else {
        this.toastService.warning(this.translate.translate('activeCard.rsp_invalid_card_number')) 
        this.toastService.warning('تکایە ژمارەی کارت بنووسە');
       }
    });
    
  }
  
}
