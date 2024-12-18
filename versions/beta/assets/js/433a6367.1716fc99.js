"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[6928],{5680:(e,n,t)=>{t.d(n,{xA:()=>d,yg:()=>g});var a=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=a.createContext({}),u=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=u(e.components);return a.createElement(s.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},p=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=u(t),p=o,g=c["".concat(s,".").concat(p)]||c[p]||m[p]||r;return t?a.createElement(g,l(l({ref:n},d),{},{components:t})):a.createElement(g,l({ref:n},d))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,l=new Array(r);l[0]=p;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[c]="string"==typeof e?e:o,l[1]=i;for(var u=2;u<r;u++)l[u]=t[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},9365:(e,n,t)=>{t.d(n,{A:()=>l});var a=t(6540),o=t(53);const r={tabItem:"tabItem_Ymn6"};function l(e){let{children:n,hidden:t,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.A)(r.tabItem,l),hidden:t},n)}},1470:(e,n,t)=>{t.d(n,{A:()=>M});var a=t(8168),o=t(6540),r=t(53),l=t(3104),i=t(6347),s=t(7485),u=t(1682),d=t(9466);function c(e){return function(e){var n,t;return null!=(n=null==(t=o.Children.map(e,(e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:t.filter(Boolean))?n:[]}(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:o}}=e;return{value:n,label:t,attributes:a,default:o}}))}function m(e){const{values:n,children:t}=e;return(0,o.useMemo)((()=>{const e=null!=n?n:c(t);return function(e){const n=(0,u.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error('Docusaurus error: Duplicate values "'+n.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const a=(0,i.W6)(),r=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=t?t:null}({queryString:n,groupId:t});return[(0,s.aZ)(r),(0,o.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(a.location.search);n.set(r,e),a.replace({...a.location,search:n.toString()})}),[r,a])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,r=m(e),[l,i]=(0,o.useState)((()=>function(e){var n;let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:a}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+t+'" but none of its children has the corresponding value. Available values are: '+a.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return t}const o=null!=(n=a.find((e=>e.default)))?n:a[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:n,tabValues:r}))),[s,u]=g({queryString:t,groupId:a}),[c,f]=function(e){let{groupId:n}=e;const t=function(e){return e?"docusaurus.tab."+e:null}(n),[a,r]=(0,d.Dv)(t);return[a,(0,o.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:a}),y=(()=>{const e=null!=s?s:c;return p({value:e,tabValues:r})?e:null})();(0,o.useLayoutEffect)((()=>{y&&i(y)}),[y]);return{selectedValue:l,selectValue:(0,o.useCallback)((e=>{if(!p({value:e,tabValues:r}))throw new Error("Can't select invalid tab value="+e);i(e),u(e),f(e)}),[u,f,r]),tabValues:r}}var y=t(2303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function h(e){let{className:n,block:t,selectedValue:i,selectValue:s,tabValues:u}=e;const d=[],{blockElementScrollPositionUntilNextRender:c}=(0,l.a_)(),m=e=>{const n=e.currentTarget,t=d.indexOf(n),a=u[t].value;a!==i&&(c(n),s(a))},p=e=>{var n;let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{var a;const n=d.indexOf(e.currentTarget)+1;t=null!=(a=d[n])?a:d[0];break}case"ArrowLeft":{var o;const n=d.indexOf(e.currentTarget)-1;t=null!=(o=d[n])?o:d[d.length-1];break}}null==(n=t)||n.focus()};return o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":t},n)},u.map((e=>{let{value:n,label:t,attributes:l}=e;return o.createElement("li",(0,a.A)({role:"tab",tabIndex:i===n?0:-1,"aria-selected":i===n,key:n,ref:e=>d.push(e),onKeyDown:p,onClick:m},l,{className:(0,r.A)("tabs__item",b.tabItem,null==l?void 0:l.className,{"tabs__item--active":i===n})}),null!=t?t:n)})))}function A(e){let{lazy:n,children:t,selectedValue:a}=e;const r=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=r.find((e=>e.props.value===a));return e?(0,o.cloneElement)(e,{className:"margin-top--md"}):null}return o.createElement("div",{className:"margin-top--md"},r.map(((e,n)=>(0,o.cloneElement)(e,{key:n,hidden:e.props.value!==a}))))}function C(e){const n=f(e);return o.createElement("div",{className:(0,r.A)("tabs-container",b.tabList)},o.createElement(h,(0,a.A)({},e,n)),o.createElement(A,(0,a.A)({},e,n)))}function M(e){const n=(0,y.A)();return o.createElement(C,(0,a.A)({key:String(n)},e))}},3010:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>g,frontMatter:()=>i,metadata:()=>u,toc:()=>c});var a=t(8168),o=(t(6540),t(5680)),r=t(1470),l=t(9365);const i={id:"non-nested-discriminators",title:"Non-Nested Discriminators"},s=void 0,u={unversionedId:"guides/advanced/non-nested-discriminators",id:"guides/advanced/non-nested-discriminators",title:"Non-Nested Discriminators",description:"Use-Case",source:"@site/../docs/guides/advanced/non-nested-discriminators.mdx",sourceDirName:"guides/advanced",slug:"/guides/advanced/non-nested-discriminators",permalink:"/typegoose/versions/beta/docs/guides/advanced/non-nested-discriminators",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/guides/advanced/non-nested-discriminators.mdx",tags:[],version:"current",frontMatter:{id:"non-nested-discriminators",title:"Non-Nested Discriminators"},sidebar:"guides",previous:{title:"Using ObjectId Type",permalink:"/typegoose/versions/beta/docs/guides/advanced/using-objectid-type"},next:{title:"Nested Discriminators",permalink:"/typegoose/versions/beta/docs/guides/advanced/nested-discriminators"}},d={},c=[{value:"Use-Case",id:"use-case",level:2},{value:"First thought",id:"first-thought",level:2},{value:"Fixing it with Discriminators",id:"fixing-it-with-discriminators",level:2},{value:"Query with Shared Parent Model",id:"query-with-shared-parent-model",level:2},{value:"Extras",id:"extras",level:2},{value:"Extra Notes",id:"extra-notes",level:2},{value:"<code>strictQuery</code>",id:"strictquery",level:3}],m={toc:c},p="wrapper";function g(e){let{components:n,...t}=e;return(0,o.yg)(p,(0,a.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h2",{id:"use-case"},"Use-Case"),(0,o.yg)("p",null,"If you don't know an use case for this, consider the following:",(0,o.yg)("br",{parentName:"p"}),"\n","A Veterinarian that wants to store information about the current patients in their care, how would it be done in mongoose / typegoose?"),(0,o.yg)("h2",{id:"first-thought"},"First thought"),(0,o.yg)("p",null,"At first you might think to do the following:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'// to have an shared collection\n@modelOptions({ schemaOptions: { collection: "animal" } })\nclass Animal {\n  @prop({ required: true, unique: true })\n  public patientNumber!: number;\n}\n\nclass Dog extends Animal {\n  @prop()\n  public cageNumber!: number;\n}\n\nclass Cat extends Animal {\n  @prop()\n  public nameTag!: string;\n}\n\nclass Parrot extends Animal {\n  @prop()\n  public commonMessage?: string;\n}\n\nconst AnimalModel = getModelForClass(Animal);\nconst DogModel = getModelForClass(Dog);\nconst CatModel = getModelForClass(Cat);\nconst ParrotModel = getModelForClass(Parrot);\n')),(0,o.yg)("p",null,"And then in some querying code:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'await CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });\nawait DogModel.create({ patientNumber: 1, cageNumber: 1 });\n\n// for this example its a "findOne" to lower the example code\nconst found = await ParrotModel.findOne({}).exec();\n\n// this will "find" should log one of the 2 created above\nconsole.log("found", found);\n')),(0,o.yg)("p",null,"Which is obviously not what is wanted, there would be ways to test for what document is what, but there is an easier way: Discriminators."),(0,o.yg)("h2",{id:"fixing-it-with-discriminators"},"Fixing it with Discriminators"),(0,o.yg)("p",null,"The code from ",(0,o.yg)("a",{parentName:"p",href:"#first-thought"},"First thought")," is actually not so far off of what discriminators will need:"),(0,o.yg)(r.A,{groupId:"diff-full",mdxType:"Tabs"},(0,o.yg)(l.A,{value:"diff",label:"Difference",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},"const AnimalModel = getModelForClass(Animal);\n- const DogModel = getModelForClass(Dog);\n- const CatModel = getModelForClass(Cat);\n- const ParrotModel = getModelForClass(Parrot);\n+ const DogModel = getDiscriminatorModelForClass(AnimalModel, Dog);\n+ const CatModel = getDiscriminatorModelForClass(AnimalModel, Cat);\n+ const ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot);\n"))),(0,o.yg)(l.A,{value:"fullcode",label:"Full Code",default:!0,mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'@modelOptions({ schemaOptions: { collection: "animal" } })\nclass Animal {\n  @prop({ required: true, unique: true })\n  public patientNumber!: number;\n}\n\nclass Dog extends Animal {\n  @prop()\n  public cageNumber!: number;\n}\n\nclass Cat extends Animal {\n  @prop()\n  public nameTag!: string;\n}\n\nclass Parrot extends Animal {\n  @prop()\n  public commonMessage?: string;\n}\n\nconst AnimalModel = getModelForClass(Animal);\n// difference is below here\nconst DogModel = getDiscriminatorModelForClass(AnimalModel, Dog);\nconst CatModel = getDiscriminatorModelForClass(AnimalModel, Cat);\nconst ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot);\n')))),(0,o.yg)("p",null,"And then the same querying code:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'await CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });\nawait DogModel.create({ patientNumber: 1, cageNumber: 1 });\n\n// for this example its an "findOne" to lower the example code\nconst found = await ParrotModel.findOne({}).exec();\n\nconsole.log("found", found);\n')),(0,o.yg)("p",null,"and this time it will log ",(0,o.yg)("inlineCode",{parentName:"p"},"null"),", because there is no ",(0,o.yg)("inlineCode",{parentName:"p"},"Parrot")," document inside the collection."),(0,o.yg)("p",null,'You might ask "how does this work?", well, it is easy: mongoose will by default use the hidden property ',(0,o.yg)("inlineCode",{parentName:"p"},"__t")," to differentiate between registered models from the shared parent, and the default value for the ",(0,o.yg)("inlineCode",{parentName:"p"},"__t")," property is the model name. (",(0,o.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/api/decorators/model-options#customname"},"Look here for more on how typegoose generates an model name"),")"),(0,o.yg)("admonition",{type:"note"},(0,o.yg)("p",{parentName:"admonition"},"The property ",(0,o.yg)("inlineCode",{parentName:"p"},"__t")," can be changed to something different, see ",(0,o.yg)("a",{parentName:"p",href:"#extras"},"Extras"),".")),(0,o.yg)("h2",{id:"query-with-shared-parent-model"},"Query with Shared Parent Model"),(0,o.yg)("p",null,"When using discriminators, it is also possible to use the shared parent to query for documents:"),(0,o.yg)(r.A,{groupId:"diff-full",mdxType:"Tabs"},(0,o.yg)(l.A,{value:"diff",label:"Difference",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},'await CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });\nawait DogModel.create({ patientNumber: 1, cageNumber: 1 });\n\n// for this example its an "findOne" to lower the example code\n- const found = await ParrotModel.findOne({}).exec();\n+ const found = await AnimalModel.findOne({}).exec();\n\n\nconsole.log("found", found);\n'))),(0,o.yg)(l.A,{value:"fullcode",label:"Full Code",default:!0,mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'await CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });\nawait DogModel.create({ patientNumber: 1, cageNumber: 1 });\n\n// for this example its an "findOne" to lower the example code\nconst found = await AnimalModel.findOne({}).exec();\n\nconsole.log("found", found);\n')))),(0,o.yg)("p",null,"This should find one of the 2 created documents, with full properties at runtime, but at compile time (in the editor), it is still shown as ",(0,o.yg)("inlineCode",{parentName:"p"},"Animal"),".",(0,o.yg)("br",{parentName:"p"}),"\n","This can be solved by using custom type guards:"),(0,o.yg)("p",null,"Classes & Models:"),(0,o.yg)(r.A,{groupId:"diff-full",mdxType:"Tabs"},(0,o.yg)(l.A,{value:"diff",label:"Difference",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},'+ enum Names {\n+   DOG = "DOG",\n+   CAT = "CAT",\n+   PARROT = "PARROT",\n+ }\n\n\n@modelOptions({ schemaOptions: { collection: "animal" } })\nclass Animal {\n  @prop({ required: true, unique: true })\n  public patientNumber!: number;\n}\n\nclass Dog extends Animal {\n  @prop()\n  public cageNumber!: number;\n}\n\nclass Cat extends Animal {\n  @prop()\n  public nameTag!: string;\n}\n\nclass Parrot extends Animal {\n  @prop()\n  public commonMessage?: string;\n}\n\nconst AnimalModel = getModelForClass(Animal);\n- const DogModel = getDiscriminatorModelForClass(AnimalModel, Dog);\n- const CatModel = getDiscriminatorModelForClass(AnimalModel, Cat);\n- const ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot);\n+ const DogModel = getDiscriminatorModelForClass(AnimalModel, Dog, Names.DOG);\n+ const CatModel = getDiscriminatorModelForClass(AnimalModel, Cat, Names.CAT);\n+ const ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot, Names.PARROT);\n'))),(0,o.yg)(l.A,{value:"fullcode",label:"Full Code",default:!0,mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'// an enum to make it easier to access the names for the typeguard\nenum Names {\n  DOG = "DOG",\n  CAT = "CAT",\n  PARROT = "PARROT",\n}\n\n@modelOptions({ schemaOptions: { collection: "animal" } })\nclass Animal {\n  @prop({ required: true, unique: true })\n  public patientNumber!: number;\n}\n\nclass Dog extends Animal {\n  @prop()\n  public cageNumber!: number;\n}\n\nclass Cat extends Animal {\n  @prop()\n  public nameTag!: string;\n}\n\nclass Parrot extends Animal {\n  @prop()\n  public commonMessage?: string;\n}\n\nconst AnimalModel = getModelForClass(Animal);\nconst DogModel = getDiscriminatorModelForClass(AnimalModel, Dog, Names.DOG);\nconst CatModel = getDiscriminatorModelForClass(AnimalModel, Cat, Names.CAT);\nconst ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot, Names.PARROT);\n')))),(0,o.yg)("p",null,"Query Code:"),(0,o.yg)(r.A,{groupId:"diff-full",mdxType:"Tabs"},(0,o.yg)(l.A,{value:"diff",label:"Difference",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},'+ function checkForClass<T extends Animal>(doc: mongoose.Document & KeyStringAny, name: string): doc is DocumentType<T> {\n+   return doc?.__t === name;\n+ }\n\n\nawait CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });\nawait DogModel.create({ patientNumber: 1, cageNumber: 1 });\n\n// for this example its an "findOne" to lower the example code\n- const found = await AnimalModel.findOne({}).exec();\n+ const found = await AnimalModel.findOne({ patientNumber: 0 }).orFail().exec();\n\n\n+ if (checkForClass<Cat>(found, Names.CAT)) {\n+   console.log("runtime Cat", found.nameTag);\n+ }\nconsole.log("found", found);\n'))),(0,o.yg)(l.A,{value:"fullcode",label:"Full Code",default:!0,mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'function checkForClass<T extends Animal>(doc: mongoose.Document & KeyStringAny, name: string): doc is DocumentType<T> {\n  return doc?.__t === name;\n}\n\nawait CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });\nawait DogModel.create({ patientNumber: 1, cageNumber: 1 });\n\n// for this example its an "findOne" to lower the example code\nconst found = await AnimalModel.findOne({ patientNumber: 0 }).orFail().exec();\n\nif (checkForClass<Cat>(found, Names.CAT)) {\n  console.log("runtime Cat", found.nameTag);\n}\nconsole.log("found", found);\n')))),(0,o.yg)("p",null,"this code should now log ",(0,o.yg)("inlineCode",{parentName:"p"},"runtime Cat Catty-1")," and the full document and types should also work inside the if-block."),(0,o.yg)("h2",{id:"extras"},"Extras"),(0,o.yg)("p",null,"The value of the ",(0,o.yg)("inlineCode",{parentName:"p"},"discriminatorKey")," (default: ",(0,o.yg)("inlineCode",{parentName:"p"},"__t"),") can be changed, by defining the property on the class (/ schema) and pointing ",(0,o.yg)("inlineCode",{parentName:"p"},"discriminatorKey")," to that property."),(0,o.yg)("p",null,"Example:"),(0,o.yg)(r.A,{groupId:"diff-full",mdxType:"Tabs"},(0,o.yg)(l.A,{value:"diff",label:"Difference",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-diff"},'enum Names {\n  DOG = "DOG",\n  CAT = "CAT",\n  PARROT = "PARROT",\n}\n\n- @modelOptions({ schemaOptions: { collection: "animal" } })\n+ @modelOptions({ schemaOptions: { collection: "animal", discriminatorKey: "customKey" } })\nclass Animal {\n  @prop({ required: true, unique: true })\n  public patientNumber!: number;\n\n\n+   @prop({ required: true })\n+   public customKey!: string; // its recommended to only use "string" or "number"\n}\n\nclass Dog extends Animal {\n  @prop()\n  public cageNumber!: number;\n}\n\nclass Cat extends Animal {\n  @prop()\n  public nameTag!: string;\n}\n\nclass Parrot extends Animal {\n  @prop()\n  public commonMessage?: string;\n}\n\nconst AnimalModel = getModelForClass(Animal);\nconst DogModel = getDiscriminatorModelForClass(AnimalModel, Dog, Names.DOG);\nconst CatModel = getDiscriminatorModelForClass(AnimalModel, Cat, Names.CAT);\nconst ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot, Names.PARROT);\n'))),(0,o.yg)(l.A,{value:"fullcode",label:"Full Code",default:!0,mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'// an enum to make it easier to access the names for the typeguard\nenum Names {\n  DOG = "DOG",\n  CAT = "CAT",\n  PARROT = "PARROT",\n}\n\n@modelOptions({ schemaOptions: { collection: "animal", discriminatorKey: "customKey" } })\nclass Animal {\n  @prop({ required: true, unique: true })\n  public patientNumber!: number;\n\n  // options "enum" & "default" can also be specified, but don\'t have much effect\n  // the property set in "discriminatorKey" does not actually need to be defined, but its for types like usage in an typeguard\n  @prop({ required: true })\n  public customKey!: string; // its recommended to only use "string" or "number"\n}\n\nclass Dog extends Animal {\n  @prop()\n  public cageNumber!: number;\n}\n\nclass Cat extends Animal {\n  @prop()\n  public nameTag!: string;\n}\n\nclass Parrot extends Animal {\n  @prop()\n  public commonMessage?: string;\n}\n\nconst AnimalModel = getModelForClass(Animal);\nconst DogModel = getDiscriminatorModelForClass(AnimalModel, Dog, Names.DOG);\nconst CatModel = getDiscriminatorModelForClass(AnimalModel, Cat, Names.CAT);\nconst ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot, Names.PARROT);\n')))),(0,o.yg)("p",null,"And so instead of the model name (example: ",(0,o.yg)("inlineCode",{parentName:"p"},"Cat"),"), it will be stored as ",(0,o.yg)("inlineCode",{parentName:"p"},"customCat")," inside property ",(0,o.yg)("inlineCode",{parentName:"p"},"customKey"),"."),(0,o.yg)("h2",{id:"extra-notes"},"Extra Notes"),(0,o.yg)("h3",{id:"strictquery"},(0,o.yg)("inlineCode",{parentName:"h3"},"strictQuery")),(0,o.yg)("p",null,"In mongoose 6.x, the option ",(0,o.yg)("inlineCode",{parentName:"p"},"strictQuery")," is ",(0,o.yg)("inlineCode",{parentName:"p"},"true")," by default, basically meaning that it will strip all properties from a query that are not on the schema the query is executed on."),(0,o.yg)("p",null,"See ",(0,o.yg)("a",{parentName:"p",href:"https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict"},"mongoose 6.0 Migration guide"),"."),(0,o.yg)("p",null,"Example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},"// The following will result in a empty array\nawait AnimalModel.find({ cageNumber: 10 });\n\n// use the following if it is required to be used this way\nawait AnimalModel.find({ cageNumber: 10 }, null, { strictQuery: false })\n")))}g.isMDXComponent=!0}}]);