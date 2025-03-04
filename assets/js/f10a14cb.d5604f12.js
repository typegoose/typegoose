"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[6957],{4711:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"api/virtuals","title":"Virtuals","description":"get & set","source":"@site/../docs/api/virtuals.md","sourceDirName":"api","slug":"/api/virtuals","permalink":"/typegoose/docs/api/virtuals","draft":false,"unlisted":false,"editUrl":"https://github.com/typegoose/typegoose/edit/master/docs/../docs/api/virtuals.md","tags":[],"version":"current","frontMatter":{"id":"virtuals","title":"Virtuals"},"sidebar":"docs","previous":{"title":"Index of Manual-Documentation","permalink":"/typegoose/docs/api/index-api"},"next":{"title":"Environment Variables","permalink":"/typegoose/docs/api/environment-variables"}}');var r=t(4848),i=t(8453);const o={id:"virtuals",title:"Virtuals"},a=void 0,l={},c=[{value:"get &amp; set",id:"get--set",level:2},{value:"Difference between @prop&#39;s get &amp; set and this get &amp; set",id:"difference-between-props-get--set-and-this-get--set",level:3},{value:"Virtual Populate",id:"virtual-populate",level:2},{value:"Extra Notes",id:"extra-notes",level:2},{value:"Why is my virtual not included in the output?",id:"why-is-my-virtual-not-included-in-the-output",level:3}];function d(e){const n={a:"a",admonition:"admonition",br:"br",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"get--set",children:"get & set"}),"\n",(0,r.jsxs)(n.p,{children:["Mongoose offers developers the option to create ",(0,r.jsx)(n.a,{href:"http://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual",children:"virtual properties"}),". As virtual properties, they are just 'calculated properties', meaning, there are no actual reads or writes to the database.",(0,r.jsx)("br",{}),"\nA virtual property can have a setter and a getter. ES6 Classes have ",(0,r.jsx)(n.code,{children:"get"})," & ",(0,r.jsx)(n.code,{children:"set"})," functions, which Mongoose uses for virtual property definitions (no Typegoose decorator can be used on them, because they are handled directly by Mongoose)."]}),"\n",(0,r.jsx)(n.admonition,{type:"warning",children:(0,r.jsxs)(n.p,{children:["Do not confuse this ",(0,r.jsx)(n.code,{children:"get"})," & ",(0,r.jsx)(n.code,{children:"set"})," with ",(0,r.jsxs)(n.a,{href:"/typegoose/docs/api/decorators/prop#get--set",children:[(0,r.jsx)(n.code,{children:"@prop"}),"'s ",(0,r.jsx)(n.code,{children:"get"})," & ",(0,r.jsx)(n.code,{children:"set"})]})]})}),"\n",(0,r.jsx)(n.admonition,{type:"warning",children:(0,r.jsxs)(n.p,{children:["No Typegoose decorator can be used on ",(0,r.jsx)(n.code,{children:"get"})," & ",(0,r.jsx)(n.code,{children:"set"})," functions, because they are directly handled by Mongoose."]})}),"\n",(0,r.jsx)(n.p,{children:"Example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"class Name {\n  @prop()\n  public firstName?: string;\n\n  @prop()\n  public lastName?: string;\n\n  // this will create a virtual property called 'fullName'\n  public get fullName() {\n    return `${this.firstName} ${this.lastName}`;\n  }\n  public set fullName(full) {\n    const [firstName, lastName] = full.split(' ');\n    this.firstName = firstName;\n    this.lastName = lastName;\n  }\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"Resulting Document in MongoDB:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"{\n  _id: ObjectId('<some long id>'),\n  firstName: 'Will',\n  lastName: 'Smith'\n}\n"})}),"\n",(0,r.jsx)(n.h3,{id:"difference-between-props-get--set-and-this-get--set",children:"Difference between @prop's get & set and this get & set"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsxs)(n.em,{children:["This shows the difference between ",(0,r.jsxs)(n.a,{href:"/typegoose/docs/api/decorators/prop#get--set",children:[(0,r.jsx)(n.code,{children:"@prop"}),"'s get & set"]})," and ",(0,r.jsx)(n.a,{href:"#get--set",children:"this one"})]})}),"\n",(0,r.jsxs)(n.p,{children:["The difference between ",(0,r.jsx)(n.code,{children:"@prop"}),"'s and this one is simple, ",(0,r.jsx)(n.code,{children:"@prop"}),"'s get & set are ",(0,r.jsx)(n.em,{children:(0,r.jsx)(n.strong,{children:"actual properties"})})," that get saved to the database, only with a conversion layer.",(0,r.jsx)(n.br,{}),"\n","The get & set of ",(0,r.jsx)(n.em,{children:"getter's & setter's"})," are absolutely virtual."]}),"\n",(0,r.jsx)(n.h2,{id:"virtual-populate",children:"Virtual Populate"}),"\n",(0,r.jsx)(n.p,{children:"Virtual-Populate is also supported by Typegoose"}),"\n",(0,r.jsxs)(n.p,{children:["Options (",(0,r.jsx)(n.a,{href:"https://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual",children:"look here for more details"}),"):"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"ref"}),": This is like a normal ",(0,r.jsx)(n.a,{href:"https://typegoose.github.io/typegoose/docs/api/decorators/prop/#ref",children:"ref"}),", use ",(0,r.jsx)(n.code,{children:"'ClassName'"})," when the classes are in different files ",(0,r.jsx)("span",{class:"badge badge--secondary",children:"Required"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"foreignField"}),": Which property(on the ref-Class) to match ",(0,r.jsx)(n.code,{children:"localField"})," against ",(0,r.jsx)("span",{class:"badge badge--secondary",children:"Required"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"localField"}),": Which property(on the current-Class) to match ",(0,r.jsx)(n.code,{children:"foreignField"})," against ",(0,r.jsx)("span",{class:"badge badge--secondary",children:"Required"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"justOne"}),": Return as One Document(true) or as Array(false) ",(0,r.jsx)(n.em,{children:(0,r.jsx)(n.strong,{children:"[Optional]"})})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"count"}),": Return the number of Documents found instead of the actual Documents ",(0,r.jsx)(n.em,{children:(0,r.jsx)(n.strong,{children:"[Optional]"})})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"options"}),": Extra Query Options ",(0,r.jsx)(n.em,{children:(0,r.jsx)(n.strong,{children:"[Optional]"})})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"match"}),": Extra Match Options ",(0,r.jsx)(n.em,{children:(0,r.jsx)(n.strong,{children:"[Optional]"})})]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Example: for an array"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"class Kittens {\n  @prop({ required: true, ref: () => Cat ) }) // providing the type deferred\n  public parent: Ref<Cat>;\n}\n\nclass Cat {\n  @prop({\n    ref: () => Kittens,\n    foreignField: 'parent', // compare this value to the document populate is called on\n    localField: '_id' // compare this to the foreign document's value defined in \"foreignField\"\n  })\n  public kittens: Ref<Kittens>[];\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"Example: for only one document"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// I couldn't think of a real use case example\nclass Sub {\n  @prop({ required: true, ref: () => Parent }) // providing the type deferred\n  public parent: Ref<Parent>;\n}\n\nclass Parent {\n  @prop({\n    ref: () => Sub,\n    foreignField: 'parent',\n    localField: '_id',\n    justOne: true // when this is not set to \"true\", mongoose will always return a Array\n  })\n  public one: Ref<Sub>;\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Example (since typegoose 7.4): dynamic ",(0,r.jsx)(n.code,{children:"ref"}),", ",(0,r.jsx)(n.code,{children:"localField"})," and ",(0,r.jsx)(n.code,{children:"foreignField"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"class Sub {\n  @prop({ required: true })\n  public parentId!: mongoose.Types.ObjectId;\n}\nclass Parent {\n  @prop({\n    ref: () => (doc: DocumentType<Parent>) => doc.from, // This need to be written this way, because since typegoose \"7.1\", deferred function are supported\n    foreignField: () => 'parentId', // no \"doc\" parameter provided here\n    localField: (doc: DocumentType<Parent>) => doc.local,\n    justOne: false\n  })\n  public nested?: Ref<Sub>[];\n\n  @prop({ required: true })\n  public local!: string;\n\n  @prop({ required: true })\n  public from!: string;\n}\n\n// later in some async code\nconst parent = await ParentModel.create({ local: '_id', from: getName(Sub) });\nawait SubModel.create({ parentId: parent._id });\n"})}),"\n",(0,r.jsx)(n.h2,{id:"extra-notes",children:"Extra Notes"}),"\n",(0,r.jsx)(n.h3,{id:"why-is-my-virtual-not-included-in-the-output",children:"Why is my virtual not included in the output?"}),"\n",(0,r.jsxs)(n.p,{children:["By default Mongoose doesn't output virtuals. To achieve this, you need to add ",(0,r.jsx)(n.code,{children:"toObject"})," and(/or) ",(0,r.jsx)(n.code,{children:"toJSON"})," to ",(0,r.jsx)(n.code,{children:"schemaOptions"})," in ",(0,r.jsx)(n.code,{children:"@modelOptions"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Note: it can be set in ",(0,r.jsx)(n.code,{children:"@modelOptions"}),", but it can be set in ",(0,r.jsx)(n.code,{children:"getModelForClass"})," too (and in the ",(0,r.jsx)(n.code,{children:"doc.toJSON()"}),"/",(0,r.jsx)(n.code,{children:"doc.toObject()"})," functions)."]}),"\n",(0,r.jsx)(n.p,{children:"Example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"class Sub {}\n\n@modelOptions({\n  schemaOptions: {\n    toJSON: { virtuals: true },\n    toObject: { virtuals: true }\n  }\n})\nclass Parent {\n  @prop({\n    ref: Sub,\n    foreignField: 'parent',\n    localField: '_id',\n    justOne: true\n  })\n  public one: Ref<Sub>;\n}\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsx)(n.p,{children:"These options will be applied to all classes which inherit the class that got the options applied."})})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var s=t(6540);const r={},i=s.createContext(r);function o(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);