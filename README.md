# Angular Helmet

[![Build](https://github.com/replayvalue/ng-helmet/actions/workflows/test.yml/badge.svg)](https://github.com/replayvalue/ng-helmet/actions/workflows/test.yml)
[![Test](https://github.com/replayvalue/ng-helmet/actions/workflows/build.yml/badge.svg)](https://github.com/replayvalue/ng-helmet/actions/workflows/build.yml)
[![Lint](https://github.com/replayvalue/ng-helmet/actions/workflows/lint.yml/badge.svg)](https://github.com/replayvalue/ng-helmet/actions/workflows/lint.yml)

Angular Helmet is a simple and intuitive document head manager for Angular applications. Inspired by [React Helmet](https://github.com/nfl/react-helmet).

## Installation

npm:

```bash
npm install --save ng-helmet
```

Yarn:

```bash
yarn add ng-helmet
```

## Features

- Supports the following head tags: `title` and `meta`.
- Supports server-side rendering out of the box.
- Nested components override duplicate head changes.

## Usage

Import the `NgHelmetModule` into your `AppModule` to access the `ng-helmet` component in your components. This module can be optionally configured with the `forRoot` method:

```typescript
import { NgHelmetModule } from "ng-helmet";

@NgModule({
  imports: [
    NgHelmetModule.forRoot({
      baseTitle: "| Replay Value",
    }),
  ],
})
export class AppModule {}
```

The supported configuration parameters are:

| Property  | Requirement | Description                                                               |
| --------- | ----------- | ------------------------------------------------------------------------- |
| baseTitle | Optional    | An optional fixed portion of the browser title, usually the website name. |

## Example

In a component template:

```html
<div class="application">
  <ng-helmet>
    <title>My Title</title>
    <meta charset="utf-8" />
  </ng-helmet>
  ...
</div>
```

Nested or latter components will override duplicate changes, and `meta` elements without a `content` attribute will be removed for the document head:

```html
<div class="parent">
  <ng-helmet>
    <title>My Title</title>
    <meta name="description" content="NgHelmet application" />
    <meta name="some-property" content="some-value" />
  </ng-helmet>

  <div class="child">
    <ng-helmet>
      <title>Nested Title</title>
      <meta name="description" content="Nested component" />
      <meta name="some-property" />
    </ng-helmet>
  </div>
</div>
```

outputs:

```html
<head>
  <title>Nested Title</title>
  <meta name="description" content="Nested component" />
</head>
```

## License

MIT
