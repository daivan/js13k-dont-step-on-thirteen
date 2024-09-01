(()=>{"use strict";function t(t,e,i){return Math.min(Math.max(t,i),e)}function e(t){let{x:e=0,y:i=0,width:s,height:r,radius:h}=t.world||t;return t.mapwidth&&(s=t.mapwidth,r=t.mapheight),h&&(s=2*h.x,r=2*h.y),t.anchor&&(e-=s*t.anchor.x,i-=r*t.anchor.y),s<0&&(e+=s,s*=-1),r<0&&(i+=r,r*=-1),{x:e,y:i,width:s,height:r}}let i=()=>{};function s(t,i){let{x:s,y:r,width:h,height:n}=e(i);do{s-=i.sx||0,r-=i.sy||0}while(i=i.parent);let o=t.x-Math.max(s,Math.min(t.x,s+h)),a=t.y-Math.max(r,Math.min(t.y,r+n));return o*o+a*a<t.radius*t.radius}let r,h,n={};function o(t,e){n[t]=n[t]||[],n[t].push(e)}function a(t,...e){(n[t]||[]).map((t=>t(...e)))}let c={get:(t,e)=>"_proxy"==e||i};function d(){return r}function l(){return h}class u{constructor(t=0,e=0,i={}){null!=t.x?(this.x=t.x,this.y=t.y):(this.x=t,this.y=e),i._c&&(this.clamp(i._a,i._b,i._d,i._e),this.x=t,this.y=e)}set(t){this.x=t.x,this.y=t.y}add(t){return new u(this.x+t.x,this.y+t.y,this)}subtract(t){return new u(this.x-t.x,this.y-t.y,this)}scale(t){return new u(this.x*t,this.y*t)}normalize(t=this.length()||1){return new u(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}direction(){return Math.atan2(this.y,this.x)}clamp(t,e,i,s){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=s}get x(){return this._x}get y(){return this._y}set x(e){this._x=this._c?t(this._a,this._d,e):e}set y(e){this._y=this._c?t(this._b,this._e,e):e}}function x(){return new u(...arguments)}class p{constructor(t){return this.init(t)}init(t={}){this.position=x(),this.velocity=x(),this.acceleration=x(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let e=this.acceleration;t&&(e=e.scale(t)),this.velocity=this.velocity.add(e);let i=this.velocity;t&&(i=i.scale(t)),this.position=this.position.add(i),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}class g extends p{init({width:t=0,height:e=0,context:i=l(),render:s=this.draw,update:r=this.advance,children:h=[],anchor:n={x:0,y:0},opacity:a=1,rotation:c=0,drotation:d=0,ddrotation:u=0,scaleX:x=1,scaleY:p=1,...g}={}){this._c=[],super.init({width:t,height:e,context:i,anchor:n,opacity:a,rotation:c,drotation:d,ddrotation:u,scaleX:x,scaleY:p,...g}),this._di=!0,this._uw(),this.addChild(h),this._rf=s,this._uf=r,o("init",(()=>{this.context??=l()}))}update(t){this._uf(t),this.children.map((e=>e.update&&e.update(t)))}render(){let t=this.context;t.save(),(this.x||this.y)&&t.translate(this.x,this.y),this.rotation&&t.rotate(this.rotation),1==this.scaleX&&1==this.scaleY||t.scale(this.scaleX,this.scaleY);let e=this.width,i=this.height;this.radius&&(e=i=2*this.radius);let s=-e*this.anchor.x,r=-i*this.anchor.y;(s||r)&&t.translate(s,r),this.context.globalAlpha=this.opacity,this._rf(),(s||r)&&t.translate(-s,-r),this.children.map((t=>t.render&&t.render())),t.restore()}draw(){}_pc(){this._uw(),this.children.map((t=>t._pc()))}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:e=0,_wo:i=1,_wrot:s=0,_wsx:r=1,_wsy:h=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this.radius&&(this._wrx=this.radius,this._wry=this.radius),this._wo=i*this.opacity,this._wsx=r*this.scaleX,this._wsy=h*this.scaleY,this._wx=this._wx*r,this._wy=this._wy*h,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this.radius&&(this._wrx=this.radius*this._wsx,this._wry=this.radius*this._wsy),this._wrot=s+this.rotation;let{x:n,y:o}=function(t,e){let i=Math.sin(e),s=Math.cos(e);return{x:t.x*s-t.y*i,y:t.x*i+t.y*s}}({x:this._wx,y:this._wy},s);this._wx=n,this._wy=o,this._wx+=t,this._wy+=e}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,radius:this.radius?{x:this._wrx,y:this._wry}:void 0,opacity:this._wo,rotation:this._wrot,scaleX:this._wsx,scaleY:this._wsy}}set children(t){this.removeChild(this._c),this.addChild(t)}get children(){return this._c}addChild(...t){t.flat().map((t=>{this.children.push(t),t.parent=this,t._pc=t._pc||i,t._pc()}))}removeChild(...t){t.flat().map((t=>{(function(t,e){let i=t.indexOf(e);if(-1!=i)return t.splice(i,1),!0})(this.children,t)&&(t.parent=null,t._pc())}))}get radius(){return this._r}set radius(t){this._r=t,this._pc()}get opacity(){return this._opa}set opacity(e){this._opa=t(0,1,e),this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}advance(t){super.advance(t),this.drotation+=this.ddrotation,this.rotation+=this.drotation}setScale(t,e=t){this.scaleX=t,this.scaleY=e}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}class w extends g{init({image:t,width:e=(t?t.width:void 0),height:i=(t?t.height:void 0),...s}={}){super.init({image:t,width:e,height:i,...s})}get animations(){return this._a}set animations(t){let e,i;for(e in this._a={},t)this._a[e]=t[e].clone(),i=i||this._a[e];this.currentAnimation=i,this.width=this.width||i.width,this.height=this.height||i.height}playAnimation(t){this.currentAnimation?.stop(),this.currentAnimation=this.animations[t],this.currentAnimation.start()}advance(t){super.advance(t),this.currentAnimation?.update(t)}draw(){if(this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color){if(this.context.fillStyle=this.color,this.radius)return this.context.beginPath(),this.context.arc(this.radius,this.radius,this.radius,0,2*Math.PI),void this.context.fill();this.context.fillRect(0,0,this.width,this.height)}}}function m(){return new w(...arguments)}let f=/(\d+)(\w+)/;class y extends g{init({text:t="",textAlign:e="",lineHeight:i=1,font:s=l()?.font,...r}={}){t=""+t,super.init({text:t,textAlign:e,lineHeight:i,font:s,...r}),this.context&&this._p(),o("init",(()=>{this.font??=l().font,this._p()}))}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=""+t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=function(t){if(!t)return{computed:0};let e=t.match(f),i=+e[1];return{size:i,unit:e[2],computed:i}}(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context,e=[this.text];if(t.font=this.font,e=this.text.split("\n"),this._fw&&e.map((e=>{let i=e.split(" "),s=i.shift(),r=s;i.map((e=>{r+=" "+e,t.measureText(r).width>this._fw&&(this._s.push(s),r=e),s=r})),this._s.push(r)})),!this._s.length&&this.text.includes("\n")){let i=0;e.map((e=>{this._s.push(e),i=Math.max(i,t.measureText(e).width)})),this._w=this._fw||i}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,e=this.textAlign,i=this.context;e=this.textAlign||("rtl"==i.canvas.dir?"right":"left"),t="right"==e?this.width:"center"==e?this.width/2|0:0,this._s.map(((s,r)=>{i.textBaseline="top",i.textAlign=e,i.fillStyle=this.color,i.font=this.font,this.strokeColor&&(i.strokeStyle=this.strokeColor,i.lineWidth=this.lineWidth??1,i.strokeText(s,t,this._fs*this.lineHeight*r)),i.fillText(s,t,this._fs*this.lineHeight*r)}))}}function _(){return new y(...arguments)}let T=new WeakMap,b={},v={},A={0:"left",1:"middle",2:"right"};function k(t,e){return parseFloat(t.getPropertyValue(e))||0}function S(t){let e=null!=t.button?A[t.button]:"left";v[e]=!0,C(t,"onDown")}function E(t){let e=null!=t.button?A[t.button]:"left";v[e]=!1,C(t,"onUp")}function M(t){C(t,"onOver")}function L(t){T.get(t.target)._oo=null,v={}}function N(t,e,i){let r=function(t){let e=t._lf.length?t._lf:t._cf;for(let i=e.length-1;i>=0;i--){let r=e[i];if(r.collidesWithPointer?r.collidesWithPointer(t):s(t,r))return r}}(t);r&&r[e]&&r[e](i),b[e]&&b[e](i,r),"onOver"==e&&(r!=t._oo&&t._oo&&t._oo.onOut&&t._oo.onOut(i),t._oo=r)}function C(t,e){t.preventDefault();let i=t.target,s=T.get(i),{scaleX:r,scaleY:h,offsetX:n,offsetY:o}=function(t){let{canvas:e,_s:i}=t,s=e.getBoundingClientRect(),r="none"!=i.transform?i.transform.replace("matrix(","").split(","):[1,1,1,1],h=parseFloat(r[0]),n=parseFloat(r[3]),o=(k(i,"border-left-width")+k(i,"border-right-width"))*h,a=(k(i,"border-top-width")+k(i,"border-bottom-width"))*n,c=(k(i,"padding-left")+k(i,"padding-right"))*h,d=(k(i,"padding-top")+k(i,"padding-bottom"))*n;return{scaleX:(s.width-o-c)/e.width,scaleY:(s.height-a-d)/e.height,offsetX:s.left+(k(i,"border-left-width")+k(i,"padding-left"))*h,offsetY:s.top+(k(i,"border-top-width")+k(i,"padding-top"))*n}}(s);t.type.includes("touch")?(Array.from(t.touches).map((({clientX:t,clientY:e,identifier:i})=>{let a=s.touches[i];a||(a=s.touches[i]={start:{x:(t-n)/r,y:(e-o)/h}},s.touches.length++),a.changed=!1})),Array.from(t.changedTouches).map((({clientX:i,clientY:c,identifier:d})=>{let l=s.touches[d];l.changed=!0,l.x=s.x=(i-n)/r,l.y=s.y=(c-o)/h,N(s,e,t),a("touchChanged",t,s.touches),"onUp"==e&&(delete s.touches[d],s.touches.length--,s.touches.length||a("touchEnd"))}))):(s.x=(t.clientX-n)/r,s.y=(t.clientY-o)/h,N(s,e,t))}function Y({radius:t=5,canvas:e=d()}={}){let i=T.get(e);if(!i){let s=window.getComputedStyle(e);i={x:0,y:0,radius:t,touches:{length:0},canvas:e,_cf:[],_lf:[],_o:[],_oo:null,_s:s},T.set(e,i)}return e.addEventListener("mousedown",S),e.addEventListener("touchstart",S),e.addEventListener("mouseup",E),e.addEventListener("touchend",E),e.addEventListener("touchcancel",E),e.addEventListener("blur",L),e.addEventListener("mousemove",M),e.addEventListener("touchmove",M),i._t||(i._t=!0,o("tick",(()=>{i._lf.length=0,i._cf.map((t=>{i._lf.push(t)})),i._cf.length=0}))),i}function P(t){let e=t.canvas;t.clearRect(0,0,e.width,e.height)}let X=[],D={},G={},O={0:"south",1:"east",2:"west",3:"north",4:"leftshoulder",5:"rightshoulder",6:"lefttrigger",7:"righttrigger",8:"select",9:"start",10:"leftstick",11:"rightstick",12:"dpadup",13:"dpaddown",14:"dpadleft",15:"dpadright"};function R(t){X[t.gamepad.index]={pressedButtons:{},axes:{}}}function V(t){delete X[t.gamepad.index]}function I(){X.map((t=>{t.pressedButtons={},t.axes={}}))}function H(){let t=navigator.getGamepads?navigator.getGamepads():navigator.webkitGetGamepads?navigator.webkitGetGamepads:[];for(let e=0;e<t.length;e++){let i=t[e];if(!i)continue;i.buttons.map(((t,e)=>{let s=O[e],{pressed:r}=t,{pressedButtons:h}=X[i.index],n=h[s];!n&&r?[D[i.index],D].map((e=>{e?.[s]?.(i,t,s)})):n&&!r&&[G[i.index],G].map((e=>{e?.[s]?.(i,t,s)})),h[s]=r}));let{axes:s}=X[i.index];s.leftstickx=i.axes[0],s.leftsticky=i.axes[1],s.rightstickx=i.axes[2],s.rightsticky=i.axes[3]}}let B,F={},W=!1,U={swipe:{touches:1,threshold:10,touchend({0:t}){let e=t.x-t.start.x,i=t.y-t.start.y,s=Math.abs(e),r=Math.abs(i);if(!(s<this.threshold&&r<this.threshold))return s>r?e<0?"left":"right":i<0?"up":"down"}},pinch:{touches:2,threshold:2,touchstart({0:t,1:e}){this.prevDist=Math.hypot(t.x-e.x,t.y-e.y)},touchmove({0:t,1:e}){let i=Math.hypot(t.x-e.x,t.y-e.y);if(Math.abs(i-this.prevDist)<this.threshold)return;let s=i>this.prevDist?"out":"in";return this.prevDist=i,s}}};let j={},q={},z={},$={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"arrowleft",ArrowUp:"arrowup",ArrowRight:"arrowright",ArrowDown:"arrowdown"};function K(t=i,e){t._pd&&e.preventDefault(),t(e)}function J(t){let e=$[t.code],i=j[e];z[e]=!0,K(i,t)}function Q(t){let e=$[t.code],i=q[e];z[e]=!1,K(i,t)}function Z(){z={}}function tt(){let t;for(t=0;t<26;t++)$["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)$["Digit"+t]=$["Numpad"+t]=""+t;window.addEventListener("keydown",J),window.addEventListener("keyup",Q),window.addEventListener("blur",Z)}function et(t){return!![].concat(t).some((t=>z[t]))}new AudioContext;class it extends g{background=m({x:0,y:0,render:function(){const t=64,e=canvas.height/t,i=canvas.width/t,s=["#EAEAEA","#D3D3D3"];for(let r=0;r<e;r++)for(let e=0;e<i;e++){const i=e*t,h=r*t,n=s[(r+e)%s.length];this.context.fillStyle=n,this.context.fillRect(i,h,t,t)}}});header=new _({text:"The Alchemistis",font:"72px Arial",x:280,y:185});subText=new _({text:"Press Space to play",font:"32px Arial",x:320,y:300});timeLeftText=new _({time:0,text:"Time left:",font:"20px Arial",color:"black",x:10,y:650,update:function(t){this.text="Time left: "+this.time}});ingredientsText=new _({text:"",font:"20px Arial",color:"black",x:280,y:185});scoreText=new _({score:0,text:"Score: ",font:"20px Arial",color:"black",x:10,y:675,update:function(t){this.text="Score: "+this.score}});temperatureText=new _({text:"Heat\nStirr",font:"20px Arial",color:"black",x:10,y:700});heatTemperatureGoal=m({x:120,y:729,color:"purple",width:30,height:6});heatTemperature=m({temperatureValue:100,x:50,y:730,color:"green",width:100,height:4,update:function(t){this.width=this.temperatureValue,this.temperatureValue<70||this.temperatureValue>100?this.color="red":this.color="green"}});stirTemperatureGoal=m({x:120,y:739,color:"purple",width:30,height:6});stirTemperature=m({temperatureValue:100,x:50,y:740,color:"green",width:100,height:4,update:function(t){this.width=this.temperatureValue,this.temperatureValue<70||this.temperatureValue>100?this.color="red":this.color="green"}});constructor(t){super(t)}update(t,e){this.ingredientsText.text=e.ingredients.map(((t,e)=>`${e+1}: ${t}`)).join("\n"),this.scoreText.score=e.score,this.scoreText.update(t),this.heatTemperature.temperatureValue=e.heatTemperature,this.heatTemperature.update(t),this.stirTemperature.temperatureValue=e.stirTemperature,this.stirTemperature.update(t),this.timeLeftText.time=e.timeLeft,this.timeLeftText.update(t)}render(t){this.background.render(),"start_screen"!==t.state&&(this.header.text="The Alchemist",this.subText.text="Press space to start"),"game_over"===t.state&&(this.header.text="Game over",this.subText.text="Press space to play again"),"playing"!==t.state?(this.header.render(),this.subText.render()):(this.temperatureText.render(),this.heatTemperatureGoal.render(),this.heatTemperature.render(),this.stirTemperatureGoal.render(),this.stirTemperature.render(),this.scoreText.render(),this.ingredientsText.render(),this.timeLeftText.render())}}tt();class st extends g{columnNumberArray=[7,6,2,4,6,4,10,3];rowNumberArray=[5,4,6,2,9,7,5];score=0;rowNumber=5;columnNumber=7;gameArea=null;scoreText=new _({text:this.score,font:"20px Arial",color:"white",x:50,y:450});rowText=new _({text:this.rowNumber,font:"20px Arial",color:"white",x:50,y:500});columnText=new _({text:this.columnNumber,font:"20px Arial",color:"white",x:50,y:550});summaryText=new _({text:0,font:"20px Arial",color:"white",x:50,y:600});playerSprite=m({x:300,y:300,anchor:{x:.5,y:.5},width:20,height:20,color:"red",update(t,e){et("w")&&(this.y-=3,console.log("w pressed")),et("s")&&(this.y+=3,console.log("s pressed")),et("a")&&(this.x-=3,console.log("a pressed")),et("d")&&(this.x+=3,console.log("d pressed"))}});goalSprite=m({x:0,y:64,width:64,height:64,color:"blue"});updateNumbers(){this.rowNumber=Math.floor(this.playerSprite.y/64),this.columnNumber=Math.floor(this.playerSprite.x/64),console.log("update numbers"),console.log("row number:",this.rowNumberArray[this.rowNumber]),console.log("column number:",this.columnNumberArray[this.columnNumber]),this.rowText.text=this.rowNumberArray[this.rowNumber],this.columnText.text=this.columnNumberArray[this.columnNumber],this.summaryText.text=this.rowNumberArray[this.rowNumber]+this.columnNumberArray[this.columnNumber]}constructor(t){super(t)}update(t,i){this.playerSprite.update(),this.updateNumbers(),this.rowText.update(),this.columnText.update();var r=function(t,i){let r=e(t),h=e(i);return!(t.radius&&r.width!=r.height||i.radius&&h.width!=h.height)&&([r,h]=[r,h].map((e=>((e==r?t:i).radius&&(e.radius=e.width/2,e.x+=e.radius,e.y+=e.radius),e))),t.radius&&i.radius?Math.hypot(r.x-h.x,r.y-h.y)<r.radius+h.radius:t.radius||i.radius?s(t.radius?r:h,t.radius?i:t):r.x<h.x+h.width&&r.x+r.width>h.x&&r.y<h.y+h.height&&r.y+r.height>h.y)}(this.playerSprite,this.goalSprite);console.log("collide: ",r),r&&(this.score=this.score+1,this.goalSprite.x=64*Math.floor(10*Math.random()),this.goalSprite.y=64*Math.floor(10*Math.random())),this.scoreText.text=this.score}render(t){this.playerSprite.render(),this.goalSprite.render(),this.rowText.render(),this.columnText.render(),this.summaryText.render(),this.scoreText.render()}}class rt{numbersInRows=[1,2,3,4,5,6,7,8,9,10];numberOfRows=10;numberOfColumns=8;scoreText=new _({text:"7",font:"20px Arial",color:"black",x:0,y:0});scoreText2=new _({text:"6",font:"20px Arial",color:"black",x:64,y:0});scoreText3=new _({text:"2",font:"20px Arial",color:"black",x:128,y:0});scoreText4=new _({text:"4",font:"20px Arial",color:"black",x:196,y:0});scoreText5=new _({text:"6",font:"20px Arial",color:"black",x:256,y:0});scoreText6=new _({text:"4",font:"20px Arial",color:"black",x:320,y:0});scoreText7=new _({text:"10",font:"20px Arial",color:"black",x:384,y:0});scoreText8=new _({text:"3",font:"20px Arial",color:"black",x:448,y:0});rightText1=new _({text:"5",font:"20px Arial",color:"black",x:490,y:40});rightText2=new _({text:"4",font:"20px Arial",color:"black",x:490,y:104});rightText3=new _({text:"6",font:"20px Arial",color:"black",x:490,y:168});rightText4=new _({text:"2",font:"20px Arial",color:"black",x:490,y:232});rightText5=new _({text:"9",font:"20px Arial",color:"black",x:490,y:296});rightText6=new _({text:"7",font:"20px Arial",color:"black",x:490,y:360});rightText7=new _({text:"5",font:"20px Arial",color:"black",x:490,y:424});background=m({x:0,y:0,render:function(){const t=["#EAEAEA","#D3D3D3"];for(let e=0;e<7;e++)for(let i=0;i<8;i++){const s=64*i,r=64*e,h=t[(e+i)%t.length];this.context.fillStyle=h,this.context.fillRect(s,r,64,64)}}});update(t,e){}render(t){this.background.render(),this.scoreText.render(),this.scoreText2.render(),this.scoreText3.render(),this.scoreText4.render(),this.scoreText5.render(),this.scoreText6.render(),this.scoreText7.render(),this.scoreText8.render(),this.rightText1.render(),this.rightText2.render(),this.rightText3.render(),this.rightText4.render(),this.rightText5.render(),this.rightText6.render(),this.rightText7.render()}}let{canvas:ht,context:nt}=function(t,{contextless:e=!1}={}){if(r=document.getElementById(t)||t||document.querySelector("canvas"),e&&(r=r||new Proxy({},c)),!r)throw Error("You must provide a canvas element for the game");return h=r.getContext("2d")||new Proxy({},c),h.imageSmoothingEnabled=!1,a("init"),{canvas:r,context:h}}(),ot=new class extends g{recipe=0;timePassed=0;clockwise=10;recipeTime=0;timeLeft=0;everySecond=1;state="start_screen";gameStarted=!1;heatTemperature=0;heatTemperatureGoal=0;isBoiling=!1;stirTemperature=0;stirTemperatureGoal=0;gameUI=new it;gameArea=new rt;playerActor=new st;ingredients=["correct ingredient","wrong ingredient","really wrong ingredient"];goodIngredients=["correct ingredient"];score=0;constructor(t){super(t)}spacePressed(){!0===this.gameStarted&&(this.heatTemperature=this.heatTemperature+10,console.log("space pressed: ",this.heatTemperature))}onePressed(){!0===this.gameStarted&&(this.goodIngredients.includes(this.ingredients[0])?this.score=this.score+10:this.score=this.score-10,this.ingredients=this.ingredients.sort(((t,e)=>.5-Math.random())))}twoPressed(){!0===this.gameStarted&&(this.goodIngredients.includes(this.ingredients[1])?this.score=this.score+10:this.score=this.score-50,this.ingredients=this.ingredients.sort(((t,e)=>.5-Math.random())))}threePressed(){!0===this.gameStarted&&(this.goodIngredients.includes(this.ingredients[2])?this.score=this.score+10:this.score=this.score-50,this.ingredients=this.ingredients.sort(((t,e)=>.5-Math.random())))}addClockwiseStir(){!0===this.gameStarted&&(this.stirTemperature=this.stirTemperature+10,console.log("Rotated: ",this.stirTemperature))}reset(){this.gameStarted=!1,this.timePassed=0,this.recipe=0,this.score=0,this.loadRecipe()}loadRecipe(){0===this.recipe&&(this.clockwise=10,this.timeLeft=10)}isGameOver(){this.timeLeft<0&&this.gameOver()}gameOver(){this.reset(),this.state="game_over"}isRecipeComplete(){return 0===this.clockwise}update(t){this.playerActor.update(t,this)}render(){this.gameArea.render(this),this.playerActor.render(this)}}(0);ot.reset(),Y(),function(t={}){tt();let e=Y(t.pointer);W||(W=!0,o("touchChanged",((t,e)=>{Object.keys(U).map((i=>{let s,r=U[i];(!B||B==i)&&e.length==r.touches&&[...Array(e.length).keys()].every((t=>e[t]))&&(s=r[t.type]?.(e)??"")&&F[i+s]&&(B=i,F[i+s](t,e))}))})),o("touchEnd",(()=>{B=0}))),window.addEventListener("gamepadconnected",R),window.addEventListener("gamepaddisconnected",V),window.addEventListener("blur",I),o("tick",H)}(),function({fps:t=60,clearCanvas:e=!0,update:s=i,render:r,context:h=l(),blur:n=!1}={}){if(!r)throw Error("You must provide a render() function");let c,d,u,x,p,g=0,w=1e3/t,m=1/t,f=e?P:i,y=!0;function _(){if(d=requestAnimationFrame(_),y&&(u=performance.now(),x=u-c,c=u,!(x>1e3))){for(g+=x;g>=w;)a("tick"),p.update(m),g-=w;f(p.context),p.render()}}return n||(window.addEventListener("focus",(()=>{y=!0})),window.addEventListener("blur",(()=>{y=!1}))),o("init",(()=>{p.context??=l()})),p={update:s,render:r,isStopped:!0,context:h,start(){this.isStopped&&(c=performance.now(),this.isStopped=!1,requestAnimationFrame(_))},stop(){this.isStopped=!0,cancelAnimationFrame(d)},_frame:_,set _last(t){c=t}},p}({update:function(t){ot.update(t)},render:function(){ot.render()}}).start()})();