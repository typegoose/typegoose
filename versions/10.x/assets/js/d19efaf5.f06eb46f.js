"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[2816],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=o,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||a;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6942:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return d}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={id:"get-model-for-class",title:"getModelForClass"},s=void 0,p={unversionedId:"api/functions/get-model-for-class",id:"api/functions/get-model-for-class",title:"getModelForClass",description:"Typings:",source:"@site/../docs/api/functions/getModelForClass.md",sourceDirName:"api/functions",slug:"/api/functions/get-model-for-class",permalink:"/typegoose/versions/10.x/docs/api/functions/get-model-for-class",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/old/10.x/docs/../docs/api/functions/getModelForClass.md",tags:[],version:"current",frontMatter:{id:"get-model-for-class",title:"getModelForClass"},sidebar:"docs",previous:{title:"@queryMethod",permalink:"/typegoose/versions/10.x/docs/api/decorators/query-method"},next:{title:"getClassForDocument",permalink:"/typegoose/versions/10.x/docs/api/functions/get-class-for-document"}},c={},d=[{value:"Example",id:"example",level:2}],u={toc:d},m="wrapper";function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)(m,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Typings:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"function getModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(cl: U, options?: IModelOptions)\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Parameters:")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"cl")," ",(0,a.kt)("span",{class:"badge badge--secondary"},"Required")),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},"U")),(0,a.kt)("td",{parentName:"tr",align:"left"},"The Class to build a Model from")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"options")),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},"IModelOptions")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Overwrite some Model options, only property ",(0,a.kt)("inlineCode",{parentName:"td"},"schemaOptions")," is merged with the existing options")))),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"getModelForClass")," compiled a given Class (",(0,a.kt)("inlineCode",{parentName:"p"},"cl"),") into a ",(0,a.kt)("inlineCode",{parentName:"p"},"mongoose.Model"),", this function will return the existing model if a model of the same name has already been created and cached with ",(0,a.kt)("a",{parentName:"p",href:"/typegoose/versions/10.x/docs/api/functions/add-model-to-typegoose"},(0,a.kt)("inlineCode",{parentName:"a"},"addModelToTypegoose")),"."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/typegoose/versions/10.x/docs/api/decorators/model-options#imodeloptions"},"All options for ",(0,a.kt)("inlineCode",{parentName:"a"},"options"),".")),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"class Kitten {\n  @prop()\n  public name?: string;\n}\n\nconst KittenModel = getModelForClass(Kitten);\n")))}f.isMDXComponent=!0}}]);