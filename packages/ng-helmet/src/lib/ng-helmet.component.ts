import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  OnDestroy,
  QueryList,
} from "@angular/core";
import { NgHelmetTitleComponent } from "./ng-helmet-title.component";
import { NgHelmetMetaComponent } from "./ng-helmet-meta.component";
import { buildHelmet } from "./ng-helmet.model";
import { NgHelmetService } from "./ng-helmet.service";
import { combineLatest, Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

let currentId = 0;

@Component({
  selector: "ng-helmet",
  // template: "<ng-content></ng-content>",
  template: ``,
})
export class NgHelmetComponent implements AfterContentInit, OnDestroy {
  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly ngHelmetService: NgHelmetService
  ) {}

  private readonly id = currentId++;

  @HostBinding("id")
  readonly elId = `ng-helmet-${this.id}`;

  @ContentChildren(NgHelmetTitleComponent, {
    read: ElementRef,
    emitDistinctChangesOnly: true,
  })
  readonly titles!: QueryList<ElementRef<HTMLTitleElement>>;

  @ContentChildren(NgHelmetMetaComponent, {
    read: ElementRef,
    emitDistinctChangesOnly: true,
  })
  readonly metas!: QueryList<ElementRef<HTMLMetaElement>>;

  private readonly destroy$ = new Subject<void>();

  ngAfterContentInit(): void {
    this.ngHelmetService.pushHelmet(
      this.id,
      buildHelmet(this.titles.get(0), this.metas.toArray())
    );
    combineLatest([
      this.titles.changes as Observable<
        QueryList<ElementRef<HTMLTitleElement>>
      >,
      this.metas.changes as Observable<QueryList<ElementRef<HTMLMetaElement>>>,
    ])
      .pipe(
        map(([titles, metas]) => buildHelmet(titles.get(0), metas.toArray())),
        takeUntil(this.destroy$)
      )
      .subscribe((helmet) => this.ngHelmetService.pushHelmet(this.id, helmet));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.ngHelmetService.popHelmet();
  }
}
