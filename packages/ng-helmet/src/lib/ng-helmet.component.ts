import {
  AfterContentInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
} from "@angular/core";
import { Subject } from "rxjs";
import { buildHelmet } from "./ng-helmet.model";
import { NgHelmetService } from "./ng-helmet.service";

let currentId = 0;

@Component({
  selector: "ng-helmet",
  template: "",
})
export class NgHelmetComponent implements AfterContentInit, OnDestroy {
  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly ngHelmetService: NgHelmetService
  ) {
    console.log("hello everyone");
  }

  private readonly id = currentId++;

  private readonly destroy$ = new Subject<void>();

  @HostBinding("id")
  readonly elId = `ng-helmet-${this.id}`;

  ngAfterContentInit(): void {
    const titles = Array.from(this.el.nativeElement.querySelectorAll("title"));
    const metas = Array.from(this.el.nativeElement.querySelectorAll("meta"));
    console.log("titles", titles, "metas", metas);
    this.ngHelmetService.pushHelmet(this.id, buildHelmet(titles[0], metas));
    // combineLatest([
    //   this.titles.changes as Observable<QueryList<HTMLTitleElement>>,
    //   this.metas.changes as Observable<QueryList<HTMLMetaElement>>,
    // ])
    //   .pipe(
    //     map(([titles, metas]) => buildHelmet(titles.get(0), metas.toArray())),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe((helmet) => this.ngHelmetService.pushHelmet(this.id, helmet));
  }

  ngOnDestroy(): void {
    this.ngHelmetService.popHelmet();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
