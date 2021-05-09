import { Directive } from "@angular/core";

@Directive({
  selector: "ng-helmet > title, ng-helmet > meta",
})
export class NgHelmetChildDirective {}
