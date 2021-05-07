import { ModuleWithProviders, NgModule } from "@angular/core";
import { NgHelmetComponent } from "./ng-helmet.component";
import { NgHelmetConfig } from "./ng-helmet.config";
import { NG_HELMET_CONFIG_TOKEN } from "./ng-helmet.tokens";
import { NgHelmetChildDirective } from "./ng-helmet-child.directive";

const components = [NgHelmetComponent, NgHelmetChildDirective];

@NgModule({
  declarations: components,
  exports: components,
})
export class NgHelmetModule {
  static forRoot(config: NgHelmetConfig): ModuleWithProviders<NgHelmetModule> {
    return {
      ngModule: NgHelmetModule,
      providers: [{ provide: NG_HELMET_CONFIG_TOKEN, useValue: config }],
    };
  }
}
