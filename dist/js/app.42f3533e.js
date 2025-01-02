(function(){"use strict";var e={8538:function(e,t,n){n.d(t,{GC:function(){return i},M3:function(){return c},Ow:function(){return a},j2:function(){return f},jq:function(){return u},lt:function(){return r},me:function(){return o}});const r="/ocr",o="/me",a="/auth/refresh",i=e=>`/vcf/${e}`,c="/contacts",u=e=>`/contacts/${e}`,f={login:"/auth/login",logout:"/auth/logout"}},348:function(e,t,n){n.d(t,{Jt:function(){return f},NH:function(){return l},bE:function(){return u}});var r=n(4875),o=n(8538);const a="http://localhost:3005",i=r.A.create({baseURL:a});function c(e){const t=localStorage.getItem("token");return t&&(e||(e={}),e.headers||(e.headers={}),e.headers["Authorization"]=`Bearer ${t}`),e}function u(e,t,n){return i.post(e,t,c(n))}function f(e,t){return i.get(e,c(t))}function l(){return f(o.me,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then((e=>console.log(e))).catch((e=>{if(401!==e.response.status)throw localStorage.removeItem("token"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user"),e;u(o.Ow,{refresh_token:localStorage.getItem("refreshToken")}).then((e=>{localStorage.setItem("token",e.data.access_token),localStorage.setItem("refreshToken",e.data.refresh_token)})).catch((e=>{throw console.error(e),localStorage.removeItem("token"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user"),e}))}))}},485:function(e,t,n){var r=n(2432),o=n(6185);function a(e,t){const n=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.Wv)(n)}var i=n(2037);const c={},u=(0,i.A)(c,[["render",a]]);var f=u,l=n(8384);(0,l.k)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var s=n(5438),d=n(348);const h=(e,t,n)=>{localStorage.getItem("token")?(0,d.NH)().then((()=>n())).catch((()=>n({name:"login"}))):n({name:"login"})},m=[{path:"/",name:"welcome",component:()=>n.e(594).then(n.bind(n,6065))},{path:"/app",name:"Home",beforeEnter:h,redirect:{name:"Contacts"},children:[{path:"/capture",name:"Capture",beforeEnter:h,component:()=>n.e(594).then(n.bind(n,6065))},{path:"/contacts",name:"Contacts",beforeEnter:h,component:()=>n.e(594).then(n.bind(n,7442))},{path:"/contacts/:id",name:"Contact Detail",beforeEnter:h,component:()=>n.e(594).then(n.bind(n,5477))},{path:"/profile",name:"Profile",beforeEnter:h,component:()=>n.e(594).then(n.bind(n,7223))}]},{path:"/login",name:"login",component:()=>n.e(594).then(n.bind(n,6308))}],p=(0,s.aE)({history:(0,s.LA)("/"),routes:m});var g=p,v=n(1973),b=(0,v.y$)({state:{},getters:{},mutations:{},actions:{},modules:{}});(0,r.Ef)(f).use(b).use(g).mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],a=e[l][2];for(var c=!0,u=0;u<r.length;u++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(c=!1,a<i&&(i=a));if(c){e.splice(l--,1);var f=o();void 0!==f&&(t=f)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.13be7a8d.js"}}(),function(){n.miniCssF=function(e){return"css/about.582df99e.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="ocr-web-interface:";n.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var c,u;if(void 0!==a)for(var f=document.getElementsByTagName("script"),l=0;l<f.length;l++){var s=f[l];if(s.getAttribute("src")==r||s.getAttribute("data-webpack")==t+a){c=s;break}}c||(u=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.setAttribute("data-webpack",t+a),c.src=r),e[r]=[o];var d=function(t,n){c.onerror=c.onload=null,clearTimeout(h);var o=e[r];if(delete e[r],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(e){return e(n)})),t)return t(n)},h=setTimeout(d.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=d.bind(null,c.onerror),c.onload=d.bind(null,c.onload),u&&document.head.appendChild(c)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,r,o,a){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",n.nc&&(i.nonce=n.nc);var c=function(n){if(i.onerror=i.onload=null,"load"===n.type)o();else{var r=n&&n.type,c=n&&n.target&&n.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+c+")");u.name="ChunkLoadError",u.code="CSS_CHUNK_LOAD_FAILED",u.type=r,u.request=c,i.parentNode&&i.parentNode.removeChild(i),a(u)}};return i.onerror=i.onload=c,i.href=t,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var i=n.miniCssF(r),c=n.p+i;if(t(i,c))return o();e(r,c,null,o,a)}))},o={524:0};n.f.miniCss=function(e,t){var n={594:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={524:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(t),c=new Error,u=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;c.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,o[1](c)}};n.l(i,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],c=r[1],u=r[2],f=0;if(i.some((function(t){return 0!==e[t]}))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(u)var l=u(n)}for(t&&t(r);f<i.length;f++)a=i[f],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},r=self["webpackChunkocr_web_interface"]=self["webpackChunkocr_web_interface"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(485)}));r=n.O(r)})();
//# sourceMappingURL=app.42f3533e.js.map