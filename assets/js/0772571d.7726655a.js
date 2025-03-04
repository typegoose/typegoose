"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[4768],{3407:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"guides/migration/migrate-12","title":"Migrate to 12.0.0","description":"These are the changes made for 12.0.0 that are breaking or just important to know","source":"@site/../docs/guides/migration/migrate-12.md","sourceDirName":"guides/migration","slug":"/guides/migration/migrate-12","permalink":"/typegoose/docs/guides/migration/migrate-12","draft":false,"unlisted":false,"editUrl":"https://github.com/typegoose/typegoose/edit/master/docs/../docs/guides/migration/migrate-12.md","tags":[],"version":"current","frontMatter":{"id":"migrate-12","title":"Migrate to 12.0.0"},"sidebar":"guides","previous":{"title":"Why overwrite \\"this\\"","permalink":"/typegoose/docs/guides/advanced/overwrite-this"},"next":{"title":"Migrate to 11.0.0","permalink":"/typegoose/docs/guides/migration/migrate-11"}}');var i=s(4848),n=s(8453);const r={id:"migrate-12",title:"Migrate to 12.0.0"},a=void 0,d={},c=[{value:"Requirements changed",id:"requirements-changed",level:2},{value:"TSConfig Target is now <code>es2021</code>",id:"tsconfig-target-is-now-es2021",level:2},{value:"Important typescript decorator note",id:"important-typescript-decorator-note",level:2},{value:"Notes",id:"notes",level:2}];function l(e){const t={a:"a",admonition:"admonition",br:"br",code:"code",em:"em",h2:"h2",li:"li",p:"p",ul:"ul",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"These are the changes made for 12.0.0 that are breaking or just important to know"}),"\n",(0,i.jsx)(t.admonition,{title:"Important, Read this first",type:"warning",children:(0,i.jsxs)(t.p,{children:["This Guide is written for migration from version ",(0,i.jsx)(t.code,{children:"11.7.1"})," to ",(0,i.jsx)(t.code,{children:"12.0.0"}),", for versions ",(0,i.jsx)(t.code,{children:">12.0.0 <13.0.0"}),", please consult the ",(0,i.jsx)(t.a,{href:"https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md",children:"CHANGELOG"})]})}),"\n",(0,i.jsx)(t.h2,{id:"requirements-changed",children:"Requirements changed"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Mongoose ",(0,i.jsx)(t.code,{children:"8.0.1"})," or higher is now required"]}),"\n",(0,i.jsxs)(t.li,{children:["Typescript ",(0,i.jsx)(t.code,{children:"5.2"})," or higher is now required to be used"]}),"\n",(0,i.jsx)(t.li,{children:"NodeJS 16 is now the lowest supported nodejs version"}),"\n"]}),"\n",(0,i.jsxs)(t.h2,{id:"tsconfig-target-is-now-es2021",children:["TSConfig Target is now ",(0,i.jsx)(t.code,{children:"es2021"})]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"tsconfig"})," target has been changed to ",(0,i.jsx)(t.code,{children:"es2021"}),", which also makes the ouput incompatible with anything before NodeJS 16.",(0,i.jsx)(t.br,{}),"\n","This was changed because it outputs less polyfills and makes debugging easier (also bundle size is ",(0,i.jsx)(t.em,{children:"slightly"})," lower)"]}),"\n",(0,i.jsx)(t.h2,{id:"important-typescript-decorator-note",children:"Important typescript decorator note"}),"\n",(0,i.jsx)(t.p,{children:"This section is just a important note, not a change."}),"\n",(0,i.jsxs)(t.p,{children:["Now that typescript 5.2 is the minimal and typescript 5.0 added ES Decorators (and is enabled by default), users may get confusing errors about decorators if ",(0,i.jsx)(t.code,{children:"experimentalDecorators"}),' is not enabled, because typegoose still uses the old "legacy" system and only works with that.']}),"\n",(0,i.jsxs)(t.p,{children:["See ",(0,i.jsx)(t.a,{href:"https://github.com/typegoose/typegoose/issues/861",children:"#861"})," for progress regarding ES Decorator usage."]}),"\n",(0,i.jsx)(t.h2,{id:"notes",children:"Notes"})]})}function h(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>a});var o=s(6540);const i={},n=o.createContext(i);function r(e){const t=o.useContext(n);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(n.Provider,{value:t},e.children)}}}]);