import { ChangeDetectionStrategy, Component } from '@angular/core';
import {GlueService} from "@launchpad/glue42";
import {Glue42} from "@glue42/desktop";
import {NzSegmentedOptions} from "ng-zorro-antd/segmented/types";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'lp-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent {
  public applications$ = this.glue.applications.applications$;
  public filter: string = '';
  public options: NzSegmentedOptions = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Favorite',
      value: 'favorite',
    },
  ]
  constructor(
    private glue: GlueService,
    public readonly route: ActivatedRoute
  ) {}

  onClick(application: Glue42.AppManager.Application): Promise<Glue42.AppManager.Instance> {
    if (application.allowMultiple) {
      return application.start()
    }
    return application.instances.length
      ? application.instances[0].getWindow()
        .then((window) => window.focus())
        .then(() => application.instances[0])
      : application.start();
  }
  handleIndexChange($event: number) {
    this.applications$ = $event === 0
      ? this.glue.applications.applications$
      : this.glue.applications.favorites$;
  }
}
