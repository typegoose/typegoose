"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[3170],{3905:function(e,t,o){o.d(t,{Zo:function(){return c},kt:function(){return h}});var n=o(7294);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function i(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function r(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,n,a=function(e,t){if(null==e)return{};var o,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)o=i[n],t.indexOf(o)>=0||(a[o]=e[o]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)o=i[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(a[o]=e[o])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):r(r({},t),e)),o},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var o=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(o),h=a,m=u["".concat(l,".").concat(h)]||u[h]||d[h]||i;return o?n.createElement(m,r(r({ref:t},c),{},{components:o})):n.createElement(m,r({ref:t},c))}));function h(e,t){var o=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=o.length,r=new Array(i);r[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,r[1]=s;for(var p=2;p<i;p++)r[p]=o[p];return n.createElement.apply(null,r)}return n.createElement.apply(null,o)}u.displayName="MDXCreateElement"},3925:function(e,t,o){o.r(t),o.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},assets:function(){return c},toc:function(){return d},default:function(){return h}});var n=o(7462),a=o(3366),i=(o(7294),o(3905)),r=["components"],s={id:"faq",title:"FAQ"},l=void 0,p={unversionedId:"guides/faq",id:"guides/faq",title:"FAQ",description:"Repository",source:"@site/../docs/guides/faq.md",sourceDirName:"guides",slug:"/guides/faq",permalink:"/typegoose/docs/guides/faq",editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/faq.md",tags:[],version:"current",frontMatter:{id:"faq",title:"FAQ"},sidebar:"guides",previous:{title:"Quick Start Guide",permalink:"/typegoose/docs/guides/quick-start-guide"},next:{title:"Known Issues",permalink:"/typegoose/docs/guides/known-issues"}},c={},d=[{value:"Repository",id:"repository",level:2},{value:"What happened to the original author?",id:"what-happened-to-the-original-author",level:3},{value:"Is this Project still active?",id:"is-this-project-still-active",level:3},{value:"Why is the package now released in another package?",id:"why-is-the-package-now-released-in-another-package",level:3},{value:"Why @typegoose/typegoose",id:"why-typegoosetypegoose",level:3},{value:"Functional",id:"functional",level:2},{value:"Why does <code>new Model({})</code> not have types?",id:"why-does-new-model-not-have-types",level:3},{value:"Do all Classes get compiled to their own <code>mongoose.Schema</code>?",id:"do-all-classes-get-compiled-to-their-own-mongooseschema",level:3},{value:"Edge Cases",id:"edge-cases",level:2},{value:"I want to the return document with property <code>id</code> instead of <code>_id</code>",id:"i-want-to-the-return-document-with-property-id-instead-of-_id",level:3}],u={toc:d};function h(e){var t=e.components,o=(0,a.Z)(e,r);return(0,i.kt)("wrapper",(0,n.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"repository"},"Repository"),(0,i.kt)("h3",{id:"what-happened-to-the-original-author"},"What happened to the original author?"),(0,i.kt)("p",null,"A: The original author szokodiakos (github name) ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/szokodiakos/typegoose/issues/99#issuecomment-364639150"},"has abandoned the project"),", but might look into it again at some time."),(0,i.kt)("h3",{id:"is-this-project-still-active"},"Is this Project still active?"),(0,i.kt)("p",null,"A: Yes it is, but not on the main repository anymore because of ",(0,i.kt)("a",{parentName:"p",href:"#what-happened-to-the-original-author"},"What happened to the original author?")," and ",(0,i.kt)("a",{parentName:"p",href:"https://help.github.com/en/articles/permission-levels-for-a-user-account-repository"},"Github Permissions")," (TL;DR: a collaborator cannot add another collaborater, only the owner can)"),(0,i.kt)("h3",{id:"why-is-the-package-now-released-in-another-package"},"Why is the package now released in another package?"),(0,i.kt)("p",null,"(context: from ",(0,i.kt)("inlineCode",{parentName:"p"},"typegoose")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"@typegoose/typegoose"),")",(0,i.kt)("br",{parentName:"p"}),"\n","A: Because of a Repository Switch (",(0,i.kt)("a",{parentName:"p",href:"#is-this-project-still-active"},"reasons"),") and because a name cannot be used by multiple packages, except if it is scoped."),(0,i.kt)("h3",{id:"why-typegoosetypegoose"},"Why @typegoose/typegoose"),(0,i.kt)("p",null,"A: Because I (hasezoey) don't have permissions over the old ",(0,i.kt)("inlineCode",{parentName:"p"},"typegoose")," repository and I dont want to touch the old npm package. It is a typical forking and continuation of an OSS project."),(0,i.kt)("h2",{id:"functional"},"Functional"),(0,i.kt)("h3",{id:"why-does-new-model-not-have-types"},"Why does ",(0,i.kt)("inlineCode",{parentName:"h3"},"new Model({})")," not have types?"),(0,i.kt)("p",null,"A: Because Typegoose doesn't modify any Mongoose code, it is still the same as Mongoose's original ",(0,i.kt)("inlineCode",{parentName:"p"},"new Model()"),", you would have to do ",(0,i.kt)("inlineCode",{parentName:"p"},"new Model({} as Class)")," (or sometimes ",(0,i.kt)("inlineCode",{parentName:"p"},"new Model({} as Partial<Class>)"),", because of functions.)"),(0,i.kt)("h3",{id:"do-all-classes-get-compiled-to-their-own-mongooseschema"},"Do all Classes get compiled to their own ",(0,i.kt)("inlineCode",{parentName:"h3"},"mongoose.Schema"),"?"),(0,i.kt)("p",null,"A: Yes, all classes compiled through typegoose (like ",(0,i.kt)("inlineCode",{parentName:"p"},"type: () => SubClass"),", or by reflection) will be their own ",(0,i.kt)("inlineCode",{parentName:"p"},"mongoose.Schema"),"."),(0,i.kt)("p",null,"This means that the following is equal:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'// Native Mongoose\nconst subSchema = new mongoose.Schema({ someprop: { type: String } });\nconst mainSchema = new mongoose.Schema({\n  subDoc: subSchema\n})\n\n// Typegoose\nclass Sub {\n  @prop()\n  public someprop: string;\n}\n\nclass Main {\n  @prop()\n  public subDoc: Sub; // by reflection, not explicitly defining option "type"\n  // OR\n  @prop({ type: () => Sub }) // defining option "type" explicitly\n  public subDoc: Sub;\n}\n')),(0,i.kt)("p",null,"There is also a option to not use sub-classes, called ",(0,i.kt)("a",{parentName:"p",href:"/typegoose/docs/api/decorators/prop#passthrough-class"},"the ",(0,i.kt)("inlineCode",{parentName:"a"},"Passthrough")," class")),(0,i.kt)("h2",{id:"edge-cases"},"Edge Cases"),(0,i.kt)("h3",{id:"i-want-to-the-return-document-with-property-id-instead-of-_id"},"I want to the return document with property ",(0,i.kt)("inlineCode",{parentName:"h3"},"id")," instead of ",(0,i.kt)("inlineCode",{parentName:"h3"},"_id")),(0,i.kt)("p",null,"Mongoose automatically adds a virtual named ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),", use the following for type definitions:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"class Cat {\n  id: mongoose.Types.ObjectId;\n  _id: mongoose.Types.ObjectId;\n}\n")))}h.isMDXComponent=!0}}]);