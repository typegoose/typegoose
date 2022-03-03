"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[7150],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),s=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=s(e.components);return o.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=s(n),m=r,f=u["".concat(c,".").concat(m)]||u[m]||p[m]||l;return n?o.createElement(f,a(a({ref:t},d),{},{components:n})):o.createElement(f,a({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,a=new Array(l);a[0]=u;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,a[1]=i;for(var s=2;s<l;s++)a[s]=n[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6315:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return s},assets:function(){return d},toc:function(){return p},default:function(){return m}});var o=n(7462),r=n(3366),l=(n(7294),n(3905)),a=["components"],i={id:"delete-model",title:"buildSchema"},c=void 0,s={unversionedId:"api/functions/delete-model",id:"api/functions/delete-model",title:"buildSchema",description:"deleteModel",source:"@site/../docs/api/functions/deleteModel.md",sourceDirName:"api/functions",slug:"/api/functions/delete-model",permalink:"/typegoose/docs/api/functions/delete-model",editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/api/functions/deleteModel.md",tags:[],version:"current",frontMatter:{id:"delete-model",title:"buildSchema"},sidebar:"docs",previous:{title:"addModelToTypegoose",permalink:"/typegoose/docs/api/functions/add-model-to-typegoose"},next:{title:"setGlobalOptions",permalink:"/typegoose/docs/api/functions/set-global-options"}},d={},p=[{value:"deleteModel",id:"deletemodel",level:2},{value:"deleteModelWithClass",id:"deletemodelwithclass",level:2}],u={toc:p};function m(e){var t=e.components,n=(0,r.Z)(e,a);return(0,l.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"deletemodel"},"deleteModel"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"deleteModel(name: string)"),": Delete models from the typegoose cache & call ",(0,l.kt)("inlineCode",{parentName:"p"},"mongoose.connection.deleteModel"),"."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"class SomeUser {}\n\nconst SomeUserModel = getModelForClass(SomeUser);\ndeleteModel('SomeUser');\n")),(0,l.kt)("h2",{id:"deletemodelwithclass"},"deleteModelWithClass"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"deleteModelWithClass(cl: NewableFunction)"),": Find the name of the model and call ",(0,l.kt)("a",{parentName:"p",href:"#deletemodel"},(0,l.kt)("inlineCode",{parentName:"a"},"deleteModel"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"class SomeUser {}\n\nconst SomeUserModel = getModelForClass(SomeUser);\ndeleteModelWithClass(SomeUser);\n")))}m.isMDXComponent=!0}}]);