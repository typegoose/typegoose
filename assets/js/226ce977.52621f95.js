"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[9873],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return d}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),u=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=u(e.components);return a.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=u(t),d=r,f=m["".concat(l,".").concat(d)]||m[d]||p[d]||o;return t?a.createElement(f,s(s({ref:n},c),{},{components:t})):a.createElement(f,s({ref:n},c))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,s=new Array(o);s[0]=m;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var u=2;u<o;u++)s[u]=t[u];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8215:function(e,n,t){t.d(n,{Z:function(){return r}});var a=t(7294);function r(e){var n=e.children,t=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:t,className:r},n)}},9877:function(e,n,t){t.d(n,{Z:function(){return c}});var a=t(7462),r=t(7294),o=t(2389),s=t(5450),i=t(6010),l="tabItem_LplD";function u(e){var n,t,o,u=e.lazy,c=e.block,p=e.defaultValue,m=e.values,d=e.groupId,f=e.className,g=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),v=null!=m?m:g.map((function(e){var n=e.props;return{value:n.value,label:n.label,attributes:n.attributes}})),h=(0,s.lx)(v,(function(e,n){return e.value===n.value}));if(h.length>0)throw new Error('Docusaurus error: Duplicate values "'+h.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var b=null===p?p:null!=(n=null!=p?p:null==(t=g.find((function(e){return e.props.default})))?void 0:t.props.value)?n:null==(o=g[0])?void 0:o.props.value;if(null!==b&&!v.some((function(e){return e.value===b})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+b+'" but none of its children has the corresponding value. Available values are: '+v.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var y=(0,s.UB)(),k=y.tabGroupChoices,w=y.setTabGroupChoices,N=(0,r.useState)(b),x=N[0],O=N[1],T=[],C=(0,s.o5)().blockElementScrollPositionUntilNextRender;if(null!=d){var E=k[d];null!=E&&E!==x&&v.some((function(e){return e.value===E}))&&O(E)}var j=function(e){var n=e.currentTarget,t=T.indexOf(n),a=v[t].value;a!==x&&(C(n),O(a),null!=d&&w(d,a))},A=function(e){var n,t=null;switch(e.key){case"ArrowRight":var a=T.indexOf(e.currentTarget)+1;t=T[a]||T[0];break;case"ArrowLeft":var r=T.indexOf(e.currentTarget)-1;t=T[r]||T[T.length-1]}null==(n=t)||n.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":c},f)},v.map((function(e){var n=e.value,t=e.label,o=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:x===n?0:-1,"aria-selected":x===n,key:n,ref:function(e){return T.push(e)},onKeyDown:A,onFocus:j,onClick:j},o,{className:(0,i.Z)("tabs__item",l,null==o?void 0:o.className,{"tabs__item--active":x===n})}),null!=t?t:n)}))),u?(0,r.cloneElement)(g.filter((function(e){return e.props.value===x}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},g.map((function(e,n){return(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==x})}))))}function c(e){var n=(0,o.Z)();return r.createElement(u,(0,a.Z)({key:String(n)},e))}},9918:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return u},contentTitle:function(){return c},metadata:function(){return p},assets:function(){return m},toc:function(){return d},default:function(){return g}});var a=t(7462),r=t(3366),o=(t(7294),t(3905)),s=t(9877),i=t(8215),l=["components"],u={id:"using-with-class-transformer",title:"Using with class-transformer"},c=void 0,p={unversionedId:"guides/integration-examples/using-with-class-transformer",id:"guides/integration-examples/using-with-class-transformer",title:"Using with class-transformer",description:"Last updated for:",source:"@site/../docs/guides/integration-examples/class-transformer.md",sourceDirName:"guides/integration-examples",slug:"/guides/integration-examples/using-with-class-transformer",permalink:"/typegoose/docs/guides/integration-examples/using-with-class-transformer",editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/integration-examples/class-transformer.md",tags:[],version:"current",frontMatter:{id:"using-with-class-transformer",title:"Using with class-transformer"},sidebar:"guides",previous:{title:"Error & Warning Details",permalink:"/typegoose/docs/guides/error-warning-details"},next:{title:"Using with @deepkit/type",permalink:"/typegoose/docs/guides/integration-examples/using-with-deepkit-type"}},m={},d=[{value:"Implementation",id:"implementation",level:2}],f={toc:d};function g(e){var n=e.components,t=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},f,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Last updated for:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-txt"},"@typegoose/typegoose@9.3.0\nclass-transformer@0.5.1\n")),(0,o.kt)("hr",null),(0,o.kt)("p",null,"This guide shows how to use ",(0,o.kt)("inlineCode",{parentName:"p"},"typegoose")," with ",(0,o.kt)("inlineCode",{parentName:"p"},"class-transformer"),"."),(0,o.kt)(s.Z,{groupId:"npm2yarn",mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"npm",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm install --save class-transformer@~0.5.1\n"))),(0,o.kt)(i.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add class-transformer@~0.5.1\n")))),(0,o.kt)("h2",{id:"implementation"},"Implementation"),(0,o.kt)("p",null,"Suppose you have this ",(0,o.kt)("inlineCode",{parentName:"p"},"Account")," class decorated with ",(0,o.kt)("inlineCode",{parentName:"p"},"class-transformer"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import { Exclude, Expose, Transform } from 'class-transformer';\nimport { getModelForClass, mongoose, prop } from '@typegoose/typegoose';\n\n// re-implement base Document to allow class-transformer to serialize/deserialize its properties\n// This class is needed, otherwise \"_id\" and \"__v\" would be excluded from the output\nclass DocumentCT {\n  @Expose()\n  // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string\n  @Transform((value) => {\n    if ('value' in value) {\n      // HACK: this is changed because of https://github.com/typestack/class-transformer/issues/879\n      // return value.value.toString(); // because \"toString\" is also a wrapper for \"toHexString\"\n      return value.obj[value.key].toString();\n    }\n\n    return 'unknown value';\n  })\n  public _id: string;\n\n  @Expose()\n  public __v: number;\n}\n\n@Exclude()\nclass Account extends DocumentCT {\n  @prop()\n  @Expose()\n  public email: string;\n\n  @prop()\n  @Expose({ groups: ['admin'] })\n  public password: string;\n}\n\nconst AccountModel = getModelForClass(Account);\n")),(0,o.kt)("p",null,"Side-Note: Typegoose doesn't provide a class like ",(0,o.kt)("inlineCode",{parentName:"p"},"DocumentCT")," by default, because this would require adding ",(0,o.kt)("inlineCode",{parentName:"p"},"class-transformer")," as a dependency."),(0,o.kt)("p",null,"You can then use, for example:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"lean()")," on the query:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"// lean return a Plain Old Javascript Object\nconst pojo = await AccountModel.findById(id).orFail().lean().exec();\n// deserialize Plain Old Javascript Object into an instance of the Account class\nconst deserialized = plainToClass(Account, pojo);\n// serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic\nconst serialized = instanceToPlain(deserialized);\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"or a normal document:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"// exec returns a Mongoose Object\nconst mo = await AccountModel.findById(id).orFail().exec();\n// deserialize Mongoose Object into an instance of the Account class\nconst deserialized = plainToClass(Account, mo);\n// serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic\nconst serialized = instanceToPlain(deserialized);\n")))),(0,o.kt)("p",null,"As you can see from these examples, there is:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a redundant step to first turn the output of the query into a full instance of ",(0,o.kt)("inlineCode",{parentName:"li"},"Account")," : ",(0,o.kt)("inlineCode",{parentName:"li"},"plainToClass(..., ...)")),(0,o.kt)("li",{parentName:"ul"},"before being able to benefit from its features for serialization: ",(0,o.kt)("inlineCode",{parentName:"li"},"instanceToPlain(...)"))),(0,o.kt)("p",null,"The reason for doing this is so queries will output ",(0,o.kt)("inlineCode",{parentName:"p"},"DocumentType<Account>")," (Mongoose Document) instead of required ",(0,o.kt)("inlineCode",{parentName:"p"},"Account")," (Plain Object / instance of the Class) in this example."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"class-transformer")," can only operate its magic on instances of annotated classes."),(0,o.kt)("hr",null),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"For more information, you can always look at the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/typegoose/typegoose/blob/master/test/tests/classTransformer.test.ts"},"typegoose ",(0,o.kt)("inlineCode",{parentName:"a"},"class-transformer")," tests")))))}g.isMDXComponent=!0}}]);