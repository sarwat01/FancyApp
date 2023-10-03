import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { RestApiService } from '../../Auth/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../Auth/services/auth.service';

@Component({
  selector: 'app-mobile-notification',
  templateUrl: './mobile-notification.component.html',
  styleUrls: ['./mobile-notification.component.css']
})
export class MobileNotificationComponent implements OnInit {

  constructor(
    private apiRest: RestApiService,
    public actRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private translate: TranslocoService,
    private translocoService: TranslocoService,
    private authService: AuthService,   
  ) { }

  data:any
  model = { title: '', detail: '' };
  getItem : any ={}
  ngOnInit(): void {
    this.getNotification()
  }


getNotification(){
  let path = `${environment.localserver}/api/v1/sendFcmNotification`
this.apiRest.get(path).subscribe((res:any)=>{
  this.data = res.data.notification 
  console.log(this.data);
  
}) 
}

  
getOne(id){
  let path = `${environment.localserver}/api/v1/sendFcmNotification/`
  this.apiRest.getbyid(path,id).subscribe((res)=>{
    this.getItem = res 

  })
 }

}
