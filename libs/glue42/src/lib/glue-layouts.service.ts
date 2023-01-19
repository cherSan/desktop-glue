import {Injectable} from "@angular/core";
import {Glue42Store} from "@glue42/ng";
import {Glue42} from "@glue42/desktop";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlueLayoutsService {
  public readonly layoutsAPI: Glue42.Layouts.API = this.glueStore.getGlue().layouts as Glue42.Layouts.API;
  public layouts$ = new BehaviorSubject<Glue42.Layouts.LayoutSummary[]>([])
  public currentLayout$ = new BehaviorSubject<Glue42.Layouts.LayoutSummary | undefined>(undefined)
  constructor(
    private glueStore: Glue42Store
  ) {
    this.layoutsAPI.onAdded(() => {
      this.updateLayouts();
    })
    this.layoutsAPI.onRemoved(() => {
      this.updateLayouts();
    })
    this.layoutsAPI.onRenamed(() => {
      this.updateLayouts();
    });
    this.layoutsAPI.onRestored(() => {
      this.updateCurrent();
    })
  }

  updateLayouts() {
    this.layoutsAPI.ready()
      .then(() => this.layoutsAPI.getAll('Global'))
      .then((layouts) => this.layouts$.next(layouts))
  }
  updateCurrent() {
    this.layoutsAPI.ready()
      .then(() => this.layoutsAPI.getCurrentLayout())
      .then((layout) => this.currentLayout$.next(layout))
  }
}
