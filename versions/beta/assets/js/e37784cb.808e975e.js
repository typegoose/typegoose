"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[3418],{5680:(e,t,n)=>{n.d(t,{xA:()=>s,yg:()=>d});var r=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),y=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=y(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=y(n),g=i,d=u["".concat(l,".").concat(g)]||u[g]||c[g]||a;return n?r.createElement(d,o(o({ref:t},s),{},{components:n})):r.createElement(d,o({ref:t},s))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=g;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[u]="string"==typeof e?e:i,o[1]=p;for(var y=2;y<a;y++)o[y]=n[y];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},4817:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>p,toc:()=>y});var r=n(8168),i=(n(6540),n(5680));const a={id:"utility-types",title:"Utility Types"},o=void 0,p={unversionedId:"api/types/utility-types",id:"api/types/utility-types",title:"Utility Types",description:"This document documents various smaller utility types",source:"@site/../docs/api/types/utility-types.md",sourceDirName:"api/types",slug:"/api/types/utility-types",permalink:"/typegoose/versions/beta/docs/api/types/utility-types",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/api/types/utility-types.md",tags:[],version:"current",frontMatter:{id:"utility-types",title:"Utility Types"},sidebar:"docs",previous:{title:"Additional Types",permalink:"/typegoose/versions/beta/docs/api/types/additional-types"}},l={},y=[{value:"<code>FilterOutFunctionKeys&lt;T&gt;</code>",id:"filteroutfunctionkeyst",level:2}],s={toc:y},u="wrapper";function c(e){let{components:t,...n}=e;return(0,i.yg)(u,(0,r.A)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"This document documents various smaller utility types"),(0,i.yg)("h2",{id:"filteroutfunctionkeyst"},(0,i.yg)("inlineCode",{parentName:"h2"},"FilterOutFunctionKeys<T>")),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Typings:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-ts"},"type FilterOutFunctionKeys<T extends object> = Omit<T, GetFunctionKeys<T>>\n")),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Parameters:")),(0,i.yg)("table",null,(0,i.yg)("thead",{parentName:"table"},(0,i.yg)("tr",{parentName:"thead"},(0,i.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,i.yg)("th",{parentName:"tr",align:"center"},"Type"),(0,i.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.yg)("tbody",{parentName:"table"},(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:"left"},(0,i.yg)("inlineCode",{parentName:"td"},"T")," ",(0,i.yg)("span",{class:"badge badge--secondary"},"Required")),(0,i.yg)("td",{parentName:"tr",align:"center"},(0,i.yg)("inlineCode",{parentName:"td"},"object")),(0,i.yg)("td",{parentName:"tr",align:"left"},"The type to filter functions out of")))),(0,i.yg)("p",null,"The type ",(0,i.yg)("inlineCode",{parentName:"p"},"FilterOutFunctionKeys<T>")," can be used where function types need to be filtered-out, for example for ",(0,i.yg)("inlineCode",{parentName:"p"},"AnyBulkWriteOperation"),"."),(0,i.yg)("p",null,"Example:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-ts"},"class Kitten {\n  @prop()\n  public name?: string;\n\n  public getName() {\n    return this.name;\n  }\n}\n\ntype Normal = Pick<Kitten, typeof Kitten>;\n// type:\n// {\n//  name: string | undefined,\n//  getName: () => string\n// }\n\ntype Filtered = FilterOutFunctionKeys<Kitten>;\n// type:\n// {\n//   name: string | undefined\n// }\n")),(0,i.yg)("p",null,"This type ",(0,i.yg)("em",{parentName:"p"},"may")," be used in the future for ",(0,i.yg)("inlineCode",{parentName:"p"},"DocumentType"),"."))}c.isMDXComponent=!0}}]);