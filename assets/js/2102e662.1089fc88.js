"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[569],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),c=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=c(r),m=n,f=d["".concat(s,".").concat(m)]||d[m]||l[m]||o;return r?a.createElement(f,i(i({ref:t},u),{},{components:r})):a.createElement(f,i({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:n,i[1]=p;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6796:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return p},contentTitle:function(){return s},metadata:function(){return c},assets:function(){return u},toc:function(){return l},default:function(){return m}});var a=r(7462),n=r(3366),o=(r(7294),r(3905)),i=["components"],p={id:"use-without-emitDecoratorMetadata",title:'Use Without "emitDecoratorMetadata"'},s=void 0,c={unversionedId:"guides/use-without-emitDecoratorMetadata",id:"guides/use-without-emitDecoratorMetadata",title:'Use Without "emitDecoratorMetadata"',description:"Typegoose can be used without the option emitDecoratorMetadata, but it is generally recommeneded to enable it for auto-inferring from the typescript type.",source:"@site/../docs/guides/use-without-emitDecoratorMetadata.md",sourceDirName:"guides",slug:"/guides/use-without-emitDecoratorMetadata",permalink:"/typegoose/docs/guides/use-without-emitDecoratorMetadata",editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/use-without-emitDecoratorMetadata.md",tags:[],version:"current",frontMatter:{id:"use-without-emitDecoratorMetadata",title:'Use Without "emitDecoratorMetadata"'},sidebar:"guides",previous:{title:"All Decorators",permalink:"/typegoose/docs/guides/all-decorators"},next:{title:"Motivation",permalink:"/typegoose/docs/guides/motivation"}},u={},l=[{value:"Advantages to &quot;emitDecoratorMetadata&quot;",id:"advantages-to-emitdecoratormetadata",level:2},{value:"References",id:"references",level:2}],d={toc:l};function m(e){var t=e.components,r=(0,n.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Typegoose can be used without the option ",(0,o.kt)("a",{parentName:"p",href:"https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata"},(0,o.kt)("inlineCode",{parentName:"a"},"emitDecoratorMetadata")),", but it is generally recommeneded to enable it for auto-inferring from the typescript type."),(0,o.kt)("h2",{id:"advantages-to-emitdecoratormetadata"},'Advantages to "emitDecoratorMetadata"'),(0,o.kt)("p",null,"When using ",(0,o.kt)("inlineCode",{parentName:"p"},"emitDecoratorMetadata"),", it is not needed to be explicit about ",(0,o.kt)("em",{parentName:"p"},"everything"),', like the following example would simply "compile" into the appropiate types.'),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Some Properties (like Arrays & Maps) need to be always explicit, see ",(0,o.kt)("a",{parentName:"p",href:"/typegoose/docs/api/decorators/prop#array-options"},(0,o.kt)("inlineCode",{parentName:"a"},"@prop")," Array Options"),"."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'class Kitten {\n  @prop({ required: true }) // Not needed to be explicit that this property is a "String"\n  public name!: string;\n\n  @prop({ type: () => [String], required: true })\n  public friendNames!: string[];\n\n  @prop({ type: () => Number, required: true })\n  public favoritePlacePriority!: Map<string, number>;\n}\n')),(0,o.kt)("p",null,"But when not using ",(0,o.kt)("inlineCode",{parentName:"p"},"emitDecoratorMetadata"),", every property needs to be explicitly defined:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'class Kitten {\n  @prop({ type: () => String, required: true }) // Needs to be explicitly defined, because "emitDecoratorMetadata" is not enabled\n  public name!: string;\n\n  @prop({ type: () => [String], required: true }, PropType.ARRAY)\n  public friendNames!: string[];\n\n  @prop({ type: () => Number, required: true }, PropType.MAP)\n  public favoritePlacePriority!: Map<string, number>;\n}\n')),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/typegoose/docs/api/decorators/prop#proptype"},"Look here for what ",(0,o.kt)("inlineCode",{parentName:"a"},"PropType")," is")),(0,o.kt)("h2",{id:"references"},"References"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata"},"tsconfig option ",(0,o.kt)("inlineCode",{parentName:"a"},"emitDecoratorMetadata"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.typescriptlang.org/docs/handbook/decorators.html#metadata"},"Typescript explanation to decorators and Reflection"))))}m.isMDXComponent=!0}}]);