import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './components/view/view.component';
import { WaitSpinerComponent } from './components/wait-spiner/wait-spiner.component';

import { DataProviderService } from './service/data-provider.service';

@NgModule({
  declarations:
  [
    AppComponent,
    ViewComponent,
    WaitSpinerComponent
  ],
  imports:
  [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers:
  [
    DataProviderService
  ],
  bootstrap:
  [
    AppComponent
  ]
})
export class AppModule { }
