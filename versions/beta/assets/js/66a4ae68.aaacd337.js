"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[6292],{5680:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>g});var n=a(6540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var u=n.createContext({}),i=function(e){var t=n.useContext(u),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},c=function(e){var t=i(e.components);return n.createElement(u.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=i(a),m=r,g=p["".concat(u,".").concat(m)]||p[m]||d[m]||o;return a?n.createElement(g,l(l({ref:t},c),{},{components:a})):n.createElement(g,l({ref:t},c))}));function g(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=m;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s[p]="string"==typeof e?e:r,l[1]=s;for(var i=2;i<o;i++)l[i]=a[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9365:(e,t,a)=>{a.d(t,{A:()=>l});var n=a(6540),r=a(53);const o={tabItem:"tabItem_Ymn6"};function l(e){let{children:t,hidden:a,className:l}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.A)(o.tabItem,l),hidden:a},t)}},1470:(e,t,a)=>{a.d(t,{A:()=>T});var n=a(8168),r=a(6540),o=a(53),l=a(3104),s=a(6347),u=a(7485),i=a(1682),c=a(9466);function p(e){return function(e){var t,a;return null!=(t=null==(a=r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:a.filter(Boolean))?t:[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function d(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=null!=t?t:p(a);return function(e){const t=(0,i.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:a}=e;const n=(0,s.W6)(),o=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=a?a:null}({queryString:t,groupId:a});return[(0,u.aZ)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(n.location.search);t.set(o,e),n.replace({...n.location,search:t.toString()})}),[o,n])]}function y(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,o=d(e),[l,s]=(0,r.useState)((()=>function(e){var t;let{defaultValue:a,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(a){if(!m({value:a,tabValues:n}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+a+'" but none of its children has the corresponding value. Available values are: '+n.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return a}const r=null!=(t=n.find((e=>e.default)))?t:n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[u,i]=g({queryString:a,groupId:n}),[p,y]=function(e){let{groupId:t}=e;const a=function(e){return e?"docusaurus.tab."+e:null}(t),[n,o]=(0,c.Dv)(a);return[n,(0,r.useCallback)((e=>{a&&o.set(e)}),[a,o])]}({groupId:n}),b=(()=>{const e=null!=u?u:p;return m({value:e,tabValues:o})?e:null})();(0,r.useLayoutEffect)((()=>{b&&s(b)}),[b]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error("Can't select invalid tab value="+e);s(e),i(e),y(e)}),[i,y,o]),tabValues:o}}var b=a(2303);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function h(e){let{className:t,block:a,selectedValue:s,selectValue:u,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,l.a_)(),d=e=>{const t=e.currentTarget,a=c.indexOf(t),n=i[a].value;n!==s&&(p(t),u(n))},m=e=>{var t;let a=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{var n;const t=c.indexOf(e.currentTarget)+1;a=null!=(n=c[t])?n:c[0];break}case"ArrowLeft":{var r;const t=c.indexOf(e.currentTarget)-1;a=null!=(r=c[t])?r:c[c.length-1];break}}null==(t=a)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":a},t)},i.map((e=>{let{value:t,label:a,attributes:l}=e;return r.createElement("li",(0,n.A)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:d},l,{className:(0,o.A)("tabs__item",f.tabItem,null==l?void 0:l.className,{"tabs__item--active":s===t})}),null!=a?a:t)})))}function v(e){let{lazy:t,children:a,selectedValue:n}=e;const o=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function w(e){const t=y(e);return r.createElement("div",{className:(0,o.A)("tabs-container",f.tabList)},r.createElement(h,(0,n.A)({},e,t)),r.createElement(v,(0,n.A)({},e,t)))}function T(e){const t=(0,b.A)();return r.createElement(w,(0,n.A)({key:String(t)},e))}},9082:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>u,default:()=>g,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var n=a(8168),r=(a(6540),a(5680)),o=a(1470),l=a(9365);const s={id:"test",title:"Docusaurus Testing"},u=void 0,i={unversionedId:"test",id:"test",title:"Docusaurus Testing",description:"This file is meant to show what Docusaurus is capable of and how it looks in this projects styles",source:"@site/../docs/test.mdx",sourceDirName:".",slug:"/test",permalink:"/typegoose/versions/beta/docs/test",draft:!1,editUrl:"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/test.mdx",tags:[],version:"current",frontMatter:{id:"test",title:"Docusaurus Testing"}},c={},p=[{value:"Callouts / Admonitions",id:"callouts--admonitions",level:2},{value:"Specify type and title",id:"specify-type-and-title",level:3},{value:"Badges",id:"badges",level:2},{value:"Tabs",id:"tabs",level:2},{value:"Extra Code Block Styling",id:"extra-code-block-styling",level:2}],d={toc:p},m="wrapper";function g(e){let{components:t,...a}=e;return(0,r.yg)(m,(0,n.A)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"This file is meant to show what Docusaurus is capable of and how it looks in this projects styles"),(0,r.yg)("p",null,"Sources:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://docusaurus.io/docs/"},"Docusaurus Documentation")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://infima.dev/docs/getting-started/introduction"},"infima Documentation"))),(0,r.yg)("h2",{id:"callouts--admonitions"},"Callouts / Admonitions"),(0,r.yg)("admonition",{type:"note"},(0,r.yg)("p",{parentName:"admonition"},"The content and title ",(0,r.yg)("em",{parentName:"p"},"can")," include markdown.")),(0,r.yg)("admonition",{title:"You can specify an optional title",type:"tip"},(0,r.yg)("p",{parentName:"admonition"},"Heads up! Here's a pro-tip.")),(0,r.yg)("admonition",{type:"info"},(0,r.yg)("p",{parentName:"admonition"},"Useful information.")),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"Warning! You better pay attention!")),(0,r.yg)("admonition",{type:"danger"},(0,r.yg)("p",{parentName:"admonition"},"Danger danger, mayday!")),(0,r.yg)("h3",{id:"specify-type-and-title"},"Specify type and title"),(0,r.yg)("admonition",{title:"Your Title",type:"note"},(0,r.yg)("p",{parentName:"admonition"},"The content and title ",(0,r.yg)("em",{parentName:"p"},"can")," include markdown.")),(0,r.yg)("h2",{id:"badges"},"Badges"),(0,r.yg)("span",{class:"badge badge--primary"},"Primary"),(0,r.yg)("span",{class:"badge badge--secondary"},"Secondary"),(0,r.yg)("span",{class:"badge badge--success"},"Success"),(0,r.yg)("span",{class:"badge badge--info"},"Info"),(0,r.yg)("span",{class:"badge badge--warning"},"Warning"),(0,r.yg)("span",{class:"badge badge--danger"},"Danger"),(0,r.yg)("h2",{id:"tabs"},"Tabs"),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://docusaurus.io/docs/markdown-features/tabs"},"Tabs")),(0,r.yg)(o.A,{groupId:"test-tabs",mdxType:"Tabs"},(0,r.yg)(l.A,{value:"tab1",label:"Tab 1",default:!0,mdxType:"TabItem"},(0,r.yg)("p",null,"Hello Tab 1, text first"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-txt"},"Code in Tab 1\n"))),(0,r.yg)(l.A,{value:"tab2",label:"Tab 2",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-txt"},"Code in Tab 2\n")),(0,r.yg)("p",null,"Hello Tab 2, text last"))),(0,r.yg)("h2",{id:"extra-code-block-styling"},"Extra Code Block Styling"),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://docusaurus.io/docs/markdown-features/code-blocks"},"Extra Code Block Styling")),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://docusaurus.io/docs/markdown-features/code-blocks#line-highlighting"},"Highlighting lines"),":"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'import something from "some";\n\n// highlight-start\nclass SomeClass {\n  public hello?: string\n}\n// highlight-end\n\nexport SomeClass;\n')),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://docusaurus.io/docs/markdown-features/code-blocks#line-numbering"},"Line Numbering"),":"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts",metastring:"showLineNumbers",showLineNumbers:!0},'import something from "some";\n\nclass SomeClass {\n  public hello?: string\n}\n\nexport SomeClass;\n')),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://docusaurus.io/docs/markdown-features/code-blocks#npm2yarn-remark-plugin"},"Yarn & NPM"),":"),(0,r.yg)(o.A,{groupId:"npm2yarn",mdxType:"Tabs"},(0,r.yg)(l.A,{value:"npm",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"npm install somepackage\n"))),(0,r.yg)(l.A,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"yarn add somepackage\n"))),(0,r.yg)(l.A,{value:"pnpm",label:"pnpm",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"pnpm add somepackage\n")))))}g.isMDXComponent=!0}}]);