"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[7521],{7764:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"api/decorators/searchIndexes","title":"@searchIndex","description":"Typings:","source":"@site/../docs/api/decorators/searchIndexes.md","sourceDirName":"api/decorators","slug":"/api/decorators/searchIndexes","permalink":"/typegoose/versions/beta/docs/api/decorators/searchIndexes","draft":false,"unlisted":false,"editUrl":"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/api/decorators/searchIndexes.md","tags":[],"version":"current","frontMatter":{"id":"searchIndexes","title":"@searchIndex"},"sidebar":"docs","previous":{"title":"@index","permalink":"/typegoose/versions/beta/docs/api/decorators/indexes"},"next":{"title":"@plugin","permalink":"/typegoose/versions/beta/docs/api/decorators/plugin"}}');var r=t(4848),i=t(8453);const o={id:"searchIndexes",title:"@searchIndex"},c=void 0,a={},d=[{value:"Example",id:"example",level:2}];function l(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Typings:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"function searchIndex(description: SearchIndexDescription): ClassDecorator\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(n.th,{style:{textAlign:"center"},children:"Type"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,r.jsx)(n.code,{children:"description"})," ",(0,r.jsx)("span",{class:"badge badge--secondary",children:"Required"})]}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:(0,r.jsx)(n.a,{href:"https://mongodb.github.io/node-mongodb-native/6.5/interfaces/SearchIndexDescription.html",children:(0,r.jsx)(n.code,{children:"SearchIndexDescription"})})}),(0,r.jsx)(n.td,{style:{textAlign:"left"},children:"Description of the search index, including definition and optional name"})]})})]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"@searchIndex"})," is used to set search indices on the schema, this decorator acts\nlike ",(0,r.jsx)(n.a,{href:"https://mongoosejs.com/docs/api/schema.html#Schema.prototype.searchIndex()",children:(0,r.jsx)(n.code,{children:"schema.searchIndex()"})}),"."]}),"\n",(0,r.jsx)(n.admonition,{type:"warning",children:(0,r.jsxs)(n.p,{children:["Search indices are only supported in ",(0,r.jsx)(n.code,{children:"M10"})," (or higher) Mongo Atlas clusters running MongoDB 6.0+ or 7.0+. Full\ndocumentation\ncan be found ",(0,r.jsx)(n.a,{href:"https://www.mongodb.com/docs/atlas/atlas-search/manage-indexes/",children:"here"}),"."]})}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["Because creating a search index can be a very heavy operation, automatic creation of search indices is disabled by\ndefault. To enable automatic creation of search indices,\nthe ",(0,r.jsx)(n.a,{href:"https://mongoosejs.com/docs/guide.html#autoSearchIndex",children:(0,r.jsx)(n.code,{children:"autoSearchIndex"})})," option must be set to ",(0,r.jsx)(n.code,{children:"true"})," in the\nschema options using the ",(0,r.jsx)(n.a,{href:"https://typegoose.github.io/typegoose/docs/api/decorators/model-options",children:(0,r.jsx)(n.code,{children:"@modelOptions"})}),"\ndecorator."]})}),"\n",(0,r.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// static search index that only maps some fields\n@searchIndex({\n  name: 'authorSearch',\n  definition: {\n    mappings: {\n      dynamic: false,\n      fields: {\n        birthday: { type: 'date' },\n        biography: { type: 'string' },\n      },\n    },\n  },\n})\nclass Author {\n  @prop({ required: true })\n  public name!: string;\n\n  @prop({ required: true })\n  public birthday!: Date;\n\n  @prop({ required: true })\n  public biography!: string;\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// dynamic index that maps all fields based on their type\n@searchIndex({ name: 'BookSearch', definition: { dynamic: true } })\nclass Book {\n  @prop({ required: true })\n  public title!: string;\n\n  @prop({ required: true })\n  public author!: Ref<Author>;\n\n  @prop({ required: true })\n  public description!: string;\n\n  @prop({ required: true })\n  public publicationYear!: number;\n}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>c});var s=t(6540);const r={},i=s.createContext(r);function o(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);