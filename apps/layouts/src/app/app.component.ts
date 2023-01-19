import { Component } from '@angular/core';
import {Glue42Store} from "@glue42/ng";
import {Glue42} from "@glue42/desktop";

@Component({
  selector: 'launchpad-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly glue: Glue42.Glue = this.glueStore.getGlue() as Glue42.Glue;
  constructor(
    private readonly glueStore: Glue42Store
  ) {}
  save(name: string) {
    return this.glue.layouts.save({
      name
    }).then(() => {
      return this.glue.layouts.resume(name)
    }).then(() => {
      this.close();
    })
  }
  close() {
    return this.glue.windows.my().close();
  }
}
