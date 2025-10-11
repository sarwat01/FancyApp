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
   progressValue = 0;  // 0 to 100
isSending = false;
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
       console.log(this.token);
       
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
/* 
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
        sendData.to = 'ddAx6KJob0DcluOqywh4ql:APA91bHvoSUk3litLwIQLxcz3eLpneRkEJ9kiqutvAG-_FX5J9Z0i6satUWFn8Qb9lVyTAwHuvipNFbFcFK5WfTVO9gjAz5vMw7415c5W4K0qMCakpGjfJ0'; 
         const headers = { 
        Authorization: `Bearer ${this.token}`,
        'Content-MD5': 'application/json', }; 
         this.http.post<any>('https://fcm.googleapis.com/fcm/send', sendData, { headers }).subscribe(data => {
         
       });  
      }
      this.toastService.success('سوپاس بەڕێزم ئاگادارییەکەت بەسەرکەوتوی نێردرا')
      
    });
  } */

  

sendNoti(title: string, detail: string) {
  this.isSending = true;
  this.width = 0;

  const path = `${environment.localserver}/api/v1/fcm`;
  const fcmUrl = 'https://fcm.googleapis.com/v1/projects/fancynet-43f20/messages:send';

  this.apiRest.get(path).subscribe((res: any) => {
    const total = res.length;
    let sentCount = 0;

    if (total === 0) {
      this.isSending = false;
      this.width = 100;
      this.toastService.info('هیچ ئەندامێک نەدۆزرایەوە بۆ نێردن');
      return;
    }

    res.forEach((device) => {
      const message: any = {
        message: {
          token: device.fcmToken,
          notification: {
            title,
            body: detail
          },
          data: {
            customKey1: 'value1',
            customKey2: 'value2'
          }
        }
      };

      if (device.platform === 'ios') {
        message.message.apns = {
          headers: { 'apns-priority': '10' },
          payload: {
            aps: {
              alert: { title, body: detail },
              badge: 1,
              sound: 'default'
            }
          }
        };
      }

      const headers = {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      };

      this.http.post(fcmUrl, message, { headers }).subscribe(
        () => {
          sentCount++;
          this.width = Math.round((sentCount / total) * 100);

          if (sentCount === total) {
            this.isSending = false;
            this.toastService.success('سوپاس بەڕێزم ئاگادارییەکەت بەسەرکەوتوی نێردرا');
          }
        },
        (error) => {
          console.error('Error sending notification:', error);
          sentCount++;
          this.width = Math.round((sentCount / total) * 100);

          if (sentCount === total) {
            this.isSending = false;
            this.toastService.success('سوپاس بەڕێزم ئاگادارییەکەت بەسەرکەوتوی نێردرا');
          }
        }
      );
    });
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
     this.http.post<any>('https://fcm.googleapis.com/v1/projects/fancynet-43f20/messages:send', sendData, { headers }).subscribe(data => {
       
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
