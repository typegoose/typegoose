---
id: logger
title: 'Typegoose Logger'
---

Typegoose uses [`loglevel`](https://www.npmjs.com/package/loglevel) to make some soft-errors and for debugging.

## Set the LogLevel

Currently available loglevels:

- `SILENT` (logs nothing | turns the logger off [not recommended])
- `ERROR`
- `WARN` (default), used for soft errors / soft mistakes (everything below is mostly for debugging)
- `INFO`
- `DEBUG`
- `TRACE` (shows everything)

To set the loglevel of Typegoose:

```ts
import { setLogLevel, LogLevels } from '@typegoose/typegoose';

setLogLevel(LogLevels.SILENT);
// or
setLogLevel("SILENT");
```

## Enable Debug Logger

The import and call of `setLogLevel` needs to be placed before any other imports of the project entries file, because all decorators on a Class are executed on the context level they are on (commonly the module root).

```ts
// Project Entry file
import { setLogLevel } from "@typegoose/typegoose";
setLogLevel("DEBUG");

import { anythingElse } from "someModule";
import { SomeModel } from "./someModel";

// the rest of the main entry file
```
