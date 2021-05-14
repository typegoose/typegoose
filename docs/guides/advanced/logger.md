---
id: logger
title: 'Typegoose Logger'
---

Typegoose uses `loglevel` to make some soft-errors & for debugging.

## Set the LogLevel

Currently available loglevels:

- SILENT (logs nothing | turns the logger off [not recommended])
- ERROR (shows only error)
- WARN (default), used for soft errors / soft mistakes (everything below is mostly for debugging)
- INFO
- DEBUG
- TRACE (shows everything)

To set the loglevel of Typegoose:

```ts
import { setLogLevel, LogLevels } from '@typegoose/typegoose';

setLogLevel(LogLevels.SILENT);
```

## Enable Debug Logger

The logger enable function needs to be placed before any other imports in the project entry file, because all decorators on an class are executed on the context level they are on (commonly the module root)

```ts
// Project Entry file
import { setLogLevel } from "@typegoose/typegoose";
setLogLevel("DEBUG");

import { anythingElse } from "someModule";
import { SomeModel } from "./someModel";

// the rest of the main entry file
```
