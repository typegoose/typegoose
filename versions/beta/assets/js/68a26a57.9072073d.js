"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[2535],{5680:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>y});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),c=l(n),m=a,y=c["".concat(s,".").concat(m)]||c[m]||g[m]||o;return n?r.createElement(y,i(i({ref:t},d),{},{components:n})):r.createElement(y,i({ref:t},d))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[c]="string"==typeof e?e:a,i[1]=p;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},926:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var r=n(8168),a=(n(6540),n(5680));const o={id:"indexes",title:"@index"},i=void 0,p={unversionedId:"api/decorators/indexes",id:"api/decorators/indexes",title:"@index",description:"Typings:",source:"@site/../docs/api/decorators/indexes.md",sourceDirName:"api/decorators",slug:"/api/decorators/indexes",permalink:"/typegoose/versions/beta/docs/api/decorators/indexes",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/api/decorators/indexes.md",tags:[],version:"current",frontMatter:{id:"indexes",title:"@index"},sidebar:"docs",previous:{title:"@pre & @post",permalink:"/typegoose/versions/beta/docs/api/decorators/hooks"},next:{title:"@plugin",permalink:"/typegoose/versions/beta/docs/api/decorators/plugin"}},s={},l=[{value:"Example",id:"example",level:2},{value:"Extra",id:"extra",level:2}],d={toc:l},c="wrapper";function g(e){let{components:t,...n}=e;return(0,a.yg)(c,(0,r.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Typings:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"function index<T extends BeAnObject = BeAnObject>(fields: mongoose.IndexDefinition, options?: IndexOptions<T>): ClassDecorator\n")),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Parameters:")),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,a.yg)("th",{parentName:"tr",align:"center"},"Type"),(0,a.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"fields")," ",(0,a.yg)("span",{class:"badge badge--secondary"},"Required")),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("inlineCode",{parentName:"td"},"mongoose.IndexDefinition")),(0,a.yg)("td",{parentName:"tr",align:"left"},"All Fields for this single index")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"options")),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("a",{parentName:"td",href:"https://mongodb.github.io/node-mongodb-native/6.2/interfaces/CreateIndexesOptions.html"},(0,a.yg)("inlineCode",{parentName:"a"},"IndexOptions<T>"))),(0,a.yg)("td",{parentName:"tr",align:"left"},"Overwrite Schema Options, merged with original schema options")))),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"@index")," is used to set indices on the schema, this decorator acts like ",(0,a.yg)("inlineCode",{parentName:"p"},"schema.index()"),"."),(0,a.yg)("admonition",{type:"note"},(0,a.yg)("p",{parentName:"admonition"},"For ",(0,a.yg)("a",{parentName:"p",href:"https://docs.mongodb.com/manual/tutorial/control-results-of-text-search/"},"Full-Text Search")," option ",(0,a.yg)("inlineCode",{parentName:"p"},"weights")," all fields (from ",(0,a.yg)("inlineCode",{parentName:"p"},"fields"),") have to also be defined in ",(0,a.yg)("inlineCode",{parentName:"p"},"weights"),".")),(0,a.yg)("h2",{id:"example"},"Example"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"@index({ article: 1, user: 1 }, { unique: true }) // compound index\n@index({ location: '2dsphere' }) // single index with no options\n@index({ article: 1 }, { partialFilterExpression: { stars: { $gte: 4.5 } } }) // single index with options\nclass Location {\n  @prop()\n  public article?: number;\n\n  @prop()\n  public user?: number;\n\n  @prop()\n  public stars?: number;\n\n  @prop({ type: Number, dim: 2 })\n  public location?: number[][];\n}\n")),(0,a.yg)("h2",{id:"extra"},"Extra"),(0,a.yg)("p",null,"Inheriting indexes from lower classes can be disabled with ",(0,a.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/api/decorators/model-options#disablelowerindexes"},"ModelOption ",(0,a.yg)("inlineCode",{parentName:"a"},"disableLowerIndexes")),"."))}g.isMDXComponent=!0}}]);