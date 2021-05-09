import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  OnDestroy,
} from "@angular/core";
import type { QueryList } from "@angular/core";
import { buildHelmet } from "./ng-helmet.model";
import { NgHelmetService } from "./ng-helmet.service";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { NgHelmetChildDirective } from "./ng-helmet-child.directive";

let currentId = 0;

@Component({
  selector: "ng-helmet",
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

  @ContentChildren(NgHelmetChildDirective, {
    read: ElementRef,
    emitDistinctChangesOnly: true,
  })
  readonly children!: QueryList<ElementRef<HTMLElement>>;

  private readonly destroy$ = new Subject<void>();

  ngAfterContentInit(): void {
    const titles = this.children.filter(
      (e) => e.nativeElement instanceof HTMLTitleElement
    ) as ElementRef<HTMLTitleElement>[];
    const metas = this.children.filter(
      (e) => e.nativeElement instanceof HTMLMetaElement
    ) as ElementRef<HTMLMetaElement>[];
    this.ngHelmetService.pushHelmet(this.id, buildHelmet(titles[0], metas));
    (this.children.changes as Observable<QueryList<ElementRef<HTMLElement>>>)
      .pipe(
        map(
          (e) =>
            [
              e.filter(
                (x) => x.nativeElement instanceof HTMLTitleElement
              ) as ElementRef<HTMLTitleElement>[],
              e.filter(
                (x) => x.nativeElement instanceof HTMLMetaElement
              ) as ElementRef<HTMLMetaElement>[],
            ] as const
        ),
        map(([titles, metas]) => buildHelmet(titles[0], metas)),
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
