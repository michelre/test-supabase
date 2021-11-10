var M=Object.defineProperty,O=Object.defineProperties;var z=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var F=(a,e,l)=>e in a?M(a,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[e]=l,I=(a,e)=>{for(var l in e||(e={}))x.call(e,l)&&F(a,l,e[l]);if(k)for(var l of k(e))L.call(e,l)&&F(a,l,e[l]);return a},N=(a,e)=>O(a,z(e));import{c as A,r as j,o as S,a as m,b as p,d as n,w as P,v as T,e as V,F as w,f as b,g as U,t as _,h as D}from"./vendor.6f9fe5e6.js";const E=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const d of i)if(d.type==="childList")for(const t of d.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&o(t)}).observe(document,{childList:!0,subtree:!0});function l(i){const d={};return i.integrity&&(d.integrity=i.integrity),i.referrerpolicy&&(d.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?d.credentials="include":i.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(i){if(i.ep)return;i.ep=!0;const d=l(i);fetch(i.href,d)}};E();const J="https://ipxugwdennojamrzukzc.supabase.co",q="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDU0MTUzNCwiZXhwIjoxOTUwMTE3NTM0fQ.IHjQizF6OpddzI4jEvWH07ROBVlq5CV9Nizq4UFZJwE",u=A(J,q);var B=(a,e)=>{for(const[l,o]of e)a[l]=o;return a};const K={setup(){const a=j([]),e=j([]),l=j({name:"",owner:null}),o=async()=>{let{data:s,error:r,status:c}=await u.from("project").select("id, name, profile ( first_name, last_name ), document (id, object_id)");!r&&c===200&&(a.value=s)},i=async()=>{let{data:s,error:r,status:c}=await u.from("profile").select("id, first_name, last_name )");!r&&c===200&&(e.value=s)},d=async()=>{const{data:s,error:r}=await u.from("project").insert(l.value);if(r){console.log(r);return}o()},t=async s=>{const{data:r}=await u.from("document").select("*").match({project_id:s});for(let h in r)await g(s,r[h]);const{data:c,error:y}=await u.from("project").delete().match({id:s});y||o()},f=async(s,r)=>{const c=s.target.files[0],{data:y,error:h}=await u.storage.from("project-files").upload(`${r}/${c.name}`,c,{cacheControl:"3600",upsert:!1});h||(await u.from("document").insert({object_id:y.Key.replace("project-files/",""),project_id:r}),s.target.value=""),C(r)},v=async s=>{const{data:r,error:c}=await u.storage.from("project-files").createSignedUrl(s,60*60);c||window.open(r.signedURL)},g=async(s,r)=>{const{error:c}=await u.storage.from("project-files").remove([r.object_id]);c||(await u.from("document").delete().match({id:r.id}),C(s))},C=async s=>{const{data:r}=await u.from("document").select("*").eq("project_id",s);a.value=a.value.map(c=>c.id===s?N(I({},c),{document:r}):c)};return S(()=>{o(),i()}),{projects:a,owners:e,project:l,addProject:d,deleteProject:t,uploadFile:f,downloadFile:v,deleteFile:g}}},R=["value"],X=n("button",{type:"submit"},"Ajouter le projet",-1),H=n("thead",null,[n("tr",null,[n("th",null,"Nom"),n("th",null,"Porteur"),n("th",null,"Documents"),n("th")])],-1),Q=["onClick"],W=["onClick"],Y=["onChange"],Z=["onClick"];function G(a,e,l,o,i,d){return m(),p("div",null,[n("form",{onSubmit:e[2]||(e[2]=U((...t)=>o.addProject&&o.addProject(...t),["prevent"]))},[P(n("input",{placeholder:"name","onUpdate:modelValue":e[0]||(e[0]=t=>o.project.name=t)},null,512),[[T,o.project.name]]),P(n("select",{"onUpdate:modelValue":e[1]||(e[1]=t=>o.project.owner=t)},[(m(!0),p(w,null,b(o.owners,t=>(m(),p("option",{value:t.id},_(t.first_name)+" "+_(t.last_name),9,R))),256))],512),[[V,o.project.owner]]),X],32),n("table",null,[H,n("tbody",null,[(m(!0),p(w,null,b(o.projects,t=>(m(),p("tr",null,[n("td",null,_(t.name),1),n("td",null,_(t.profile.first_name)+" "+_(t.profile.last_name),1),n("td",null,[n("ul",null,[(m(!0),p(w,null,b(t.document,f=>(m(),p("li",null,[n("a",{href:"",onClick:U(v=>o.downloadFile(f.object_id),["prevent"])},_(f.object_id),9,Q),n("button",{onClick:v=>o.deleteFile(t.id,f)},"X",8,W)]))),256))]),n("input",{type:"file",onChange:f=>o.uploadFile(f,t.id)},null,40,Y)]),n("td",null,[n("button",{onClick:f=>o.deleteProject(t.id)},"Supprimer",8,Z)])]))),256))])])])}var $=B(K,[["render",G]]);D($).mount("#app");
