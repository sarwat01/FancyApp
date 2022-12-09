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
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  Api = environment.apiUrl;
  langList: any[] = [];
  currentLang: string;
  data:any




  constructor(
    private apiRest: RestApiService,
    public actRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private translate: TranslocoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,) { 
      translate.langChanges$.subscribe(lang => {
        this.currentLang = lang;
        console.log('Language changed to', this.currentLang);
  
      });
    }

  ngOnInit(): void {
    this.langList = this.translate.getAvailableLangs();
    this.currentLang = this.translate.getActiveLang();

    this.getInfo();

  }
  getInfo(){
    const link = `${environment.apiUrl}/api/index.php/api/user`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      if(ptr.data.firstname != null){
         this.data = ptr.data 
      } else {
        this.data = ptr.data 
        this.toastService.warning('بەشداربووی بەڕێز ناوت تۆمار نەکراوە بۆ تۆمار کردن پەیوەندی بکە بە کۆمپانیاوە')
      }
      }); 
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
  logout() {
    this.authService.removeTokens()
    this.router.navigate(['/']);
    
  }
}
