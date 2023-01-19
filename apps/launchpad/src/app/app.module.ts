import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Glue42Module } from '@launchpad/glue42';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    Glue42Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
