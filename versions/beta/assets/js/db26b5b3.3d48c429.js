"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[5079],{5680:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>m});var o=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),p=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},g="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},y=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),g=p(n),y=a,m=g["".concat(s,".").concat(y)]||g[y]||c[y]||r;return n?o.createElement(m,i(i({ref:t},d),{},{components:n})):o.createElement(m,i({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=y;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[g]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}y.displayName="MDXCreateElement"},1493:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var o=n(8168),a=(n(6540),n(5680));const r={id:"add-model-to-typegoose",title:"addModelToTypegoose"},i=void 0,l={unversionedId:"api/functions/add-model-to-typegoose",id:"api/functions/add-model-to-typegoose",title:"addModelToTypegoose",description:"Typings:",source:"@site/../docs/api/functions/addModelToTypegoose.md",sourceDirName:"api/functions",slug:"/api/functions/add-model-to-typegoose",permalink:"/typegoose/versions/beta/docs/api/functions/add-model-to-typegoose",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/api/functions/addModelToTypegoose.md",tags:[],version:"current",frontMatter:{id:"add-model-to-typegoose",title:"addModelToTypegoose"},sidebar:"docs",previous:{title:"getDiscriminatorModelForClass",permalink:"/typegoose/versions/beta/docs/api/functions/get-discriminator-model-for-class"},next:{title:"deleteModel*",permalink:"/typegoose/versions/beta/docs/api/functions/delete-model"}},s={},p=[{value:"Example",id:"example",level:2}],d={toc:p},g="wrapper";function c(e){let{components:t,...n}=e;return(0,a.yg)(g,(0,o.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Typings:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"function addModelToTypegoose<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(\n  model: mongoose.Model<any>,\n  cl: U,\n  options?: { existingMongoose?: mongoose.Mongoose; existingConnection?: any }\n)\n")),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Parameters:")),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,a.yg)("th",{parentName:"tr",align:"center"},"Type"),(0,a.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"model")),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("inlineCode",{parentName:"td"},"mongoose.Model")),(0,a.yg)("td",{parentName:"tr",align:"left"},"The Model to add to the Class mapping")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"cl")," ",(0,a.yg)("span",{class:"badge badge--secondary"},"Required")),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("inlineCode",{parentName:"td"},"U")),(0,a.yg)("td",{parentName:"tr",align:"left"},"The Class to add to the mapping")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"options")),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("inlineCode",{parentName:"td"},"IModelOptions")),(0,a.yg)("td",{parentName:"tr",align:"left"},"Overwrite which ",(0,a.yg)("inlineCode",{parentName:"td"},"existingMongoose")," and ",(0,a.yg)("inlineCode",{parentName:"td"},"existingConnection")," the Class-Model mapping is on")))),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"addModelToTypegoose")," is used to add a the Class (",(0,a.yg)("inlineCode",{parentName:"p"},"cl"),") and Model (",(0,a.yg)("inlineCode",{parentName:"p"},"model"),") to the typegoose cache.",(0,a.yg)("br",{parentName:"p"}),"\n","This function also returns the input Model (",(0,a.yg)("inlineCode",{parentName:"p"},"model"),") with the typegoose typings."),(0,a.yg)("p",null,"This cache is used for functions like ","[",(0,a.yg)("inlineCode",{parentName:"p"},"getClass"),"]","(/typegoose/versions/beta/docs/api/functions/get-class] to find a class by the name mapping.",(0,a.yg)("br",{parentName:"p"}),"\n","This function gets automatically called by functions like ",(0,a.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/api/functions/get-model-for-class"},(0,a.yg)("inlineCode",{parentName:"a"},"getModelForClass"))," and ",(0,a.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/api/functions/get-discriminator-model-for-class"},(0,a.yg)("inlineCode",{parentName:"a"},"getDiscriminatorModelForClass")),"."),(0,a.yg)("admonition",{type:"tip"},(0,a.yg)("p",{parentName:"admonition"},"For a full example with ",(0,a.yg)("inlineCode",{parentName:"p"},"buildSchema")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"addModelToTypegoose")," see ",(0,a.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/guides/advanced/manual-schema-modification"},"Manual Schema Modification"),".")),(0,a.yg)("admonition",{type:"note"},(0,a.yg)("p",{parentName:"admonition"},"This function will basically not do much if Caching is disabled.",(0,a.yg)("br",{parentName:"p"}),"\n","It will still do checks that the passed model and class are valid.")),(0,a.yg)("h2",{id:"example"},"Example"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class Kitten {\n  @prop()\n  public name?: string;\n}\n\nconst kittenSchema = buildSchema(Kitten);\nconst KittenModel = addModelToTypegoose(mongoose.model('Kitten', kittenSchema), Kitten);\n// \"KittenModel\" is now a valid Typegoose model\n")))}c.isMDXComponent=!0}}]);