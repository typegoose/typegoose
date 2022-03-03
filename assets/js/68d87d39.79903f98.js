"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[2974],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return u}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),u=o,g=d["".concat(l,".").concat(u)]||d[u]||m[u]||i;return n?r.createElement(g,a(a({ref:t},c),{},{components:n})):r.createElement(g,a({ref:t},c))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1310:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},assets:function(){return c},toc:function(){return m},default:function(){return u}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],s={id:"migrate-7",title:"Migrate to 7.0.0"},l=void 0,p={unversionedId:"guides/migration/migrate-7",id:"guides/migration/migrate-7",title:"Migrate to 7.0.0",description:"These are the changes made for 7.0.0 that are breaking or just important to know",source:"@site/../docs/guides/migration/migrate-7.md",sourceDirName:"guides/migration",slug:"/guides/migration/migrate-7",permalink:"/typegoose/docs/guides/migration/migrate-7",editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/migration/migrate-7.md",tags:[],version:"current",frontMatter:{id:"migrate-7",title:"Migrate to 7.0.0"},sidebar:"guides",previous:{title:"Migrate to 8.0.0",permalink:"/typegoose/docs/guides/migration/migrate-8"},next:{title:"Migrate to 6.0.0",permalink:"/typegoose/docs/guides/migration/migrate-6"}},c={},m=[{value:"Requirements changed",id:"requirements-changed",level:2},{value:"Deprecation removals",id:"deprecation-removals",level:2},{value:"arrayProp options removed",id:"arrayprop-options-removed",level:3},{value:"Typegoose class got removed",id:"typegoose-class-got-removed",level:3},{value:"IC all remaining cache-maps got moved to reflection",id:"ic-all-remaining-cache-maps-got-moved-to-reflection",level:2},{value:"IC almost all &quot;if-throw&quot; blocks got replaced with &quot;assertion&quot; functions",id:"ic-almost-all-if-throw-blocks-got-replaced-with-assertion-functions",level:2},{value:"IC The Testing Framework for Typegoose changed to Jest",id:"ic-the-testing-framework-for-typegoose-changed-to-jest",level:2}],d={toc:m};function u(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"These are the changes made for 7.0.0 that are breaking or just important to know"),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Important, Read this first")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This Guide is written for migration from version ",(0,i.kt)("inlineCode",{parentName:"p"},"6.5.0")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"7.0.0"),", for versions ",(0,i.kt)("inlineCode",{parentName:"p"},">7.0.0 <8.0.0"),", please consult the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md"},"CHANGELOG")))),(0,i.kt)("h2",{id:"requirements-changed"},"Requirements changed"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Nodejs 8 & 9 are now unsupported, lowest supported version is now ",(0,i.kt)("inlineCode",{parentName:"li"},"10.15")),(0,i.kt)("li",{parentName:"ul"},"Typescript ",(0,i.kt)("inlineCode",{parentName:"li"},"3.8")," is now required (",(0,i.kt)("inlineCode",{parentName:"li"},"4.9")," is recommended)"),(0,i.kt)("li",{parentName:"ul"},"Mongoose ",(0,i.kt)("inlineCode",{parentName:"li"},"5.9.10")," or higher is now required")),(0,i.kt)("h2",{id:"deprecation-removals"},"Deprecation removals"),(0,i.kt)("h3",{id:"arrayprop-options-removed"},"arrayProp options removed"),(0,i.kt)("p",null,"The following options got removed:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"itemsRef")," got replaced with just ",(0,i.kt)("inlineCode",{parentName:"li"},"ref")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"itemsRefPath")," got replaced with just ",(0,i.kt)("inlineCode",{parentName:"li"},"refPath")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"itemsRefType")," got replaced with just ",(0,i.kt)("inlineCode",{parentName:"li"},"refType"))),(0,i.kt)("h3",{id:"typegoose-class-got-removed"},"Typegoose class got removed"),(0,i.kt)("p",null,"In 6.0.0 it was announced that the ",(0,i.kt)("inlineCode",{parentName:"p"},"Typegoose")," class was useless and will be removed in a future version. Now, in 7.0.0, it was completely removed."),(0,i.kt)("h2",{id:"ic-all-remaining-cache-maps-got-moved-to-reflection"},"[IC]"," all remaining cache-maps got moved to reflection"),(0,i.kt)("p",null,"All possible cache-maps that were in ",(0,i.kt)("inlineCode",{parentName:"p"},"data.ts")," were refactored to be in the reflection of the class."),(0,i.kt)("h2",{id:"ic-almost-all-if-throw-blocks-got-replaced-with-assertion-functions"},"[IC]",' almost all "if-throw" blocks got replaced with "assertion" functions'),(0,i.kt)("p",null,"Typescript 3.7 introduced a new type-keyword ",(0,i.kt)("a",{parentName:"p",href:"https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/#assertion-functions"},(0,i.kt)("inlineCode",{parentName:"a"},"asserts"))," and now almost every occurence has been replaced with a custom assertion function."),(0,i.kt)("h2",{id:"ic-the-testing-framework-for-typegoose-changed-to-jest"},"[IC]"," The Testing Framework for Typegoose changed to Jest"),(0,i.kt)("p",null,"For Typegoose 7.0.0, the Testing Framework change from ",(0,i.kt)("inlineCode",{parentName:"p"},"mocha + chai")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"jest")),(0,i.kt)("hr",null),(0,i.kt)("sub",null,"*`IC` means `Internal Change`*"))}u.isMDXComponent=!0}}]);