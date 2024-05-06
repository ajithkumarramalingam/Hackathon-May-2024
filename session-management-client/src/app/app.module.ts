import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';

const ngsUiLoader: NgxUiLoaderConfig = {
  fgsColor: '#00308F',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 50,
  blur: 0,
  fgsType: SPINNER.squareLoader,
  hasProgressBar: false,
  overlayColor: "rgba(40,40,40,0.12)",
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngsUiLoader),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    })
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
