import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestApiService } from '../../Auth/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../Auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  currentDate = new Date(); // Current date
  newDate: any;

  futureDate: Date;

  data: any = {};
  balanceInfo: number;
  balanceSize: number;
  dayRemainder: string = 'ڕۆژ';
  Api = environment.apiUrl;
  langList: any[] = [];
  currentLang: string;
  direction: '';
  constructor(
    private apiRest: RestApiService,
    public actRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private translate: TranslocoService,
    private translocoService: TranslocoService,
    private authService: AuthService,
    private router: Router
  ) {
    translate.langChanges$.subscribe((lang) => {
      this.currentLang = lang;
      console.log('Language changed to', this.currentLang);
    });
  }

  ngOnInit(): void {
    this.getInfo();
    this.getBalanceInfo();
    this.getBalanceInfoDate();
    this.langList = this.translate.getAvailableLangs();
    this.currentLang = this.translate.getActiveLang();
  }

  getInfo() {
    const link = `${environment.apiUrl}/api/index.php/api/user`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      if (ptr.data.firstname != null) {
        this.data = ptr.data;
      } else {
        this.data = ptr.data;
      }
    });
  }

  getBalanceInfo() {
    const link = `${environment.apiUrl}/api/index.php/api/dashboard`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      this.balanceInfo = ptr.data.remaining_days + 1;
      this.balanceSize = ptr.data.remaining_days * 3.33;
    });
  }

  getBalanceInfoDate() {
    const link = `${environment.apiUrl}/api/index.php/api/service`;
    this.apiRest.get(link).subscribe((ptr: any) => {
      console.log(ptr);
      this.newDate = ptr.data.expiration;
    });
  }

  setLang(l) {
    this.translate.setActiveLang(l.target.value);
  }

  logout() {
    this.authService.removeTokens();
    this.router.navigate(['/']);
  }
}
