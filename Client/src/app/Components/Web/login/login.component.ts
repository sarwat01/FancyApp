import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from '../../Auth/services/auth.service' 
import { TranslocoService } from '@ngneat/transloco';
import { RestApiService } from '../../Auth/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {}; 
  message:any
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
    this.langList = this.translate.getAvailableLangs();
    this.currentLang = this.translate.getActiveLang();
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      language: ['en'],
    });

  }

  setLang(l) {
    this.translate.setActiveLang(l.target.value);
  }
   
  login() {

     const payload = this.loginForm.value; 
    this.authService.loginFancy(payload).subscribe((success) => {
      if (success = true) {
        this.router.navigate(['/Index']);
      } else {
      } 
    });
  }
}
