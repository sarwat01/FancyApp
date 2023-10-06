import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { RestApiService } from '../../Auth/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-web-main',
  templateUrl: './web-main.component.html',
  styleUrls: ['./web-main.component.css']
})
export class WebMainComponent implements OnInit {
data:any={}
updatePassowrd : any ={}
  constructor(
    private apiRest: RestApiService,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getUserdata()
  }
  getUserdata(): void {
     let temp = localStorage.getItem('userInfo') ?? '{}';
    this.data = JSON.parse(temp);
   }

   updateUserPassword(){
    console.log(this.updatePassowrd.passwordCurrent);
    if(this.updatePassowrd.passwordCurrent != '' && this.updatePassowrd.passwordCurrent != null && this.updatePassowrd.passwordCurrent != undefined){
      if(this.updatePassowrd.password !=this.updatePassowrd.confermPassword ){

        this.toastService.warning('پاسۆرد چون یەک نییە')
      }else{
        let path = `${environment.localserver}/api/v1/user/updateMyPassowrd`
        this.apiRest.patchPassword(path,this.updatePassowrd).subscribe((res:any)=>{
           this.toastService.success('بەسەرکەوتوی تێپەڕە ووشە نوێکرایەوە')
        }) 
      }
    }else{
      this.toastService.warning('تکایە پاسۆردی پێشتر بنووسە')
    }
    
 
  
  }
}
