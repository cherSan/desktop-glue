import {Injectable, Input} from "@angular/core";
import {Glue42} from "@glue42/desktop";
import {Glue42Store} from "@glue42/ng";

@Injectable({
  providedIn: 'root'
})
export class GlueWindowService {
  private glue: Glue42.Glue;
  private size: number = 0
  private resize: Promise<unknown> = Promise.resolve()
  constructor(
    private readonly glueStore: Glue42Store,
  ) {
    this.glue = glueStore.getGlue() as Glue42.Glue;
  }
  add(size: number) {
    this.size = this.size + size;
    this.recalculate()
  }
  remove(size: number) {
    this.size = this.size - size;
    this.recalculate()
  }

  private recalculate() {
    this.resize = this.resize.then(() => {
      return this.glue.displays.getByWindowId(this.glue.windows.my().id)
        .then(display => this.glue.windows.my().moveResize({
          height: 500,
          top: display.workArea.height - 500,
          left: 0,
          width: this.size,
        }));
    })
  }
}
