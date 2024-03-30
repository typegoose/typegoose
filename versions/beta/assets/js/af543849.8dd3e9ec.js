"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[1153],{5680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>m});var o=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=o.createContext({}),p=function(e){var n=o.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=p(e.components);return o.createElement(l.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},g=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(t),g=a,m=c["".concat(l,".").concat(g)]||c[g]||d[g]||r;return t?o.createElement(m,s(s({ref:n},u),{},{components:t})):o.createElement(m,s({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,s=new Array(r);s[0]=g;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[c]="string"==typeof e?e:a,s[1]=i;for(var p=2;p<r;p++)s[p]=t[p];return o.createElement.apply(null,s)}return o.createElement.apply(null,t)}g.displayName="MDXCreateElement"},9365:(e,n,t)=>{t.d(n,{A:()=>s});var o=t(6540),a=t(53);const r={tabItem:"tabItem_Ymn6"};function s(e){let{children:n,hidden:t,className:s}=e;return o.createElement("div",{role:"tabpanel",className:(0,a.A)(r.tabItem,s),hidden:t},n)}},1470:(e,n,t)=>{t.d(n,{A:()=>N});var o=t(8168),a=t(6540),r=t(53),s=t(3104),i=t(6347),l=t(7485),p=t(1682),u=t(9466);function c(e){return function(e){var n,t;return null!=(n=null==(t=a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:t.filter(Boolean))?n:[]}(e).map((e=>{let{props:{value:n,label:t,attributes:o,default:a}}=e;return{value:n,label:t,attributes:o,default:a}}))}function d(e){const{values:n,children:t}=e;return(0,a.useMemo)((()=>{const e=null!=n?n:c(t);return function(e){const n=(0,p.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error('Docusaurus error: Duplicate values "'+n.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[n,t])}function g(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const o=(0,i.W6)(),r=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=t?t:null}({queryString:n,groupId:t});return[(0,l.aZ)(r),(0,a.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(o.location.search);n.set(r,e),o.replace({...o.location,search:n.toString()})}),[r,o])]}function y(e){const{defaultValue:n,queryString:t=!1,groupId:o}=e,r=d(e),[s,i]=(0,a.useState)((()=>function(e){var n;let{defaultValue:t,tabValues:o}=e;if(0===o.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!g({value:t,tabValues:o}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+t+'" but none of its children has the corresponding value. Available values are: '+o.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return t}const a=null!=(n=o.find((e=>e.default)))?n:o[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:r}))),[l,p]=m({queryString:t,groupId:o}),[c,y]=function(e){let{groupId:n}=e;const t=function(e){return e?"docusaurus.tab."+e:null}(n),[o,r]=(0,u.Dv)(t);return[o,(0,a.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:o}),h=(()=>{const e=null!=l?l:c;return g({value:e,tabValues:r})?e:null})();(0,a.useLayoutEffect)((()=>{h&&i(h)}),[h]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!g({value:e,tabValues:r}))throw new Error("Can't select invalid tab value="+e);i(e),p(e),y(e)}),[p,y,r]),tabValues:r}}var h=t(2303);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:n,block:t,selectedValue:i,selectValue:l,tabValues:p}=e;const u=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.a_)(),d=e=>{const n=e.currentTarget,t=u.indexOf(n),o=p[t].value;o!==i&&(c(n),l(o))},g=e=>{var n;let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{var o;const n=u.indexOf(e.currentTarget)+1;t=null!=(o=u[n])?o:u[0];break}case"ArrowLeft":{var a;const n=u.indexOf(e.currentTarget)-1;t=null!=(a=u[n])?a:u[u.length-1];break}}null==(n=t)||n.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":t},n)},p.map((e=>{let{value:n,label:t,attributes:s}=e;return a.createElement("li",(0,o.A)({role:"tab",tabIndex:i===n?0:-1,"aria-selected":i===n,key:n,ref:e=>u.push(e),onKeyDown:g,onClick:d},s,{className:(0,r.A)("tabs__item",f.tabItem,null==s?void 0:s.className,{"tabs__item--active":i===n})}),null!=t?t:n)})))}function v(e){let{lazy:n,children:t,selectedValue:o}=e;const r=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=r.find((e=>e.props.value===o));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},r.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==o}))))}function w(e){const n=y(e);return a.createElement("div",{className:(0,r.A)("tabs-container",f.tabList)},a.createElement(b,(0,o.A)({},e,n)),a.createElement(v,(0,o.A)({},e,n)))}function N(e){const n=(0,h.A)();return a.createElement(w,(0,o.A)({key:String(n)},e))}},2015:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var o=t(8168),a=(t(6540),t(5680)),r=t(1470),s=t(9365);const i={id:"quick-start-guide",title:"Quick Start Guide"},l=void 0,p={unversionedId:"guides/quick-start-guide",id:"guides/quick-start-guide",title:"Quick Start Guide",description:"Quick Overview of Typegoose",source:"@site/../docs/guides/quick-start-guide.md",sourceDirName:"guides",slug:"/guides/quick-start-guide",permalink:"/typegoose/versions/beta/docs/guides/quick-start-guide",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/guides/quick-start-guide.md",tags:[],version:"current",frontMatter:{id:"quick-start-guide",title:"Quick Start Guide"},sidebar:"guides",next:{title:"FAQ",permalink:"/typegoose/versions/beta/docs/guides/faq"}},u={},c=[{value:"Quick Overview of Typegoose",id:"quick-overview-of-typegoose",level:2},{value:"How to Start using typegoose",id:"how-to-start-using-typegoose",level:2},{value:"Requirements",id:"requirements",level:3},{value:"Install",id:"install",level:3},{value:"How to use Typegoose",id:"how-to-use-typegoose",level:3},{value:"Do&#39;s and Don&#39;ts of Typegoose",id:"dos-and-donts-of-typegoose",level:2},{value:"Extra Examples",id:"extra-examples",level:2},{value:"Static Methods",id:"static-methods",level:3},{value:"Instance Methods",id:"instance-methods",level:3},{value:"Hooks",id:"hooks",level:3}],d={toc:c},g="wrapper";function m(e){let{components:n,...t}=e;return(0,a.yg)(g,(0,o.A)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h2",{id:"quick-overview-of-typegoose"},"Quick Overview of Typegoose"),(0,a.yg)("admonition",{type:"note"},(0,a.yg)("p",{parentName:"admonition"},"This Guide is for Typegoose version ~12.0")),(0,a.yg)("p",null,'Typegoose is a "wrapper" for easily writing Mongoose models with TypeScript.'),(0,a.yg)("p",null,"Instead of writing this:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"// This is a representation of how typegoose's compile output would look\ninterface Car {\n  model?: string;\n}\n\ninterface Job {\n  title?: string;\n  position?: string;\n}\n\ninterface User {\n  name?: string;\n  age!: number;\n  preferences?: string[];\n  mainJob?: Job;\n  jobs?: Job[];\n  mainCar?: Car | string;\n  cars?: (Car | string)[];\n}\n\nconst JobSchema = new mongoose.Schema({\n  title: String;\n  position: String;\n});\n\nconst CarModel = mongoose.model('Car', {\n  model: String,\n});\n\nconst UserModel = mongoose.model('User', {\n  name: { type: String },\n  age: { type: Number, required: true },\n  preferences: [{ type: String }],\n  mainJob: { type: JobSchema },\n  jobs: [{ type: JobSchema }],\n  mainCar: { type: Schema.Types.ObjectId, ref: 'Car' },\n  cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }],\n});\n")),(0,a.yg)("p",null,"You can just write this:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class Job {\n  @prop()\n  public title?: string;\n\n  @prop()\n  public position?: string;\n}\n\nclass Car {\n  @prop()\n  public model?: string;\n}\n\nclass User {\n  @prop()\n  public name?: string;\n\n  @prop({ required: true })\n  public age!: number; // This is a single Primitive\n\n  @prop({ type: () => [String] })\n  public preferences?: string[]; // This is a Primitive Array\n\n  @prop()\n  public mainJob?: Job; // This is a single SubDocument\n\n  @prop({ type: () => [Job] })\n  public jobs?: Job[]; // This is a SubDocument Array\n\n  @prop({ ref: () => Car })\n  public mainCar?: Ref<Car>; // This is a single Reference\n\n  @prop({ ref: () => [Car] })\n  public cars?: Ref<Car>[]; // This is a Reference Array\n}\n")),(0,a.yg)("admonition",{type:"caution"},(0,a.yg)("p",{parentName:"admonition"},(0,a.yg)("inlineCode",{parentName:"p"},"type")," has to be defined when working with Arrays, because Reflection only returns basic information. ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/microsoft/TypeScript/issues/7169"},"Look here for why"),(0,a.yg)("br",{parentName:"p"}),"\n","Like ",(0,a.yg)("inlineCode",{parentName:"p"},"public: string[]")," is in reflection only ",(0,a.yg)("inlineCode",{parentName:"p"},"Array"),".  ")),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-"},"Look here for what ",(0,a.yg)("inlineCode",{parentName:"a"},"!")," means on a property"),(0,a.yg)("br",{parentName:"p"}),"\n",(0,a.yg)("a",{parentName:"p",href:"https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters"},"Look here for what ",(0,a.yg)("inlineCode",{parentName:"a"},"?")," means on a property"),"  "),(0,a.yg)("h2",{id:"how-to-start-using-typegoose"},"How to Start using typegoose"),(0,a.yg)("h3",{id:"requirements"},"Requirements"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"TypeScript version ",(0,a.yg)("inlineCode",{parentName:"li"},"^5.3")," is recommended, though older ones may also work"),(0,a.yg)("li",{parentName:"ul"},"NodeJS ",(0,a.yg)("inlineCode",{parentName:"li"},">=16.20.1")," (and ",(0,a.yg)("inlineCode",{parentName:"li"},"@types/node@16"),")"),(0,a.yg)("li",{parentName:"ul"},"Mongoose ",(0,a.yg)("inlineCode",{parentName:"li"},"~8.2.4")),(0,a.yg)("li",{parentName:"ul"},"A IDE that supports TypeScript linting is recommended to be used (VSCode is recommended)"),(0,a.yg)("li",{parentName:"ul"},"This Guide expects you to know how Mongoose (or at least its models) works"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"experimentalDecorators")," and ",(0,a.yg)("inlineCode",{parentName:"li"},"emitDecoratorMetadata")," must be enabled in ",(0,a.yg)("inlineCode",{parentName:"li"},"tsconfig.json")),(0,a.yg)("li",{parentName:"ul"},"tsconfig option ",(0,a.yg)("inlineCode",{parentName:"li"},"target")," being at least ",(0,a.yg)("inlineCode",{parentName:"li"},"es6"),", recommended is ",(0,a.yg)("inlineCode",{parentName:"li"},"es2020"))),(0,a.yg)("admonition",{type:"info"},(0,a.yg)("p",{parentName:"admonition"},"tsconfig option ",(0,a.yg)("inlineCode",{parentName:"p"},"emitDecoratorMetadata")," is not strictly required, look ",(0,a.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/guides/use-without-emitDecoratorMetadata"},"here")," for more")),(0,a.yg)("h3",{id:"install"},"Install"),(0,a.yg)(r.A,{groupId:"npm2yarn",mdxType:"Tabs"},(0,a.yg)(s.A,{value:"npm",mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"npm install --save @typegoose/typegoose # install typegoose itself\n\nnpm install --save mongoose # install peer-dependency mongoose\n"))),(0,a.yg)(s.A,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"yarn add @typegoose/typegoose # install typegoose itself\n\nyarn add mongoose # install peer-dependency mongoose\n"))),(0,a.yg)(s.A,{value:"pnpm",label:"pnpm",mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"pnpm add @typegoose/typegoose # install typegoose itself\n\npnpm add mongoose # install peer-dependency mongoose\n")))),(0,a.yg)("h3",{id:"how-to-use-typegoose"},"How to use Typegoose"),(0,a.yg)("p",null,"Let's say you have a Mongoose model like this one:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"const kittenSchema = new mongoose.Schema({\n  name: String\n});\n\nconst KittenModel = mongoose.model('Kitten', kittenSchema);\n\nlet document = await KittenModel.create({ name: 'Kitty' });\n// \"document\" has basic mongoose inferred types\n")),(0,a.yg)("p",null,"With Typegoose, it can be converted to something like:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class KittenClass {\n  @prop()\n  public name?: string;\n}\n\nconst KittenModel = getModelForClass(KittenClass);\n\nlet document = await KittenModel.create({ name: 'Kitty' });\n// \"document\" has proper (manual) typescript types of KittenClass\n")),(0,a.yg)("admonition",{type:"note"},(0,a.yg)("p",{parentName:"admonition"},(0,a.yg)("inlineCode",{parentName:"p"},"new KittenModel({} /*<-- this here*/)")," will have type suggestions, but they are ",(0,a.yg)("em",{parentName:"p"},"not enforced"),", ",(0,a.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/guides/faq#why-does-new-model-not-have-types"},"read more here"),".")),(0,a.yg)("admonition",{type:"note"},(0,a.yg)("p",{parentName:"admonition"},"Since around mongoose 6.0, mongoose can infer types mostly from the schema definition, but it is still not perfect and arguably less overview-able than typegoose's style of classes.",(0,a.yg)("br",{parentName:"p"}),"\n","Also tsdoc comments are not transferred when using mongoose's inferred types.")),(0,a.yg)("h2",{id:"dos-and-donts-of-typegoose"},"Do's and Don'ts of Typegoose"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Typegoose is a wrapper for Mongoose's models & schemas"),(0,a.yg)("li",{parentName:"ul"},"Typegoose does not modify any functions of Mongoose"),(0,a.yg)("li",{parentName:"ul"},"Typegoose aims to get Mongoose's models to be stable through type-information from classes (without defining extra interfaces)"),(0,a.yg)("li",{parentName:"ul"},"Typegoose aims to make Mongoose more usable by making the models more type-rich with TypeScript"),(0,a.yg)("li",{parentName:"ul"},"Decorated schema configuration classes (like ",(0,a.yg)("inlineCode",{parentName:"li"},"KittenClass")," above) must use explicit type declarations")),(0,a.yg)("h2",{id:"extra-examples"},"Extra Examples"),(0,a.yg)("h3",{id:"static-methods"},"Static Methods"),(0,a.yg)("p",null,"Sometimes extra functions for model creation or pre-written queries are needed, they can be done as follows:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class KittenClass {\n  @prop()\n  public name?: string;\n\n  @prop()\n  public species?: string;\n\n  // the \"this\" definition is required to have the correct types\n  public static async findBySpecies(this: ReturnModelType<typeof KittenClass>, species: string) {\n    return this.find({ species }).exec();\n  }\n}\nconst KittenModel = getModelForClass(KittenClass);\n\nconst docs = await KittenModel.findBySpecies('SomeSpecies');\n")),(0,a.yg)("admonition",{type:"note"},(0,a.yg)("p",{parentName:"admonition"},"pre-6.0 static functions needed ",(0,a.yg)("inlineCode",{parentName:"p"},"@staticMethod"),", but this is not needed anymore.")),(0,a.yg)("h3",{id:"instance-methods"},"Instance Methods"),(0,a.yg)("p",null,"Sometimes extra functions for manipulating data on an instance are needed, they can be done as follows:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class KittenClass {\n  @prop()\n  public name?: string;\n\n  @prop()\n  public species?: string;\n\n  // the \"this\" definition is required to have the correct types\n  public async setSpeciesAndSave(this: DocumentType<KittenClass>, species: string) {\n    this.species = species;\n    await this.save();\n  }\n}\nconst KittenModel = getModelForClass(KittenClass);\n\nconst doc = new KittenModel({ name: 'SomeCat', species: 'SomeSpecies' });\nawait doc.setSpeciesAndSave('SomeOtherSpecies');\n")),(0,a.yg)("admonition",{type:"note"},(0,a.yg)("p",{parentName:"admonition"},"Pre-6.0 static functions needed ",(0,a.yg)("inlineCode",{parentName:"p"},"@instanceMethod"),", but this is not needed anymore.")),(0,a.yg)("h3",{id:"hooks"},"Hooks"),(0,a.yg)("p",null,"Typegoose also supports hooks. They can be used like this:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"@pre<KittenClass>('save', function() {\n  this.isKitten = this.age < 1\n})\n@post<KittenClass>('save', function(kitten) {\n  console.log(kitten.isKitten ? 'We have a kitten here.' : 'We have a big kitty here.')\n})\nclass KittenClass {\n  @prop()\n  public name?: string;\n\n  @prop()\n  public species?: string;\n  \n  @prop()\n  public age?: number\n  \n  @prop({ default: false })\n  public isKitten?: boolean\n}\n\nconst KittenModel = getModelForClass(KittenClass);\n\nconst doc = new KittenModel({ name: 'SomeCat', species: 'SomeSpecies', age: 0 });\nawait doc.save(); // this should output \"We have a kitten here.\"\nconst doc = new KittenModel({ name: 'SomeCat', species: 'SomeSpecies', age: 2 });\nawait doc.save(); // this should output \"We have a big kitty here.\"\n")),(0,a.yg)("p",null,"For detailed explanation of Hooks, please see ",(0,a.yg)("a",{parentName:"p",href:"/typegoose/versions/beta/docs/api/decorators/hooks"},"Hooks"),"."),(0,a.yg)("p",null,"Note:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Do not use Arrow Functions, because it will break the binding of ",(0,a.yg)("inlineCode",{parentName:"li"},"this")),(0,a.yg)("li",{parentName:"ul"},"For ESLint users: Make sure that rule ",(0,a.yg)("inlineCode",{parentName:"li"},"eslint-no-use-before-defining")," is disabled, otherwise you might get ESLint errors / warnings inside the hooks")))}m.isMDXComponent=!0}}]);