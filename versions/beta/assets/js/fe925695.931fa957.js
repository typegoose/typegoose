"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[8902],{5680:(e,t,r)=>{r.d(t,{xA:()=>l,yg:()=>g});var a=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var y=a.createContext({}),p=function(e){var t=a.useContext(y),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=p(e.components);return a.createElement(y.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,y=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=p(r),c=n,g=d["".concat(y,".").concat(c)]||d[c]||u[c]||o;return r?a.createElement(g,s(s({ref:t},l),{},{components:r})):a.createElement(g,s({ref:t},l))}));function g(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=c;var i={};for(var y in t)hasOwnProperty.call(t,y)&&(i[y]=t[y]);i.originalType=e,i[d]="string"==typeof e?e:n,s[1]=i;for(var p=2;p<o;p++)s[p]=r[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},8158:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>y,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var a=r(8168),n=(r(6540),r(5680));const o={id:"array-types",title:"Array Types & Fields"},s=void 0,i={unversionedId:"guides/advanced/array-types",id:"guides/advanced/array-types",title:"Array Types & Fields",description:"Array types & Fields",source:"@site/../docs/guides/advanced/array-types.md",sourceDirName:"guides/advanced",slug:"/guides/advanced/array-types",permalink:"/typegoose/versions/beta/docs/guides/advanced/array-types",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/guides/advanced/array-types.md",tags:[],version:"current",frontMatter:{id:"array-types",title:"Array Types & Fields"},sidebar:"guides",previous:{title:"Custom Types",permalink:"/typegoose/versions/beta/docs/guides/advanced/custom-types"},next:{title:"Models with same name",permalink:"/typegoose/versions/beta/docs/guides/advanced/models-with-same-name"}},y={},p=[{value:"Array types &amp; Fields",id:"array-types--fields",level:2},{value:"Why is the long type needed?",id:"why-is-the-long-type-needed",level:2},{value:"Why is the <code>type</code> option always required?",id:"why-is-the-type-option-always-required",level:2}],l={toc:p},d="wrapper";function u(e){let{components:t,...r}=e;return(0,n.yg)(d,(0,a.A)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h2",{id:"array-types--fields"},"Array types & Fields"),(0,n.yg)("p",null,"It is much easier to declare the array field's type as ",(0,n.yg)("inlineCode",{parentName:"p"},"type[]")," instead of ",(0,n.yg)("inlineCode",{parentName:"p"},"Array<type>"),"."),(0,n.yg)("p",null,"But in some cases, Typescript could give you a warning, when you would like to use ","any mongoose array methods"," "," on the array field.\nTo avoid such behavior, you could always declare the array field via ",(0,n.yg)("inlineCode",{parentName:"p"},"mongoose.Types.Array<type>")," or ",(0,n.yg)("inlineCode",{parentName:"p"},"mongoose.Schema.Types.Array<type>")),(0,n.yg)("p",null,"Example:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-ts"},"class ModelClass {\n  // required field, with empty array by default.\n  @prop({ type: String, required: true, default: [] })\n  public field!: mongoose.Types.Array<string>;\n}\n")),(0,n.yg)("h2",{id:"why-is-the-long-type-needed"},"Why is the long type needed?"),(0,n.yg)("p",null,"Mainly, because mongoose documents and their arrays fields have their pre-build methods, which slightly differ from ",(0,n.yg)("inlineCode",{parentName:"p"},"Array.method.prototype"),". But at runtime, these methods already exist (because an array is always an mongoose array). So, using ",(0,n.yg)("inlineCode",{parentName:"p"},"type[]")," is just more convenient way to write a shorter type instead of the ",(0,n.yg)("inlineCode",{parentName:"p"},"mongoose.Types")," if the functions are not used."),(0,n.yg)("p",null,"For more information you could look at ",(0,n.yg)("a",{parentName:"p",href:"https://github.com/typegoose/typegoose/issues/509"},"GitHub issue #509"),"."),(0,n.yg)("h2",{id:"why-is-the-type-option-always-required"},"Why is the ",(0,n.yg)("inlineCode",{parentName:"h2"},"type")," option always required?"),(0,n.yg)("p",null,"Because ",(0,n.yg)("a",{parentName:"p",href:"https://www.typescriptlang.org/docs/handbook/decorators.html#metadata"},"Reflection"),' currently does not give out detailed information, it only "dumbs down" the type to ',(0,n.yg)("inlineCode",{parentName:"p"},"Array"),", see ",(0,n.yg)("a",{parentName:"p",href:"https://github.com/typegoose/typegoose/issues/300"},"typescript issue #300")," for more."))}u.isMDXComponent=!0}}]);