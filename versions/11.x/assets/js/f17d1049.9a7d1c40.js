"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[378],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return g}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=s(n),m=o,g=u["".concat(l,".").concat(m)]||u[m]||d[m]||a;return n?r.createElement(g,i(i({ref:t},c),{},{components:n})):r.createElement(g,i({ref:t},c))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[u]="string"==typeof e?e:o,i[1]=p;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6692:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return g},frontMatter:function(){return p},metadata:function(){return s},toc:function(){return u}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],p={id:"plugin",title:"@plugin"},l=void 0,s={unversionedId:"api/decorators/plugin",id:"api/decorators/plugin",title:"@plugin",description:"Typings:",source:"@site/../docs/api/decorators/plugin.md",sourceDirName:"api/decorators",slug:"/api/decorators/plugin",permalink:"/typegoose/versions/11.x/docs/api/decorators/plugin",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/old/11.x/docs/../docs/api/decorators/plugin.md",tags:[],version:"current",frontMatter:{id:"plugin",title:"@plugin"},sidebar:"docs",previous:{title:"@index",permalink:"/typegoose/versions/11.x/docs/api/decorators/indexes"},next:{title:"@queryMethod",permalink:"/typegoose/versions/11.x/docs/api/decorators/query-method"}},c={},u=[{value:"Example",id:"example",level:2}],d={toc:u},m="wrapper";function g(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)(m,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Typings:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"function plugin<TFunc extends Func, TParams = Parameters<TFunc>[1]>(mongoosePlugin: TFunc, options?: TParams): ClassDecorator\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Parameters:")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"mongoosePlugin")," ",(0,a.kt)("span",{class:"badge badge--secondary"},"Required")),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},"TFunc")),(0,a.kt)("td",{parentName:"tr",align:"left"},"The Plugin to add, works like a normal ",(0,a.kt)("inlineCode",{parentName:"td"},"schema.plugin(plugin)")," call")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"options")),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},"TParams")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Options to add to the plugin, works like the second parameter to ",(0,a.kt)("inlineCode",{parentName:"td"},"schema.plugin(plugin, options)"))))),(0,a.kt)("p",null,"Also see ",(0,a.kt)("a",{parentName:"p",href:"/typegoose/versions/11.x/docs/guides/integration-examples/common-plugins"},"Common Plugins"),"."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"If the Plugin to be added has options defined, it can be automatically inferred and set as the type for ",(0,a.kt)("inlineCode",{parentName:"p"},"options"),", it can also be manually overwritten with the second generic.")),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { plugin, getModelForClass } from '@typegoose/typegoose';\nimport * as findOrCreate from 'mongoose-findorcreate';\n\n@plugin(findOrCreate)\nclass User {}\n\nconst UserModel = getModelForClass(User);\nconst result = await UserModel.findOrCreate({ ... });\n")))}g.isMDXComponent=!0}}]);