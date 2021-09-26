import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VotacaoComponent } from './votacao/votacao.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApuracaoComponent } from './apuracao/apuracao.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
      LoginComponent,
      AdminComponent,
      VotacaoComponent,
      PageNotFoundComponent,
      ApuracaoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
