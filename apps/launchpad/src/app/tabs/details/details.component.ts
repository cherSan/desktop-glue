import { ChangeDetectionStrategy, Component } from '@angular/core';
import {map, Observable, switchMap, tap} from "rxjs";
import {GlueService} from "@launchpad/glue42";
import {ActivatedRoute} from "@angular/router";
import {Glue42} from "@glue42/desktop";
type TabComponent = {
  component: Glue42.Layouts.LayoutComponent,
  application: Observable<Glue42.AppManager.Application | undefined>
}
@Component({
  selector: 'lp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  tabComponents: TabComponent[] =[];
  public tab$: Observable<Glue42.Layouts.Layout | undefined> = this.activatedRoute.params.pipe(
    switchMap((param) => this.glue.tabs.api.get(param['tabName'], 'Global')),
    tap((t) => {
      this.tabComponents = t?.components
        .filter((c) => c.componentType === 'application')
        .map((component) => {
          return {
            component,
            application: this.glue.applications.applications$.pipe(
              map(apps => apps.find(app => app.name === (component  as Glue42.Layouts.LayoutComponent & {application: string}).application))
            )
          }
        }) || [];
    })
  )
  constructor(
    private glue: GlueService,
    public readonly activatedRoute: ActivatedRoute
  ) {
  }
}
