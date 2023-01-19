import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {VisibleAreasService} from "./visible-areas.service";

@Directive({
  standalone: true,
  selector: '[pSizeObserver]',
})
export class SizeObserverDirective implements OnInit, OnDestroy {

  private readonly id: string;

  private readonly resizeObserver = new ResizeObserver((entries) => {
    if (entries[0]) {
      this.visibleAreas.setParams(this.id, {
        top: parseInt(`${(entries[0].target as HTMLElement).offsetTop}`),
        left: parseInt(`${(entries[0].target as HTMLElement).offsetLeft}`),
        width: parseInt(`${entries[0].contentRect.width}`),
        height: parseInt(`${entries[0].contentRect.height}`)
      })
    }
  })
  constructor(
    private readonly el: ElementRef,
    private readonly visibleAreas: VisibleAreasService
  ) {
    this.id = `${Date.now()}`
  }

  ngOnInit() {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.resizeObserver.unobserve(this.el.nativeElement);
    this.resizeObserver.disconnect();
    this.visibleAreas.removeParams(this.id);
  }
}