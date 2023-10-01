import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './Components/mobile/user-info/user-info.component';
import { AuthGuard } from './Components/Auth/guards/auth.guard'; 
import { BalanceComponent } from './Components/mobile/balance/balance.component';
import { MainComponent } from './Components/mobile/main/main.component';
import{WebMainComponent} from './Components/Web/web-main/web-main.component'
import { ActiveCardComponent } from './Components/mobile/active-card/active-card.component';
import { HomeComponent } from './Components/home/home.component';
import { NotificationComponent } from './Components/Web/notification/notification.component';
import { LoginComponent } from './Components/Web/login/login.component';
import { IndexComponent } from './Components/Web/index/index.component';
import { AgentsComponent } from './Components/Web/agents/agents.component';
import { AddressComponent } from './Components/Web/address/address.component';
import { MobileAddressComponent } from './Components/mobile/mobile-address/mobile-address.component';
import { MobileAgentComponent } from './Components/mobile/mobile-agent/mobile-agent.component';

const routes: Routes = [
  { path: '', component: BalanceComponent },
   {
    path: 'Home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'user', component: UserInfoComponent },
      { path: 'activrCard', component: ActiveCardComponent }, 
      { path: 'mobileAddress', component: MobileAddressComponent }, 
      { path: 'mobileAgent', component: MobileAgentComponent }, 
    ],
  }, 

  { path: 'adminPanelFancy', component: LoginComponent },
  
  {
      path: 'Index',
     canActivate: [AuthGuard],
     component: IndexComponent,
    children: [  
      { path: '', component: WebMainComponent },
      { path: 'Notification', component: NotificationComponent },
      { path: 'Agent', component: AgentsComponent },
      { path: 'address', component: AddressComponent },
    ],
  },
 
   
  
];  
@NgModule({
  imports: [
    RouterModule,
     RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
