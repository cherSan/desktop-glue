import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GlueService} from "@launchpad/glue42";
import {map, Observable, tap} from "rxjs";
@Component({
  selector: 'lp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  public isFavorite$?: Observable<boolean>;
  public application$ = this.activatedRoute.params.pipe(
    tap((param) => this.isFavorite$ = this.glue.applications.favorite$(param['applicationName'])),
    map((param) => this.glue.applications.api.application(param['applicationName'])),
  )
  constructor(
    private glue: GlueService,
    private activatedRoute: ActivatedRoute
  ) {
  }
  addToFavorite(applicationName: string) {
    this.glue.applications.addToFavorite(applicationName)
  }
  removeFromFavorite(applicationName: string) {
    this.glue.applications.removeFromFavorite(applicationName)
  }
}
