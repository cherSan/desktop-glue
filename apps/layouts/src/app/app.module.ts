import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import {NzInputModule} from "ng-zorro-antd/input";
import {Glue42Module} from "@launchpad/glue42";
import {NzButtonModule} from "ng-zorro-antd/button";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
    NzInputModule,
    Glue42Module,
    NzButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
