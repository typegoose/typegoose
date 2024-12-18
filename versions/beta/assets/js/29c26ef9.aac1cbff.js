"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[327],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>m});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},g="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),g=d(n),y=r,m=g["".concat(s,".").concat(y)]||g[y]||c[y]||o;return n?a.createElement(m,l(l({ref:t},p),{},{components:n})):a.createElement(m,l({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=y;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[g]="string"==typeof e?e:r,l[1]=i;for(var d=2;d<o;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}y.displayName="MDXCreateElement"},4329:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var a=n(8168),r=(n(6540),n(5680));const o={id:"delete-model",title:"deleteModel*"},l=void 0,i={unversionedId:"api/functions/delete-model",id:"api/functions/delete-model",title:"deleteModel*",description:"deleteModel",source:"@site/../docs/api/functions/deleteModel.md",sourceDirName:"api/functions",slug:"/api/functions/delete-model",permalink:"/typegoose/versions/beta/docs/api/functions/delete-model",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/api/functions/deleteModel.md",tags:[],version:"current",frontMatter:{id:"delete-model",title:"deleteModel*"},sidebar:"docs",previous:{title:"addModelToTypegoose",permalink:"/typegoose/versions/beta/docs/api/functions/add-model-to-typegoose"},next:{title:"setGlobalOptions",permalink:"/typegoose/versions/beta/docs/api/functions/set-global-options"}},s={},d=[{value:"deleteModel",id:"deletemodel",level:2},{value:"deleteModelWithClass",id:"deletemodelwithclass",level:2}],p={toc:d},g="wrapper";function c(e){let{components:t,...n}=e;return(0,r.yg)(g,(0,a.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"deletemodel"},"deleteModel"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Typings:")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"function deleteModel(name: string)\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Parameters:")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},(0,r.yg)("inlineCode",{parentName:"td"},"name")," ",(0,r.yg)("span",{class:"badge badge--secondary"},"Required")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"string")),(0,r.yg)("td",{parentName:"tr",align:"left"},"The Key to remove from the Cache")))),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"deleteModel")," deletes the given Key (",(0,r.yg)("inlineCode",{parentName:"p"},"name"),") from mongoose and the Typegoose Cache, the key is the generated ",(0,r.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/guides/advanced/name-generation"},"Model Name"),"."),(0,r.yg)("p",null,"Use ",(0,r.yg)("a",{parentName:"p",href:"#deletemodelwithclass"},(0,r.yg)("inlineCode",{parentName:"a"},"deleteModelWithClass"))," when wanting to delete by class instead of by key directly."),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"This function also deletes the Model from Mongoose itself.")),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"Currently this function does not delete any entries that have different name generation applied at insertion time (like having name generation overwritten in ",(0,r.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/api/functions/get-class-for-document"},(0,r.yg)("inlineCode",{parentName:"a"},"getModelForClass")),").")),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"Will throw a Error when caching is disabled ",(0,r.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/guides/error-warning-details#cache-disabled-e033"},"E033"),".")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"class SomeUser {}\n\nconst SomeUserModel = getModelForClass(SomeUser);\ndeleteModel('SomeUser');\n")),(0,r.yg)("h2",{id:"deletemodelwithclass"},"deleteModelWithClass"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Typings:")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"function deleteModelWithClass<U extends AnyParamConstructor<any>>(cl: U)\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Parameters:")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},(0,r.yg)("inlineCode",{parentName:"td"},"cl")," ",(0,r.yg)("span",{class:"badge badge--secondary"},"Required")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"U")),(0,r.yg)("td",{parentName:"tr",align:"left"},"The Class to remove from the Cache")))),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"deleteModelWithClass")," tries to find the given Class (",(0,r.yg)("inlineCode",{parentName:"p"},"cl"),") in the cache and calls ",(0,r.yg)("a",{parentName:"p",href:"#deletemodel"},(0,r.yg)("inlineCode",{parentName:"a"},"deleteModel"))," with the key the Class has given."),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"Will throw a Error when caching is disabled ",(0,r.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/guides/error-warning-details#cache-disabled-e033"},"E033"),".")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"class SomeUser {}\n\nconst SomeUserModel = getModelForClass(SomeUser);\ndeleteModelWithClass(SomeUser);\n")))}c.isMDXComponent=!0}}]);