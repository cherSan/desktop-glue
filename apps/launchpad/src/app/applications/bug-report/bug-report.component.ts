import { ChangeDetectionStrategy, Component } from '@angular/core';
import {GlueService} from "@launchpad/glue42";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'lp-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BugReportComponent {
  public application$ = this.activatedRoute.parent?.params.pipe(
    map((param) => this.glue.applications.api.application(param['applicationName'])),
  )
  public readonly from = new FormControl<string>({value: this.glue.user || '', disabled: true}, [Validators.required])
  public readonly description = new FormControl<string>('', [Validators.required])
  public readonly form = new FormGroup({
    description: this.description
  })
  constructor(
    private glue: GlueService,
    private activatedRoute: ActivatedRoute
  ) {
  }
}
