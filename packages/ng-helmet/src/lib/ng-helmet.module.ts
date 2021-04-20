import { NgModule } from "@angular/core";
import { NgHelmetComponent } from "./ng-helmet.component";
import { NgHelmetTitleComponent } from "./ng-helmet-title/ng-helmet-title.component";
import { NgHelmetMetaComponent } from "./ng-helmet-meta/ng-helmet-meta.component";

@NgModule({
  declarations: [
    NgHelmetComponent,
    NgHelmetTitleComponent,
    NgHelmetMetaComponent,
  ],
  exports: [NgHelmetComponent, NgHelmetTitleComponent, NgHelmetMetaComponent],
})
export class NgHelmetModule {}
