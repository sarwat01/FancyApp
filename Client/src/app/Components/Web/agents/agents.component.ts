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
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  data:any
  keyword = 'name';
  address:any={}
  selectCity:any
  model = { name: '', addressId: '',phone1:'',phone2:'',note:'' };
  getItem:any = { name: '', addressId: '',phone1:'',phone2:'',note:'' };
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
    this.getAgents() 
    this.getAddress()
  }

  getAgents(){
  let path = `${environment.localserver}/api/v1/agent`
this.apiRest.get(path).subscribe((res:any)=>{
  this.data = res.data.agent 

}) 
}

  
 
getAddress(){
  
  let path = `${environment.localserver}/api/v1/address` 
this.apiRest.get(path).subscribe((res:any)=>{
  this.address = res.data.address 
}) 
}
getOne(id){
  let path = `${environment.localserver}/api/v1/agent/`
  this.apiRest.getbyid(path,id).subscribe((res:any)=>{
    this.getItem = res
    this.selectCity = res.addressId
    
  })
 }
selectAddress(value){
  this.model.addressId = value._id
   this.getItem.addressId = value._id

}
add(){
   let path = `${environment.localserver}/api/v1/agent`

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
 
  update(id){ 
    let payload = this.getItem
    delete payload._id,delete payload.createdAt,delete payload.__v
      let path = `${environment.localserver}/api/v1/agent/`
       Object.entries(payload).forEach((item) => {
        const [key, value] = item;
        if (value === '') {
          delete this.model[key];
        }
      });
    this.apiRest.patch(path,id,payload).subscribe((res)=>{
      this.toastService.success('زانیارییەکانت بەسەرکەوتوی نوێ کرایەوە')
this.getAgents()
    })   
  }


delete(id) {
  let path = `${environment.localserver}/api/v1/agent/`
  this.apiRest.delete(path, id).subscribe((data: {}) => { 
    this.toastService.success('بەسەرکەوتووی زانیارییەکات سڕایەوە')
    this.ngOnInit();
  });
}

}

