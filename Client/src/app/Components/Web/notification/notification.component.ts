import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { RestApiService } from '../Auth/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../Auth/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  data:any
  model = { title: '', detail: '' };
  getItem : any ={}
  constructor(
    private apiRest: RestApiService,
    public actRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private translate: TranslocoService,
    private translocoService: TranslocoService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNotification() 
  }

getNotification(){
  let path = `${environment.localserver}/api/v1/sendFcmNotification`
this.apiRest.get(path).subscribe((res:any)=>{
  this.data = res.data.notification 
}) 
}

addNotification(){
   let path = `${environment.localserver}/api/v1/sendFcmNotification`
  this.apiRest.post(path,this.model).subscribe((req)=>{
    this.ngOnInit();
    
  })
}


sendNotification(title,detail){
 
  var headers = new HttpHeaders({
    'Content-MD5': 'application/json',
    Authorization: 'Bearer AAAAWxuwUeY:APA91bHgLO0QiMTXAYfq19rlf5Z7QxNwHDEQ4H9KiPF7fcRRPx-3YwMlO94qVUwpHfxFufrzKppBghr7X3hNzOsA6--odXShtLQT1KXQNpHlvCHRFv5atmHlx5goDI82cZCQRJkdu7eW'
  });
  let data = {
    notification: {
      title: title,
      body:detail
     },
  to:"dbxAAv-2SrmVQMdzdLhhU3:APA91bGPPDM5DqRN97jTGnqOIc4pBMfvLH_Vm8e8Y9rk0FmrD4qKLULPX6KHPpl2WwkljHkmGBKHeiKQ9cg1v9GuM_9wItLWdfJQKF_PmL_7f-EVRGxlkf6lXYNcTzc9E8Yd9fUNnTfw"
   
  };
  return this.http
    .post('https://fcm.googleapis.com/fcm/send', data, {
      headers: headers,
    })
    .subscribe(
      (res: any) => {
         window.open(`https://fcm.googleapis.com/fcm/send`, "_blank");
      
      },
      (err) => {
        console.log(err.message);
      }
    );
}


sendNoti(){

 /*  const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
  const body = { title: 'Angular POST Request Example' };
  this.http.post<any>('https://reqres.in/api/posts', body, { headers }).subscribe(data => {
      
  });
 */
  let sendData = {
    notification: {
      title: 'title',
      body:"Hello Dear customer , this notification just for test"
      
  },
  To:'dbxAAv-2SrmVQMdzdLhhU3:APA91bGPPDM5DqRN97jTGnqOIc4pBMfvLH_Vm8e8Y9rk0FmrD4qKLULPX6KHPpl2WwkljHkmGBKHeiKQ9cg1v9GuM_9wItLWdfJQKF_PmL_7f-EVRGxlkf6lXYNcTzc9E8Yd9fUNnTfw'
   
   
   }
    let path = `${environment.localserver}/api/v1/fcm`
    this.apiRest.get(path).subscribe((res:any)=>{
    for (let index = 0; index < res.length; index++) {
      const element = res[index].fcmToken; 
       sendData.To = element
        
       const headers = { 
       'Authorization': 'Bearer AAAAWxuwUeY:APA91bHgLO0QiMTXAYfq19rlf5Z7QxNwHDEQ4H9KiPF7fcRRPx-3YwMlO94qVUwpHfxFufrzKppBghr7X3hNzOsA6--odXShtLQT1KXQNpHlvCHRFv5atmHlx5goDI82cZCQRJkdu7eW',
        'Content-MD5':'application/json', };
        this.http.post<any>('https://fcm.googleapis.com/fcm/send', sendData, { headers }).subscribe(data => {
           
      });
  
   }
    })
  
 }
  
 getOne(id){
  let path = `${environment.localserver}/api/v1/sendFcmNotification/`
  this.apiRest.getbyid(path,id).subscribe((res)=>{
    this.getItem = res
console.log(res);

  })
 }
  updateNotification(id){ 
    let payload = this.getItem
    delete payload._id,delete payload.createdAt,delete payload.__v
    console.log(payload);
    
      let path = `${environment.localserver}/api/v1/sendFcmNotification/`
    this.apiRest.patch(path,id,payload).subscribe((res)=>{
this.ngOnInit()
    })  
  }


deleteNotification(id) {
  let path = `${environment.localserver}/api/v1/sendFcmNotification/`
  this.apiRest.delete(path, id).subscribe((data: {}) => { 
    this.toastService.success('بەسەرکەوتووی زانیارییەکات سڕایەوە')
    this.ngOnInit();
  });
}

}
