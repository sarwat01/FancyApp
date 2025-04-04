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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  Api = environment.apiUrl;
  langList: any[] = [];
  currentLang: string;
  data: any;
  info = false;
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
    translate.langChanges$.subscribe((lang) => {
      this.currentLang = lang;
      console.log('Language changed to', this.currentLang);
    });
  }

  ngOnInit(): void {
    this.langList = this.translate.getAvailableLangs();
    this.currentLang = this.translate.getActiveLang(); 
    
  }
 

  setLang(l) {
     this.translate.setActiveLang(l.target.value);
  }

  CloseSide() {
    let sidebar = document.getElementById('sidebar');
    if (!sidebar.classList.contains('active')) {
      sidebar.classList.add('active');
    } else {
      sidebar.classList.remove('active');
    }
  }

  CloseNav() {
    let body = document.getElementById('body');
    let check = body.classList.contains('sidebar-icon-only');
    check == true
      ? body.classList.remove('sidebar-icon-only')
      : body.classList.add('sidebar-icon-only');
  }

 async logout() {
this.authService.removeTokens();
/*  await localStorage.clear();  // Clear web's localStorage
 await sessionStorage.clear(); */
/*  await window.ReactNativeWebView.postMessage(JSON.stringify({
  type: 'logout',
}));  */
   this.router.navigate(['/']); 

  }

  home() {
    this.router.navigate(['/Home']);
  }

   notification(a){ 
  this.toastService.warning('sa')
  this.toastService.success(a)
  }
}
