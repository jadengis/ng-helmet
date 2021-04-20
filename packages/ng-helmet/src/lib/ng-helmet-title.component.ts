import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "ng-helmet > title",
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgHelmetTitleComponent {}
