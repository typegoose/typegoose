---
title: "Typegoose's Logger"
---

Typegoose uses `loglevel` to make some soft-errors & for debugging

## Set the LogLevel

Currently available loglevels:
  - SILENT (logs nothing | turns the logger off [not recommended])
  - ERROR (shows only error)
  - WARN (default), used for soft errors / soft mistakes (everything below is mostly for debugging)
  - INFO
  - DEBUG
  - TRACE (shows everything)

and to set the loglevel of typegoose:

```ts
import { setLogLevel, LogLevels } from '@hasezoey/typegoose';

setLogLevel(LogLevels.SILENT);
```
