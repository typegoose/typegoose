"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[8313],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return g}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),p=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(n),u=a,g=c["".concat(s,".").concat(u)]||c[u]||m[u]||r;return n?o.createElement(g,i(i({ref:t},d),{},{components:n})):o.createElement(g,i({ref:t},d))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8469:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return g},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return c}});var o=n(7462),a=n(3366),r=(n(7294),n(3905)),i=["components"],l={id:"add-model-to-typegoose",title:"addModelToTypegoose"},s=void 0,p={unversionedId:"api/functions/add-model-to-typegoose",id:"api/functions/add-model-to-typegoose",title:"addModelToTypegoose",description:"Typings:",source:"@site/../docs/api/functions/addModelToTypegoose.md",sourceDirName:"api/functions",slug:"/api/functions/add-model-to-typegoose",permalink:"/typegoose/versions/10.x/docs/api/functions/add-model-to-typegoose",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/old/10.x/docs/../docs/api/functions/addModelToTypegoose.md",tags:[],version:"current",frontMatter:{id:"add-model-to-typegoose",title:"addModelToTypegoose"},sidebar:"docs",previous:{title:"getDiscriminatorModelForClass",permalink:"/typegoose/versions/10.x/docs/api/functions/get-discriminator-model-for-class"},next:{title:"deleteModel*",permalink:"/typegoose/versions/10.x/docs/api/functions/delete-model"}},d={},c=[{value:"Example",id:"example",level:2}],m={toc:c},u="wrapper";function g(e){var t=e.components,n=(0,a.Z)(e,i);return(0,r.kt)(u,(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Typings:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"function addModelToTypegoose<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(\n  model: mongoose.Model<any>,\n  cl: U,\n  options?: { existingMongoose?: mongoose.Mongoose; existingConnection?: any }\n)\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Parameters:")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"model")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"mongoose.Model")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The Model to add to the Class mapping")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"cl")," ",(0,r.kt)("span",{class:"badge badge--secondary"},"Required")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"U")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The Class to add to the mapping")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"IModelOptions")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Overwrite which ",(0,r.kt)("inlineCode",{parentName:"td"},"existingMongoose")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"existingConnection")," the Class-Model mapping is on")))),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"addModelToTypegoose")," is used to add a the Class (",(0,r.kt)("inlineCode",{parentName:"p"},"cl"),") and Model (",(0,r.kt)("inlineCode",{parentName:"p"},"model"),") to the typegoose cache.",(0,r.kt)("br",{parentName:"p"}),"\n","This function also returns the input Model (",(0,r.kt)("inlineCode",{parentName:"p"},"model"),") with the typegoose typings."),(0,r.kt)("p",null,"This cache is used for functions like ","[",(0,r.kt)("inlineCode",{parentName:"p"},"getClass"),"]","(/typegoose/versions/10.x/docs/api/functions/get-class] to find a class by the name mapping.",(0,r.kt)("br",{parentName:"p"}),"\n","This function gets automatically called by functions like ",(0,r.kt)("a",{parentName:"p",href:"/typegoose/versions/10.x/docs/api/functions/get-model-for-class"},(0,r.kt)("inlineCode",{parentName:"a"},"getModelForClass"))," and ",(0,r.kt)("a",{parentName:"p",href:"/typegoose/versions/10.x/docs/api/functions/get-discriminator-model-for-class"},(0,r.kt)("inlineCode",{parentName:"a"},"getDiscriminatorModelForClass")),"."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"For a full example with ",(0,r.kt)("inlineCode",{parentName:"p"},"buildSchema")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"addModelToTypegoose")," see ",(0,r.kt)("a",{parentName:"p",href:"/typegoose/versions/10.x/docs/guides/advanced/manual-schema-modification"},"Manual Schema Modification"),".")),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"This function will basically not do much if Caching is disabled.",(0,r.kt)("br",{parentName:"p"}),"\n","It will still do checks that the passed model and class are valid.")),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class Kitten {\n  @prop()\n  public name?: string;\n}\n\nconst kittenSchema = buildSchema(Kitten);\nconst KittenModel = addModelToTypegoose(mongoose.model('Kitten', kittenSchema), Kitten);\n// \"KittenModel\" is now a valid Typegoose model\n")))}g.isMDXComponent=!0}}]);