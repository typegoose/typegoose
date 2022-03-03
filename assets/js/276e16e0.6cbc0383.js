"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[8276],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),g=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=g(e.components);return o.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=g(n),d=r,m=c["".concat(s,".").concat(d)]||c[d]||p[d]||l;return n?o.createElement(m,a(a({ref:t},u),{},{components:n})):o.createElement(m,a({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,a=new Array(l);a[0]=c;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,a[1]=i;for(var g=2;g<l;g++)a[g]=n[g];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},2609:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return g},assets:function(){return u},toc:function(){return p},default:function(){return d}});var o=n(7462),r=n(3366),l=(n(7294),n(3905)),a=["components"],i={id:"logger",title:"Typegoose Logger"},s=void 0,g={unversionedId:"guides/advanced/logger",id:"guides/advanced/logger",title:"Typegoose Logger",description:"Typegoose uses loglevel to make some soft-errors and for debugging.",source:"@site/../docs/guides/advanced/logger.md",sourceDirName:"guides/advanced",slug:"/guides/advanced/logger",permalink:"/typegoose/docs/guides/advanced/logger",editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/advanced/logger.md",tags:[],version:"current",frontMatter:{id:"logger",title:"Typegoose Logger"},sidebar:"guides",previous:{title:"Common Plugins",permalink:"/typegoose/docs/guides/integration-examples/common-plugins"},next:{title:"All Decorators",permalink:"/typegoose/docs/guides/all-decorators"}},u={},p=[{value:"Set the LogLevel",id:"set-the-loglevel",level:2},{value:"Enable Debug Logger",id:"enable-debug-logger",level:2}],c={toc:p};function d(e){var t=e.components,n=(0,r.Z)(e,a);return(0,l.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Typegoose uses ",(0,l.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/loglevel"},(0,l.kt)("inlineCode",{parentName:"a"},"loglevel"))," to make some soft-errors and for debugging."),(0,l.kt)("h2",{id:"set-the-loglevel"},"Set the LogLevel"),(0,l.kt)("p",null,"Currently available loglevels:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"SILENT")," (logs nothing | turns the logger off ","[not recommended]",")"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"ERROR")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"WARN")," (default), used for soft errors / soft mistakes (everything below is mostly for debugging)"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"INFO")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"DEBUG")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"TRACE")," (shows everything)")),(0,l.kt)("p",null,"To set the loglevel of Typegoose:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import { setLogLevel, LogLevels } from '@typegoose/typegoose';\n\nsetLogLevel(LogLevels.SILENT);\n// or\nsetLogLevel(\"SILENT\");\n")),(0,l.kt)("h2",{id:"enable-debug-logger"},"Enable Debug Logger"),(0,l.kt)("p",null,"The import and call of ",(0,l.kt)("inlineCode",{parentName:"p"},"setLogLevel")," needs to be placed before any other imports of the project entries file, because all decorators on a Class are executed on the context level they are on (commonly the module root)."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'// Project Entry file\nimport { setLogLevel } from "@typegoose/typegoose";\nsetLogLevel("DEBUG");\n\nimport { anythingElse } from "someModule";\nimport { SomeModel } from "./someModel";\n\n// the rest of the main entry file\n')))}d.isMDXComponent=!0}}]);