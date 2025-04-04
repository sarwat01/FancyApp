import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestApiService } from '../../Auth/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../Auth/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mobile-agent',
  templateUrl: './mobile-agent.component.html',
  styleUrls: ['./mobile-agent.component.css'],
})
export class MobileAgentComponent implements OnInit {
  
  data: any = [];
  keyword = 'name';
  address: any = {}; 
  constructor(
    private apiRest: RestApiService,
    public actRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private translate: TranslocoService,
    private translocoService: TranslocoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.getAddress();
     this.getAllAgents();
  }

  getAllAgents() {
    let path = `${environment.localserver}/api/v1/agent/addressId`;
    this.apiRest.get(path).subscribe((res: any) => {
      this.data = res; 
    });
  }

  getAgents(id) {
    let path = `${environment.localserver}/api/v1/agent/addressId/${id}`;
    this.apiRest.get(path).subscribe((res: any) => {
      this.data = res; 
    });
  }

  getAddress() {
    let path = `${environment.localserver}/api/v1/address`;
    this.apiRest.get(path).subscribe((res: any) => {
      this.address = res.data.address;
      });
  }
  selectAddress(value) { 
this.getAgents(value._id)
    
  }
  
 
}
