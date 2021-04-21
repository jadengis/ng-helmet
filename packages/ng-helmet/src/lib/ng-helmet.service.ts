import { Inject, Injectable, Optional } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { NgHelmetConfig } from "./ng-helmet.config";
import { NgHelmet, MetaDefinitions } from "./ng-helmet.model";
import { NG_HELMET_CONFIG_TOKEN } from "./ng-helmet.tokens";

type HelmetStack = { readonly id: number; helmet: NgHelmet }[];

@Injectable({
  providedIn: "root",
})
export class NgHelmetService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Optional()
    @Inject(NG_HELMET_CONFIG_TOKEN)
    private readonly config?: NgHelmetConfig
  ) {}

  private readonly helmetStack: HelmetStack = [];

  /**
   * Push a new helmet on to the helmetStack and update the document head.
   * If the helmet id already exists in the stack (i.e. the ng-helmet content
   * was updated), this method simply updates the helmet at the existing position.
   * @param id The id of the NgHelmetComponent this helmet comes from.
   * @param helmet the NgHelmet data harvested from the component.
   */
  pushHelmet(id: number, helmet: NgHelmet): void {
    const index = this.helmetStack.findIndex((e) => e.id === id);
    if (index === -1) {
      this.helmetStack.push({ id, helmet });
    } else {
      this.helmetStack[index].helmet = helmet;
    }
    this.applyHelmet(this.computeHelmet());
  }

  /**
   * Pop the top element off the helmetStack and update the document head.
   */
  popHelmet(): void {
    const top = this.helmetStack.pop();
    if (top) {
      // Drop the content attribute from all top metas so they get cleared.
      const topMetas = top.helmet.metas;
      Object.keys(topMetas).forEach((selector) => {
        const { content: _, ...rest } = topMetas[selector];
        topMetas[selector] = rest;
      });

      // Merge top metas to clear with new computed metas.
      const { title, metas } = this.computeHelmet();
      this.applyHelmet({ title, metas: { ...topMetas, ...metas } });
    } else {
      throw new Error(`popped an empty helmetStack`);
    }
  }

  /**
   * Compute the current helmet from the stack.
   * @returns The current helmet.
   */
  private computeHelmet(): NgHelmet {
    if (this.helmetStack.length > 0) {
      return this.helmetStack
        .map((e) => e.helmet)
        .reduce((acc, el) => ({
          title: el.title ?? acc.title,
          metas: { ...acc.metas, ...el.metas },
        }));
    }
    return { metas: {} };
  }

  /**
   * Apply the given helmet to the document header.
   * @param helmet The helmet to apply.
   */
  private applyHelmet(helmet: NgHelmet): void {
    if (helmet.title) {
      const baseTitle = this.config?.baseTitle;
      const title = baseTitle ? `${helmet.title} ${baseTitle}` : helmet.title;
      this.title.setTitle(title);
    }
    this.applyMetaDefinitions(helmet.metas);
  }

  /**
   * Apply the MetaDefinitions to the document head.
   * If the MetaDefinition has no content, this method will remove the
   * corresponding tag.
   * @param metas The MetaDefinitions to apply to the document.
   */
  private applyMetaDefinitions(metas: MetaDefinitions): void {
    Object.keys(metas).forEach((selector) => {
      const tag = metas[selector];
      if (!tag.content) {
        this.meta.removeTag(selector);
      } else if (this.meta.getTag(selector)) {
        this.meta.updateTag(tag);
      } else {
        this.meta.addTag(tag);
      }
    });
  }
}
