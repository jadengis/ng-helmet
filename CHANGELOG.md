# 2.0.1

### Bugfixes

- Fix an issue where `@angular/platform-browser-dynamic` was unintentionally being brought into
  `package.json`

# 2.0.0

### BREAKING CHANGES

- Support for Angular 12 and below dropped due to the new packaging format.

### Features

- Support for Angular >=13 <15

# 1.1.0

### Features

- Replace NgHelmetTitleComponent and NgHelmetMetaComponent with NgHelmetChildDirective which handles both these cases, and is extensible to more.

### Bugfixes

- Renamed some internal options: `NG_HELMET_CONFIG_TOKEN` => `NG_HELMET_OPTIONS` and `NgHelmetConfig` => `NgHelmetOptions`.
- Swap `import { QueryList }` to `import type { QueryList }` to avoid unnecessary inclusion of type.

# 1.0.0

### Features

- Initial release
