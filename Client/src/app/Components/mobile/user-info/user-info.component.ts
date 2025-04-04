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
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

data:any={}
balanceInfo:any = {}
balanceSize:number
dashboard : any = {}
Api = environment.apiUrl;
langList: any[] = [];
currentLang: string;


  constructor(  private apiRest: RestApiService,
    public actRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private translate: TranslocoService,
    private authService: AuthService,
    private router: Router,) { 
      translate.langChanges$.subscribe(lang => {
        this.currentLang = lang;
        });
    }

  ngOnInit(): void {
    this.getInfo();
    this.getBalanceInfo();
    this.getDashboardInfo()
  }


  getInfo(){
   const link = `${environment.apiUrl}/api/index.php/api/user`;
    this.apiRest.get(link).subscribe((ptr: any) => {
    this.data = ptr.data 
     }); 
  }
  getBalanceInfo(){
    const link = `${environment.apiUrl}/api/index.php/api/service`;
    this.apiRest.get(link).subscribe((ptr: any) => {
     this.balanceInfo = ptr.data 
     
    }); 
  }
    getDashboardInfo(){
      const link = `${environment.apiUrl}/api/index.php/api/dashboard`;
      this.apiRest.get(link).subscribe((ptr: any) => {
       this.dashboard = ptr.data
       
      });
  }
}
