"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[3734],{5680:(e,t,o)=>{o.d(t,{xA:()=>p,yg:()=>u});var n=o(6540);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function r(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,n,a=function(e,t){if(null==e)return{};var o,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||(a[o]=e[o]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(a[o]=e[o])}return a}var l=n.createContext({}),d=function(e){var t=n.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},p=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var o=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=d(o),m=a,u=c["".concat(l,".").concat(m)]||c[m]||g[m]||r;return o?n.createElement(u,i(i({ref:t},p),{},{components:o})):n.createElement(u,i({ref:t},p))}));function u(e,t){var o=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=o.length,i=new Array(r);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:a,i[1]=s;for(var d=2;d<r;d++)i[d]=o[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,o)}m.displayName="MDXCreateElement"},2145:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>g,frontMatter:()=>r,metadata:()=>s,toc:()=>d});var n=o(8168),a=(o(6540),o(5680));const r={id:"migrate-6",title:"Migrate to 6.0.0"},i=void 0,s={unversionedId:"guides/migration/migrate-6",id:"guides/migration/migrate-6",title:"Migrate to 6.0.0",description:"These are the changes made for 6.0.0 that are breaking or just important to know.",source:"@site/../docs/guides/migration/migrate-6.md",sourceDirName:"guides/migration",slug:"/guides/migration/migrate-6",permalink:"/typegoose/docs/guides/migration/migrate-6",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/migration/migrate-6.md",tags:[],version:"current",frontMatter:{id:"migrate-6",title:"Migrate to 6.0.0"},sidebar:"guides",previous:{title:"Migrate to 7.0.0",permalink:"/typegoose/docs/guides/migration/migrate-7"}},l={},d=[{value:"Requirements changed",id:"requirements-changed",level:2},{value:"InstanceType changed",id:"instancetype-changed",level:2},{value:"<code>getModelForClass</code>, <code>setModelForClass</code>, <code>buildSchema</code>",id:"getmodelforclass-setmodelforclass-buildschema",level:2},{value:"ModelOptions",id:"modeloptions",level:2},{value:"Hooks",id:"hooks",level:2},{value:"Methods (staticMethod, instanceMethod, virtuals)",id:"methods-staticmethod-instancemethod-virtuals",level:2},{value:"setModelForClass is deprecated",id:"setmodelforclass-is-deprecated",level:2},{value:"ModelType is abstracted",id:"modeltype-is-abstracted",level:2},{value:"IC data.ts collections are now Map&lt;T, S&gt;",id:"ic-datats-collections-are-now-mapt-s",level:2},{value:"Notes",id:"notes",level:2}],p={toc:d},c="wrapper";function g(e){let{components:t,...o}=e;return(0,a.yg)(c,(0,n.A)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"These are the changes made for 6.0.0 that are breaking or just important to know."),(0,a.yg)("admonition",{title:"Important, Read this first",type:"caution"},(0,a.yg)("p",{parentName:"admonition"},"This Guide is written for migration from version ",(0,a.yg)("inlineCode",{parentName:"p"},"5.9.2")," to ",(0,a.yg)("inlineCode",{parentName:"p"},"6.0.0"),", for versions ",(0,a.yg)("inlineCode",{parentName:"p"},">6.0.0 <7.0.0"),", please consult the ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md"},"CHANGELOG"))),(0,a.yg)("h2",{id:"requirements-changed"},"Requirements changed"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Typescript ",(0,a.yg)("inlineCode",{parentName:"li"},"3.5")," is now required / recommended"),(0,a.yg)("li",{parentName:"ul"},"Mongoose ",(0,a.yg)("inlineCode",{parentName:"li"},"5.7.1")," or higher is now required")),(0,a.yg)("h2",{id:"instancetype-changed"},"InstanceType changed"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"InstanceType<T>")," was renamed to ",(0,a.yg)("inlineCode",{parentName:"p"},"DocumentType<T>")),(0,a.yg)("h2",{id:"getmodelforclass-setmodelforclass-buildschema"},(0,a.yg)("inlineCode",{parentName:"h2"},"getModelForClass"),", ",(0,a.yg)("inlineCode",{parentName:"h2"},"setModelForClass"),", ",(0,a.yg)("inlineCode",{parentName:"h2"},"buildSchema")),(0,a.yg)("p",null,'They are not in the Typegoose class anymore. They are now outsourced, which means the new syntax is the following (for a "seamless" migration the Typegoose Class still exists and has the functions, but the will be deprecated):'),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"import { getModelForClass } from 'typegoose';\nclass Name {}\n\nconst NameModel = getModelForClass(Name);\n")),(0,a.yg)("p",null,"Note: Typegoose Class still has all the functions, but they are marked deprecated & are just passthroughs to the new functions."),(0,a.yg)("h2",{id:"modeloptions"},"ModelOptions"),(0,a.yg)("p",null,"Use the following decorator now."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"@modelOptions({ schemaOptions: {} })\nclass Name {}\n")),(0,a.yg)("p",null,"Otherwise, the functions still override the settings made in ",(0,a.yg)("inlineCode",{parentName:"p"},"modelOptions")),(0,a.yg)("h2",{id:"hooks"},"Hooks"),(0,a.yg)("p",null,"Hooks received a change (in 6.0.0-13) for the types to comply with the latest mongoose (5.6.8)",(0,a.yg)("br",{parentName:"p"}),"\n","-> no workarounds or typedefs required anymore."),(0,a.yg)("h2",{id:"methods-staticmethod-instancemethod-virtuals"},"Methods (staticMethod, instanceMethod, virtuals)"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"@staticMethod")," & ",(0,a.yg)("inlineCode",{parentName:"p"},"@instanceMethod")," were deprecated in favor of ",(0,a.yg)("inlineCode",{parentName:"p"},"schema.loadClass()"),". These decorators are no longer needed, because the methods are auto-detected."),(0,a.yg)("p",null,"For ",(0,a.yg)("a",{parentName:"p",href:"https://mongoosejs.com/docs/tutorials/virtuals.html"},"virtuals"),", simply use ",(0,a.yg)("inlineCode",{parentName:"p"},"get somevalue() { return ''; }")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"set somevalue(val: string) { }")," (",(0,a.yg)("inlineCode",{parentName:"p"},"@prop")," is no longer needed). [",(0,a.yg)("a",{parentName:"p",href:"/typegoose/docs/api/virtuals#get--set"},"New Documentation"),"]"),(0,a.yg)("p",null,"For ",(0,a.yg)("a",{parentName:"p",href:"https://mongoosejs.com/docs/tutorials/virtuals.html#populate"},"populating virtuals"),", use ",(0,a.yg)("inlineCode",{parentName:"p"},"@prop({ localField, foreignField })"),". The ",(0,a.yg)("inlineCode",{parentName:"p"},"overwrite")," option is no longer needed. [",(0,a.yg)("a",{parentName:"p",href:"/typegoose/docs/api/virtuals#virtual-populate"},"New Documentation"),"]"),(0,a.yg)("p",null,"Update: ",(0,a.yg)("inlineCode",{parentName:"p"},"@staticMethod")," & ",(0,a.yg)("inlineCode",{parentName:"p"},"@instanceMethod")," were removed in 6.1.0-1"),(0,a.yg)("h2",{id:"setmodelforclass-is-deprecated"},"setModelForClass is deprecated"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"setModelForClass()")," has been deprecated, because Mongoose would throw an OverwriteModelError if it was attempted to overwrite a model.",(0,a.yg)("br",{parentName:"p"}),"\n","-> use ",(0,a.yg)("inlineCode",{parentName:"p"},"getModelForClass()")),(0,a.yg)("h2",{id:"modeltype-is-abstracted"},"ModelType is abstracted"),(0,a.yg)("p",null,"The type ",(0,a.yg)("inlineCode",{parentName:"p"},"ModelType")," has been abstracted to ",(0,a.yg)("inlineCode",{parentName:"p"},"ReturnModelType<typeof Class>")," with documentation. But, if for any reason ",(0,a.yg)("inlineCode",{parentName:"p"},"ModelType")," is needed, it needs to be imported from ",(0,a.yg)("inlineCode",{parentName:"p"},"@typegoose/typegoose/lib/types"),"."),(0,a.yg)("h2",{id:"ic-datats-collections-are-now-mapt-s"},"[IC]"," data.ts collections are now Map<T, S>"),(0,a.yg)("p",null,"data.ts's collections got refactored to use ES6 Maps"),(0,a.yg)("h2",{id:"notes"},"Notes"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"[IC]"," The internal handling of schema creation has changed a bit, however we tried to keep the inputs & outputs the same, meaning in some edge-cases schema creation might not work as expected.")),(0,a.yg)("hr",null),(0,a.yg)("sub",null,"*`IC` means `internal change`*"))}g.isMDXComponent=!0}}]);