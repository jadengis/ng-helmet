import { ElementRef } from "@angular/core";
import { MetaDefinition } from "@angular/platform-browser";

export type NgHelmet = Readonly<{
  title?: string;
  metas: MetaDefinitions;
}>;

export type MetaDefinitions = {
  [selector: string]: MetaDefinition;
};

export function buildHelmet(
  titleEl: ElementRef<HTMLTitleElement> | undefined,
  metaEls: ElementRef<HTMLMetaElement>[]
): NgHelmet {
  return {
    ...(titleEl && { title: titleEl.nativeElement.text }),
    metas: metaEls.map(metaToDefinition).reduce((acc, el) => {
      acc[attrSelector(el)] = el;
      return acc;
    }, {} as MetaDefinitions),
  };
}

function metaToDefinition({
  nativeElement: el,
}: ElementRef<HTMLMetaElement>): MetaDefinition {
  const { name, content, httpEquiv } = el;
  const property = el.getAttribute("property");
  return {
    ...(name && { name }),
    ...(content && { content }),
    ...(httpEquiv && { httpEquiv }),
    ...(property && { property }),
  };
}

function attrSelector(meta: MetaDefinition): string {
  if (meta.name) {
    return `name='${meta.name}'`;
  } else if (meta.property) {
    return `property='${meta.property}'`;
  }
  throw new Error(`MetaDefinition does not have 'name' or 'property'`);
}
