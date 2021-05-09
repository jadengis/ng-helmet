import { InjectionToken } from "@angular/core";
import { NgHelmetOptions } from "./ng-helmet.options";

export const NG_HELMET_OPTIONS = new InjectionToken<NgHelmetOptions>(
  "ng-helmet.options"
);
