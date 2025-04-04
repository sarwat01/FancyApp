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
import { MainComponent } from '../../mobile/main/main.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  token:any
  devicesToken:any
  width: number = 0;
  a: MainComponent;
  get: any = [];
  data: any;
  model = { title: '', detail: '' };
  getItem: any = {};
  notification = { jwtClient: 'https://www.googleapis.com/auth/firebase.messaging'};
  constructor(
    private apiRest: RestApiService,
    public actRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private translate: TranslocoService,
    private translocoService: TranslocoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getNotification();
    this.getTokent()
  }

  getTokent (){ 
    let link = `${environment.localserver}/api/v1/fcm/fcm`
      this.apiRest.post(link,this.notification).subscribe((res:any) => {
       this.token = res.token  
     })  
   }
   

  getNotification() {
    let path = `${environment.localserver}/api/v1/sendFcmNotification`;
    this.apiRest.get(path).subscribe((res: any) => {
      this.data = res.data.notification;
    });
  }

  getOne(id) {
    let path = `${environment.localserver}/api/v1/sendFcmNotification/`;
    this.apiRest.getbyid(path, id).subscribe((res) => {
      this.getItem = res;

      console.log(res);
      
    });
  }

  addNotification() {
    let path = `${environment.localserver}/api/v1/sendFcmNotification`;
    Object.entries(this.model).forEach((item) => {
      const [key, value] = item;
      if (value === '') {
        delete this.model[key];
      }
    });
    this.apiRest.post(path, this.model).subscribe((req) => {
      this.ngOnInit();
    });
  }

  sendNoti(title, detail) {
    let sendData = {
      notification: {
        title: title,
        body: detail,
      },
      to: '',
    };
    let headers;
    let path = `${environment.localserver}/api/v1/fcm`;
    this.apiRest.get(path).subscribe((res: any) => {
       for (let index = 0; index < res.length; index++) {
        this.width = index/index * 100;
        const element = res[index].fcmToken;
        sendData.to = element; 
         const headers = { 
        Authorization: `Bearer ${this.token}`,
        'Content-MD5': 'application/json', }; 
         this.http.post<any>('https://fcm.googleapis.com/fcm/send', sendData, { headers }).subscribe(data => {
         
       });  
      }
      this.toastService.success('سوپاس بەڕێزم ئاگادارییەکەت بەسەرکەوتوی نێردرا')
      /* document.getElementById('close')!.click(); */
    });
  }

  


 sendNotificatoin( ) {

  let sendData = {
       message: {
        token: "",
        notification: {
          title:this.getItem.title,
          body: this.getItem.detail
        },
        apns: {
          payload: {
            aps: {
              alert: {
                title: this.getItem.title,
                body: this.getItem.detail
              },
              sound: "alarm.caf"  // Sound to be played when the notification is received
            }
          }
        }
      }
    } 
  
   
  let path = `${environment.localserver}/api/v1/fcm`;
  this.apiRest.get(path).subscribe((res: any) => {
    
     for (let index = 0; index < res.length; index++) {
       const element = res[index].fcmToken;
      
      sendData.message.token = element; 
      const headers = { 
      Authorization: `Bearer ${this.token}`,
      'Content-MD5': 'application/json', }; 
     this.http.post<any>('https://fcm.googleapis.com/v1/projects/fancynet-94963/messages:send', sendData, { headers }).subscribe(data => {
       
     });   
    }
    this.toastService.success('سوپاس بەڕێزم ئاگادارییەکەت بەسەرکەوتوی نێردرا') 
    
  });
}
 

  updateNotification(id) {
    let payload = this.getItem;
    delete payload._id, delete payload.createdAt, delete payload.__v;

    Object.entries(payload).forEach((item) => {
      const [key, value] = item;
      if (value === '') {
        delete this.model[key];
      }
    });
    let path = `${environment.localserver}/api/v1/sendFcmNotification/`;
    this.apiRest.patch(path, id, payload).subscribe((res) => {
      this.ngOnInit();
    });
  }

  deleteNotification(id) {
    let path = `${environment.localserver}/api/v1/sendFcmNotification/`;
    this.apiRest.delete(path, id).subscribe((data: {}) => {
      this.toastService.success('بەسەرکەوتووی زانیارییەکات سڕایەوە');
      this.ngOnInit();
    });
  }
}
