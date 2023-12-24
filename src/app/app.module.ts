import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoaderComponent } from './loader/loader.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './recipe/home/home.component';
import { InterceptorInterceptor } from './services/interceptor.interceptor';
import { RecipeCardComponent } from './Shared/recipe-card/recipe-card.component';
import { RecipeModule } from './recipe/recipe.module';
import { TopnavComponent } from './recipe/topnav/topnav.component';
import { FooterComponent } from './recipe/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoaderComponent,
    HomeComponent,
    TopnavComponent,
    FooterComponent,
    // RecipeCardComponent
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule, 
    MatListModule,
    MatIconModule,
    
     
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
