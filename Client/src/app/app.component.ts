import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';

  constructor(private toastService:ToastrService){

  }
  ngOnint(){
    window.addEventListener('message', (event) => {
      alert('Message received from React Native: ' + event.data);
    });
  }
  
}
