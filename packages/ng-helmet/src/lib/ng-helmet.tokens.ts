import { InjectionToken } from "@angular/core";
import { NgHelmetConfig } from "./ng-helmet.config";

export const NG_HELMET_CONFIG_TOKEN = new InjectionToken<NgHelmetConfig>(
  "ng-helmet.config"
);
