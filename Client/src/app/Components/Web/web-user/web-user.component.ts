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
import{MainComponent} from '../../mobile/main/main.component'

@Component({
  selector: 'app-web-user',
  templateUrl: './web-user.component.html',
  styleUrls: ['./web-user.component.css']
})
export class WebUserComponent implements OnInit {
  a:MainComponent
  data:any
  model = { username: '', role: '',password:'' };
  getItem : any ={}
  updatePassowrd : any ={}
  user:any= {}
  constructor(
    private apiRest: RestApiService,
    public actRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private translate: TranslocoService,
    private translocoService: TranslocoService,
    private authService: AuthService,   
  ) { }

  ngOnInit(): void {
    this.getNotification() 
    this.getUserdata()
  }

  getUserdata(): void {
    let temp = localStorage.getItem('userInfo') ?? '{}';
    this.user = JSON.parse(temp);
  }

getNotification(){
  let path = `${environment.localserver}/api/v1/user`
this.apiRest.get(path).subscribe((res:any)=>{
  this.data = res.data.user 
  
}) 
}
onChangeUserRole(value){
this.model.role = value
this.getItem.role = value
}
  
getOne(id){
 let path = `${environment.localserver}/api/v1/user/`
  this.apiRest.getbyid(path,id).subscribe((res)=>{
    this.getItem = res 

  })
 
  
 }

addNotification(){
   let path = `${environment.localserver}/api/v1/user/signup`
   Object.entries(this.model).forEach((item) => {
    const [key, value] = item;
    if (value === '') {
      delete this.model[key];
    }
  });
  this.apiRest.post(path,this.model).subscribe((req)=>{
    this.ngOnInit();
    
  })
}

 

sendNoti(title , detail){

  let sendData = {
    notification: {
      title: title,
      body:detail 
     },
  to:''
    }
    let headers;
    let path = `${environment.localserver}/api/v1/fcm`
    this.apiRest.get(path).subscribe((res:any)=>{


       for (let index = 0; index < res.length; index++) {
      const element = res[index].fcmToken; 
       sendData.to = element
        
       
       const headers = { 
        Authorization: 'Bearer AAAAWxuwUeY:APA91bHgLO0QiMTXAYfq19rlf5Z7QxNwHDEQ4H9KiPF7fcRRPx-3YwMlO94qVUwpHfxFufrzKppBghr7X3hNzOsA6--odXShtLQT1KXQNpHlvCHRFv5atmHlx5goDI82cZCQRJkdu7eW',
        'Content-MD5': 'application/json', }; 
       this.http.post<any>('https://fcm.googleapis.com/fcm/send', sendData, { headers }).subscribe(data => {
         
       });
           
   }
    }) 
  
 }

  updateNotification(id){ 
   let payload = this.getItem
    delete payload._id,delete payload.createdAt,delete payload.__v
     
    Object.entries(payload).forEach((item) => {
      const [key, value] = item;
      if (value === '') {
        delete this.model[key];
      }
    });

      let path = `${environment.localserver}/api/v1/user/updateMe`
    this.apiRest.patch(path,id,payload).subscribe((res)=>{
this.ngOnInit()
    })    
  }


updateUserPassword(){
  let path = `${environment.localserver}/api/v1/user/updateMyPassowrd`
  this.apiRest.patchPassword(path,this.updatePassowrd).subscribe((res:any)=>{
     this.toastService.success('بەسەرکەوتوی تێپەڕە ووشە نوێکرایەوە')
  }) 

}

deleteNotification(id) {
  let path = `${environment.localserver}/api/v1/user/`
  this.apiRest.delete(path, id).subscribe((data: {}) => { 
    this.toastService.success('بەسەرکەوتووی زانیارییەکات سڕایەوە')
    this.ngOnInit();
  });
}

 

}
