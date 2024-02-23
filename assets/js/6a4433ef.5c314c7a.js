"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[3055],{5680:(e,t,n)=>{n.d(t,{xA:()=>y,yg:()=>u});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},p=Object.keys(e);for(r=0;r<p.length;r++)n=p[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(r=0;r<p.length;r++)n=p[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},y=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,p=e.originalType,l=e.parentName,y=i(e,["components","mdxType","originalType","parentName"]),d=s(n),g=a,u=d["".concat(l,".").concat(g)]||d[g]||c[g]||p;return n?r.createElement(u,o(o({ref:t},y),{},{components:n})):r.createElement(u,o({ref:t},y))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var p=n.length,o=new Array(p);o[0]=g;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[d]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<p;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},8317:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>p,metadata:()=>i,toc:()=>s});var r=n(8168),a=(n(6540),n(5680));const p={id:"ref-type",title:"Ref<PopulatedType, RawId>"},o=void 0,i={unversionedId:"api/types/ref-type",id:"api/types/ref-type",title:"Ref<PopulatedType, RawId>",description:"Typings:",source:"@site/../docs/api/types/ref-type.md",sourceDirName:"api/types",slug:"/api/types/ref-type",permalink:"/typegoose/docs/api/types/ref-type",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/master/docs/../docs/api/types/ref-type.md",tags:[],version:"current",frontMatter:{id:"ref-type",title:"Ref<PopulatedType, RawId>"},sidebar:"docs",previous:{title:"ReturnModelType<T, QueryHelpers>",permalink:"/typegoose/docs/api/types/return-model-type"},next:{title:"Additional Types",permalink:"/typegoose/docs/api/types/additional-types"}},l={},s=[{value:"Example",id:"example",level:2}],y={toc:s},d="wrapper";function c(e){let{components:t,...n}=e;return(0,a.yg)(d,(0,r.A)({},y,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Typings:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"type Ref<\n  PopulatedType,\n  RawId extends mongoose.RefType = PopulatedType extends { _id?: mongoose.RefType }\n    ? NonNullable<PopulatedType['_id']>\n    : mongoose.Types.ObjectId\n>\n")),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Parameters:")),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,a.yg)("th",{parentName:"tr",align:"center"},"Type"),(0,a.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"PopulatedType")," ",(0,a.yg)("span",{class:"badge badge--secondary"},"Required")),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("inlineCode",{parentName:"td"},"object")),(0,a.yg)("td",{parentName:"tr",align:"left"},"The Type of the what is expected when it is populated")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"RawId")),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("inlineCode",{parentName:"td"},"mongoose.RefType")),(0,a.yg)("td",{parentName:"tr",align:"left"},"Overwrite the Reference type (the type of ",(0,a.yg)("inlineCode",{parentName:"td"},"_id")," of ",(0,a.yg)("inlineCode",{parentName:"td"},"PopulatedType"),")")))),(0,a.yg)("p",null,"The Type ",(0,a.yg)("inlineCode",{parentName:"p"},"Ref<PopulatedType, RawId>")," is the type used for ",(0,a.yg)("a",{parentName:"p",href:"https://mongoosejs.com/docs/populate.html"},"References"),"."),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"PopulatedType"),": This is the Class being referenced."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"RawId"),": This should be the ",(0,a.yg)("inlineCode",{parentName:"li"},"_id")," Type of the referenced Class, by default its ",(0,a.yg)("inlineCode",{parentName:"li"},"mongoose.Types.ObjectId")," and should get automatically inferred if a ",(0,a.yg)("inlineCode",{parentName:"li"},"_id")," property is present on the target class.")),(0,a.yg)("p",null,"There are typeguards to check if a reference is populated or of the reference type:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"/typegoose/docs/api/functions/typeguards/is-document"},(0,a.yg)("inlineCode",{parentName:"a"},"isDocument"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"/typegoose/docs/api/functions/typeguards/is-ref-type"},(0,a.yg)("inlineCode",{parentName:"a"},"isRefType")))),(0,a.yg)("admonition",{type:"tip"},(0,a.yg)("p",{parentName:"admonition"},"For more and better explained examples, look at the ",(0,a.yg)("a",{parentName:"p",href:"/typegoose/docs/guides/advanced/reference-other-classes"},"Reference Other Classes")," Guide.")),(0,a.yg)("h2",{id:"example"},"Example"),(0,a.yg)("p",null,"Class to-be-referenced:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class Kitten {\n  @prop()\n  public name?: string;\n}\n")),(0,a.yg)("p",null,"Single Reference:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class Person {\n  @prop({ ref: () => Kitten })\n  public pet?: Ref<Kitten>;\n}\n")),(0,a.yg)("p",null,"Reference Array:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class Cat {\n  @prop({ ref: () => Kitten })\n  public babies?: Ref<Kitten>[];\n}\n")),(0,a.yg)("p",null,"Reference with different ",(0,a.yg)("inlineCode",{parentName:"p"},"_id")," type:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},'class Kitten {\n  @prop()\n  public _id?: string;\n\n  @prop()\n  public name?: string;\n}\n\n// For Single References\nclass Person {\n  // The "type" options in this case refers to the "_id" type of the referenced class, by default it will be "ObjectId"\n  @prop({ ref: () => Kitten, type: () => String })\n  public pet?: Ref<Kitten, string>;\n}\n\n// For a Array of References\nclass Person {\n  // The "type" options in this case refers to the "_id" type of the referenced class, by default it will be "ObjectId"\n  @prop({ ref: () => Kitten, type: () => String })\n  public pet?: Ref<Kitten, string>[];\n}\n')))}c.isMDXComponent=!0}}]);