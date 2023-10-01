import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 import {IndexComponent } from './Components/Web/index/index.component'
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from 'src/app/Components/Auth/token-interceptor.service';

import { RestApiService } from './Components/Auth/shared.service';
import { AuthService } from './Components/Auth/services/auth.service';
import { AuthGuard } from './Components/Auth/guards/auth.guard';
import { RandomGuard } from './Components/Auth/guards/random.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import {LoginComponent } from './Components/Web/login/login.component'
import { BalanceComponent } from './Components/mobile/balance/balance.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserInfoComponent } from './Components/mobile/user-info/user-info.component';
import { MainComponent } from './Components/mobile/main/main.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoRootModule } from './transloco-root.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActiveCardComponent } from './Components/mobile/active-card/active-card.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {WebMainComponent} from'./Components/Web/web-main/web-main.component'
import {NotificationComponent} from './Components/Web/notification/notification.component'
import {AgentsComponent} from './Components/Web/agents/agents.component'
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {AddressComponent} from './Components/Web/address/address.component';
import {MobileAddressComponent} from './Components/mobile/mobile-address/mobile-address.component';
import {MobileAgentComponent} from './Components/mobile/mobile-agent/mobile-agent.component';


@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    BalanceComponent,
    MainComponent,
    AgentsComponent,
    ActiveCardComponent,
    HomeComponent,
    NavbarComponent,
    NotificationComponent,
    LoginComponent,
    WebMainComponent,
    IndexComponent,
    AddressComponent,
    MobileAddressComponent,
    MobileAgentComponent
    
    
  ],
  imports: [
    
    BrowserModule,
    AutocompleteLibModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    TranslocoRootModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgCircleProgressModule.forRoot({
    
     
    }),

    
  ],
  
  providers: [
    AuthService,
    AuthGuard,
    RandomGuard,
    RestApiService,
    FormBuilder,
    ReactiveFormsModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
