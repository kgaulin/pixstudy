import{r as H}from"./index-4g5l5LRQ.js";import{v as R}from"./index.es-wZgni0xg.js";import"./_commonjsHelpers-4gQjN7DL.js";var E={exports:{}},v={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B=H,C=Symbol.for("react.element"),P=Symbol.for("react.fragment"),A=Object.prototype.hasOwnProperty,F=B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b={key:!0,ref:!0,__self:!0,__source:!0};function O(a,e,m){var r,n={},i=null,l=null;m!==void 0&&(i=""+m),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(l=e.ref);for(r in e)A.call(e,r)&&!b.hasOwnProperty(r)&&(n[r]=e[r]);if(a&&a.defaultProps)for(r in e=a.defaultProps,e)n[r]===void 0&&(n[r]=e[r]);return{$$typeof:C,type:a,key:i,ref:l,props:n,_owner:F.current}}v.Fragment=P;v.jsx=O;v.jsxs=O;E.exports=v;var t=E.exports;const N={title:"Forms/Input",component:R,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:["default","flat"],control:{type:"select"}}}},o={args:{variant:"default"}},s={args:{variant:"flat"}},p={args:{variant:"default",appendIcon:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 -960 960 960",width:"24",children:t.jsx("path",{d:"M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"})})}},c={args:{variant:"default",prependIcon:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 -960 960 960",width:"24",children:t.jsx("path",{d:"M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"})})}},d={args:{variant:"default",onClick:()=>{console.log("Click")},appendIcon:t.jsx("div",{children:"+"})}};var q,u,h;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    variant: "default"
  }
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var g,T,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: "flat"
  }
}`,...(f=(T=s.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};var w,x,_;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: "default",
    appendIcon: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
  }
}`,...(_=(x=p.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};var Z,y,I;c.parameters={...c.parameters,docs:{...(Z=c.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    variant: "default",
    prependIcon: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
  }
}`,...(I=(y=c.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var j,S,k;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: "default",
    onClick: () => {
      console.log("Click");
    },
    appendIcon: <div>+</div>
  }
}`,...(k=(S=d.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};const U=["Default","Flat","AppendIcon","PrependIcon","AppendButton"];export{d as AppendButton,p as AppendIcon,o as Default,s as Flat,c as PrependIcon,U as __namedExportsOrder,N as default};
//# sourceMappingURL=Input.stories-8BtN2pgi.js.map
