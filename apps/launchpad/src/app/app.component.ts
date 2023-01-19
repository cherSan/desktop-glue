import { Component } from '@angular/core';
import {Glue42Store} from "@glue42/ng";
import {Observable} from "rxjs";

@Component({
  selector: 'lp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isGlueReady$: Observable<{
    error?: any;
  }>;
  constructor(
    private readonly glueStore: Glue42Store
  ) {
    this.isGlueReady$ = glueStore.ready()
  }
}
