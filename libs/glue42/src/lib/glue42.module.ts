import {NgModule} from '@angular/core';
import {Glue42Ng} from "@glue42/ng";
import {Glue42NgSettings} from "@glue42/ng/dist/lib/types";
import GlueDesktop from "@glue42/desktop";
import {VisibleAreasService} from "./visible-areas.service";
import {GlueService} from "./glue.service";

const settings: Glue42NgSettings = {
  desktop: {
    factory: GlueDesktop,
    config: {
      appManager: 'full',
      layouts: 'full',
      channels: true,
      windows: true,
      displays: true,
    }
  }
}
@NgModule({
  imports: [
    Glue42Ng.forRoot(settings),
  ],
  providers: [
    GlueService,
    VisibleAreasService,
    {
      provide: Window,
      useValue: window,
      multi: true
    }
  ]
})
export class Glue42Module {}
