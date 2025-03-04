"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[1752],{5492:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>d,metadata:()=>n,toc:()=>o});const n=JSON.parse('{"id":"guides/default-classes","title":"Default Classes","description":"This Guide contains all default classes Typegoose provides.","source":"@site/../docs/guides/defaultClasses.md","sourceDirName":"guides","slug":"/guides/default-classes","permalink":"/typegoose/docs/guides/default-classes","draft":false,"unlisted":false,"editUrl":"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/defaultClasses.md","tags":[],"version":"current","frontMatter":{"id":"default-classes","title":"Default Classes"},"sidebar":"guides","previous":{"title":"Motivation","permalink":"/typegoose/docs/guides/motivation"},"next":{"title":"Nesting Classes","permalink":"/typegoose/docs/guides/nesting-classes"}}');var i=t(4848),l=t(8453);const d={id:"default-classes",title:"Default Classes"},r=void 0,c={},o=[{value:"TimeStamps",id:"timestamps",level:3},{value:"Base",id:"base",level:3},{value:"Extra information",id:"extra-information",level:2},{value:"Use multiple classes together",id:"use-multiple-classes-together",level:3}];function a(e){const s={admonition:"admonition",br:"br",code:"code",em:"em",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.p,{children:"This Guide contains all default classes Typegoose provides."}),"\n",(0,i.jsx)(s.admonition,{type:"note",children:(0,i.jsx)(s.p,{children:"All properties provided are just types to show which are available from Mongoose, or stated otherwise."})}),"\n",(0,i.jsx)(s.h3,{id:"timestamps",children:"TimeStamps"}),"\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"TimeStamps"})," class provides the following fields:"]}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"center"},children:"Field Name"}),(0,i.jsx)(s.th,{style:{textAlign:"center"},children:"Type"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"createdAt"})}),(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"Date"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"updatedAt"})}),(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"Date"})})]})]})]}),"\n",(0,i.jsxs)(s.p,{children:["And also applies the following ",(0,i.jsx)(s.code,{children:"schemaOptions"}),":"]}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"center"},children:"Field Name"}),(0,i.jsx)(s.th,{style:{textAlign:"center"},children:"Value"})]})}),(0,i.jsx)(s.tbody,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"timestamps"})}),(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"true"})})]})})]}),"\n",(0,i.jsx)(s.h3,{id:"base",children:"Base"}),"\n",(0,i.jsxs)(s.p,{children:["The Base ",(0,i.jsx)(s.em,{children:"Interface"})," provides the following fields:"]}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"center"},children:"Field Name"}),(0,i.jsx)(s.th,{style:{textAlign:"center"},children:"Type"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"_id"})}),(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"mongoose.Types.ObjectId"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"id"})}),(0,i.jsx)(s.td,{style:{textAlign:"center"},children:(0,i.jsx)(s.code,{children:"string"})})]})]})]}),"\n",(0,i.jsxs)(s.p,{children:["How to override ",(0,i.jsx)(s.code,{children:"_id"})," type:",(0,i.jsx)(s.br,{}),"\n",(0,i.jsx)("sub",{children:"This only works with typegoose 6.0.2+"})]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-ts",children:'interface Something extends Base {} // have the interface to add the types of "Base" to the class\nclass Something {} // have your class, OR\nclass Something extends TimeStamps {} // have your class extend some other class\n'})}),"\n",(0,i.jsx)(s.h2,{id:"extra-information",children:"Extra information"}),"\n",(0,i.jsx)(s.h3,{id:"use-multiple-classes-together",children:"Use multiple classes together"}),"\n",(0,i.jsx)(s.p,{children:"Because Typescript & JavaScript don't have functions for multiple inheritance, it can only be achieved by the following"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-ts",children:'interface Something extends Base {} // have the interface to add the types of "Base" to the class\nclass Something extends TimeStamps {} // have your class\n'})}),"\n",(0,i.jsx)(s.admonition,{type:"note",children:(0,i.jsxs)(s.p,{children:["This only works because ",(0,i.jsx)(s.code,{children:"Base"})," only has types and does not modify anything."]})})]})}function h(e={}){const{wrapper:s}={...(0,l.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},8453:(e,s,t)=>{t.d(s,{R:()=>d,x:()=>r});var n=t(6540);const i={},l=n.createContext(i);function d(e){const s=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),n.createElement(l.Provider,{value:s},e.children)}}}]);