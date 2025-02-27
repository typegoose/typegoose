"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[6093],{1075:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>u});const o=JSON.parse('{"id":"guides/integration-examples/using-with-deepkit-type","title":"Using with @deepkit/type","description":"Last updated for:","source":"@site/../docs/guides/integration-examples/deepkit-type.md","sourceDirName":"guides/integration-examples","slug":"/guides/integration-examples/using-with-deepkit-type","permalink":"/typegoose/versions/beta/docs/guides/integration-examples/using-with-deepkit-type","draft":false,"unlisted":false,"editUrl":"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/guides/integration-examples/deepkit-type.md","tags":[],"version":"current","frontMatter":{"id":"using-with-deepkit-type","title":"Using with @deepkit/type"},"sidebar":"guides","previous":{"title":"Using with class-transformer","permalink":"/typegoose/versions/beta/docs/guides/integration-examples/using-with-class-transformer"},"next":{"title":"Common Plugins","permalink":"/typegoose/versions/beta/docs/guides/integration-examples/common-plugins"}}');var s=n(4848),r=n(8453),i=n(5537),a=n(9329);const l={id:"using-with-deepkit-type",title:"Using with @deepkit/type"},c=void 0,d={},u=[{value:"Implementation",id:"implementation",level:2},{value:"Known Issues",id:"known-issues",level:2},{value:"The &quot;mongoId&quot; option is not actually translating to and from string",id:"the-mongoid-option-is-not-actually-translating-to-and-from-string",level:3}];function p(e){const t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"Last updated for:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-txt",children:"@typegoose/typegoose@9.0.0\n@deepkit/core@1.0.1-alpha.58\n@deepkit/type@1.0.1-alpha.58\n"})}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsxs)(t.p,{children:["This guide shows how to use ",(0,s.jsx)(t.code,{children:"typegoose"})," with ",(0,s.jsx)(t.code,{children:"@deepkit/type"}),"."]}),"\n",(0,s.jsxs)(i.A,{groupId:"npm2yarn",children:[(0,s.jsx)(a.A,{value:"npm",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"npm install --save @deepkit/core@~1.0.1-alpha.52 @deepkit/type@~1.0.1-alpha.56\n"})})}),(0,s.jsx)(a.A,{value:"yarn",label:"Yarn",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"yarn add @deepkit/core@~1.0.1-alpha.52 @deepkit/type@~1.0.1-alpha.56\n"})})}),(0,s.jsx)(a.A,{value:"pnpm",label:"pnpm",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"pnpm add @deepkit/core@~1.0.1-alpha.52 @deepkit/type@~1.0.1-alpha.56\n"})})})]}),"\n",(0,s.jsx)(t.h2,{id:"implementation",children:"Implementation"}),"\n",(0,s.jsx)(t.admonition,{type:"note",children:(0,s.jsxs)(t.p,{children:["It is better to have ",(0,s.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Data_transfer_object",children:"DTOs"})," to separate your API logic (decorated with @deepkit/type decorators) from your Entities (decorated with Typegoose decorators). This may seem like extra code, verbosity and work, but it is smart, because it will allow you to change your API and Entities separate from each other."]})}),"\n",(0,s.jsxs)(t.p,{children:["Suppose you have this ",(0,s.jsx)(t.code,{children:"Account"})," class decorated with ",(0,s.jsx)(t.code,{children:"@deepkit/type"}),":"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"import { t } from '@deepkit/type';\nimport { getModelForClass, prop } from '@typegoose/typegoose';\n\n// We have to use custom \"classToPlain\" and \"plainToClass\" functions, see \"Known Issues\" below\n\nenum Group {\n  confidential = 'confidential',\n  public = 'public',\n}\n\nclass Account {\n  @t.mongoId.group(Group.public)\n  public _id: string;\n\n  @t.group(Group.public)\n  public __v: number;\n\n  @t.group(Group.public)\n  @prop()\n  public email: string;\n\n  @t.group(Group.confidential)\n  @prop()\n  public confidentialProperty?: string;\n}\n\nconst AccountModel = getModelForClass(Account);\n"})}),"\n",(0,s.jsx)(t.p,{children:"You can then do, for example:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["the following, where we have a POJO. In this example, we are using Mongoose's ",(0,s.jsx)(t.code,{children:"lean()"})," to get the POJO. Just imagine it is an incoming DTO though:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"// our simulated incoming DTO, a POJO\nconst pojo = await AccountModel.findById(id).orFail().lean().exec();\n// groupsExclude option excludes the property group\nconst access = { groupsExclude: [Group.confidential] };\n// deserialize pojo back to an Account instance\nconst deserialized = plainToClass(Account, pojo, access);\n// we could actually do an await Account.Model.create(deserialized)\nexpect(deserialized).toStrictEqual(accountClassObject);\n"})}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"or where we have a normal document, and want to serialize it to a POJO, for sending the data back out to the client:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"// exec returns a Mongoose Object\nconst doc = await AccountModel.findById(id).orFail().exec();\n// groupsExclude option excludes the property group\nconst access = { groupsExclude: [Group.confidential] };\n// serialize Account instance back to a Plain Old Javascript Object\nconst serialized = classToPlain(Account, doc, access);\nexpect(serialized).toStrictEqual({\n  _id: id,\n  __v: 0,\n  email: 'somebody@gmail.com',\n});\n// we can now send the \"serialized\" POJO out to the client\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"As you can see from these code examples, there is:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["an ",(0,s.jsx)(t.code,{children:"access"})," or ",(0,s.jsx)(t.code,{children:"grouping"})," (",(0,s.jsx)(t.code,{children:"@t.group(group)"}),") definition needed to output the required properties for any serializing or deserializing. The ",(0,s.jsx)(t.code,{children:"@deepkit/type"})," author suggests not using groupings at all, as they cause ",(0,s.jsx)(t.code,{children:"@deepkit/type"}),"'s performance to deteriorate. ",(0,s.jsx)(t.a,{href:"https://deepkit.io/documentation/type/serialization#groups",children:"See Official Documentation for Reference"}),", official quote:","\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsx)(t.p,{children:"Note: Using grouped serialization is much slower than regular serialization. If performance is important, consider rearranging your data into multiple classes instead."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["a ",(0,s.jsx)(t.code,{children:"Mongodb.ObjectId"})," decorator (",(0,s.jsx)(t.code,{children:"@t.mongoId"}),") is built into ",(0,s.jsx)(t.code,{children:"@deepkit/type"}),"'s decorators to handle the type conversion to string and back to a MongoId."]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"@deepkit/type"}),"'s author also suggests not putting passwords or other confidential data directly inside entities that have mainly public access. It is better to put them in their own class or classes, so they can be handled without the grouping feature. This allows for the performance of serialization and deserialization to be much better and you can control who sees the confidential data more appropriately i.e. not via serialization steps."]}),"\n",(0,s.jsxs)(t.p,{children:["Also, you'll only need ",(0,s.jsx)(t.code,{children:"@t"})," to decorate your Entity (compared to ",(0,s.jsx)(t.code,{children:"class-transformer"}),", which commonly needs 2 or more), so your code will be cleaner too. This is what the ",(0,s.jsx)(t.code,{children:"Account"})," entity would look like without the grouping/ access code."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"class Account {\n  @t.mongoId\n  public _id: string;\n\n  @t\n  public __v: number;\n\n  @t\n  @prop()\n  public email: string;\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"confidentialProperty"})," property would be in a different entity/ class."]}),"\n",(0,s.jsxs)(t.p,{children:["And again, as was mentioned above, an even better tip is to not use the entity class at all for the serialization and deserialization definitions (i.e. with decorator metadata). It is much better to use ",(0,s.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Data_transfer_object",children:"DTOs"})," for this purpose."]}),"\n",(0,s.jsx)(t.h2,{id:"known-issues",children:"Known Issues"}),"\n",(0,s.jsx)(t.h3,{id:"the-mongoid-option-is-not-actually-translating-to-and-from-string",children:'The "mongoId" option is not actually translating to and from string'}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"t.mongoId"})," decorator only works for ",(0,s.jsx)(t.code,{children:"@deepkit/orm"}),", so we have to use a custom serializer to either overwrite that function or use a custom function."]}),"\n",(0,s.jsx)(t.p,{children:"Example:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:'import { t, jsonSerializer } from \'@deepkit/type\';\nimport mongoose from \'mongoose\';\n\n// Shorten type\nconst ObjectId = mongoose.Types.ObjectId;\n// Create a Custom Serializer to add custom transform functions to types\nconst mySerializer = new (class CustomSerializer extends jsonSerializer.fork(\'mySerializer\') {})();\n\n// Note: A custom Serializer has to be used, because the included "mongoId" "decorator" only works with "@deepkit/orm"\n\n// We overwrite mongoId and correctly convert from Mongo ObjectId to string when deserializing\nmySerializer.toClass.register(\'objectId\', (property, state) => {\n  state.setContext({ ObjectId: ObjectId });\n  state.addSetter(`${state.accessor} instanceof String ? ObjectId.createFromHexString(${state.accessor}) : ${state.accessor}`);\n});\n\n// We overwrite mongoId and correctly convert string to Mongo ObjectId when serializing\nmySerializer.fromClass.register(\'objectId\', (property, state) => {\n  state.setContext({ ObjectId: ObjectId });\n  state.addSetter(`${state.accessor} instanceof ObjectId ? ${state.accessor}.toHexString() : ${state.accessor}`);\n});\n\n// Create a custom "classToPlain" function, using "mySerializer" instead of the function provided by "@deepkit/type"\nconst classToPlain = function (schemaCls: any, clsObj: any, access?: any) {\n  return mySerializer.for(schemaCls).serialize(clsObj, access);\n};\n\n// Create a custom "plainToClass" function, using "mySerializer" instead of the function provided by "@deepkit/type"\nconst plainToClass = function (schemaCls: any, obj: any, access?: any) {\n  return mySerializer.for(schemaCls).deserialize(obj, access);\n};\n'})}),"\n",(0,s.jsxs)(t.p,{children:["Also see the ",(0,s.jsxs)(t.a,{href:"https://github.com/typegoose/typegoose/blob/master/test/tests/deepkitType.test.ts",children:["typegoose ",(0,s.jsx)(t.code,{children:"@deepkit/type"})," tests"]})]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsx)(t.admonition,{type:"info",children:(0,s.jsxs)(t.p,{children:["For more information, you can always look at the ",(0,s.jsxs)(t.a,{href:"https://github.com/typegoose/typegoose/blob/master/test/tests/deepkitType.test.ts",children:["typegoose ",(0,s.jsx)(t.code,{children:"@deepkit/type"})," tests"]})]})})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},5537:(e,t,n)=>{n.d(t,{A:()=>v});var o=n(6540),s=n(4164),r=n(5627),i=n(6347),a=n(372),l=n(604),c=n(1861),d=n(8749);function u(e){return o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,o.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:n,attributes:o,default:s}}=e;return{value:t,label:n,attributes:o,default:s}}))}(n);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const s=(0,i.W6)(),r=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l.aZ)(r),(0,o.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(s.location.search);t.set(r,e),s.replace({...s.location,search:t.toString()})}),[r,s])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:s}=e,r=p(e),[i,l]=(0,o.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const o=n.find((e=>e.default))??n[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:t,tabValues:r}))),[c,u]=m({queryString:n,groupId:s}),[g,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,r]=(0,d.Dv)(n);return[s,(0,o.useCallback)((e=>{n&&r.set(e)}),[n,r])]}({groupId:s}),b=(()=>{const e=c??g;return h({value:e,tabValues:r})?e:null})();(0,a.A)((()=>{b&&l(b)}),[b]);return{selectedValue:i,selectValue:(0,o.useCallback)((e=>{if(!h({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),f(e)}),[u,f,r]),tabValues:r}}var f=n(9136);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=n(4848);function x(e){let{className:t,block:n,selectedValue:o,selectValue:i,tabValues:a}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.a_)(),d=e=>{const t=e.currentTarget,n=l.indexOf(t),s=a[n].value;s!==o&&(c(t),i(s))},u=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":n},t),children:a.map((e=>{let{value:t,label:n,attributes:r}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,ref:e=>{l.push(e)},onKeyDown:u,onClick:d,...r,className:(0,s.A)("tabs__item",b.tabItem,r?.className,{"tabs__item--active":o===t}),children:n??t},t)}))})}function j(e){let{lazy:t,children:n,selectedValue:r}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===r));return e?(0,o.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:i.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function w(e){const t=g(e);return(0,y.jsxs)("div",{className:(0,s.A)("tabs-container",b.tabList),children:[(0,y.jsx)(x,{...t,...e}),(0,y.jsx)(j,{...t,...e})]})}function v(e){const t=(0,f.A)();return(0,y.jsx)(w,{...e,children:u(e.children)},String(t))}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>a});var o=n(6540);const s={},r=o.createContext(s);function i(e){const t=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(r.Provider,{value:t},e.children)}},9329:(e,t,n)=>{n.d(t,{A:()=>i});n(6540);var o=n(4164);const s={tabItem:"tabItem_Ymn6"};var r=n(4848);function i(e){let{children:t,hidden:n,className:i}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,o.A)(s.tabItem,i),hidden:n,children:t})}}}]);