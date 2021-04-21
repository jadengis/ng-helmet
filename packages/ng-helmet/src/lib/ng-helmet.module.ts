import { ModuleWithProviders, NgModule } from "@angular/core";
import { NgHelmetComponent } from "./ng-helmet.component";
import { NgHelmetTitleComponent } from "./ng-helmet-title.component";
import { NgHelmetMetaComponent } from "./ng-helmet-meta.component";
import { NgHelmetConfig } from "./ng-helmet.config";
import { NG_HELMET_CONFIG_TOKEN } from "./ng-helmet.tokens";

const components = [
  NgHelmetComponent,
  NgHelmetTitleComponent,
  NgHelmetMetaComponent,
];

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
