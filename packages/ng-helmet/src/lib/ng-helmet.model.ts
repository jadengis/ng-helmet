import { MetaDefinition } from "@angular/platform-browser";

export type NgHelmet = Readonly<{
  title?: string;
  metas: MetaDefinitions;
}>;

export type MetaDefinitions = {
  [selector: string]: MetaDefinition;
};

export function buildHelmet(
  titleEl: HTMLTitleElement | undefined,
  metaEls: HTMLMetaElement[]
): NgHelmet {
  return {
    ...(titleEl && { title: titleEl.title }),
    metas: metaEls.map(metaToDefinition).reduce((acc, el) => {
      acc[attrSelector(el)] = el;
      return acc;
    }, {} as MetaDefinitions),
  };
}

function metaToDefinition(el: HTMLMetaElement): MetaDefinition {
  const property = el.getAttribute("property");
  return {
    name: el.name,
    content: el.content,
    httpEquiv: el.httpEquiv,
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
