import { Component } from '@angular/core';
import {Glue42Store} from "@glue42/ng";
import {Glue42} from "@glue42/desktop";
import {BehaviorSubject, delay, from, map, Observable, repeat, Subject, switchMap, takeUntil, tap} from "rxjs";
type Category = {
  type: 'category',
  title: string
}
@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public readonly filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly glue: Glue42.Glue = this.glueStore.getGlue() as Glue42.Glue;
  private readonly live$ = new Subject<void>();
  // APPS
  private readonly applications$: Observable<(Glue42.AppManager.Application | Category)[]> = from(this.glue.appManager.ready()).pipe(
    takeUntil(this.live$),
    map(() => this.glue.appManager.applications()),
    map((application) => application.filter(app => !app.hidden && !app.isShell)),
    map((applications) => applications.reduce<{[category: string]: Glue42.AppManager.Application[]}>((accum, application) => {
      const category = application.userProperties['category'] || 'Other';
      accum[category] = (accum[category] || []).concat(application)
      return accum;
    }, {})),
    map((appsByCategory) => {
      const sortedCategories = Object.keys(appsByCategory).sort();
      return sortedCategories.reduce<(Glue42.AppManager.Application | Category)[]>((accum, category) => {
        return [...accum, { type: 'category', title: category }, ...appsByCategory[category]]
      },  [])
    }),
    switchMap((applicationsWithCategory) => {
      return this.filter$.pipe(
        map((filter) => {
          return applicationsWithCategory.filter(app => app.title.toLowerCase().includes(filter.toLowerCase()))
        })
      )
    }),
    tap((applicationsWithCategories) => this.applicationsWithCategories = applicationsWithCategories || []),
    delay(10000),
    repeat()
  );
  public applicationsWithCategories: (Glue42.AppManager.Application | Category)[] = [];

  // WINDOWS
  private readonly windows$: Observable<Glue42.Windows.GDWindow[]> = from(this.glue.windows.ready()).pipe(
    takeUntil(this.live$),
    map(() => this.glue.windows.list()),
    map((windows) => windows.filter(w => !w.application || (!w.application?.hidden && !w.application?.isShell))),
    tap(windows => this.windows = windows || []),
    delay(2000),
    repeat()
  )
  public windows: Glue42.Windows.GDWindow[] = [];
  constructor(
    private readonly glueStore: Glue42Store
  ) {}
  ngOnInit() {
    this.applications$.subscribe();
    this.windows$.subscribe()
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete();
  }
}
