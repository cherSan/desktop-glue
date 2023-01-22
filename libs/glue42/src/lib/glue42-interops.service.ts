import { Injectable } from '@angular/core';
import {GlueService} from "@launchpad/glue42";
import {Glue42} from "@glue42/desktop";
import {CallFunction} from "./interops/interop-description.type";
import {interops} from "./interops";
@Injectable({
  providedIn: 'root'
})
export class GlueInteropsService {
  private readonly interopList: typeof interops = interops;
  private interop!: Glue42.Interop.API;
  public readonly interops: Record<typeof interops[number]['id'], CallFunction<any, any>> = {};
  constructor(private glueService: GlueService) {}
  register() {
    this.interop = this.glueService.glue.interop;
    const pr: Promise<void>[] = [];
    this.interopList.forEach((interop) => {
      pr.push(this.interop.registerAsync(interop.name, interop.handler(this.glueService.glue)));
      this.interops[interop.id] = interop.callFunction(this.glueService.glue);
    });
    return Promise.all(pr);
  }
}
