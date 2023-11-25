"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[788],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return g}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=c(r),m=o,g=u["".concat(p,".").concat(m)]||u[m]||d[m]||i;return r?n.createElement(g,a(a({ref:t},l),{},{components:r})):n.createElement(g,a({ref:t},l))}));function g(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[u]="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},9342:function(e,t,r){r.r(t),r.d(t,{assets:function(){return l},contentTitle:function(){return p},default:function(){return g},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return u}});var n=r(7462),o=r(3366),i=(r(7294),r(3905)),a=["components"],s={id:"migrate-12",title:"Migrate to 12.0.0"},p=void 0,c={unversionedId:"guides/migration/migrate-12",id:"guides/migration/migrate-12",title:"Migrate to 12.0.0",description:"These are the changes made for 12.0.0 that are breaking or just important to know",source:"@site/../docs/guides/migration/migrate-12.md",sourceDirName:"guides/migration",slug:"/guides/migration/migrate-12",permalink:"/typegoose/docs/guides/migration/migrate-12",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/migration/migrate-12.md",tags:[],version:"current",frontMatter:{id:"migrate-12",title:"Migrate to 12.0.0"},sidebar:"guides",previous:{title:'Why overwrite "this"',permalink:"/typegoose/docs/guides/advanced/overwrite-this"},next:{title:"Migrate to 11.0.0",permalink:"/typegoose/docs/guides/migration/migrate-11"}},l={},u=[{value:"Requirements changed",id:"requirements-changed",level:2},{value:"TSConfig Target is now <code>es2021</code>",id:"tsconfig-target-is-now-es2021",level:2},{value:"Important typescript decorator note",id:"important-typescript-decorator-note",level:2},{value:"Notes",id:"notes",level:2}],d={toc:u},m="wrapper";function g(e){var t=e.components,r=(0,o.Z)(e,a);return(0,i.kt)(m,(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"These are the changes made for 12.0.0 that are breaking or just important to know"),(0,i.kt)("admonition",{title:"Important, Read this first",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"This Guide is written for migration from version ",(0,i.kt)("inlineCode",{parentName:"p"},"11.7.1")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"12.0.0"),", for versions ",(0,i.kt)("inlineCode",{parentName:"p"},">12.0.0 <13.0.0"),", please consult the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md"},"CHANGELOG"))),(0,i.kt)("h2",{id:"requirements-changed"},"Requirements changed"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Mongoose ",(0,i.kt)("inlineCode",{parentName:"li"},"8.0.1")," or higher is now required"),(0,i.kt)("li",{parentName:"ul"},"Typescript ",(0,i.kt)("inlineCode",{parentName:"li"},"5.2")," or higher is now required to be used"),(0,i.kt)("li",{parentName:"ul"},"NodeJS 16 is now the lowest supported nodejs version")),(0,i.kt)("h2",{id:"tsconfig-target-is-now-es2021"},"TSConfig Target is now ",(0,i.kt)("inlineCode",{parentName:"h2"},"es2021")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"tsconfig")," target has been changed to ",(0,i.kt)("inlineCode",{parentName:"p"},"es2021"),", which also makes the ouput incompatible with anything before NodeJS 16.",(0,i.kt)("br",{parentName:"p"}),"\n","This was changed because it outputs less polyfills and makes debugging easier (also bundle size is ",(0,i.kt)("em",{parentName:"p"},"slightly")," lower)"),(0,i.kt)("h2",{id:"important-typescript-decorator-note"},"Important typescript decorator note"),(0,i.kt)("p",null,"This section is just a important note, not a change."),(0,i.kt)("p",null,"Now that typescript 5.2 is the minimal and typescript 5.0 added ES Decorators (and is enabled by default), users may get confusing errors about decorators if ",(0,i.kt)("inlineCode",{parentName:"p"},"experimentalDecorators"),' is not enabled, because typegoose still uses the old "legacy" system and only works with that.'),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/typegoose/typegoose/issues/861"},"#861")," for progress regarding ES Decorator usage."),(0,i.kt)("h2",{id:"notes"},"Notes"))}g.isMDXComponent=!0}}]);