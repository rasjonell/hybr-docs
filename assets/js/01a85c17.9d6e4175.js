"use strict";(self.webpackChunkhybr_docs=self.webpackChunkhybr_docs||[]).push([[209],{4941:(e,t,s)=>{s.r(t),s.d(t,{default:()=>b});s(6540);var a=s(4164),r=s(539);const l=()=>(0,r.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});var n=s(1082),c=s(204),i=s(569),o=s(3953),g=s(9303);const h={tag:"tag_Nnez"};var u=s(4848);function d(e){let{letterEntry:t}=e;return(0,u.jsxs)("article",{children:[(0,u.jsx)(g.A,{as:"h2",id:t.letter,children:t.letter}),(0,u.jsx)("ul",{className:"padding--none",children:t.tags.map((e=>(0,u.jsx)("li",{className:h.tag,children:(0,u.jsx)(o.A,{...e})},e.permalink)))}),(0,u.jsx)("hr",{})]})}function p(e){let{tags:t}=e;const s=function(e){const t={};return Object.values(e).forEach((e=>{const s=function(e){return e[0].toUpperCase()}(e.label);t[s]??=[],t[s].push(e)})),Object.entries(t).sort(((e,t)=>{let[s]=e,[a]=t;return s.localeCompare(a)})).map((e=>{let[t,s]=e;return{letter:t,tags:s.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}(t);return(0,u.jsx)("section",{className:"margin-vert--lg",children:s.map((e=>(0,u.jsx)(d,{letterEntry:e},e.letter)))})}var j=s(7220);function b(e){let{tags:t,sidebar:s}=e;const r=l();return(0,u.jsxs)(n.e3,{className:(0,a.A)(c.G.wrapper.blogPages,c.G.page.blogTagsListPage),children:[(0,u.jsx)(n.be,{title:r}),(0,u.jsx)(j.A,{tag:"blog_tags_list"}),(0,u.jsxs)(i.A,{sidebar:s,children:[(0,u.jsx)(g.A,{as:"h1",children:r}),(0,u.jsx)(p,{tags:t})]})]})}}}]);