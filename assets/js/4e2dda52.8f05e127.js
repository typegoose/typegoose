"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[6920],{5680:(e,t,r)=>{r.d(t,{xA:()=>l,yg:()=>m});var o=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},s=Object.keys(e);for(o=0;o<s.length;o++)r=s[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)r=s[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=o.createContext({}),c=function(e){var t=o.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},l=function(e){var t=c(e.components);return o.createElement(p.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,s=e.originalType,p=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=c(r),d=n,m=u["".concat(p,".").concat(d)]||u[d]||y[d]||s;return r?o.createElement(m,a(a({ref:t},l),{},{components:r})):o.createElement(m,a({ref:t},l))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=r.length,a=new Array(s);a[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:n,a[1]=i;for(var c=2;c<s;c++)a[c]=r[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2452:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>y,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var o=r(8168),n=(r(6540),r(5680));const s={id:"custom-types",title:"Custom Types"},a=void 0,i={unversionedId:"guides/advanced/custom-types",id:"guides/advanced/custom-types",title:"Custom Types",description:"A Custom Type needs to have the following properties for Typegoose to work:",source:"@site/../docs/guides/advanced/custom-types.md",sourceDirName:"guides/advanced",slug:"/guides/advanced/custom-types",permalink:"/typegoose/docs/guides/advanced/custom-types",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/advanced/custom-types.md",tags:[],version:"current",frontMatter:{id:"custom-types",title:"Custom Types"},sidebar:"guides",previous:{title:"Nesting Classes",permalink:"/typegoose/docs/guides/nesting-classes"},next:{title:"Array Types & Fields",permalink:"/typegoose/docs/guides/advanced/array-types"}},p={},c=[],l={toc:c},u="wrapper";function y(e){let{components:t,...r}=e;return(0,n.yg)(u,(0,o.A)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,"A Custom Type needs to have the following properties for Typegoose to work:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"name"),": to show what the type is"),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"prototype.OptionsConstructor"),": to know where options are mapped to"),(0,n.yg)("li",{parentName:"ul"},"inherit / extend ",(0,n.yg)("inlineCode",{parentName:"li"},"mongoose.SchemaType"))),(0,n.yg)("p",null,"Please look at ",(0,n.yg)("a",{parentName:"p",href:"https://mongoosejs.com/docs/customschematypes.html"},"Mongoose's Documentation")," on how to create and register a custom type."))}y.isMDXComponent=!0}}]);