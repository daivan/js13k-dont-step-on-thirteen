(()=>{"use strict";var t,i,e,s,h={961:(t,i,e)=>{e.d(i,{A:()=>o});var s=e(251);let h=document.createElement("canvas");h.width=576,h.height=576;let r=h.getContext("2d");function n(t){for(let o=0;o<t;o++)i=Math.random()*h.width,e=Math.random()*h.height,s=2*Math.random(),n=Math.random(),r.beginPath(),r.arc(i,e,s,0,2*Math.PI),r.fillStyle=`rgba(255, 255, 255, ${n})`,r.fill();var i,e,s,n;return h}r.fillStyle="black",r.fillRect(0,0,h.width,h.height);class o{constructor(t){this.sprite=t,this.columnTexts=[],this.numberOfColumns=8,this.horizontalNumbers=[],this.verticalNumbers=[],this.populateNumbers(),this.horizontalTexts=[],this.verticalTexts=[],this.updateNumberTexts(),this.grid=this.createGrid(t),this.background=this.createBackground()}populateNumbers(){for(let t=0;t<this.numberOfColumns;t++)this.horizontalNumbers.push(Math.floor(9*Math.random())+1),this.verticalNumbers.push(Math.floor(9*Math.random())+1)}updateNumberTexts(){for(let t=0;t<this.numberOfColumns;t++){const i=64,e=5;this.horizontalTexts.push(new s.EY({text:this.horizontalNumbers[t].toString(),font:"20px Arial",color:"white",x:64*t+i/2-e+i,y:i/2-2*e})),this.verticalTexts.push(new s.EY({text:this.verticalNumbers[t].toString(),font:"20px Arial",color:"white",x:i/2-e,y:64*t+i/2-2*e+64}))}}createGrid(t){return(0,s.kx)({x:0,y:0,image:t,render:function(){const t=64,i=["#e78ea799","#000000"];for(let e=0;e<8;e++)for(let s=0;s<8;s++){const h=s*t,r=e*t,n=(e+s)%i.length;if(0==n){const e=i[n];this.context.fillStyle=e,this.context.fillRect(h,r,t,t),this.context.drawImage(this.image,h,r,t,t)}}}})}createBackground(){return(0,s.kx)({x:0,y:0,image:n(500)})}update(t){}render(){this.background.render(),this.grid.render(),this.horizontalTexts.forEach((t=>t.render())),this.verticalTexts.forEach((t=>t.render()))}}},603:(t,i,e)=>{e.d(i,{A:()=>h});var s=e(251);(0,s.an)();class h extends s.Sm{constructor(t,i,e){super(e),this.sprite=t,this.gameArea=i,this.goalSprite=(0,s.kx)({x:64*Math.floor(7*Math.random())+64,y:64*Math.floor(7*Math.random())+64,width:64,height:64,color:"#9fd7ddcc"}),this.playerSprite=(0,s.kx)({x:300,y:300,velocity:{x:0,y:0},direction:{x:0,y:0},anchor:{x:.5,y:.5},speed:2,size:36,customImage:this.sprite,render(){const t=this.context.createRadialGradient(0,0,0,0,0,1.2*this.size);t.addColorStop(0,"#9fd7ddff"),t.addColorStop(1,"#9fd7dd00"),this.context.fillStyle=t,this.context.beginPath(),this.context.arc(0,0,1.2*this.size,0,2*Math.PI),this.context.fill(),this.context.drawImage(this.customImage,36,4,24,24,-this.size/2,-this.size/2,this.size,this.size),this.context.drawImage(this.customImage,4,4,24,24,-this.size/2+2*this.direction.x,-this.size/2+2*this.direction.y,this.size,this.size)},update(t,i){this.direction.x=0,this.direction.y=0,(0,s._l)("w")&&(this.direction.y=-1),(0,s._l)("s")&&(this.direction.y=1),(0,s._l)("a")&&(this.direction.x=-1),(0,s._l)("d")&&(this.direction.x=1),this.velocity.x=this.direction.x*this.speed,this.velocity.y=this.direction.y*this.speed,0!==this.velocity.x&&0!==this.velocity.y&&(this.velocity.x/=Math.sqrt(2),this.velocity.y/=Math.sqrt(2)),this.x+=this.velocity.x,this.y+=this.velocity.y,this.x<64+this.size/2&&(this.x=64+this.size/2),this.x>512-this.size/2&&(this.x=512-this.size/2),this.y<64+this.size/2&&(this.y=64+this.size/2),this.y>512-this.size/2&&(this.y=512-this.size/2)}})}score=0;scoreText=new s.EY({text:this.score,font:"20px Arial",color:"white",x:155,y:549});rowText=new s.EY({text:this.rowNumber,font:"20px Arial",color:"white",x:219,y:549});columnText=new s.EY({text:this.columnNumber,font:"20px Arial",color:"white",x:283,y:549});summaryText=new s.EY({text:0,font:"20px Arial",color:"white",x:347,y:549});updateNumbers(){this.rowNumber=Math.floor(this.playerSprite.y/64)-1,this.columnNumber=Math.floor(this.playerSprite.x/64)-1,this.rowText.text=this.gameArea.verticalNumbers[this.rowNumber],this.columnText.text=this.gameArea.horizontalNumbers[this.columnNumber],this.summaryText.text=this.gameArea.verticalNumbers[this.rowNumber]+this.gameArea.horizontalNumbers[this.columnNumber]}update(t){this.playerSprite.update(),this.updateNumbers(),this.rowText.update(),this.columnText.update(),(0,s.MS)(this.playerSprite,this.goalSprite)&&(this.score=this.score+1,this.goalSprite.x=64*Math.floor(7*Math.random())+64,this.goalSprite.y=64*Math.floor(7*Math.random())+64),this.scoreText.text=this.score}render(){this.goalSprite.render(),this.playerSprite.render(),this.rowText.render(),this.columnText.render(),this.summaryText.render(),this.scoreText.render()}}},44:(t,i,e)=>{e.a(t,(async(t,i)=>{try{var s=e(251),h=e(603),r=e(961);let{canvas:t,context:n}=(0,s.Ts)();t.width=576,t.height=576;const o=await(0,s.Hh)("sprites2.png","square.png");let a=new r.A(o[1]),c=new h.A(o[0],a);(0,s.$7)({update:function(t){c.update(t)},render:function(){c.gameArea.render(),c.render()}}).start(),i()}catch(t){i(t)}}),1)},251:(t,i,e)=>{function s(t,i,e){return Math.min(Math.max(t,e),i)}function h(t,i){let e=r(t),s=r(i);return!(t.radius&&e.width!=e.height||i.radius&&s.width!=s.height)&&([e,s]=[e,s].map((s=>((s==e?t:i).radius&&(s.radius=s.width/2,s.x+=s.radius,s.y+=s.radius),s))),t.radius&&i.radius?Math.hypot(e.x-s.x,e.y-s.y)<e.radius+s.radius:t.radius||i.radius?function(t,i){let{x:e,y:s,width:h,height:n}=r(i);do{e-=i.sx||0,s-=i.sy||0}while(i=i.parent);let o=t.x-Math.max(e,Math.min(t.x,e+h)),a=t.y-Math.max(s,Math.min(t.y,s+n));return o*o+a*a<t.radius*t.radius}(t.radius?e:s,t.radius?i:t):e.x<s.x+s.width&&e.x+e.width>s.x&&e.y<s.y+s.height&&e.y+e.height>s.y)}function r(t){let{x:i=0,y:e=0,width:s,height:h,radius:r}=t.world||t;return t.mapwidth&&(s=t.mapwidth,h=t.mapheight),r&&(s=2*r.x,h=2*r.y),t.anchor&&(i-=s*t.anchor.x,e-=h*t.anchor.y),s<0&&(i+=s,s*=-1),h<0&&(e+=h,h*=-1),{x:i,y:e,width:s,height:h}}e.d(i,{$7:()=>$,EY:()=>O,Hh:()=>P,MS:()=>h,Sm:()=>L,Ts:()=>p,_l:()=>V,an:()=>Q,kx:()=>H});let n=()=>{};let o,a,c={};function d(t,i){c[t]=c[t]||[],c[t].push(i)}function l(t,...i){(c[t]||[]).map((t=>t(...i)))}let u={get:(t,i)=>"_proxy"==i||n};function x(){return a}function p(t,{contextless:i=!1}={}){if(o=document.getElementById(t)||t||document.querySelector("canvas"),i&&(o=o||new Proxy({},u)),!o)throw Error("You must provide a canvas element for the game");return a=o.getContext("2d")||new Proxy({},u),a.imageSmoothingEnabled=!1,l("init"),{canvas:o,context:a}}let w=/(jpeg|jpg|gif|png|webp)$/,y=/(wav|mp3|ogg|aac)$/,_=/^\//,m=/\/$/,f=new WeakMap,g="",v="",b="";function S(t,i){return new URL(t,i).href}function M(t,i){return[t.replace(m,""),t?i.replace(_,""):i].filter((t=>t)).join("/")}function A(t){return t.split(".").pop()}function T(t){let i=t.replace("."+A(t),"");return 2==i.split("/").length?i.replace(_,""):i}let z={},k={},E={};function N(){window.__k||(window.__k={dm:f,u:S,d:E,i:z})}function P(...t){return N(),Promise.all(t.map((t=>{let i=A([].concat(t)[0]);return i.match(w)?(e=t,N(),new Promise(((t,i)=>{let s,h,r;if(s=M(g,e),z[s])return t(z[s]);h=new Image,h.onload=function(){r=S(s,window.location.href),z[T(e)]=z[s]=z[r]=this,l("assetLoaded",this,e),t(this)},h.onerror=function(){i("Unable to load image "+s)},h.src=s}))):i.match(y)?function(t){return new Promise(((i,e)=>{let s,h,r,n,o=t;var a;return s=new Audio,h={wav:(a=s).canPlayType('audio/wav; codecs="1"'),mp3:a.canPlayType("audio/mpeg;"),ogg:a.canPlayType('audio/ogg; codecs="vorbis"'),aac:a.canPlayType("audio/aac;")},(t=[].concat(t).reduce(((t,i)=>t||(h[A(i)]?i:null)),0))?(r=M(v,t),k[r]?i(k[r]):(s.addEventListener("canplay",(function(){n=S(r,window.location.href),k[T(t)]=k[r]=k[n]=this,l("assetLoaded",this,t),i(this)})),s.onerror=function(){e("Unable to load audio "+r)},s.src=r,void s.load())):e("cannot play any of the audio formats provided "+o)}))}(t):function(t){let i,e;return N(),i=M(b,t),E[i]?Promise.resolve(E[i]):fetch(i).then((t=>{if(!t.ok)throw t;return t.clone().json().catch((()=>t.text()))})).then((s=>(e=S(i,window.location.href),"object"==typeof s&&f.set(s,e),E[T(t)]=E[i]=E[e]=s,l("assetLoaded",s,t),s)))}(t);var e})))}class C{constructor(t=0,i=0,e={}){null!=t.x?(this.x=t.x,this.y=t.y):(this.x=t,this.y=i),e._c&&(this.clamp(e._a,e._b,e._d,e._e),this.x=t,this.y=i)}set(t){this.x=t.x,this.y=t.y}add(t){return new C(this.x+t.x,this.y+t.y,this)}subtract(t){return new C(this.x-t.x,this.y-t.y,this)}scale(t){return new C(this.x*t,this.y*t)}normalize(t=this.length()||1){return new C(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}direction(){return Math.atan2(this.y,this.x)}clamp(t,i,e,s){this._c=!0,this._a=t,this._b=i,this._d=e,this._e=s}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?s(this._a,this._d,t):t}set y(t){this._y=this._c?s(this._b,this._e,t):t}}function Y(){return new C(...arguments)}class I{constructor(t){return this.init(t)}init(t={}){this.position=Y(),this.velocity=Y(),this.acceleration=Y(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let i=this.acceleration;t&&(i=i.scale(t)),this.velocity=this.velocity.add(i);let e=this.velocity;t&&(e=e.scale(t)),this.position=this.position.add(e),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}class L extends I{init({width:t=0,height:i=0,context:e=x(),render:s=this.draw,update:h=this.advance,children:r=[],anchor:n={x:0,y:0},opacity:o=1,rotation:a=0,drotation:c=0,ddrotation:l=0,scaleX:u=1,scaleY:p=1,...w}={}){this._c=[],super.init({width:t,height:i,context:e,anchor:n,opacity:o,rotation:a,drotation:c,ddrotation:l,scaleX:u,scaleY:p,...w}),this._di=!0,this._uw(),this.addChild(r),this._rf=s,this._uf=h,d("init",(()=>{this.context??=x()}))}update(t){this._uf(t),this.children.map((i=>i.update&&i.update(t)))}render(){let t=this.context;t.save(),(this.x||this.y)&&t.translate(this.x,this.y),this.rotation&&t.rotate(this.rotation),1==this.scaleX&&1==this.scaleY||t.scale(this.scaleX,this.scaleY);let i=this.width,e=this.height;this.radius&&(i=e=2*this.radius);let s=-i*this.anchor.x,h=-e*this.anchor.y;(s||h)&&t.translate(s,h),this.context.globalAlpha=this.opacity,this._rf(),(s||h)&&t.translate(-s,-h),this.children.map((t=>t.render&&t.render())),t.restore()}draw(){}_pc(){this._uw(),this.children.map((t=>t._pc()))}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:i=0,_wo:e=1,_wrot:s=0,_wsx:h=1,_wsy:r=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this.radius&&(this._wrx=this.radius,this._wry=this.radius),this._wo=e*this.opacity,this._wsx=h*this.scaleX,this._wsy=r*this.scaleY,this._wx=this._wx*h,this._wy=this._wy*r,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this.radius&&(this._wrx=this.radius*this._wsx,this._wry=this.radius*this._wsy),this._wrot=s+this.rotation;let{x:n,y:o}=function(t,i){let e=Math.sin(i),s=Math.cos(i);return{x:t.x*s-t.y*e,y:t.x*e+t.y*s}}({x:this._wx,y:this._wy},s);this._wx=n,this._wy=o,this._wx+=t,this._wy+=i}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,radius:this.radius?{x:this._wrx,y:this._wry}:void 0,opacity:this._wo,rotation:this._wrot,scaleX:this._wsx,scaleY:this._wsy}}set children(t){this.removeChild(this._c),this.addChild(t)}get children(){return this._c}addChild(...t){t.flat().map((t=>{this.children.push(t),t.parent=this,t._pc=t._pc||n,t._pc()}))}removeChild(...t){t.flat().map((t=>{(function(t,i){let e=t.indexOf(i);if(-1!=e)return t.splice(e,1),!0})(this.children,t)&&(t.parent=null,t._pc())}))}get radius(){return this._r}set radius(t){this._r=t,this._pc()}get opacity(){return this._opa}set opacity(t){this._opa=s(0,1,t),this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}advance(t){super.advance(t),this.drotation+=this.ddrotation,this.rotation+=this.drotation}setScale(t,i=t){this.scaleX=t,this.scaleY=i}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}class j extends L{init({image:t,width:i=(t?t.width:void 0),height:e=(t?t.height:void 0),...s}={}){super.init({image:t,width:i,height:e,...s})}get animations(){return this._a}set animations(t){let i,e;for(i in this._a={},t)this._a[i]=t[i].clone(),e=e||this._a[i];this.currentAnimation=e,this.width=this.width||e.width,this.height=this.height||e.height}playAnimation(t){this.currentAnimation?.stop(),this.currentAnimation=this.animations[t],this.currentAnimation.start()}advance(t){super.advance(t),this.currentAnimation?.update(t)}draw(){if(this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color){if(this.context.fillStyle=this.color,this.radius)return this.context.beginPath(),this.context.arc(this.radius,this.radius,this.radius,0,2*Math.PI),void this.context.fill();this.context.fillRect(0,0,this.width,this.height)}}}function H(){return new j(...arguments)}let X=/(\d+)(\w+)/;class q extends L{init({text:t="",textAlign:i="",lineHeight:e=1,font:s=x()?.font,...h}={}){t=""+t,super.init({text:t,textAlign:i,lineHeight:e,font:s,...h}),this.context&&this._p(),d("init",(()=>{this.font??=x().font,this._p()}))}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=""+t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=function(t){if(!t)return{computed:0};let i=t.match(X),e=+i[1];return{size:e,unit:i[2],computed:e}}(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context,i=[this.text];if(t.font=this.font,i=this.text.split("\n"),this._fw&&i.map((i=>{let e=i.split(" "),s=e.shift(),h=s;e.map((i=>{h+=" "+i,t.measureText(h).width>this._fw&&(this._s.push(s),h=i),s=h})),this._s.push(h)})),!this._s.length&&this.text.includes("\n")){let e=0;i.map((i=>{this._s.push(i),e=Math.max(e,t.measureText(i).width)})),this._w=this._fw||e}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,i=this.textAlign,e=this.context;i=this.textAlign||("rtl"==e.canvas.dir?"right":"left"),t="right"==i?this.width:"center"==i?this.width/2|0:0,this._s.map(((s,h)=>{e.textBaseline="top",e.textAlign=i,e.fillStyle=this.color,e.font=this.font,this.strokeColor&&(e.strokeStyle=this.strokeColor,e.lineWidth=this.lineWidth??1,e.strokeText(s,t,this._fs*this.lineHeight*h)),e.fillText(s,t,this._fs*this.lineHeight*h)}))}}function O(){return new q(...arguments)}function R(t){let i=t.canvas;t.clearRect(0,0,i.width,i.height)}function $({fps:t=60,clearCanvas:i=!0,update:e=n,render:s,context:h=x(),blur:r=!1}={}){if(!s)throw Error("You must provide a render() function");let o,a,c,u,p,w=0,y=1e3/t,_=1/t,m=i?R:n,f=!0;function g(){if(a=requestAnimationFrame(g),f&&(c=performance.now(),u=c-o,o=c,!(u>1e3))){for(w+=u;w>=y;)l("tick"),p.update(_),w-=y;m(p.context),p.render()}}return r||(window.addEventListener("focus",(()=>{f=!0})),window.addEventListener("blur",(()=>{f=!1}))),d("init",(()=>{p.context??=x()})),p={update:e,render:s,isStopped:!0,context:h,start(){this.isStopped&&(o=performance.now(),this.isStopped=!1,requestAnimationFrame(g))},stop(){this.isStopped=!0,cancelAnimationFrame(a)},_frame:g,set _last(t){o=t}},p}new WeakMap;let B={},U={},W={},D={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"arrowleft",ArrowUp:"arrowup",ArrowRight:"arrowright",ArrowDown:"arrowdown"};function F(t=n,i){t._pd&&i.preventDefault(),t(i)}function G(t){let i=D[t.code],e=B[i];W[i]=!0,F(e,t)}function K(t){let i=D[t.code],e=U[i];W[i]=!1,F(e,t)}function J(){W={}}function Q(){let t;for(t=0;t<26;t++)D["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)D["Digit"+t]=D["Numpad"+t]=""+t;window.addEventListener("keydown",G),window.addEventListener("keyup",K),window.addEventListener("blur",J)}function V(t){return!![].concat(t).some((t=>W[t]))}}},r={};function n(t){var i=r[t];if(void 0!==i)return i.exports;var e=r[t]={exports:{}};return h[t](e,e.exports,n),e.exports}t="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",i="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",e="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",s=t=>{t&&t.d<1&&(t.d=1,t.forEach((t=>t.r--)),t.forEach((t=>t.r--?t.r++:t())))},n.a=(h,r,n)=>{var o;n&&((o=[]).d=-1);var a,c,d,l=new Set,u=h.exports,x=new Promise(((t,i)=>{d=i,c=t}));x[i]=u,x[t]=t=>(o&&t(o),l.forEach(t),x.catch((t=>{}))),h.exports=x,r((h=>{var r;a=(h=>h.map((h=>{if(null!==h&&"object"==typeof h){if(h[t])return h;if(h.then){var r=[];r.d=0,h.then((t=>{n[i]=t,s(r)}),(t=>{n[e]=t,s(r)}));var n={};return n[t]=t=>t(r),n}}var o={};return o[t]=t=>{},o[i]=h,o})))(h);var n=()=>a.map((t=>{if(t[e])throw t[e];return t[i]})),c=new Promise((i=>{(r=()=>i(n)).r=0;var e=t=>t!==o&&!l.has(t)&&(l.add(t),t&&!t.d&&(r.r++,t.push(r)));a.map((i=>i[t](e)))}));return r.r?c:n()}),(t=>(t?d(x[e]=t):c(u),s(o)))),o&&o.d<0&&(o.d=0)},n.d=(t,i)=>{for(var e in i)n.o(i,e)&&!n.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:i[e]})},n.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),n(44)})();