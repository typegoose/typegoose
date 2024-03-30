"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[6169],{5680:(e,t,n)=>{n.d(t,{xA:()=>s,yg:()=>c});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},p=Object.keys(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var y=a.createContext({}),o=function(e){var t=a.useContext(y),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=o(e.components);return a.createElement(y.Provider,{value:t},e.children)},g="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,p=e.originalType,y=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),g=o(n),f=r,c=g["".concat(y,".").concat(f)]||g[f]||d[f]||p;return n?a.createElement(c,i(i({ref:t},s),{},{components:n})):a.createElement(c,i({ref:t},s))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var p=n.length,i=new Array(p);i[0]=f;var l={};for(var y in t)hasOwnProperty.call(t,y)&&(l[y]=t[y]);l.originalType=e,l[g]="string"==typeof e?e:r,i[1]=l;for(var o=2;o<p;o++)i[o]=n[o];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5325:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>y,contentTitle:()=>i,default:()=>d,frontMatter:()=>p,metadata:()=>l,toc:()=>o});var a=n(8168),r=(n(6540),n(5680));const p={id:"is-ref-type",title:"isRefType & isRefTypeArray"},i=void 0,l={unversionedId:"api/functions/typeguards/is-ref-type",id:"api/functions/typeguards/is-ref-type",title:"isRefType & isRefTypeArray",description:"isRefType",source:"@site/../docs/api/functions/typeguards/isRefType.md",sourceDirName:"api/functions/typeguards",slug:"/api/functions/typeguards/is-ref-type",permalink:"/typegoose/versions/beta/docs/api/functions/typeguards/is-ref-type",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/api/functions/typeguards/isRefType.md",tags:[],version:"current",frontMatter:{id:"is-ref-type",title:"isRefType & isRefTypeArray"},sidebar:"docs",previous:{title:"isDocument & isDocumentArray",permalink:"/typegoose/versions/beta/docs/api/functions/typeguards/is-document"},next:{title:"DocumentType<T, QueryHelpers>",permalink:"/typegoose/versions/beta/docs/api/types/document-type"}},y={},o=[{value:"isRefType",id:"isreftype",level:2},{value:"Example",id:"isreftype-example",level:2},{value:"isRefTypeArray",id:"isreftypearray",level:2},{value:"Overload 1",id:"isreftypearray-overload1",level:3},{value:"Overload 2",id:"isreftypearray-overload2",level:3},{value:"Description",id:"isreftypearray-description",level:3},{value:"Example",id:"isreftypearray-example",level:3},{value:"<code>AllowedRefTypes</code>",id:"allowedreftypes",level:2}],s={toc:o},g="wrapper";function d(e){let{components:t,...n}=e;return(0,r.yg)(g,(0,a.A)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"isreftype"},"isRefType"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Typings:")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"function isRefType<T, S extends RefType>(doc: Ref<T, S> | null | undefined, refType: AllowedRefTypes): doc is NonNullable<S>\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Parameters:")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},(0,r.yg)("inlineCode",{parentName:"td"},"doc")," ",(0,r.yg)("span",{class:"badge badge--secondary"},"Required")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"Ref<T, S>")),(0,r.yg)("td",{parentName:"tr",align:"left"},"The Document to check")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},(0,r.yg)("inlineCode",{parentName:"td"},"refType")," ",(0,r.yg)("span",{class:"badge badge--secondary"},"Required")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("a",{parentName:"td",href:"#allowedreftypes"},(0,r.yg)("inlineCode",{parentName:"a"},"AllowedRefTypes"))),(0,r.yg)("td",{parentName:"tr",align:"left"},"The Expected Reference Type to test for")))),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"isRefType")," checks if the given Input (",(0,r.yg)("inlineCode",{parentName:"p"},"doc"),") is of the given Type (",(0,r.yg)("inlineCode",{parentName:"p"},"refType"),").",(0,r.yg)("br",{parentName:"p"}),"\n","Option ",(0,r.yg)("inlineCode",{parentName:"p"},"refType")," is required because the known Reference Type only exists at compile time, not at runtime so it needs to be explicitly defined (to have accurate checks)."),(0,r.yg)("h2",{id:"isreftype-example"},"Example"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'class Cat {\n  @prop({ ref: \'Cat\' })\n  public partner: Ref<Cat>;\n\n  // this example could be smaller, but for demonstation purposes this is a longer version\n  public hasPartner(): boolean {\n    if (isRefType(this.partner, mongoose.Types.ObjectId)) {\n      // "this.partner" now has the type of "Cat._id"\'s RefType (in this case "ObjectId")\n      return true;\n    } else {\n      return false;\n    }\n  }\n}\n')),(0,r.yg)("p",null,"-> this could be minified, but for demonstration purposes this will stay the long version"),(0,r.yg)("h2",{id:"isreftypearray"},"isRefTypeArray"),(0,r.yg)("h3",{id:"isreftypearray-overload1"},"Overload 1"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Typings:")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"function isRefTypeArray<T, S extends RefType>(\n  docs: mongoose.Types.Array<Ref<T, S>> | undefined,\n  refType: AllowedRefTypes\n): docs is mongoose.Types.Array<NonNullable<S>>;\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Parameters:")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},(0,r.yg)("inlineCode",{parentName:"td"},"docs")," ",(0,r.yg)("span",{class:"badge badge--secondary"},"Required")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"mongoose.Types.Array<Ref<T, S>>")),(0,r.yg)("td",{parentName:"tr",align:"left"},"The Array of Documents to check")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},(0,r.yg)("inlineCode",{parentName:"td"},"refType")," ",(0,r.yg)("span",{class:"badge badge--secondary"},"Required")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("a",{parentName:"td",href:"#allowedreftypes"},(0,r.yg)("inlineCode",{parentName:"a"},"AllowedRefTypes"))),(0,r.yg)("td",{parentName:"tr",align:"left"},"The Expected Reference Type to test for")))),(0,r.yg)("h3",{id:"isreftypearray-overload2"},"Overload 2"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Typings:")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"function isRefTypeArray<T, S extends RefType>(docs: Ref<T, S>[] | undefined, refType: AllowedRefTypes): docs is NonNullable<S>[];\n")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Parameters:")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Type"),(0,r.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},(0,r.yg)("inlineCode",{parentName:"td"},"docs")," ",(0,r.yg)("span",{class:"badge badge--secondary"},"Required")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"Ref<T, S>[]")),(0,r.yg)("td",{parentName:"tr",align:"left"},"The Array of Documents to check")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"left"},(0,r.yg)("inlineCode",{parentName:"td"},"refType")," ",(0,r.yg)("span",{class:"badge badge--secondary"},"Required")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("a",{parentName:"td",href:"#allowedreftypes"},(0,r.yg)("inlineCode",{parentName:"a"},"AllowedRefTypes"))),(0,r.yg)("td",{parentName:"tr",align:"left"},"The Expected Reference Type to test for")))),(0,r.yg)("h3",{id:"isreftypearray-description"},"Description"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"isRefTypeArray")," checks if ",(0,r.yg)("strong",{parentName:"p"},"all")," the items in the given Array (",(0,r.yg)("inlineCode",{parentName:"p"},"docs"),") are matching the given Reference type (",(0,r.yg)("inlineCode",{parentName:"p"},"refType"),").",(0,r.yg)("br",{parentName:"p"}),"\n","This function calls ",(0,r.yg)("a",{parentName:"p",href:"#isreftype"},(0,r.yg)("inlineCode",{parentName:"a"},"isRefType"))," for each item in the array.",(0,r.yg)("br",{parentName:"p"}),"\n","Only returns ",(0,r.yg)("inlineCode",{parentName:"p"},"true")," if ",(0,r.yg)("strong",{parentName:"p"},"all")," items in the array return ",(0,r.yg)("inlineCode",{parentName:"p"},"true"),"."),(0,r.yg)("h3",{id:"isreftypearray-example"},"Example"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'class Cat {\n  @prop({ ref: \'Cat\' })\n  public kittens: Ref<Cat>;\n\n  // this example could be smaller, but for demonstation purposes this is a longer version\n  public areAllKittensExisting(): boolean {\n    if (isRefTypeArray(this.kittens, mongoose.Types.ObjectId)) {\n      // "this.kittens" now has the type of "Cat._id"\'s RefType (in this case "ObjectId")\n      return true;\n    } else {\n      return false;\n    }\n  }\n}\n')),(0,r.yg)("h2",{id:"allowedreftypes"},(0,r.yg)("inlineCode",{parentName:"h2"},"AllowedRefTypes")),(0,r.yg)("p",null,"The Allowed Reference Types for ",(0,r.yg)("inlineCode",{parentName:"p"},"isRefType")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"isRefTypeArray")," are:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"String")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"Number")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"Buffer")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"mongoose.Types.Buffer")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"mongoose.Types.ObjectId"))))}d.isMDXComponent=!0}}]);