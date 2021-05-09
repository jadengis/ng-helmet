import { ModuleWithProviders, NgModule } from "@angular/core";
import { NgHelmetComponent } from "./ng-helmet.component";
import { NgHelmetOptions } from "./ng-helmet.options";
import { NG_HELMET_OPTIONS } from "./ng-helmet.tokens";
import { NgHelmetChildDirective } from "./ng-helmet-child.directive";

const components = [NgHelmetComponent, NgHelmetChildDirective];

@NgModule({
  declarations: components,
  exports: components,
})
export class NgHelmetModule {
  static forRoot(config: NgHelmetOptions): ModuleWithProviders<NgHelmetModule> {
    return {
      ngModule: NgHelmetModule,
      providers: [{ provide: NG_HELMET_OPTIONS, useValue: config }],
    };
  }
}
