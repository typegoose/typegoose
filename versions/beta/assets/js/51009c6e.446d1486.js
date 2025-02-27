"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[3358],{8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>l});var t=s(6540);const o={},i=t.createContext(o);function a(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(i.Provider,{value:n},e.children)}},9504:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"guides/advanced/name-generation","title":"Typegoose\'s Name Generation","description":"In Typegoose the name generation can vary somewhat, this guide will explain all possible ways a name gets generated.","source":"@site/../docs/guides/advanced/name-generation.md","sourceDirName":"guides/advanced","slug":"/guides/advanced/name-generation","permalink":"/typegoose/versions/beta/docs/guides/advanced/name-generation","draft":false,"unlisted":false,"editUrl":"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/guides/advanced/name-generation.md","tags":[],"version":"current","frontMatter":{"id":"name-generation","title":"Typegoose\'s Name Generation"},"sidebar":"guides","previous":{"title":"Nested Discriminators","permalink":"/typegoose/versions/beta/docs/guides/advanced/nested-discriminators"},"next":{"title":"Manual Schema Modification","permalink":"/typegoose/versions/beta/docs/guides/advanced/manual-schema-modification"}}');var o=s(4848),i=s(8453);const a={id:"name-generation",title:"Typegoose's Name Generation"},l=void 0,c={},d=[{value:"Default",id:"default",level:2},{value:"Using with <code>automaticName</code>",id:"using-with-automaticname",level:2},{value:"Using with <code>customName</code>",id:"using-with-customname",level:2},{value:"Using with <code>automaticName</code> and <code>customName</code>",id:"using-with-automaticname-and-customname",level:2},{value:"Simple Matrix",id:"simple-matrix",level:2}];function r(e){const n={a:"a",admonition:"admonition",br:"br",code:"code",h2:"h2",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"In Typegoose the name generation can vary somewhat, this guide will explain all possible ways a name gets generated."}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["This Guide will use the ",(0,o.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/functions/assertions",children:(0,o.jsx)(n.code,{children:"assertion"})})," function that typegoose provides.",(0,o.jsx)(n.br,{}),"\n","TL;DR: This function is basically like NodeJS's ",(0,o.jsx)(n.a,{href:"https://nodejs.org/api/assert.html#assertvalue-message",children:(0,o.jsx)(n.code,{children:"assert"})}),", just more typescript friendly."]})}),"\n",(0,o.jsx)(n.h2,{id:"default",children:"Default"}),"\n",(0,o.jsx)(n.p,{children:"The default, without any options the name that gets generated is the Class Name."}),"\n",(0,o.jsx)(n.p,{children:"Example:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"class SomeClass {\n  @prop()\n  public someProp: string;\n}\n\n// The resulting name will be the class name\nassertion(getName(SomeClass) === 'SomeClass');\n"})}),"\n",(0,o.jsxs)(n.h2,{id:"using-with-automaticname",children:["Using with ",(0,o.jsx)(n.code,{children:"automaticName"})]}),"\n",(0,o.jsxs)(n.p,{children:["When using the option ",(0,o.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/decorators/model-options#automaticname",children:(0,o.jsx)(n.code,{children:"automaticName"})}),", there are multiple cases when having ",(0,o.jsx)(n.code,{children:"collection"})," defined."]}),"\n",(0,o.jsx)(n.p,{children:"Example:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"// Example without having \"collection\" defined\n@modelOptions({ options: { automaticName: true } })\nclass SomeClassWithoutCollection {\n  @prop()\n  public someProp: string;\n}\n\n// The resulting name will be the class name\nassertion(getName(SomeClassWithoutCollection) === 'SomeClassWithoutCollection');\n\n// Example having \"collection\" defined\n@modelOptions({ schemaOptions: { collection: 'someCollection' }, options: { automaticName: true } })\nclass SomeClassWithoutCollection {\n  @prop()\n  public someProp: string;\n}\n\n// The resulting name will be a combination of the class name and the collection\nassertion(getName(SomeClassWithoutCollection) === 'SomeClassWithoutCollection_someCollection');\n"})}),"\n",(0,o.jsxs)(n.h2,{id:"using-with-customname",children:["Using with ",(0,o.jsx)(n.code,{children:"customName"})]}),"\n",(0,o.jsxs)(n.p,{children:["When using the option ",(0,o.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/decorators/model-options#customname",children:(0,o.jsx)(n.code,{children:"customName"})}),", it will be the name that gets generated."]}),"\n",(0,o.jsx)(n.p,{children:"Example:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:'// Example having "customName" statically set\n@modelOptions({ options: { customName: "Hello" } })\nclass SomeClassWithCustomName {\n  @prop()\n  public someProp: string;\n}\n\n// The resulting name will be the statically defined "customName"\nassertion(getName(SomeClassWithCustomName) === \'Hello\');\n\n// Example having "customName" be a function\nlet counter = 0;\n@modelOptions({ options: { customName: () => {\n  counter++;\n  return "Hello" + counter;\n} } })\nclass SomeClassWithCustomNameFunction {\n  @prop()\n  public someProp: string;\n}\n\n// The resulting name will be the generated "customName"\nassertion(getName(SomeClassWithCustomNameFunction) === \'Hello0\');\nassertion(getName(SomeClassWithCustomNameFunction) === \'Hello1\');\n'})}),"\n",(0,o.jsxs)(n.h2,{id:"using-with-automaticname-and-customname",children:["Using with ",(0,o.jsx)(n.code,{children:"automaticName"})," and ",(0,o.jsx)(n.code,{children:"customName"})]}),"\n",(0,o.jsxs)(n.p,{children:["When using option ",(0,o.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/decorators/model-options#automaticname",children:(0,o.jsx)(n.code,{children:"automaticName"})})," and ",(0,o.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/decorators/model-options#customname",children:(0,o.jsx)(n.code,{children:"customName"})})," together, the resulting name will be a combination of the class name and ",(0,o.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/decorators/model-options#customname",children:(0,o.jsx)(n.code,{children:"customName"})}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Example:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:'// Example having "customName" statically set and having "automaticName"\n@modelOptions({ options: { customName: "Hello", automaticName: true } })\nclass SomeClassWithCustomNameAndAutomaticName {\n  @prop()\n  public someProp: string;\n}\n\n// The resulting name will be a combination of the class name and "customName"\nassertion(getName(SomeClassWithCustomNameAndAutomaticName) === \'SomeClassWithCustomNameAndAutomaticName_Hello\');\n'})}),"\n",(0,o.jsx)(n.h2,{id:"simple-matrix",children:"Simple Matrix"}),"\n",(0,o.jsx)(n.p,{children:"This is a simple matrix to show what interacts with what, or also called a Truth Table."}),"\n",(0,o.jsxs)("sub",{children:[(0,o.jsx)("code",{children:"x"})," means it is unset"]}),"\n",(0,o.jsxs)(n.table,{children:[(0,o.jsx)(n.thead,{children:(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.th,{children:"Class name"}),(0,o.jsx)(n.th,{children:"customName"}),(0,o.jsx)(n.th,{children:"automaticName"}),(0,o.jsx)(n.th,{children:"collection"}),(0,o.jsx)(n.th,{children:"Result"})]})}),(0,o.jsxs)(n.tbody,{children:[(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"SomeCollection"'})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"AcustomName"'})}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"AcustomName"'})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"true"})}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"true"})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"SomeCollection"'})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello_SomeCollection"'})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"AcustomName"'})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"true"})}),(0,o.jsx)(n.td,{children:"x"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello_AcustomName"'})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello"'})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"AcustomName"'})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"true"})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"SomeCollection"'})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'"Hello_AcustomName"'})})]})]})]})]})}function m(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(r,{...e})}):r(e)}}}]);