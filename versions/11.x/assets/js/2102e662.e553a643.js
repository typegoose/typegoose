"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[569],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return f}});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=o.createContext({}),c=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),l=c(r),m=n,f=l["".concat(s,".").concat(m)]||l[m]||d[m]||a;return r?o.createElement(f,i(i({ref:t},u),{},{components:r})):o.createElement(f,i({ref:t},u))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[l]="string"==typeof e?e:n,i[1]=p;for(var c=2;c<a;c++)i[c]=r[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6796:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return p},metadata:function(){return c},toc:function(){return l}});var o=r(7462),n=r(3366),a=(r(7294),r(3905)),i=["components"],p={id:"use-without-emitDecoratorMetadata",title:'Use Without "emitDecoratorMetadata"'},s=void 0,c={unversionedId:"guides/use-without-emitDecoratorMetadata",id:"guides/use-without-emitDecoratorMetadata",title:'Use Without "emitDecoratorMetadata"',description:"Typegoose can be used without the option emitDecoratorMetadata, but it is generally recommended to enable it for auto-inferring from the typescript type.",source:"@site/../docs/guides/use-without-emitDecoratorMetadata.md",sourceDirName:"guides",slug:"/guides/use-without-emitDecoratorMetadata",permalink:"/typegoose/versions/11.x/docs/guides/use-without-emitDecoratorMetadata",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/old/11.x/docs/../docs/guides/use-without-emitDecoratorMetadata.md",tags:[],version:"current",frontMatter:{id:"use-without-emitDecoratorMetadata",title:'Use Without "emitDecoratorMetadata"'},sidebar:"guides",previous:{title:"All Decorators",permalink:"/typegoose/versions/11.x/docs/guides/all-decorators"},next:{title:"Motivation",permalink:"/typegoose/versions/11.x/docs/guides/motivation"}},u={},l=[{value:"Advantages to &quot;emitDecoratorMetadata&quot;",id:"advantages-to-emitdecoratormetadata",level:2},{value:"References",id:"references",level:2}],d={toc:l},m="wrapper";function f(e){var t=e.components,r=(0,n.Z)(e,i);return(0,a.kt)(m,(0,o.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Typegoose can be used without the option ",(0,a.kt)("a",{parentName:"p",href:"https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata"},(0,a.kt)("inlineCode",{parentName:"a"},"emitDecoratorMetadata")),", but it is generally recommended to enable it for auto-inferring from the typescript type."),(0,a.kt)("h2",{id:"advantages-to-emitdecoratormetadata"},'Advantages to "emitDecoratorMetadata"'),(0,a.kt)("p",null,"When using ",(0,a.kt)("inlineCode",{parentName:"p"},"emitDecoratorMetadata"),", it is not needed to be explicit about ",(0,a.kt)("em",{parentName:"p"},"everything"),', like the following example would simply "compile" into the appropriate types.'),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Some properties (like Arrays & Maps) need to be always explicit, see ",(0,a.kt)("a",{parentName:"p",href:"/typegoose/versions/11.x/docs/api/decorators/prop#array-options"},(0,a.kt)("inlineCode",{parentName:"a"},"@prop")," Array Options"),".")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'class Kitten {\n  @prop({ required: true }) // Not needed to be explicit that this property is a "String"\n  public name!: string;\n\n  @prop({ type: () => [String], required: true })\n  public friendNames!: string[];\n\n  @prop({ type: () => Number, required: true })\n  public favoritePlacePriority!: Map<string, number>;\n}\n')),(0,a.kt)("p",null,"But when not using ",(0,a.kt)("inlineCode",{parentName:"p"},"emitDecoratorMetadata"),", every property needs to be explicitly defined:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'class Kitten {\n  @prop({ type: () => String, required: true }) // Needs to be explicitly defined, because "emitDecoratorMetadata" is not enabled\n  public name!: string;\n\n  @prop({ type: () => [String], required: true }, PropType.ARRAY)\n  public friendNames!: string[];\n\n  @prop({ type: () => Number, required: true }, PropType.MAP)\n  public favoritePlacePriority!: Map<string, number>;\n}\n')),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/typegoose/versions/11.x/docs/api/decorators/prop#proptype"},"Look here for what ",(0,a.kt)("inlineCode",{parentName:"a"},"PropType")," is")),(0,a.kt)("h2",{id:"references"},"References"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata"},"tsconfig option ",(0,a.kt)("inlineCode",{parentName:"a"},"emitDecoratorMetadata"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.typescriptlang.org/docs/handbook/decorators.html#metadata"},"Typescript explanation to decorators and Reflection"))))}f.isMDXComponent=!0}}]);