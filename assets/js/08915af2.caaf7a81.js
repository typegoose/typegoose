"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[3083],{5680:(t,e,n)=>{n.d(e,{xA:()=>o,yg:()=>N});var a=n(6540);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function y(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),i=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):g(g({},e),t)),n},o=function(t){var e=i(t.components);return a.createElement(p.Provider,{value:e},t.children)},m="mdxType",d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},u=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,o=y(t,["components","mdxType","originalType","parentName"]),m=i(n),u=r,N=m["".concat(p,".").concat(u)]||m[u]||d[u]||l;return n?a.createElement(N,g(g({ref:e},o),{},{components:n})):a.createElement(N,g({ref:e},o))}));function N(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,g=new Array(l);g[0]=u;var y={};for(var p in e)hasOwnProperty.call(e,p)&&(y[p]=e[p]);y.originalType=t,y[m]="string"==typeof t?t:r,g[1]=y;for(var i=2;i<l;i++)g[i]=n[i];return a.createElement.apply(null,g)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4074:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>p,contentTitle:()=>g,default:()=>d,frontMatter:()=>l,metadata:()=>y,toc:()=>i});var a=n(8168),r=(n(6540),n(5680));const l={id:"mongoose-compatibility",title:"Mongoose Compatibility"},g=void 0,y={unversionedId:"guides/mongoose-compatibility",id:"guides/mongoose-compatibility",title:"Mongoose Compatibility",description:"The version values use npm's semver convention.",source:"@site/../docs/guides/mongoose-compatibility.md",sourceDirName:"guides",slug:"/guides/mongoose-compatibility",permalink:"/typegoose/docs/guides/mongoose-compatibility",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/mongoose-compatibility.md",tags:[],version:"current",frontMatter:{id:"mongoose-compatibility",title:"Mongoose Compatibility"},sidebar:"guides",previous:{title:"Known Issues",permalink:"/typegoose/docs/guides/known-issues"},next:{title:"Deprecation Codes",permalink:"/typegoose/docs/guides/deprecation-codes"}},p={},i=[],o={toc:i},m="wrapper";function d(t){let{components:e,...n}=t;return(0,r.yg)(m,(0,a.A)({},o,n,{components:e,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"The version values use ",(0,r.yg)("a",{parentName:"p",href:"https://www.npmjs.com/package/semver"},"npm's semver convention"),"."),(0,r.yg)("p",null,"If no upper mongoose version is defined and a newer typegoose version exists within the range of the lower typegoose version, take the next typegoose versions start point as the upper range (exclusive) for the lower typegoose version, this is because mongoose may break something (like types) even in patch versions."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Typegoose Version"),(0,r.yg)("th",{parentName:"tr",align:null},"Mongoose Version"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.10.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.9.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.9.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.8.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.8.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.7.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.7.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.6.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.6.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.5.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.5.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.4.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.4.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.3.1")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.3.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.2.4")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.2.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.2.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.1.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.1.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"12.0.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~8.0.1")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"11.8.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~7.8.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"11.7.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~7.6.3")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"11.6.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~7.6.1")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"11.5.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~7.5.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"11.4.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~7.4.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"11.3.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~7.3.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"11.2.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~7.2.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"11.1.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~7.1.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"11.0.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~7.0.3")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"10.5.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.12.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"10.4.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.11.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"10.3.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.10.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"10.2.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.10.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"10.1.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.9.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"10.0.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.8.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.13.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.7.2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.12.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.6.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.11.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.5.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.10.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.4.2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.9.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.3.5")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.8.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.3.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.7.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.2.3")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.6.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.2.0")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.5.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.1.6")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.4.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.1.3")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.3.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.0.14")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.2.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.0.11")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.1.x"),(0,r.yg)("td",{parentName:"tr",align:null},"6.0.9 - 6.0.10")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"9.0.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~6.0.7")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"8.2.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.13.8")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"8.1.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.13.3")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"8.0.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.13.3")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"7.6.x"),(0,r.yg)("td",{parentName:"tr",align:null},"5.10.0 - 5.10.18")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"7.5.x"),(0,r.yg)("td",{parentName:"tr",align:null},"5.10.0 - 5.10.18")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"7.4.x"),(0,r.yg)("td",{parentName:"tr",align:null},"5.10.0 - 5.10.18")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"7.3.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.9.22")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"7.2.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.9.17")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"7.1.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.9.14")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"7.0.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.9.9")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"6.4.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.9.2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"6.3.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.8.11")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"6.2.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.8.3")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"6.1.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.7.7")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"6.0.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.7.1")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"5.9.x"),(0,r.yg)("td",{parentName:"tr",align:null},"~5.6.7")))))}d.isMDXComponent=!0}}]);