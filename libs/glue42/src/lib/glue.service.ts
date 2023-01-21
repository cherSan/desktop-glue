import {Injectable} from "@angular/core";
import {Glue42} from "@glue42/desktop";
import {Glue42Store} from "@glue42/ng";
import {catchError, first, firstValueFrom, forkJoin, from, Observable, of, switchMap, tap} from "rxjs";
import {GlueLayouts} from "./glue-layouts";
import {GlueApplications} from "./glue-applications";

@Injectable({
  providedIn: "root"
})
export class GlueService {
  private glueValue!: Glue42.Glue;
  get glue(): Glue42.Glue { return this.glueValue }
  private myWindowValue!: Glue42.Windows.GDWindow;
  get myWindow(): Glue42.Windows.GDWindow { return this.myWindowValue }
  private tabsValue!: GlueLayouts;
  get tabs(): GlueLayouts { return this.tabsValue }
  private applicationsValue!: GlueApplications
  get applications(): GlueApplications { return this.applicationsValue }
  public user?: string;
  public region?: string;
  public env?: string;
  constructor(
    private window: Window,
    private glueStore: Glue42Store,
  ) {
  }
  initialize(): Observable<Glue42.Windows.GDWindow> {
    if (!this.glue) {
      return this.glueStore.ready().pipe(
        first(),
        catchError(() => {
          return of({error: null});
        }),
        switchMap((ready) => {
          if (ready.error) throw new Error('Error Glue Initialization: ' + ready.error);
          this.glueValue = this.glueStore.getGlue() as Glue42.Glue;
          return forkJoin([
            from(this.glue.appManager.ready()),
            from(this.glue.windows.ready()),
            from(this.glue.layouts.ready()),
          ])
        }),
        tap(() => {
          this.user = window.glue42gd?.env.windowsUserName;
          this.env = window.glue42gd?.env.env;
          this.region = window.glue42gd?.env.region
          this.tabsValue = new GlueLayouts(this.glue);
          this.applicationsValue = new GlueApplications(this.glue);
        }),
        switchMap(() => {
          this.myWindowValue = this.glue.windows.my();
          return from(this.myWindowValue.show())
        })
      )
    }
    return of(this.myWindowValue)
  }
  exit() {
    firstValueFrom(this.tabsValue.currentLayout$)
      .then(
        (lo) => {
          if (lo) return this.tabsValue.api.hibernate(lo?.name);
          return Promise.resolve();
        }
      )
      .then(() => this.myWindow.close())

  }
}
