"use strict";(self.webpackChunktypegoose_website=self.webpackChunktypegoose_website||[]).push([[3831],{7802:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"api/decorators/model-options","title":"@modelOptions","description":"Typings:","source":"@site/../docs/api/decorators/modelOptions.md","sourceDirName":"api/decorators","slug":"/api/decorators/model-options","permalink":"/typegoose/versions/beta/docs/api/decorators/model-options","draft":false,"unlisted":false,"editUrl":"https://github.com/typegoose/typegoose/edit/beta/docs/../docs/api/decorators/modelOptions.md","tags":[],"version":"current","frontMatter":{"id":"model-options","title":"@modelOptions"},"sidebar":"docs","previous":{"title":"@prop","permalink":"/typegoose/versions/beta/docs/api/decorators/prop"},"next":{"title":"@pre & @post","permalink":"/typegoose/versions/beta/docs/api/decorators/hooks"}}');var i=s(4848),t=s(8453);const l={id:"model-options",title:"@modelOptions"},a=void 0,d={},c=[{value:"IModelOptions",id:"imodeloptions",level:2},{value:"schemaOptions",id:"schemaoptions",level:3},{value:"existingConnection",id:"existingconnection",level:3},{value:"existingMongoose",id:"existingmongoose",level:3},{value:"options",id:"options",level:3},{value:"customName",id:"customname",level:4},{value:"automaticName",id:"automaticname",level:4},{value:"allowMixed",id:"allowmixed",level:4},{value:"enableMergePlugins",id:"enablemergeplugins",level:4},{value:"enableMergeHooks",id:"enablemergehooks",level:4},{value:"disableLowerIndexes",id:"disablelowerindexes",level:4},{value:"discriminators",id:"discriminators",level:4},{value:"disableCaching",id:"disablecaching",level:4}];function r(e){const n={a:"a",admonition:"admonition",br:"br",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Typings:"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"function modelOptions(options: IModelOptions): ClassDecorator\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(n.th,{style:{textAlign:"center"},children:"Type"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,i.jsx)(n.tbody,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"options"})," ",(0,i.jsx)("span",{class:"badge badge--secondary",children:"Required"})]}),(0,i.jsx)(n.td,{style:{textAlign:"center"},children:(0,i.jsx)(n.a,{href:"#imodeloptions",children:(0,i.jsx)(n.code,{children:"IModelOptions"})})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"The Options to add to the Class"})]})})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"@modelOptions"})," is used to set options on a Class."]}),"\n",(0,i.jsx)(n.h2,{id:"imodeloptions",children:"IModelOptions"}),"\n",(0,i.jsx)(n.h3,{id:"schemaoptions",children:"schemaOptions"}),"\n",(0,i.jsxs)(n.p,{children:["Please check the ",(0,i.jsx)(n.a,{href:"https://mongoosejs.com/docs/guide.html#options",children:"Mongoose docs"})," for more info about these options."]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"@modelOptions({ schemaOptions: { collection: 'NotSomething' } })\nclass Something {}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"existingconnection",children:"existingConnection"}),"\n",(0,i.jsxs)(n.p,{children:["An existing Mongoose connection can also be passed down. If given, Typegoose uses this Mongoose instance's ",(0,i.jsx)(n.code,{children:"model"})," methods."]}),"\n",(0,i.jsx)(n.h3,{id:"existingmongoose",children:"existingMongoose"}),"\n",(0,i.jsxs)(n.p,{children:["An existing Mongoose instance can also be passed down. If given, Typegoose uses this Mongoose instance's ",(0,i.jsx)(n.code,{children:"model"})," methods."]}),"\n",(0,i.jsx)(n.h3,{id:"options",children:"options"}),"\n",(0,i.jsx)(n.p,{children:"Typegoose's custom options"}),"\n",(0,i.jsx)(n.h4,{id:"customname",children:"customName"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"customName"})," can be used to set custom model names."]}),"\n",(0,i.jsxs)(n.p,{children:["See also ",(0,i.jsx)(n.a,{href:"/typegoose/versions/beta/docs/guides/advanced/name-generation",children:"Typegoose's Name Generation"})]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"@modelOptions({ options: { customName: 'Something' } })\nclass MultiModel {}\n\nconst model = getModelForClass(MultiModel);\nexpect(model.modelName).to.be.equal('Something');\n"})}),"\n",(0,i.jsxs)(n.p,{children:["You can generate more dynamic names, if ",(0,i.jsx)(n.code,{children:"customName"})," is given a function. The parameter object of the ",(0,i.jsx)(n.code,{children:"modelOptions"})," decorator is injected into the function for possible further use."]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"@modelOptions({\n  schemaOptions: { collection: 'SomethingDifferent' },\n  options: {\n    automaticName: false,\n    customName: (options) => `${options.schemaOptions?.collection}_someSuffix`\n  }\n})\nclass MultiModel {}\n\nconst model = getModelForClass(MultiModel);\nexpect(model.modelName).to.be.equal('SomethingDifferent_someSuffix');\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["If a function is used, ",(0,i.jsx)(n.code,{children:"automaticName"})," will be ignored. Also, if the function doesn't return a string, an error will be thrown."]})}),"\n",(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.code,{children:"customName"})," is used with ",(0,i.jsx)(n.code,{children:"automaticName"}),", it will be a suffix of the class name."]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"@modelOptions({ options: { customName: 'Something', automaticName: true } })\nclass MultiModel {}\n\nconst model = getModelForClass(MultiModel);\nexpect(model.modelName).to.be.equal('MultiModel_Something');\n"})}),"\n",(0,i.jsx)(n.h4,{id:"automaticname",children:"automaticName"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"automaticName"})," can be used to automatically generate custom model names based on ",(0,i.jsx)(n.code,{children:"{ schemaOptions: { collection } }"})," or ",(0,i.jsx)(n.code,{children:"{ options: { customName } }"}),(0,i.jsx)(n.br,{}),"\n","-> ",(0,i.jsx)(n.code,{children:"customName"})," will be prioritized over ",(0,i.jsx)(n.code,{children:"collection"}),(0,i.jsx)(n.br,{}),"\n","-> if ",(0,i.jsx)(n.code,{children:"automaticName"})," is true, ",(0,i.jsx)(n.code,{children:"customName"})," will be a ",(0,i.jsx)(n.em,{children:"suffix"})," of the base class name\n-> if ",(0,i.jsx)(n.code,{children:"automaticName"})," is false, it will behave as if unset"]}),"\n",(0,i.jsxs)(n.p,{children:["See also ",(0,i.jsx)(n.a,{href:"/typegoose/versions/beta/docs/guides/advanced/name-generation",children:"Typegoose's Name Generation"})]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"// yes this is the same example as the one above\n@modelOptions({ options: { customName: 'Something', automaticName: true } })\nclass MultiModel {}\n\nconst model = getModelForClass(MultiModel);\nexpect(model.modelName).to.be.equal('MultiModel_Something');\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:'On request, this was made "opt-in" instead of "opt-out".'})}),"\n",(0,i.jsx)(n.h4,{id:"allowmixed",children:"allowMixed"}),"\n",(0,i.jsx)(n.p,{children:"Set this to a Severity you want."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"ALLOW"}),": allow the use and execution of ",(0,i.jsx)(n.code,{children:"mongoose.Schema.Types.Mixed"}),", if the inferred type cannot be set otherwise"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"WARN"}),": [default] Warn for it in the logger, but still allow the use of it"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"ERROR"}),": Error out when it comes to it"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"enablemergeplugins",children:"enableMergePlugins"}),"\n",(0,i.jsxs)(n.p,{children:["Default: ",(0,i.jsx)(n.code,{children:"false"})]}),"\n",(0,i.jsx)(n.p,{children:'Enable Overwriting of the plugins on the "to-be" discriminator schema with the base schema\'s.'}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsx)(n.p,{children:'This does not actually "merge plugins", it will overwrite the "to-be" discriminator\'s plugins with the base schema\'s!'})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.a,{href:"#enablemergeplugins",children:(0,i.jsx)(n.code,{children:"enableMergePlugins"})})," and ",(0,i.jsx)(n.a,{href:"#enablemergehooks",children:(0,i.jsx)(n.code,{children:"enableMergeHooks"})})," are both ",(0,i.jsx)(n.code,{children:"false"}),", then the global plugins will be automatically applied by typegoose, see ",(0,i.jsx)(n.a,{href:"https://github.com/Automattic/mongoose/issues/12696",children:"Mongoose Issue #12696"}),"."]})}),"\n",(0,i.jsx)(n.h4,{id:"enablemergehooks",children:"enableMergeHooks"}),"\n",(0,i.jsxs)(n.p,{children:["Default: ",(0,i.jsx)(n.code,{children:"false"})]}),"\n",(0,i.jsx)(n.p,{children:"Enable Merging of Hooks."}),"\n",(0,i.jsx)(n.p,{children:"Example of what can be deduplicated:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"// this is a global function and can be de-duplicated, because they are the same reference\nfunction hookTestTimesGlobal() {}\n\nfunction pluginTestTimes(schema) {\n  pluginCount += 1;\n  // the following function cannot be de-duplicated, because they are a new reference each time the plugin gets called\n  schema.pre('save', function hookTestTimesNonGlobal() {});\n  schema.pre('save', hookTestTimesGlobal);\n}\n\n@plugin(pluginTestTimes)\n@modelOptions({\n  options: {\n    enableMergeHooks: true, // needs to be set, because by default typegoose does not need de-duplication\n  },\n})\nclass MergeHooks {\n  @prop()\n  public dummy?: string;\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsx)(n.p,{children:"Only hooks that can be matched against each-other can be de-duplicated."})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.a,{href:"#enablemergeplugins",children:(0,i.jsx)(n.code,{children:"enableMergePlugins"})})," and ",(0,i.jsx)(n.a,{href:"#enablemergehooks",children:(0,i.jsx)(n.code,{children:"enableMergeHooks"})})," are both ",(0,i.jsx)(n.code,{children:"false"}),", then the global plugins will be automatically applied by typegoose, see ",(0,i.jsx)(n.a,{href:"https://github.com/Automattic/mongoose/issues/12696",children:"Mongoose Issue #12696"}),"."]})}),"\n",(0,i.jsx)(n.h4,{id:"disablelowerindexes",children:"disableLowerIndexes"}),"\n",(0,i.jsxs)(n.p,{children:["Default: ",(0,i.jsx)(n.code,{children:"false"})]}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["This option does not get inherited anymore since ",(0,i.jsx)(n.code,{children:"11.7.0"}),"."]})}),"\n",(0,i.jsxs)(n.p,{children:["Disable inheriting lower indexes (still include self), similar to native mongoose ",(0,i.jsx)(n.code,{children:"schema.clone().clearIndexes()"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:'@index({ dummy1: 1 })\nclass IndexInherit5 {\n  @prop()\n  public dummy1?: string;\n}\n\n@index({ dummy2: 1 })\n@modelOptions({ options: { disableLowerIndexes: true } }) // does not inherit index "{ dummy1: 1 }", but will still include "{ dummy2: 1 }"\nclass IndexInherit6 extends IndexInherit5 {\n  @prop()\n  public dummy2?: string;\n}\n\n@index({ dummy3: 1 })\nclass IndexInherit7 extends IndexInherit6 {\n  @prop()\n  public dummy3?: string;\n}\n\nconst sch = buildSchema(IndexInherit7);\n\nconst indexes = sch.indexes();\nassert(indexes.length === 2);\n'})}),"\n",(0,i.jsx)(n.h4,{id:"discriminators",children:"discriminators"}),"\n",(0,i.jsxs)(n.p,{children:["Accepts Type: ",(0,i.jsx)(n.code,{children:"() => [DiscriminatorObject | Class]"})]}),"\n",(0,i.jsxs)(n.p,{children:["Define Nested Discriminators on the base Class directly instead of having to re-define the ",(0,i.jsx)(n.code,{children:"discriminators"})," option everywhere it is used."]}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["A Error is thrown when both this option and the prop-option ",(0,i.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/decorators/prop#discriminators",children:(0,i.jsx)(n.code,{children:"discriminators"})})," are defined.",(0,i.jsx)(n.br,{}),"\n","See ",(0,i.jsx)(n.a,{href:"/typegoose/versions/beta/docs/guides/error-warning-details#duplicate-option-definition-e032",children:"Duplicate Option Definition [E032]"}),"."]})}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"@modelOptions({\n  schemaOptions: {\n    discriminatorKey: 'type'\n  },\n  options: {\n    discriminators: () => [Garage, SummerHouse] // here instead of as a \"prop-option\"\n  }\n})\nclass Building {\n  @prop({ default: 100 })\n  public width: number;\n\n  @prop({ required: true })\n  public type: string;\n}\n\nclass Garage extends Building {\n  @prop({ default: 10 })\n  public slotsForCars: number;\n}\n\nclass SummerHouse extends Building {\n  @prop({ default: 100 })\n  public distanceToLake: number;\n}\n\nclass Area {\n  @prop({ type: Building }) // instead of having to define it here\n  public buildings: Building[];\n}\n\nconst AreaModel = getModelForClass(Area);\n\n// then somewhere in an async function\nconst area = await AreaModel.create({});\narea.buildings.push({ type: getName(SummerHouse), distanceToLake: 100 } as SummerHouse);\narea.buildings.push({ type: getName(Garage), slotsForCars: 20 } as Garage);\nawait area.save();\n"})}),"\n",(0,i.jsxs)(n.p,{children:["See ",(0,i.jsx)(n.a,{href:"/typegoose/versions/beta/docs/guides/advanced/nested-discriminators",children:"Nested Discriminators"})," for a guide on how to use nested Discriminators."]}),"\n",(0,i.jsx)(n.h4,{id:"disablecaching",children:"disableCaching"}),"\n",(0,i.jsxs)(n.p,{children:["Default: ",(0,i.jsx)(n.code,{children:"false"})]}),"\n",(0,i.jsxs)(n.p,{children:["Disable Caching for current Class (and all classes extending it) or for just a call (for ",(0,i.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/functions/build-schema",children:(0,i.jsx)(n.code,{children:"buildSchema"})})," / ",(0,i.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/functions/get-model-for-class",children:(0,i.jsx)(n.code,{children:"getModelForClass"})})," / ",(0,i.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/functions/get-discriminator-model-for-class",children:(0,i.jsx)(n.code,{children:"getDiscriminatorModelForClass"})}),")."]}),"\n",(0,i.jsxs)(n.p,{children:["This Option will NOT overwrite the global ",(0,i.jsx)(n.a,{href:"/typegoose/versions/beta/docs/api/functions/set-global-options#disableglobalcaching",children:(0,i.jsx)(n.code,{children:"disableGlobalCaching"})})," if set."]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:'// some values to keep references\nlet KittenModel1: mongoose.Model<any>;\nlet KittenModel2: mongoose.Model<any>;\nlet KittenClass1: AnyParamConstructor<any>;\nlet KittenClass2: AnyParamConstructor<any>;\n{\n  class Kitten {\n    @prop()\n    public name?: string;\n  }\n\n  KittenModel1 = getModelForClass(Kitten, { options: { disableCaching: true } });\n  KittenClass1 = Kitten;\n}\nassert.ok(getModelWithString(getName(KittenClass1)) === undefined); // caching was disabled locally, so it cannot be found - because it was never added\n{\n  class Kitten {\n    @prop()\n    public nameTag?: string;\n  }\n\n  KittenModel2 = getModelForClass(Kitten, {\n    existingConnection: mongoose.createConnection(),\n  });\n  KittenClass2 = Kitten;\n}\nassert.ok(getModelWithString(getName(KittenClass2))); // caching was enabled, so the second can be found\n\n// the following will return the "KittenModel2" instance, because both classes have the same name but only the second one was added to the caching\n// and caching currently works by (typegoose generated) name\nconst KittenModel3 = getModelForClass(KittenClass1);\n// Note that the above *would* work if "disableCaching" would be defined via a "@modelOptions" decorator, because then caching would also have been disabled here\n\nassert.ok(KittenModel1 !== KittenModel2); // check that both original models do not match, because caching was disabled they are different\n\nassert.ok(KittenModel3 === KittenModel2); // check that "KittenModel3" is the same reference as "KittenModel2", because "KittenClass2" was added with caching and has the same name\n'})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(r,{...e})}):r(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>a});var o=s(6540);const i={},t=o.createContext(i);function l(e){const n=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),o.createElement(t.Provider,{value:n},e.children)}}}]);