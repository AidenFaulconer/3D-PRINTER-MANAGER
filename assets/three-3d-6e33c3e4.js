import{r as Ce,R as Lm,c as Pr,j as _n,a as Um,s as Im}from"./react-vendor-97d11c3b.js";import{s as Ou,F as Dm,u as Om,_ as Wi,S as Hf,d as Fs,t as Fm,b as Nm,a as Bm}from"./index-f8780648.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gr="159",Ci={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Vf=0,Wl=1,Wf=2,zm=3,Xf=0,fa=1,cs=2,gn=3,Wn=0,Ht=1,yn=2,km=2,Vn=0,Ni=1,Xl=2,ql=3,Yl=4,qf=5,ni=100,Yf=101,jf=102,jl=103,Zl=104,Zf=200,$f=201,Jf=202,Kf=203,ra=204,sa=205,Qf=206,ed=207,td=208,nd=209,id=210,rd=211,sd=212,od=213,ad=214,ld=0,cd=1,ud=2,ms=3,hd=4,fd=5,dd=6,pd=7,Ns=0,md=1,gd=2,An=0,_d=1,vd=2,yd=3,zc=4,xd=5,$l="attached",Sd="detached",da=300,Xn=301,ai=302,gs=303,_s=304,Hr=306,vs=1e3,Gt=1001,ys=1002,Mt=1003,oa=1004,Gm=1004,us=1005,Hm=1005,ft=1006,kc=1007,Vm=1007,li=1008,Wm=1008,Cn=1009,Md=1010,bd=1011,pa=1012,Gc=1013,Hn=1014,cn=1015,Xi=1016,Hc=1017,Vc=1018,ii=1020,wd=1021,jt=1023,Ed=1024,Td=1025,ri=1026,qi=1027,Ad=1028,Wc=1029,Cd=1030,Xc=1031,qc=1033,Zo=33776,$o=33777,Jo=33778,Ko=33779,Jl=35840,Kl=35841,Ql=35842,ec=35843,Yc=36196,tc=37492,nc=37496,ic=37808,rc=37809,sc=37810,oc=37811,ac=37812,lc=37813,cc=37814,uc=37815,hc=37816,fc=37817,dc=37818,pc=37819,mc=37820,gc=37821,Qo=36492,_c=36494,vc=36495,Rd=36283,yc=36284,xc=36285,Sc=36286,Pd=2200,Ld=2201,Ud=2202,xs=2300,Ss=2301,ea=2302,Ii=2400,Di=2401,Ms=2402,ma=2500,jc=2501,Xm=0,qm=1,Ym=2,Zc=3e3,si=3001,Id=3200,$c=3201,ui=0,Dd=1,rn="",Tt="srgb",Pn="srgb-linear",ga="display-p3",Bs="display-p3-linear",bs="linear",ut="srgb",ws="rec709",Es="p3",jm=0,Pi=7680,Zm=7681,$m=7682,Jm=7683,Km=34055,Qm=34056,eg=5386,tg=512,ng=513,ig=514,rg=515,sg=516,og=517,ag=518,Mc=519,Od=512,Fd=513,Nd=514,Jc=515,Bd=516,zd=517,kd=518,Gd=519,Ts=35044,lg=35048,cg=35040,ug=35045,hg=35049,fg=35041,dg=35046,pg=35050,mg=35042,gg="100",bc="300 es",aa=1035,xn=2e3,Fr=2001;let Yn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,o=n.length;r<o;r++)n[r].call(this,e);e.target=null}}};const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Fu=1234567;const Bi=Math.PI/180,Nr=180/Math.PI;function on(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Bt[s&255]+Bt[s>>8&255]+Bt[s>>16&255]+Bt[s>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]).toLowerCase()}function vt(s,e,t){return Math.max(e,Math.min(t,s))}function Kc(s,e){return(s%e+e)%e}function _g(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function vg(s,e,t){return s!==e?(t-s)/(e-s):0}function hs(s,e,t){return(1-t)*s+t*e}function yg(s,e,t,i){return hs(s,e,1-Math.exp(-t*i))}function xg(s,e=1){return e-Math.abs(Kc(s,e*2)-e)}function Sg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Mg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function bg(s,e){return s+Math.floor(Math.random()*(e-s+1))}function wg(s,e){return s+Math.random()*(e-s)}function Eg(s){return s*(.5-Math.random())}function Tg(s){s!==void 0&&(Fu=s);let e=Fu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ag(s){return s*Bi}function Cg(s){return s*Nr}function wc(s){return(s&s-1)===0&&s!==0}function Rg(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function la(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Pg(s,e,t,i,n){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),u=o((e+i)/2),h=r((e-i)/2),f=o((e-i)/2),d=r((i-e)/2),p=o((i-e)/2);switch(n){case"XYX":s.set(a*u,l*h,l*f,a*c);break;case"YZY":s.set(l*f,a*u,l*h,a*c);break;case"ZXZ":s.set(l*h,l*f,a*u,a*c);break;case"XZX":s.set(a*u,l*p,l*d,a*c);break;case"YXY":s.set(l*d,a*u,l*p,a*c);break;case"ZYZ":s.set(l*p,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function Kt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Qe(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Qc={DEG2RAD:Bi,RAD2DEG:Nr,generateUUID:on,clamp:vt,euclideanModulo:Kc,mapLinear:_g,inverseLerp:vg,lerp:hs,damp:yg,pingpong:xg,smoothstep:Sg,smootherstep:Mg,randInt:bg,randFloat:wg,randFloatSpread:Eg,seededRandom:Tg,degToRad:Ag,radToDeg:Cg,isPowerOfTwo:wc,ceilPowerOfTwo:Rg,floorPowerOfTwo:la,setQuaternionFromProperEuler:Pg,normalize:Qe,denormalize:Kt};class se{constructor(e=0,t=0){se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*n+e.x,this.y=r*n+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,i,n,r,o,a,l,c){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,o,a,l,c)}set(e,t,i,n,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=n,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],p=i[8],_=n[0],g=n[3],m=n[6],y=n[1],v=n[4],x=n[7],S=n[2],b=n[5],E=n[8];return r[0]=o*_+a*y+l*S,r[3]=o*g+a*v+l*b,r[6]=o*m+a*x+l*E,r[1]=c*_+u*y+h*S,r[4]=c*g+u*v+h*b,r[7]=c*m+u*x+h*E,r[2]=f*_+d*y+p*S,r[5]=f*g+d*v+p*b,r[8]=f*m+d*x+p*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+n*r*c-n*o*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,p=t*h+i*f+n*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=h*_,e[1]=(n*c-u*i)*_,e[2]=(a*i-n*o)*_,e[3]=f*_,e[4]=(u*t-n*l)*_,e[5]=(n*r-a*t)*_,e[6]=d*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-n*c,n*l,-n*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ja.makeScale(e,t)),this}rotate(e){return this.premultiply(ja.makeRotation(-e)),this}translate(e,t){return this.premultiply(ja.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ja=new Ke;function Hd(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}const Lg={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Lr(s,e){return new Lg[s](e)}function As(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Vd(){const s=As("canvas");return s.style.display="block",s}const Nu={};function fs(s){s in Nu||(Nu[s]=!0,console.warn(s))}const Bu=new Ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),zu=new Ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),js={[Pn]:{transfer:bs,primaries:ws,toReference:s=>s,fromReference:s=>s},[Tt]:{transfer:ut,primaries:ws,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Bs]:{transfer:bs,primaries:Es,toReference:s=>s.applyMatrix3(zu),fromReference:s=>s.applyMatrix3(Bu)},[ga]:{transfer:ut,primaries:Es,toReference:s=>s.convertSRGBToLinear().applyMatrix3(zu),fromReference:s=>s.applyMatrix3(Bu).convertLinearToSRGB()}},Ug=new Set([Pn,Bs]),lt={enabled:!0,_workingColorSpace:Pn,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(s){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!s},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Ug.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const i=js[e].toReference,n=js[t].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return js[s].primaries},getTransfer:function(s){return s===rn?bs:js[s].transfer}};function Or(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Za(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ir;class eu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ir===void 0&&(ir=As("canvas")),ir.width=e.width,ir.height=e.height;const i=ir.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ir}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=As("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let o=0;o<r.length;o++)r[o]=Or(r[o]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Or(t[i]/255)*255):t[i]=Or(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ig=0;class Oi{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ig++}),this.uuid=on(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?r.push($a(n[o].image)):r.push($a(n[o]))}else r=$a(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function $a(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?eu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Dg=0;class yt extends Yn{constructor(e=yt.DEFAULT_IMAGE,t=yt.DEFAULT_MAPPING,i=Gt,n=Gt,r=ft,o=li,a=jt,l=Cn,c=yt.DEFAULT_ANISOTROPY,u=rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dg++}),this.uuid=on(),this.name="",this.source=new Oi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(fs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===si?Tt:rn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==da)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vs:e.x=e.x-Math.floor(e.x);break;case Gt:e.x=e.x<0?0:1;break;case ys:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vs:e.y=e.y-Math.floor(e.y);break;case Gt:e.y=e.y<0?0:1;break;case ys:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return fs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Tt?si:Zc}set encoding(e){fs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===si?Tt:rn}}yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=da;yt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,i=0,n=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*n+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*n+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*n+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*n+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,x=(d+1)/2,S=(m+1)/2,b=(u+f)/4,E=(h+_)/4,A=(p+g)/4;return v>x&&v>S?v<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(v),n=b/i,r=E/i):x>S?x<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(x),i=b/n,r=A/n):S<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(S),i=E/r,n=A/r),this.set(i,n,r,t),this}let y=Math.sqrt((g-p)*(g-p)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(h-_)/y,this.z=(f-u)/y,this.w=Math.acos((c+d+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wd extends Yn{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const n={width:e,height:t,depth:1};i.encoding!==void 0&&(fs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===si?Tt:rn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ft,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new yt(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Oi(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends Wd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class _a extends yt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Og extends un{constructor(e=1,t=1,i=1,n={}){super(e,t,n),this.isWebGLArrayRenderTarget=!0,this.depth=i,this.texture=new _a(null,e,t,i),this.texture.isRenderTargetTexture=!0}}class tu extends yt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fg extends un{constructor(e=1,t=1,i=1,n={}){super(e,t,n),this.isWebGL3DRenderTarget=!0,this.depth=i,this.texture=new tu(null,e,t,i),this.texture.isRenderTargetTexture=!0}}class Ng extends un{constructor(e=1,t=1,i=1,n={}){super(e,t,n),this.isWebGLMultipleRenderTargets=!0;const r=this.texture;this.texture=[];for(let o=0;o<i;o++)this.texture[o]=r.clone(),this.texture[o].isRenderTargetTexture=!0}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.texture.length;n<r;n++)this.texture[n].image.width=e,this.texture[n].image.height=t,this.texture[n].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}copy(e){this.dispose(),this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.texture.length=0;for(let t=0,i=e.texture.length;t<i;t++)this.texture[t]=e.texture[t].clone(),this.texture[t].isRenderTargetTexture=!0;return this}}class Vt{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,o,a){let l=i[n+0],c=i[n+1],u=i[n+2],h=i[n+3];const f=r[o+0],d=r[o+1],p=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=p,e[t+3]=_;return}if(h!==_||l!==f||c!==d||u!==p){let g=1-a;const m=l*f+c*d+u*p+h*_,y=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const S=Math.sqrt(v),b=Math.atan2(S,m*y);g=Math.sin(g*b)/S,a=Math.sin(a*b)/S}const x=a*y;if(l=l*g+f*x,c=c*g+d*x,u=u*g+p*x,h=h*g+_*x,g===1-a){const S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,n,r,o){const a=i[n],l=i[n+1],c=i[n+2],u=i[n+3],h=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return e[t]=a*p+u*h+l*d-c*f,e[t+1]=l*p+u*f+c*h-a*d,e[t+2]=c*p+u*d+a*f-l*h,e[t+3]=u*p-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,n=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(n/2),h=a(r/2),f=l(i/2),d=l(n/2),p=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"YXZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"ZXY":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"ZYX":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"YZX":this._x=f*u*h+c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h-f*d*p;break;case"XZY":this._x=f*u*h-c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-n)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(n+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-c)/d,this._x=(n+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-n)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+n*c-r*l,this._y=n*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-n*a,this._w=o*u-i*a-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+n*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=n,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*n+t*this._y,this._z=d*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=n*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(r),i*Math.cos(r),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ku.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ku.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*n-a*i),u=2*(a*t-r*n),h=2*(r*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=n+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=n*l-r*a,this.y=r*o-i*l,this.z=i*a-n*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ja.copy(this).projectOnVector(e),this.sub(Ja)}reflect(e){return this.sub(Ja.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ja=new P,ku=new Vt;class Et{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,dn):dn.fromBufferAttribute(r,o),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zs.copy(i.boundingBox)),Zs.applyMatrix4(e.matrixWorld),this.union(Zs)}const n=e.children;for(let r=0,o=n.length;r<o;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yr),$s.subVectors(this.max,Yr),rr.subVectors(e.a,Yr),sr.subVectors(e.b,Yr),or.subVectors(e.c,Yr),Zn.subVectors(sr,rr),$n.subVectors(or,sr),_i.subVectors(rr,or);let t=[0,-Zn.z,Zn.y,0,-$n.z,$n.y,0,-_i.z,_i.y,Zn.z,0,-Zn.x,$n.z,0,-$n.x,_i.z,0,-_i.x,-Zn.y,Zn.x,0,-$n.y,$n.x,0,-_i.y,_i.x,0];return!Ka(t,rr,sr,or,$s)||(t=[1,0,0,0,1,0,0,0,1],!Ka(t,rr,sr,or,$s))?!1:(Js.crossVectors(Zn,$n),t=[Js.x,Js.y,Js.z],Ka(t,rr,sr,or,$s))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(On),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const On=[new P,new P,new P,new P,new P,new P,new P,new P],dn=new P,Zs=new Et,rr=new P,sr=new P,or=new P,Zn=new P,$n=new P,_i=new P,Yr=new P,$s=new P,Js=new P,vi=new P;function Ka(s,e,t,i,n){for(let r=0,o=s.length-3;r<=o;r+=3){vi.fromArray(s,r);const a=n.x*Math.abs(vi.x)+n.y*Math.abs(vi.y)+n.z*Math.abs(vi.z),l=e.dot(vi),c=t.dot(vi),u=i.dot(vi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Bg=new Et,jr=new P,Qa=new P;class At{constructor(e=new P,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Bg.setFromPoints(e).getCenter(i);let n=0;for(let r=0,o=e.length;r<o;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;jr.subVectors(e,this.center);const t=jr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(jr,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(jr.copy(e.center).add(Qa)),this.expandByPoint(jr.copy(e.center).sub(Qa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fn=new P,el=new P,Ks=new P,Jn=new P,tl=new P,Qs=new P,nl=new P;class $i{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){el.copy(e).add(t).multiplyScalar(.5),Ks.copy(t).sub(e).normalize(),Jn.copy(this.origin).sub(el);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Ks),a=Jn.dot(this.direction),l=-Jn.dot(Ks),c=Jn.lengthSq(),u=Math.abs(1-o*o);let h,f,d,p;if(u>0)if(h=o*l-a,f=o*a-l,p=r*u,h>=0)if(f>=-p)if(f<=p){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-p?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=p?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),n&&n.copy(el).addScaledVector(Ks,f),d}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const i=Fn.dot(this.direction),n=Fn.dot(Fn)-i*i,r=e.radius*e.radius;if(n>r)return null;const o=Math.sqrt(r-n),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,n=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,n=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||r>n||((r>i||isNaN(i))&&(i=r),(o<n||isNaN(n))&&(n=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>n)||((a>i||i!==i)&&(i=a),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,n,r){tl.subVectors(t,e),Qs.subVectors(i,e),nl.crossVectors(tl,Qs);let o=this.direction.dot(nl),a;if(o>0){if(n)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Jn.subVectors(this.origin,e);const l=a*this.direction.dot(Qs.crossVectors(Jn,Qs));if(l<0)return null;const c=a*this.direction.dot(tl.cross(Jn));if(c<0||l+c>o)return null;const u=-a*Jn.dot(nl);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ve{constructor(e,t,i,n,r,o,a,l,c,u,h,f,d,p,_,g){Ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,o,a,l,c,u,h,f,d,p,_,g)}set(e,t,i,n,r,o,a,l,c,u,h,f,d,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=n,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ve().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/ar.setFromMatrixColumn(e,0).length(),r=1/ar.setFromMatrixColumn(e,1).length(),o=1/ar.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(n),c=Math.sin(n),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*u,d=o*h,p=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+p*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=p+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,p=c*u,_=c*h;t[0]=f+_*a,t[4]=p*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-p,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,p=c*u,_=c*h;t[0]=f-_*a,t[4]=-o*h,t[8]=p+d*a,t[1]=d+p*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,p=a*u,_=a*h;t[0]=l*u,t[4]=p*c-d,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=d*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=_-f*h,t[8]=p*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+p,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*l,d=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=o*u,t[9]=d*h-p,t[2]=p*h-d,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zg,e,kg)}lookAt(e,t,i){const n=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),Kn.crossVectors(i,tn),Kn.lengthSq()===0&&(Math.abs(i.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),Kn.crossVectors(i,tn)),Kn.normalize(),eo.crossVectors(tn,Kn),n[0]=Kn.x,n[4]=eo.x,n[8]=tn.x,n[1]=Kn.y,n[5]=eo.y,n[9]=tn.y,n[2]=Kn.z,n[6]=eo.z,n[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],p=i[2],_=i[6],g=i[10],m=i[14],y=i[3],v=i[7],x=i[11],S=i[15],b=n[0],E=n[4],A=n[8],M=n[12],w=n[1],I=n[5],R=n[9],z=n[13],C=n[2],N=n[6],k=n[10],H=n[14],$=n[3],q=n[7],V=n[11],G=n[15];return r[0]=o*b+a*w+l*C+c*$,r[4]=o*E+a*I+l*N+c*q,r[8]=o*A+a*R+l*k+c*V,r[12]=o*M+a*z+l*H+c*G,r[1]=u*b+h*w+f*C+d*$,r[5]=u*E+h*I+f*N+d*q,r[9]=u*A+h*R+f*k+d*V,r[13]=u*M+h*z+f*H+d*G,r[2]=p*b+_*w+g*C+m*$,r[6]=p*E+_*I+g*N+m*q,r[10]=p*A+_*R+g*k+m*V,r[14]=p*M+_*z+g*H+m*G,r[3]=y*b+v*w+x*C+S*$,r[7]=y*E+v*I+x*N+S*q,r[11]=y*A+v*R+x*k+S*V,r[15]=y*M+v*z+x*H+S*G,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],p=e[3],_=e[7],g=e[11],m=e[15];return p*(+r*l*h-n*c*h-r*a*f+i*c*f+n*a*d-i*l*d)+_*(+t*l*d-t*c*f+r*o*f-n*o*d+n*c*u-r*l*u)+g*(+t*c*h-t*a*d-r*o*h+i*o*d+r*a*u-i*c*u)+m*(-n*a*u-t*l*h+t*a*f+n*o*h-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],p=e[12],_=e[13],g=e[14],m=e[15],y=h*g*c-_*f*c+_*l*d-a*g*d-h*l*m+a*f*m,v=p*f*c-u*g*c-p*l*d+o*g*d+u*l*m-o*f*m,x=u*_*c-p*h*c+p*a*d-o*_*d-u*a*m+o*h*m,S=p*h*l-u*_*l-p*a*f+o*_*f+u*a*g-o*h*g,b=t*y+i*v+n*x+r*S;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/b;return e[0]=y*E,e[1]=(_*f*r-h*g*r-_*n*d+i*g*d+h*n*m-i*f*m)*E,e[2]=(a*g*r-_*l*r+_*n*c-i*g*c-a*n*m+i*l*m)*E,e[3]=(h*l*r-a*f*r-h*n*c+i*f*c+a*n*d-i*l*d)*E,e[4]=v*E,e[5]=(u*g*r-p*f*r+p*n*d-t*g*d-u*n*m+t*f*m)*E,e[6]=(p*l*r-o*g*r-p*n*c+t*g*c+o*n*m-t*l*m)*E,e[7]=(o*f*r-u*l*r+u*n*c-t*f*c-o*n*d+t*l*d)*E,e[8]=x*E,e[9]=(p*h*r-u*_*r-p*i*d+t*_*d+u*i*m-t*h*m)*E,e[10]=(o*_*r-p*a*r+p*i*c-t*_*c-o*i*m+t*a*m)*E,e[11]=(u*a*r-o*h*r-u*i*c+t*h*c+o*i*d-t*a*d)*E,e[12]=S*E,e[13]=(u*_*n-p*h*n+p*i*f-t*_*f-u*i*g+t*h*g)*E,e[14]=(p*a*n-o*_*n-p*i*l+t*_*l+o*i*g-t*a*g)*E,e[15]=(o*h*n-u*a*n+u*i*l-t*h*l-o*i*f+t*a*f)*E,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-n*l,c*l+n*a,0,c*a+n*l,u*a+i,u*l-n*o,0,c*l-n*a,u*l+n*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,o){return this.set(1,i,r,0,e,1,o,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,p=r*h,_=o*u,g=o*h,m=a*h,y=l*c,v=l*u,x=l*h,S=i.x,b=i.y,E=i.z;return n[0]=(1-(_+m))*S,n[1]=(d+x)*S,n[2]=(p-v)*S,n[3]=0,n[4]=(d-x)*b,n[5]=(1-(f+m))*b,n[6]=(g+y)*b,n[7]=0,n[8]=(p+v)*E,n[9]=(g-y)*E,n[10]=(1-(f+_))*E,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let r=ar.set(n[0],n[1],n[2]).length();const o=ar.set(n[4],n[5],n[6]).length(),a=ar.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),e.x=n[12],e.y=n[13],e.z=n[14],pn.copy(this);const c=1/r,u=1/o,h=1/a;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=u,pn.elements[5]*=u,pn.elements[6]*=u,pn.elements[8]*=h,pn.elements[9]*=h,pn.elements[10]*=h,t.setFromRotationMatrix(pn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,n,r,o,a=xn){const l=this.elements,c=2*r/(t-e),u=2*r/(i-n),h=(t+e)/(t-e),f=(i+n)/(i-n);let d,p;if(a===xn)d=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===Fr)d=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,n,r,o,a=xn){const l=this.elements,c=1/(t-e),u=1/(i-n),h=1/(o-r),f=(t+e)*c,d=(i+n)*u;let p,_;if(a===xn)p=(o+r)*h,_=-2*h;else if(a===Fr)p=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ar=new P,pn=new Ve,zg=new P(0,0,0),kg=new P(1,1,1),Kn=new P,eo=new P,tn=new P,Gu=new Ve,Hu=new Vt;class zs{constructor(e=0,t=0,i=0,n=zs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],o=n[4],a=n[8],l=n[1],c=n[5],u=n[9],h=n[2],f=n[6],d=n[10];switch(t){case"XYZ":this._y=Math.asin(vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(vt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-vt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Gu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hu.setFromEuler(this),this.setFromQuaternion(Hu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zs.DEFAULT_ORDER="XYZ";class zi{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gg=0;const Vu=new P,lr=new Vt,Nn=new Ve,to=new P,Zr=new P,Hg=new P,Vg=new Vt,Wu=new P(1,0,0),Xu=new P(0,1,0),qu=new P(0,0,1),Wg={type:"added"},Xg={type:"removed"};class at extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=on(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=at.DEFAULT_UP.clone();const e=new P,t=new zs,i=new Vt,n=new P(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Ve},normalMatrix:{value:new Ke}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=at.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.multiply(lr),this}rotateOnWorldAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.premultiply(lr),this}rotateX(e){return this.rotateOnAxis(Wu,e)}rotateY(e){return this.rotateOnAxis(Xu,e)}rotateZ(e){return this.rotateOnAxis(qu,e)}translateOnAxis(e,t){return Vu.copy(e).applyQuaternion(this.quaternion),this.position.add(Vu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wu,e)}translateY(e){return this.translateOnAxis(Xu,e)}translateZ(e){return this.translateOnAxis(qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?to.copy(e):to.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Zr,to,this.up):Nn.lookAt(to,Zr,this.up),this.quaternion.setFromRotationMatrix(Nn),n&&(Nn.extractRotation(n.matrixWorld),lr.setFromRotationMatrix(Nn),this.quaternion.premultiply(lr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Wg)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xg)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,e,Hg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,Vg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let r=0,o=n.length;r<o;r++){const a=n[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));n.material=a}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];n.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),p=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=n,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}at.DEFAULT_UP=new P(0,1,0);at.DEFAULT_MATRIX_AUTO_UPDATE=!0;at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new P,Bn=new P,il=new P,zn=new P,cr=new P,ur=new P,Yu=new P,rl=new P,sl=new P,ol=new P;let no=!1;class Jt{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),mn.subVectors(e,t),n.cross(mn);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){mn.subVectors(n,t),Bn.subVectors(i,t),il.subVectors(e,t);const o=mn.dot(mn),a=mn.dot(Bn),l=mn.dot(il),c=Bn.dot(Bn),u=Bn.dot(il),h=o*c-a*a;if(h===0)return r.set(-2,-1,-1);const f=1/h,d=(c*l-a*u)*f,p=(o*u-a*l)*f;return r.set(1-d-p,p,d)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,zn),zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getUV(e,t,i,n,r,o,a,l){return no===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),no=!0),this.getInterpolation(e,t,i,n,r,o,a,l)}static getInterpolation(e,t,i,n,r,o,a,l){return this.getBarycoord(e,t,i,n,zn),l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(o,zn.y),l.addScaledVector(a,zn.z),l}static isFrontFacing(e,t,i,n){return mn.subVectors(i,t),Bn.subVectors(e,t),mn.cross(Bn).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),mn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,r){return no===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),no=!0),Jt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}getInterpolation(e,t,i,n,r){return Jt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return Jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let o,a;cr.subVectors(n,i),ur.subVectors(r,i),rl.subVectors(e,i);const l=cr.dot(rl),c=ur.dot(rl);if(l<=0&&c<=0)return t.copy(i);sl.subVectors(e,n);const u=cr.dot(sl),h=ur.dot(sl);if(u>=0&&h<=u)return t.copy(n);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(cr,o);ol.subVectors(e,r);const d=cr.dot(ol),p=ur.dot(ol);if(p>=0&&d<=p)return t.copy(r);const _=d*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(i).addScaledVector(ur,a);const g=u*p-d*h;if(g<=0&&h-u>=0&&d-p>=0)return Yu.subVectors(r,n),a=(h-u)/(h-u+(d-p)),t.copy(n).addScaledVector(Yu,a);const m=1/(g+_+f);return o=_*m,a=f*m,t.copy(i).addScaledVector(cr,o).addScaledVector(ur,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},io={h:0,s:0,l:0};function al(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Re{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=lt.workingColorSpace){return this.r=e,this.g=t,this.b=i,lt.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=lt.workingColorSpace){if(e=Kc(e,1),t=vt(t,0,1),i=vt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=al(o,r,e+1/3),this.g=al(o,r,e),this.b=al(o,r,e-1/3)}return lt.toWorkingColorSpace(this,n),this}setStyle(e,t=Tt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){const i=Xd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Or(e.r),this.g=Or(e.g),this.b=Or(e.b),this}copyLinearToSRGB(e){return this.r=Za(e.r),this.g=Za(e.g),this.b=Za(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return lt.fromWorkingColorSpace(zt.copy(this),e),Math.round(vt(zt.r*255,0,255))*65536+Math.round(vt(zt.g*255,0,255))*256+Math.round(vt(zt.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.fromWorkingColorSpace(zt.copy(this),t);const i=zt.r,n=zt.g,r=zt.b,o=Math.max(i,n,r),a=Math.min(i,n,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(n-r)/h+(n<r?6:0);break;case n:l=(r-i)/h+2;break;case r:l=(i-n)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=lt.workingColorSpace){return lt.fromWorkingColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=Tt){lt.fromWorkingColorSpace(zt.copy(this),e);const t=zt.r,i=zt.g,n=zt.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(io);const i=hs(Qn.h,io.h,t),n=hs(Qn.s,io.s,t),r=hs(Qn.l,io.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new Re;Re.NAMES=Xd;let qg=0;class Wt extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qg++}),this.uuid=on(),this.name="",this.type="Material",this.blending=Ni,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ra,this.blendDst=sa,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ni&&(i.blending=this.blending),this.side!==Wn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ra&&(i.blendSrc=this.blendSrc),this.blendDst!==sa&&(i.blendDst=this.blendDst),this.blendEquation!==ni&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=n(e.textures),o=n(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class jn extends Wt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ns,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Gn=Yg();function Yg(){const s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),i=new Uint32Array(512),n=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(i[l]=0,i[l|256]=32768,n[l]=24,n[l|256]=24):c<-14?(i[l]=1024>>-c-14,i[l|256]=1024>>-c-14|32768,n[l]=-c-1,n[l|256]=-c-1):c<=15?(i[l]=c+15<<10,i[l|256]=c+15<<10|32768,n[l]=13,n[l|256]=13):c<128?(i[l]=31744,i[l|256]=64512,n[l]=24,n[l|256]=24):(i[l]=31744,i[l|256]=64512,n[l]=13,n[l|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;!(c&8388608);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:i,shiftTable:n,mantissaTable:r,exponentTable:o,offsetTable:a}}function $t(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=vt(s,-65504,65504),Gn.floatView[0]=s;const e=Gn.uint32View[0],t=e>>23&511;return Gn.baseTable[t]+((e&8388607)>>Gn.shiftTable[t])}function as(s){const e=s>>10;return Gn.uint32View[0]=Gn.mantissaTable[Gn.offsetTable[e]+(s&1023)]+Gn.exponentTable[e],Gn.floatView[0]}const jg={toHalfFloat:$t,fromHalfFloat:as},wt=new P,ro=new se;class ct{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ts,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn('THREE.BufferAttribute: "updateRange" is deprecated and removed in r169. Use "addUpdateRange()" instead.'),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ro.fromBufferAttribute(this,t),ro.applyMatrix3(e),this.setXY(t,ro.x,ro.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Kt(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Qe(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Kt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Kt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Kt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Kt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array),r=Qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ts&&(e.usage=this.usage),e}}class Zg extends ct{constructor(e,t,i){super(new Int8Array(e),t,i)}}class $g extends ct{constructor(e,t,i){super(new Uint8Array(e),t,i)}}class Jg extends ct{constructor(e,t,i){super(new Uint8ClampedArray(e),t,i)}}class Kg extends ct{constructor(e,t,i){super(new Int16Array(e),t,i)}}class nu extends ct{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Qg extends ct{constructor(e,t,i){super(new Int32Array(e),t,i)}}class iu extends ct{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class e0 extends ct{constructor(e,t,i){super(new Uint16Array(e),t,i),this.isFloat16BufferAttribute=!0}getX(e){let t=as(this.array[e*this.itemSize]);return this.normalized&&(t=Kt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=$t(t),this}getY(e){let t=as(this.array[e*this.itemSize+1]);return this.normalized&&(t=Kt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=$t(t),this}getZ(e){let t=as(this.array[e*this.itemSize+2]);return this.normalized&&(t=Kt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=$t(t),this}getW(e){let t=as(this.array[e*this.itemSize+3]);return this.normalized&&(t=Kt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=$t(t),this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array)),this.array[e+0]=$t(t),this.array[e+1]=$t(i),this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array)),this.array[e+0]=$t(t),this.array[e+1]=$t(i),this.array[e+2]=$t(n),this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array),r=Qe(r,this.array)),this.array[e+0]=$t(t),this.array[e+1]=$t(i),this.array[e+2]=$t(n),this.array[e+3]=$t(r),this}}class Oe extends ct{constructor(e,t,i){super(new Float32Array(e),t,i)}}class t0 extends ct{constructor(e,t,i){super(new Float64Array(e),t,i)}}let n0=0;const ln=new Ve,ll=new at,hr=new P,nn=new Et,$r=new Et,Ut=new P;class et extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=on(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hd(e)?iu:nu)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,i){return ln.makeTranslation(e,t,i),this.applyMatrix4(ln),this}scale(e,t,i){return ln.makeScale(e,t,i),this.applyMatrix4(ln),this}lookAt(e){return ll.lookAt(e),ll.updateMatrix(),this.applyMatrix4(ll.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hr).negate(),this.translate(hr.x,hr.y,hr.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Oe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Et);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new At);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];$r.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(nn.min,$r.min),nn.expandByPoint(Ut),Ut.addVectors(nn.max,$r.max),nn.expandByPoint(Ut)):(nn.expandByPoint($r.min),nn.expandByPoint($r.max))}nn.getCenter(i);let n=0;for(let r=0,o=e.count;r<o;r++)Ut.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(Ut));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ut.fromBufferAttribute(a,c),l&&(hr.fromBufferAttribute(e,c),Ut.add(hr)),n=Math.max(n,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,n=t.position.array,r=t.normal.array,o=t.uv.array,a=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ct(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<a;w++)c[w]=new P,u[w]=new P;const h=new P,f=new P,d=new P,p=new se,_=new se,g=new se,m=new P,y=new P;function v(w,I,R){h.fromArray(n,w*3),f.fromArray(n,I*3),d.fromArray(n,R*3),p.fromArray(o,w*2),_.fromArray(o,I*2),g.fromArray(o,R*2),f.sub(h),d.sub(h),_.sub(p),g.sub(p);const z=1/(_.x*g.y-g.x*_.y);isFinite(z)&&(m.copy(f).multiplyScalar(g.y).addScaledVector(d,-_.y).multiplyScalar(z),y.copy(d).multiplyScalar(_.x).addScaledVector(f,-g.x).multiplyScalar(z),c[w].add(m),c[I].add(m),c[R].add(m),u[w].add(y),u[I].add(y),u[R].add(y))}let x=this.groups;x.length===0&&(x=[{start:0,count:i.length}]);for(let w=0,I=x.length;w<I;++w){const R=x[w],z=R.start,C=R.count;for(let N=z,k=z+C;N<k;N+=3)v(i[N+0],i[N+1],i[N+2])}const S=new P,b=new P,E=new P,A=new P;function M(w){E.fromArray(r,w*3),A.copy(E);const I=c[w];S.copy(I),S.sub(E.multiplyScalar(E.dot(I))).normalize(),b.crossVectors(A,I);const z=b.dot(u[w])<0?-1:1;l[w*4]=S.x,l[w*4+1]=S.y,l[w*4+2]=S.z,l[w*4+3]=z}for(let w=0,I=x.length;w<I;++w){const R=x[w],z=R.start,C=R.count;for(let N=z,k=z+C;N<k;N+=3)M(i[N+0]),M(i[N+1]),M(i[N+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ct(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const n=new P,r=new P,o=new P,a=new P,l=new P,c=new P,u=new P,h=new P;if(e)for(let f=0,d=e.count;f<d;f+=3){const p=e.getX(f+0),_=e.getX(f+1),g=e.getX(f+2);n.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,r),h.subVectors(n,r),u.cross(h),a.fromBufferAttribute(i,p),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)n.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(n,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let m=0;m<u;m++)f[p++]=c[d++]}return new ct(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new et,i=this.index.array,n=this.attributes;for(const a in n){const l=n[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(n[l]=u,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const c in n){const u=n[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ju=new Ve,yi=new $i,so=new At,Zu=new P,fr=new P,dr=new P,pr=new P,cl=new P,oo=new P,ao=new se,lo=new se,co=new se,$u=new P,Ju=new P,Ku=new P,uo=new P,ho=new P;class mt extends at{constructor(e=new et,t=new jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const a=this.morphTargetInfluences;if(r&&a){oo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(cl.fromBufferAttribute(h,e),o?oo.addScaledVector(cl,u):oo.addScaledVector(cl.sub(t),u))}t.add(oo)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),so.copy(i.boundingSphere),so.applyMatrix4(r),yi.copy(e.ray).recast(e.near),!(so.containsPoint(yi.origin)===!1&&(yi.intersectSphere(so,Zu)===null||yi.origin.distanceToSquared(Zu)>(e.far-e.near)**2))&&(ju.copy(r).invert(),yi.copy(e.ray).applyMatrix4(ju),!(i.boundingBox!==null&&yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,yi)))}_computeIntersections(e,t,i){let n;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const g=f[p],m=o[g.materialIndex],y=Math.max(g.start,d.start),v=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let x=y,S=v;x<S;x+=3){const b=a.getX(x),E=a.getX(x+1),A=a.getX(x+2);n=fo(this,m,e,i,c,u,h,b,E,A),n&&(n.faceIndex=Math.floor(x/3),n.face.materialIndex=g.materialIndex,t.push(n))}}else{const p=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const y=a.getX(g),v=a.getX(g+1),x=a.getX(g+2);n=fo(this,o,e,i,c,u,h,y,v,x),n&&(n.faceIndex=Math.floor(g/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const g=f[p],m=o[g.materialIndex],y=Math.max(g.start,d.start),v=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let x=y,S=v;x<S;x+=3){const b=x,E=x+1,A=x+2;n=fo(this,m,e,i,c,u,h,b,E,A),n&&(n.faceIndex=Math.floor(x/3),n.face.materialIndex=g.materialIndex,t.push(n))}}else{const p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const y=g,v=g+1,x=g+2;n=fo(this,o,e,i,c,u,h,y,v,x),n&&(n.faceIndex=Math.floor(g/3),t.push(n))}}}}function i0(s,e,t,i,n,r,o,a){let l;if(e.side===Ht?l=i.intersectTriangle(o,r,n,!0,a):l=i.intersectTriangle(n,r,o,e.side===Wn,a),l===null)return null;ho.copy(a),ho.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(ho);return c<t.near||c>t.far?null:{distance:c,point:ho.clone(),object:s}}function fo(s,e,t,i,n,r,o,a,l,c){s.getVertexPosition(a,fr),s.getVertexPosition(l,dr),s.getVertexPosition(c,pr);const u=i0(s,e,t,i,fr,dr,pr,uo);if(u){n&&(ao.fromBufferAttribute(n,a),lo.fromBufferAttribute(n,l),co.fromBufferAttribute(n,c),u.uv=Jt.getInterpolation(uo,fr,dr,pr,ao,lo,co,new se)),r&&(ao.fromBufferAttribute(r,a),lo.fromBufferAttribute(r,l),co.fromBufferAttribute(r,c),u.uv1=Jt.getInterpolation(uo,fr,dr,pr,ao,lo,co,new se),u.uv2=u.uv1),o&&($u.fromBufferAttribute(o,a),Ju.fromBufferAttribute(o,l),Ku.fromBufferAttribute(o,c),u.normal=Jt.getInterpolation(uo,fr,dr,pr,$u,Ju,Ku,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new P,materialIndex:0};Jt.getNormal(fr,dr,pr,h.normal),u.face=h}return u}class Ji extends et{constructor(e=1,t=1,i=1,n=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:o};const a=this;n=Math.floor(n),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;p("z","y","x",-1,-1,i,t,e,o,r,0),p("z","y","x",1,-1,i,t,-e,o,r,1),p("x","z","y",1,1,e,i,t,n,o,2),p("x","z","y",1,-1,e,i,-t,n,o,3),p("x","y","z",1,-1,e,t,i,n,r,4),p("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new Oe(c,3)),this.setAttribute("normal",new Oe(u,3)),this.setAttribute("uv",new Oe(h,2));function p(_,g,m,y,v,x,S,b,E,A,M){const w=x/E,I=S/A,R=x/2,z=S/2,C=b/2,N=E+1,k=A+1;let H=0,$=0;const q=new P;for(let V=0;V<k;V++){const G=V*I-z;for(let j=0;j<N;j++){const O=j*w-R;q[_]=O*y,q[g]=G*v,q[m]=C,c.push(q.x,q.y,q.z),q[_]=0,q[g]=0,q[m]=b>0?1:-1,u.push(q.x,q.y,q.z),h.push(j/E),h.push(1-V/A),H+=1}}for(let V=0;V<A;V++)for(let G=0;G<E;G++){const j=f+G+N*V,O=f+G+N*(V+1),Y=f+(G+1)+N*(V+1),te=f+(G+1)+N*V;l.push(j,O,te),l.push(O,Y,te),$+=6}a.addGroup(d,$,M),d+=$,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Br(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function qt(s){const e={};for(let t=0;t<s.length;t++){const i=Br(s[t]);for(const n in i)e[n]=i[n]}return e}function r0(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function qd(s){return s.getRenderTarget()===null?s.outputColorSpace:lt.workingColorSpace}const zr={clone:Br,merge:qt};var s0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hn extends Wt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=s0,this.fragmentShader=o0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Br(e.uniforms),this.uniformsGroups=r0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const o=this.uniforms[n].value;o&&o.isTexture?t.uniforms[n]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[n]={type:"m4",value:o.toArray()}:t.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ks extends at{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=xn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}let bt=class extends ks{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Nr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Bi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Nr*2*Math.atan(Math.tan(Bi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Bi*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*n/l,t-=o.offsetY*i/c,n*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};const mr=-90,gr=1;class Yd extends at{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new bt(mr,gr,e,t);n.layers=this.layers,this.add(n);const r=new bt(mr,gr,e,t);r.layers=this.layers,this.add(r);const o=new bt(mr,gr,e,t);o.layers=this.layers,this.add(o);const a=new bt(mr,gr,e,t);a.layers=this.layers,this.add(a);const l=new bt(mr,gr,e,t);l.layers=this.layers,this.add(l);const c=new bt(mr,gr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===xn)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Fr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,r),e.setRenderTarget(i,1,n),e.render(t,o),e.setRenderTarget(i,2,n),e.render(t,a),e.setRenderTarget(i,3,n),e.render(t,l),e.setRenderTarget(i,4,n),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,n),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Gs extends yt{constructor(e,t,i,n,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Xn,super(e,t,i,n,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jd extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];t.encoding!==void 0&&(fs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===si?Tt:rn),this.texture=new Gs(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Ji(5,5,5),r=new hn({name:"CubemapFromEquirect",uniforms:Br(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:Vn});r.uniforms.tEquirect.value=t;const o=new mt(n,r),a=t.minFilter;return t.minFilter===li&&(t.minFilter=ft),new Yd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,n){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,n);e.setRenderTarget(r)}}const ul=new P,a0=new P,l0=new Ke;class En{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=ul.subVectors(i,t).cross(a0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ul),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||l0.getNormalMatrix(e),n=this.coplanarPoint(ul).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new At,po=new P;class Hs{constructor(e=new En,t=new En,i=new En,n=new En,r=new En,o=new En){this.planes=[e,t,i,n,r,o]}set(e,t,i,n,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(n),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=xn){const i=this.planes,n=e.elements,r=n[0],o=n[1],a=n[2],l=n[3],c=n[4],u=n[5],h=n[6],f=n[7],d=n[8],p=n[9],_=n[10],g=n[11],m=n[12],y=n[13],v=n[14],x=n[15];if(i[0].setComponents(l-r,f-c,g-d,x-m).normalize(),i[1].setComponents(l+r,f+c,g+d,x+m).normalize(),i[2].setComponents(l+o,f+u,g+p,x+y).normalize(),i[3].setComponents(l-o,f-u,g-p,x-y).normalize(),i[4].setComponents(l-a,f-h,g-_,x-v).normalize(),t===xn)i[5].setComponents(l+a,f+h,g+_,x+v).normalize();else if(t===Fr)i[5].setComponents(a,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(e){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(po.x=n.normal.x>0?e.max.x:e.min.x,po.y=n.normal.y>0?e.max.y:e.min.y,po.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(po)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zd(){let s=null,e=!1,t=null,i=null;function n(r,o){t(r,o),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function c0(s,e){const t=e.isWebGL2,i=new WeakMap;function n(c,u){const h=c.array,f=c.usage,d=h.byteLength,p=s.createBuffer();s.bindBuffer(u,p),s.bufferData(u,h,f),c.onUploadCallback();let _;if(h instanceof Float32Array)_=s.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=s.SHORT;else if(h instanceof Uint32Array)_=s.UNSIGNED_INT;else if(h instanceof Int32Array)_=s.INT;else if(h instanceof Int8Array)_=s.BYTE;else if(h instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:d}}function r(c,u,h){const f=u.array,d=u._updateRange,p=u.updateRanges;if(s.bindBuffer(h,c),d.count===-1&&p.length===0&&s.bufferSubData(h,0,f),p.length!==0){for(let _=0,g=p.length;_<g;_++){const m=p[_];t?s.bufferSubData(h,m.start*f.BYTES_PER_ELEMENT,f,m.start,m.count):s.bufferSubData(h,m.start*f.BYTES_PER_ELEMENT,f.subarray(m.start,m.start+m.count))}u.clearUpdateRanges()}d.count!==-1&&(t?s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(s.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);if(h===void 0)i.set(c,n(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,c,u),h.version=c.version}}return{get:o,remove:a,update:l}}class hi extends et{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(n),c=a+1,u=l+1,h=e/a,f=t/l,d=[],p=[],_=[],g=[];for(let m=0;m<u;m++){const y=m*f-o;for(let v=0;v<c;v++){const x=v*h-r;p.push(x,-y,0),_.push(0,0,1),g.push(v/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<a;y++){const v=y+c*m,x=y+c*(m+1),S=y+1+c*(m+1),b=y+1+c*m;d.push(v,x,b),d.push(x,S,b)}this.setIndex(d),this.setAttribute("position",new Oe(p,3)),this.setAttribute("normal",new Oe(_,3)),this.setAttribute("uv",new Oe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hi(e.width,e.height,e.widthSegments,e.heightSegments)}}var u0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,h0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,f0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,d0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p0=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,m0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,g0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,v0=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,y0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,x0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,S0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,M0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,b0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,w0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,E0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,T0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,A0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,C0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,R0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,P0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,L0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,U0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,I0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,D0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,O0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,F0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,N0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,B0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,z0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,k0="gl_FragColor = linearToOutputTexel( gl_FragColor );",G0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,H0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,V0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,W0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,X0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,q0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Y0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,j0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Z0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,J0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,K0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Q0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,e_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,t_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,n_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,i_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,r_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,s_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,o_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,l_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,c_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,u_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,h_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,f_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,d_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,p_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,g_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,__=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,v_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,y_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,x_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,S_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,M_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,b_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,w_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,E_=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,T_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,A_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,C_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,R_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,P_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,L_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,U_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,I_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,D_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,O_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,F_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,N_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,B_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,z_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,k_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,G_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,H_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,W_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,X_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,q_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Y_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,j_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Z_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,J_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,K_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Q_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ev=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,iv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,av=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,_v=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,yv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ev=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Av=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Cv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Pv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Iv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Dv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ov=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Bv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:u0,alphahash_pars_fragment:h0,alphamap_fragment:f0,alphamap_pars_fragment:d0,alphatest_fragment:p0,alphatest_pars_fragment:m0,aomap_fragment:g0,aomap_pars_fragment:_0,batching_pars_vertex:v0,batching_vertex:y0,begin_vertex:x0,beginnormal_vertex:S0,bsdfs:M0,iridescence_fragment:b0,bumpmap_pars_fragment:w0,clipping_planes_fragment:E0,clipping_planes_pars_fragment:T0,clipping_planes_pars_vertex:A0,clipping_planes_vertex:C0,color_fragment:R0,color_pars_fragment:P0,color_pars_vertex:L0,color_vertex:U0,common:I0,cube_uv_reflection_fragment:D0,defaultnormal_vertex:O0,displacementmap_pars_vertex:F0,displacementmap_vertex:N0,emissivemap_fragment:B0,emissivemap_pars_fragment:z0,colorspace_fragment:k0,colorspace_pars_fragment:G0,envmap_fragment:H0,envmap_common_pars_fragment:V0,envmap_pars_fragment:W0,envmap_pars_vertex:X0,envmap_physical_pars_fragment:i_,envmap_vertex:q0,fog_vertex:Y0,fog_pars_vertex:j0,fog_fragment:Z0,fog_pars_fragment:$0,gradientmap_pars_fragment:J0,lightmap_fragment:K0,lightmap_pars_fragment:Q0,lights_lambert_fragment:e_,lights_lambert_pars_fragment:t_,lights_pars_begin:n_,lights_toon_fragment:r_,lights_toon_pars_fragment:s_,lights_phong_fragment:o_,lights_phong_pars_fragment:a_,lights_physical_fragment:l_,lights_physical_pars_fragment:c_,lights_fragment_begin:u_,lights_fragment_maps:h_,lights_fragment_end:f_,logdepthbuf_fragment:d_,logdepthbuf_pars_fragment:p_,logdepthbuf_pars_vertex:m_,logdepthbuf_vertex:g_,map_fragment:__,map_pars_fragment:v_,map_particle_fragment:y_,map_particle_pars_fragment:x_,metalnessmap_fragment:S_,metalnessmap_pars_fragment:M_,morphcolor_vertex:b_,morphnormal_vertex:w_,morphtarget_pars_vertex:E_,morphtarget_vertex:T_,normal_fragment_begin:A_,normal_fragment_maps:C_,normal_pars_fragment:R_,normal_pars_vertex:P_,normal_vertex:L_,normalmap_pars_fragment:U_,clearcoat_normal_fragment_begin:I_,clearcoat_normal_fragment_maps:D_,clearcoat_pars_fragment:O_,iridescence_pars_fragment:F_,opaque_fragment:N_,packing:B_,premultiplied_alpha_fragment:z_,project_vertex:k_,dithering_fragment:G_,dithering_pars_fragment:H_,roughnessmap_fragment:V_,roughnessmap_pars_fragment:W_,shadowmap_pars_fragment:X_,shadowmap_pars_vertex:q_,shadowmap_vertex:Y_,shadowmask_pars_fragment:j_,skinbase_vertex:Z_,skinning_pars_vertex:$_,skinning_vertex:J_,skinnormal_vertex:K_,specularmap_fragment:Q_,specularmap_pars_fragment:ev,tonemapping_fragment:tv,tonemapping_pars_fragment:nv,transmission_fragment:iv,transmission_pars_fragment:rv,uv_pars_fragment:sv,uv_pars_vertex:ov,uv_vertex:av,worldpos_vertex:lv,background_vert:cv,background_frag:uv,backgroundCube_vert:hv,backgroundCube_frag:fv,cube_vert:dv,cube_frag:pv,depth_vert:mv,depth_frag:gv,distanceRGBA_vert:_v,distanceRGBA_frag:vv,equirect_vert:yv,equirect_frag:xv,linedashed_vert:Sv,linedashed_frag:Mv,meshbasic_vert:bv,meshbasic_frag:wv,meshlambert_vert:Ev,meshlambert_frag:Tv,meshmatcap_vert:Av,meshmatcap_frag:Cv,meshnormal_vert:Rv,meshnormal_frag:Pv,meshphong_vert:Lv,meshphong_frag:Uv,meshphysical_vert:Iv,meshphysical_frag:Dv,meshtoon_vert:Ov,meshtoon_frag:Fv,points_vert:Nv,points_frag:Bv,shadow_vert:zv,shadow_frag:kv,sprite_vert:Gv,sprite_frag:Hv},we={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},vn={basic:{uniforms:qt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:qt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Re(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:qt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:qt([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:qt([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Re(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:qt([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:qt([we.points,we.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:qt([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:qt([we.common,we.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:qt([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:qt([we.sprite,we.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:qt([we.common,we.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:qt([we.lights,we.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};vn.physical={uniforms:qt([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const mo={r:0,b:0,g:0};function Vv(s,e,t,i,n,r,o){const a=new Re(0);let l=r===!0?0:1,c,u,h=null,f=0,d=null;function p(g,m){let y=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,l):v&&v.isColor&&(_(v,1),y=!0);const x=s.xr.getEnvironmentBlendMode();x==="additive"?i.buffers.color.setClear(0,0,0,1,o):x==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Hr)?(u===void 0&&(u=new mt(new Ji(1,1,1),new hn({name:"BackgroundCubeMaterial",uniforms:Br(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(S,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=lt.getTransfer(v.colorSpace)!==ut,(h!==v||f!==v.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,d=s.toneMapping),u.layers.enableAll(),g.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new mt(new hi(2,2),new hn({name:"BackgroundMaterial",uniforms:Br(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=lt.getTransfer(v.colorSpace)!==ut,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=s.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function _(g,m){g.getRGB(mo,qd(s)),i.buffers.color.setClear(mo.r,mo.g,mo.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(g,m=1){a.set(g),l=m,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,_(a,l)},render:p}}function Wv(s,e,t,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},l=g(null);let c=l,u=!1;function h(C,N,k,H,$){let q=!1;if(o){const V=_(H,k,N);c!==V&&(c=V,d(c.object)),q=m(C,H,k,$),q&&y(C,H,k,$)}else{const V=N.wireframe===!0;(c.geometry!==H.id||c.program!==k.id||c.wireframe!==V)&&(c.geometry=H.id,c.program=k.id,c.wireframe=V,q=!0)}$!==null&&t.update($,s.ELEMENT_ARRAY_BUFFER),(q||u)&&(u=!1,A(C,N,k,H),$!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function f(){return i.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function d(C){return i.isWebGL2?s.bindVertexArray(C):r.bindVertexArrayOES(C)}function p(C){return i.isWebGL2?s.deleteVertexArray(C):r.deleteVertexArrayOES(C)}function _(C,N,k){const H=k.wireframe===!0;let $=a[C.id];$===void 0&&($={},a[C.id]=$);let q=$[N.id];q===void 0&&(q={},$[N.id]=q);let V=q[H];return V===void 0&&(V=g(f()),q[H]=V),V}function g(C){const N=[],k=[],H=[];for(let $=0;$<n;$++)N[$]=0,k[$]=0,H[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:H,object:C,attributes:{},index:null}}function m(C,N,k,H){const $=c.attributes,q=N.attributes;let V=0;const G=k.getAttributes();for(const j in G)if(G[j].location>=0){const Y=$[j];let te=q[j];if(te===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(te=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(te=C.instanceColor)),Y===void 0||Y.attribute!==te||te&&Y.data!==te.data)return!0;V++}return c.attributesNum!==V||c.index!==H}function y(C,N,k,H){const $={},q=N.attributes;let V=0;const G=k.getAttributes();for(const j in G)if(G[j].location>=0){let Y=q[j];Y===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(Y=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(Y=C.instanceColor));const te={};te.attribute=Y,Y&&Y.data&&(te.data=Y.data),$[j]=te,V++}c.attributes=$,c.attributesNum=V,c.index=H}function v(){const C=c.newAttributes;for(let N=0,k=C.length;N<k;N++)C[N]=0}function x(C){S(C,0)}function S(C,N){const k=c.newAttributes,H=c.enabledAttributes,$=c.attributeDivisors;k[C]=1,H[C]===0&&(s.enableVertexAttribArray(C),H[C]=1),$[C]!==N&&((i.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,N),$[C]=N)}function b(){const C=c.newAttributes,N=c.enabledAttributes;for(let k=0,H=N.length;k<H;k++)N[k]!==C[k]&&(s.disableVertexAttribArray(k),N[k]=0)}function E(C,N,k,H,$,q,V){V===!0?s.vertexAttribIPointer(C,N,k,$,q):s.vertexAttribPointer(C,N,k,H,$,q)}function A(C,N,k,H){if(i.isWebGL2===!1&&(C.isInstancedMesh||H.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const $=H.attributes,q=k.getAttributes(),V=N.defaultAttributeValues;for(const G in q){const j=q[G];if(j.location>=0){let O=$[G];if(O===void 0&&(G==="instanceMatrix"&&C.instanceMatrix&&(O=C.instanceMatrix),G==="instanceColor"&&C.instanceColor&&(O=C.instanceColor)),O!==void 0){const Y=O.normalized,te=O.itemSize,ge=t.get(O);if(ge===void 0)continue;const _e=ge.buffer,Ee=ge.type,De=ge.bytesPerElement,xe=i.isWebGL2===!0&&(Ee===s.INT||Ee===s.UNSIGNED_INT||O.gpuType===Gc);if(O.isInterleavedBufferAttribute){const fe=O.data,D=fe.stride,pe=O.offset;if(fe.isInstancedInterleavedBuffer){for(let J=0;J<j.locationSize;J++)S(j.location+J,fe.meshPerAttribute);C.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let J=0;J<j.locationSize;J++)x(j.location+J);s.bindBuffer(s.ARRAY_BUFFER,_e);for(let J=0;J<j.locationSize;J++)E(j.location+J,te/j.locationSize,Ee,Y,D*De,(pe+te/j.locationSize*J)*De,xe)}else{if(O.isInstancedBufferAttribute){for(let fe=0;fe<j.locationSize;fe++)S(j.location+fe,O.meshPerAttribute);C.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let fe=0;fe<j.locationSize;fe++)x(j.location+fe);s.bindBuffer(s.ARRAY_BUFFER,_e);for(let fe=0;fe<j.locationSize;fe++)E(j.location+fe,te/j.locationSize,Ee,Y,te*De,te/j.locationSize*fe*De,xe)}}else if(V!==void 0){const Y=V[G];if(Y!==void 0)switch(Y.length){case 2:s.vertexAttrib2fv(j.location,Y);break;case 3:s.vertexAttrib3fv(j.location,Y);break;case 4:s.vertexAttrib4fv(j.location,Y);break;default:s.vertexAttrib1fv(j.location,Y)}}}}b()}function M(){R();for(const C in a){const N=a[C];for(const k in N){const H=N[k];for(const $ in H)p(H[$].object),delete H[$];delete N[k]}delete a[C]}}function w(C){if(a[C.id]===void 0)return;const N=a[C.id];for(const k in N){const H=N[k];for(const $ in H)p(H[$].object),delete H[$];delete N[k]}delete a[C.id]}function I(C){for(const N in a){const k=a[N];if(k[C.id]===void 0)continue;const H=k[C.id];for(const $ in H)p(H[$].object),delete H[$];delete k[C.id]}}function R(){z(),u=!0,c!==l&&(c=l,d(c.object))}function z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:R,resetDefaultState:z,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:x,disableUnusedAttributes:b}}function Xv(s,e,t,i){const n=i.isWebGL2;let r;function o(u){r=u}function a(u,h){s.drawArrays(r,u,h),t.update(h,r,1)}function l(u,h,f){if(f===0)return;let d,p;if(n)d=s,p="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](r,u,h,f),t.update(h,r,f)}function c(u,h,f){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<f;p++)this.render(u[p],h[p]);else{d.multiDrawArraysWEBGL(r,u,0,h,0,f);let p=0;for(let _=0;_<f;_++)p+=h[_];t.update(p,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function qv(s,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),g=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),m=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,x=o||e.has("OES_texture_float"),S=v&&x,b=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:n,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:p,maxAttributes:_,maxVertexUniforms:g,maxVaryings:m,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:x,floatVertexTextures:S,maxSamples:b}}function Yv(s){const e=this;let t=null,i=0,n=!1,r=!1;const o=new En,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||n;return n=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const p=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,m=s.get(h);if(!n||p===null||p.length===0||r&&!g)r?u(null):c();else{const y=r?0:i,v=y*4;let x=m.clippingState||null;l.value=x,x=u(p,f,v,d);for(let S=0;S!==v;++S)x[S]=t[S];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,d,p){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=d+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<m)&&(g=new Float32Array(m));for(let v=0,x=d;v!==_;++v,x+=4)o.copy(h[v]).applyMatrix4(y,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function jv(s){let e=new WeakMap;function t(o,a){return a===gs?o.mapping=Xn:a===_s&&(o.mapping=ai),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===gs||a===_s)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new jd(l.height/2);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",n),t(c.texture,o.mapping)}else return null}}return o}function n(o){const a=o.target;a.removeEventListener("dispose",n);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class oi extends ks{constructor(e=-1,t=1,i=1,n=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ur=4,Qu=[.125,.215,.35,.446,.526,.582],Ui=20,hl=new oi,eh=new Re;let fl=null,dl=0,pl=0;const Li=(1+Math.sqrt(5))/2,_r=1/Li,th=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Li,_r),new P(0,Li,-_r),new P(_r,0,Li),new P(-_r,0,Li),new P(Li,_r,0),new P(-Li,_r,0)];class Ec{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){fl=this._renderer.getRenderTarget(),dl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,n,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ih(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fl,dl,pl),e.scissorTest=!1,go(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xn||e.mapping===ai?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fl=this._renderer.getRenderTarget(),dl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ft,minFilter:ft,generateMipmaps:!1,type:Xi,format:jt,colorSpace:Pn,depthBuffer:!1},n=nh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nh(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zv(r)),this._blurMaterial=$v(r,e,t)}return n}_compileMaterial(e){const t=new mt(this._lodPlanes[0],e);this._renderer.compile(t,hl)}_sceneToCubeUV(e,t,i,n){const a=new bt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(eh),u.toneMapping=An,u.autoClear=!1;const d=new jn({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),p=new mt(new Ji,d);let _=!1;const g=e.background;g?g.isColor&&(d.color.copy(g),e.background=null,_=!0):(d.color.copy(eh),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):y===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const v=this._cubeSize;go(n,y*v,m>2?v:0,v,v),u.setRenderTarget(n),_&&u.render(p,a),u.render(e,a)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=g}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===Xn||e.mapping===ai;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=rh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ih());const r=n?this._cubemapMaterial:this._equirectMaterial,o=new mt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;go(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,hl)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const r=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),o=th[(n-1)%th.length];this._blur(e,n-1,n,r,o)}t.autoClear=i}_blur(e,t,i,n,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,n,"latitudinal",r),this._halfBlur(o,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new mt(this._lodPlanes[n],c),f=c.uniforms,d=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ui-1),_=r/p,g=isFinite(r)?1+Math.floor(u*_):Ui;g>Ui&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ui}`);const m=[];let y=0;for(let E=0;E<Ui;++E){const A=E/_,M=Math.exp(-A*A/2);m.push(M),E===0?y+=M:E<g&&(y+=2*M)}for(let E=0;E<m.length;E++)m[E]=m[E]/y;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=p,f.mipInt.value=v-i;const x=this._sizeLods[n],S=3*x*(n>v-Ur?n-v+Ur:0),b=4*(this._cubeSize-x);go(t,S,b,3*x,2*x),l.setRenderTarget(t),l.render(h,hl)}}function Zv(s){const e=[],t=[],i=[];let n=s;const r=s-Ur+1+Qu.length;for(let o=0;o<r;o++){const a=Math.pow(2,n);t.push(a);let l=1/a;o>s-Ur?l=Qu[o-s+Ur-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,p=6,_=3,g=2,m=1,y=new Float32Array(_*p*d),v=new Float32Array(g*p*d),x=new Float32Array(m*p*d);for(let b=0;b<d;b++){const E=b%3*2/3-1,A=b>2?0:-1,M=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];y.set(M,_*p*b),v.set(f,g*p*b);const w=[b,b,b,b,b,b];x.set(w,m*p*b)}const S=new et;S.setAttribute("position",new ct(y,_)),S.setAttribute("uv",new ct(v,g)),S.setAttribute("faceIndex",new ct(x,m)),e.push(S),n>Ur&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function nh(s,e,t){const i=new un(s,e,t);return i.texture.mapping=Hr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function go(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function $v(s,e,t){const i=new Float32Array(Ui),n=new P(0,1,0);return new hn({name:"SphericalGaussianBlur",defines:{n:Ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ih(){return new hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function rh(){return new hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ru(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Jv(s){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===gs||l===_s,u=l===Xn||l===ai;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new Ec(s)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&n(h)){t===null&&(t=new Ec(s));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function n(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Kv(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Qv(s,e,t,i){const n={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);for(const p in f.morphAttributes){const _=f.morphAttributes[p];for(let g=0,m=_.length;g<m;g++)e.remove(_[g])}f.removeEventListener("dispose",o),delete n[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return n[f.id]===!0||(f.addEventListener("dispose",o),n[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const p in f)e.update(f[p],s.ARRAY_BUFFER);const d=h.morphAttributes;for(const p in d){const _=d[p];for(let g=0,m=_.length;g<m;g++)e.update(_[g],s.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,p=h.attributes.position;let _=0;if(d!==null){const y=d.array;_=d.version;for(let v=0,x=y.length;v<x;v+=3){const S=y[v+0],b=y[v+1],E=y[v+2];f.push(S,b,b,E,E,S)}}else if(p!==void 0){const y=p.array;_=p.version;for(let v=0,x=y.length/3-1;v<x;v+=3){const S=v+0,b=v+1,E=v+2;f.push(S,b,b,E,E,S)}}else return;const g=new(Hd(f)?iu:nu)(f,1);g.version=_;const m=r.get(h);m&&e.remove(m),r.set(h,g)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function ey(s,e,t,i){const n=i.isWebGL2;let r;function o(d){r=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function u(d,p){s.drawElements(r,p,a,d*l),t.update(p,r,1)}function h(d,p,_){if(_===0)return;let g,m;if(n)g=s,m="drawElementsInstanced";else if(g=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[m](r,p,a,d*l,_),t.update(p,r,_)}function f(d,p,_){if(_===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<_;m++)this.render(d[m]/l,p[m]);else{g.multiDrawElementsWEBGL(r,p,0,a,d,0,_);let m=0;for(let y=0;y<_;y++)m+=p[y];t.update(m,r,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function ty(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function ny(s,e){return s[0]-e[0]}function iy(s,e){return Math.abs(e[1])-Math.abs(s[1])}function ry(s,e,t){const i={},n=new Float32Array(8),r=new WeakMap,o=new it,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,p=d!==void 0?d.length:0;let _=r.get(u);if(_===void 0||_.count!==p){let C=function(){R.dispose(),r.delete(u),u.removeEventListener("dispose",C)};_!==void 0&&_.texture.dispose();const y=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,x=u.morphAttributes.color!==void 0,S=u.morphAttributes.position||[],b=u.morphAttributes.normal||[],E=u.morphAttributes.color||[];let A=0;y===!0&&(A=1),v===!0&&(A=2),x===!0&&(A=3);let M=u.attributes.position.count*A,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const I=new Float32Array(M*w*4*p),R=new _a(I,M,w,p);R.type=cn,R.needsUpdate=!0;const z=A*4;for(let N=0;N<p;N++){const k=S[N],H=b[N],$=E[N],q=M*w*4*N;for(let V=0;V<k.count;V++){const G=V*z;y===!0&&(o.fromBufferAttribute(k,V),I[q+G+0]=o.x,I[q+G+1]=o.y,I[q+G+2]=o.z,I[q+G+3]=0),v===!0&&(o.fromBufferAttribute(H,V),I[q+G+4]=o.x,I[q+G+5]=o.y,I[q+G+6]=o.z,I[q+G+7]=0),x===!0&&(o.fromBufferAttribute($,V),I[q+G+8]=o.x,I[q+G+9]=o.y,I[q+G+10]=o.z,I[q+G+11]=$.itemSize===4?o.w:1)}}_={count:p,texture:R,size:new se(M,w)},r.set(u,_),u.addEventListener("dispose",C)}let g=0;for(let y=0;y<f.length;y++)g+=f[y];const m=u.morphTargetsRelative?1:1-g;h.getUniforms().setValue(s,"morphTargetBaseInfluence",m),h.getUniforms().setValue(s,"morphTargetInfluences",f),h.getUniforms().setValue(s,"morphTargetsTexture",_.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",_.size)}else{const d=f===void 0?0:f.length;let p=i[u.id];if(p===void 0||p.length!==d){p=[];for(let v=0;v<d;v++)p[v]=[v,0];i[u.id]=p}for(let v=0;v<d;v++){const x=p[v];x[0]=v,x[1]=f[v]}p.sort(iy);for(let v=0;v<8;v++)v<d&&p[v][1]?(a[v][0]=p[v][0],a[v][1]=p[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(ny);const _=u.morphAttributes.position,g=u.morphAttributes.normal;let m=0;for(let v=0;v<8;v++){const x=a[v],S=x[0],b=x[1];S!==Number.MAX_SAFE_INTEGER&&b?(_&&u.getAttribute("morphTarget"+v)!==_[S]&&u.setAttribute("morphTarget"+v,_[S]),g&&u.getAttribute("morphNormal"+v)!==g[S]&&u.setAttribute("morphNormal"+v,g[S]),n[v]=b,m+=b):(_&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),g&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),n[v]=0)}const y=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(s,"morphTargetBaseInfluence",y),h.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:l}}function sy(s,e,t,i){let n=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(n.get(h)!==c&&(e.update(h),n.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),n.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;n.get(f)!==c&&(f.update(),n.set(f,c))}return h}function o(){n=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class va extends yt{constructor(e,t,i,n,r,o,a,l,c,u){if(u=u!==void 0?u:ri,u!==ri&&u!==qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===ri&&(i=Hn),i===void 0&&u===qi&&(i=ii),super(null,n,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Mt,this.minFilter=l!==void 0?l:Mt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const $d=new yt,Jd=new va(1,1);Jd.compareFunction=Jc;const Kd=new _a,Qd=new tu,ep=new Gs,sh=[],oh=[],ah=new Float32Array(16),lh=new Float32Array(9),ch=new Float32Array(4);function Vr(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=sh[n];if(r===void 0&&(r=new Float32Array(n),sh[n]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Ct(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function Rt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function ya(s,e){let t=oh[e];t===void 0&&(t=new Int32Array(e),oh[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function oy(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function ay(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;s.uniform2fv(this.addr,e),Rt(t,e)}}function ly(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;s.uniform3fv(this.addr,e),Rt(t,e)}}function cy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;s.uniform4fv(this.addr,e),Rt(t,e)}}function uy(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;ch.set(i),s.uniformMatrix2fv(this.addr,!1,ch),Rt(t,i)}}function hy(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;lh.set(i),s.uniformMatrix3fv(this.addr,!1,lh),Rt(t,i)}}function fy(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;ah.set(i),s.uniformMatrix4fv(this.addr,!1,ah),Rt(t,i)}}function dy(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function py(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;s.uniform2iv(this.addr,e),Rt(t,e)}}function my(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;s.uniform3iv(this.addr,e),Rt(t,e)}}function gy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;s.uniform4iv(this.addr,e),Rt(t,e)}}function _y(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function vy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;s.uniform2uiv(this.addr,e),Rt(t,e)}}function yy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;s.uniform3uiv(this.addr,e),Rt(t,e)}}function xy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;s.uniform4uiv(this.addr,e),Rt(t,e)}}function Sy(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const r=this.type===s.SAMPLER_2D_SHADOW?Jd:$d;t.setTexture2D(e||r,n)}function My(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Qd,n)}function by(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||ep,n)}function wy(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Kd,n)}function Ey(s){switch(s){case 5126:return oy;case 35664:return ay;case 35665:return ly;case 35666:return cy;case 35674:return uy;case 35675:return hy;case 35676:return fy;case 5124:case 35670:return dy;case 35667:case 35671:return py;case 35668:case 35672:return my;case 35669:case 35673:return gy;case 5125:return _y;case 36294:return vy;case 36295:return yy;case 36296:return xy;case 35678:case 36198:case 36298:case 36306:case 35682:return Sy;case 35679:case 36299:case 36307:return My;case 35680:case 36300:case 36308:case 36293:return by;case 36289:case 36303:case 36311:case 36292:return wy}}function Ty(s,e){s.uniform1fv(this.addr,e)}function Ay(s,e){const t=Vr(e,this.size,2);s.uniform2fv(this.addr,t)}function Cy(s,e){const t=Vr(e,this.size,3);s.uniform3fv(this.addr,t)}function Ry(s,e){const t=Vr(e,this.size,4);s.uniform4fv(this.addr,t)}function Py(s,e){const t=Vr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Ly(s,e){const t=Vr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Uy(s,e){const t=Vr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Iy(s,e){s.uniform1iv(this.addr,e)}function Dy(s,e){s.uniform2iv(this.addr,e)}function Oy(s,e){s.uniform3iv(this.addr,e)}function Fy(s,e){s.uniform4iv(this.addr,e)}function Ny(s,e){s.uniform1uiv(this.addr,e)}function By(s,e){s.uniform2uiv(this.addr,e)}function zy(s,e){s.uniform3uiv(this.addr,e)}function ky(s,e){s.uniform4uiv(this.addr,e)}function Gy(s,e,t){const i=this.cache,n=e.length,r=ya(t,n);Ct(i,r)||(s.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==n;++o)t.setTexture2D(e[o]||$d,r[o])}function Hy(s,e,t){const i=this.cache,n=e.length,r=ya(t,n);Ct(i,r)||(s.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==n;++o)t.setTexture3D(e[o]||Qd,r[o])}function Vy(s,e,t){const i=this.cache,n=e.length,r=ya(t,n);Ct(i,r)||(s.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==n;++o)t.setTextureCube(e[o]||ep,r[o])}function Wy(s,e,t){const i=this.cache,n=e.length,r=ya(t,n);Ct(i,r)||(s.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==n;++o)t.setTexture2DArray(e[o]||Kd,r[o])}function Xy(s){switch(s){case 5126:return Ty;case 35664:return Ay;case 35665:return Cy;case 35666:return Ry;case 35674:return Py;case 35675:return Ly;case 35676:return Uy;case 5124:case 35670:return Iy;case 35667:case 35671:return Dy;case 35668:case 35672:return Oy;case 35669:case 35673:return Fy;case 5125:return Ny;case 36294:return By;case 36295:return zy;case 36296:return ky;case 35678:case 36198:case 36298:case 36306:case 35682:return Gy;case 35679:case 36299:case 36307:return Hy;case 35680:case 36300:case 36308:case 36293:return Vy;case 36289:case 36303:case 36311:case 36292:return Wy}}class qy{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ey(t.type)}}class Yy{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xy(t.type)}}class jy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,o=n.length;r!==o;++r){const a=n[r];a.setValue(e,t[a.id],i)}}}const ml=/(\w+)(\])?(\[|\.)?/g;function uh(s,e){s.seq.push(e),s.map[e.id]=e}function Zy(s,e,t){const i=s.name,n=i.length;for(ml.lastIndex=0;;){const r=ml.exec(i),o=ml.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===n){uh(t,c===void 0?new qy(a,s,e):new Yy(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new jy(a),uh(t,h)),t=h}}}class ta{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=e.getActiveUniform(t,n),o=e.getUniformLocation(t,r.name);Zy(r,o,this)}}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const o=e[n];o.id in t&&i.push(o)}return i}}function hh(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const $y=37297;let Jy=0;function Ky(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=n;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Qy(s){const e=lt.getPrimaries(lt.workingColorSpace),t=lt.getPrimaries(s);let i;switch(e===t?i="":e===Es&&t===ws?i="LinearDisplayP3ToLinearSRGB":e===ws&&t===Es&&(i="LinearSRGBToLinearDisplayP3"),s){case Pn:case Bs:return[i,"LinearTransferOETF"];case Tt:case ga:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function fh(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),n=s.getShaderInfoLog(e).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+n+`

`+Ky(s.getShaderSource(e),o)}else return n}function ex(s,e){const t=Qy(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function tx(s,e){let t;switch(e){case _d:t="Linear";break;case vd:t="Reinhard";break;case yd:t="OptimizedCineon";break;case zc:t="ACESFilmic";break;case xd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function nx(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ls).join(`
`)}function ix(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function rx(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function ls(s){return s!==""}function dh(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ph(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tc(s){return s.replace(sx,ax)}const ox=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ax(s,e){let t=$e[e];if(t===void 0){const i=ox.get(e);if(i!==void 0)t=$e[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Tc(t)}const lx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mh(s){return s.replace(lx,cx)}function cx(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function gh(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ux(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===fa?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===cs?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===gn&&(e="SHADOWMAP_TYPE_VSM"),e}function hx(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Xn:case ai:e="ENVMAP_TYPE_CUBE";break;case Hr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function fx(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ai:e="ENVMAP_MODE_REFRACTION";break}return e}function dx(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ns:e="ENVMAP_BLENDING_MULTIPLY";break;case md:e="ENVMAP_BLENDING_MIX";break;case gd:e="ENVMAP_BLENDING_ADD";break}return e}function px(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function mx(s,e,t,i){const n=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=ux(t),c=hx(t),u=fx(t),h=dx(t),f=px(t),d=t.isWebGL2?"":nx(t),p=ix(r),_=n.createProgram();let g,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ls).join(`
`),g.length>0&&(g+=`
`),m=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ls).join(`
`),m.length>0&&(m+=`
`)):(g=[gh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ls).join(`
`),m=[d,gh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?$e.tonemapping_pars_fragment:"",t.toneMapping!==An?tx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,ex("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ls).join(`
`)),o=Tc(o),o=dh(o,t),o=ph(o,t),a=Tc(a),a=dh(a,t),a=ph(a,t),o=mh(o),a=mh(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===bc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=y+g+o,x=y+m+a,S=hh(n,n.VERTEX_SHADER,v),b=hh(n,n.FRAGMENT_SHADER,x);n.attachShader(_,S),n.attachShader(_,b),t.index0AttributeName!==void 0?n.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(_,0,"position"),n.linkProgram(_);function E(I){if(s.debug.checkShaderErrors){const R=n.getProgramInfoLog(_).trim(),z=n.getShaderInfoLog(S).trim(),C=n.getShaderInfoLog(b).trim();let N=!0,k=!0;if(n.getProgramParameter(_,n.LINK_STATUS)===!1)if(N=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,_,S,b);else{const H=fh(n,S,"vertex"),$=fh(n,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(_,n.VALIDATE_STATUS)+`

Program Info Log: `+R+`
`+H+`
`+$)}else R!==""?console.warn("THREE.WebGLProgram: Program Info Log:",R):(z===""||C==="")&&(k=!1);k&&(I.diagnostics={runnable:N,programLog:R,vertexShader:{log:z,prefix:g},fragmentShader:{log:C,prefix:m}})}n.deleteShader(S),n.deleteShader(b),A=new ta(n,_),M=rx(n,_)}let A;this.getUniforms=function(){return A===void 0&&E(this),A};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=n.getProgramParameter(_,$y)),w},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jy++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=b,this}let gx=0;class _x{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new vx(e),t.set(e,i)),i}}class vx{constructor(e){this.id=gx++,this.code=e,this.usedTimes=0}}function yx(s,e,t,i,n,r,o){const a=new zi,l=new _x,c=[],u=n.isWebGL2,h=n.logarithmicDepthBuffer,f=n.vertexTextures;let d=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function g(M,w,I,R,z){const C=R.fog,N=z.geometry,k=M.isMeshStandardMaterial?R.environment:null,H=(M.isMeshStandardMaterial?t:e).get(M.envMap||k),$=H&&H.mapping===Hr?H.image.height:null,q=p[M.type];M.precision!==null&&(d=n.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const V=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,G=V!==void 0?V.length:0;let j=0;N.morphAttributes.position!==void 0&&(j=1),N.morphAttributes.normal!==void 0&&(j=2),N.morphAttributes.color!==void 0&&(j=3);let O,Y,te,ge;if(q){const rt=vn[q];O=rt.vertexShader,Y=rt.fragmentShader}else O=M.vertexShader,Y=M.fragmentShader,l.update(M),te=l.getVertexShaderID(M),ge=l.getFragmentShaderID(M);const _e=s.getRenderTarget(),Ee=z.isInstancedMesh===!0,De=z.isBatchedMesh===!0,xe=!!M.map,fe=!!M.matcap,D=!!H,pe=!!M.aoMap,J=!!M.lightMap,de=!!M.bumpMap,re=!!M.normalMap,Pe=!!M.displacementMap,Ae=!!M.emissiveMap,Te=!!M.metalnessMap,ze=!!M.roughnessMap,Ge=M.anisotropy>0,je=M.clearcoat>0,U=M.iridescence>0,T=M.sheen>0,W=M.transmission>0,ve=Ge&&!!M.anisotropyMap,ie=je&&!!M.clearcoatMap,le=je&&!!M.clearcoatNormalMap,Se=je&&!!M.clearcoatRoughnessMap,ce=U&&!!M.iridescenceMap,ye=U&&!!M.iridescenceThicknessMap,Fe=T&&!!M.sheenColorMap,Ne=T&&!!M.sheenRoughnessMap,me=!!M.specularMap,Be=!!M.specularColorMap,F=!!M.specularIntensityMap,K=W&&!!M.transmissionMap,ae=W&&!!M.thicknessMap,ue=!!M.gradientMap,Me=!!M.alphaMap,B=M.alphaTest>0,be=!!M.alphaHash,oe=!!M.extensions,Z=!!N.attributes.uv1,he=!!N.attributes.uv2,Ue=!!N.attributes.uv3;let Le=An;return M.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(Le=s.toneMapping),{isWebGL2:u,shaderID:q,shaderType:M.type,shaderName:M.name,vertexShader:O,fragmentShader:Y,defines:M.defines,customVertexShaderID:te,customFragmentShaderID:ge,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:De,instancing:Ee,instancingColor:Ee&&z.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:_e===null?s.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:Pn,map:xe,matcap:fe,envMap:D,envMapMode:D&&H.mapping,envMapCubeUVHeight:$,aoMap:pe,lightMap:J,bumpMap:de,normalMap:re,displacementMap:f&&Pe,emissiveMap:Ae,normalMapObjectSpace:re&&M.normalMapType===Dd,normalMapTangentSpace:re&&M.normalMapType===ui,metalnessMap:Te,roughnessMap:ze,anisotropy:Ge,anisotropyMap:ve,clearcoat:je,clearcoatMap:ie,clearcoatNormalMap:le,clearcoatRoughnessMap:Se,iridescence:U,iridescenceMap:ce,iridescenceThicknessMap:ye,sheen:T,sheenColorMap:Fe,sheenRoughnessMap:Ne,specularMap:me,specularColorMap:Be,specularIntensityMap:F,transmission:W,transmissionMap:K,thicknessMap:ae,gradientMap:ue,opaque:M.transparent===!1&&M.blending===Ni,alphaMap:Me,alphaTest:B,alphaHash:be,combine:M.combine,mapUv:xe&&_(M.map.channel),aoMapUv:pe&&_(M.aoMap.channel),lightMapUv:J&&_(M.lightMap.channel),bumpMapUv:de&&_(M.bumpMap.channel),normalMapUv:re&&_(M.normalMap.channel),displacementMapUv:Pe&&_(M.displacementMap.channel),emissiveMapUv:Ae&&_(M.emissiveMap.channel),metalnessMapUv:Te&&_(M.metalnessMap.channel),roughnessMapUv:ze&&_(M.roughnessMap.channel),anisotropyMapUv:ve&&_(M.anisotropyMap.channel),clearcoatMapUv:ie&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:le&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&_(M.sheenRoughnessMap.channel),specularMapUv:me&&_(M.specularMap.channel),specularColorMapUv:Be&&_(M.specularColorMap.channel),specularIntensityMapUv:F&&_(M.specularIntensityMap.channel),transmissionMapUv:K&&_(M.transmissionMap.channel),thicknessMapUv:ae&&_(M.thicknessMap.channel),alphaMapUv:Me&&_(M.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(re||Ge),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Z,vertexUv2s:he,vertexUv3s:Ue,pointsUvs:z.isPoints===!0&&!!N.attributes.uv&&(xe||Me),fog:!!C,useFog:M.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:z.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:G,morphTextureStride:j,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Le,useLegacyLights:s._useLegacyLights,decodeVideoTexture:xe&&M.map.isVideoTexture===!0&&lt.getTransfer(M.map.colorSpace)===ut,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===yn,flipSided:M.side===Ht,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:oe&&M.extensions.derivatives===!0,extensionFragDepth:oe&&M.extensions.fragDepth===!0,extensionDrawBuffers:oe&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:oe&&M.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function m(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const I in M.defines)w.push(I),w.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(y(w,M),v(w,M),w.push(s.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function y(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function v(M,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),M.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function x(M){const w=p[M.type];let I;if(w){const R=vn[w];I=zr.clone(R.uniforms)}else I=M.uniforms;return I}function S(M,w){let I;for(let R=0,z=c.length;R<z;R++){const C=c[R];if(C.cacheKey===w){I=C,++I.usedTimes;break}}return I===void 0&&(I=new mx(s,w,M,r),c.push(I)),I}function b(M){if(--M.usedTimes===0){const w=c.indexOf(M);c[w]=c[c.length-1],c.pop(),M.destroy()}}function E(M){l.remove(M)}function A(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:x,acquireProgram:S,releaseProgram:b,releaseShaderCache:E,programs:c,dispose:A}}function xx(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function i(r,o,a){s.get(r)[o]=a}function n(){s=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function Sx(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function _h(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function vh(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function o(h,f,d,p,_,g){let m=s[e];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:p,renderOrder:h.renderOrder,z:_,group:g},s[e]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=p,m.renderOrder=h.renderOrder,m.z=_,m.group=g),e++,m}function a(h,f,d,p,_,g){const m=o(h,f,d,p,_,g);d.transmission>0?i.push(m):d.transparent===!0?n.push(m):t.push(m)}function l(h,f,d,p,_,g){const m=o(h,f,d,p,_,g);d.transmission>0?i.unshift(m):d.transparent===!0?n.unshift(m):t.unshift(m)}function c(h,f){t.length>1&&t.sort(h||Sx),i.length>1&&i.sort(f||_h),n.length>1&&n.sort(f||_h)}function u(){for(let h=e,f=s.length;h<f;h++){const d=s[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:a,unshift:l,finish:u,sort:c}}function Mx(){let s=new WeakMap;function e(i,n){const r=s.get(i);let o;return r===void 0?(o=new vh,s.set(i,[o])):n>=r.length?(o=new vh,r.push(o)):o=r[n],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function bx(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Re};break;case"SpotLight":t={position:new P,direction:new P,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new P,halfWidth:new P,halfHeight:new P};break}return s[e.id]=t,t}}}function wx(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Ex=0;function Tx(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Ax(s,e){const t=new bx,i=wx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new P);const r=new P,o=new Ve,a=new Ve;function l(u,h){let f=0,d=0,p=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let _=0,g=0,m=0,y=0,v=0,x=0,S=0,b=0,E=0,A=0,M=0;u.sort(Tx);const w=h===!0?Math.PI:1;for(let R=0,z=u.length;R<z;R++){const C=u[R],N=C.color,k=C.intensity,H=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)f+=N.r*k*w,d+=N.g*k*w,p+=N.b*k*w;else if(C.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(C.sh.coefficients[q],k);M++}else if(C.isDirectionalLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity*w),C.castShadow){const V=C.shadow,G=i.get(C);G.shadowBias=V.bias,G.shadowNormalBias=V.normalBias,G.shadowRadius=V.radius,G.shadowMapSize=V.mapSize,n.directionalShadow[_]=G,n.directionalShadowMap[_]=$,n.directionalShadowMatrix[_]=C.shadow.matrix,x++}n.directional[_]=q,_++}else if(C.isSpotLight){const q=t.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(N).multiplyScalar(k*w),q.distance=H,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,n.spot[m]=q;const V=C.shadow;if(C.map&&(n.spotLightMap[E]=C.map,E++,V.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[m]=V.matrix,C.castShadow){const G=i.get(C);G.shadowBias=V.bias,G.shadowNormalBias=V.normalBias,G.shadowRadius=V.radius,G.shadowMapSize=V.mapSize,n.spotShadow[m]=G,n.spotShadowMap[m]=$,b++}m++}else if(C.isRectAreaLight){const q=t.get(C);q.color.copy(N).multiplyScalar(k),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),n.rectArea[y]=q,y++}else if(C.isPointLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity*w),q.distance=C.distance,q.decay=C.decay,C.castShadow){const V=C.shadow,G=i.get(C);G.shadowBias=V.bias,G.shadowNormalBias=V.normalBias,G.shadowRadius=V.radius,G.shadowMapSize=V.mapSize,G.shadowCameraNear=V.camera.near,G.shadowCameraFar=V.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=C.shadow.matrix,S++}n.point[g]=q,g++}else if(C.isHemisphereLight){const q=t.get(C);q.skyColor.copy(C.color).multiplyScalar(k*w),q.groundColor.copy(C.groundColor).multiplyScalar(k*w),n.hemi[v]=q,v++}}y>0&&(e.isWebGL2||s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=f,n.ambient[1]=d,n.ambient[2]=p;const I=n.hash;(I.directionalLength!==_||I.pointLength!==g||I.spotLength!==m||I.rectAreaLength!==y||I.hemiLength!==v||I.numDirectionalShadows!==x||I.numPointShadows!==S||I.numSpotShadows!==b||I.numSpotMaps!==E||I.numLightProbes!==M)&&(n.directional.length=_,n.spot.length=m,n.rectArea.length=y,n.point.length=g,n.hemi.length=v,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=b+E-A,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=M,I.directionalLength=_,I.pointLength=g,I.spotLength=m,I.rectAreaLength=y,I.hemiLength=v,I.numDirectionalShadows=x,I.numPointShadows=S,I.numSpotShadows=b,I.numSpotMaps=E,I.numLightProbes=M,n.version=Ex++)}function c(u,h){let f=0,d=0,p=0,_=0,g=0;const m=h.matrixWorldInverse;for(let y=0,v=u.length;y<v;y++){const x=u[y];if(x.isDirectionalLight){const S=n.directional[f];S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),f++}else if(x.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const S=n.rectArea[_];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),a.identity(),o.copy(x.matrixWorld),o.premultiply(m),a.extractRotation(o),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const S=n.hemi[g];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:l,setupView:c,state:n}}function yh(s,e){const t=new Ax(s,e),i=[],n=[];function r(){i.length=0,n.length=0}function o(h){i.push(h)}function a(h){n.push(h)}function l(h){t.setup(i,h)}function c(h){t.setupView(i,h)}return{init:r,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Cx(s,e){let t=new WeakMap;function i(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new yh(s,e),t.set(r,[l])):o>=a.length?(l=new yh(s,e),a.push(l)):l=a[o],l}function n(){t=new WeakMap}return{get:i,dispose:n}}class xa extends Wt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sa extends Wt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Rx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Px=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Lx(s,e,t){let i=new Hs;const n=new se,r=new se,o=new it,a=new xa({depthPacking:$c}),l=new Sa,c={},u=t.maxTextureSize,h={[Wn]:Ht,[Ht]:Wn,[yn]:yn},f=new hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:Rx,fragmentShader:Px}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new et;p.setAttribute("position",new ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new mt(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fa;let m=this.type;this.render=function(S,b,E){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const A=s.getRenderTarget(),M=s.getActiveCubeFace(),w=s.getActiveMipmapLevel(),I=s.state;I.setBlending(Vn),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const R=m!==gn&&this.type===gn,z=m===gn&&this.type!==gn;for(let C=0,N=S.length;C<N;C++){const k=S[C],H=k.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",k,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;n.copy(H.mapSize);const $=H.getFrameExtents();if(n.multiply($),r.copy(H.mapSize),(n.x>u||n.y>u)&&(n.x>u&&(r.x=Math.floor(u/$.x),n.x=r.x*$.x,H.mapSize.x=r.x),n.y>u&&(r.y=Math.floor(u/$.y),n.y=r.y*$.y,H.mapSize.y=r.y)),H.map===null||R===!0||z===!0){const V=this.type!==gn?{minFilter:Mt,magFilter:Mt}:{};H.map!==null&&H.map.dispose(),H.map=new un(n.x,n.y,V),H.map.texture.name=k.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const q=H.getViewportCount();for(let V=0;V<q;V++){const G=H.getViewport(V);o.set(r.x*G.x,r.y*G.y,r.x*G.z,r.y*G.w),I.viewport(o),H.updateMatrices(k,V),i=H.getFrustum(),x(b,E,H.camera,k,this.type)}H.isPointLightShadow!==!0&&this.type===gn&&y(H,E),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(A,M,w)};function y(S,b){const E=e.update(_);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new un(n.x,n.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(b,null,E,f,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(b,null,E,d,_,null)}function v(S,b,E,A){let M=null;const w=E.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(w!==void 0)M=w;else if(M=E.isPointLight===!0?l:a,s.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const I=M.uuid,R=b.uuid;let z=c[I];z===void 0&&(z={},c[I]=z);let C=z[R];C===void 0&&(C=M.clone(),z[R]=C),M=C}if(M.visible=b.visible,M.wireframe=b.wireframe,A===gn?M.side=b.shadowSide!==null?b.shadowSide:b.side:M.side=b.shadowSide!==null?b.shadowSide:h[b.side],M.alphaMap=b.alphaMap,M.alphaTest=b.alphaTest,M.map=b.map,M.clipShadows=b.clipShadows,M.clippingPlanes=b.clippingPlanes,M.clipIntersection=b.clipIntersection,M.displacementMap=b.displacementMap,M.displacementScale=b.displacementScale,M.displacementBias=b.displacementBias,M.wireframeLinewidth=b.wireframeLinewidth,M.linewidth=b.linewidth,E.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const I=s.properties.get(M);I.light=E}return M}function x(S,b,E,A,M){if(S.visible===!1)return;if(S.layers.test(b.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&M===gn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,S.matrixWorld);const R=e.update(S),z=S.material;if(Array.isArray(z)){const C=R.groups;for(let N=0,k=C.length;N<k;N++){const H=C[N],$=z[H.materialIndex];if($&&$.visible){const q=v(S,$,A,M);S.onBeforeShadow(s,S,b,E,R,q,H),s.renderBufferDirect(E,null,R,q,S,H),S.onAfterShadow(s,S,b,E,R,q,H)}}}else if(z.visible){const C=v(S,z,A,M);S.onBeforeShadow(s,S,b,E,R,C,null),s.renderBufferDirect(E,null,R,C,S,null),S.onAfterShadow(s,S,b,E,R,C,null)}}const I=S.children;for(let R=0,z=I.length;R<z;R++)x(I[R],b,E,A,M)}}function Ux(s,e,t){const i=t.isWebGL2;function n(){let B=!1;const be=new it;let oe=null;const Z=new it(0,0,0,0);return{setMask:function(he){oe!==he&&!B&&(s.colorMask(he,he,he,he),oe=he)},setLocked:function(he){B=he},setClear:function(he,Ue,Le,Xe,rt){rt===!0&&(he*=Xe,Ue*=Xe,Le*=Xe),be.set(he,Ue,Le,Xe),Z.equals(be)===!1&&(s.clearColor(he,Ue,Le,Xe),Z.copy(be))},reset:function(){B=!1,oe=null,Z.set(-1,0,0,0)}}}function r(){let B=!1,be=null,oe=null,Z=null;return{setTest:function(he){he?De(s.DEPTH_TEST):xe(s.DEPTH_TEST)},setMask:function(he){be!==he&&!B&&(s.depthMask(he),be=he)},setFunc:function(he){if(oe!==he){switch(he){case ld:s.depthFunc(s.NEVER);break;case cd:s.depthFunc(s.ALWAYS);break;case ud:s.depthFunc(s.LESS);break;case ms:s.depthFunc(s.LEQUAL);break;case hd:s.depthFunc(s.EQUAL);break;case fd:s.depthFunc(s.GEQUAL);break;case dd:s.depthFunc(s.GREATER);break;case pd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}oe=he}},setLocked:function(he){B=he},setClear:function(he){Z!==he&&(s.clearDepth(he),Z=he)},reset:function(){B=!1,be=null,oe=null,Z=null}}}function o(){let B=!1,be=null,oe=null,Z=null,he=null,Ue=null,Le=null,Xe=null,rt=null;return{setTest:function(qe){B||(qe?De(s.STENCIL_TEST):xe(s.STENCIL_TEST))},setMask:function(qe){be!==qe&&!B&&(s.stencilMask(qe),be=qe)},setFunc:function(qe,st,Pt){(oe!==qe||Z!==st||he!==Pt)&&(s.stencilFunc(qe,st,Pt),oe=qe,Z=st,he=Pt)},setOp:function(qe,st,Pt){(Ue!==qe||Le!==st||Xe!==Pt)&&(s.stencilOp(qe,st,Pt),Ue=qe,Le=st,Xe=Pt)},setLocked:function(qe){B=qe},setClear:function(qe){rt!==qe&&(s.clearStencil(qe),rt=qe)},reset:function(){B=!1,be=null,oe=null,Z=null,he=null,Ue=null,Le=null,Xe=null,rt=null}}}const a=new n,l=new r,c=new o,u=new WeakMap,h=new WeakMap;let f={},d={},p=new WeakMap,_=[],g=null,m=!1,y=null,v=null,x=null,S=null,b=null,E=null,A=null,M=new Re(0,0,0),w=0,I=!1,R=null,z=null,C=null,N=null,k=null;const H=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,q=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(V)[1]),$=q>=1):V.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),$=q>=2);let G=null,j={};const O=s.getParameter(s.SCISSOR_BOX),Y=s.getParameter(s.VIEWPORT),te=new it().fromArray(O),ge=new it().fromArray(Y);function _e(B,be,oe,Z){const he=new Uint8Array(4),Ue=s.createTexture();s.bindTexture(B,Ue),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Le=0;Le<oe;Le++)i&&(B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY)?s.texImage3D(be,0,s.RGBA,1,1,Z,0,s.RGBA,s.UNSIGNED_BYTE,he):s.texImage2D(be+Le,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,he);return Ue}const Ee={};Ee[s.TEXTURE_2D]=_e(s.TEXTURE_2D,s.TEXTURE_2D,1),Ee[s.TEXTURE_CUBE_MAP]=_e(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ee[s.TEXTURE_2D_ARRAY]=_e(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ee[s.TEXTURE_3D]=_e(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),De(s.DEPTH_TEST),l.setFunc(ms),Ae(!1),Te(Wl),De(s.CULL_FACE),re(Vn);function De(B){f[B]!==!0&&(s.enable(B),f[B]=!0)}function xe(B){f[B]!==!1&&(s.disable(B),f[B]=!1)}function fe(B,be){return d[B]!==be?(s.bindFramebuffer(B,be),d[B]=be,i&&(B===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=be),B===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=be)),!0):!1}function D(B,be){let oe=_,Z=!1;if(B)if(oe=p.get(be),oe===void 0&&(oe=[],p.set(be,oe)),B.isWebGLMultipleRenderTargets){const he=B.texture;if(oe.length!==he.length||oe[0]!==s.COLOR_ATTACHMENT0){for(let Ue=0,Le=he.length;Ue<Le;Ue++)oe[Ue]=s.COLOR_ATTACHMENT0+Ue;oe.length=he.length,Z=!0}}else oe[0]!==s.COLOR_ATTACHMENT0&&(oe[0]=s.COLOR_ATTACHMENT0,Z=!0);else oe[0]!==s.BACK&&(oe[0]=s.BACK,Z=!0);Z&&(t.isWebGL2?s.drawBuffers(oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe))}function pe(B){return g!==B?(s.useProgram(B),g=B,!0):!1}const J={[ni]:s.FUNC_ADD,[Yf]:s.FUNC_SUBTRACT,[jf]:s.FUNC_REVERSE_SUBTRACT};if(i)J[jl]=s.MIN,J[Zl]=s.MAX;else{const B=e.get("EXT_blend_minmax");B!==null&&(J[jl]=B.MIN_EXT,J[Zl]=B.MAX_EXT)}const de={[Zf]:s.ZERO,[$f]:s.ONE,[Jf]:s.SRC_COLOR,[ra]:s.SRC_ALPHA,[id]:s.SRC_ALPHA_SATURATE,[td]:s.DST_COLOR,[Qf]:s.DST_ALPHA,[Kf]:s.ONE_MINUS_SRC_COLOR,[sa]:s.ONE_MINUS_SRC_ALPHA,[nd]:s.ONE_MINUS_DST_COLOR,[ed]:s.ONE_MINUS_DST_ALPHA,[rd]:s.CONSTANT_COLOR,[sd]:s.ONE_MINUS_CONSTANT_COLOR,[od]:s.CONSTANT_ALPHA,[ad]:s.ONE_MINUS_CONSTANT_ALPHA};function re(B,be,oe,Z,he,Ue,Le,Xe,rt,qe){if(B===Vn){m===!0&&(xe(s.BLEND),m=!1);return}if(m===!1&&(De(s.BLEND),m=!0),B!==qf){if(B!==y||qe!==I){if((v!==ni||b!==ni)&&(s.blendEquation(s.FUNC_ADD),v=ni,b=ni),qe)switch(B){case Ni:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xl:s.blendFunc(s.ONE,s.ONE);break;case ql:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Yl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Ni:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xl:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ql:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Yl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}x=null,S=null,E=null,A=null,M.set(0,0,0),w=0,y=B,I=qe}return}he=he||be,Ue=Ue||oe,Le=Le||Z,(be!==v||he!==b)&&(s.blendEquationSeparate(J[be],J[he]),v=be,b=he),(oe!==x||Z!==S||Ue!==E||Le!==A)&&(s.blendFuncSeparate(de[oe],de[Z],de[Ue],de[Le]),x=oe,S=Z,E=Ue,A=Le),(Xe.equals(M)===!1||rt!==w)&&(s.blendColor(Xe.r,Xe.g,Xe.b,rt),M.copy(Xe),w=rt),y=B,I=!1}function Pe(B,be){B.side===yn?xe(s.CULL_FACE):De(s.CULL_FACE);let oe=B.side===Ht;be&&(oe=!oe),Ae(oe),B.blending===Ni&&B.transparent===!1?re(Vn):re(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),l.setFunc(B.depthFunc),l.setTest(B.depthTest),l.setMask(B.depthWrite),a.setMask(B.colorWrite);const Z=B.stencilWrite;c.setTest(Z),Z&&(c.setMask(B.stencilWriteMask),c.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),c.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ge(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?De(s.SAMPLE_ALPHA_TO_COVERAGE):xe(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(B){R!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),R=B)}function Te(B){B!==Vf?(De(s.CULL_FACE),B!==z&&(B===Wl?s.cullFace(s.BACK):B===Wf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):xe(s.CULL_FACE),z=B}function ze(B){B!==C&&($&&s.lineWidth(B),C=B)}function Ge(B,be,oe){B?(De(s.POLYGON_OFFSET_FILL),(N!==be||k!==oe)&&(s.polygonOffset(be,oe),N=be,k=oe)):xe(s.POLYGON_OFFSET_FILL)}function je(B){B?De(s.SCISSOR_TEST):xe(s.SCISSOR_TEST)}function U(B){B===void 0&&(B=s.TEXTURE0+H-1),G!==B&&(s.activeTexture(B),G=B)}function T(B,be,oe){oe===void 0&&(G===null?oe=s.TEXTURE0+H-1:oe=G);let Z=j[oe];Z===void 0&&(Z={type:void 0,texture:void 0},j[oe]=Z),(Z.type!==B||Z.texture!==be)&&(G!==oe&&(s.activeTexture(oe),G=oe),s.bindTexture(B,be||Ee[B]),Z.type=B,Z.texture=be)}function W(){const B=j[G];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function ve(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ie(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function le(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Se(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ye(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Fe(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ne(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function me(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Be(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function F(B){te.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),te.copy(B))}function K(B){ge.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),ge.copy(B))}function ae(B,be){let oe=h.get(be);oe===void 0&&(oe=new WeakMap,h.set(be,oe));let Z=oe.get(B);Z===void 0&&(Z=s.getUniformBlockIndex(be,B.name),oe.set(B,Z))}function ue(B,be){const Z=h.get(be).get(B);u.get(be)!==Z&&(s.uniformBlockBinding(be,Z,B.__bindingPointIndex),u.set(be,Z))}function Me(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},G=null,j={},d={},p=new WeakMap,_=[],g=null,m=!1,y=null,v=null,x=null,S=null,b=null,E=null,A=null,M=new Re(0,0,0),w=0,I=!1,R=null,z=null,C=null,N=null,k=null,te.set(0,0,s.canvas.width,s.canvas.height),ge.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:De,disable:xe,bindFramebuffer:fe,drawBuffers:D,useProgram:pe,setBlending:re,setMaterial:Pe,setFlipSided:Ae,setCullFace:Te,setLineWidth:ze,setPolygonOffset:Ge,setScissorTest:je,activeTexture:U,bindTexture:T,unbindTexture:W,compressedTexImage2D:ve,compressedTexImage3D:ie,texImage2D:me,texImage3D:Be,updateUBOMapping:ae,uniformBlockBinding:ue,texStorage2D:Fe,texStorage3D:Ne,texSubImage2D:le,texSubImage3D:Se,compressedTexSubImage2D:ce,compressedTexSubImage3D:ye,scissor:F,viewport:K,reset:Me}}function Ix(s,e,t,i,n,r,o){const a=n.isWebGL2,l=n.maxTextures,c=n.maxCubemapSize,u=n.maxTextureSize,h=n.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new WeakMap;let _;const g=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(U,T){return m?new OffscreenCanvas(U,T):As("canvas")}function v(U,T,W,ve){let ie=1;if((U.width>ve||U.height>ve)&&(ie=ve/Math.max(U.width,U.height)),ie<1||T===!0)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap){const le=T?la:Math.floor,Se=le(ie*U.width),ce=le(ie*U.height);_===void 0&&(_=y(Se,ce));const ye=W?y(Se,ce):_;return ye.width=Se,ye.height=ce,ye.getContext("2d").drawImage(U,0,0,Se,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+U.width+"x"+U.height+") to ("+Se+"x"+ce+")."),ye}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+U.width+"x"+U.height+")."),U;return U}function x(U){return wc(U.width)&&wc(U.height)}function S(U){return a?!1:U.wrapS!==Gt||U.wrapT!==Gt||U.minFilter!==Mt&&U.minFilter!==ft}function b(U,T){return U.generateMipmaps&&T&&U.minFilter!==Mt&&U.minFilter!==ft}function E(U){s.generateMipmap(U)}function A(U,T,W,ve,ie=!1){if(a===!1)return T;if(U!==null){if(s[U]!==void 0)return s[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let le=T;if(T===s.RED&&(W===s.FLOAT&&(le=s.R32F),W===s.HALF_FLOAT&&(le=s.R16F),W===s.UNSIGNED_BYTE&&(le=s.R8)),T===s.RED_INTEGER&&(W===s.UNSIGNED_BYTE&&(le=s.R8UI),W===s.UNSIGNED_SHORT&&(le=s.R16UI),W===s.UNSIGNED_INT&&(le=s.R32UI),W===s.BYTE&&(le=s.R8I),W===s.SHORT&&(le=s.R16I),W===s.INT&&(le=s.R32I)),T===s.RG&&(W===s.FLOAT&&(le=s.RG32F),W===s.HALF_FLOAT&&(le=s.RG16F),W===s.UNSIGNED_BYTE&&(le=s.RG8)),T===s.RGBA){const Se=ie?bs:lt.getTransfer(ve);W===s.FLOAT&&(le=s.RGBA32F),W===s.HALF_FLOAT&&(le=s.RGBA16F),W===s.UNSIGNED_BYTE&&(le=Se===ut?s.SRGB8_ALPHA8:s.RGBA8),W===s.UNSIGNED_SHORT_4_4_4_4&&(le=s.RGBA4),W===s.UNSIGNED_SHORT_5_5_5_1&&(le=s.RGB5_A1)}return(le===s.R16F||le===s.R32F||le===s.RG16F||le===s.RG32F||le===s.RGBA16F||le===s.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function M(U,T,W){return b(U,W)===!0||U.isFramebufferTexture&&U.minFilter!==Mt&&U.minFilter!==ft?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function w(U){return U===Mt||U===oa||U===us?s.NEAREST:s.LINEAR}function I(U){const T=U.target;T.removeEventListener("dispose",I),z(T),T.isVideoTexture&&p.delete(T)}function R(U){const T=U.target;T.removeEventListener("dispose",R),N(T)}function z(U){const T=i.get(U);if(T.__webglInit===void 0)return;const W=U.source,ve=g.get(W);if(ve){const ie=ve[T.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&C(U),Object.keys(ve).length===0&&g.delete(W)}i.remove(U)}function C(U){const T=i.get(U);s.deleteTexture(T.__webglTexture);const W=U.source,ve=g.get(W);delete ve[T.__cacheKey],o.memory.textures--}function N(U){const T=U.texture,W=i.get(U),ve=i.get(T);if(ve.__webglTexture!==void 0&&(s.deleteTexture(ve.__webglTexture),o.memory.textures--),U.depthTexture&&U.depthTexture.dispose(),U.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(W.__webglFramebuffer[ie]))for(let le=0;le<W.__webglFramebuffer[ie].length;le++)s.deleteFramebuffer(W.__webglFramebuffer[ie][le]);else s.deleteFramebuffer(W.__webglFramebuffer[ie]);W.__webglDepthbuffer&&s.deleteRenderbuffer(W.__webglDepthbuffer[ie])}else{if(Array.isArray(W.__webglFramebuffer))for(let ie=0;ie<W.__webglFramebuffer.length;ie++)s.deleteFramebuffer(W.__webglFramebuffer[ie]);else s.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&s.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&s.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let ie=0;ie<W.__webglColorRenderbuffer.length;ie++)W.__webglColorRenderbuffer[ie]&&s.deleteRenderbuffer(W.__webglColorRenderbuffer[ie]);W.__webglDepthRenderbuffer&&s.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(U.isWebGLMultipleRenderTargets)for(let ie=0,le=T.length;ie<le;ie++){const Se=i.get(T[ie]);Se.__webglTexture&&(s.deleteTexture(Se.__webglTexture),o.memory.textures--),i.remove(T[ie])}i.remove(T),i.remove(U)}let k=0;function H(){k=0}function $(){const U=k;return U>=l&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l),k+=1,U}function q(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function V(U,T){const W=i.get(U);if(U.isVideoTexture&&Ge(U),U.isRenderTargetTexture===!1&&U.version>0&&W.__version!==U.version){const ve=U.image;if(ve===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ve.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{De(W,U,T);return}}t.bindTexture(s.TEXTURE_2D,W.__webglTexture,s.TEXTURE0+T)}function G(U,T){const W=i.get(U);if(U.version>0&&W.__version!==U.version){De(W,U,T);return}t.bindTexture(s.TEXTURE_2D_ARRAY,W.__webglTexture,s.TEXTURE0+T)}function j(U,T){const W=i.get(U);if(U.version>0&&W.__version!==U.version){De(W,U,T);return}t.bindTexture(s.TEXTURE_3D,W.__webglTexture,s.TEXTURE0+T)}function O(U,T){const W=i.get(U);if(U.version>0&&W.__version!==U.version){xe(W,U,T);return}t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture,s.TEXTURE0+T)}const Y={[vs]:s.REPEAT,[Gt]:s.CLAMP_TO_EDGE,[ys]:s.MIRRORED_REPEAT},te={[Mt]:s.NEAREST,[oa]:s.NEAREST_MIPMAP_NEAREST,[us]:s.NEAREST_MIPMAP_LINEAR,[ft]:s.LINEAR,[kc]:s.LINEAR_MIPMAP_NEAREST,[li]:s.LINEAR_MIPMAP_LINEAR},ge={[Od]:s.NEVER,[Gd]:s.ALWAYS,[Fd]:s.LESS,[Jc]:s.LEQUAL,[Nd]:s.EQUAL,[kd]:s.GEQUAL,[Bd]:s.GREATER,[zd]:s.NOTEQUAL};function _e(U,T,W){if(W?(s.texParameteri(U,s.TEXTURE_WRAP_S,Y[T.wrapS]),s.texParameteri(U,s.TEXTURE_WRAP_T,Y[T.wrapT]),(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)&&s.texParameteri(U,s.TEXTURE_WRAP_R,Y[T.wrapR]),s.texParameteri(U,s.TEXTURE_MAG_FILTER,te[T.magFilter]),s.texParameteri(U,s.TEXTURE_MIN_FILTER,te[T.minFilter])):(s.texParameteri(U,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(U,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)&&s.texParameteri(U,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(T.wrapS!==Gt||T.wrapT!==Gt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(U,s.TEXTURE_MAG_FILTER,w(T.magFilter)),s.texParameteri(U,s.TEXTURE_MIN_FILTER,w(T.minFilter)),T.minFilter!==Mt&&T.minFilter!==ft&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(s.texParameteri(U,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(U,s.TEXTURE_COMPARE_FUNC,ge[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ve=e.get("EXT_texture_filter_anisotropic");if(T.magFilter===Mt||T.minFilter!==us&&T.minFilter!==li||T.type===cn&&e.has("OES_texture_float_linear")===!1||a===!1&&T.type===Xi&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||i.get(T).__currentAnisotropy)&&(s.texParameterf(U,ve.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,n.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy)}}function Ee(U,T){let W=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",I));const ve=T.source;let ie=g.get(ve);ie===void 0&&(ie={},g.set(ve,ie));const le=q(T);if(le!==U.__cacheKey){ie[le]===void 0&&(ie[le]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ie[le].usedTimes++;const Se=ie[U.__cacheKey];Se!==void 0&&(ie[U.__cacheKey].usedTimes--,Se.usedTimes===0&&C(T)),U.__cacheKey=le,U.__webglTexture=ie[le].texture}return W}function De(U,T,W){let ve=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ve=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ve=s.TEXTURE_3D);const ie=Ee(U,T),le=T.source;t.bindTexture(ve,U.__webglTexture,s.TEXTURE0+W);const Se=i.get(le);if(le.version!==Se.__version||ie===!0){t.activeTexture(s.TEXTURE0+W);const ce=lt.getPrimaries(lt.workingColorSpace),ye=T.colorSpace===rn?null:lt.getPrimaries(T.colorSpace),Fe=T.colorSpace===rn||ce===ye?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const Ne=S(T)&&x(T.image)===!1;let me=v(T.image,Ne,!1,u);me=je(T,me);const Be=x(me)||a,F=r.convert(T.format,T.colorSpace);let K=r.convert(T.type),ae=A(T.internalFormat,F,K,T.colorSpace,T.isVideoTexture);_e(ve,T,Be);let ue;const Me=T.mipmaps,B=a&&T.isVideoTexture!==!0&&ae!==Yc,be=Se.__version===void 0||ie===!0,oe=M(T,me,Be);if(T.isDepthTexture)ae=s.DEPTH_COMPONENT,a?T.type===cn?ae=s.DEPTH_COMPONENT32F:T.type===Hn?ae=s.DEPTH_COMPONENT24:T.type===ii?ae=s.DEPTH24_STENCIL8:ae=s.DEPTH_COMPONENT16:T.type===cn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===ri&&ae===s.DEPTH_COMPONENT&&T.type!==pa&&T.type!==Hn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=Hn,K=r.convert(T.type)),T.format===qi&&ae===s.DEPTH_COMPONENT&&(ae=s.DEPTH_STENCIL,T.type!==ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=ii,K=r.convert(T.type))),be&&(B?t.texStorage2D(s.TEXTURE_2D,1,ae,me.width,me.height):t.texImage2D(s.TEXTURE_2D,0,ae,me.width,me.height,0,F,K,null));else if(T.isDataTexture)if(Me.length>0&&Be){B&&be&&t.texStorage2D(s.TEXTURE_2D,oe,ae,Me[0].width,Me[0].height);for(let Z=0,he=Me.length;Z<he;Z++)ue=Me[Z],B?t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ue.width,ue.height,F,K,ue.data):t.texImage2D(s.TEXTURE_2D,Z,ae,ue.width,ue.height,0,F,K,ue.data);T.generateMipmaps=!1}else B?(be&&t.texStorage2D(s.TEXTURE_2D,oe,ae,me.width,me.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,me.width,me.height,F,K,me.data)):t.texImage2D(s.TEXTURE_2D,0,ae,me.width,me.height,0,F,K,me.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){B&&be&&t.texStorage3D(s.TEXTURE_2D_ARRAY,oe,ae,Me[0].width,Me[0].height,me.depth);for(let Z=0,he=Me.length;Z<he;Z++)ue=Me[Z],T.format!==jt?F!==null?B?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,ue.width,ue.height,me.depth,F,ue.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Z,ae,ue.width,ue.height,me.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?t.texSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,ue.width,ue.height,me.depth,F,K,ue.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Z,ae,ue.width,ue.height,me.depth,0,F,K,ue.data)}else{B&&be&&t.texStorage2D(s.TEXTURE_2D,oe,ae,Me[0].width,Me[0].height);for(let Z=0,he=Me.length;Z<he;Z++)ue=Me[Z],T.format!==jt?F!==null?B?t.compressedTexSubImage2D(s.TEXTURE_2D,Z,0,0,ue.width,ue.height,F,ue.data):t.compressedTexImage2D(s.TEXTURE_2D,Z,ae,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ue.width,ue.height,F,K,ue.data):t.texImage2D(s.TEXTURE_2D,Z,ae,ue.width,ue.height,0,F,K,ue.data)}else if(T.isDataArrayTexture)B?(be&&t.texStorage3D(s.TEXTURE_2D_ARRAY,oe,ae,me.width,me.height,me.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,F,K,me.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,ae,me.width,me.height,me.depth,0,F,K,me.data);else if(T.isData3DTexture)B?(be&&t.texStorage3D(s.TEXTURE_3D,oe,ae,me.width,me.height,me.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,F,K,me.data)):t.texImage3D(s.TEXTURE_3D,0,ae,me.width,me.height,me.depth,0,F,K,me.data);else if(T.isFramebufferTexture){if(be)if(B)t.texStorage2D(s.TEXTURE_2D,oe,ae,me.width,me.height);else{let Z=me.width,he=me.height;for(let Ue=0;Ue<oe;Ue++)t.texImage2D(s.TEXTURE_2D,Ue,ae,Z,he,0,F,K,null),Z>>=1,he>>=1}}else if(Me.length>0&&Be){B&&be&&t.texStorage2D(s.TEXTURE_2D,oe,ae,Me[0].width,Me[0].height);for(let Z=0,he=Me.length;Z<he;Z++)ue=Me[Z],B?t.texSubImage2D(s.TEXTURE_2D,Z,0,0,F,K,ue):t.texImage2D(s.TEXTURE_2D,Z,ae,F,K,ue);T.generateMipmaps=!1}else B?(be&&t.texStorage2D(s.TEXTURE_2D,oe,ae,me.width,me.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,F,K,me)):t.texImage2D(s.TEXTURE_2D,0,ae,F,K,me);b(T,Be)&&E(ve),Se.__version=le.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function xe(U,T,W){if(T.image.length!==6)return;const ve=Ee(U,T),ie=T.source;t.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+W);const le=i.get(ie);if(ie.version!==le.__version||ve===!0){t.activeTexture(s.TEXTURE0+W);const Se=lt.getPrimaries(lt.workingColorSpace),ce=T.colorSpace===rn?null:lt.getPrimaries(T.colorSpace),ye=T.colorSpace===rn||Se===ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Fe=T.isCompressedTexture||T.image[0].isCompressedTexture,Ne=T.image[0]&&T.image[0].isDataTexture,me=[];for(let Z=0;Z<6;Z++)!Fe&&!Ne?me[Z]=v(T.image[Z],!1,!0,c):me[Z]=Ne?T.image[Z].image:T.image[Z],me[Z]=je(T,me[Z]);const Be=me[0],F=x(Be)||a,K=r.convert(T.format,T.colorSpace),ae=r.convert(T.type),ue=A(T.internalFormat,K,ae,T.colorSpace),Me=a&&T.isVideoTexture!==!0,B=le.__version===void 0||ve===!0;let be=M(T,Be,F);_e(s.TEXTURE_CUBE_MAP,T,F);let oe;if(Fe){Me&&B&&t.texStorage2D(s.TEXTURE_CUBE_MAP,be,ue,Be.width,Be.height);for(let Z=0;Z<6;Z++){oe=me[Z].mipmaps;for(let he=0;he<oe.length;he++){const Ue=oe[he];T.format!==jt?K!==null?Me?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,0,0,Ue.width,Ue.height,K,Ue.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,ue,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,0,0,Ue.width,Ue.height,K,ae,Ue.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,ue,Ue.width,Ue.height,0,K,ae,Ue.data)}}}else{oe=T.mipmaps,Me&&B&&(oe.length>0&&be++,t.texStorage2D(s.TEXTURE_CUBE_MAP,be,ue,me[0].width,me[0].height));for(let Z=0;Z<6;Z++)if(Ne){Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,me[Z].width,me[Z].height,K,ae,me[Z].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,ue,me[Z].width,me[Z].height,0,K,ae,me[Z].data);for(let he=0;he<oe.length;he++){const Le=oe[he].image[Z].image;Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,0,0,Le.width,Le.height,K,ae,Le.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,ue,Le.width,Le.height,0,K,ae,Le.data)}}else{Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,K,ae,me[Z]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,ue,K,ae,me[Z]);for(let he=0;he<oe.length;he++){const Ue=oe[he];Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,0,0,K,ae,Ue.image[Z]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,ue,K,ae,Ue.image[Z])}}}b(T,F)&&E(s.TEXTURE_CUBE_MAP),le.__version=ie.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function fe(U,T,W,ve,ie,le){const Se=r.convert(W.format,W.colorSpace),ce=r.convert(W.type),ye=A(W.internalFormat,Se,ce,W.colorSpace);if(!i.get(T).__hasExternalTextures){const Ne=Math.max(1,T.width>>le),me=Math.max(1,T.height>>le);ie===s.TEXTURE_3D||ie===s.TEXTURE_2D_ARRAY?t.texImage3D(ie,le,ye,Ne,me,T.depth,0,Se,ce,null):t.texImage2D(ie,le,ye,Ne,me,0,Se,ce,null)}t.bindFramebuffer(s.FRAMEBUFFER,U),ze(T)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ve,ie,i.get(W).__webglTexture,0,Te(T)):(ie===s.TEXTURE_2D||ie>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ve,ie,i.get(W).__webglTexture,le),t.bindFramebuffer(s.FRAMEBUFFER,null)}function D(U,T,W){if(s.bindRenderbuffer(s.RENDERBUFFER,U),T.depthBuffer&&!T.stencilBuffer){let ve=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(W||ze(T)){const ie=T.depthTexture;ie&&ie.isDepthTexture&&(ie.type===cn?ve=s.DEPTH_COMPONENT32F:ie.type===Hn&&(ve=s.DEPTH_COMPONENT24));const le=Te(T);ze(T)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,le,ve,T.width,T.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,le,ve,T.width,T.height)}else s.renderbufferStorage(s.RENDERBUFFER,ve,T.width,T.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,U)}else if(T.depthBuffer&&T.stencilBuffer){const ve=Te(T);W&&ze(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ve,s.DEPTH24_STENCIL8,T.width,T.height):ze(T)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ve,s.DEPTH24_STENCIL8,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,U)}else{const ve=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let ie=0;ie<ve.length;ie++){const le=ve[ie],Se=r.convert(le.format,le.colorSpace),ce=r.convert(le.type),ye=A(le.internalFormat,Se,ce,le.colorSpace),Fe=Te(T);W&&ze(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Fe,ye,T.width,T.height):ze(T)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Fe,ye,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,ye,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function pe(U,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),V(T.depthTexture,0);const ve=i.get(T.depthTexture).__webglTexture,ie=Te(T);if(T.depthTexture.format===ri)ze(T)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ve,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ve,0);else if(T.depthTexture.format===qi)ze(T)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ve,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ve,0);else throw new Error("Unknown depthTexture format")}function J(U){const T=i.get(U),W=U.isWebGLCubeRenderTarget===!0;if(U.depthTexture&&!T.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");pe(T.__webglFramebuffer,U)}else if(W){T.__webglDepthbuffer=[];for(let ve=0;ve<6;ve++)t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[ve]),T.__webglDepthbuffer[ve]=s.createRenderbuffer(),D(T.__webglDepthbuffer[ve],U,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=s.createRenderbuffer(),D(T.__webglDepthbuffer,U,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function de(U,T,W){const ve=i.get(U);T!==void 0&&fe(ve.__webglFramebuffer,U,U.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),W!==void 0&&J(U)}function re(U){const T=U.texture,W=i.get(U),ve=i.get(T);U.addEventListener("dispose",R),U.isWebGLMultipleRenderTargets!==!0&&(ve.__webglTexture===void 0&&(ve.__webglTexture=s.createTexture()),ve.__version=T.version,o.memory.textures++);const ie=U.isWebGLCubeRenderTarget===!0,le=U.isWebGLMultipleRenderTargets===!0,Se=x(U)||a;if(ie){W.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(a&&T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer[ce]=[];for(let ye=0;ye<T.mipmaps.length;ye++)W.__webglFramebuffer[ce][ye]=s.createFramebuffer()}else W.__webglFramebuffer[ce]=s.createFramebuffer()}else{if(a&&T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer=[];for(let ce=0;ce<T.mipmaps.length;ce++)W.__webglFramebuffer[ce]=s.createFramebuffer()}else W.__webglFramebuffer=s.createFramebuffer();if(le)if(n.drawBuffers){const ce=U.texture;for(let ye=0,Fe=ce.length;ye<Fe;ye++){const Ne=i.get(ce[ye]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&U.samples>0&&ze(U)===!1){const ce=le?T:[T];W.__webglMultisampledFramebuffer=s.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ye=0;ye<ce.length;ye++){const Fe=ce[ye];W.__webglColorRenderbuffer[ye]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,W.__webglColorRenderbuffer[ye]);const Ne=r.convert(Fe.format,Fe.colorSpace),me=r.convert(Fe.type),Be=A(Fe.internalFormat,Ne,me,Fe.colorSpace,U.isXRRenderTarget===!0),F=Te(U);s.renderbufferStorageMultisample(s.RENDERBUFFER,F,Be,U.width,U.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ye,s.RENDERBUFFER,W.__webglColorRenderbuffer[ye])}s.bindRenderbuffer(s.RENDERBUFFER,null),U.depthBuffer&&(W.__webglDepthRenderbuffer=s.createRenderbuffer(),D(W.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ie){t.bindTexture(s.TEXTURE_CUBE_MAP,ve.__webglTexture),_e(s.TEXTURE_CUBE_MAP,T,Se);for(let ce=0;ce<6;ce++)if(a&&T.mipmaps&&T.mipmaps.length>0)for(let ye=0;ye<T.mipmaps.length;ye++)fe(W.__webglFramebuffer[ce][ye],U,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ye);else fe(W.__webglFramebuffer[ce],U,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);b(T,Se)&&E(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){const ce=U.texture;for(let ye=0,Fe=ce.length;ye<Fe;ye++){const Ne=ce[ye],me=i.get(Ne);t.bindTexture(s.TEXTURE_2D,me.__webglTexture),_e(s.TEXTURE_2D,Ne,Se),fe(W.__webglFramebuffer,U,Ne,s.COLOR_ATTACHMENT0+ye,s.TEXTURE_2D,0),b(Ne,Se)&&E(s.TEXTURE_2D)}t.unbindTexture()}else{let ce=s.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(a?ce=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,ve.__webglTexture),_e(ce,T,Se),a&&T.mipmaps&&T.mipmaps.length>0)for(let ye=0;ye<T.mipmaps.length;ye++)fe(W.__webglFramebuffer[ye],U,T,s.COLOR_ATTACHMENT0,ce,ye);else fe(W.__webglFramebuffer,U,T,s.COLOR_ATTACHMENT0,ce,0);b(T,Se)&&E(ce),t.unbindTexture()}U.depthBuffer&&J(U)}function Pe(U){const T=x(U)||a,W=U.isWebGLMultipleRenderTargets===!0?U.texture:[U.texture];for(let ve=0,ie=W.length;ve<ie;ve++){const le=W[ve];if(b(le,T)){const Se=U.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,ce=i.get(le).__webglTexture;t.bindTexture(Se,ce),E(Se),t.unbindTexture()}}}function Ae(U){if(a&&U.samples>0&&ze(U)===!1){const T=U.isWebGLMultipleRenderTargets?U.texture:[U.texture],W=U.width,ve=U.height;let ie=s.COLOR_BUFFER_BIT;const le=[],Se=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=i.get(U),ye=U.isWebGLMultipleRenderTargets===!0;if(ye)for(let Fe=0;Fe<T.length;Fe++)t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let Fe=0;Fe<T.length;Fe++){le.push(s.COLOR_ATTACHMENT0+Fe),U.depthBuffer&&le.push(Se);const Ne=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(Ne===!1&&(U.depthBuffer&&(ie|=s.DEPTH_BUFFER_BIT),U.stencilBuffer&&(ie|=s.STENCIL_BUFFER_BIT)),ye&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ce.__webglColorRenderbuffer[Fe]),Ne===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Se]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Se])),ye){const me=i.get(T[Fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,me,0)}s.blitFramebuffer(0,0,W,ve,0,0,W,ve,ie,s.NEAREST),d&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,le)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ye)for(let Fe=0;Fe<T.length;Fe++){t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,ce.__webglColorRenderbuffer[Fe]);const Ne=i.get(T[Fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,Ne,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}}function Te(U){return Math.min(h,U.samples)}function ze(U){const T=i.get(U);return a&&U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ge(U){const T=o.render.frame;p.get(U)!==T&&(p.set(U,T),U.update())}function je(U,T){const W=U.colorSpace,ve=U.format,ie=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||U.format===aa||W!==Pn&&W!==rn&&(lt.getTransfer(W)===ut?a===!1?e.has("EXT_sRGB")===!0&&ve===jt?(U.format=aa,U.minFilter=ft,U.generateMipmaps=!1):T=eu.sRGBToLinear(T):(ve!==jt||ie!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),T}this.allocateTextureUnit=$,this.resetTextureUnits=H,this.setTexture2D=V,this.setTexture2DArray=G,this.setTexture3D=j,this.setTextureCube=O,this.rebindTextures=de,this.setupRenderTarget=re,this.updateRenderTargetMipmap=Pe,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=J,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=ze}function tp(s,e,t){const i=t.isWebGL2;function n(r,o=rn){let a;const l=lt.getTransfer(o);if(r===Cn)return s.UNSIGNED_BYTE;if(r===Hc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Vc)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Md)return s.BYTE;if(r===bd)return s.SHORT;if(r===pa)return s.UNSIGNED_SHORT;if(r===Gc)return s.INT;if(r===Hn)return s.UNSIGNED_INT;if(r===cn)return s.FLOAT;if(r===Xi)return i?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===wd)return s.ALPHA;if(r===jt)return s.RGBA;if(r===Ed)return s.LUMINANCE;if(r===Td)return s.LUMINANCE_ALPHA;if(r===ri)return s.DEPTH_COMPONENT;if(r===qi)return s.DEPTH_STENCIL;if(r===aa)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Ad)return s.RED;if(r===Wc)return s.RED_INTEGER;if(r===Cd)return s.RG;if(r===Xc)return s.RG_INTEGER;if(r===qc)return s.RGBA_INTEGER;if(r===Zo||r===$o||r===Jo||r===Ko)if(l===ut)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Zo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===$o)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Jo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ko)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Zo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===$o)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Jo)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ko)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Jl||r===Kl||r===Ql||r===ec)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Jl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Kl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ql)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ec)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Yc)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===tc||r===nc)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===tc)return l===ut?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===nc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===ic||r===rc||r===sc||r===oc||r===ac||r===lc||r===cc||r===uc||r===hc||r===fc||r===dc||r===pc||r===mc||r===gc)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===ic)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===rc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===sc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===oc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ac)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===lc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===cc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===uc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===hc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===fc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===dc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===pc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===mc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===gc)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Qo||r===_c||r===vc)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Qo)return l===ut?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===_c)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===vc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Rd||r===yc||r===xc||r===Sc)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Qo)return a.COMPRESSED_RED_RGTC1_EXT;if(r===yc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===xc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Sc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ii?i?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:n}}class np extends bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ir extends at{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dx={type:"move"};class gl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ir,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ir,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ir,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,i),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Dx)))}return a!==null&&(a.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ir;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Ox extends Yn{constructor(e,t){super();const i=this;let n=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,p=null;const _=t.getContextAttributes();let g=null,m=null;const y=[],v=[],x=new se;let S=null;const b=new bt;b.layers.enable(1),b.viewport=new it;const E=new bt;E.layers.enable(2),E.viewport=new it;const A=[b,E],M=new np;M.layers.enable(1),M.layers.enable(2);let w=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let Y=y[O];return Y===void 0&&(Y=new gl,y[O]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(O){let Y=y[O];return Y===void 0&&(Y=new gl,y[O]=Y),Y.getGripSpace()},this.getHand=function(O){let Y=y[O];return Y===void 0&&(Y=new gl,y[O]=Y),Y.getHandSpace()};function R(O){const Y=v.indexOf(O.inputSource);if(Y===-1)return;const te=y[Y];te!==void 0&&(te.update(O.inputSource,O.frame,c||o),te.dispatchEvent({type:O.type,data:O.inputSource}))}function z(){n.removeEventListener("select",R),n.removeEventListener("selectstart",R),n.removeEventListener("selectend",R),n.removeEventListener("squeeze",R),n.removeEventListener("squeezestart",R),n.removeEventListener("squeezeend",R),n.removeEventListener("end",z),n.removeEventListener("inputsourceschange",C);for(let O=0;O<y.length;O++){const Y=v[O];Y!==null&&(v[O]=null,y[O].disconnect(Y))}w=null,I=null,e.setRenderTarget(g),d=null,f=null,h=null,n=null,m=null,j.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(x.width,x.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return p},this.getSession=function(){return n},this.setSession=async function(O){if(n=O,n!==null){if(g=e.getRenderTarget(),n.addEventListener("select",R),n.addEventListener("selectstart",R),n.addEventListener("selectend",R),n.addEventListener("squeeze",R),n.addEventListener("squeezestart",R),n.addEventListener("squeezeend",R),n.addEventListener("end",z),n.addEventListener("inputsourceschange",C),_.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(x),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Y={antialias:n.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(n,t,Y),n.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new un(d.framebufferWidth,d.framebufferHeight,{format:jt,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Y=null,te=null,ge=null;_.depth&&(ge=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=_.stencil?qi:ri,te=_.stencil?ii:Hn);const _e={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};h=new XRWebGLBinding(n,t),f=h.createProjectionLayer(_e),n.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),m=new un(f.textureWidth,f.textureHeight,{format:jt,type:Cn,depthTexture:new va(f.textureWidth,f.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ee=e.properties.get(m);Ee.__ignoreDepthValues=f.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await n.requestReferenceSpace(a),j.setContext(n),j.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function C(O){for(let Y=0;Y<O.removed.length;Y++){const te=O.removed[Y],ge=v.indexOf(te);ge>=0&&(v[ge]=null,y[ge].disconnect(te))}for(let Y=0;Y<O.added.length;Y++){const te=O.added[Y];let ge=v.indexOf(te);if(ge===-1){for(let Ee=0;Ee<y.length;Ee++)if(Ee>=v.length){v.push(te),ge=Ee;break}else if(v[Ee]===null){v[Ee]=te,ge=Ee;break}if(ge===-1)break}const _e=y[ge];_e&&_e.connect(te)}}const N=new P,k=new P;function H(O,Y,te){N.setFromMatrixPosition(Y.matrixWorld),k.setFromMatrixPosition(te.matrixWorld);const ge=N.distanceTo(k),_e=Y.projectionMatrix.elements,Ee=te.projectionMatrix.elements,De=_e[14]/(_e[10]-1),xe=_e[14]/(_e[10]+1),fe=(_e[9]+1)/_e[5],D=(_e[9]-1)/_e[5],pe=(_e[8]-1)/_e[0],J=(Ee[8]+1)/Ee[0],de=De*pe,re=De*J,Pe=ge/(-pe+J),Ae=Pe*-pe;Y.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Ae),O.translateZ(Pe),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert();const Te=De+Pe,ze=xe+Pe,Ge=de-Ae,je=re+(ge-Ae),U=fe*xe/ze*Te,T=D*xe/ze*Te;O.projectionMatrix.makePerspective(Ge,je,U,T,Te,ze),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}function $(O,Y){Y===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(Y.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(n===null)return;M.near=E.near=b.near=O.near,M.far=E.far=b.far=O.far,(w!==M.near||I!==M.far)&&(n.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,I=M.far);const Y=O.parent,te=M.cameras;$(M,Y);for(let ge=0;ge<te.length;ge++)$(te[ge],Y);te.length===2?H(M,b,E):M.projectionMatrix.copy(b.projectionMatrix),q(O,M,Y)};function q(O,Y,te){te===null?O.matrix.copy(Y.matrixWorld):(O.matrix.copy(te.matrixWorld),O.matrix.invert(),O.matrix.multiply(Y.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(Y.projectionMatrix),O.projectionMatrixInverse.copy(Y.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Nr*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(O){l=O,f!==null&&(f.fixedFoveation=O),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=O)};let V=null;function G(O,Y){if(u=Y.getViewerPose(c||o),p=Y,u!==null){const te=u.views;d!==null&&(e.setRenderTargetFramebuffer(m,d.framebuffer),e.setRenderTarget(m));let ge=!1;te.length!==M.cameras.length&&(M.cameras.length=0,ge=!0);for(let _e=0;_e<te.length;_e++){const Ee=te[_e];let De=null;if(d!==null)De=d.getViewport(Ee);else{const fe=h.getViewSubImage(f,Ee);De=fe.viewport,_e===0&&(e.setRenderTargetTextures(m,fe.colorTexture,f.ignoreDepthValues?void 0:fe.depthStencilTexture),e.setRenderTarget(m))}let xe=A[_e];xe===void 0&&(xe=new bt,xe.layers.enable(_e),xe.viewport=new it,A[_e]=xe),xe.matrix.fromArray(Ee.transform.matrix),xe.matrix.decompose(xe.position,xe.quaternion,xe.scale),xe.projectionMatrix.fromArray(Ee.projectionMatrix),xe.projectionMatrixInverse.copy(xe.projectionMatrix).invert(),xe.viewport.set(De.x,De.y,De.width,De.height),_e===0&&(M.matrix.copy(xe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ge===!0&&M.cameras.push(xe)}}for(let te=0;te<y.length;te++){const ge=v[te],_e=y[te];ge!==null&&_e!==void 0&&_e.update(ge,Y,c||o)}V&&V(O,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),p=null}const j=new Zd;j.setAnimationLoop(G),this.setAnimationLoop=function(O){V=O},this.dispose=function(){}}}function Fx(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,qd(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function n(g,m,y,v,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),h(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,y,v):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ht&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ht&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const y=e.get(m).envMap;if(y&&(g.envMap.value=y,g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap){g.lightMap.value=m.lightMap;const v=s._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=m.lightMapIntensity*v,t(m.lightMap,g.lightMapTransform)}m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,y,v){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*y,g.scale.value=v*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),e.get(m).envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,y){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ht&&g.clearcoatNormalScale.value.negate())),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const y=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Nx(s,e,t,i){let n={},r={},o=[];const a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,v){const x=v.program;i.uniformBlockBinding(y,x)}function c(y,v){let x=n[y.id];x===void 0&&(p(y),x=u(y),n[y.id]=x,y.addEventListener("dispose",g));const S=v.program;i.updateUBOMapping(y,S);const b=e.render.frame;r[y.id]!==b&&(f(y),r[y.id]=b)}function u(y){const v=h();y.__bindingPointIndex=v;const x=s.createBuffer(),S=y.__size,b=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,S,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,x),x}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=n[y.id],x=y.uniforms,S=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let b=0,E=x.length;b<E;b++){const A=x[b];if(d(A,b,S)===!0){const M=A.__offset,w=Array.isArray(A.value)?A.value:[A.value];let I=0;for(let R=0;R<w.length;R++){const z=w[R],C=_(z);typeof z=="number"?(A.__data[0]=z,s.bufferSubData(s.UNIFORM_BUFFER,M+I,A.__data)):z.isMatrix3?(A.__data[0]=z.elements[0],A.__data[1]=z.elements[1],A.__data[2]=z.elements[2],A.__data[3]=z.elements[0],A.__data[4]=z.elements[3],A.__data[5]=z.elements[4],A.__data[6]=z.elements[5],A.__data[7]=z.elements[0],A.__data[8]=z.elements[6],A.__data[9]=z.elements[7],A.__data[10]=z.elements[8],A.__data[11]=z.elements[0]):(z.toArray(A.__data,I),I+=C.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,M,A.__data)}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(y,v,x){const S=y.value;if(x[v]===void 0){if(typeof S=="number")x[v]=S;else{const b=Array.isArray(S)?S:[S],E=[];for(let A=0;A<b.length;A++)E.push(b[A].clone());x[v]=E}return!0}else if(typeof S=="number"){if(x[v]!==S)return x[v]=S,!0}else{const b=Array.isArray(x[v])?x[v]:[x[v]],E=Array.isArray(S)?S:[S];for(let A=0;A<b.length;A++){const M=b[A];if(M.equals(E[A])===!1)return M.copy(E[A]),!0}}return!1}function p(y){const v=y.uniforms;let x=0;const S=16;let b=0;for(let E=0,A=v.length;E<A;E++){const M=v[E],w={boundary:0,storage:0},I=Array.isArray(M.value)?M.value:[M.value];for(let R=0,z=I.length;R<z;R++){const C=I[R],N=_(C);w.boundary+=N.boundary,w.storage+=N.storage}if(M.__data=new Float32Array(w.storage/Float32Array.BYTES_PER_ELEMENT),M.__offset=x,E>0){b=x%S;const R=S-b;b!==0&&R-w.boundary<0&&(x+=S-b,M.__offset=x)}x+=w.storage}return b=x%S,b>0&&(x+=S-b),y.__size=x,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function g(y){const v=y.target;v.removeEventListener("dispose",g);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(n[v.id]),delete n[v.id],delete r[v.id]}function m(){for(const y in n)s.deleteBuffer(n[y]);o=[],n={},r={}}return{bind:l,update:c,dispose:m}}class su{constructor(e={}){const{canvas:t=Vd(),context:i=null,depth:n=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=o;const d=new Uint32Array(4),p=new Int32Array(4);let _=null,g=null;const m=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Tt,this._useLegacyLights=!1,this.toneMapping=An,this.toneMappingExposure=1;const v=this;let x=!1,S=0,b=0,E=null,A=-1,M=null;const w=new it,I=new it;let R=null;const z=new Re(0);let C=0,N=t.width,k=t.height,H=1,$=null,q=null;const V=new it(0,0,N,k),G=new it(0,0,N,k);let j=!1;const O=new Hs;let Y=!1,te=!1,ge=null;const _e=new Ve,Ee=new se,De=new P,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function fe(){return E===null?H:1}let D=i;function pe(L,X){for(let ee=0;ee<L.length;ee++){const ne=L[ee],Q=t.getContext(ne,X);if(Q!==null)return Q}return null}try{const L={alpha:!0,depth:n,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gr}`),t.addEventListener("webglcontextlost",Me,!1),t.addEventListener("webglcontextrestored",B,!1),t.addEventListener("webglcontextcreationerror",be,!1),D===null){const X=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&X.shift(),D=pe(X,L),D===null)throw pe(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let J,de,re,Pe,Ae,Te,ze,Ge,je,U,T,W,ve,ie,le,Se,ce,ye,Fe,Ne,me,Be,F,K;function ae(){J=new Kv(D),de=new qv(D,J,e),J.init(de),Be=new tp(D,J,de),re=new Ux(D,J,de),Pe=new ty(D),Ae=new xx,Te=new Ix(D,J,re,Ae,de,Be,Pe),ze=new jv(v),Ge=new Jv(v),je=new c0(D,de),F=new Wv(D,J,je,de),U=new Qv(D,je,Pe,F),T=new sy(D,U,je,Pe),Fe=new ry(D,de,Te),Se=new Yv(Ae),W=new yx(v,ze,Ge,J,de,F,Se),ve=new Fx(v,Ae),ie=new Mx,le=new Cx(J,de),ye=new Vv(v,ze,Ge,re,T,f,l),ce=new Lx(v,T,de),K=new Nx(D,Pe,de,re),Ne=new Xv(D,J,Pe,de),me=new ey(D,J,Pe,de),Pe.programs=W.programs,v.capabilities=de,v.extensions=J,v.properties=Ae,v.renderLists=ie,v.shadowMap=ce,v.state=re,v.info=Pe}ae();const ue=new Ox(v,D);this.xr=ue,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const L=J.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=J.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(L){L!==void 0&&(H=L,this.setSize(N,k,!1))},this.getSize=function(L){return L.set(N,k)},this.setSize=function(L,X,ee=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=L,k=X,t.width=Math.floor(L*H),t.height=Math.floor(X*H),ee===!0&&(t.style.width=L+"px",t.style.height=X+"px"),this.setViewport(0,0,L,X)},this.getDrawingBufferSize=function(L){return L.set(N*H,k*H).floor()},this.setDrawingBufferSize=function(L,X,ee){N=L,k=X,H=ee,t.width=Math.floor(L*ee),t.height=Math.floor(X*ee),this.setViewport(0,0,L,X)},this.getCurrentViewport=function(L){return L.copy(w)},this.getViewport=function(L){return L.copy(V)},this.setViewport=function(L,X,ee,ne){L.isVector4?V.set(L.x,L.y,L.z,L.w):V.set(L,X,ee,ne),re.viewport(w.copy(V).multiplyScalar(H).floor())},this.getScissor=function(L){return L.copy(G)},this.setScissor=function(L,X,ee,ne){L.isVector4?G.set(L.x,L.y,L.z,L.w):G.set(L,X,ee,ne),re.scissor(I.copy(G).multiplyScalar(H).floor())},this.getScissorTest=function(){return j},this.setScissorTest=function(L){re.setScissorTest(j=L)},this.setOpaqueSort=function(L){$=L},this.setTransparentSort=function(L){q=L},this.getClearColor=function(L){return L.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor.apply(ye,arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha.apply(ye,arguments)},this.clear=function(L=!0,X=!0,ee=!0){let ne=0;if(L){let Q=!1;if(E!==null){const Ie=E.texture.format;Q=Ie===qc||Ie===Xc||Ie===Wc}if(Q){const Ie=E.texture.type,ke=Ie===Cn||Ie===Hn||Ie===pa||Ie===ii||Ie===Hc||Ie===Vc,We=ye.getClearColor(),Ye=ye.getClearAlpha(),tt=We.r,Ze=We.g,Je=We.b;ke?(d[0]=tt,d[1]=Ze,d[2]=Je,d[3]=Ye,D.clearBufferuiv(D.COLOR,0,d)):(p[0]=tt,p[1]=Ze,p[2]=Je,p[3]=Ye,D.clearBufferiv(D.COLOR,0,p))}else ne|=D.COLOR_BUFFER_BIT}X&&(ne|=D.DEPTH_BUFFER_BIT),ee&&(ne|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Me,!1),t.removeEventListener("webglcontextrestored",B,!1),t.removeEventListener("webglcontextcreationerror",be,!1),ie.dispose(),le.dispose(),Ae.dispose(),ze.dispose(),Ge.dispose(),T.dispose(),F.dispose(),K.dispose(),W.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",rt),ue.removeEventListener("sessionend",qe),ge&&(ge.dispose(),ge=null),st.stop()};function Me(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function B(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const L=Pe.autoReset,X=ce.enabled,ee=ce.autoUpdate,ne=ce.needsUpdate,Q=ce.type;ae(),Pe.autoReset=L,ce.enabled=X,ce.autoUpdate=ee,ce.needsUpdate=ne,ce.type=Q}function be(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function oe(L){const X=L.target;X.removeEventListener("dispose",oe),Z(X)}function Z(L){he(L),Ae.remove(L)}function he(L){const X=Ae.get(L).programs;X!==void 0&&(X.forEach(function(ee){W.releaseProgram(ee)}),L.isShaderMaterial&&W.releaseShaderCache(L))}this.renderBufferDirect=function(L,X,ee,ne,Q,Ie){X===null&&(X=xe);const ke=Q.isMesh&&Q.matrixWorld.determinant()<0,We=Am(L,X,ee,ne,Q);re.setMaterial(ne,ke);let Ye=ee.index,tt=1;if(ne.wireframe===!0){if(Ye=U.getWireframeAttribute(ee),Ye===void 0)return;tt=2}const Ze=ee.drawRange,Je=ee.attributes.position;let xt=Ze.start*tt,en=(Ze.start+Ze.count)*tt;Ie!==null&&(xt=Math.max(xt,Ie.start*tt),en=Math.min(en,(Ie.start+Ie.count)*tt)),Ye!==null?(xt=Math.max(xt,0),en=Math.min(en,Ye.count)):Je!=null&&(xt=Math.max(xt,0),en=Math.min(en,Je.count));const Lt=en-xt;if(Lt<0||Lt===1/0)return;F.setup(Q,ne,We,ee,Ye);let Dn,dt=Ne;if(Ye!==null&&(Dn=je.get(Ye),dt=me,dt.setIndex(Dn)),Q.isMesh)ne.wireframe===!0?(re.setLineWidth(ne.wireframeLinewidth*fe()),dt.setMode(D.LINES)):dt.setMode(D.TRIANGLES);else if(Q.isLine){let nt=ne.linewidth;nt===void 0&&(nt=1),re.setLineWidth(nt*fe()),Q.isLineSegments?dt.setMode(D.LINES):Q.isLineLoop?dt.setMode(D.LINE_LOOP):dt.setMode(D.LINE_STRIP)}else Q.isPoints?dt.setMode(D.POINTS):Q.isSprite&&dt.setMode(D.TRIANGLES);if(Q.isBatchedMesh)dt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else if(Q.isInstancedMesh)dt.renderInstances(xt,Lt,Q.count);else if(ee.isInstancedBufferGeometry){const nt=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,Wa=Math.min(ee.instanceCount,nt);dt.renderInstances(xt,Lt,Wa)}else dt.render(xt,Lt)};function Ue(L,X,ee){L.transparent===!0&&L.side===yn&&L.forceSinglePass===!1?(L.side=Ht,L.needsUpdate=!0,In(L,X,ee),L.side=Wn,L.needsUpdate=!0,In(L,X,ee),L.side=yn):In(L,X,ee)}this.compile=function(L,X,ee=null){ee===null&&(ee=L),g=le.get(ee),g.init(),y.push(g),ee.traverseVisible(function(Q){Q.isLight&&Q.layers.test(X.layers)&&(g.pushLight(Q),Q.castShadow&&g.pushShadow(Q))}),L!==ee&&L.traverseVisible(function(Q){Q.isLight&&Q.layers.test(X.layers)&&(g.pushLight(Q),Q.castShadow&&g.pushShadow(Q))}),g.setupLights(v._useLegacyLights);const ne=new Set;return L.traverse(function(Q){const Ie=Q.material;if(Ie)if(Array.isArray(Ie))for(let ke=0;ke<Ie.length;ke++){const We=Ie[ke];Ue(We,ee,Q),ne.add(We)}else Ue(Ie,ee,Q),ne.add(Ie)}),y.pop(),g=null,ne},this.compileAsync=function(L,X,ee=null){const ne=this.compile(L,X,ee);return new Promise(Q=>{function Ie(){if(ne.forEach(function(ke){Ae.get(ke).currentProgram.isReady()&&ne.delete(ke)}),ne.size===0){Q(L);return}setTimeout(Ie,10)}J.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let Le=null;function Xe(L){Le&&Le(L)}function rt(){st.stop()}function qe(){st.start()}const st=new Zd;st.setAnimationLoop(Xe),typeof self<"u"&&st.setContext(self),this.setAnimationLoop=function(L){Le=L,ue.setAnimationLoop(L),L===null?st.stop():st.start()},ue.addEventListener("sessionstart",rt),ue.addEventListener("sessionend",qe),this.render=function(L,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(X),X=ue.getCamera()),L.isScene===!0&&L.onBeforeRender(v,L,X,E),g=le.get(L,y.length),g.init(),y.push(g),_e.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),O.setFromProjectionMatrix(_e),te=this.localClippingEnabled,Y=Se.init(this.clippingPlanes,te),_=ie.get(L,m.length),_.init(),m.push(_),Pt(L,X,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort($,q),this.info.render.frame++,Y===!0&&Se.beginShadows();const ee=g.state.shadowsArray;if(ce.render(ee,L,X),Y===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset(),ye.render(_,L),g.setupLights(v._useLegacyLights),X.isArrayCamera){const ne=X.cameras;for(let Q=0,Ie=ne.length;Q<Ie;Q++){const ke=ne[Q];er(_,L,ke,ke.viewport)}}else er(_,L,X);E!==null&&(Te.updateMultisampleRenderTarget(E),Te.updateRenderTargetMipmap(E)),L.isScene===!0&&L.onAfterRender(v,L,X),F.resetDefaultState(),A=-1,M=null,y.pop(),y.length>0?g=y[y.length-1]:g=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Pt(L,X,ee,ne){if(L.visible===!1)return;if(L.layers.test(X.layers)){if(L.isGroup)ee=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(X);else if(L.isLight)g.pushLight(L),L.castShadow&&g.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||O.intersectsSprite(L)){ne&&De.setFromMatrixPosition(L.matrixWorld).applyMatrix4(_e);const ke=T.update(L),We=L.material;We.visible&&_.push(L,ke,We,ee,De.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||O.intersectsObject(L))){const ke=T.update(L),We=L.material;if(ne&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),De.copy(L.boundingSphere.center)):(ke.boundingSphere===null&&ke.computeBoundingSphere(),De.copy(ke.boundingSphere.center)),De.applyMatrix4(L.matrixWorld).applyMatrix4(_e)),Array.isArray(We)){const Ye=ke.groups;for(let tt=0,Ze=Ye.length;tt<Ze;tt++){const Je=Ye[tt],xt=We[Je.materialIndex];xt&&xt.visible&&_.push(L,ke,xt,ee,De.z,Je)}}else We.visible&&_.push(L,ke,We,ee,De.z,null)}}const Ie=L.children;for(let ke=0,We=Ie.length;ke<We;ke++)Pt(Ie[ke],X,ee,ne)}function er(L,X,ee,ne){const Q=L.opaque,Ie=L.transmissive,ke=L.transparent;g.setupLightsView(ee),Y===!0&&Se.setGlobalState(v.clippingPlanes,ee),Ie.length>0&&tr(Q,Ie,X,ee),ne&&re.viewport(w.copy(ne)),Q.length>0&&Un(Q,X,ee),Ie.length>0&&Un(Ie,X,ee),ke.length>0&&Un(ke,X,ee),re.buffers.depth.setTest(!0),re.buffers.depth.setMask(!0),re.buffers.color.setMask(!0),re.setPolygonOffset(!1)}function tr(L,X,ee,ne){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;const Ie=de.isWebGL2;ge===null&&(ge=new un(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")?Xi:Cn,minFilter:li,samples:Ie?4:0})),v.getDrawingBufferSize(Ee),Ie?ge.setSize(Ee.x,Ee.y):ge.setSize(la(Ee.x),la(Ee.y));const ke=v.getRenderTarget();v.setRenderTarget(ge),v.getClearColor(z),C=v.getClearAlpha(),C<1&&v.setClearColor(16777215,.5),v.clear();const We=v.toneMapping;v.toneMapping=An,Un(L,ee,ne),Te.updateMultisampleRenderTarget(ge),Te.updateRenderTargetMipmap(ge);let Ye=!1;for(let tt=0,Ze=X.length;tt<Ze;tt++){const Je=X[tt],xt=Je.object,en=Je.geometry,Lt=Je.material,Dn=Je.group;if(Lt.side===yn&&xt.layers.test(ne.layers)){const dt=Lt.side;Lt.side=Ht,Lt.needsUpdate=!0,pi(xt,ee,ne,en,Lt,Dn),Lt.side=dt,Lt.needsUpdate=!0,Ye=!0}}Ye===!0&&(Te.updateMultisampleRenderTarget(ge),Te.updateRenderTargetMipmap(ge)),v.setRenderTarget(ke),v.setClearColor(z,C),v.toneMapping=We}function Un(L,X,ee){const ne=X.isScene===!0?X.overrideMaterial:null;for(let Q=0,Ie=L.length;Q<Ie;Q++){const ke=L[Q],We=ke.object,Ye=ke.geometry,tt=ne===null?ke.material:ne,Ze=ke.group;We.layers.test(ee.layers)&&pi(We,X,ee,Ye,tt,Ze)}}function pi(L,X,ee,ne,Q,Ie){L.onBeforeRender(v,X,ee,ne,Q,Ie),L.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),Q.onBeforeRender(v,X,ee,ne,L,Ie),Q.transparent===!0&&Q.side===yn&&Q.forceSinglePass===!1?(Q.side=Ht,Q.needsUpdate=!0,v.renderBufferDirect(ee,X,ne,Q,L,Ie),Q.side=Wn,Q.needsUpdate=!0,v.renderBufferDirect(ee,X,ne,Q,L,Ie),Q.side=yn):v.renderBufferDirect(ee,X,ne,Q,L,Ie),L.onAfterRender(v,X,ee,ne,Q,Ie)}function In(L,X,ee){X.isScene!==!0&&(X=xe);const ne=Ae.get(L),Q=g.state.lights,Ie=g.state.shadowsArray,ke=Q.state.version,We=W.getParameters(L,Q.state,Ie,X,ee),Ye=W.getProgramCacheKey(We);let tt=ne.programs;ne.environment=L.isMeshStandardMaterial?X.environment:null,ne.fog=X.fog,ne.envMap=(L.isMeshStandardMaterial?Ge:ze).get(L.envMap||ne.environment),tt===void 0&&(L.addEventListener("dispose",oe),tt=new Map,ne.programs=tt);let Ze=tt.get(Ye);if(Ze!==void 0){if(ne.currentProgram===Ze&&ne.lightsStateVersion===ke)return nr(L,We),Ze}else We.uniforms=W.getUniforms(L),L.onBuild(ee,We,v),L.onBeforeCompile(We,v),Ze=W.acquireProgram(We,Ye),tt.set(Ye,Ze),ne.uniforms=We.uniforms;const Je=ne.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Je.clippingPlanes=Se.uniform),nr(L,We),ne.needsLights=Rm(L),ne.lightsStateVersion=ke,ne.needsLights&&(Je.ambientLightColor.value=Q.state.ambient,Je.lightProbe.value=Q.state.probe,Je.directionalLights.value=Q.state.directional,Je.directionalLightShadows.value=Q.state.directionalShadow,Je.spotLights.value=Q.state.spot,Je.spotLightShadows.value=Q.state.spotShadow,Je.rectAreaLights.value=Q.state.rectArea,Je.ltc_1.value=Q.state.rectAreaLTC1,Je.ltc_2.value=Q.state.rectAreaLTC2,Je.pointLights.value=Q.state.point,Je.pointLightShadows.value=Q.state.pointShadow,Je.hemisphereLights.value=Q.state.hemi,Je.directionalShadowMap.value=Q.state.directionalShadowMap,Je.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Je.spotShadowMap.value=Q.state.spotShadowMap,Je.spotLightMatrix.value=Q.state.spotLightMatrix,Je.spotLightMap.value=Q.state.spotLightMap,Je.pointShadowMap.value=Q.state.pointShadowMap,Je.pointShadowMatrix.value=Q.state.pointShadowMatrix),ne.currentProgram=Ze,ne.uniformsList=null,Ze}function fn(L){if(L.uniformsList===null){const X=L.currentProgram.getUniforms();L.uniformsList=ta.seqWithValue(X.seq,L.uniforms)}return L.uniformsList}function nr(L,X){const ee=Ae.get(L);ee.outputColorSpace=X.outputColorSpace,ee.batching=X.batching,ee.instancing=X.instancing,ee.instancingColor=X.instancingColor,ee.skinning=X.skinning,ee.morphTargets=X.morphTargets,ee.morphNormals=X.morphNormals,ee.morphColors=X.morphColors,ee.morphTargetsCount=X.morphTargetsCount,ee.numClippingPlanes=X.numClippingPlanes,ee.numIntersection=X.numClipIntersection,ee.vertexAlphas=X.vertexAlphas,ee.vertexTangents=X.vertexTangents,ee.toneMapping=X.toneMapping}function Am(L,X,ee,ne,Q){X.isScene!==!0&&(X=xe),Te.resetTextureUnits();const Ie=X.fog,ke=ne.isMeshStandardMaterial?X.environment:null,We=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Pn,Ye=(ne.isMeshStandardMaterial?Ge:ze).get(ne.envMap||ke),tt=ne.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,Ze=!!ee.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Je=!!ee.morphAttributes.position,xt=!!ee.morphAttributes.normal,en=!!ee.morphAttributes.color;let Lt=An;ne.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Lt=v.toneMapping);const Dn=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,dt=Dn!==void 0?Dn.length:0,nt=Ae.get(ne),Wa=g.state.lights;if(Y===!0&&(te===!0||L!==M)){const an=L===M&&ne.id===A;Se.setState(ne,L,an)}let gt=!1;ne.version===nt.__version?(nt.needsLights&&nt.lightsStateVersion!==Wa.state.version||nt.outputColorSpace!==We||Q.isBatchedMesh&&nt.batching===!1||!Q.isBatchedMesh&&nt.batching===!0||Q.isInstancedMesh&&nt.instancing===!1||!Q.isInstancedMesh&&nt.instancing===!0||Q.isSkinnedMesh&&nt.skinning===!1||!Q.isSkinnedMesh&&nt.skinning===!0||Q.isInstancedMesh&&nt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&nt.instancingColor===!1&&Q.instanceColor!==null||nt.envMap!==Ye||ne.fog===!0&&nt.fog!==Ie||nt.numClippingPlanes!==void 0&&(nt.numClippingPlanes!==Se.numPlanes||nt.numIntersection!==Se.numIntersection)||nt.vertexAlphas!==tt||nt.vertexTangents!==Ze||nt.morphTargets!==Je||nt.morphNormals!==xt||nt.morphColors!==en||nt.toneMapping!==Lt||de.isWebGL2===!0&&nt.morphTargetsCount!==dt)&&(gt=!0):(gt=!0,nt.__version=ne.version);let mi=nt.currentProgram;gt===!0&&(mi=In(ne,X,Q));let Iu=!1,qr=!1,Xa=!1;const Nt=mi.getUniforms(),gi=nt.uniforms;if(re.useProgram(mi.program)&&(Iu=!0,qr=!0,Xa=!0),ne.id!==A&&(A=ne.id,qr=!0),Iu||M!==L){Nt.setValue(D,"projectionMatrix",L.projectionMatrix),Nt.setValue(D,"viewMatrix",L.matrixWorldInverse);const an=Nt.map.cameraPosition;an!==void 0&&an.setValue(D,De.setFromMatrixPosition(L.matrixWorld)),de.logarithmicDepthBuffer&&Nt.setValue(D,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Nt.setValue(D,"isOrthographic",L.isOrthographicCamera===!0),M!==L&&(M=L,qr=!0,Xa=!0)}if(Q.isSkinnedMesh){Nt.setOptional(D,Q,"bindMatrix"),Nt.setOptional(D,Q,"bindMatrixInverse");const an=Q.skeleton;an&&(de.floatVertexTextures?(an.boneTexture===null&&an.computeBoneTexture(),Nt.setValue(D,"boneTexture",an.boneTexture,Te)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Q.isBatchedMesh&&(Nt.setOptional(D,Q,"batchingTexture"),Nt.setValue(D,"batchingTexture",Q._matricesTexture,Te));const qa=ee.morphAttributes;if((qa.position!==void 0||qa.normal!==void 0||qa.color!==void 0&&de.isWebGL2===!0)&&Fe.update(Q,ee,mi),(qr||nt.receiveShadow!==Q.receiveShadow)&&(nt.receiveShadow=Q.receiveShadow,Nt.setValue(D,"receiveShadow",Q.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(gi.envMap.value=Ye,gi.flipEnvMap.value=Ye.isCubeTexture&&Ye.isRenderTargetTexture===!1?-1:1),qr&&(Nt.setValue(D,"toneMappingExposure",v.toneMappingExposure),nt.needsLights&&Cm(gi,Xa),Ie&&ne.fog===!0&&ve.refreshFogUniforms(gi,Ie),ve.refreshMaterialUniforms(gi,ne,H,k,ge),ta.upload(D,fn(nt),gi,Te)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(ta.upload(D,fn(nt),gi,Te),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Nt.setValue(D,"center",Q.center),Nt.setValue(D,"modelViewMatrix",Q.modelViewMatrix),Nt.setValue(D,"normalMatrix",Q.normalMatrix),Nt.setValue(D,"modelMatrix",Q.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){const an=ne.uniformsGroups;for(let Ya=0,Pm=an.length;Ya<Pm;Ya++)if(de.isWebGL2){const Du=an[Ya];K.update(Du,mi),K.bind(Du,mi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return mi}function Cm(L,X){L.ambientLightColor.needsUpdate=X,L.lightProbe.needsUpdate=X,L.directionalLights.needsUpdate=X,L.directionalLightShadows.needsUpdate=X,L.pointLights.needsUpdate=X,L.pointLightShadows.needsUpdate=X,L.spotLights.needsUpdate=X,L.spotLightShadows.needsUpdate=X,L.rectAreaLights.needsUpdate=X,L.hemisphereLights.needsUpdate=X}function Rm(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(L,X,ee){Ae.get(L.texture).__webglTexture=X,Ae.get(L.depthTexture).__webglTexture=ee;const ne=Ae.get(L);ne.__hasExternalTextures=!0,ne.__hasExternalTextures&&(ne.__autoAllocateDepthBuffer=ee===void 0,ne.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ne.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(L,X){const ee=Ae.get(L);ee.__webglFramebuffer=X,ee.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(L,X=0,ee=0){E=L,S=X,b=ee;let ne=!0,Q=null,Ie=!1,ke=!1;if(L){const Ye=Ae.get(L);Ye.__useDefaultFramebuffer!==void 0?(re.bindFramebuffer(D.FRAMEBUFFER,null),ne=!1):Ye.__webglFramebuffer===void 0?Te.setupRenderTarget(L):Ye.__hasExternalTextures&&Te.rebindTextures(L,Ae.get(L.texture).__webglTexture,Ae.get(L.depthTexture).__webglTexture);const tt=L.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(ke=!0);const Ze=Ae.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Ze[X])?Q=Ze[X][ee]:Q=Ze[X],Ie=!0):de.isWebGL2&&L.samples>0&&Te.useMultisampledRTT(L)===!1?Q=Ae.get(L).__webglMultisampledFramebuffer:Array.isArray(Ze)?Q=Ze[ee]:Q=Ze,w.copy(L.viewport),I.copy(L.scissor),R=L.scissorTest}else w.copy(V).multiplyScalar(H).floor(),I.copy(G).multiplyScalar(H).floor(),R=j;if(re.bindFramebuffer(D.FRAMEBUFFER,Q)&&de.drawBuffers&&ne&&re.drawBuffers(L,Q),re.viewport(w),re.scissor(I),re.setScissorTest(R),Ie){const Ye=Ae.get(L.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ye.__webglTexture,ee)}else if(ke){const Ye=Ae.get(L.texture),tt=X||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ye.__webglTexture,ee||0,tt)}A=-1},this.readRenderTargetPixels=function(L,X,ee,ne,Q,Ie,ke){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let We=Ae.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&ke!==void 0&&(We=We[ke]),We){re.bindFramebuffer(D.FRAMEBUFFER,We);try{const Ye=L.texture,tt=Ye.format,Ze=Ye.type;if(tt!==jt&&Be.convert(tt)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Je=Ze===Xi&&(J.has("EXT_color_buffer_half_float")||de.isWebGL2&&J.has("EXT_color_buffer_float"));if(Ze!==Cn&&Be.convert(Ze)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ze===cn&&(de.isWebGL2||J.has("OES_texture_float")||J.has("WEBGL_color_buffer_float")))&&!Je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=L.width-ne&&ee>=0&&ee<=L.height-Q&&D.readPixels(X,ee,ne,Q,Be.convert(tt),Be.convert(Ze),Ie)}finally{const Ye=E!==null?Ae.get(E).__webglFramebuffer:null;re.bindFramebuffer(D.FRAMEBUFFER,Ye)}}},this.copyFramebufferToTexture=function(L,X,ee=0){const ne=Math.pow(2,-ee),Q=Math.floor(X.image.width*ne),Ie=Math.floor(X.image.height*ne);Te.setTexture2D(X,0),D.copyTexSubImage2D(D.TEXTURE_2D,ee,0,0,L.x,L.y,Q,Ie),re.unbindTexture()},this.copyTextureToTexture=function(L,X,ee,ne=0){const Q=X.image.width,Ie=X.image.height,ke=Be.convert(ee.format),We=Be.convert(ee.type);Te.setTexture2D(ee,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,ee.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,ee.unpackAlignment),X.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ne,L.x,L.y,Q,Ie,ke,We,X.image.data):X.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ne,L.x,L.y,X.mipmaps[0].width,X.mipmaps[0].height,ke,X.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,ne,L.x,L.y,ke,We,X.image),ne===0&&ee.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),re.unbindTexture()},this.copyTextureToTexture3D=function(L,X,ee,ne,Q=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ie=L.max.x-L.min.x+1,ke=L.max.y-L.min.y+1,We=L.max.z-L.min.z+1,Ye=Be.convert(ne.format),tt=Be.convert(ne.type);let Ze;if(ne.isData3DTexture)Te.setTexture3D(ne,0),Ze=D.TEXTURE_3D;else if(ne.isDataArrayTexture)Te.setTexture2DArray(ne,0),Ze=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,ne.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ne.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,ne.unpackAlignment);const Je=D.getParameter(D.UNPACK_ROW_LENGTH),xt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),en=D.getParameter(D.UNPACK_SKIP_PIXELS),Lt=D.getParameter(D.UNPACK_SKIP_ROWS),Dn=D.getParameter(D.UNPACK_SKIP_IMAGES),dt=ee.isCompressedTexture?ee.mipmaps[0]:ee.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,dt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,dt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,L.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,L.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,L.min.z),ee.isDataTexture||ee.isData3DTexture?D.texSubImage3D(Ze,Q,X.x,X.y,X.z,Ie,ke,We,Ye,tt,dt.data):ee.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Ze,Q,X.x,X.y,X.z,Ie,ke,We,Ye,dt.data)):D.texSubImage3D(Ze,Q,X.x,X.y,X.z,Ie,ke,We,Ye,tt,dt),D.pixelStorei(D.UNPACK_ROW_LENGTH,Je),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,en),D.pixelStorei(D.UNPACK_SKIP_ROWS,Lt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Dn),Q===0&&ne.generateMipmaps&&D.generateMipmap(Ze),re.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?Te.setTextureCube(L,0):L.isData3DTexture?Te.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?Te.setTexture2DArray(L,0):Te.setTexture2D(L,0),re.unbindTexture()},this.resetState=function(){S=0,b=0,E=null,re.reset(),F.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ga?"display-p3":"srgb",t.unpackColorSpace=lt.workingColorSpace===Bs?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Tt?si:Zc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===si?Tt:Pn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class ip extends su{}ip.prototype.isWebGL1Renderer=!0;class Ma{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Re(e),this.density=t}clone(){return new Ma(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ba{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Re(e),this.near=t,this.far=i}clone(){return new ba(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ou extends at{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class wa{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ts,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=on()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn('THREE.InterleavedBuffer: "updateRange" is deprecated and removed in r169. Use "addUpdateRange()" instead.'),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,r=this.stride;n<r;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xt=new P;class sn{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Kt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Kt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Kt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Kt(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array),r=Qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return new ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new sn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class au extends Wt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let vr;const Jr=new P,yr=new P,xr=new P,Sr=new se,Kr=new se,rp=new Ve,_o=new P,Qr=new P,vo=new P,xh=new se,_l=new se,Sh=new se;class sp extends at{constructor(e=new au){if(super(),this.isSprite=!0,this.type="Sprite",vr===void 0){vr=new et;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new wa(t,5);vr.setIndex([0,1,2,0,2,3]),vr.setAttribute("position",new sn(i,3,0,!1)),vr.setAttribute("uv",new sn(i,2,3,!1))}this.geometry=vr,this.material=e,this.center=new se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),yr.setFromMatrixScale(this.matrixWorld),rp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),xr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&yr.multiplyScalar(-xr.z);const i=this.material.rotation;let n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));const o=this.center;yo(_o.set(-.5,-.5,0),xr,o,yr,n,r),yo(Qr.set(.5,-.5,0),xr,o,yr,n,r),yo(vo.set(.5,.5,0),xr,o,yr,n,r),xh.set(0,0),_l.set(1,0),Sh.set(1,1);let a=e.ray.intersectTriangle(_o,Qr,vo,!1,Jr);if(a===null&&(yo(Qr.set(-.5,.5,0),xr,o,yr,n,r),_l.set(0,1),a=e.ray.intersectTriangle(_o,vo,Qr,!1,Jr),a===null))return;const l=e.ray.origin.distanceTo(Jr);l<e.near||l>e.far||t.push({distance:l,point:Jr.clone(),uv:Jt.getInterpolation(Jr,_o,Qr,vo,xh,_l,Sh,new se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function yo(s,e,t,i,n,r){Sr.subVectors(s,t).addScalar(.5).multiply(i),n!==void 0?(Kr.x=r*Sr.x-n*Sr.y,Kr.y=n*Sr.x+r*Sr.y):Kr.copy(Sr),s.copy(e),s.x+=Kr.x,s.y+=Kr.y,s.applyMatrix4(rp)}const xo=new P,Mh=new P;class op extends at{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let i=0,n=t.length;i<n;i++){const r=t[i];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,i=0){t=Math.abs(t);const n=this.levels;let r;for(r=0;r<n.length&&!(t<n[r].distance);r++);return n.splice(r,0,{distance:t,hysteresis:i,object:e}),this.add(e),this}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let i,n;for(i=1,n=t.length;i<n;i++){let r=t[i].distance;if(t[i].object.visible&&(r-=r*t[i].hysteresis),e<r)break}return t[i-1].object}return null}raycast(e,t){if(this.levels.length>0){xo.setFromMatrixPosition(this.matrixWorld);const n=e.ray.origin.distanceTo(xo);this.getObjectForDistance(n).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){xo.setFromMatrixPosition(e.matrixWorld),Mh.setFromMatrixPosition(this.matrixWorld);const i=xo.distanceTo(Mh)/e.zoom;t[0].object.visible=!0;let n,r;for(n=1,r=t.length;n<r;n++){let o=t[n].distance;if(t[n].object.visible&&(o-=o*t[n].hysteresis),i>=o)t[n-1].object.visible=!1,t[n].object.visible=!0;else break}for(this._currentLevel=n-1;n<r;n++)t[n].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const i=this.levels;for(let n=0,r=i.length;n<r;n++){const o=i[n];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}}const bh=new P,wh=new it,Eh=new it,Bx=new P,Th=new Ve,So=new P,vl=new At,Ah=new Ve,yl=new $i;class ap extends mt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=$l,this.bindMatrix=new Ve,this.bindMatrixInverse=new Ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Et),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,So),this.boundingBox.expandByPoint(So)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new At),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,So),this.boundingSphere.expandByPoint(So)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,n=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vl.copy(this.boundingSphere),vl.applyMatrix4(n),e.ray.intersectsSphere(vl)!==!1&&(Ah.copy(n).invert(),yl.copy(e.ray).applyMatrix4(Ah),!(this.boundingBox!==null&&yl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,yl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new it,t=this.geometry.attributes.skinWeight;for(let i=0,n=t.count;i<n;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===$l?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Sd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,n=this.geometry;wh.fromBufferAttribute(n.attributes.skinIndex,e),Eh.fromBufferAttribute(n.attributes.skinWeight,e),bh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Eh.getComponent(r);if(o!==0){const a=wh.getComponent(r);Th.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),t.addScaledVector(Bx.copy(bh).applyMatrix4(Th),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class lu extends at{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ki extends yt{constructor(e=null,t=1,i=1,n,r,o,a,l,c=Mt,u=Mt,h,f){super(null,o,a,l,c,u,n,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ch=new Ve,zx=new Ve;class Ea{constructor(e=[],t=[]){this.uuid=on(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new Ve)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Ve;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:zx;Ch.multiplyMatrices(a,t[r]),Ch.toArray(i,r*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new Ea(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new ki(t,e,e,jt,cn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,n=e.bones.length;i<n;i++){const r=e.bones[i];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new lu),this.bones.push(o),this.boneInverses.push(new Ve().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let n=0,r=t.length;n<r;n++){const o=t[n];e.bones.push(o.uuid);const a=i[n];e.boneInverses.push(a.toArray())}return e}}class Yi extends ct{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Mr=new Ve,Rh=new Ve,Mo=[],Ph=new Et,kx=new Ve,es=new mt,ts=new At;class lp extends mt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Yi(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,kx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Et),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Mr),Ph.copy(e.boundingBox).applyMatrix4(Mr),this.boundingBox.union(Ph)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new At),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Mr),ts.copy(e.boundingSphere).applyMatrix4(Mr),this.boundingSphere.union(ts)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,n=this.count;if(es.geometry=this.geometry,es.material=this.material,es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ts.copy(this.boundingSphere),ts.applyMatrix4(i),e.ray.intersectsSphere(ts)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,Mr),Rh.multiplyMatrices(i,Mr),es.matrixWorld=Rh,es.raycast(e,Mo);for(let o=0,a=Mo.length;o<a;o++){const l=Mo[o];l.instanceId=r,l.object=this,t.push(l)}Mo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Yi(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}function Gx(s,e){return s.z-e.z}function Hx(s,e){return e.z-s.z}class Vx{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t){const i=this.pool,n=this.list;this.index>=i.length&&i.push({start:-1,count:-1,z:-1});const r=i[this.index];n.push(r),this.index++,r.start=e.start,r.count=e.count,r.z=t}reset(){this.list.length=0,this.index=0}}const br="batchId",ei=new Ve,Lh=new Ve,Wx=new Ve,Uh=new Ve,xl=new Hs,bo=new Et,Si=new At,ns=new P,Sl=new Vx,kt=new mt,wo=[];function Xx(s,e,t=0){const i=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){const n=s.count;for(let r=0;r<n;r++)for(let o=0;o<i;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*i);e.needsUpdate=!0}class cp extends mt{get maxGeometryCount(){return this._maxGeometryCount}constructor(e,t,i=t*2,n){super(new et,n),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._drawRanges=[],this._reservedRanges=[],this._visibility=[],this._active=[],this._bounds=[],this._maxGeometryCount=e,this._maxVertexCount=t,this._maxIndexCount=i,this._geometryInitialized=!1,this._geometryCount=0,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._visibilityChanged=!0,this._matricesTexture=null,this._initMatricesTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxGeometryCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),i=new ki(t,e,e,jt,cn);this._matricesTexture=i}_initializeGeometry(e){const t=this.geometry,i=this._maxVertexCount,n=this._maxGeometryCount,r=this._maxIndexCount;if(this._geometryInitialized===!1){for(const a in e.attributes){const l=e.getAttribute(a),{array:c,itemSize:u,normalized:h}=l,f=new c.constructor(i*u),d=new l.constructor(f,u,h);d.setUsage(l.usage),t.setAttribute(a,d)}if(e.getIndex()!==null){const a=i>65536?new Uint32Array(r):new Uint16Array(r);t.setIndex(new ct(a,1))}const o=n>65536?new Uint32Array(i):new Uint16Array(i);t.setAttribute(br,new ct(o,1)),this._geometryInitialized=!0}}_validateGeometry(e){if(e.getAttribute(br))throw new Error(`BatchedMesh: Geometry cannot use attribute "${br}"`);const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const i in t.attributes){if(i===br)continue;if(!e.hasAttribute(i))throw new Error(`BatchedMesh: Added geometry missing "${i}". All geometries must have consistent attributes.`);const n=e.getAttribute(i),r=t.getAttribute(i);if(n.itemSize!==r.itemSize||n.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Et);const e=this._geometryCount,t=this.boundingBox,i=this._active;t.makeEmpty();for(let n=0;n<e;n++)i[n]!==!1&&(this.getMatrixAt(n,ei),this.getBoundingBoxAt(n,bo).applyMatrix4(ei),t.union(bo))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new At);const e=this._geometryCount,t=this.boundingSphere,i=this._active;t.makeEmpty();for(let n=0;n<e;n++)i[n]!==!1&&(this.getMatrixAt(n,ei),this.getBoundingSphereAt(n,Si).applyMatrix4(ei),t.union(Si))}addGeometry(e,t=-1,i=-1){if(this._initializeGeometry(e),this._validateGeometry(e),this._geometryCount>=this._maxGeometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");const n={vertexStart:-1,vertexCount:-1,indexStart:-1,indexCount:-1};let r=null;const o=this._reservedRanges,a=this._drawRanges,l=this._bounds;this._geometryCount!==0&&(r=o[o.length-1]),t===-1?n.vertexCount=e.getAttribute("position").count:n.vertexCount=t,r===null?n.vertexStart=0:n.vertexStart=r.vertexStart+r.vertexCount;const c=e.getIndex(),u=c!==null;if(u&&(i===-1?n.indexCount=c.count:n.indexCount=i,r===null?n.indexStart=0:n.indexStart=r.indexStart+r.indexCount),n.indexStart!==-1&&n.indexStart+n.indexCount>this._maxIndexCount||n.vertexStart+n.vertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");const h=this._visibility,f=this._active,d=this._matricesTexture,p=this._matricesTexture.image.data;h.push(!0),f.push(!0);const _=this._geometryCount;this._geometryCount++,Wx.toArray(p,_*16),d.needsUpdate=!0,o.push(n),a.push({start:u?n.indexStart:n.vertexStart,count:-1}),l.push({boxInitialized:!1,box:new Et,sphereInitialized:!1,sphere:new At});const g=this.geometry.getAttribute(br);for(let m=0;m<n.vertexCount;m++)g.setX(n.vertexStart+m,_);return g.needsUpdate=!0,this.setGeometryAt(_,e),_}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const i=this.geometry,n=i.getIndex()!==null,r=i.getIndex(),o=t.getIndex(),a=this._reservedRanges[e];if(n&&o.count>a.indexCount||t.attributes.position.count>a.vertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.vertexCount;for(const d in i.attributes){if(d===br)continue;const p=t.getAttribute(d),_=i.getAttribute(d);Xx(p,_,l);const g=p.itemSize;for(let m=p.count,y=c;m<y;m++){const v=l+m;for(let x=0;x<g;x++)_.setComponent(v,x,0)}_.needsUpdate=!0}if(n){const d=a.indexStart;for(let p=0;p<o.count;p++)r.setX(d+p,l+o.getX(p));for(let p=o.count,_=a.indexCount;p<_;p++)r.setX(d+p,l);r.needsUpdate=!0}const u=this._bounds[e];t.boundingBox!==null?(u.box.copy(t.boundingBox),u.boxInitialized=!0):u.boxInitialized=!1,t.boundingSphere!==null?(u.sphere.copy(t.boundingSphere),u.sphereInitialized=!0):u.sphereInitialized=!1;const h=this._drawRanges[e],f=t.getAttribute("position");return h.count=n?o.count:f.count,this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._active;return e>=t.length||t[e]===!1?this:(t[e]=!1,this._visibilityChanged=!0,this)}getBoundingBoxAt(e,t){if(this._active[e]===!1)return this;const n=this._bounds[e],r=n.box,o=this.geometry;if(n.boxInitialized===!1){r.makeEmpty();const a=o.index,l=o.attributes.position,c=this._drawRanges[e];for(let u=c.start,h=c.start+c.count;u<h;u++){let f=u;a&&(f=a.getX(f)),r.expandByPoint(ns.fromBufferAttribute(l,f))}n.boxInitialized=!0}return t.copy(r),t}getBoundingSphereAt(e,t){if(this._active[e]===!1)return this;const n=this._bounds[e],r=n.sphere,o=this.geometry;if(n.sphereInitialized===!1){r.makeEmpty(),this.getBoundingBoxAt(e,bo),bo.getCenter(r.center);const a=o.index,l=o.attributes.position,c=this._drawRanges[e];let u=0;for(let h=c.start,f=c.start+c.count;h<f;h++){let d=h;a&&(d=a.getX(d)),ns.fromBufferAttribute(l,d),u=Math.max(u,r.center.distanceToSquared(ns))}r.radius=Math.sqrt(u),n.sphereInitialized=!0}return t.copy(r),t}setMatrixAt(e,t){const i=this._active,n=this._matricesTexture,r=this._matricesTexture.image.data,o=this._geometryCount;return e>=o||i[e]===!1?this:(t.toArray(r,e*16),n.needsUpdate=!0,this)}getMatrixAt(e,t){const i=this._active,n=this._matricesTexture.image.data,r=this._geometryCount;return e>=r||i[e]===!1?null:t.fromArray(n,e*16)}setVisibleAt(e,t){const i=this._visibility,n=this._active,r=this._geometryCount;return e>=r||n[e]===!1||i[e]===t?this:(i[e]=t,this._visibilityChanged=!0,this)}getVisibleAt(e){const t=this._visibility,i=this._active,n=this._geometryCount;return e>=n||i[e]===!1?!1:t[e]}raycast(e,t){const i=this._visibility,n=this._active,r=this._drawRanges,o=this._geometryCount,a=this.matrixWorld,l=this.geometry;kt.material=this.material,kt.geometry.index=l.index,kt.geometry.attributes=l.attributes,kt.geometry.boundingBox===null&&(kt.geometry.boundingBox=new Et),kt.geometry.boundingSphere===null&&(kt.geometry.boundingSphere=new At);for(let c=0;c<o;c++){if(!i[c]||!n[c])continue;const u=r[c];kt.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(c,kt.matrixWorld).premultiply(a),this.getBoundingBoxAt(c,kt.geometry.boundingBox),this.getBoundingSphereAt(c,kt.geometry.boundingSphere),kt.raycast(e,wo);for(let h=0,f=wo.length;h<f;h++){const d=wo[h];d.object=this,d.batchId=c,t.push(d)}wo.length=0}kt.material=null,kt.geometry.index=null,kt.geometry.attributes={},kt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._drawRanges=e._drawRanges.map(t=>({...t})),this._reservedRanges=e._reservedRanges.map(t=>({...t})),this._visibility=e._visibility.slice(),this._active=e._active.slice(),this._bounds=e._bounds.map(t=>({boxInitialized:t.boxInitialized,box:t.box.clone(),sphereInitialized:t.sphereInitialized,sphere:t.sphere.clone()})),this._maxGeometryCount=e._maxGeometryCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.slice(),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this}onBeforeRender(e,t,i,n,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=n.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=this._visibility,c=this._multiDrawStarts,u=this._multiDrawCounts,h=this._drawRanges,f=this.perObjectFrustumCulled;f&&(Uh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse).multiply(this.matrixWorld),xl.setFromProjectionMatrix(Uh,e.isWebGPURenderer?Fr:xn));let d=0;if(this.sortObjects){Lh.copy(this.matrixWorld).invert(),ns.setFromMatrixPosition(i.matrixWorld).applyMatrix4(Lh);for(let g=0,m=l.length;g<m;g++)if(l[g]){this.getMatrixAt(g,ei),this.getBoundingSphereAt(g,Si).applyMatrix4(ei);let y=!1;if(f&&(y=!xl.intersectsSphere(Si)),!y){const v=ns.distanceTo(Si.center);Sl.push(h[g],v)}}const p=Sl.list,_=this.customSort;_===null?p.sort(r.transparent?Hx:Gx):_.call(this,p,i);for(let g=0,m=p.length;g<m;g++){const y=p[g];c[d]=y.start*a,u[d]=y.count,d++}Sl.reset()}else for(let p=0,_=l.length;p<_;p++)if(l[p]){let g=!1;if(f&&(this.getMatrixAt(p,ei),this.getBoundingSphereAt(p,Si).applyMatrix4(ei),g=!xl.intersectsSphere(Si)),!g){const m=h[p];c[d]=m.start*a,u[d]=m.count,d++}}this._multiDrawCount=d,this._visibilityChanged=!1}onBeforeShadow(e,t,i,n,r,o){this.onBeforeRender(e,null,n,r,o)}}class Zt extends Wt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ih=new P,Dh=new P,Oh=new Ve,Ml=new $i,Eo=new At;let ci=class extends at{constructor(e=new et,t=new Zt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)Ih.fromBufferAttribute(t,n-1),Dh.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=Ih.distanceTo(Dh);e.setAttribute("lineDistance",new Oe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Eo.copy(i.boundingSphere),Eo.applyMatrix4(n),Eo.radius+=r,e.ray.intersectsSphere(Eo)===!1)return;Oh.copy(n).invert(),Ml.copy(e.ray).applyMatrix4(Oh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new P,u=new P,h=new P,f=new P,d=this.isLineSegments?2:1,p=i.index,g=i.attributes.position;if(p!==null){const m=Math.max(0,o.start),y=Math.min(p.count,o.start+o.count);for(let v=m,x=y-1;v<x;v+=d){const S=p.getX(v),b=p.getX(v+1);if(c.fromBufferAttribute(g,S),u.fromBufferAttribute(g,b),Ml.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(f);A<e.near||A>e.far||t.push({distance:A,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,o.start),y=Math.min(g.count,o.start+o.count);for(let v=m,x=y-1;v<x;v+=d){if(c.fromBufferAttribute(g,v),u.fromBufferAttribute(g,v+1),Ml.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const b=e.ray.origin.distanceTo(f);b<e.near||b>e.far||t.push({distance:b,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};const Fh=new P,Nh=new P;class Ln extends ci{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,r=t.count;n<r;n+=2)Fh.fromBufferAttribute(t,n),Nh.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Fh.distanceTo(Nh);e.setAttribute("lineDistance",new Oe(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class up extends ci{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class cu extends Wt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bh=new Ve,Ac=new $i,To=new At,Ao=new P;class hp extends at{constructor(e=new et,t=new cu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),To.copy(i.boundingSphere),To.applyMatrix4(n),To.radius+=r,e.ray.intersectsSphere(To)===!1)return;Bh.copy(n).invert(),Ac.copy(e.ray).applyMatrix4(Bh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let p=f,_=d;p<_;p++){const g=c.getX(p);Ao.fromBufferAttribute(h,g),zh(Ao,g,l,n,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,_=d;p<_;p++)Ao.fromBufferAttribute(h,p),zh(Ao,p,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function zh(s,e,t,i,n,r,o){const a=Ac.distanceSqToPoint(s);if(a<t){const l=new P;Ac.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class qx extends yt{constructor(e,t,i,n,r,o,a,l,c){super(e,t,i,n,r,o,a,l,c),this.isVideoTexture=!0,this.minFilter=o!==void 0?o:ft,this.magFilter=r!==void 0?r:ft,this.generateMipmaps=!1;const u=this;function h(){u.needsUpdate=!0,e.requestVideoFrameCallback(h)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(h)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class Yx extends yt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Mt,this.minFilter=Mt,this.generateMipmaps=!1,this.needsUpdate=!0}}class Ta extends yt{constructor(e,t,i,n,r,o,a,l,c,u,h,f){super(null,o,a,l,c,u,n,r,h,f),this.isCompressedTexture=!0,this.image={width:t,height:i},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class jx extends Ta{constructor(e,t,i,n,r,o){super(e,t,i,r,o),this.isCompressedArrayTexture=!0,this.image.depth=n,this.wrapR=Gt}}class Zx extends Ta{constructor(e,t,i){super(void 0,e[0].width,e[0].height,t,i,Xn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class $x extends yt{constructor(e,t,i,n,r,o,a,l,c){super(e,t,i,n,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Sn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,n=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(n),t.push(r),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let n=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(n=Math.floor(a+(l-a)/2),c=i[n]-o,c<0)a=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===o)return n/(r-1);const u=i[n],f=i[n+1]-u,d=(o-u)/f;return(n+d)/(r-1)}getTangent(e,t){let n=e-1e-4,r=e+1e-4;n<0&&(n=0),r>1&&(r=1);const o=this.getPoint(n),a=this.getPoint(r),l=t||(o.isVector2?new se:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new P,n=[],r=[],o=[],a=new P,l=new Ve;for(let d=0;d<=e;d++){const p=d/e;n[d]=this.getTangentAt(p,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE;const u=Math.abs(n[0].x),h=Math.abs(n[0].y),f=Math.abs(n[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],a),o[0].crossVectors(n[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(n[d-1],n[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(vt(n[d-1].dot(n[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,p))}o[d].crossVectors(n[d],r[d])}if(t===!0){let d=Math.acos(vt(r[0].dot(r[e]),-1,1));d/=e,n[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(n[p],d*p)),o[p].crossVectors(n[p],r[p])}return{tangents:n,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Aa extends Sn{constructor(e=0,t=0,i=1,n=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const i=t||new se,n=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(o?r=0:r=n),this.aClockwise===!0&&!o&&(r===n?r=-n:r=r-n);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class fp extends Aa{constructor(e,t,i,n,r,o){super(e,t,i,i,n,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function uu(){let s=0,e=0,t=0,i=0;function n(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){n(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,n(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+i*a}}}const Co=new P,bl=new uu,wl=new uu,El=new uu;class dp extends Sn{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new P){const i=t,n=this.points,r=n.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=n[(a-1)%r]:(Co.subVectors(n[0],n[1]).add(n[0]),c=Co);const h=n[a%r],f=n[(a+1)%r];if(this.closed||a+2<r?u=n[(a+2)%r]:(Co.subVectors(n[r-1],n[r-2]).add(n[r-1]),u=Co),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),bl.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,p,_,g),wl.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,p,_,g),El.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,p,_,g)}else this.curveType==="catmullrom"&&(bl.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),wl.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),El.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(bl.calc(l),wl.calc(l),El.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new P().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function kh(s,e,t,i,n){const r=(i-e)*.5,o=(n-t)*.5,a=s*s,l=s*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*s+t}function Jx(s,e){const t=1-s;return t*t*e}function Kx(s,e){return 2*(1-s)*s*e}function Qx(s,e){return s*s*e}function ds(s,e,t,i){return Jx(s,e)+Kx(s,t)+Qx(s,i)}function eS(s,e){const t=1-s;return t*t*t*e}function tS(s,e){const t=1-s;return 3*t*t*s*e}function nS(s,e){return 3*(1-s)*s*s*e}function iS(s,e){return s*s*s*e}function ps(s,e,t,i,n){return eS(s,e)+tS(s,t)+nS(s,i)+iS(s,n)}class hu extends Sn{constructor(e=new se,t=new se,i=new se,n=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new se){const i=t,n=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(ps(e,n.x,r.x,o.x,a.x),ps(e,n.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class pp extends Sn{constructor(e=new P,t=new P,i=new P,n=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new P){const i=t,n=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(ps(e,n.x,r.x,o.x,a.x),ps(e,n.y,r.y,o.y,a.y),ps(e,n.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fu extends Sn{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mp extends Sn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class du extends Sn{constructor(e=new se,t=new se,i=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new se){const i=t,n=this.v0,r=this.v1,o=this.v2;return i.set(ds(e,n.x,r.x,o.x),ds(e,n.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pu extends Sn{constructor(e=new P,t=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new P){const i=t,n=this.v0,r=this.v1,o=this.v2;return i.set(ds(e,n.x,r.x,o.x),ds(e,n.y,r.y,o.y),ds(e,n.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mu extends Sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){const i=t,n=this.points,r=(n.length-1)*e,o=Math.floor(r),a=r-o,l=n[o===0?o:o-1],c=n[o],u=n[o>n.length-2?n.length-1:o+1],h=n[o>n.length-3?n.length-1:o+2];return i.set(kh(a,l.x,c.x,u.x,h.x),kh(a,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new se().fromArray(n))}return this}}var ca=Object.freeze({__proto__:null,ArcCurve:fp,CatmullRomCurve3:dp,CubicBezierCurve:hu,CubicBezierCurve3:pp,EllipseCurve:Aa,LineCurve:fu,LineCurve3:mp,QuadraticBezierCurve:du,QuadraticBezierCurve3:pu,SplineCurve:mu});class gp extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ca[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),n=this.getCurveLengths();let r=0;for(;r<n.length;){if(n[r]>=i){const o=n[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let n=0,r=this.curves;n<r.length;n++){const o=r[n],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(new ca[n.type]().fromJSON(n))}return this}}class Cs extends gp{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new fu(this.currentPoint.clone(),new se(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){const r=new du(this.currentPoint.clone(),new se(e,t),new se(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,r,o){const a=new hu(this.currentPoint.clone(),new se(e,t),new se(i,n),new se(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new mu(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,n,r,o),this}absarc(e,t,i,n,r,o){return this.absellipse(e,t,i,i,n,r,o),this}ellipse(e,t,i,n,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,n,r,o,a,l),this}absellipse(e,t,i,n,r,o,a,l){const c=new Aa(e,t,i,n,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Vs extends et{constructor(e=[new se(0,-.5),new se(.5,0),new se(0,.5)],t=12,i=0,n=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:n},t=Math.floor(t),n=vt(n,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/t,h=new P,f=new se,d=new P,p=new P,_=new P;let g=0,m=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,d.x=m*1,d.y=-g,d.z=m*0,_.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),l.push(d.x,d.y,d.z),_.copy(p)}for(let y=0;y<=t;y++){const v=i+y*u*n,x=Math.sin(v),S=Math.cos(v);for(let b=0;b<=e.length-1;b++){h.x=e[b].x*x,h.y=e[b].y,h.z=e[b].x*S,o.push(h.x,h.y,h.z),f.x=y/t,f.y=b/(e.length-1),a.push(f.x,f.y);const E=l[3*b+0]*x,A=l[3*b+1],M=l[3*b+0]*S;c.push(E,A,M)}}for(let y=0;y<t;y++)for(let v=0;v<e.length-1;v++){const x=v+y*e.length,S=x,b=x+e.length,E=x+e.length+1,A=x+1;r.push(S,b,A),r.push(E,A,b)}this.setIndex(r),this.setAttribute("position",new Oe(o,3)),this.setAttribute("uv",new Oe(a,2)),this.setAttribute("normal",new Oe(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vs(e.points,e.segments,e.phiStart,e.phiLength)}}class Ca extends Vs{constructor(e=1,t=1,i=4,n=8){const r=new Cs;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(i),n),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:n}}static fromJSON(e){return new Ca(e.radius,e.length,e.capSegments,e.radialSegments)}}class Ra extends et{constructor(e=1,t=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new P,u=new se;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=i+h/t*n;c.x=e*Math.cos(d),c.y=e*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Oe(o,3)),this.setAttribute("normal",new Oe(a,3)),this.setAttribute("uv",new Oe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ra(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Wr extends et{constructor(e=1,t=1,i=1,n=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;n=Math.floor(n),r=Math.floor(r);const u=[],h=[],f=[],d=[];let p=0;const _=[],g=i/2;let m=0;y(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Oe(h,3)),this.setAttribute("normal",new Oe(f,3)),this.setAttribute("uv",new Oe(d,2));function y(){const x=new P,S=new P;let b=0;const E=(t-e)/i;for(let A=0;A<=r;A++){const M=[],w=A/r,I=w*(t-e)+e;for(let R=0;R<=n;R++){const z=R/n,C=z*l+a,N=Math.sin(C),k=Math.cos(C);S.x=I*N,S.y=-w*i+g,S.z=I*k,h.push(S.x,S.y,S.z),x.set(N,E,k).normalize(),f.push(x.x,x.y,x.z),d.push(z,1-w),M.push(p++)}_.push(M)}for(let A=0;A<n;A++)for(let M=0;M<r;M++){const w=_[M][A],I=_[M+1][A],R=_[M+1][A+1],z=_[M][A+1];u.push(w,I,z),u.push(I,R,z),b+=6}c.addGroup(m,b,0),m+=b}function v(x){const S=p,b=new se,E=new P;let A=0;const M=x===!0?e:t,w=x===!0?1:-1;for(let R=1;R<=n;R++)h.push(0,g*w,0),f.push(0,w,0),d.push(.5,.5),p++;const I=p;for(let R=0;R<=n;R++){const C=R/n*l+a,N=Math.cos(C),k=Math.sin(C);E.x=M*k,E.y=g*w,E.z=M*N,h.push(E.x,E.y,E.z),f.push(0,w,0),b.x=N*.5+.5,b.y=k*.5*w+.5,d.push(b.x,b.y),p++}for(let R=0;R<n;R++){const z=S+R,C=I+R;x===!0?u.push(C,C+1,z):u.push(C+1,C,z),A+=3}c.addGroup(m,A,x===!0?1:2),m+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pa extends Wr{constructor(e=1,t=1,i=32,n=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,n,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Pa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fi extends et{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const r=[],o=[];a(n),c(i),u(),this.setAttribute("position",new Oe(r,3)),this.setAttribute("normal",new Oe(r.slice(),3)),this.setAttribute("uv",new Oe(o,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const v=new P,x=new P,S=new P;for(let b=0;b<t.length;b+=3)d(t[b+0],v),d(t[b+1],x),d(t[b+2],S),l(v,x,S,y)}function l(y,v,x,S){const b=S+1,E=[];for(let A=0;A<=b;A++){E[A]=[];const M=y.clone().lerp(x,A/b),w=v.clone().lerp(x,A/b),I=b-A;for(let R=0;R<=I;R++)R===0&&A===b?E[A][R]=M:E[A][R]=M.clone().lerp(w,R/I)}for(let A=0;A<b;A++)for(let M=0;M<2*(b-A)-1;M++){const w=Math.floor(M/2);M%2===0?(f(E[A][w+1]),f(E[A+1][w]),f(E[A][w])):(f(E[A][w+1]),f(E[A+1][w+1]),f(E[A+1][w]))}}function c(y){const v=new P;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(y),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function u(){const y=new P;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];const x=g(y)/2/Math.PI+.5,S=m(y)/Math.PI+.5;o.push(x,1-S)}p(),h()}function h(){for(let y=0;y<o.length;y+=6){const v=o[y+0],x=o[y+2],S=o[y+4],b=Math.max(v,x,S),E=Math.min(v,x,S);b>.9&&E<.1&&(v<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),S<.2&&(o[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,v){const x=y*3;v.x=e[x+0],v.y=e[x+1],v.z=e[x+2]}function p(){const y=new P,v=new P,x=new P,S=new P,b=new se,E=new se,A=new se;for(let M=0,w=0;M<r.length;M+=9,w+=6){y.set(r[M+0],r[M+1],r[M+2]),v.set(r[M+3],r[M+4],r[M+5]),x.set(r[M+6],r[M+7],r[M+8]),b.set(o[w+0],o[w+1]),E.set(o[w+2],o[w+3]),A.set(o[w+4],o[w+5]),S.copy(y).add(v).add(x).divideScalar(3);const I=g(S);_(b,w+0,y,I),_(E,w+2,v,I),_(A,w+4,x,I)}}function _(y,v,x,S){S<0&&y.x===1&&(o[v]=y.x-1),x.x===0&&x.z===0&&(o[v]=S/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fi(e.vertices,e.indices,e.radius,e.details)}}class La extends fi{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new La(e.radius,e.detail)}}const Ro=new P,Po=new P,Tl=new P,Lo=new Jt;class _p extends et{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const n=Math.pow(10,4),r=Math.cos(Bi*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:_,b:g,c:m}=Lo;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Lo.getNormal(Tl),h[0]=`${Math.round(_.x*n)},${Math.round(_.y*n)},${Math.round(_.z*n)}`,h[1]=`${Math.round(g.x*n)},${Math.round(g.y*n)},${Math.round(g.z*n)}`,h[2]=`${Math.round(m.x*n)},${Math.round(m.y*n)},${Math.round(m.z*n)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let y=0;y<3;y++){const v=(y+1)%3,x=h[y],S=h[v],b=Lo[u[y]],E=Lo[u[v]],A=`${x}_${S}`,M=`${S}_${x}`;M in f&&f[M]?(Tl.dot(f[M].normal)<=r&&(d.push(b.x,b.y,b.z),d.push(E.x,E.y,E.z)),f[M]=null):A in f||(f[A]={index0:c[y],index1:c[v],normal:Tl.clone()})}}for(const p in f)if(f[p]){const{index0:_,index1:g}=f[p];Ro.fromBufferAttribute(a,_),Po.fromBufferAttribute(a,g),d.push(Ro.x,Ro.y,Ro.z),d.push(Po.x,Po.y,Po.z)}this.setAttribute("position",new Oe(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Gi extends Cs{constructor(e){super(e),this.uuid=on(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(new Cs().fromJSON(n))}return this}}const rS={triangulate:function(s,e,t=2){const i=e&&e.length,n=i?e[0]*t:s.length;let r=vp(s,0,n,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,u,h,f,d;if(i&&(r=cS(s,e,r,t)),s.length>80*t){a=c=s[0],l=u=s[1];for(let p=t;p<n;p+=t)h=s[p],f=s[p+1],h<a&&(a=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-a,u-l),d=d!==0?32767/d:0}return Rs(r,o,t,a,l,d,0),o}};function vp(s,e,t,i,n){let r,o;if(n===xS(s,e,t,i)>0)for(r=e;r<t;r+=i)o=Gh(r,s[r],s[r+1],o);else for(r=t-i;r>=e;r-=i)o=Gh(r,s[r],s[r+1],o);return o&&Ua(o,o.next)&&(Ls(o),o=o.next),o}function ji(s,e){if(!s)return s;e||(e=s);let t=s,i;do if(i=!1,!t.steiner&&(Ua(t,t.next)||pt(t.prev,t,t.next)===0)){if(Ls(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Rs(s,e,t,i,n,r,o){if(!s)return;!o&&r&&pS(s,i,n,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?oS(s,i,n,r):sS(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),Ls(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=aS(ji(s),e,t),Rs(s,e,t,i,n,r,2)):o===2&&lS(s,e,t,i,n,r):Rs(ji(s),e,t,i,n,r,1);break}}}function sS(s){const e=s.prev,t=s,i=s.next;if(pt(e,t,i)>=0)return!1;const n=e.x,r=t.x,o=i.x,a=e.y,l=t.y,c=i.y,u=n<r?n<o?n:o:r<o?r:o,h=a<l?a<c?a:c:l<c?l:c,f=n>r?n>o?n:o:r>o?r:o,d=a>l?a>c?a:c:l>c?l:c;let p=i.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=h&&p.y<=d&&Dr(n,a,r,l,o,c,p.x,p.y)&&pt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function oS(s,e,t,i){const n=s.prev,r=s,o=s.next;if(pt(n,r,o)>=0)return!1;const a=n.x,l=r.x,c=o.x,u=n.y,h=r.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,p=u<h?u<f?u:f:h<f?h:f,_=a>l?a>c?a:c:l>c?l:c,g=u>h?u>f?u:f:h>f?h:f,m=Cc(d,p,e,t,i),y=Cc(_,g,e,t,i);let v=s.prevZ,x=s.nextZ;for(;v&&v.z>=m&&x&&x.z<=y;){if(v.x>=d&&v.x<=_&&v.y>=p&&v.y<=g&&v!==n&&v!==o&&Dr(a,u,l,h,c,f,v.x,v.y)&&pt(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==n&&x!==o&&Dr(a,u,l,h,c,f,x.x,x.y)&&pt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=m;){if(v.x>=d&&v.x<=_&&v.y>=p&&v.y<=g&&v!==n&&v!==o&&Dr(a,u,l,h,c,f,v.x,v.y)&&pt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=y;){if(x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==n&&x!==o&&Dr(a,u,l,h,c,f,x.x,x.y)&&pt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function aS(s,e,t){let i=s;do{const n=i.prev,r=i.next.next;!Ua(n,r)&&yp(n,i,i.next,r)&&Ps(n,r)&&Ps(r,n)&&(e.push(n.i/t|0),e.push(i.i/t|0),e.push(r.i/t|0),Ls(i),Ls(i.next),i=s=r),i=i.next}while(i!==s);return ji(i)}function lS(s,e,t,i,n,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&_S(o,a)){let l=xp(o,a);o=ji(o,o.next),l=ji(l,l.next),Rs(o,e,t,i,n,r,0),Rs(l,e,t,i,n,r,0);return}a=a.next}o=o.next}while(o!==s)}function cS(s,e,t,i){const n=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*i,l=r<o-1?e[r+1]*i:s.length,c=vp(s,a,l,i,!1),c===c.next&&(c.steiner=!0),n.push(gS(c));for(n.sort(uS),r=0;r<n.length;r++)t=hS(n[r],t);return t}function uS(s,e){return s.x-e.x}function hS(s,e){const t=fS(s,e);if(!t)return e;const i=xp(t,s);return ji(i,i.next),ji(t,t.next)}function fS(s,e){let t=e,i=-1/0,n;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=r&&f>i&&(i=f,n=t.x<t.next.x?t:t.next,f===r))return n}t=t.next}while(t!==e);if(!n)return null;const a=n,l=n.x,c=n.y;let u=1/0,h;t=n;do r>=t.x&&t.x>=l&&r!==t.x&&Dr(o<c?r:i,o,l,c,o<c?i:r,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(r-t.x),Ps(t,s)&&(h<u||h===u&&(t.x>n.x||t.x===n.x&&dS(n,t)))&&(n=t,u=h)),t=t.next;while(t!==a);return n}function dS(s,e){return pt(s.prev,s,e.prev)<0&&pt(e.next,s,s.next)<0}function pS(s,e,t,i){let n=s;do n.z===0&&(n.z=Cc(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,mS(n)}function mS(s){let e,t,i,n,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,i=t,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||t.z<=i.z)?(n=t,t=t.nextZ,a--):(n=i,i=i.nextZ,l--),r?r.nextZ=n:s=n,n.prevZ=r,r=n;t=i}r.nextZ=null,c*=2}while(o>1);return s}function Cc(s,e,t,i,n){return s=(s-t)*n|0,e=(e-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function gS(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Dr(s,e,t,i,n,r,o,a){return(n-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(n-o)*(i-a)}function _S(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!vS(s,e)&&(Ps(s,e)&&Ps(e,s)&&yS(s,e)&&(pt(s.prev,s,e.prev)||pt(s,e.prev,e))||Ua(s,e)&&pt(s.prev,s,s.next)>0&&pt(e.prev,e,e.next)>0)}function pt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Ua(s,e){return s.x===e.x&&s.y===e.y}function yp(s,e,t,i){const n=Io(pt(s,e,t)),r=Io(pt(s,e,i)),o=Io(pt(t,i,s)),a=Io(pt(t,i,e));return!!(n!==r&&o!==a||n===0&&Uo(s,t,e)||r===0&&Uo(s,i,e)||o===0&&Uo(t,s,i)||a===0&&Uo(t,e,i))}function Uo(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Io(s){return s>0?1:s<0?-1:0}function vS(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&yp(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Ps(s,e){return pt(s.prev,s,s.next)<0?pt(s,e,s.next)>=0&&pt(s,s.prev,e)>=0:pt(s,e,s.prev)<0||pt(s,s.next,e)<0}function yS(s,e){let t=s,i=!1;const n=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&n<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==s);return i}function xp(s,e){const t=new Rc(s.i,s.x,s.y),i=new Rc(e.i,e.x,e.y),n=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=n,n.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Gh(s,e,t,i){const n=new Rc(s,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function Ls(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Rc(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function xS(s,e,t,i){let n=0;for(let r=e,o=t-i;r<t;r+=i)n+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return n}class Rn{static area(e){const t=e.length;let i=0;for(let n=t-1,r=0;r<t;n=r++)i+=e[n].x*e[r].y-e[r].x*e[n].y;return i*.5}static isClockWise(e){return Rn.area(e)<0}static triangulateShape(e,t){const i=[],n=[],r=[];Hh(e),Vh(i,e);let o=e.length;t.forEach(Hh);for(let l=0;l<t.length;l++)n.push(o),o+=t[l].length,Vh(i,t[l]);const a=rS.triangulate(i,n);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Hh(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Vh(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class Ia extends et{constructor(e=new Gi([new se(.5,.5),new se(-.5,.5),new se(-.5,-.5),new se(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,n=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Oe(n,3)),this.setAttribute("uv",new Oe(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:SS;let v,x=!1,S,b,E,A;m&&(v=m.getSpacedPoints(u),x=!0,f=!1,S=m.computeFrenetFrames(u,!1),b=new P,E=new P,A=new P),f||(g=0,d=0,p=0,_=0);const M=a.extractPoints(c);let w=M.shape;const I=M.holes;if(!Rn.isClockWise(w)){w=w.reverse();for(let D=0,pe=I.length;D<pe;D++){const J=I[D];Rn.isClockWise(J)&&(I[D]=J.reverse())}}const z=Rn.triangulateShape(w,I),C=w;for(let D=0,pe=I.length;D<pe;D++){const J=I[D];w=w.concat(J)}function N(D,pe,J){return pe||console.error("THREE.ExtrudeGeometry: vec does not exist"),D.clone().addScaledVector(pe,J)}const k=w.length,H=z.length;function $(D,pe,J){let de,re,Pe;const Ae=D.x-pe.x,Te=D.y-pe.y,ze=J.x-D.x,Ge=J.y-D.y,je=Ae*Ae+Te*Te,U=Ae*Ge-Te*ze;if(Math.abs(U)>Number.EPSILON){const T=Math.sqrt(je),W=Math.sqrt(ze*ze+Ge*Ge),ve=pe.x-Te/T,ie=pe.y+Ae/T,le=J.x-Ge/W,Se=J.y+ze/W,ce=((le-ve)*Ge-(Se-ie)*ze)/(Ae*Ge-Te*ze);de=ve+Ae*ce-D.x,re=ie+Te*ce-D.y;const ye=de*de+re*re;if(ye<=2)return new se(de,re);Pe=Math.sqrt(ye/2)}else{let T=!1;Ae>Number.EPSILON?ze>Number.EPSILON&&(T=!0):Ae<-Number.EPSILON?ze<-Number.EPSILON&&(T=!0):Math.sign(Te)===Math.sign(Ge)&&(T=!0),T?(de=-Te,re=Ae,Pe=Math.sqrt(je)):(de=Ae,re=Te,Pe=Math.sqrt(je/2))}return new se(de/Pe,re/Pe)}const q=[];for(let D=0,pe=C.length,J=pe-1,de=D+1;D<pe;D++,J++,de++)J===pe&&(J=0),de===pe&&(de=0),q[D]=$(C[D],C[J],C[de]);const V=[];let G,j=q.concat();for(let D=0,pe=I.length;D<pe;D++){const J=I[D];G=[];for(let de=0,re=J.length,Pe=re-1,Ae=de+1;de<re;de++,Pe++,Ae++)Pe===re&&(Pe=0),Ae===re&&(Ae=0),G[de]=$(J[de],J[Pe],J[Ae]);V.push(G),j=j.concat(G)}for(let D=0;D<g;D++){const pe=D/g,J=d*Math.cos(pe*Math.PI/2),de=p*Math.sin(pe*Math.PI/2)+_;for(let re=0,Pe=C.length;re<Pe;re++){const Ae=N(C[re],q[re],de);_e(Ae.x,Ae.y,-J)}for(let re=0,Pe=I.length;re<Pe;re++){const Ae=I[re];G=V[re];for(let Te=0,ze=Ae.length;Te<ze;Te++){const Ge=N(Ae[Te],G[Te],de);_e(Ge.x,Ge.y,-J)}}}const O=p+_;for(let D=0;D<k;D++){const pe=f?N(w[D],j[D],O):w[D];x?(E.copy(S.normals[0]).multiplyScalar(pe.x),b.copy(S.binormals[0]).multiplyScalar(pe.y),A.copy(v[0]).add(E).add(b),_e(A.x,A.y,A.z)):_e(pe.x,pe.y,0)}for(let D=1;D<=u;D++)for(let pe=0;pe<k;pe++){const J=f?N(w[pe],j[pe],O):w[pe];x?(E.copy(S.normals[D]).multiplyScalar(J.x),b.copy(S.binormals[D]).multiplyScalar(J.y),A.copy(v[D]).add(E).add(b),_e(A.x,A.y,A.z)):_e(J.x,J.y,h/u*D)}for(let D=g-1;D>=0;D--){const pe=D/g,J=d*Math.cos(pe*Math.PI/2),de=p*Math.sin(pe*Math.PI/2)+_;for(let re=0,Pe=C.length;re<Pe;re++){const Ae=N(C[re],q[re],de);_e(Ae.x,Ae.y,h+J)}for(let re=0,Pe=I.length;re<Pe;re++){const Ae=I[re];G=V[re];for(let Te=0,ze=Ae.length;Te<ze;Te++){const Ge=N(Ae[Te],G[Te],de);x?_e(Ge.x,Ge.y+v[u-1].y,v[u-1].x+J):_e(Ge.x,Ge.y,h+J)}}}Y(),te();function Y(){const D=n.length/3;if(f){let pe=0,J=k*pe;for(let de=0;de<H;de++){const re=z[de];Ee(re[2]+J,re[1]+J,re[0]+J)}pe=u+g*2,J=k*pe;for(let de=0;de<H;de++){const re=z[de];Ee(re[0]+J,re[1]+J,re[2]+J)}}else{for(let pe=0;pe<H;pe++){const J=z[pe];Ee(J[2],J[1],J[0])}for(let pe=0;pe<H;pe++){const J=z[pe];Ee(J[0]+k*u,J[1]+k*u,J[2]+k*u)}}i.addGroup(D,n.length/3-D,0)}function te(){const D=n.length/3;let pe=0;ge(C,pe),pe+=C.length;for(let J=0,de=I.length;J<de;J++){const re=I[J];ge(re,pe),pe+=re.length}i.addGroup(D,n.length/3-D,1)}function ge(D,pe){let J=D.length;for(;--J>=0;){const de=J;let re=J-1;re<0&&(re=D.length-1);for(let Pe=0,Ae=u+g*2;Pe<Ae;Pe++){const Te=k*Pe,ze=k*(Pe+1),Ge=pe+de+Te,je=pe+re+Te,U=pe+re+ze,T=pe+de+ze;De(Ge,je,U,T)}}}function _e(D,pe,J){l.push(D),l.push(pe),l.push(J)}function Ee(D,pe,J){xe(D),xe(pe),xe(J);const de=n.length/3,re=y.generateTopUV(i,n,de-3,de-2,de-1);fe(re[0]),fe(re[1]),fe(re[2])}function De(D,pe,J,de){xe(D),xe(pe),xe(de),xe(pe),xe(J),xe(de);const re=n.length/3,Pe=y.generateSideWallUV(i,n,re-6,re-3,re-2,re-1);fe(Pe[0]),fe(Pe[1]),fe(Pe[3]),fe(Pe[1]),fe(Pe[2]),fe(Pe[3])}function xe(D){n.push(l[D*3+0]),n.push(l[D*3+1]),n.push(l[D*3+2])}function fe(D){r.push(D.x),r.push(D.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return MS(t,i,e)}static fromJSON(e,t){const i=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];i.push(a)}const n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new ca[n.type]().fromJSON(n)),new Ia(i,e.options)}}const SS={generateTopUV:function(s,e,t,i,n){const r=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[n*3],u=e[n*3+1];return[new se(r,o),new se(a,l),new se(c,u)]},generateSideWallUV:function(s,e,t,i,n,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],h=e[i*3+2],f=e[n*3],d=e[n*3+1],p=e[n*3+2],_=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new se(o,1-l),new se(c,1-h),new se(f,1-p),new se(_,1-m)]:[new se(a,1-l),new se(u,1-h),new se(d,1-p),new se(g,1-m)]}};function MS(s,e,t){if(t.shapes=[],Array.isArray(s))for(let i=0,n=s.length;i<n;i++){const r=s[i];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Da extends fi{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Da(e.radius,e.detail)}}class Ws extends fi{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ws(e.radius,e.detail)}}class Oa extends et{constructor(e=.5,t=1,i=32,n=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:o},i=Math.max(3,i),n=Math.max(1,n);const a=[],l=[],c=[],u=[];let h=e;const f=(t-e)/n,d=new P,p=new se;for(let _=0;_<=n;_++){for(let g=0;g<=i;g++){const m=r+g/i*o;d.x=h*Math.cos(m),d.y=h*Math.sin(m),l.push(d.x,d.y,d.z),c.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,u.push(p.x,p.y)}h+=f}for(let _=0;_<n;_++){const g=_*(i+1);for(let m=0;m<i;m++){const y=m+g,v=y,x=y+i+1,S=y+i+2,b=y+1;a.push(v,x,b),a.push(x,S,b)}}this.setIndex(a),this.setAttribute("position",new Oe(l,3)),this.setAttribute("normal",new Oe(c,3)),this.setAttribute("uv",new Oe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Fa extends et{constructor(e=new Gi([new se(0,.5),new se(-.5,-.5),new se(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],n=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new Oe(n,3)),this.setAttribute("normal",new Oe(r,3)),this.setAttribute("uv",new Oe(o,2));function c(u){const h=n.length/3,f=u.extractPoints(t);let d=f.shape;const p=f.holes;Rn.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const y=p[g];Rn.isClockWise(y)===!0&&(p[g]=y.reverse())}const _=Rn.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const y=p[g];d=d.concat(y)}for(let g=0,m=d.length;g<m;g++){const y=d[g];n.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let g=0,m=_.length;g<m;g++){const y=_[g],v=y[0]+h,x=y[1]+h,S=y[2]+h;i.push(v,x,S),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return bS(t,e)}static fromJSON(e,t){const i=[];for(let n=0,r=e.shapes.length;n<r;n++){const o=t[e.shapes[n]];i.push(o)}return new Fa(i,e.curveSegments)}}function bS(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,i=s.length;t<i;t++){const n=s[t];e.shapes.push(n.uuid)}else e.shapes.push(s.uuid);return e}class Xs extends et{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new P,f=new P,d=[],p=[],_=[],g=[];for(let m=0;m<=i;m++){const y=[],v=m/i;let x=0;m===0&&o===0?x=.5/t:m===i&&l===Math.PI&&(x=-.5/t);for(let S=0;S<=t;S++){const b=S/t;h.x=-e*Math.cos(n+b*r)*Math.sin(o+v*a),h.y=e*Math.cos(o+v*a),h.z=e*Math.sin(n+b*r)*Math.sin(o+v*a),p.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),g.push(b+x,1-v),y.push(c++)}u.push(y)}for(let m=0;m<i;m++)for(let y=0;y<t;y++){const v=u[m][y+1],x=u[m][y],S=u[m+1][y],b=u[m+1][y+1];(m!==0||o>0)&&d.push(v,x,b),(m!==i-1||l<Math.PI)&&d.push(x,S,b)}this.setIndex(d),this.setAttribute("position",new Oe(p,3)),this.setAttribute("normal",new Oe(_,3)),this.setAttribute("uv",new Oe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Na extends fi{constructor(e=1,t=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],n=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,n,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Na(e.radius,e.detail)}}class Ba extends et{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r},i=Math.floor(i),n=Math.floor(n);const o=[],a=[],l=[],c=[],u=new P,h=new P,f=new P;for(let d=0;d<=i;d++)for(let p=0;p<=n;p++){const _=p/n*r,g=d/i*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),a.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(p/n),c.push(d/i)}for(let d=1;d<=i;d++)for(let p=1;p<=n;p++){const _=(n+1)*d+p-1,g=(n+1)*(d-1)+p-1,m=(n+1)*(d-1)+p,y=(n+1)*d+p;o.push(_,g,y),o.push(g,m,y)}this.setIndex(o),this.setAttribute("position",new Oe(a,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ba(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class za extends et{constructor(e=1,t=.4,i=64,n=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:i,radialSegments:n,p:r,q:o},i=Math.floor(i),n=Math.floor(n);const a=[],l=[],c=[],u=[],h=new P,f=new P,d=new P,p=new P,_=new P,g=new P,m=new P;for(let v=0;v<=i;++v){const x=v/i*r*Math.PI*2;y(x,r,o,e,d),y(x+.01,r,o,e,p),g.subVectors(p,d),m.addVectors(p,d),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let S=0;S<=n;++S){const b=S/n*Math.PI*2,E=-t*Math.cos(b),A=t*Math.sin(b);h.x=d.x+(E*m.x+A*_.x),h.y=d.y+(E*m.y+A*_.y),h.z=d.z+(E*m.z+A*_.z),l.push(h.x,h.y,h.z),f.subVectors(h,d).normalize(),c.push(f.x,f.y,f.z),u.push(v/i),u.push(S/n)}}for(let v=1;v<=i;v++)for(let x=1;x<=n;x++){const S=(n+1)*(v-1)+(x-1),b=(n+1)*v+(x-1),E=(n+1)*v+x,A=(n+1)*(v-1)+x;a.push(S,b,A),a.push(b,E,A)}this.setIndex(a),this.setAttribute("position",new Oe(l,3)),this.setAttribute("normal",new Oe(c,3)),this.setAttribute("uv",new Oe(u,2));function y(v,x,S,b,E){const A=Math.cos(v),M=Math.sin(v),w=S/x*v,I=Math.cos(w);E.x=b*(2+I)*.5*A,E.y=b*(2+I)*M*.5,E.z=b*Math.sin(w)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new za(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class ka extends et{constructor(e=new pu(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:n,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,l=new P,c=new se;let u=new P;const h=[],f=[],d=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Oe(h,3)),this.setAttribute("normal",new Oe(f,3)),this.setAttribute("uv",new Oe(d,2));function _(){for(let v=0;v<t;v++)g(v);g(r===!1?t:0),y(),m()}function g(v){u=e.getPointAt(v/t,u);const x=o.normals[v],S=o.binormals[v];for(let b=0;b<=n;b++){const E=b/n*Math.PI*2,A=Math.sin(E),M=-Math.cos(E);l.x=M*x.x+A*S.x,l.y=M*x.y+A*S.y,l.z=M*x.z+A*S.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,h.push(a.x,a.y,a.z)}}function m(){for(let v=1;v<=t;v++)for(let x=1;x<=n;x++){const S=(n+1)*(v-1)+(x-1),b=(n+1)*v+(x-1),E=(n+1)*v+x,A=(n+1)*(v-1)+x;p.push(S,b,A),p.push(b,E,A)}}function y(){for(let v=0;v<=t;v++)for(let x=0;x<=n;x++)c.x=v/t,c.y=x/n,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ka(new ca[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class gu extends et{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],i=new Set,n=new P,r=new P;if(e.index!==null){const o=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const h=l[c],f=h.start,d=h.count;for(let p=f,_=f+d;p<_;p+=3)for(let g=0;g<3;g++){const m=a.getX(p+g),y=a.getX(p+(g+1)%3);n.fromBufferAttribute(o,m),r.fromBufferAttribute(o,y),Wh(n,r,i)===!0&&(t.push(n.x,n.y,n.z),t.push(r.x,r.y,r.z))}}}else{const o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,h=3*a+(c+1)%3;n.fromBufferAttribute(o,u),r.fromBufferAttribute(o,h),Wh(n,r,i)===!0&&(t.push(n.x,n.y,n.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Oe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function Wh(s,e,t){const i=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,n=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(i)===!0||t.has(n)===!0?!1:(t.add(i),t.add(n),!0)}var Xh=Object.freeze({__proto__:null,BoxGeometry:Ji,CapsuleGeometry:Ca,CircleGeometry:Ra,ConeGeometry:Pa,CylinderGeometry:Wr,DodecahedronGeometry:La,EdgesGeometry:_p,ExtrudeGeometry:Ia,IcosahedronGeometry:Da,LatheGeometry:Vs,OctahedronGeometry:Ws,PlaneGeometry:hi,PolyhedronGeometry:fi,RingGeometry:Oa,ShapeGeometry:Fa,SphereGeometry:Xs,TetrahedronGeometry:Na,TorusGeometry:Ba,TorusKnotGeometry:za,TubeGeometry:ka,WireframeGeometry:gu});class Sp extends Wt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Re(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Mp extends hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class _u extends Wt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bp extends _u{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Re(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class wp extends Wt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Re(16777215),this.specular=new Re(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ns,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ep extends Wt{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Re(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Tp extends Wt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Ap extends Wt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ns,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Cp extends Wt{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Re(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Rp extends Zt{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Fi(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Pp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Lp(s){function e(n,r){return s[n]-s[r]}const t=s.length,i=new Array(t);for(let n=0;n!==t;++n)i[n]=n;return i.sort(e),i}function Pc(s,e,t){const i=s.length,n=new s.constructor(i);for(let r=0,o=0;o!==i;++r){const a=t[r]*e;for(let l=0;l!==e;++l)n[o++]=s[a+l]}return n}function vu(s,e,t,i){let n=1,r=s[0];for(;r!==void 0&&r[i]===void 0;)r=s[n++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[n++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[n++];while(r!==void 0);else do o=r[i],o!==void 0&&(e.push(r.time),t.push(o)),r=s[n++];while(r!==void 0)}function wS(s,e,t,i,n=30){const r=s.clone();r.name=e;const o=[];for(let l=0;l<r.tracks.length;++l){const c=r.tracks[l],u=c.getValueSize(),h=[],f=[];for(let d=0;d<c.times.length;++d){const p=c.times[d]*n;if(!(p<t||p>=i)){h.push(c.times[d]);for(let _=0;_<u;++_)f.push(c.values[d*u+_])}}h.length!==0&&(c.times=Fi(h,c.times.constructor),c.values=Fi(f,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function ES(s,e=0,t=s,i=30){i<=0&&(i=30);const n=t.tracks.length,r=e/i;for(let o=0;o<n;++o){const a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=s.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let u=0;const h=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let f=0;const d=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(f=d/3);const p=a.times.length-1;let _;if(r<=a.times[0]){const m=u,y=h-u;_=a.values.slice(m,y)}else if(r>=a.times[p]){const m=p*h+u,y=m+h-u;_=a.values.slice(m,y)}else{const m=a.createInterpolant(),y=u,v=h-u;m.evaluate(r),_=m.resultBuffer.slice(y,v)}l==="quaternion"&&new Vt().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let m=0;m<g;++m){const y=m*d+f;if(l==="quaternion")Vt.multiplyQuaternionsFlat(c.values,y,_,0,c.values,y);else{const v=d-f*2;for(let x=0;x<v;++x)c.values[y+x]-=_[x]}}}return s.blendMode=jc,s}const TS={convertArray:Fi,isTypedArray:Pp,getKeyframeOrder:Lp,sortedArray:Pc,flattenJSON:vu,subclip:wS,makeClipAdditive:ES};class qs{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,n=t[i],r=t[i-1];e:{t:{let o;n:{i:if(!(e<n)){for(let a=i+2;;){if(n===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=n,n=t[++i],e<n)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=t[--i-1],e>=r)break t}o=i,i=0;break n}break e}for(;i<o;){const a=i+o>>>1;e<t[a]?o=a:i=a+1}if(n=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n;for(let o=0;o!==n;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Up extends qs{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ii,endingEnd:Ii}}intervalChanged_(e,t,i){const n=this.parameterPositions;let r=e-2,o=e+1,a=n[r],l=n[o];if(a===void 0)switch(this.getSettings_().endingStart){case Di:r=e,a=2*t-i;break;case Ms:r=n.length-2,a=t+n[r]-n[r+1];break;default:r=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Di:o=e,l=2*i-t;break;case Ms:o=1,l=i+n[1]-n[0];break;default:o=e-1,l=t}const c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,i,n){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(i-t)/(n-t),_=p*p,g=_*p,m=-f*g+2*f*_-f*p,y=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*p+1,v=(-1-d)*g+(1.5+d)*_+.5*p,x=d*g-d*_;for(let S=0;S!==a;++S)r[S]=m*o[u+S]+y*o[c+S]+v*o[l+S]+x*o[h+S];return r}}class yu extends qs{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-t)/(n-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[c+f]*h+o[l+f]*u;return r}}class Ip extends qs{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}}class Mn{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fi(t,this.TimeBufferType),this.values=Fi(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Fi(e.times,Array),values:Fi(e.values,Array)};const n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Ip(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new yu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Up(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case xs:t=this.InterpolantFactoryMethodDiscrete;break;case Ss:t=this.InterpolantFactoryMethodLinear;break;case ea:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xs;case this.InterpolantFactoryMethodLinear:return Ss;case this.InterpolantFactoryMethodSmooth:return ea}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e}return this}trim(e,t){const i=this.times,n=i.length;let r=0,o=n-1;for(;r!==n&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==n){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,n=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(n!==void 0&&Pp(n))for(let a=0,l=n.length;a!==l;++a){const c=n[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===ea,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(n)l=!0;else{const h=a*i,f=h-i,d=h+i;for(let p=0;p!==i;++p){const _=t[h+p];if(_!==t[f+p]||_!==t[d+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*i,f=o*i;for(let d=0;d!==i;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}}Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=Ss;class Ki extends Mn{}Ki.prototype.ValueTypeName="bool";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=xs;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;class xu extends Mn{}xu.prototype.ValueTypeName="color";class Us extends Mn{}Us.prototype.ValueTypeName="number";class Dp extends qs{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(n-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Vt.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Xr extends Mn{InterpolantFactoryMethodLinear(e){return new Dp(this.times,this.values,this.getValueSize(),e)}}Xr.prototype.ValueTypeName="quaternion";Xr.prototype.DefaultInterpolation=Ss;Xr.prototype.InterpolantFactoryMethodSmooth=void 0;class Qi extends Mn{}Qi.prototype.ValueTypeName="string";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=xs;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;class Is extends Mn{}Is.prototype.ValueTypeName="vector";class Ds{constructor(e,t=-1,i,n=ma){this.name=e,this.tracks=i,this.duration=t,this.blendMode=n,this.uuid=on(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,n=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)t.push(CS(i[o]).scale(n));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],i=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=i.length;r!==o;++r)t.push(Mn.toJSON(i[r]));return n}static CreateFromMorphTargetSequence(e,t,i,n){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const u=Lp(l);l=Pc(l,1,u),c=Pc(c,1,u),!n&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Us(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/i))}return new this(e,-1,o)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const n=e;i=n.geometry&&n.geometry.animations||n.animations}for(let n=0;n<i.length;n++)if(i[n].name===t)return i[n];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const n={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(r);if(u&&u.length>1){const h=u[1];let f=n[h];f||(n[h]=f=[]),f.push(c)}}const o=[];for(const a in n)o.push(this.CreateFromMorphTargetSequence(a,n[a],t,i));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(h,f,d,p,_){if(d.length!==0){const g=[],m=[];vu(d,g,m,p),g.length!==0&&_.push(new h(f,g,m))}},n=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const f=c[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let p;for(p=0;p<f.length;p++)if(f[p].morphTargets)for(let _=0;_<f[p].morphTargets.length;_++)d[f[p].morphTargets[_]]=-1;for(const _ in d){const g=[],m=[];for(let y=0;y!==f[p].morphTargets.length;++y){const v=f[p];g.push(v.time),m.push(v.morphTarget===_?1:0)}n.push(new Us(".morphTargetInfluence["+_+"]",g,m))}l=d.length*o}else{const d=".bones["+t[h].name+"]";i(Is,d+".position",f,"pos",n),i(Xr,d+".quaternion",f,"rot",n),i(Is,d+".scale",f,"scl",n)}}return n.length===0?null:new this(r,l,n,a)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,n=e.length;i!==n;++i){const r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function AS(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Us;case"vector":case"vector2":case"vector3":case"vector4":return Is;case"color":return xu;case"quaternion":return Xr;case"bool":case"boolean":return Ki;case"string":return Qi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function CS(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=AS(s.type);if(s.times===void 0){const t=[],i=[];vu(s.keys,t,i,"value"),s.times=t,s.values=i}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Zi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Su{constructor(e,t,i){const n=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,r===!1&&n.onStart!==void 0&&n.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,n.onProgress!==void 0&&n.onProgress(u,o,a),o===a&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(u){n.onError!==void 0&&n.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],p=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null}}}const Op=new Su;class Qt{constructor(e){this.manager=e!==void 0?e:Op,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Qt.DEFAULT_MATERIAL_NAME="__DEFAULT";const kn={};class RS extends Error{constructor(e,t){super(e),this.response=t}}class qn extends Qt{constructor(e){super(e)}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Zi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(kn[e]!==void 0){kn[e].push({onLoad:t,onProgress:i,onError:n});return}kn[e]=[],kn[e].push({onLoad:t,onProgress:i,onError:n});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=kn[e],h=c.body.getReader(),f=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),d=f?parseInt(f):0,p=d!==0;let _=0;const g=new ReadableStream({start(m){y();function y(){h.read().then(({done:v,value:x})=>{if(v)m.close();else{_+=x.byteLength;const S=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:d});for(let b=0,E=u.length;b<E;b++){const A=u[b];A.onProgress&&A.onProgress(S)}m.enqueue(x),y()}})}}});return new Response(g)}else throw new RS(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{Zi.add(e,c);const u=kn[e];delete kn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=kn[e];if(u===void 0)throw this.manager.itemError(e),c;delete kn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class PS extends Qt{constructor(e){super(e)}load(e,t,i,n){const r=this,o=new qn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){n?n(l):console.error(l),r.manager.itemError(e)}},i,n)}parse(e){const t=[];for(let i=0;i<e.length;i++){const n=Ds.parse(e[i]);t.push(n)}return t}}class LS extends Qt{constructor(e){super(e)}load(e,t,i,n){const r=this,o=[],a=new Ta,l=new qn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function u(h){l.load(e[h],function(f){const d=r.parse(f,!0);o[h]={width:d.width,height:d.height,format:d.format,mipmaps:d.mipmaps},c+=1,c===6&&(d.mipmapCount===1&&(a.minFilter=ft),a.image=o,a.format=d.format,a.needsUpdate=!0,t&&t(a))},i,n)}if(Array.isArray(e))for(let h=0,f=e.length;h<f;++h)u(h);else l.load(e,function(h){const f=r.parse(h,!0);if(f.isCubemap){const d=f.mipmaps.length/f.mipmapCount;for(let p=0;p<d;p++){o[p]={mipmaps:[]};for(let _=0;_<f.mipmapCount;_++)o[p].mipmaps.push(f.mipmaps[p*f.mipmapCount+_]),o[p].format=f.format,o[p].width=f.width,o[p].height=f.height}a.image=o}else a.image.width=f.width,a.image.height=f.height,a.mipmaps=f.mipmaps;f.mipmapCount===1&&(a.minFilter=ft),a.format=f.format,a.needsUpdate=!0,t&&t(a)},i,n);return a}}class Os extends Qt{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Zi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=As("img");function l(){u(),Zi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),n&&n(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class US extends Qt{constructor(e){super(e)}load(e,t,i,n){const r=new Gs;r.colorSpace=Tt;const o=new Os(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(u){r.images[c]=u,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,n)}for(let c=0;c<e.length;++c)l(c);return r}}class IS extends Qt{constructor(e){super(e)}load(e,t,i,n){const r=this,o=new ki,a=new qn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(u){if(n!==void 0)n(u);else{console.error(u);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:Gt,o.wrapT=c.wrapT!==void 0?c.wrapT:Gt,o.magFilter=c.magFilter!==void 0?c.magFilter:ft,o.minFilter=c.minFilter!==void 0?c.minFilter:ft,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0?o.colorSpace=c.colorSpace:c.encoding!==void 0&&(o.encoding=c.encoding),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=li),c.mipmapCount===1&&(o.minFilter=ft),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},i,n),o}}class DS extends Qt{constructor(e){super(e)}load(e,t,i,n){const r=new yt,o=new Os(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}}class di extends at{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Fp extends di{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Al=new Ve,qh=new P,Yh=new P;class Mu{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.map=null,this.mapPass=null,this.matrix=new Ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hs,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;qh.setFromMatrixPosition(e.matrixWorld),t.position.copy(qh),Yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yh),t.updateMatrixWorld(),Al.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Al),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Al)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class OS extends Mu{constructor(){super(new bt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=Nr*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(i!==t.fov||n!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=n,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Np extends di{constructor(e,t,i=0,n=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.distance=i,this.angle=n,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new OS}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const jh=new Ve,is=new P,Cl=new P;class FS extends Mu{constructor(){super(new bt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new se(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),is.setFromMatrixPosition(e.matrixWorld),i.position.copy(is),Cl.copy(i.position),Cl.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Cl),i.updateMatrixWorld(),n.makeTranslation(-is.x,-is.y,-is.z),jh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jh)}}class Bp extends di{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new FS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class NS extends Mu{constructor(){super(new oi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zp extends di{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.shadow=new NS}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class kp extends di{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Gp extends di{constructor(e,t,i=10,n=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=i,this.height=n}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class Hp{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new P)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const i=e.x,n=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*n),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*i),t.addScaledVector(o[4],1.092548*(i*n)),t.addScaledVector(o[5],1.092548*(n*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(i*r)),t.addScaledVector(o[8],.546274*(i*i-n*n)),t}getIrradianceAt(e,t){const i=e.x,n=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*n),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*i),t.addScaledVector(o[4],2*.429043*i*n),t.addScaledVector(o[5],2*.429043*n*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*i*r),t.addScaledVector(o[8],.429043*(i*i-n*n)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let i=0;i<9;i++)this.coefficients[i].addScaledVector(e.coefficients[i],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let i=0;i<9;i++)this.coefficients[i].lerp(e.coefficients[i],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const i=this.coefficients;for(let n=0;n<9;n++)i[n].fromArray(e,t+n*3);return this}toArray(e=[],t=0){const i=this.coefficients;for(let n=0;n<9;n++)i[n].toArray(e,t+n*3);return e}static getBasisAt(e,t){const i=e.x,n=e.y,r=e.z;t[0]=.282095,t[1]=.488603*n,t[2]=.488603*r,t[3]=.488603*i,t[4]=1.092548*i*n,t[5]=1.092548*n*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*i*r,t[8]=.546274*(i*i-n*n)}}class Vp extends di{constructor(e=new Hp,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class Ga extends Qt{constructor(e){super(e),this.textures={}}load(e,t,i,n){const r=this,o=new qn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){n?n(l):console.error(l),r.manager.itemError(e)}},i,n)}parse(e){const t=this.textures;function i(r){return t[r]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",r),t[r]}const n=Ga.createMaterialFromType(e.type);if(e.uuid!==void 0&&(n.uuid=e.uuid),e.name!==void 0&&(n.name=e.name),e.color!==void 0&&n.color!==void 0&&n.color.setHex(e.color),e.roughness!==void 0&&(n.roughness=e.roughness),e.metalness!==void 0&&(n.metalness=e.metalness),e.sheen!==void 0&&(n.sheen=e.sheen),e.sheenColor!==void 0&&(n.sheenColor=new Re().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(n.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&n.emissive!==void 0&&n.emissive.setHex(e.emissive),e.specular!==void 0&&n.specular!==void 0&&n.specular.setHex(e.specular),e.specularIntensity!==void 0&&(n.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&n.specularColor!==void 0&&n.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(n.shininess=e.shininess),e.clearcoat!==void 0&&(n.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=e.clearcoatRoughness),e.iridescence!==void 0&&(n.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(n.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(n.transmission=e.transmission),e.thickness!==void 0&&(n.thickness=e.thickness),e.attenuationDistance!==void 0&&(n.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&n.attenuationColor!==void 0&&n.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(n.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(n.fog=e.fog),e.flatShading!==void 0&&(n.flatShading=e.flatShading),e.blending!==void 0&&(n.blending=e.blending),e.combine!==void 0&&(n.combine=e.combine),e.side!==void 0&&(n.side=e.side),e.shadowSide!==void 0&&(n.shadowSide=e.shadowSide),e.opacity!==void 0&&(n.opacity=e.opacity),e.transparent!==void 0&&(n.transparent=e.transparent),e.alphaTest!==void 0&&(n.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(n.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(n.depthFunc=e.depthFunc),e.depthTest!==void 0&&(n.depthTest=e.depthTest),e.depthWrite!==void 0&&(n.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(n.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(n.blendSrc=e.blendSrc),e.blendDst!==void 0&&(n.blendDst=e.blendDst),e.blendEquation!==void 0&&(n.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(n.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(n.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(n.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&n.blendColor!==void 0&&n.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(n.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(n.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(n.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(n.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(n.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(n.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(n.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(n.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(n.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(n.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(n.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(n.rotation=e.rotation),e.linewidth!==void 0&&(n.linewidth=e.linewidth),e.dashSize!==void 0&&(n.dashSize=e.dashSize),e.gapSize!==void 0&&(n.gapSize=e.gapSize),e.scale!==void 0&&(n.scale=e.scale),e.polygonOffset!==void 0&&(n.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(n.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(n.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(n.dithering=e.dithering),e.alphaToCoverage!==void 0&&(n.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(n.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(n.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(n.visible=e.visible),e.toneMapped!==void 0&&(n.toneMapped=e.toneMapped),e.userData!==void 0&&(n.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?n.vertexColors=e.vertexColors>0:n.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const r in e.uniforms){const o=e.uniforms[r];switch(n.uniforms[r]={},o.type){case"t":n.uniforms[r].value=i(o.value);break;case"c":n.uniforms[r].value=new Re().setHex(o.value);break;case"v2":n.uniforms[r].value=new se().fromArray(o.value);break;case"v3":n.uniforms[r].value=new P().fromArray(o.value);break;case"v4":n.uniforms[r].value=new it().fromArray(o.value);break;case"m3":n.uniforms[r].value=new Ke().fromArray(o.value);break;case"m4":n.uniforms[r].value=new Ve().fromArray(o.value);break;default:n.uniforms[r].value=o.value}}if(e.defines!==void 0&&(n.defines=e.defines),e.vertexShader!==void 0&&(n.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(n.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(n.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)n.extensions[r]=e.extensions[r];if(e.lights!==void 0&&(n.lights=e.lights),e.clipping!==void 0&&(n.clipping=e.clipping),e.size!==void 0&&(n.size=e.size),e.sizeAttenuation!==void 0&&(n.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(n.map=i(e.map)),e.matcap!==void 0&&(n.matcap=i(e.matcap)),e.alphaMap!==void 0&&(n.alphaMap=i(e.alphaMap)),e.bumpMap!==void 0&&(n.bumpMap=i(e.bumpMap)),e.bumpScale!==void 0&&(n.bumpScale=e.bumpScale),e.normalMap!==void 0&&(n.normalMap=i(e.normalMap)),e.normalMapType!==void 0&&(n.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),n.normalScale=new se().fromArray(r)}return e.displacementMap!==void 0&&(n.displacementMap=i(e.displacementMap)),e.displacementScale!==void 0&&(n.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(n.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(n.roughnessMap=i(e.roughnessMap)),e.metalnessMap!==void 0&&(n.metalnessMap=i(e.metalnessMap)),e.emissiveMap!==void 0&&(n.emissiveMap=i(e.emissiveMap)),e.emissiveIntensity!==void 0&&(n.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(n.specularMap=i(e.specularMap)),e.specularIntensityMap!==void 0&&(n.specularIntensityMap=i(e.specularIntensityMap)),e.specularColorMap!==void 0&&(n.specularColorMap=i(e.specularColorMap)),e.envMap!==void 0&&(n.envMap=i(e.envMap)),e.envMapIntensity!==void 0&&(n.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(n.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(n.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(n.lightMap=i(e.lightMap)),e.lightMapIntensity!==void 0&&(n.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(n.aoMap=i(e.aoMap)),e.aoMapIntensity!==void 0&&(n.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(n.gradientMap=i(e.gradientMap)),e.clearcoatMap!==void 0&&(n.clearcoatMap=i(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(n.clearcoatRoughnessMap=i(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(n.clearcoatNormalMap=i(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(n.clearcoatNormalScale=new se().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(n.iridescenceMap=i(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(n.iridescenceThicknessMap=i(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(n.transmissionMap=i(e.transmissionMap)),e.thicknessMap!==void 0&&(n.thicknessMap=i(e.thicknessMap)),e.anisotropyMap!==void 0&&(n.anisotropyMap=i(e.anisotropyMap)),e.sheenColorMap!==void 0&&(n.sheenColorMap=i(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(n.sheenRoughnessMap=i(e.sheenRoughnessMap)),n}setTextures(e){return this.textures=e,this}static createMaterialFromType(e){const t={ShadowMaterial:Sp,SpriteMaterial:au,RawShaderMaterial:Mp,ShaderMaterial:hn,PointsMaterial:cu,MeshPhysicalMaterial:bp,MeshStandardMaterial:_u,MeshPhongMaterial:wp,MeshToonMaterial:Ep,MeshNormalMaterial:Tp,MeshLambertMaterial:Ap,MeshDepthMaterial:xa,MeshDistanceMaterial:Sa,MeshBasicMaterial:jn,MeshMatcapMaterial:Cp,LineDashedMaterial:Rp,LineBasicMaterial:Zt,Material:Wt};return new t[e]}}class Lc{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,n=e.length;i<n;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Ha extends et{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Wp extends Qt{constructor(e){super(e)}load(e,t,i,n){const r=this,o=new qn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){n?n(l):console.error(l),r.manager.itemError(e)}},i,n)}parse(e){const t={},i={};function n(d,p){if(t[p]!==void 0)return t[p];const g=d.interleavedBuffers[p],m=r(d,g.buffer),y=Lr(g.type,m),v=new wa(y,g.stride);return v.uuid=g.uuid,t[p]=v,v}function r(d,p){if(i[p]!==void 0)return i[p];const g=d.arrayBuffers[p],m=new Uint32Array(g).buffer;return i[p]=m,m}const o=e.isInstancedBufferGeometry?new Ha:new et,a=e.data.index;if(a!==void 0){const d=Lr(a.type,a.array);o.setIndex(new ct(d,1))}const l=e.data.attributes;for(const d in l){const p=l[d];let _;if(p.isInterleavedBufferAttribute){const g=n(e.data,p.data);_=new sn(g,p.itemSize,p.offset,p.normalized)}else{const g=Lr(p.type,p.array),m=p.isInstancedBufferAttribute?Yi:ct;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),o.setAttribute(d,_)}const c=e.data.morphAttributes;if(c)for(const d in c){const p=c[d],_=[];for(let g=0,m=p.length;g<m;g++){const y=p[g];let v;if(y.isInterleavedBufferAttribute){const x=n(e.data,y.data);v=new sn(x,y.itemSize,y.offset,y.normalized)}else{const x=Lr(y.type,y.array);v=new ct(x,y.itemSize,y.normalized)}y.name!==void 0&&(v.name=y.name),_.push(v)}o.morphAttributes[d]=_}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const h=e.data.groups||e.data.drawcalls||e.data.offsets;if(h!==void 0)for(let d=0,p=h.length;d!==p;++d){const _=h[d];o.addGroup(_.start,_.count,_.materialIndex)}const f=e.data.boundingSphere;if(f!==void 0){const d=new P;f.center!==void 0&&d.fromArray(f.center),o.boundingSphere=new At(d,f.radius)}return e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}}class BS extends Qt{constructor(e){super(e)}load(e,t,i,n){const r=this,o=this.path===""?Lc.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;const a=new qn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(h){n!==void 0&&n(h),console.error("THREE:ObjectLoader: Can't parse "+e+".",h.message);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){n!==void 0&&n(new Error("THREE.ObjectLoader: Can't load "+e)),console.error("THREE.ObjectLoader: Can't load "+e);return}r.parse(c,t)},i,n)}async loadAsync(e,t){const i=this,n=this.path===""?Lc.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||n;const r=new qn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);const o=await r.loadAsync(e,t),a=JSON.parse(o),l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await i.parseAsync(a)}parse(e,t){const i=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,n),o=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,o),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,r,l,a,i),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),t!==void 0){let h=!1;for(const f in o)if(o[f].data instanceof HTMLImageElement){h=!0;break}h===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),n=this.parseGeometries(e.geometries,i),r=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,r),a=this.parseMaterials(e.materials,o),l=this.parseObject(e.object,n,a,o,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),l}parseShapes(e){const t={};if(e!==void 0)for(let i=0,n=e.length;i<n;i++){const r=new Gi().fromJSON(e[i]);t[r.uuid]=r}return t}parseSkeletons(e,t){const i={},n={};if(t.traverse(function(r){r.isBone&&(n[r.uuid]=r)}),e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=new Ea().fromJSON(e[r],n);i[a.uuid]=a}return i}parseGeometries(e,t){const i={};if(e!==void 0){const n=new Wp;for(let r=0,o=e.length;r<o;r++){let a;const l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=n.parse(l);break;default:l.type in Xh?a=Xh[l.type].fromJSON(l,t):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),i[l.uuid]=a}}return i}parseMaterials(e,t){const i={},n={};if(e!==void 0){const r=new Ga;r.setTextures(t);for(let o=0,a=e.length;o<a;o++){const l=e[o];i[l.uuid]===void 0&&(i[l.uuid]=r.parse(l)),n[l.uuid]=i[l.uuid]}}return n}parseAnimations(e){const t={};if(e!==void 0)for(let i=0;i<e.length;i++){const n=e[i],r=Ds.parse(n);t[r.uuid]=r}return t}parseImages(e,t){const i=this,n={};let r;function o(l){return i.manager.itemStart(l),r.load(l,function(){i.manager.itemEnd(l)},void 0,function(){i.manager.itemError(l),i.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:i.resourcePath+c;return o(u)}else return l.data?{data:Lr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new Su(t);r=new Os(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const h=e[c],f=h.url;if(Array.isArray(f)){const d=[];for(let p=0,_=f.length;p<_;p++){const g=f[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?d.push(m):d.push(new ki(m.data,m.width,m.height)))}n[h.uuid]=new Oi(d)}else{const d=a(h.url);n[h.uuid]=new Oi(d)}}}return n}async parseImagesAsync(e){const t=this,i={};let n;async function r(o){if(typeof o=="string"){const a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await n.loadAsync(l)}else return o.data?{data:Lr(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){n=new Os(this.manager),n.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){const l=e[o],c=l.url;if(Array.isArray(c)){const u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h],p=await r(d);p!==null&&(p instanceof HTMLImageElement?u.push(p):u.push(new ki(p.data,p.width,p.height)))}i[l.uuid]=new Oi(u)}else{const u=await r(l.url);i[l.uuid]=new Oi(u)}}}return i}parseTextures(e,t){function i(r,o){return typeof r=="number"?r:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}const n={};if(e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=e[r];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);const l=t[a.image],c=l.data;let u;Array.isArray(c)?(u=new Gs,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new ki:u=new yt,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=a.uuid,a.name!==void 0&&(u.name=a.name),a.mapping!==void 0&&(u.mapping=i(a.mapping,zS)),a.channel!==void 0&&(u.channel=a.channel),a.offset!==void 0&&u.offset.fromArray(a.offset),a.repeat!==void 0&&u.repeat.fromArray(a.repeat),a.center!==void 0&&u.center.fromArray(a.center),a.rotation!==void 0&&(u.rotation=a.rotation),a.wrap!==void 0&&(u.wrapS=i(a.wrap[0],Zh),u.wrapT=i(a.wrap[1],Zh)),a.format!==void 0&&(u.format=a.format),a.internalFormat!==void 0&&(u.internalFormat=a.internalFormat),a.type!==void 0&&(u.type=a.type),a.colorSpace!==void 0&&(u.colorSpace=a.colorSpace),a.encoding!==void 0&&(u.encoding=a.encoding),a.minFilter!==void 0&&(u.minFilter=i(a.minFilter,$h)),a.magFilter!==void 0&&(u.magFilter=i(a.magFilter,$h)),a.anisotropy!==void 0&&(u.anisotropy=a.anisotropy),a.flipY!==void 0&&(u.flipY=a.flipY),a.generateMipmaps!==void 0&&(u.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(u.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(u.compareFunction=a.compareFunction),a.userData!==void 0&&(u.userData=a.userData),n[a.uuid]=u}return n}parseObject(e,t,i,n,r){let o;function a(f){return t[f]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",f),t[f]}function l(f){if(f!==void 0){if(Array.isArray(f)){const d=[];for(let p=0,_=f.length;p<_;p++){const g=f[p];i[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),d.push(i[g])}return d}return i[f]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",f),i[f]}}function c(f){return n[f]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",f),n[f]}let u,h;switch(e.type){case"Scene":o=new ou,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new Re(e.background):o.background=c(e.background)),e.environment!==void 0&&(o.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new ba(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new Ma(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity);break;case"PerspectiveCamera":o=new bt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new oi(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new kp(e.color,e.intensity);break;case"DirectionalLight":o=new zp(e.color,e.intensity);break;case"PointLight":o=new Bp(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new Gp(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new Np(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay);break;case"HemisphereLight":o=new Fp(e.color,e.groundColor,e.intensity);break;case"LightProbe":o=new Vp().fromJSON(e);break;case"SkinnedMesh":u=a(e.geometry),h=l(e.material),o=new ap(u,h),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":u=a(e.geometry),h=l(e.material),o=new mt(u,h);break;case"InstancedMesh":u=a(e.geometry),h=l(e.material);const f=e.count,d=e.instanceMatrix,p=e.instanceColor;o=new lp(u,h,f),o.instanceMatrix=new Yi(new Float32Array(d.array),16),p!==void 0&&(o.instanceColor=new Yi(new Float32Array(p.array),p.itemSize));break;case"BatchedMesh":u=a(e.geometry),h=l(e.material),o=new cp(e.maxGeometryCount,e.maxVertexCount,e.maxIndexCount,h),o.geometry=u,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._visibility=e.visibility,o._active=e.active,o._bounds=e.bounds.map(_=>{const g=new Et;g.min.fromArray(_.boxMin),g.max.fromArray(_.boxMax);const m=new At;return m.radius=_.sphereRadius,m.center.fromArray(_.sphereCenter),{boxInitialized:_.boxInitialized,box:g,sphereInitialized:_.sphereInitialized,sphere:m}}),o._maxGeometryCount=e.maxGeometryCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._geometryCount=e.geometryCount,o._matricesTexture=c(e.matricesTexture.uuid);break;case"LOD":o=new op;break;case"Line":o=new ci(a(e.geometry),l(e.material));break;case"LineLoop":o=new up(a(e.geometry),l(e.material));break;case"LineSegments":o=new Ln(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":o=new hp(a(e.geometry),l(e.material));break;case"Sprite":o=new sp(l(e.material));break;case"Group":o=new Ir;break;case"Bone":o=new lu;break;default:o=new at}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){const f=e.children;for(let d=0;d<f.length;d++)o.add(this.parseObject(f[d],t,i,n,r))}if(e.animations!==void 0){const f=e.animations;for(let d=0;d<f.length;d++){const p=f[d];o.animations.push(r[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);const f=e.levels;for(let d=0;d<f.length;d++){const p=f[d],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(i){if(i.isSkinnedMesh===!0&&i.skeleton!==void 0){const n=t[i.skeleton];n===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",i.skeleton):i.bind(n,i.bindMatrix)}})}}const zS={UVMapping:da,CubeReflectionMapping:Xn,CubeRefractionMapping:ai,EquirectangularReflectionMapping:gs,EquirectangularRefractionMapping:_s,CubeUVReflectionMapping:Hr},Zh={RepeatWrapping:vs,ClampToEdgeWrapping:Gt,MirroredRepeatWrapping:ys},$h={NearestFilter:Mt,NearestMipmapNearestFilter:oa,NearestMipmapLinearFilter:us,LinearFilter:ft,LinearMipmapNearestFilter:kc,LinearMipmapLinearFilter:li};class kS extends Qt{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Zi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){Zi.add(e,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){n&&n(l),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}}let Do;class bu{static getContext(){return Do===void 0&&(Do=new(window.AudioContext||window.webkitAudioContext)),Do}static setContext(e){Do=e}}class GS extends Qt{constructor(e){super(e)}load(e,t,i,n){const r=this,o=new qn(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{const c=l.slice(0);bu.getContext().decodeAudioData(c,function(h){t(h)}).catch(a)}catch(c){a(c)}},i,n);function a(l){n?n(l):console.error(l),r.manager.itemError(e)}}}const Jh=new Ve,Kh=new Ve,Mi=new Ve;class HS{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new bt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new bt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,Mi.copy(e.projectionMatrix);const n=t.eyeSep/2,r=n*t.near/t.focus,o=t.near*Math.tan(Bi*t.fov*.5)/t.zoom;let a,l;Kh.elements[12]=-n,Jh.elements[12]=n,a=-o*t.aspect+r,l=o*t.aspect+r,Mi.elements[0]=2*t.near/(l-a),Mi.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(Mi),a=-o*t.aspect-r,l=o*t.aspect-r,Mi.elements[0]=2*t.near/(l-a),Mi.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(Mi)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Kh),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(Jh)}}class wu{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Qh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Qh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Qh(){return(typeof performance>"u"?Date:performance).now()}const bi=new P,ef=new Vt,VS=new P,wi=new P;class WS extends at{constructor(){super(),this.type="AudioListener",this.context=bu.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new wu}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,i=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(bi,ef,VS),wi.set(0,0,-1).applyQuaternion(ef),t.positionX){const n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(bi.x,n),t.positionY.linearRampToValueAtTime(bi.y,n),t.positionZ.linearRampToValueAtTime(bi.z,n),t.forwardX.linearRampToValueAtTime(wi.x,n),t.forwardY.linearRampToValueAtTime(wi.y,n),t.forwardZ.linearRampToValueAtTime(wi.z,n),t.upX.linearRampToValueAtTime(i.x,n),t.upY.linearRampToValueAtTime(i.y,n),t.upZ.linearRampToValueAtTime(i.z,n)}else t.setPosition(bi.x,bi.y,bi.z),t.setOrientation(wi.x,wi.y,wi.z,i.x,i.y,i.z)}}class Xp extends at{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){if(this.detune=e,this.source.detune!==void 0)return this.isPlaying===!0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}const Ei=new P,tf=new Vt,XS=new P,Ti=new P;class qS extends Xp{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,i){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=i,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ei,tf,XS),Ti.set(0,0,1).applyQuaternion(tf);const t=this.panner;if(t.positionX){const i=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Ei.x,i),t.positionY.linearRampToValueAtTime(Ei.y,i),t.positionZ.linearRampToValueAtTime(Ei.z,i),t.orientationX.linearRampToValueAtTime(Ti.x,i),t.orientationY.linearRampToValueAtTime(Ti.y,i),t.orientationZ.linearRampToValueAtTime(Ti.z,i)}else t.setPosition(Ei.x,Ei.y,Ei.z),t.setOrientation(Ti.x,Ti.y,Ti.z)}}class YS{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let i=0;i<t.length;i++)e+=t[i];return e/t.length}}class qp{constructor(e,t,i){this.binding=e,this.valueSize=i;let n,r,o;switch(t){case"quaternion":n=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":n=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:n=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=n,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const i=this.buffer,n=this.valueSize,r=e*n+n;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==n;++a)i[r+a]=i[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(i,r,0,a,n)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,i=this.valueSize,n=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,n,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,i=this.buffer,n=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(i,n,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(i,n,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){a.setValue(i,n);break}}saveOriginalState(){const e=this.binding,t=this.buffer,i=this.valueSize,n=i*this._origIndex;e.getValue(t,n);for(let r=i,o=n;r!==o;++r)t[r]=t[n+r%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,n,r){if(n>=.5)for(let o=0;o!==r;++o)e[t+o]=e[i+o]}_slerp(e,t,i,n){Vt.slerpFlat(e,t,e,t,e,i,n)}_slerpAdditive(e,t,i,n,r){const o=this._workIndex*r;Vt.multiplyQuaternionsFlat(e,o,e,t,e,i),Vt.slerpFlat(e,t,e,t,e,o,n)}_lerp(e,t,i,n,r){const o=1-n;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[i+a]*n}}_lerpAdditive(e,t,i,n,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[i+o]*n}}}const Eu="\\[\\]\\.:\\/",jS=new RegExp("["+Eu+"]","g"),Tu="[^"+Eu+"]",ZS="[^"+Eu.replace("\\.","")+"]",$S=/((?:WC+[\/:])*)/.source.replace("WC",Tu),JS=/(WCOD+)?/.source.replace("WCOD",ZS),KS=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Tu),QS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Tu),eM=new RegExp("^"+$S+JS+KS+QS+"$"),tM=["material","materials","bones","map"];class nM{constructor(e,t,i){const n=i||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class ot{constructor(e,t,i){this.path=t,this.parsedPath=i||ot.parseTrackName(t),this.node=ot.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new ot.Composite(e,t,i):new ot(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(jS,"")}static parseTrackName(e){const t=eM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){const r=i.nodeName.substring(n+1);tM.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=i(a.children);if(l)return l}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,n=t.propertyName;let r=t.propertyIndex;if(e||(e=ot.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[n];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ot.Composite=nM;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class iM{constructor(){this.isAnimationObjectGroup=!0,this.uuid=on(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let i=0,n=arguments.length;i!==n;++i)e[arguments[i].uuid]=i;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,i=this._paths,n=this._parsedPaths,r=this._bindings,o=r.length;let a,l=e.length,c=this.nCachedObjects_;for(let u=0,h=arguments.length;u!==h;++u){const f=arguments[u],d=f.uuid;let p=t[d];if(p===void 0){p=l++,t[d]=p,e.push(f);for(let _=0,g=o;_!==g;++_)r[_].push(new ot(f,i[_],n[_]))}else if(p<c){a=e[p];const _=--c,g=e[_];t[g.uuid]=p,e[p]=g,t[d]=_,e[_]=f;for(let m=0,y=o;m!==y;++m){const v=r[m],x=v[_];let S=v[p];v[p]=x,S===void 0&&(S=new ot(f,i[m],n[m])),v[_]=S}}else e[p]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,i=this._bindings,n=i.length;let r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){const l=arguments[o],c=l.uuid,u=t[c];if(u!==void 0&&u>=r){const h=r++,f=e[h];t[f.uuid]=u,e[u]=f,t[c]=h,e[h]=l;for(let d=0,p=n;d!==p;++d){const _=i[d],g=_[h],m=_[u];_[u]=g,_[h]=m}}}this.nCachedObjects_=r}uncache(){const e=this._objects,t=this._indicesByUUID,i=this._bindings,n=i.length;let r=this.nCachedObjects_,o=e.length;for(let a=0,l=arguments.length;a!==l;++a){const c=arguments[a],u=c.uuid,h=t[u];if(h!==void 0)if(delete t[u],h<r){const f=--r,d=e[f],p=--o,_=e[p];t[d.uuid]=h,e[h]=d,t[_.uuid]=f,e[f]=_,e.pop();for(let g=0,m=n;g!==m;++g){const y=i[g],v=y[f],x=y[p];y[h]=v,y[f]=x,y.pop()}}else{const f=--o,d=e[f];f>0&&(t[d.uuid]=h),e[h]=d,e.pop();for(let p=0,_=n;p!==_;++p){const g=i[p];g[h]=g[f],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){const i=this._bindingsIndicesByPath;let n=i[e];const r=this._bindings;if(n!==void 0)return r[n];const o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,h=new Array(c);n=r.length,i[e]=n,o.push(e),a.push(t),r.push(h);for(let f=u,d=l.length;f!==d;++f){const p=l[f];h[f]=new ot(p,e,t)}return h}unsubscribe_(e){const t=this._bindingsIndicesByPath,i=t[e];if(i!==void 0){const n=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=e[a];t[c]=i,o[i]=l,o.pop(),r[i]=r[a],r.pop(),n[i]=n[a],n.pop()}}}class Yp{constructor(e,t,i=null,n=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=n;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Ii,endingEnd:Ii};for(let c=0;c!==o;++c){const u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ld,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i){if(e.fadeOut(t),this.fadeIn(t),i){const n=this._clip.duration,r=e._clip.duration,o=r/n,a=n/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,i){return e.crossFadeFrom(this,t,i)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){const n=this._mixer,r=n.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=n._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+i,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,n){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case jc:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case ma:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulate(n,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const i=this._weightInterpolant;if(i!==null){const n=i.evaluate(e)[0];t*=n,e>i.parameterPositions[1]&&(this.stopFading(),n===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const i=this._timeScaleInterpolant;if(i!==null){const n=i.evaluate(e)[0];t*=n,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,i=this.loop;let n=this.time+e,r=this._loopCount;const o=i===Ud;if(e===0)return r===-1?n:o&&(r&1)===1?t-n:n;if(i===Pd){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(n>=t)n=t;else if(n<0)n=0;else{this.time=n;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=n,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),n>=t||n<0){const a=Math.floor(n/t);n-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,n=e>0?t:0,this.time=n,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=n,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=n;if(o&&(r&1)===1)return t-n}return n}_setEndings(e,t,i){const n=this._interpolantSettings;i?(n.endingStart=Di,n.endingEnd=Di):(e?n.endingStart=this.zeroSlopeAtStart?Di:Ii:n.endingStart=Ms,t?n.endingEnd=this.zeroSlopeAtEnd?Di:Ii:n.endingEnd=Ms)}_scheduleFading(e,t,i){const n=this._mixer,r=n.time;let o=this._weightInterpolant;o===null&&(o=n._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=i,this}}const rM=new Float32Array(1);class sM extends Yn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const i=e._localRoot||this._root,n=e._clip.tracks,r=n.length,o=e._propertyBindings,a=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==r;++h){const f=n[h],d=f.name;let p=u[d];if(p!==void 0)++p.referenceCount,o[h]=p;else{if(p=o[h],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,d));continue}const _=t&&t._propertyBindings[h].binding.parsedPath;p=new qp(ot.create(i,d,_),f.ValueTypeName,f.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,d),o[h]=p}a[h].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const i=(e._localRoot||this._root).uuid,n=e._clip.uuid,r=this._actionsByClip[n];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,n,i)}const t=e._propertyBindings;for(let i=0,n=t.length;i!==n;++i){const r=t[i];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let i=0,n=t.length;i!==n;++i){const r=t[i];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){const n=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=n.length,n.push(e),o.actionByRoot[i]=e}_removeInactiveAction(e){const t=this._actions,i=t[t.length-1],n=e._cacheIndex;i._cacheIndex=n,t[n]=i,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let i=0,n=t.length;i!==n;++i){const r=t[i];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,i=e._cacheIndex,n=this._nActiveActions++,r=t[n];e._cacheIndex=n,t[n]=e,r._cacheIndex=i,t[i]=r}_takeBackAction(e){const t=this._actions,i=e._cacheIndex,n=--this._nActiveActions,r=t[n];e._cacheIndex=n,t[n]=e,r._cacheIndex=i,t[i]=r}_addInactiveBinding(e,t,i){const n=this._bindingsByRootAndName,r=this._bindings;let o=n[t];o===void 0&&(o={},n[t]=o),o[i]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,i=e.binding,n=i.rootNode.uuid,r=i.path,o=this._bindingsByRootAndName,a=o[n],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[n]}_lendBinding(e){const t=this._bindings,i=e._cacheIndex,n=this._nActiveBindings++,r=t[n];e._cacheIndex=n,t[n]=e,r._cacheIndex=i,t[i]=r}_takeBackBinding(e){const t=this._bindings,i=e._cacheIndex,n=--this._nActiveBindings,r=t[n];e._cacheIndex=n,t[n]=e,r._cacheIndex=i,t[i]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let i=e[t];return i===void 0&&(i=new yu(new Float32Array(2),new Float32Array(2),1,rM),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){const t=this._controlInterpolants,i=e.__cacheIndex,n=--this._nActiveControlInterpolants,r=t[n];e.__cacheIndex=n,t[n]=e,r.__cacheIndex=i,t[i]=r}clipAction(e,t,i){const n=t||this._root,r=n.uuid;let o=typeof e=="string"?Ds.findByName(n,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(i===void 0&&(o!==null?i=o.blendMode:i=ma),l!==void 0){const h=l.actionByRoot[r];if(h!==void 0&&h.blendMode===i)return h;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const u=new Yp(this,o,t,i);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){const i=t||this._root,n=i.uuid,r=typeof e=="string"?Ds.findByName(i,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[n]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;const t=this._actions,i=this._nActiveActions,n=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(n,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,i=e.uuid,n=this._actionsByClip,r=n[i];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete n[i]}}uncacheRoot(e){const t=e.uuid,i=this._actionsByClip;for(const o in i){const a=i[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const n=this._bindingsByRootAndName,r=n[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}}class Au{constructor(e){this.value=e}clone(){return new Au(this.value.clone===void 0?this.value:this.value.clone())}}let oM=0;class aM extends Yn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:oM++}),this.name="",this.usage=Ts,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let i=0,n=t.length;i<n;i++)this.uniforms.push(t[i].clone());return this}clone(){return new this.constructor().copy(this)}}class ua extends wa{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class lM{constructor(e,t,i,n,r){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=i,this.elementSize=n,this.count=r,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}class jp{constructor(e,t,i=0,n=1/0){this.ray=new $i(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new zi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Uc(e,this,i,t),i.sort(nf),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)Uc(e[n],this,i,t);return i.sort(nf),i}}function nf(s,e){return s.distance-e.distance}function Uc(s,e,t,i){if(s.layers.test(e.layers)&&s.raycast(e,t),i===!0){const n=s.children;for(let r=0,o=n.length;r<o;r++)Uc(n[r],e,t,!0)}}class Ic{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(vt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class cM{constructor(e=1,t=0,i=0){return this.radius=e,this.theta=t,this.y=i,this}set(e,t,i){return this.radius=e,this.theta=t,this.y=i,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+i*i),this.theta=Math.atan2(e,i),this.y=t,this}clone(){return new this.constructor().copy(this)}}const rf=new se;class uM{constructor(e=new se(1/0,1/0),t=new se(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=rf.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y)}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,rf).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const sf=new P,Oo=new P;class Zp{constructor(e=new P,t=new P){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){sf.subVectors(e,this.start),Oo.subVectors(this.end,this.start);const i=Oo.dot(Oo);let r=Oo.dot(sf)/i;return t&&(r=vt(r,0,1)),r}closestPointToPoint(e,t,i){const n=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(n).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const of=new P;class hM extends at{constructor(e,t){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const i=new et,n=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){const c=o/l*Math.PI*2,u=a/l*Math.PI*2;n.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}i.setAttribute("position",new Oe(n,3));const r=new Zt({fog:!1,toneMapped:!1});this.cone=new Ln(i,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),of.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(of),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const ti=new P,Fo=new Ve,Rl=new Ve;class fM extends Ln{constructor(e){const t=$p(e),i=new et,n=[],r=[],o=new Re(0,0,1),a=new Re(0,1,0);for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(n.push(0,0,0),n.push(0,0,0),r.push(o.r,o.g,o.b),r.push(a.r,a.g,a.b))}i.setAttribute("position",new Oe(n,3)),i.setAttribute("color",new Oe(r,3));const l=new Zt({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(i,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,i=this.geometry,n=i.getAttribute("position");Rl.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){const a=t[r];a.parent&&a.parent.isBone&&(Fo.multiplyMatrices(Rl,a.matrixWorld),ti.setFromMatrixPosition(Fo),n.setXYZ(o,ti.x,ti.y,ti.z),Fo.multiplyMatrices(Rl,a.parent.matrixWorld),ti.setFromMatrixPosition(Fo),n.setXYZ(o+1,ti.x,ti.y,ti.z),o+=2)}i.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose()}}function $p(s){const e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push.apply(e,$p(s.children[t]));return e}class dM extends mt{constructor(e,t,i){const n=new Xs(t,4,2),r=new jn({wireframe:!0,fog:!1,toneMapped:!1});super(n,r),this.light=e,this.color=i,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const pM=new P,af=new Re,lf=new Re;class mM extends at{constructor(e,t,i){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=i,this.type="HemisphereLightHelper";const n=new Ws(t);n.rotateY(Math.PI*.5),this.material=new jn({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const r=n.getAttribute("position"),o=new Float32Array(r.count*3);n.setAttribute("color",new ct(o,3)),this.add(new mt(n,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");af.copy(this.light.color),lf.copy(this.light.groundColor);for(let i=0,n=t.count;i<n;i++){const r=i<n/2?af:lf;t.setXYZ(i,r.r,r.g,r.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(pM.setFromMatrixPosition(this.light.matrixWorld).negate())}}class gM extends Ln{constructor(e=10,t=10,i=4473924,n=8947848){i=new Re(i),n=new Re(n);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let f=0,d=0,p=-a;f<=t;f++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);const _=f===r?i:n;_.toArray(c,d),d+=3,_.toArray(c,d),d+=3,_.toArray(c,d),d+=3,_.toArray(c,d),d+=3}const u=new et;u.setAttribute("position",new Oe(l,3)),u.setAttribute("color",new Oe(c,3));const h=new Zt({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class _M extends Ln{constructor(e=10,t=16,i=8,n=64,r=4473924,o=8947848){r=new Re(r),o=new Re(o);const a=[],l=[];if(t>1)for(let h=0;h<t;h++){const f=h/t*(Math.PI*2),d=Math.sin(f)*e,p=Math.cos(f)*e;a.push(0,0,0),a.push(d,0,p);const _=h&1?r:o;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let h=0;h<i;h++){const f=h&1?r:o,d=e-e/i*h;for(let p=0;p<n;p++){let _=p/n*(Math.PI*2),g=Math.sin(_)*d,m=Math.cos(_)*d;a.push(g,0,m),l.push(f.r,f.g,f.b),_=(p+1)/n*(Math.PI*2),g=Math.sin(_)*d,m=Math.cos(_)*d,a.push(g,0,m),l.push(f.r,f.g,f.b)}}const c=new et;c.setAttribute("position",new Oe(a,3)),c.setAttribute("color",new Oe(l,3));const u=new Zt({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const cf=new P,No=new P,uf=new P;class vM extends at{constructor(e,t,i){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=i,this.type="DirectionalLightHelper",t===void 0&&(t=1);let n=new et;n.setAttribute("position",new Oe([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const r=new Zt({fog:!1,toneMapped:!1});this.lightPlane=new ci(n,r),this.add(this.lightPlane),n=new et,n.setAttribute("position",new Oe([0,0,0,0,0,1],3)),this.targetLine=new ci(n,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),cf.setFromMatrixPosition(this.light.matrixWorld),No.setFromMatrixPosition(this.light.target.matrixWorld),uf.subVectors(No,cf),this.lightPlane.lookAt(No),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(No),this.targetLine.scale.z=uf.length()}}const Bo=new P,_t=new ks;class yM extends Ln{constructor(e){const t=new et,i=new Zt({color:16777215,vertexColors:!0,toneMapped:!1}),n=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){l(p),l(_)}function l(p){n.push(0,0,0),r.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(n.length/3-1)}t.setAttribute("position",new Oe(n,3)),t.setAttribute("color",new Oe(r,3)),super(t,i),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const c=new Re(16755200),u=new Re(16711680),h=new Re(43775),f=new Re(16777215),d=new Re(3355443);this.setColors(c,u,h,f,d)}setColors(e,t,i,n,r){const a=this.geometry.getAttribute("color");a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,i.r,i.g,i.b),a.setXYZ(33,i.r,i.g,i.b),a.setXYZ(34,i.r,i.g,i.b),a.setXYZ(35,i.r,i.g,i.b),a.setXYZ(36,i.r,i.g,i.b),a.setXYZ(37,i.r,i.g,i.b),a.setXYZ(38,n.r,n.g,n.b),a.setXYZ(39,n.r,n.g,n.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,i=1,n=1;_t.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),St("c",t,e,_t,0,0,-1),St("t",t,e,_t,0,0,1),St("n1",t,e,_t,-i,-n,-1),St("n2",t,e,_t,i,-n,-1),St("n3",t,e,_t,-i,n,-1),St("n4",t,e,_t,i,n,-1),St("f1",t,e,_t,-i,-n,1),St("f2",t,e,_t,i,-n,1),St("f3",t,e,_t,-i,n,1),St("f4",t,e,_t,i,n,1),St("u1",t,e,_t,i*.7,n*1.1,-1),St("u2",t,e,_t,-i*.7,n*1.1,-1),St("u3",t,e,_t,0,n*2,-1),St("cf1",t,e,_t,-i,0,1),St("cf2",t,e,_t,i,0,1),St("cf3",t,e,_t,0,-n,1),St("cf4",t,e,_t,0,n,1),St("cn1",t,e,_t,-i,0,-1),St("cn2",t,e,_t,i,0,-1),St("cn3",t,e,_t,0,-n,-1),St("cn4",t,e,_t,0,n,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function St(s,e,t,i,n,r,o){Bo.set(n,r,o).unproject(i);const a=e[s];if(a!==void 0){const l=t.getAttribute("position");for(let c=0,u=a.length;c<u;c++)l.setXYZ(a[c],Bo.x,Bo.y,Bo.z)}}const zo=new Et;class xM extends Ln{constructor(e,t=16776960){const i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),n=new Float32Array(8*3),r=new et;r.setIndex(new ct(i,1)),r.setAttribute("position",new ct(n,3)),super(r,new Zt({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(e){if(e!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&zo.setFromObject(this.object),zo.isEmpty())return;const t=zo.min,i=zo.max,n=this.geometry.attributes.position,r=n.array;r[0]=i.x,r[1]=i.y,r[2]=i.z,r[3]=t.x,r[4]=i.y,r[5]=i.z,r[6]=t.x,r[7]=t.y,r[8]=i.z,r[9]=i.x,r[10]=t.y,r[11]=i.z,r[12]=i.x,r[13]=i.y,r[14]=t.z,r[15]=t.x,r[16]=i.y,r[17]=t.z,r[18]=t.x,r[19]=t.y,r[20]=t.z,r[21]=i.x,r[22]=t.y,r[23]=t.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class SM extends Ln{constructor(e,t=16776960){const i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),n=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new et;r.setIndex(new ct(i,1)),r.setAttribute("position",new Oe(n,3)),super(r,new Zt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class MM extends ci{constructor(e,t=1,i=16776960){const n=i,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new et;o.setAttribute("position",new Oe(r,3)),o.computeBoundingSphere(),super(o,new Zt({color:n,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new et;l.setAttribute("position",new Oe(a,3)),l.computeBoundingSphere(),this.add(new mt(l,new jn({color:n,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const hf=new P;let ko,Pl;class bM extends at{constructor(e=new P(0,0,1),t=new P(0,0,0),i=1,n=16776960,r=i*.2,o=r*.2){super(),this.type="ArrowHelper",ko===void 0&&(ko=new et,ko.setAttribute("position",new Oe([0,0,0,0,1,0],3)),Pl=new Wr(0,.5,1,5,1),Pl.translate(0,-.5,0)),this.position.copy(t),this.line=new ci(ko,new Zt({color:n,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new mt(Pl,new jn({color:n,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{hf.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(hf,t)}}setLength(e,t=e*.2,i=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(i,t,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class wM extends Ln{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],n=new et;n.setAttribute("position",new Oe(t,3)),n.setAttribute("color",new Oe(i,3));const r=new Zt({vertexColors:!0,toneMapped:!1});super(n,r),this.type="AxesHelper"}setColors(e,t,i){const n=new Re,r=this.geometry.attributes.color.array;return n.set(e),n.toArray(r,0),n.toArray(r,3),n.set(t),n.toArray(r,6),n.toArray(r,9),n.set(i),n.toArray(r,12),n.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class EM{constructor(){this.type="ShapePath",this.color=new Re,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Cs,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,i,n){return this.currentPath.quadraticCurveTo(e,t,i,n),this}bezierCurveTo(e,t,i,n,r,o){return this.currentPath.bezierCurveTo(e,t,i,n,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(m){const y=[];for(let v=0,x=m.length;v<x;v++){const S=m[v],b=new Gi;b.curves=S.curves,y.push(b)}return y}function i(m,y){const v=y.length;let x=!1;for(let S=v-1,b=0;b<v;S=b++){let E=y[S],A=y[b],M=A.x-E.x,w=A.y-E.y;if(Math.abs(w)>Number.EPSILON){if(w<0&&(E=y[b],M=-M,A=y[S],w=-w),m.y<E.y||m.y>A.y)continue;if(m.y===E.y){if(m.x===E.x)return!0}else{const I=w*(m.x-E.x)-M*(m.y-E.y);if(I===0)return!0;if(I<0)continue;x=!x}}else{if(m.y!==E.y)continue;if(A.x<=m.x&&m.x<=E.x||E.x<=m.x&&m.x<=A.x)return!0}}return x}const n=Rn.isClockWise,r=this.subPaths;if(r.length===0)return[];let o,a,l;const c=[];if(r.length===1)return a=r[0],l=new Gi,l.curves=a.curves,c.push(l),c;let u=!n(r[0].getPoints());u=e?!u:u;const h=[],f=[];let d=[],p=0,_;f[p]=void 0,d[p]=[];for(let m=0,y=r.length;m<y;m++)a=r[m],_=a.getPoints(),o=n(_),o=e?!o:o,o?(!u&&f[p]&&p++,f[p]={s:new Gi,p:_},f[p].s.curves=a.curves,u&&p++,d[p]=[]):d[p].push({h:a,p:_[0]});if(!f[0])return t(r);if(f.length>1){let m=!1,y=0;for(let v=0,x=f.length;v<x;v++)h[v]=[];for(let v=0,x=f.length;v<x;v++){const S=d[v];for(let b=0;b<S.length;b++){const E=S[b];let A=!0;for(let M=0;M<f.length;M++)i(E.p,f[M].p)&&(v!==M&&y++,A?(A=!1,h[M].push(E)):m=!0);A&&h[v].push(E)}}y>0&&m===!1&&(d=h)}let g;for(let m=0,y=f.length;m<y;m++){l=f[m].s,c.push(l),g=d[m];for(let v=0,x=g.length;v<x;v++)l.holes.push(g[v].h)}return c}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gr);const TM=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:zc,AddEquation:ni,AddOperation:gd,AdditiveAnimationBlendMode:jc,AdditiveBlending:Xl,AlphaFormat:wd,AlwaysCompare:Gd,AlwaysDepth:cd,AlwaysStencilFunc:Mc,AmbientLight:kp,AnimationAction:Yp,AnimationClip:Ds,AnimationLoader:PS,AnimationMixer:sM,AnimationObjectGroup:iM,AnimationUtils:TS,ArcCurve:fp,ArrayCamera:np,ArrowHelper:bM,AttachedBindMode:$l,Audio:Xp,AudioAnalyser:YS,AudioContext:bu,AudioListener:WS,AudioLoader:GS,AxesHelper:wM,BackSide:Ht,BasicDepthPacking:Id,BasicShadowMap:Xf,BatchedMesh:cp,Bone:lu,BooleanKeyframeTrack:Ki,Box2:uM,Box3:Et,Box3Helper:SM,BoxGeometry:Ji,BoxHelper:xM,BufferAttribute:ct,BufferGeometry:et,BufferGeometryLoader:Wp,ByteType:Md,Cache:Zi,Camera:ks,CameraHelper:yM,CanvasTexture:$x,CapsuleGeometry:Ca,CatmullRomCurve3:dp,CineonToneMapping:yd,CircleGeometry:Ra,ClampToEdgeWrapping:Gt,Clock:wu,Color:Re,ColorKeyframeTrack:xu,ColorManagement:lt,CompressedArrayTexture:jx,CompressedCubeTexture:Zx,CompressedTexture:Ta,CompressedTextureLoader:LS,ConeGeometry:Pa,ConstantAlphaFactor:od,ConstantColorFactor:rd,CubeCamera:Yd,CubeReflectionMapping:Xn,CubeRefractionMapping:ai,CubeTexture:Gs,CubeTextureLoader:US,CubeUVReflectionMapping:Hr,CubicBezierCurve:hu,CubicBezierCurve3:pp,CubicInterpolant:Up,CullFaceBack:Wl,CullFaceFront:Wf,CullFaceFrontBack:zm,CullFaceNone:Vf,Curve:Sn,CurvePath:gp,CustomBlending:qf,CustomToneMapping:xd,CylinderGeometry:Wr,Cylindrical:cM,Data3DTexture:tu,DataArrayTexture:_a,DataTexture:ki,DataTextureLoader:IS,DataUtils:jg,DecrementStencilOp:Jm,DecrementWrapStencilOp:Qm,DefaultLoadingManager:Op,DepthFormat:ri,DepthStencilFormat:qi,DepthTexture:va,DetachedBindMode:Sd,DirectionalLight:zp,DirectionalLightHelper:vM,DiscreteInterpolant:Ip,DisplayP3ColorSpace:ga,DodecahedronGeometry:La,DoubleSide:yn,DstAlphaFactor:Qf,DstColorFactor:td,DynamicCopyUsage:pg,DynamicDrawUsage:lg,DynamicReadUsage:hg,EdgesGeometry:_p,EllipseCurve:Aa,EqualCompare:Nd,EqualDepth:hd,EqualStencilFunc:ig,EquirectangularReflectionMapping:gs,EquirectangularRefractionMapping:_s,Euler:zs,EventDispatcher:Yn,ExtrudeGeometry:Ia,FileLoader:qn,Float16BufferAttribute:e0,Float32BufferAttribute:Oe,Float64BufferAttribute:t0,FloatType:cn,Fog:ba,FogExp2:Ma,FramebufferTexture:Yx,FrontSide:Wn,Frustum:Hs,GLBufferAttribute:lM,GLSL1:gg,GLSL3:bc,GreaterCompare:Bd,GreaterDepth:dd,GreaterEqualCompare:kd,GreaterEqualDepth:fd,GreaterEqualStencilFunc:ag,GreaterStencilFunc:sg,GridHelper:gM,Group:Ir,HalfFloatType:Xi,HemisphereLight:Fp,HemisphereLightHelper:mM,IcosahedronGeometry:Da,ImageBitmapLoader:kS,ImageLoader:Os,ImageUtils:eu,IncrementStencilOp:$m,IncrementWrapStencilOp:Km,InstancedBufferAttribute:Yi,InstancedBufferGeometry:Ha,InstancedInterleavedBuffer:ua,InstancedMesh:lp,Int16BufferAttribute:Kg,Int32BufferAttribute:Qg,Int8BufferAttribute:Zg,IntType:Gc,InterleavedBuffer:wa,InterleavedBufferAttribute:sn,Interpolant:qs,InterpolateDiscrete:xs,InterpolateLinear:Ss,InterpolateSmooth:ea,InvertStencilOp:eg,KeepStencilOp:Pi,KeyframeTrack:Mn,LOD:op,LatheGeometry:Vs,Layers:zi,LessCompare:Fd,LessDepth:ud,LessEqualCompare:Jc,LessEqualDepth:ms,LessEqualStencilFunc:rg,LessStencilFunc:ng,Light:di,LightProbe:Vp,Line:ci,Line3:Zp,LineBasicMaterial:Zt,LineCurve:fu,LineCurve3:mp,LineDashedMaterial:Rp,LineLoop:up,LineSegments:Ln,LinearDisplayP3ColorSpace:Bs,LinearEncoding:Zc,LinearFilter:ft,LinearInterpolant:yu,LinearMipMapLinearFilter:Wm,LinearMipMapNearestFilter:Vm,LinearMipmapLinearFilter:li,LinearMipmapNearestFilter:kc,LinearSRGBColorSpace:Pn,LinearToneMapping:_d,LinearTransfer:bs,Loader:Qt,LoaderUtils:Lc,LoadingManager:Su,LoopOnce:Pd,LoopPingPong:Ud,LoopRepeat:Ld,LuminanceAlphaFormat:Td,LuminanceFormat:Ed,MOUSE:Ci,Material:Wt,MaterialLoader:Ga,MathUtils:Qc,Matrix3:Ke,Matrix4:Ve,MaxEquation:Zl,Mesh:mt,MeshBasicMaterial:jn,MeshDepthMaterial:xa,MeshDistanceMaterial:Sa,MeshLambertMaterial:Ap,MeshMatcapMaterial:Cp,MeshNormalMaterial:Tp,MeshPhongMaterial:wp,MeshPhysicalMaterial:bp,MeshStandardMaterial:_u,MeshToonMaterial:Ep,MinEquation:jl,MirroredRepeatWrapping:ys,MixOperation:md,MultiplyBlending:Yl,MultiplyOperation:Ns,NearestFilter:Mt,NearestMipMapLinearFilter:Hm,NearestMipMapNearestFilter:Gm,NearestMipmapLinearFilter:us,NearestMipmapNearestFilter:oa,NeverCompare:Od,NeverDepth:ld,NeverStencilFunc:tg,NoBlending:Vn,NoColorSpace:rn,NoToneMapping:An,NormalAnimationBlendMode:ma,NormalBlending:Ni,NotEqualCompare:zd,NotEqualDepth:pd,NotEqualStencilFunc:og,NumberKeyframeTrack:Us,Object3D:at,ObjectLoader:BS,ObjectSpaceNormalMap:Dd,OctahedronGeometry:Ws,OneFactor:$f,OneMinusConstantAlphaFactor:ad,OneMinusConstantColorFactor:sd,OneMinusDstAlphaFactor:ed,OneMinusDstColorFactor:nd,OneMinusSrcAlphaFactor:sa,OneMinusSrcColorFactor:Kf,OrthographicCamera:oi,P3Primaries:Es,PCFShadowMap:fa,PCFSoftShadowMap:cs,PMREMGenerator:Ec,Path:Cs,PerspectiveCamera:bt,Plane:En,PlaneGeometry:hi,PlaneHelper:MM,PointLight:Bp,PointLightHelper:dM,Points:hp,PointsMaterial:cu,PolarGridHelper:_M,PolyhedronGeometry:fi,PositionalAudio:qS,PropertyBinding:ot,PropertyMixer:qp,QuadraticBezierCurve:du,QuadraticBezierCurve3:pu,Quaternion:Vt,QuaternionKeyframeTrack:Xr,QuaternionLinearInterpolant:Dp,RED_GREEN_RGTC2_Format:xc,RED_RGTC1_Format:Rd,REVISION:Gr,RGBADepthPacking:$c,RGBAFormat:jt,RGBAIntegerFormat:qc,RGBA_ASTC_10x10_Format:pc,RGBA_ASTC_10x5_Format:hc,RGBA_ASTC_10x6_Format:fc,RGBA_ASTC_10x8_Format:dc,RGBA_ASTC_12x10_Format:mc,RGBA_ASTC_12x12_Format:gc,RGBA_ASTC_4x4_Format:ic,RGBA_ASTC_5x4_Format:rc,RGBA_ASTC_5x5_Format:sc,RGBA_ASTC_6x5_Format:oc,RGBA_ASTC_6x6_Format:ac,RGBA_ASTC_8x5_Format:lc,RGBA_ASTC_8x6_Format:cc,RGBA_ASTC_8x8_Format:uc,RGBA_BPTC_Format:Qo,RGBA_ETC2_EAC_Format:nc,RGBA_PVRTC_2BPPV1_Format:ec,RGBA_PVRTC_4BPPV1_Format:Ql,RGBA_S3TC_DXT1_Format:$o,RGBA_S3TC_DXT3_Format:Jo,RGBA_S3TC_DXT5_Format:Ko,RGB_BPTC_SIGNED_Format:_c,RGB_BPTC_UNSIGNED_Format:vc,RGB_ETC1_Format:Yc,RGB_ETC2_Format:tc,RGB_PVRTC_2BPPV1_Format:Kl,RGB_PVRTC_4BPPV1_Format:Jl,RGB_S3TC_DXT1_Format:Zo,RGFormat:Cd,RGIntegerFormat:Xc,RawShaderMaterial:Mp,Ray:$i,Raycaster:jp,Rec709Primaries:ws,RectAreaLight:Gp,RedFormat:Ad,RedIntegerFormat:Wc,ReinhardToneMapping:vd,RenderTarget:Wd,RepeatWrapping:vs,ReplaceStencilOp:Zm,ReverseSubtractEquation:jf,RingGeometry:Oa,SIGNED_RED_GREEN_RGTC2_Format:Sc,SIGNED_RED_RGTC1_Format:yc,SRGBColorSpace:Tt,SRGBTransfer:ut,Scene:ou,ShaderChunk:$e,ShaderLib:vn,ShaderMaterial:hn,ShadowMaterial:Sp,Shape:Gi,ShapeGeometry:Fa,ShapePath:EM,ShapeUtils:Rn,ShortType:bd,Skeleton:Ea,SkeletonHelper:fM,SkinnedMesh:ap,Source:Oi,Sphere:At,SphereGeometry:Xs,Spherical:Ic,SphericalHarmonics3:Hp,SplineCurve:mu,SpotLight:Np,SpotLightHelper:hM,Sprite:sp,SpriteMaterial:au,SrcAlphaFactor:ra,SrcAlphaSaturateFactor:id,SrcColorFactor:Jf,StaticCopyUsage:dg,StaticDrawUsage:Ts,StaticReadUsage:ug,StereoCamera:HS,StreamCopyUsage:mg,StreamDrawUsage:cg,StreamReadUsage:fg,StringKeyframeTrack:Qi,SubtractEquation:Yf,SubtractiveBlending:ql,TOUCH:Ri,TangentSpaceNormalMap:ui,TetrahedronGeometry:Na,Texture:yt,TextureLoader:DS,TorusGeometry:Ba,TorusKnotGeometry:za,Triangle:Jt,TriangleFanDrawMode:Ym,TriangleStripDrawMode:qm,TrianglesDrawMode:Xm,TubeGeometry:ka,TwoPassDoubleSide:km,UVMapping:da,Uint16BufferAttribute:nu,Uint32BufferAttribute:iu,Uint8BufferAttribute:$g,Uint8ClampedBufferAttribute:Jg,Uniform:Au,UniformsGroup:aM,UniformsLib:we,UniformsUtils:zr,UnsignedByteType:Cn,UnsignedInt248Type:ii,UnsignedIntType:Hn,UnsignedShort4444Type:Hc,UnsignedShort5551Type:Vc,UnsignedShortType:pa,VSMShadowMap:gn,Vector2:se,Vector3:P,Vector4:it,VectorKeyframeTrack:Is,VideoTexture:qx,WebGL1Renderer:ip,WebGL3DRenderTarget:Fg,WebGLArrayRenderTarget:Og,WebGLCoordinateSystem:xn,WebGLCubeRenderTarget:jd,WebGLMultipleRenderTargets:Ng,WebGLRenderTarget:un,WebGLRenderer:su,WebGLUtils:tp,WebGPUCoordinateSystem:Fr,WireframeGeometry:gu,WrapAroundEnding:Ms,ZeroCurvatureEnding:Ii,ZeroFactor:Zf,ZeroSlopeEnding:Di,ZeroStencilOp:jm,_SRGBAFormat:aa,createCanvasElement:Vd,sRGBEncoding:si},Symbol.toStringTag,{value:"Module"}));function AM(s){let e;const t=new Set,i=(c,u)=>{const h=typeof c=="function"?c(e):c;if(h!==e){const f=e;e=u?h:Object.assign({},e,h),t.forEach(d=>d(e,f))}},n=()=>e,r=(c,u=n,h=Object.is)=>{console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");let f=u(e);function d(){const p=u(e);if(!h(f,p)){const _=f;c(f=p,_)}}return t.add(d),()=>t.delete(d)},l={setState:i,getState:n,subscribe:(c,u,h)=>u||h?r(c,u,h):(t.add(c),()=>t.delete(c)),destroy:()=>t.clear()};return e=s(i,n,l),l}const CM=typeof window>"u"||!window.navigator||/ServerSideRendering|^Deno\//.test(window.navigator.userAgent),ff=CM?Ce.useEffect:Ce.useLayoutEffect;function RM(s){const e=typeof s=="function"?AM(s):s,t=(i=e.getState,n=Object.is)=>{const[,r]=Ce.useReducer(g=>g+1,0),o=e.getState(),a=Ce.useRef(o),l=Ce.useRef(i),c=Ce.useRef(n),u=Ce.useRef(!1),h=Ce.useRef();h.current===void 0&&(h.current=i(o));let f,d=!1;(a.current!==o||l.current!==i||c.current!==n||u.current)&&(f=i(o),d=!n(h.current,f)),ff(()=>{d&&(h.current=f),a.current=o,l.current=i,c.current=n,u.current=!1});const p=Ce.useRef(o);ff(()=>{const g=()=>{try{const y=e.getState(),v=l.current(y);c.current(h.current,v)||(a.current=y,h.current=v,r())}catch{u.current=!0,r()}},m=e.subscribe(g);return e.getState()!==p.current&&g(),m},[]);const _=d?f:h.current;return Ce.useDebugValue(_),_};return Object.assign(t,e),t[Symbol.iterator]=function(){console.warn("[useStore, api] = create() is deprecated and will be removed in v4");const i=[t,e];return{next(){const n=i.length<=0;return{value:i.shift(),done:n}}}},t}const Cu={},Jp=s=>void Object.assign(Cu,s);function PM(s,e){function t(u,{args:h=[],attach:f,...d},p){let _=`${u[0].toUpperCase()}${u.slice(1)}`,g;if(u==="primitive"){if(d.object===void 0)throw new Error("R3F: Primitives without 'object' are invalid!");const m=d.object;g=Ar(m,{type:u,root:p,attach:f,primitive:!0})}else{const m=Cu[_];if(!m)throw new Error(`R3F: ${_} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);if(!Array.isArray(h))throw new Error("R3F: The args prop must be an array!");g=Ar(new m(...h),{type:u,root:p,attach:f,memoizedProps:{args:h}})}return g.__r3f.attach===void 0&&(g.isBufferGeometry?g.__r3f.attach="geometry":g.isMaterial&&(g.__r3f.attach="material")),_!=="inject"&&Il(g,d),g}function i(u,h){let f=!1;if(h){var d,p;(d=h.__r3f)!=null&&d.attach?Ul(u,h,h.__r3f.attach):h.isObject3D&&u.isObject3D&&(u.add(h),f=!0),f||(p=u.__r3f)==null||p.objects.push(h),h.__r3f||Ar(h,{}),h.__r3f.parent=u,Oc(h),Cr(h)}}function n(u,h,f){let d=!1;if(h){var p,_;if((p=h.__r3f)!=null&&p.attach)Ul(u,h,h.__r3f.attach);else if(h.isObject3D&&u.isObject3D){h.parent=u,h.dispatchEvent({type:"added"}),u.dispatchEvent({type:"childadded",child:h});const g=u.children.filter(y=>y!==h),m=g.indexOf(f);u.children=[...g.slice(0,m),h,...g.slice(m)],d=!0}d||(_=u.__r3f)==null||_.objects.push(h),h.__r3f||Ar(h,{}),h.__r3f.parent=u,Oc(h),Cr(h)}}function r(u,h,f=!1){u&&[...u].forEach(d=>o(h,d,f))}function o(u,h,f){if(h){var d,p,_;if(h.__r3f&&(h.__r3f.parent=null),(d=u.__r3f)!=null&&d.objects&&(u.__r3f.objects=u.__r3f.objects.filter(x=>x!==h)),(p=h.__r3f)!=null&&p.attach)_f(u,h,h.__r3f.attach);else if(h.isObject3D&&u.isObject3D){var g;u.remove(h),(g=h.__r3f)!=null&&g.root&&BM(na(h),h)}const y=(_=h.__r3f)==null?void 0:_.primitive,v=!y&&(f===void 0?h.dispose!==null:f);if(!y){var m;r((m=h.__r3f)==null?void 0:m.objects,h,v),r(h.children,h,v)}if(delete h.__r3f,v&&h.dispose&&h.type!=="Scene"){const x=()=>{try{h.dispose()}catch{}};typeof IS_REACT_ACT_ENVIRONMENT>"u"?Ou.unstable_scheduleCallback(Ou.unstable_IdlePriority,x):x()}Cr(u)}}function a(u,h,f,d){var p;const _=(p=u.__r3f)==null?void 0:p.parent;if(!_)return;const g=t(h,f,u.__r3f.root);if(u.children){for(const m of u.children)m.__r3f&&i(g,m);u.children=u.children.filter(m=>!m.__r3f)}u.__r3f.objects.forEach(m=>i(g,m)),u.__r3f.objects=[],u.__r3f.autoRemovedBeforeAppend||o(_,u),g.parent&&(g.__r3f.autoRemovedBeforeAppend=!0),i(_,g),g.raycast&&g.__r3f.eventCount&&na(g).getState().internal.interaction.push(g),[d,d.alternate].forEach(m=>{m!==null&&(m.stateNode=g,m.ref&&(typeof m.ref=="function"?m.ref(g):m.ref.current=g))})}const l=()=>{};return{reconciler:Lm({createInstance:t,removeChild:o,appendChild:i,appendInitialChild:i,insertBefore:n,supportsMutation:!0,isPrimaryRenderer:!1,supportsPersistence:!1,supportsHydration:!1,noTimeout:-1,appendChildToContainer:(u,h)=>{if(!h)return;const f=u.getState().scene;f.__r3f&&(f.__r3f.root=u,i(f,h))},removeChildFromContainer:(u,h)=>{h&&o(u.getState().scene,h)},insertInContainerBefore:(u,h,f)=>{if(!h||!f)return;const d=u.getState().scene;d.__r3f&&n(d,h,f)},getRootHostContext:()=>null,getChildHostContext:u=>u,finalizeInitialChildren(u){var h;return!!((h=u==null?void 0:u.__r3f)!=null?h:{}).handlers},prepareUpdate(u,h,f,d){var p;if(((p=u==null?void 0:u.__r3f)!=null?p:{}).primitive&&d.object&&d.object!==u)return[!0];{const{args:g=[],children:m,...y}=d,{args:v=[],children:x,...S}=f;if(!Array.isArray(g))throw new Error("R3F: the args prop must be an array!");if(g.some((E,A)=>E!==v[A]))return[!0];const b=rm(u,y,S,!0);return b.changes.length?[!1,b]:null}},commitUpdate(u,[h,f],d,p,_,g){h?a(u,d,_,g):Il(u,f)},commitMount(u,h,f,d){var p;const _=(p=u.__r3f)!=null?p:{};u.raycast&&_.handlers&&_.eventCount&&na(u).getState().internal.interaction.push(u)},getPublicInstance:u=>u,prepareForCommit:()=>null,preparePortalMount:u=>Ar(u.getState().scene),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance(u){var h;const{attach:f,parent:d}=(h=u.__r3f)!=null?h:{};f&&d&&_f(d,u,f),u.isObject3D&&(u.visible=!1),Cr(u)},unhideInstance(u,h){var f;const{attach:d,parent:p}=(f=u.__r3f)!=null?f:{};d&&p&&Ul(p,u,d),(u.isObject3D&&h.visible==null||h.visible)&&(u.visible=!0),Cr(u)},createTextInstance:l,hideTextInstance:l,unhideTextInstance:l,getCurrentEventPriority:()=>e?e():Pr.DefaultEventPriority,beforeActiveInstanceBlur:()=>{},afterActiveInstanceBlur:()=>{},detachDeletedInstance:()=>{},now:typeof performance<"u"&&ht.fun(performance.now)?performance.now:ht.fun(Date.now)?Date.now:()=>0,scheduleTimeout:ht.fun(setTimeout)?setTimeout:void 0,cancelTimeout:ht.fun(clearTimeout)?clearTimeout:void 0}),applyProps:Il}}var df,pf;const Ll=s=>"colorSpace"in s||"outputColorSpace"in s,Kp=()=>{var s;return(s=Cu.ColorManagement)!=null?s:null},Qp=s=>s&&s.isOrthographicCamera,LM=s=>s&&s.hasOwnProperty("current"),Ys=typeof window<"u"&&((df=window.document)!=null&&df.createElement||((pf=window.navigator)==null?void 0:pf.product)==="ReactNative")?Ce.useLayoutEffect:Ce.useEffect;function em(s){const e=Ce.useRef(s);return Ys(()=>void(e.current=s),[s]),e}function UM({set:s}){return Ys(()=>(s(new Promise(()=>null)),()=>s(!1)),[s]),null}class tm extends Ce.Component{constructor(...e){super(...e),this.state={error:!1}}componentDidCatch(e){this.props.set(e)}render(){return this.state.error?null:this.props.children}}tm.getDerivedStateFromError=()=>({error:!0});const nm="__default",mf=new Map,IM=s=>s&&!!s.memoized&&!!s.changes;function im(s){var e;const t=typeof window<"u"?(e=window.devicePixelRatio)!=null?e:2:1;return Array.isArray(s)?Math.min(Math.max(s[0],t),s[1]):s}const rs=s=>{var e;return(e=s.__r3f)==null?void 0:e.root.getState()};function na(s){let e=s.__r3f.root;for(;e.getState().previousRoot;)e=e.getState().previousRoot;return e}const ht={obj:s=>s===Object(s)&&!ht.arr(s)&&typeof s!="function",fun:s=>typeof s=="function",str:s=>typeof s=="string",num:s=>typeof s=="number",boo:s=>typeof s=="boolean",und:s=>s===void 0,arr:s=>Array.isArray(s),equ(s,e,{arrays:t="shallow",objects:i="reference",strict:n=!0}={}){if(typeof s!=typeof e||!!s!=!!e)return!1;if(ht.str(s)||ht.num(s)||ht.boo(s))return s===e;const r=ht.obj(s);if(r&&i==="reference")return s===e;const o=ht.arr(s);if(o&&t==="reference")return s===e;if((o||r)&&s===e)return!0;let a;for(a in s)if(!(a in e))return!1;if(r&&t==="shallow"&&i==="shallow"){for(a in n?e:s)if(!ht.equ(s[a],e[a],{strict:n,objects:"reference"}))return!1}else for(a in n?e:s)if(s[a]!==e[a])return!1;if(ht.und(a)){if(o&&s.length===0&&e.length===0||r&&Object.keys(s).length===0&&Object.keys(e).length===0)return!0;if(s!==e)return!1}return!0}};function DM(s){s.dispose&&s.type!=="Scene"&&s.dispose();for(const e in s)e.dispose==null||e.dispose(),delete s[e]}function Ar(s,e){const t=s;return t.__r3f={type:"",root:null,previousAttach:null,memoizedProps:{},eventCount:0,handlers:{},objects:[],parent:null,...e},s}function Dc(s,e){let t=s;if(e.includes("-")){const i=e.split("-"),n=i.pop();return t=i.reduce((r,o)=>r[o],s),{target:t,key:n}}else return{target:t,key:e}}const gf=/-\d+$/;function Ul(s,e,t){if(ht.str(t)){if(gf.test(t)){const r=t.replace(gf,""),{target:o,key:a}=Dc(s,r);Array.isArray(o[a])||(o[a]=[])}const{target:i,key:n}=Dc(s,t);e.__r3f.previousAttach=i[n],i[n]=e}else e.__r3f.previousAttach=t(s,e)}function _f(s,e,t){var i,n;if(ht.str(t)){const{target:r,key:o}=Dc(s,t),a=e.__r3f.previousAttach;a===void 0?delete r[o]:r[o]=a}else(i=e.__r3f)==null||i.previousAttach==null||i.previousAttach(s,e);(n=e.__r3f)==null||delete n.previousAttach}function rm(s,{children:e,key:t,ref:i,...n},{children:r,key:o,ref:a,...l}={},c=!1){const u=s.__r3f,h=Object.entries(n),f=[];if(c){const p=Object.keys(l);for(let _=0;_<p.length;_++)n.hasOwnProperty(p[_])||h.unshift([p[_],nm+"remove"])}h.forEach(([p,_])=>{var g;if((g=s.__r3f)!=null&&g.primitive&&p==="object"||ht.equ(_,l[p]))return;if(/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(p))return f.push([p,_,!0,[]]);let m=[];p.includes("-")&&(m=p.split("-")),f.push([p,_,!1,m]);for(const y in n){const v=n[y];y.startsWith(`${p}-`)&&f.push([y,v,!1,y.split("-")])}});const d={...n};return u!=null&&u.memoizedProps&&u!=null&&u.memoizedProps.args&&(d.args=u.memoizedProps.args),u!=null&&u.memoizedProps&&u!=null&&u.memoizedProps.attach&&(d.attach=u.memoizedProps.attach),{memoized:d,changes:f}}const OM=typeof process<"u"&&!1;function Il(s,e){var t;const i=s.__r3f,n=i==null?void 0:i.root,r=n==null||n.getState==null?void 0:n.getState(),{memoized:o,changes:a}=IM(e)?e:rm(s,e),l=i==null?void 0:i.eventCount;s.__r3f&&(s.__r3f.memoizedProps=o);for(let f=0;f<a.length;f++){let[d,p,_,g]=a[f];if(Ll(s)){const x="srgb",S="srgb-linear";d==="encoding"?(d="colorSpace",p=p===3001?x:S):d==="outputEncoding"&&(d="outputColorSpace",p=p===3001?x:S)}let m=s,y=m[d];if(g.length&&(y=g.reduce((v,x)=>v[x],s),!(y&&y.set))){const[v,...x]=g.reverse();m=x.reverse().reduce((S,b)=>S[b],s),d=v}if(p===nm+"remove")if(m.constructor){let v=mf.get(m.constructor);v||(v=new m.constructor,mf.set(m.constructor,v)),p=v[d]}else p=0;if(_&&i)p?i.handlers[d]=p:delete i.handlers[d],i.eventCount=Object.keys(i.handlers).length;else if(y&&y.set&&(y.copy||y instanceof zi)){if(Array.isArray(p))y.fromArray?y.fromArray(p):y.set(...p);else if(y.copy&&p&&p.constructor&&(OM?y.constructor.name===p.constructor.name:y.constructor===p.constructor))y.copy(p);else if(p!==void 0){var c;const v=(c=y)==null?void 0:c.isColor;!v&&y.setScalar?y.setScalar(p):y instanceof zi&&p instanceof zi?y.mask=p.mask:y.set(p),!Kp()&&r&&!r.linear&&v&&y.convertSRGBToLinear()}}else{var u;if(m[d]=p,(u=m[d])!=null&&u.isTexture&&m[d].format===jt&&m[d].type===Cn&&r){const v=m[d];Ll(v)&&Ll(r.gl)?v.colorSpace=r.gl.outputColorSpace:v.encoding=r.gl.outputEncoding}}Cr(s)}if(i&&i.parent&&s.raycast&&l!==i.eventCount){const f=na(s).getState().internal,d=f.interaction.indexOf(s);d>-1&&f.interaction.splice(d,1),i.eventCount&&f.interaction.push(s)}return!(a.length===1&&a[0][0]==="onUpdate")&&a.length&&(t=s.__r3f)!=null&&t.parent&&Oc(s),s}function Cr(s){var e,t;const i=(e=s.__r3f)==null||(t=e.root)==null||t.getState==null?void 0:t.getState();i&&i.internal.frames===0&&i.invalidate()}function Oc(s){s.onUpdate==null||s.onUpdate(s)}function FM(s,e){s.manual||(Qp(s)?(s.left=e.width/-2,s.right=e.width/2,s.top=e.height/2,s.bottom=e.height/-2):s.aspect=e.width/e.height,s.updateProjectionMatrix(),s.updateMatrixWorld())}function Go(s){return(s.eventObject||s.object).uuid+"/"+s.index+s.instanceId}function NM(){var s;const e=typeof self<"u"&&self||typeof window<"u"&&window;if(!e)return Pr.DefaultEventPriority;switch((s=e.event)==null?void 0:s.type){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return Pr.DiscreteEventPriority;case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return Pr.ContinuousEventPriority;default:return Pr.DefaultEventPriority}}function sm(s,e,t,i){const n=t.get(e);n&&(t.delete(e),t.size===0&&(s.delete(i),n.target.releasePointerCapture(i)))}function BM(s,e){const{internal:t}=s.getState();t.interaction=t.interaction.filter(i=>i!==e),t.initialHits=t.initialHits.filter(i=>i!==e),t.hovered.forEach((i,n)=>{(i.eventObject===e||i.object===e)&&t.hovered.delete(n)}),t.capturedMap.forEach((i,n)=>{sm(t.capturedMap,e,i,n)})}function zM(s){function e(l){const{internal:c}=s.getState(),u=l.offsetX-c.initialClick[0],h=l.offsetY-c.initialClick[1];return Math.round(Math.sqrt(u*u+h*h))}function t(l){return l.filter(c=>["Move","Over","Enter","Out","Leave"].some(u=>{var h;return(h=c.__r3f)==null?void 0:h.handlers["onPointer"+u]}))}function i(l,c){const u=s.getState(),h=new Set,f=[],d=c?c(u.internal.interaction):u.internal.interaction;for(let m=0;m<d.length;m++){const y=rs(d[m]);y&&(y.raycaster.camera=void 0)}u.previousRoot||u.events.compute==null||u.events.compute(l,u);function p(m){const y=rs(m);if(!y||!y.events.enabled||y.raycaster.camera===null)return[];if(y.raycaster.camera===void 0){var v;y.events.compute==null||y.events.compute(l,y,(v=y.previousRoot)==null?void 0:v.getState()),y.raycaster.camera===void 0&&(y.raycaster.camera=null)}return y.raycaster.camera?y.raycaster.intersectObject(m,!0):[]}let _=d.flatMap(p).sort((m,y)=>{const v=rs(m.object),x=rs(y.object);return!v||!x?m.distance-y.distance:x.events.priority-v.events.priority||m.distance-y.distance}).filter(m=>{const y=Go(m);return h.has(y)?!1:(h.add(y),!0)});u.events.filter&&(_=u.events.filter(_,u));for(const m of _){let y=m.object;for(;y;){var g;(g=y.__r3f)!=null&&g.eventCount&&f.push({...m,eventObject:y}),y=y.parent}}if("pointerId"in l&&u.internal.capturedMap.has(l.pointerId))for(let m of u.internal.capturedMap.get(l.pointerId).values())h.has(Go(m.intersection))||f.push(m.intersection);return f}function n(l,c,u,h){const f=s.getState();if(l.length){const d={stopped:!1};for(const p of l){const _=rs(p.object)||f,{raycaster:g,pointer:m,camera:y,internal:v}=_,x=new P(m.x,m.y,0).unproject(y),S=w=>{var I,R;return(I=(R=v.capturedMap.get(w))==null?void 0:R.has(p.eventObject))!=null?I:!1},b=w=>{const I={intersection:p,target:c.target};v.capturedMap.has(w)?v.capturedMap.get(w).set(p.eventObject,I):v.capturedMap.set(w,new Map([[p.eventObject,I]])),c.target.setPointerCapture(w)},E=w=>{const I=v.capturedMap.get(w);I&&sm(v.capturedMap,p.eventObject,I,w)};let A={};for(let w in c){let I=c[w];typeof I!="function"&&(A[w]=I)}let M={...p,...A,pointer:m,intersections:l,stopped:d.stopped,delta:u,unprojectedPoint:x,ray:g.ray,camera:y,stopPropagation(){const w="pointerId"in c&&v.capturedMap.get(c.pointerId);if((!w||w.has(p.eventObject))&&(M.stopped=d.stopped=!0,v.hovered.size&&Array.from(v.hovered.values()).find(I=>I.eventObject===p.eventObject))){const I=l.slice(0,l.indexOf(p));r([...I,p])}},target:{hasPointerCapture:S,setPointerCapture:b,releasePointerCapture:E},currentTarget:{hasPointerCapture:S,setPointerCapture:b,releasePointerCapture:E},nativeEvent:c};if(h(M),d.stopped===!0)break}}return l}function r(l){const{internal:c}=s.getState();for(const u of c.hovered.values())if(!l.length||!l.find(h=>h.object===u.object&&h.index===u.index&&h.instanceId===u.instanceId)){const f=u.eventObject.__r3f,d=f==null?void 0:f.handlers;if(c.hovered.delete(Go(u)),f!=null&&f.eventCount){const p={...u,intersections:l};d.onPointerOut==null||d.onPointerOut(p),d.onPointerLeave==null||d.onPointerLeave(p)}}}function o(l,c){for(let u=0;u<c.length;u++){const h=c[u].__r3f;h==null||h.handlers.onPointerMissed==null||h.handlers.onPointerMissed(l)}}function a(l){switch(l){case"onPointerLeave":case"onPointerCancel":return()=>r([]);case"onLostPointerCapture":return c=>{const{internal:u}=s.getState();"pointerId"in c&&u.capturedMap.has(c.pointerId)&&requestAnimationFrame(()=>{u.capturedMap.has(c.pointerId)&&(u.capturedMap.delete(c.pointerId),r([]))})}}return function(u){const{onPointerMissed:h,internal:f}=s.getState();f.lastEvent.current=u;const d=l==="onPointerMove",p=l==="onClick"||l==="onContextMenu"||l==="onDoubleClick",g=i(u,d?t:void 0),m=p?e(u):0;l==="onPointerDown"&&(f.initialClick=[u.offsetX,u.offsetY],f.initialHits=g.map(v=>v.eventObject)),p&&!g.length&&m<=2&&(o(u,f.interaction),h&&h(u)),d&&r(g);function y(v){const x=v.eventObject,S=x.__r3f,b=S==null?void 0:S.handlers;if(S!=null&&S.eventCount)if(d){if(b.onPointerOver||b.onPointerEnter||b.onPointerOut||b.onPointerLeave){const E=Go(v),A=f.hovered.get(E);A?A.stopped&&v.stopPropagation():(f.hovered.set(E,v),b.onPointerOver==null||b.onPointerOver(v),b.onPointerEnter==null||b.onPointerEnter(v))}b.onPointerMove==null||b.onPointerMove(v)}else{const E=b[l];E?(!p||f.initialHits.includes(x))&&(o(u,f.interaction.filter(A=>!f.initialHits.includes(A))),E(v)):p&&f.initialHits.includes(x)&&o(u,f.interaction.filter(A=>!f.initialHits.includes(A)))}}n(g,u,m,y)}}return{handlePointer:a}}const om=s=>!!(s!=null&&s.render),am=Ce.createContext(null),kM=(s,e)=>{const t=RM((a,l)=>{const c=new P,u=new P,h=new P;function f(m=l().camera,y=u,v=l().size){const{width:x,height:S,top:b,left:E}=v,A=x/S;y.isVector3?h.copy(y):h.set(...y);const M=m.getWorldPosition(c).distanceTo(h);if(Qp(m))return{width:x/m.zoom,height:S/m.zoom,top:b,left:E,factor:1,distance:M,aspect:A};{const w=m.fov*Math.PI/180,I=2*Math.tan(w/2)*M,R=I*(x/S);return{width:R,height:I,top:b,left:E,factor:x/R,distance:M,aspect:A}}}let d;const p=m=>a(y=>({performance:{...y.performance,current:m}})),_=new se;return{set:a,get:l,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},xr:null,scene:null,invalidate:(m=1)=>s(l(),m),advance:(m,y)=>e(m,y,l()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new wu,pointer:_,mouse:_,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{const m=l();d&&clearTimeout(d),m.performance.current!==m.performance.min&&p(m.performance.min),d=setTimeout(()=>p(l().performance.max),m.performance.debounce)}},size:{width:0,height:0,top:0,left:0,updateStyle:!1},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:f},setEvents:m=>a(y=>({...y,events:{...y.events,...m}})),setSize:(m,y,v,x,S)=>{const b=l().camera,E={width:m,height:y,top:x||0,left:S||0,updateStyle:v};a(A=>({size:E,viewport:{...A.viewport,...f(b,u,E)}}))},setDpr:m=>a(y=>{const v=im(m);return{viewport:{...y.viewport,dpr:v,initialDpr:y.viewport.initialDpr||v}}}),setFrameloop:(m="always")=>{const y=l().clock;y.stop(),y.elapsedTime=0,m!=="never"&&(y.start(),y.elapsedTime=0),a(()=>({frameloop:m}))},previousRoot:void 0,internal:{active:!1,priority:0,frames:0,lastEvent:Ce.createRef(),interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,subscribe:(m,y,v)=>{const x=l().internal;return x.priority=x.priority+(y>0?1:0),x.subscribers.push({ref:m,priority:y,store:v}),x.subscribers=x.subscribers.sort((S,b)=>S.priority-b.priority),()=>{const S=l().internal;S!=null&&S.subscribers&&(S.priority=S.priority-(y>0?1:0),S.subscribers=S.subscribers.filter(b=>b.ref!==m))}}}}}),i=t.getState();let n=i.size,r=i.viewport.dpr,o=i.camera;return t.subscribe(()=>{const{camera:a,size:l,viewport:c,gl:u,set:h}=t.getState();if(l.width!==n.width||l.height!==n.height||c.dpr!==r){var f;n=l,r=c.dpr,FM(a,l),u.setPixelRatio(c.dpr);const d=(f=l.updateStyle)!=null?f:typeof HTMLCanvasElement<"u"&&u.domElement instanceof HTMLCanvasElement;u.setSize(l.width,l.height,d)}a!==o&&(o=a,h(d=>({viewport:{...d.viewport,...d.viewport.getCurrentViewport(a)}})))}),t.subscribe(a=>s(a)),t};function lm(s,e){const t={callback:s};return e.add(t),()=>void e.delete(t)}let Ho,cm=new Set,um=new Set,GM=new Set;const HM=s=>lm(s,cm),VM=s=>lm(s,um);function Dl(s,e){if(s.size)for(const{callback:t}of s.values())t(e)}function ss(s,e){switch(s){case"before":return Dl(cm,e);case"after":return Dl(um,e);case"tail":return Dl(GM,e)}}let Ol,Fl;function Nl(s,e,t){let i=e.clock.getDelta();for(e.frameloop==="never"&&typeof s=="number"&&(i=s-e.clock.elapsedTime,e.clock.oldTime=e.clock.elapsedTime,e.clock.elapsedTime=s),Ol=e.internal.subscribers,Ho=0;Ho<Ol.length;Ho++)Fl=Ol[Ho],Fl.ref.current(Fl.store.getState(),i,t);return!e.internal.priority&&e.gl.render&&e.gl.render(e.scene,e.camera),e.internal.frames=Math.max(0,e.internal.frames-1),e.frameloop==="always"?1:e.internal.frames}function WM(s){let e=!1,t=!1,i,n,r;function o(c){n=requestAnimationFrame(o),e=!0,i=0,ss("before",c),t=!0;for(const h of s.values()){var u;r=h.store.getState(),r.internal.active&&(r.frameloop==="always"||r.internal.frames>0)&&!((u=r.gl.xr)!=null&&u.isPresenting)&&(i+=Nl(c,r))}if(t=!1,ss("after",c),i===0)return ss("tail",c),e=!1,cancelAnimationFrame(n)}function a(c,u=1){var h;if(!c)return s.forEach(f=>a(f.store.getState(),u));(h=c.gl.xr)!=null&&h.isPresenting||!c.internal.active||c.frameloop==="never"||(u>1?c.internal.frames=Math.min(60,c.internal.frames+u):t?c.internal.frames=2:c.internal.frames=1,e||(e=!0,requestAnimationFrame(o)))}function l(c,u=!0,h,f){if(u&&ss("before",c),h)Nl(c,h,f);else for(const d of s.values())Nl(c,d.store.getState());u&&ss("after",c)}return{loop:o,invalidate:a,advance:l}}function hm(){const s=Ce.useContext(am);if(!s)throw new Error("R3F: Hooks can only be used within the Canvas component!");return s}function Yt(s=t=>t,e){return hm()(s,e)}function Ru(s,e=0){const t=hm(),i=t.getState().internal.subscribe,n=em(s);return Ys(()=>i(n,e,t),[e,i,t]),null}const kr=new Map,{invalidate:vf,advance:yf}=WM(kr),{reconciler:ha,applyProps:wr}=PM(kr,NM),Er={objects:"shallow",strict:!1},XM=(s,e)=>{const t=typeof s=="function"?s(e):s;return om(t)?t:new su({powerPreference:"high-performance",canvas:e,antialias:!0,alpha:!0,...s})};function qM(s,e){const t=typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement;if(e){const{width:i,height:n,top:r,left:o,updateStyle:a=t}=e;return{width:i,height:n,top:r,left:o,updateStyle:a}}else if(typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement&&s.parentElement){const{width:i,height:n,top:r,left:o}=s.parentElement.getBoundingClientRect();return{width:i,height:n,top:r,left:o,updateStyle:t}}else if(typeof OffscreenCanvas<"u"&&s instanceof OffscreenCanvas)return{width:s.width,height:s.height,top:0,left:0,updateStyle:t};return{width:0,height:0,top:0,left:0}}function YM(s){const e=kr.get(s),t=e==null?void 0:e.fiber,i=e==null?void 0:e.store;e&&console.warn("R3F.createRoot should only be called once!");const n=typeof reportError=="function"?reportError:console.error,r=i||kM(vf,yf),o=t||ha.createContainer(r,Pr.ConcurrentRoot,null,!1,null,"",n,null);e||kr.set(s,{fiber:o,store:r});let a,l=!1,c;return{configure(u={}){let{gl:h,size:f,scene:d,events:p,onCreated:_,shadows:g=!1,linear:m=!1,flat:y=!1,legacy:v=!1,orthographic:x=!1,frameloop:S="always",dpr:b=[1,2],performance:E,raycaster:A,camera:M,onPointerMissed:w}=u,I=r.getState(),R=I.gl;I.gl||I.set({gl:R=XM(h,s)});let z=I.raycaster;z||I.set({raycaster:z=new jp});const{params:C,...N}=A||{};if(ht.equ(N,z,Er)||wr(z,{...N}),ht.equ(C,z.params,Er)||wr(z,{params:{...z.params,...C}}),!I.camera||I.camera===c&&!ht.equ(c,M,Er)){c=M;const V=M instanceof ks,G=V?M:x?new oi(0,0,0,0,.1,1e3):new bt(75,0,.1,1e3);V||(G.position.z=5,M&&(wr(G,M),("aspect"in M||"left"in M||"right"in M||"bottom"in M||"top"in M)&&(G.manual=!0,G.updateProjectionMatrix())),!I.camera&&!(M!=null&&M.rotation)&&G.lookAt(0,0,0)),I.set({camera:G}),z.camera=G}if(!I.scene){let V;d!=null&&d.isScene?V=d:(V=new ou,d&&wr(V,d)),I.set({scene:Ar(V)})}if(!I.xr){var k;const V=(O,Y)=>{const te=r.getState();te.frameloop!=="never"&&yf(O,!0,te,Y)},G=()=>{const O=r.getState();O.gl.xr.enabled=O.gl.xr.isPresenting,O.gl.xr.setAnimationLoop(O.gl.xr.isPresenting?V:null),O.gl.xr.isPresenting||vf(O)},j={connect(){const O=r.getState().gl;O.xr.addEventListener("sessionstart",G),O.xr.addEventListener("sessionend",G)},disconnect(){const O=r.getState().gl;O.xr.removeEventListener("sessionstart",G),O.xr.removeEventListener("sessionend",G)}};typeof((k=R.xr)==null?void 0:k.addEventListener)=="function"&&j.connect(),I.set({xr:j})}if(R.shadowMap){const V=R.shadowMap.enabled,G=R.shadowMap.type;if(R.shadowMap.enabled=!!g,ht.boo(g))R.shadowMap.type=cs;else if(ht.str(g)){var H;const j={basic:Xf,percentage:fa,soft:cs,variance:gn};R.shadowMap.type=(H=j[g])!=null?H:cs}else ht.obj(g)&&Object.assign(R.shadowMap,g);(V!==R.shadowMap.enabled||G!==R.shadowMap.type)&&(R.shadowMap.needsUpdate=!0)}const $=Kp();$&&("enabled"in $?$.enabled=!v:"legacyMode"in $&&($.legacyMode=v)),l||wr(R,{outputEncoding:m?3e3:3001,toneMapping:y?An:zc}),I.legacy!==v&&I.set(()=>({legacy:v})),I.linear!==m&&I.set(()=>({linear:m})),I.flat!==y&&I.set(()=>({flat:y})),h&&!ht.fun(h)&&!om(h)&&!ht.equ(h,R,Er)&&wr(R,h),p&&!I.events.handlers&&I.set({events:p(r)});const q=qM(s,f);return ht.equ(q,I.size,Er)||I.setSize(q.width,q.height,q.updateStyle,q.top,q.left),b&&I.viewport.dpr!==im(b)&&I.setDpr(b),I.frameloop!==S&&I.setFrameloop(S),I.onPointerMissed||I.set({onPointerMissed:w}),E&&!ht.equ(E,I.performance,Er)&&I.set(V=>({performance:{...V.performance,...E}})),a=_,l=!0,this},render(u){return l||this.configure(),ha.updateContainer(_n.jsx(jM,{store:r,children:u,onCreated:a,rootElement:s}),o,null,()=>{}),r},unmount(){fm(s)}}}function jM({store:s,children:e,onCreated:t,rootElement:i}){return Ys(()=>{const n=s.getState();n.set(r=>({internal:{...r.internal,active:!0}})),t&&t(n),s.getState().events.connected||n.events.connect==null||n.events.connect(i)},[]),_n.jsx(am.Provider,{value:s,children:e})}function fm(s,e){const t=kr.get(s),i=t==null?void 0:t.fiber;if(i){const n=t==null?void 0:t.store.getState();n&&(n.internal.active=!1),ha.updateContainer(null,i,null,()=>{n&&setTimeout(()=>{try{var r,o,a,l;n.events.disconnect==null||n.events.disconnect(),(r=n.gl)==null||(o=r.renderLists)==null||o.dispose==null||o.dispose(),(a=n.gl)==null||a.forceContextLoss==null||a.forceContextLoss(),(l=n.gl)!=null&&l.xr&&n.xr.disconnect(),DM(n),kr.delete(s),e&&e(s)}catch{}},500)})}}ha.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:Ce.version});const Bl={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]};function ZM(s){const{handlePointer:e}=zM(s);return{priority:1,enabled:!0,compute(t,i,n){i.pointer.set(t.offsetX/i.size.width*2-1,-(t.offsetY/i.size.height)*2+1),i.raycaster.setFromCamera(i.pointer,i.camera)},connected:void 0,handlers:Object.keys(Bl).reduce((t,i)=>({...t,[i]:e(i)}),{}),update:()=>{var t;const{events:i,internal:n}=s.getState();(t=n.lastEvent)!=null&&t.current&&i.handlers&&i.handlers.onPointerMove(n.lastEvent.current)},connect:t=>{var i;const{set:n,events:r}=s.getState();r.disconnect==null||r.disconnect(),n(o=>({events:{...o.events,connected:t}})),Object.entries((i=r.handlers)!=null?i:[]).forEach(([o,a])=>{const[l,c]=Bl[o];t.addEventListener(l,a,{passive:c})})},disconnect:()=>{const{set:t,events:i}=s.getState();if(i.connected){var n;Object.entries((n=i.handlers)!=null?n:[]).forEach(([r,o])=>{if(i&&i.connected instanceof HTMLElement){const[a]=Bl[r];i.connected.removeEventListener(a,o)}}),t(r=>({events:{...r.events,connected:void 0}}))}}}}const $M=Ce.forwardRef(function({children:e,fallback:t,resize:i,style:n,gl:r,events:o=ZM,eventSource:a,eventPrefix:l,shadows:c,linear:u,flat:h,legacy:f,orthographic:d,frameloop:p,dpr:_,performance:g,raycaster:m,camera:y,scene:v,onPointerMissed:x,onCreated:S,...b},E){Ce.useMemo(()=>Jp(TM),[]);const A=Om(),[M,w]=Um({scroll:!0,debounce:{scroll:50,resize:0},...i}),I=Ce.useRef(null),R=Ce.useRef(null);Ce.useImperativeHandle(E,()=>I.current);const z=em(x),[C,N]=Ce.useState(!1),[k,H]=Ce.useState(!1);if(C)throw C;if(k)throw k;const $=Ce.useRef(null);Ys(()=>{const V=I.current;w.width>0&&w.height>0&&V&&($.current||($.current=YM(V)),$.current.configure({gl:r,events:o,shadows:c,linear:u,flat:h,legacy:f,orthographic:d,frameloop:p,dpr:_,performance:g,raycaster:m,camera:y,scene:v,size:w,onPointerMissed:(...G)=>z.current==null?void 0:z.current(...G),onCreated:G=>{G.events.connect==null||G.events.connect(a?LM(a)?a.current:a:R.current),l&&G.setEvents({compute:(j,O)=>{const Y=j[l+"X"],te=j[l+"Y"];O.pointer.set(Y/O.size.width*2-1,-(te/O.size.height)*2+1),O.raycaster.setFromCamera(O.pointer,O.camera)}}),S==null||S(G)}}),$.current.render(_n.jsx(A,{children:_n.jsx(tm,{set:H,children:_n.jsx(Ce.Suspense,{fallback:_n.jsx(UM,{set:N}),children:e??null})})})))}),Ce.useEffect(()=>{const V=I.current;if(V)return()=>fm(V)},[]);const q=a?"none":"auto";return _n.jsx("div",{ref:R,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:q,...n},...b,children:_n.jsx("div",{ref:M,style:{width:"100%",height:"100%"},children:_n.jsx("canvas",{ref:I,style:{display:"block"},children:t})})})}),a1=Ce.forwardRef(function(e,t){return _n.jsx(Dm,{children:_n.jsx($M,{...e,ref:t})})}),dm=(()=>parseInt(Gr.replace(/\D+/g,"")))(),pm=dm>=125?"uv1":"uv2";var JM=Object.defineProperty,KM=(s,e,t)=>e in s?JM(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,QM=(s,e,t)=>(KM(s,typeof e!="symbol"?e+"":e,t),t);class eb{constructor(){QM(this,"_listeners")}addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,o=n.length;r<o;r++)n[r].call(this,e);e.target=null}}}var tb=Object.defineProperty,nb=(s,e,t)=>e in s?tb(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,He=(s,e,t)=>(nb(s,typeof e!="symbol"?e+"":e,t),t);const Vo=new $i,xf=new En,ib=Math.cos(70*(Math.PI/180)),Sf=(s,e)=>(s%e+e)%e;let rb=class extends eb{constructor(e,t){super(),He(this,"object"),He(this,"domElement"),He(this,"enabled",!0),He(this,"target",new P),He(this,"minDistance",0),He(this,"maxDistance",1/0),He(this,"minZoom",0),He(this,"maxZoom",1/0),He(this,"minPolarAngle",0),He(this,"maxPolarAngle",Math.PI),He(this,"minAzimuthAngle",-1/0),He(this,"maxAzimuthAngle",1/0),He(this,"enableDamping",!1),He(this,"dampingFactor",.05),He(this,"enableZoom",!0),He(this,"zoomSpeed",1),He(this,"enableRotate",!0),He(this,"rotateSpeed",1),He(this,"enablePan",!0),He(this,"panSpeed",1),He(this,"screenSpacePanning",!0),He(this,"keyPanSpeed",7),He(this,"zoomToCursor",!1),He(this,"autoRotate",!1),He(this,"autoRotateSpeed",2),He(this,"reverseOrbit",!1),He(this,"reverseHorizontalOrbit",!1),He(this,"reverseVerticalOrbit",!1),He(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),He(this,"mouseButtons",{LEFT:Ci.ROTATE,MIDDLE:Ci.DOLLY,RIGHT:Ci.PAN}),He(this,"touches",{ONE:Ri.ROTATE,TWO:Ri.DOLLY_PAN}),He(this,"target0"),He(this,"position0"),He(this,"zoom0"),He(this,"_domElementKeyEvents",null),He(this,"getPolarAngle"),He(this,"getAzimuthalAngle"),He(this,"setPolarAngle"),He(this,"setAzimuthalAngle"),He(this,"getDistance"),He(this,"getZoomScale"),He(this,"listenToKeyEvents"),He(this,"stopListenToKeyEvents"),He(this,"saveState"),He(this,"reset"),He(this,"update"),He(this,"connect"),He(this,"dispose"),He(this,"dollyIn"),He(this,"dollyOut"),He(this,"getScale"),He(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>u.phi,this.getAzimuthalAngle=()=>u.theta,this.setPolarAngle=F=>{let K=Sf(F,2*Math.PI),ae=u.phi;ae<0&&(ae+=2*Math.PI),K<0&&(K+=2*Math.PI);let ue=Math.abs(K-ae);2*Math.PI-ue<ue&&(K<ae?K+=2*Math.PI:ae+=2*Math.PI),h.phi=K-ae,i.update()},this.setAzimuthalAngle=F=>{let K=Sf(F,2*Math.PI),ae=u.theta;ae<0&&(ae+=2*Math.PI),K<0&&(K+=2*Math.PI);let ue=Math.abs(K-ae);2*Math.PI-ue<ue&&(K<ae?K+=2*Math.PI:ae+=2*Math.PI),h.theta=K-ae,i.update()},this.getDistance=()=>i.object.position.distanceTo(i.target),this.listenToKeyEvents=F=>{F.addEventListener("keydown",le),this._domElementKeyEvents=F},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",le),this._domElementKeyEvents=null},this.saveState=()=>{i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=()=>{i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(n),i.update(),l=a.NONE},this.update=(()=>{const F=new P,K=new P(0,1,0),ae=new Vt().setFromUnitVectors(e.up,K),ue=ae.clone().invert(),Me=new P,B=new Vt,be=2*Math.PI;return function(){const Z=i.object.position;ae.setFromUnitVectors(e.up,K),ue.copy(ae).invert(),F.copy(Z).sub(i.target),F.applyQuaternion(ae),u.setFromVector3(F),i.autoRotate&&l===a.NONE&&C(R()),i.enableDamping?(u.theta+=h.theta*i.dampingFactor,u.phi+=h.phi*i.dampingFactor):(u.theta+=h.theta,u.phi+=h.phi);let he=i.minAzimuthAngle,Ue=i.maxAzimuthAngle;isFinite(he)&&isFinite(Ue)&&(he<-Math.PI?he+=be:he>Math.PI&&(he-=be),Ue<-Math.PI?Ue+=be:Ue>Math.PI&&(Ue-=be),he<=Ue?u.theta=Math.max(he,Math.min(Ue,u.theta)):u.theta=u.theta>(he+Ue)/2?Math.max(he,u.theta):Math.min(Ue,u.theta)),u.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,u.phi)),u.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(d,i.dampingFactor):i.target.add(d),i.zoomToCursor&&M||i.object.isOrthographicCamera?u.radius=O(u.radius):u.radius=O(u.radius*f),F.setFromSpherical(u),F.applyQuaternion(ue),Z.copy(i.target).add(F),i.object.matrixAutoUpdate||i.object.updateMatrix(),i.object.lookAt(i.target),i.enableDamping===!0?(h.theta*=1-i.dampingFactor,h.phi*=1-i.dampingFactor,d.multiplyScalar(1-i.dampingFactor)):(h.set(0,0,0),d.set(0,0,0));let Le=!1;if(i.zoomToCursor&&M){let Xe=null;if(i.object instanceof bt&&i.object.isPerspectiveCamera){const rt=F.length();Xe=O(rt*f);const qe=rt-Xe;i.object.position.addScaledVector(E,qe),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const rt=new P(A.x,A.y,0);rt.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/f)),i.object.updateProjectionMatrix(),Le=!0;const qe=new P(A.x,A.y,0);qe.unproject(i.object),i.object.position.sub(qe).add(rt),i.object.updateMatrixWorld(),Xe=F.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Xe!==null&&(i.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Xe).add(i.object.position):(Vo.origin.copy(i.object.position),Vo.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Vo.direction))<ib?e.lookAt(i.target):(xf.setFromNormalAndCoplanarPoint(i.object.up,i.target),Vo.intersectPlane(xf,i.target))))}else i.object instanceof oi&&i.object.isOrthographicCamera&&(Le=f!==1,Le&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/f)),i.object.updateProjectionMatrix()));return f=1,M=!1,Le||Me.distanceToSquared(i.object.position)>c||8*(1-B.dot(i.object.quaternion))>c?(i.dispatchEvent(n),Me.copy(i.object.position),B.copy(i.object.quaternion),Le=!1,!0):!1}})(),this.connect=F=>{i.domElement=F,i.domElement.style.touchAction="none",i.domElement.addEventListener("contextmenu",ye),i.domElement.addEventListener("pointerdown",je),i.domElement.addEventListener("pointercancel",T),i.domElement.addEventListener("wheel",ie)},this.dispose=()=>{var F,K,ae,ue,Me,B;i.domElement&&(i.domElement.style.touchAction="auto"),(F=i.domElement)==null||F.removeEventListener("contextmenu",ye),(K=i.domElement)==null||K.removeEventListener("pointerdown",je),(ae=i.domElement)==null||ae.removeEventListener("pointercancel",T),(ue=i.domElement)==null||ue.removeEventListener("wheel",ie),(Me=i.domElement)==null||Me.ownerDocument.removeEventListener("pointermove",U),(B=i.domElement)==null||B.ownerDocument.removeEventListener("pointerup",T),i._domElementKeyEvents!==null&&i._domElementKeyEvents.removeEventListener("keydown",le)};const i=this,n={type:"change"},r={type:"start"},o={type:"end"},a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=a.NONE;const c=1e-6,u=new Ic,h=new Ic;let f=1;const d=new P,p=new se,_=new se,g=new se,m=new se,y=new se,v=new se,x=new se,S=new se,b=new se,E=new P,A=new se;let M=!1;const w=[],I={};function R(){return 2*Math.PI/60/60*i.autoRotateSpeed}function z(){return Math.pow(.95,i.zoomSpeed)}function C(F){i.reverseOrbit||i.reverseHorizontalOrbit?h.theta+=F:h.theta-=F}function N(F){i.reverseOrbit||i.reverseVerticalOrbit?h.phi+=F:h.phi-=F}const k=(()=>{const F=new P;return function(ae,ue){F.setFromMatrixColumn(ue,0),F.multiplyScalar(-ae),d.add(F)}})(),H=(()=>{const F=new P;return function(ae,ue){i.screenSpacePanning===!0?F.setFromMatrixColumn(ue,1):(F.setFromMatrixColumn(ue,0),F.crossVectors(i.object.up,F)),F.multiplyScalar(ae),d.add(F)}})(),$=(()=>{const F=new P;return function(ae,ue){const Me=i.domElement;if(Me&&i.object instanceof bt&&i.object.isPerspectiveCamera){const B=i.object.position;F.copy(B).sub(i.target);let be=F.length();be*=Math.tan(i.object.fov/2*Math.PI/180),k(2*ae*be/Me.clientHeight,i.object.matrix),H(2*ue*be/Me.clientHeight,i.object.matrix)}else Me&&i.object instanceof oi&&i.object.isOrthographicCamera?(k(ae*(i.object.right-i.object.left)/i.object.zoom/Me.clientWidth,i.object.matrix),H(ue*(i.object.top-i.object.bottom)/i.object.zoom/Me.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}})();function q(F){i.object instanceof bt&&i.object.isPerspectiveCamera||i.object instanceof oi&&i.object.isOrthographicCamera?f=F:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function V(F){q(f/F)}function G(F){q(f*F)}function j(F){if(!i.zoomToCursor||!i.domElement)return;M=!0;const K=i.domElement.getBoundingClientRect(),ae=F.clientX-K.left,ue=F.clientY-K.top,Me=K.width,B=K.height;A.x=ae/Me*2-1,A.y=-(ue/B)*2+1,E.set(A.x,A.y,1).unproject(i.object).sub(i.object.position).normalize()}function O(F){return Math.max(i.minDistance,Math.min(i.maxDistance,F))}function Y(F){p.set(F.clientX,F.clientY)}function te(F){j(F),x.set(F.clientX,F.clientY)}function ge(F){m.set(F.clientX,F.clientY)}function _e(F){_.set(F.clientX,F.clientY),g.subVectors(_,p).multiplyScalar(i.rotateSpeed);const K=i.domElement;K&&(C(2*Math.PI*g.x/K.clientHeight),N(2*Math.PI*g.y/K.clientHeight)),p.copy(_),i.update()}function Ee(F){S.set(F.clientX,F.clientY),b.subVectors(S,x),b.y>0?V(z()):b.y<0&&G(z()),x.copy(S),i.update()}function De(F){y.set(F.clientX,F.clientY),v.subVectors(y,m).multiplyScalar(i.panSpeed),$(v.x,v.y),m.copy(y),i.update()}function xe(F){j(F),F.deltaY<0?G(z()):F.deltaY>0&&V(z()),i.update()}function fe(F){let K=!1;switch(F.code){case i.keys.UP:$(0,i.keyPanSpeed),K=!0;break;case i.keys.BOTTOM:$(0,-i.keyPanSpeed),K=!0;break;case i.keys.LEFT:$(i.keyPanSpeed,0),K=!0;break;case i.keys.RIGHT:$(-i.keyPanSpeed,0),K=!0;break}K&&(F.preventDefault(),i.update())}function D(){if(w.length==1)p.set(w[0].pageX,w[0].pageY);else{const F=.5*(w[0].pageX+w[1].pageX),K=.5*(w[0].pageY+w[1].pageY);p.set(F,K)}}function pe(){if(w.length==1)m.set(w[0].pageX,w[0].pageY);else{const F=.5*(w[0].pageX+w[1].pageX),K=.5*(w[0].pageY+w[1].pageY);m.set(F,K)}}function J(){const F=w[0].pageX-w[1].pageX,K=w[0].pageY-w[1].pageY,ae=Math.sqrt(F*F+K*K);x.set(0,ae)}function de(){i.enableZoom&&J(),i.enablePan&&pe()}function re(){i.enableZoom&&J(),i.enableRotate&&D()}function Pe(F){if(w.length==1)_.set(F.pageX,F.pageY);else{const ae=Be(F),ue=.5*(F.pageX+ae.x),Me=.5*(F.pageY+ae.y);_.set(ue,Me)}g.subVectors(_,p).multiplyScalar(i.rotateSpeed);const K=i.domElement;K&&(C(2*Math.PI*g.x/K.clientHeight),N(2*Math.PI*g.y/K.clientHeight)),p.copy(_)}function Ae(F){if(w.length==1)y.set(F.pageX,F.pageY);else{const K=Be(F),ae=.5*(F.pageX+K.x),ue=.5*(F.pageY+K.y);y.set(ae,ue)}v.subVectors(y,m).multiplyScalar(i.panSpeed),$(v.x,v.y),m.copy(y)}function Te(F){const K=Be(F),ae=F.pageX-K.x,ue=F.pageY-K.y,Me=Math.sqrt(ae*ae+ue*ue);S.set(0,Me),b.set(0,Math.pow(S.y/x.y,i.zoomSpeed)),V(b.y),x.copy(S)}function ze(F){i.enableZoom&&Te(F),i.enablePan&&Ae(F)}function Ge(F){i.enableZoom&&Te(F),i.enableRotate&&Pe(F)}function je(F){var K,ae;i.enabled!==!1&&(w.length===0&&((K=i.domElement)==null||K.ownerDocument.addEventListener("pointermove",U),(ae=i.domElement)==null||ae.ownerDocument.addEventListener("pointerup",T)),Fe(F),F.pointerType==="touch"?Se(F):W(F))}function U(F){i.enabled!==!1&&(F.pointerType==="touch"?ce(F):ve(F))}function T(F){var K,ae,ue;Ne(F),w.length===0&&((K=i.domElement)==null||K.releasePointerCapture(F.pointerId),(ae=i.domElement)==null||ae.ownerDocument.removeEventListener("pointermove",U),(ue=i.domElement)==null||ue.ownerDocument.removeEventListener("pointerup",T)),i.dispatchEvent(o),l=a.NONE}function W(F){let K;switch(F.button){case 0:K=i.mouseButtons.LEFT;break;case 1:K=i.mouseButtons.MIDDLE;break;case 2:K=i.mouseButtons.RIGHT;break;default:K=-1}switch(K){case Ci.DOLLY:if(i.enableZoom===!1)return;te(F),l=a.DOLLY;break;case Ci.ROTATE:if(F.ctrlKey||F.metaKey||F.shiftKey){if(i.enablePan===!1)return;ge(F),l=a.PAN}else{if(i.enableRotate===!1)return;Y(F),l=a.ROTATE}break;case Ci.PAN:if(F.ctrlKey||F.metaKey||F.shiftKey){if(i.enableRotate===!1)return;Y(F),l=a.ROTATE}else{if(i.enablePan===!1)return;ge(F),l=a.PAN}break;default:l=a.NONE}l!==a.NONE&&i.dispatchEvent(r)}function ve(F){if(i.enabled!==!1)switch(l){case a.ROTATE:if(i.enableRotate===!1)return;_e(F);break;case a.DOLLY:if(i.enableZoom===!1)return;Ee(F);break;case a.PAN:if(i.enablePan===!1)return;De(F);break}}function ie(F){i.enabled===!1||i.enableZoom===!1||l!==a.NONE&&l!==a.ROTATE||(F.preventDefault(),i.dispatchEvent(r),xe(F),i.dispatchEvent(o))}function le(F){i.enabled===!1||i.enablePan===!1||fe(F)}function Se(F){switch(me(F),w.length){case 1:switch(i.touches.ONE){case Ri.ROTATE:if(i.enableRotate===!1)return;D(),l=a.TOUCH_ROTATE;break;case Ri.PAN:if(i.enablePan===!1)return;pe(),l=a.TOUCH_PAN;break;default:l=a.NONE}break;case 2:switch(i.touches.TWO){case Ri.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;de(),l=a.TOUCH_DOLLY_PAN;break;case Ri.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;re(),l=a.TOUCH_DOLLY_ROTATE;break;default:l=a.NONE}break;default:l=a.NONE}l!==a.NONE&&i.dispatchEvent(r)}function ce(F){switch(me(F),l){case a.TOUCH_ROTATE:if(i.enableRotate===!1)return;Pe(F),i.update();break;case a.TOUCH_PAN:if(i.enablePan===!1)return;Ae(F),i.update();break;case a.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ze(F),i.update();break;case a.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ge(F),i.update();break;default:l=a.NONE}}function ye(F){i.enabled!==!1&&F.preventDefault()}function Fe(F){w.push(F)}function Ne(F){delete I[F.pointerId];for(let K=0;K<w.length;K++)if(w[K].pointerId==F.pointerId){w.splice(K,1);return}}function me(F){let K=I[F.pointerId];K===void 0&&(K=new se,I[F.pointerId]=K),K.set(F.pageX,F.pageY)}function Be(F){const K=F.pointerId===w[0].pointerId?w[1]:w[0];return I[K.pointerId]}this.dollyIn=(F=z())=>{G(F),i.update()},this.dollyOut=(F=z())=>{V(F),i.update()},this.getScale=()=>f,this.setScale=F=>{q(F),i.update()},this.getZoomScale=()=>z(),t!==void 0&&this.connect(t),this.update()}};const Mf=new Et,Wo=new P;class Pu extends Ha{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Oe(e,3)),this.setAttribute("uv",new Oe(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new ua(t,6,1);return this.setAttribute("instanceStart",new sn(i,3,0)),this.setAttribute("instanceEnd",new sn(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));const n=new ua(i,t*2,1);return this.setAttribute("instanceColorStart",new sn(n,t,0)),this.setAttribute("instanceColorEnd",new sn(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new gu(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Et);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Mf.setFromBufferAttribute(t),this.boundingBox.union(Mf))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new At),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,o=e.count;r<o;r++)Wo.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(Wo)),Wo.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Wo));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class mm extends Pu{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){const i=e.length-t,n=new Float32Array(2*i);if(t===3)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class Lu extends hn{constructor(e){super({type:"LineMaterial",uniforms:zr.clone(zr.merge([we.common,we.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new se(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${dm>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const zl=new it,bf=new P,wf=new P,It=new it,Dt=new it,bn=new it,kl=new P,Gl=new Ve,Ft=new Zp,Ef=new P,Xo=new Et,qo=new At,wn=new it;let Tn,Hi;function Tf(s,e,t){return wn.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),wn.multiplyScalar(1/wn.w),wn.x=Hi/t.width,wn.y=Hi/t.height,wn.applyMatrix4(s.projectionMatrixInverse),wn.multiplyScalar(1/wn.w),Math.abs(Math.max(wn.x,wn.y))}function sb(s,e){const t=s.matrixWorld,i=s.geometry,n=i.attributes.instanceStart,r=i.attributes.instanceEnd,o=Math.min(i.instanceCount,n.count);for(let a=0,l=o;a<l;a++){Ft.start.fromBufferAttribute(n,a),Ft.end.fromBufferAttribute(r,a),Ft.applyMatrix4(t);const c=new P,u=new P;Tn.distanceSqToSegment(Ft.start,Ft.end,u,c),u.distanceTo(c)<Hi*.5&&e.push({point:u,pointOnLine:c,distance:Tn.origin.distanceTo(u),object:s,face:null,faceIndex:a,uv:null,[pm]:null})}}function ob(s,e,t){const i=e.projectionMatrix,r=s.material.resolution,o=s.matrixWorld,a=s.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,u=Math.min(a.instanceCount,l.count),h=-e.near;Tn.at(1,bn),bn.w=1,bn.applyMatrix4(e.matrixWorldInverse),bn.applyMatrix4(i),bn.multiplyScalar(1/bn.w),bn.x*=r.x/2,bn.y*=r.y/2,bn.z=0,kl.copy(bn),Gl.multiplyMatrices(e.matrixWorldInverse,o);for(let f=0,d=u;f<d;f++){if(It.fromBufferAttribute(l,f),Dt.fromBufferAttribute(c,f),It.w=1,Dt.w=1,It.applyMatrix4(Gl),Dt.applyMatrix4(Gl),It.z>h&&Dt.z>h)continue;if(It.z>h){const v=It.z-Dt.z,x=(It.z-h)/v;It.lerp(Dt,x)}else if(Dt.z>h){const v=Dt.z-It.z,x=(Dt.z-h)/v;Dt.lerp(It,x)}It.applyMatrix4(i),Dt.applyMatrix4(i),It.multiplyScalar(1/It.w),Dt.multiplyScalar(1/Dt.w),It.x*=r.x/2,It.y*=r.y/2,Dt.x*=r.x/2,Dt.y*=r.y/2,Ft.start.copy(It),Ft.start.z=0,Ft.end.copy(Dt),Ft.end.z=0;const _=Ft.closestPointToPointParameter(kl,!0);Ft.at(_,Ef);const g=Qc.lerp(It.z,Dt.z,_),m=g>=-1&&g<=1,y=kl.distanceTo(Ef)<Hi*.5;if(m&&y){Ft.start.fromBufferAttribute(l,f),Ft.end.fromBufferAttribute(c,f),Ft.start.applyMatrix4(o),Ft.end.applyMatrix4(o);const v=new P,x=new P;Tn.distanceSqToSegment(Ft.start,Ft.end,x,v),t.push({point:x,pointOnLine:v,distance:Tn.origin.distanceTo(x),object:s,face:null,faceIndex:f,uv:null,[pm]:null})}}}class gm extends mt{constructor(e=new Pu,t=new Lu({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let o=0,a=0,l=t.count;o<l;o++,a+=2)bf.fromBufferAttribute(t,o),wf.fromBufferAttribute(i,o),n[a]=a===0?0:n[a-1],n[a+1]=n[a]+bf.distanceTo(wf);const r=new ua(n,2,1);return e.setAttribute("instanceDistanceStart",new sn(r,1,0)),e.setAttribute("instanceDistanceEnd",new sn(r,1,1)),this}raycast(e,t){const i=this.material.worldUnits,n=e.camera;n===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Tn=e.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Hi=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),qo.copy(a.boundingSphere).applyMatrix4(o);let c;if(i)c=Hi*.5;else{const h=Math.max(n.near,qo.distanceToPoint(Tn.origin));c=Tf(n,h,l.resolution)}if(qo.radius+=c,Tn.intersectsSphere(qo)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Xo.copy(a.boundingBox).applyMatrix4(o);let u;if(i)u=Hi*.5;else{const h=Math.max(n.near,Xo.distanceToPoint(Tn.origin));u=Tf(n,h,l.resolution)}Xo.expandByScalar(u),Tn.intersectsBox(Xo)!==!1&&(i?sb(this,t):ob(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(zl),this.material.uniforms.resolution.value.set(zl.z,zl.w))}}class ab extends gm{constructor(e=new mm,t=new Lu({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const c1=Ce.forwardRef(function({points:e,color:t=16777215,vertexColors:i,linewidth:n,lineWidth:r,segments:o,dashed:a,...l},c){var u,h;const f=Yt(m=>m.size),d=Ce.useMemo(()=>o?new gm:new ab,[o]),[p]=Ce.useState(()=>new Lu),_=(i==null||(u=i[0])==null?void 0:u.length)===4?4:3,g=Ce.useMemo(()=>{const m=o?new Pu:new mm,y=e.map(v=>{const x=Array.isArray(v);return v instanceof P||v instanceof it?[v.x,v.y,v.z]:v instanceof se?[v.x,v.y,0]:x&&v.length===3?[v[0],v[1],v[2]]:x&&v.length===2?[v[0],v[1],0]:v});if(m.setPositions(y.flat()),i){t=16777215;const v=i.map(x=>x instanceof Re?x.toArray():x);m.setColors(v.flat(),_)}return m},[e,o,i,_]);return Ce.useLayoutEffect(()=>{d.computeLineDistances()},[e,d]),Ce.useLayoutEffect(()=>{a?p.defines.USE_DASH="":delete p.defines.USE_DASH,p.needsUpdate=!0},[a,p]),Ce.useEffect(()=>()=>{g.dispose(),p.dispose()},[g]),Ce.createElement("primitive",Wi({object:d,ref:c},l),Ce.createElement("primitive",{object:g,attach:"geometry"}),Ce.createElement("primitive",Wi({object:p,attach:"material",color:t,vertexColors:!!i,resolution:[f.width,f.height],linewidth:(h=n??r)!==null&&h!==void 0?h:1,dashed:a,transparent:_===4},l)))}),_m=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Fc(s){const e=/^[ \t]*#include +<([\w\d./]+)>/gm;function t(i,n){let r=$e[n];return r?Fc(r):i}return s.replace(e,t)}const Ot=[];for(let s=0;s<256;s++)Ot[s]=(s<16?"0":"")+s.toString(16);function lb(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ot[s&255]+Ot[s>>8&255]+Ot[s>>16&255]+Ot[s>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]).toUpperCase()}const Ai=Object.assign||function(){let s=arguments[0];for(let e=1,t=arguments.length;e<t;e++){let i=arguments[e];if(i)for(let n in i)Object.prototype.hasOwnProperty.call(i,n)&&(s[n]=i[n])}return s},cb=Date.now(),Af=new WeakMap,Cf=new Map;let ub=1e10;function Nc(s,e){const t=pb(e);let i=Af.get(s);if(i||Af.set(s,i=Object.create(null)),i[t])return new i[t];const n=`_onBeforeCompile${t}`,r=function(c,u){s.onBeforeCompile.call(this,c,u);const h=this.customProgramCacheKey()+"|"+c.vertexShader+"|"+c.fragmentShader;let f=Cf[h];if(!f){const d=hb(this,c,e,t);f=Cf[h]=d}c.vertexShader=f.vertexShader,c.fragmentShader=f.fragmentShader,Ai(c.uniforms,this.uniforms),e.timeUniform&&(c.uniforms[e.timeUniform]={get value(){return Date.now()-cb}}),this[n]&&this[n](c)},o=function(){return a(e.chained?s:s.clone())},a=function(c){const u=Object.create(c,l);return Object.defineProperty(u,"baseMaterial",{value:s}),Object.defineProperty(u,"id",{value:ub++}),u.uuid=lb(),u.uniforms=Ai({},c.uniforms,e.uniforms),u.defines=Ai({},c.defines,e.defines),u.defines[`TROIKA_DERIVED_MATERIAL_${t}`]="",u.extensions=Ai({},c.extensions,e.extensions),u._listeners=void 0,u},l={constructor:{value:o},isDerivedMaterial:{value:!0},type:{get:()=>s.type,set:c=>{s.type=c}},isDerivedFrom:{writable:!0,configurable:!0,value:function(c){const u=this.baseMaterial;return c===u||u.isDerivedMaterial&&u.isDerivedFrom(c)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return s.customProgramCacheKey()+"|"+t}},onBeforeCompile:{get(){return r},set(c){this[n]=c}},copy:{writable:!0,configurable:!0,value:function(c){return s.copy.call(this,c),!s.isShaderMaterial&&!s.isDerivedMaterial&&(Ai(this.extensions,c.extensions),Ai(this.defines,c.defines),Ai(this.uniforms,zr.clone(c.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const c=new s.constructor;return a(c).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let c=this._depthMaterial;return c||(c=this._depthMaterial=Nc(s.isDerivedMaterial?s.getDepthMaterial():new xa({depthPacking:$c}),e),c.defines.IS_DEPTH_MATERIAL="",c.uniforms=this.uniforms),c}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let c=this._distanceMaterial;return c||(c=this._distanceMaterial=Nc(s.isDerivedMaterial?s.getDistanceMaterial():new Sa,e),c.defines.IS_DISTANCE_MATERIAL="",c.uniforms=this.uniforms),c}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:c,_distanceMaterial:u}=this;c&&c.dispose(),u&&u.dispose(),s.dispose.call(this)}}};return i[t]=o,new o}function hb(s,{vertexShader:e,fragmentShader:t},i,n){let{vertexDefs:r,vertexMainIntro:o,vertexMainOutro:a,vertexTransform:l,fragmentDefs:c,fragmentMainIntro:u,fragmentMainOutro:h,fragmentColorTransform:f,customRewriter:d,timeUniform:p}=i;if(r=r||"",o=o||"",a=a||"",c=c||"",u=u||"",h=h||"",(l||d)&&(e=Fc(e)),(f||d)&&(t=t.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),t=Fc(t)),d){let _=d({vertexShader:e,fragmentShader:t});e=_.vertexShader,t=_.fragmentShader}if(f){let _=[];t=t.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,g=>(_.push(g),"")),h=`${f}
${_.join(`
`)}
${h}`}if(p){const _=`
uniform float ${p};
`;r=_+r,c=_+c}return l&&(e=`vec3 troika_position_${n};
vec3 troika_normal_${n};
vec2 troika_uv_${n};
${e}
`,r=`${r}
void troikaVertexTransform${n}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${l}
}
`,o=`
troika_position_${n} = vec3(position);
troika_normal_${n} = vec3(normal);
troika_uv_${n} = vec2(uv);
troikaVertexTransform${n}(troika_position_${n}, troika_normal_${n}, troika_uv_${n});
${o}
`,e=e.replace(/\b(position|normal|uv)\b/g,(_,g,m,y)=>/\battribute\s+vec[23]\s+$/.test(y.substr(0,m))?g:`troika_${g}_${n}`),s.map&&s.map.channel>0||(e=e.replace(/\bMAP_UV\b/g,`troika_uv_${n}`))),e=Rf(e,n,r,o,a),t=Rf(t,n,c,u,h),{vertexShader:e,fragmentShader:t}}function Rf(s,e,t,i,n){return(i||n||t)&&(s=s.replace(_m,`
${t}
void troikaOrigMain${e}() {`),s+=`
void main() {
  ${i}
  troikaOrigMain${e}();
  ${n}
}`),s}function fb(s,e){return s==="uniforms"?void 0:typeof e=="function"?e.toString():e}let db=0;const Pf=new Map;function pb(s){const e=JSON.stringify(s,fb);let t=Pf.get(e);return t==null&&Pf.set(e,t=++db),t}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function mb(){return typeof window>"u"&&(self.window=self),function(s){var e={parse:function(n){var r=e._bin,o=new Uint8Array(n);if(r.readASCII(o,0,4)=="ttcf"){var a=4;r.readUshort(o,a),a+=2,r.readUshort(o,a),a+=2;var l=r.readUint(o,a);a+=4;for(var c=[],u=0;u<l;u++){var h=r.readUint(o,a);a+=4,c.push(e._readFont(o,h))}return c}return[e._readFont(o,0)]},_readFont:function(n,r){var o=e._bin,a=r;o.readFixed(n,r),r+=4;var l=o.readUshort(n,r);r+=2,o.readUshort(n,r),r+=2,o.readUshort(n,r),r+=2,o.readUshort(n,r),r+=2;for(var c=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],u={_data:n,_offset:a},h={},f=0;f<l;f++){var d=o.readASCII(n,r,4);r+=4,o.readUint(n,r),r+=4;var p=o.readUint(n,r);r+=4;var _=o.readUint(n,r);r+=4,h[d]={offset:p,length:_}}for(f=0;f<c.length;f++){var g=c[f];h[g]&&(u[g.trim()]=e[g.trim()].parse(n,h[g].offset,h[g].length,u))}return u},_tabOffset:function(n,r,o){for(var a=e._bin,l=a.readUshort(n,o+4),c=o+12,u=0;u<l;u++){var h=a.readASCII(n,c,4);c+=4,a.readUint(n,c),c+=4;var f=a.readUint(n,c);if(c+=4,a.readUint(n,c),c+=4,h==r)return f}return 0}};e._bin={readFixed:function(n,r){return(n[r]<<8|n[r+1])+(n[r+2]<<8|n[r+3])/65540},readF2dot14:function(n,r){return e._bin.readShort(n,r)/16384},readInt:function(n,r){return e._bin._view(n).getInt32(r)},readInt8:function(n,r){return e._bin._view(n).getInt8(r)},readShort:function(n,r){return e._bin._view(n).getInt16(r)},readUshort:function(n,r){return e._bin._view(n).getUint16(r)},readUshorts:function(n,r,o){for(var a=[],l=0;l<o;l++)a.push(e._bin.readUshort(n,r+2*l));return a},readUint:function(n,r){return e._bin._view(n).getUint32(r)},readUint64:function(n,r){return 4294967296*e._bin.readUint(n,r)+e._bin.readUint(n,r+4)},readASCII:function(n,r,o){for(var a="",l=0;l<o;l++)a+=String.fromCharCode(n[r+l]);return a},readUnicode:function(n,r,o){for(var a="",l=0;l<o;l++){var c=n[r++]<<8|n[r++];a+=String.fromCharCode(c)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(n,r,o){var a=e._bin._tdec;return a&&r==0&&o==n.length?a.decode(n):e._bin.readASCII(n,r,o)},readBytes:function(n,r,o){for(var a=[],l=0;l<o;l++)a.push(n[r+l]);return a},readASCIIArray:function(n,r,o){for(var a=[],l=0;l<o;l++)a.push(String.fromCharCode(n[r+l]));return a},_view:function(n){return n._dataView||(n._dataView=n.buffer?new DataView(n.buffer,n.byteOffset,n.byteLength):new DataView(new Uint8Array(n).buffer))}},e._lctf={},e._lctf.parse=function(n,r,o,a,l){var c=e._bin,u={},h=r;c.readFixed(n,r),r+=4;var f=c.readUshort(n,r);r+=2;var d=c.readUshort(n,r);r+=2;var p=c.readUshort(n,r);return r+=2,u.scriptList=e._lctf.readScriptList(n,h+f),u.featureList=e._lctf.readFeatureList(n,h+d),u.lookupList=e._lctf.readLookupList(n,h+p,l),u},e._lctf.readLookupList=function(n,r,o){var a=e._bin,l=r,c=[],u=a.readUshort(n,r);r+=2;for(var h=0;h<u;h++){var f=a.readUshort(n,r);r+=2;var d=e._lctf.readLookupTable(n,l+f,o);c.push(d)}return c},e._lctf.readLookupTable=function(n,r,o){var a=e._bin,l=r,c={tabs:[]};c.ltype=a.readUshort(n,r),r+=2,c.flag=a.readUshort(n,r),r+=2;var u=a.readUshort(n,r);r+=2;for(var h=c.ltype,f=0;f<u;f++){var d=a.readUshort(n,r);r+=2;var p=o(n,h,l+d,c);c.tabs.push(p)}return c},e._lctf.numOfOnes=function(n){for(var r=0,o=0;o<32;o++)n>>>o&1&&r++;return r},e._lctf.readClassDef=function(n,r){var o=e._bin,a=[],l=o.readUshort(n,r);if(r+=2,l==1){var c=o.readUshort(n,r);r+=2;var u=o.readUshort(n,r);r+=2;for(var h=0;h<u;h++)a.push(c+h),a.push(c+h),a.push(o.readUshort(n,r)),r+=2}if(l==2){var f=o.readUshort(n,r);for(r+=2,h=0;h<f;h++)a.push(o.readUshort(n,r)),r+=2,a.push(o.readUshort(n,r)),r+=2,a.push(o.readUshort(n,r)),r+=2}return a},e._lctf.getInterval=function(n,r){for(var o=0;o<n.length;o+=3){var a=n[o],l=n[o+1];if(n[o+2],a<=r&&r<=l)return o}return-1},e._lctf.readCoverage=function(n,r){var o=e._bin,a={};a.fmt=o.readUshort(n,r),r+=2;var l=o.readUshort(n,r);return r+=2,a.fmt==1&&(a.tab=o.readUshorts(n,r,l)),a.fmt==2&&(a.tab=o.readUshorts(n,r,3*l)),a},e._lctf.coverageIndex=function(n,r){var o=n.tab;if(n.fmt==1)return o.indexOf(r);if(n.fmt==2){var a=e._lctf.getInterval(o,r);if(a!=-1)return o[a+2]+(r-o[a])}return-1},e._lctf.readFeatureList=function(n,r){var o=e._bin,a=r,l=[],c=o.readUshort(n,r);r+=2;for(var u=0;u<c;u++){var h=o.readASCII(n,r,4);r+=4;var f=o.readUshort(n,r);r+=2;var d=e._lctf.readFeatureTable(n,a+f);d.tag=h.trim(),l.push(d)}return l},e._lctf.readFeatureTable=function(n,r){var o=e._bin,a=r,l={},c=o.readUshort(n,r);r+=2,c>0&&(l.featureParams=a+c);var u=o.readUshort(n,r);r+=2,l.tab=[];for(var h=0;h<u;h++)l.tab.push(o.readUshort(n,r+2*h));return l},e._lctf.readScriptList=function(n,r){var o=e._bin,a=r,l={},c=o.readUshort(n,r);r+=2;for(var u=0;u<c;u++){var h=o.readASCII(n,r,4);r+=4;var f=o.readUshort(n,r);r+=2,l[h.trim()]=e._lctf.readScriptTable(n,a+f)}return l},e._lctf.readScriptTable=function(n,r){var o=e._bin,a=r,l={},c=o.readUshort(n,r);r+=2,c>0&&(l.default=e._lctf.readLangSysTable(n,a+c));var u=o.readUshort(n,r);r+=2;for(var h=0;h<u;h++){var f=o.readASCII(n,r,4);r+=4;var d=o.readUshort(n,r);r+=2,l[f.trim()]=e._lctf.readLangSysTable(n,a+d)}return l},e._lctf.readLangSysTable=function(n,r){var o=e._bin,a={};o.readUshort(n,r),r+=2,a.reqFeature=o.readUshort(n,r),r+=2;var l=o.readUshort(n,r);return r+=2,a.features=o.readUshorts(n,r,l),a},e.CFF={},e.CFF.parse=function(n,r,o){var a=e._bin;(n=new Uint8Array(n.buffer,r,o))[r=0],n[++r],n[++r],n[++r],r++;var l=[];r=e.CFF.readIndex(n,r,l);for(var c=[],u=0;u<l.length-1;u++)c.push(a.readASCII(n,r+l[u],l[u+1]-l[u]));r+=l[l.length-1];var h=[];r=e.CFF.readIndex(n,r,h);var f=[];for(u=0;u<h.length-1;u++)f.push(e.CFF.readDict(n,r+h[u],r+h[u+1]));r+=h[h.length-1];var d=f[0],p=[];r=e.CFF.readIndex(n,r,p);var _=[];for(u=0;u<p.length-1;u++)_.push(a.readASCII(n,r+p[u],p[u+1]-p[u]));if(r+=p[p.length-1],e.CFF.readSubrs(n,r,d),d.CharStrings){r=d.CharStrings,p=[],r=e.CFF.readIndex(n,r,p);var g=[];for(u=0;u<p.length-1;u++)g.push(a.readBytes(n,r+p[u],p[u+1]-p[u]));d.CharStrings=g}if(d.ROS){r=d.FDArray;var m=[];for(r=e.CFF.readIndex(n,r,m),d.FDArray=[],u=0;u<m.length-1;u++){var y=e.CFF.readDict(n,r+m[u],r+m[u+1]);e.CFF._readFDict(n,y,_),d.FDArray.push(y)}r+=m[m.length-1],r=d.FDSelect,d.FDSelect=[];var v=n[r];if(r++,v!=3)throw v;var x=a.readUshort(n,r);for(r+=2,u=0;u<x+1;u++)d.FDSelect.push(a.readUshort(n,r),n[r+2]),r+=3}return d.Encoding&&(d.Encoding=e.CFF.readEncoding(n,d.Encoding,d.CharStrings.length)),d.charset&&(d.charset=e.CFF.readCharset(n,d.charset,d.CharStrings.length)),e.CFF._readFDict(n,d,_),d},e.CFF._readFDict=function(n,r,o){var a;for(var l in r.Private&&(a=r.Private[1],r.Private=e.CFF.readDict(n,a,a+r.Private[0]),r.Private.Subrs&&e.CFF.readSubrs(n,a+r.Private.Subrs,r.Private)),r)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(l)!=-1&&(r[l]=o[r[l]-426+35])},e.CFF.readSubrs=function(n,r,o){var a=e._bin,l=[];r=e.CFF.readIndex(n,r,l);var c,u=l.length;c=u<1240?107:u<33900?1131:32768,o.Bias=c,o.Subrs=[];for(var h=0;h<l.length-1;h++)o.Subrs.push(a.readBytes(n,r+l[h],l[h+1]-l[h]))},e.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],e.CFF.glyphByUnicode=function(n,r){for(var o=0;o<n.charset.length;o++)if(n.charset[o]==r)return o;return-1},e.CFF.glyphBySE=function(n,r){return r<0||r>255?-1:e.CFF.glyphByUnicode(n,e.CFF.tableSE[r])},e.CFF.readEncoding=function(n,r,o){e._bin;var a=[".notdef"],l=n[r];if(r++,l!=0)throw"error: unknown encoding format: "+l;var c=n[r];r++;for(var u=0;u<c;u++)a.push(n[r+u]);return a},e.CFF.readCharset=function(n,r,o){var a=e._bin,l=[".notdef"],c=n[r];if(r++,c==0)for(var u=0;u<o;u++){var h=a.readUshort(n,r);r+=2,l.push(h)}else{if(c!=1&&c!=2)throw"error: format: "+c;for(;l.length<o;){h=a.readUshort(n,r),r+=2;var f=0;for(c==1?(f=n[r],r++):(f=a.readUshort(n,r),r+=2),u=0;u<=f;u++)l.push(h),h++}}return l},e.CFF.readIndex=function(n,r,o){var a=e._bin,l=a.readUshort(n,r)+1,c=n[r+=2];if(r++,c==1)for(var u=0;u<l;u++)o.push(n[r+u]);else if(c==2)for(u=0;u<l;u++)o.push(a.readUshort(n,r+2*u));else if(c==3)for(u=0;u<l;u++)o.push(16777215&a.readUint(n,r+3*u-1));else if(l!=1)throw"unsupported offset size: "+c+", count: "+l;return(r+=l*c)-1},e.CFF.getCharString=function(n,r,o){var a=e._bin,l=n[r],c=n[r+1];n[r+2],n[r+3],n[r+4];var u=1,h=null,f=null;l<=20&&(h=l,u=1),l==12&&(h=100*l+c,u=2),21<=l&&l<=27&&(h=l,u=1),l==28&&(f=a.readShort(n,r+1),u=3),29<=l&&l<=31&&(h=l,u=1),32<=l&&l<=246&&(f=l-139,u=1),247<=l&&l<=250&&(f=256*(l-247)+c+108,u=2),251<=l&&l<=254&&(f=256*-(l-251)-c-108,u=2),l==255&&(f=a.readInt(n,r+1)/65535,u=5),o.val=f??"o"+h,o.size=u},e.CFF.readCharString=function(n,r,o){for(var a=r+o,l=e._bin,c=[];r<a;){var u=n[r],h=n[r+1];n[r+2],n[r+3],n[r+4];var f=1,d=null,p=null;u<=20&&(d=u,f=1),u==12&&(d=100*u+h,f=2),u!=19&&u!=20||(d=u,f=2),21<=u&&u<=27&&(d=u,f=1),u==28&&(p=l.readShort(n,r+1),f=3),29<=u&&u<=31&&(d=u,f=1),32<=u&&u<=246&&(p=u-139,f=1),247<=u&&u<=250&&(p=256*(u-247)+h+108,f=2),251<=u&&u<=254&&(p=256*-(u-251)-h-108,f=2),u==255&&(p=l.readInt(n,r+1)/65535,f=5),c.push(p??"o"+d),r+=f}return c},e.CFF.readDict=function(n,r,o){for(var a=e._bin,l={},c=[];r<o;){var u=n[r],h=n[r+1];n[r+2],n[r+3],n[r+4];var f=1,d=null,p=null;if(u==28&&(p=a.readShort(n,r+1),f=3),u==29&&(p=a.readInt(n,r+1),f=5),32<=u&&u<=246&&(p=u-139,f=1),247<=u&&u<=250&&(p=256*(u-247)+h+108,f=2),251<=u&&u<=254&&(p=256*-(u-251)-h-108,f=2),u==255)throw p=a.readInt(n,r+1)/65535,f=5,"unknown number";if(u==30){var _=[];for(f=1;;){var g=n[r+f];f++;var m=g>>4,y=15&g;if(m!=15&&_.push(m),y!=15&&_.push(y),y==15)break}for(var v="",x=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],S=0;S<_.length;S++)v+=x[_[S]];p=parseFloat(v)}u<=21&&(d=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][u],f=1,u==12&&(d=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][h],f=2)),d!=null?(l[d]=c.length==1?c[0]:c,c=[]):c.push(p),r+=f}return l},e.cmap={},e.cmap.parse=function(n,r,o){n=new Uint8Array(n.buffer,r,o),r=0;var a=e._bin,l={};a.readUshort(n,r),r+=2;var c=a.readUshort(n,r);r+=2;var u=[];l.tables=[];for(var h=0;h<c;h++){var f=a.readUshort(n,r);r+=2;var d=a.readUshort(n,r);r+=2;var p=a.readUint(n,r);r+=4;var _="p"+f+"e"+d,g=u.indexOf(p);if(g==-1){var m;g=l.tables.length,u.push(p);var y=a.readUshort(n,p);y==0?m=e.cmap.parse0(n,p):y==4?m=e.cmap.parse4(n,p):y==6?m=e.cmap.parse6(n,p):y==12?m=e.cmap.parse12(n,p):console.debug("unknown format: "+y,f,d,p),l.tables.push(m)}if(l[_]!=null)throw"multiple tables for one platform+encoding";l[_]=g}return l},e.cmap.parse0=function(n,r){var o=e._bin,a={};a.format=o.readUshort(n,r),r+=2;var l=o.readUshort(n,r);r+=2,o.readUshort(n,r),r+=2,a.map=[];for(var c=0;c<l-6;c++)a.map.push(n[r+c]);return a},e.cmap.parse4=function(n,r){var o=e._bin,a=r,l={};l.format=o.readUshort(n,r),r+=2;var c=o.readUshort(n,r);r+=2,o.readUshort(n,r),r+=2;var u=o.readUshort(n,r);r+=2;var h=u/2;l.searchRange=o.readUshort(n,r),r+=2,l.entrySelector=o.readUshort(n,r),r+=2,l.rangeShift=o.readUshort(n,r),r+=2,l.endCount=o.readUshorts(n,r,h),r+=2*h,r+=2,l.startCount=o.readUshorts(n,r,h),r+=2*h,l.idDelta=[];for(var f=0;f<h;f++)l.idDelta.push(o.readShort(n,r)),r+=2;for(l.idRangeOffset=o.readUshorts(n,r,h),r+=2*h,l.glyphIdArray=[];r<a+c;)l.glyphIdArray.push(o.readUshort(n,r)),r+=2;return l},e.cmap.parse6=function(n,r){var o=e._bin,a={};a.format=o.readUshort(n,r),r+=2,o.readUshort(n,r),r+=2,o.readUshort(n,r),r+=2,a.firstCode=o.readUshort(n,r),r+=2;var l=o.readUshort(n,r);r+=2,a.glyphIdArray=[];for(var c=0;c<l;c++)a.glyphIdArray.push(o.readUshort(n,r)),r+=2;return a},e.cmap.parse12=function(n,r){var o=e._bin,a={};a.format=o.readUshort(n,r),r+=2,r+=2,o.readUint(n,r),r+=4,o.readUint(n,r),r+=4;var l=o.readUint(n,r);r+=4,a.groups=[];for(var c=0;c<l;c++){var u=r+12*c,h=o.readUint(n,u+0),f=o.readUint(n,u+4),d=o.readUint(n,u+8);a.groups.push([h,f,d])}return a},e.glyf={},e.glyf.parse=function(n,r,o,a){for(var l=[],c=0;c<a.maxp.numGlyphs;c++)l.push(null);return l},e.glyf._parseGlyf=function(n,r){var o=e._bin,a=n._data,l=e._tabOffset(a,"glyf",n._offset)+n.loca[r];if(n.loca[r]==n.loca[r+1])return null;var c={};if(c.noc=o.readShort(a,l),l+=2,c.xMin=o.readShort(a,l),l+=2,c.yMin=o.readShort(a,l),l+=2,c.xMax=o.readShort(a,l),l+=2,c.yMax=o.readShort(a,l),l+=2,c.xMin>=c.xMax||c.yMin>=c.yMax)return null;if(c.noc>0){c.endPts=[];for(var u=0;u<c.noc;u++)c.endPts.push(o.readUshort(a,l)),l+=2;var h=o.readUshort(a,l);if(l+=2,a.length-l<h)return null;c.instructions=o.readBytes(a,l,h),l+=h;var f=c.endPts[c.noc-1]+1;for(c.flags=[],u=0;u<f;u++){var d=a[l];if(l++,c.flags.push(d),(8&d)!=0){var p=a[l];l++;for(var _=0;_<p;_++)c.flags.push(d),u++}}for(c.xs=[],u=0;u<f;u++){var g=(2&c.flags[u])!=0,m=(16&c.flags[u])!=0;g?(c.xs.push(m?a[l]:-a[l]),l++):m?c.xs.push(0):(c.xs.push(o.readShort(a,l)),l+=2)}for(c.ys=[],u=0;u<f;u++)g=(4&c.flags[u])!=0,m=(32&c.flags[u])!=0,g?(c.ys.push(m?a[l]:-a[l]),l++):m?c.ys.push(0):(c.ys.push(o.readShort(a,l)),l+=2);var y=0,v=0;for(u=0;u<f;u++)y+=c.xs[u],v+=c.ys[u],c.xs[u]=y,c.ys[u]=v}else{var x;c.parts=[];do{x=o.readUshort(a,l),l+=2;var S={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(c.parts.push(S),S.glyphIndex=o.readUshort(a,l),l+=2,1&x){var b=o.readShort(a,l);l+=2;var E=o.readShort(a,l);l+=2}else b=o.readInt8(a,l),l++,E=o.readInt8(a,l),l++;2&x?(S.m.tx=b,S.m.ty=E):(S.p1=b,S.p2=E),8&x?(S.m.a=S.m.d=o.readF2dot14(a,l),l+=2):64&x?(S.m.a=o.readF2dot14(a,l),l+=2,S.m.d=o.readF2dot14(a,l),l+=2):128&x&&(S.m.a=o.readF2dot14(a,l),l+=2,S.m.b=o.readF2dot14(a,l),l+=2,S.m.c=o.readF2dot14(a,l),l+=2,S.m.d=o.readF2dot14(a,l),l+=2)}while(32&x);if(256&x){var A=o.readUshort(a,l);for(l+=2,c.instr=[],u=0;u<A;u++)c.instr.push(a[l]),l++}}return c},e.GDEF={},e.GDEF.parse=function(n,r,o,a){var l=r;r+=4;var c=e._bin.readUshort(n,r);return{glyphClassDef:c===0?null:e._lctf.readClassDef(n,l+c)}},e.GPOS={},e.GPOS.parse=function(n,r,o,a){return e._lctf.parse(n,r,o,a,e.GPOS.subt)},e.GPOS.subt=function(n,r,o,a){var l=e._bin,c=o,u={};if(u.fmt=l.readUshort(n,o),o+=2,r==1||r==2||r==3||r==7||r==8&&u.fmt<=2){var h=l.readUshort(n,o);o+=2,u.coverage=e._lctf.readCoverage(n,h+c)}if(r==1&&u.fmt==1){var f=l.readUshort(n,o);o+=2,f!=0&&(u.pos=e.GPOS.readValueRecord(n,o,f))}else if(r==2&&u.fmt>=1&&u.fmt<=2){f=l.readUshort(n,o),o+=2;var d=l.readUshort(n,o);o+=2;var p=e._lctf.numOfOnes(f),_=e._lctf.numOfOnes(d);if(u.fmt==1){u.pairsets=[];var g=l.readUshort(n,o);o+=2;for(var m=0;m<g;m++){var y=c+l.readUshort(n,o);o+=2;var v=l.readUshort(n,y);y+=2;for(var x=[],S=0;S<v;S++){var b=l.readUshort(n,y);y+=2,f!=0&&(R=e.GPOS.readValueRecord(n,y,f),y+=2*p),d!=0&&(z=e.GPOS.readValueRecord(n,y,d),y+=2*_),x.push({gid2:b,val1:R,val2:z})}u.pairsets.push(x)}}if(u.fmt==2){var E=l.readUshort(n,o);o+=2;var A=l.readUshort(n,o);o+=2;var M=l.readUshort(n,o);o+=2;var w=l.readUshort(n,o);for(o+=2,u.classDef1=e._lctf.readClassDef(n,c+E),u.classDef2=e._lctf.readClassDef(n,c+A),u.matrix=[],m=0;m<M;m++){var I=[];for(S=0;S<w;S++){var R=null,z=null;f!=0&&(R=e.GPOS.readValueRecord(n,o,f),o+=2*p),d!=0&&(z=e.GPOS.readValueRecord(n,o,d),o+=2*_),I.push({val1:R,val2:z})}u.matrix.push(I)}}}else if(r==4&&u.fmt==1)u.markCoverage=e._lctf.readCoverage(n,l.readUshort(n,o)+c),u.baseCoverage=e._lctf.readCoverage(n,l.readUshort(n,o+2)+c),u.markClassCount=l.readUshort(n,o+4),u.markArray=e.GPOS.readMarkArray(n,l.readUshort(n,o+6)+c),u.baseArray=e.GPOS.readBaseArray(n,l.readUshort(n,o+8)+c,u.markClassCount);else if(r==6&&u.fmt==1)u.mark1Coverage=e._lctf.readCoverage(n,l.readUshort(n,o)+c),u.mark2Coverage=e._lctf.readCoverage(n,l.readUshort(n,o+2)+c),u.markClassCount=l.readUshort(n,o+4),u.mark1Array=e.GPOS.readMarkArray(n,l.readUshort(n,o+6)+c),u.mark2Array=e.GPOS.readBaseArray(n,l.readUshort(n,o+8)+c,u.markClassCount);else{if(r==9&&u.fmt==1){var C=l.readUshort(n,o);o+=2;var N=l.readUint(n,o);if(o+=4,a.ltype==9)a.ltype=C;else if(a.ltype!=C)throw"invalid extension substitution";return e.GPOS.subt(n,a.ltype,c+N)}console.debug("unsupported GPOS table LookupType",r,"format",u.fmt)}return u},e.GPOS.readValueRecord=function(n,r,o){var a=e._bin,l=[];return l.push(1&o?a.readShort(n,r):0),r+=1&o?2:0,l.push(2&o?a.readShort(n,r):0),r+=2&o?2:0,l.push(4&o?a.readShort(n,r):0),r+=4&o?2:0,l.push(8&o?a.readShort(n,r):0),r+=8&o?2:0,l},e.GPOS.readBaseArray=function(n,r,o){var a=e._bin,l=[],c=r,u=a.readUshort(n,r);r+=2;for(var h=0;h<u;h++){for(var f=[],d=0;d<o;d++)f.push(e.GPOS.readAnchorRecord(n,c+a.readUshort(n,r))),r+=2;l.push(f)}return l},e.GPOS.readMarkArray=function(n,r){var o=e._bin,a=[],l=r,c=o.readUshort(n,r);r+=2;for(var u=0;u<c;u++){var h=e.GPOS.readAnchorRecord(n,o.readUshort(n,r+2)+l);h.markClass=o.readUshort(n,r),a.push(h),r+=4}return a},e.GPOS.readAnchorRecord=function(n,r){var o=e._bin,a={};return a.fmt=o.readUshort(n,r),a.x=o.readShort(n,r+2),a.y=o.readShort(n,r+4),a},e.GSUB={},e.GSUB.parse=function(n,r,o,a){return e._lctf.parse(n,r,o,a,e.GSUB.subt)},e.GSUB.subt=function(n,r,o,a){var l=e._bin,c=o,u={};if(u.fmt=l.readUshort(n,o),o+=2,r!=1&&r!=2&&r!=4&&r!=5&&r!=6)return null;if(r==1||r==2||r==4||r==5&&u.fmt<=2||r==6&&u.fmt<=2){var h=l.readUshort(n,o);o+=2,u.coverage=e._lctf.readCoverage(n,c+h)}if(r==1&&u.fmt>=1&&u.fmt<=2){if(u.fmt==1)u.delta=l.readShort(n,o),o+=2;else if(u.fmt==2){var f=l.readUshort(n,o);o+=2,u.newg=l.readUshorts(n,o,f),o+=2*u.newg.length}}else if(r==2&&u.fmt==1){f=l.readUshort(n,o),o+=2,u.seqs=[];for(var d=0;d<f;d++){var p=l.readUshort(n,o)+c;o+=2;var _=l.readUshort(n,p);u.seqs.push(l.readUshorts(n,p+2,_))}}else if(r==4)for(u.vals=[],f=l.readUshort(n,o),o+=2,d=0;d<f;d++){var g=l.readUshort(n,o);o+=2,u.vals.push(e.GSUB.readLigatureSet(n,c+g))}else if(r==5&&u.fmt==2){if(u.fmt==2){var m=l.readUshort(n,o);o+=2,u.cDef=e._lctf.readClassDef(n,c+m),u.scset=[];var y=l.readUshort(n,o);for(o+=2,d=0;d<y;d++){var v=l.readUshort(n,o);o+=2,u.scset.push(v==0?null:e.GSUB.readSubClassSet(n,c+v))}}}else if(r==6&&u.fmt==3){if(u.fmt==3){for(d=0;d<3;d++){f=l.readUshort(n,o),o+=2;for(var x=[],S=0;S<f;S++)x.push(e._lctf.readCoverage(n,c+l.readUshort(n,o+2*S)));o+=2*f,d==0&&(u.backCvg=x),d==1&&(u.inptCvg=x),d==2&&(u.ahedCvg=x)}f=l.readUshort(n,o),o+=2,u.lookupRec=e.GSUB.readSubstLookupRecords(n,o,f)}}else{if(r==7&&u.fmt==1){var b=l.readUshort(n,o);o+=2;var E=l.readUint(n,o);if(o+=4,a.ltype==9)a.ltype=b;else if(a.ltype!=b)throw"invalid extension substitution";return e.GSUB.subt(n,a.ltype,c+E)}console.debug("unsupported GSUB table LookupType",r,"format",u.fmt)}return u},e.GSUB.readSubClassSet=function(n,r){var o=e._bin.readUshort,a=r,l=[],c=o(n,r);r+=2;for(var u=0;u<c;u++){var h=o(n,r);r+=2,l.push(e.GSUB.readSubClassRule(n,a+h))}return l},e.GSUB.readSubClassRule=function(n,r){var o=e._bin.readUshort,a={},l=o(n,r),c=o(n,r+=2);r+=2,a.input=[];for(var u=0;u<l-1;u++)a.input.push(o(n,r)),r+=2;return a.substLookupRecords=e.GSUB.readSubstLookupRecords(n,r,c),a},e.GSUB.readSubstLookupRecords=function(n,r,o){for(var a=e._bin.readUshort,l=[],c=0;c<o;c++)l.push(a(n,r),a(n,r+2)),r+=4;return l},e.GSUB.readChainSubClassSet=function(n,r){var o=e._bin,a=r,l=[],c=o.readUshort(n,r);r+=2;for(var u=0;u<c;u++){var h=o.readUshort(n,r);r+=2,l.push(e.GSUB.readChainSubClassRule(n,a+h))}return l},e.GSUB.readChainSubClassRule=function(n,r){for(var o=e._bin,a={},l=["backtrack","input","lookahead"],c=0;c<l.length;c++){var u=o.readUshort(n,r);r+=2,c==1&&u--,a[l[c]]=o.readUshorts(n,r,u),r+=2*a[l[c]].length}return u=o.readUshort(n,r),r+=2,a.subst=o.readUshorts(n,r,2*u),r+=2*a.subst.length,a},e.GSUB.readLigatureSet=function(n,r){var o=e._bin,a=r,l=[],c=o.readUshort(n,r);r+=2;for(var u=0;u<c;u++){var h=o.readUshort(n,r);r+=2,l.push(e.GSUB.readLigature(n,a+h))}return l},e.GSUB.readLigature=function(n,r){var o=e._bin,a={chain:[]};a.nglyph=o.readUshort(n,r),r+=2;var l=o.readUshort(n,r);r+=2;for(var c=0;c<l-1;c++)a.chain.push(o.readUshort(n,r)),r+=2;return a},e.head={},e.head.parse=function(n,r,o){var a=e._bin,l={};return a.readFixed(n,r),r+=4,l.fontRevision=a.readFixed(n,r),r+=4,a.readUint(n,r),r+=4,a.readUint(n,r),r+=4,l.flags=a.readUshort(n,r),r+=2,l.unitsPerEm=a.readUshort(n,r),r+=2,l.created=a.readUint64(n,r),r+=8,l.modified=a.readUint64(n,r),r+=8,l.xMin=a.readShort(n,r),r+=2,l.yMin=a.readShort(n,r),r+=2,l.xMax=a.readShort(n,r),r+=2,l.yMax=a.readShort(n,r),r+=2,l.macStyle=a.readUshort(n,r),r+=2,l.lowestRecPPEM=a.readUshort(n,r),r+=2,l.fontDirectionHint=a.readShort(n,r),r+=2,l.indexToLocFormat=a.readShort(n,r),r+=2,l.glyphDataFormat=a.readShort(n,r),r+=2,l},e.hhea={},e.hhea.parse=function(n,r,o){var a=e._bin,l={};return a.readFixed(n,r),r+=4,l.ascender=a.readShort(n,r),r+=2,l.descender=a.readShort(n,r),r+=2,l.lineGap=a.readShort(n,r),r+=2,l.advanceWidthMax=a.readUshort(n,r),r+=2,l.minLeftSideBearing=a.readShort(n,r),r+=2,l.minRightSideBearing=a.readShort(n,r),r+=2,l.xMaxExtent=a.readShort(n,r),r+=2,l.caretSlopeRise=a.readShort(n,r),r+=2,l.caretSlopeRun=a.readShort(n,r),r+=2,l.caretOffset=a.readShort(n,r),r+=2,r+=8,l.metricDataFormat=a.readShort(n,r),r+=2,l.numberOfHMetrics=a.readUshort(n,r),r+=2,l},e.hmtx={},e.hmtx.parse=function(n,r,o,a){for(var l=e._bin,c={aWidth:[],lsBearing:[]},u=0,h=0,f=0;f<a.maxp.numGlyphs;f++)f<a.hhea.numberOfHMetrics&&(u=l.readUshort(n,r),r+=2,h=l.readShort(n,r),r+=2),c.aWidth.push(u),c.lsBearing.push(h);return c},e.kern={},e.kern.parse=function(n,r,o,a){var l=e._bin,c=l.readUshort(n,r);if(r+=2,c==1)return e.kern.parseV1(n,r-2,o,a);var u=l.readUshort(n,r);r+=2;for(var h={glyph1:[],rval:[]},f=0;f<u;f++){r+=2,o=l.readUshort(n,r),r+=2;var d=l.readUshort(n,r);r+=2;var p=d>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;r=e.kern.readFormat0(n,r,h)}return h},e.kern.parseV1=function(n,r,o,a){var l=e._bin;l.readFixed(n,r),r+=4;var c=l.readUint(n,r);r+=4;for(var u={glyph1:[],rval:[]},h=0;h<c;h++){l.readUint(n,r),r+=4;var f=l.readUshort(n,r);r+=2,l.readUshort(n,r),r+=2;var d=f>>>8;if((d&=15)!=0)throw"unknown kern table format: "+d;r=e.kern.readFormat0(n,r,u)}return u},e.kern.readFormat0=function(n,r,o){var a=e._bin,l=-1,c=a.readUshort(n,r);r+=2,a.readUshort(n,r),r+=2,a.readUshort(n,r),r+=2,a.readUshort(n,r),r+=2;for(var u=0;u<c;u++){var h=a.readUshort(n,r);r+=2;var f=a.readUshort(n,r);r+=2;var d=a.readShort(n,r);r+=2,h!=l&&(o.glyph1.push(h),o.rval.push({glyph2:[],vals:[]}));var p=o.rval[o.rval.length-1];p.glyph2.push(f),p.vals.push(d),l=h}return r},e.loca={},e.loca.parse=function(n,r,o,a){var l=e._bin,c=[],u=a.head.indexToLocFormat,h=a.maxp.numGlyphs+1;if(u==0)for(var f=0;f<h;f++)c.push(l.readUshort(n,r+(f<<1))<<1);if(u==1)for(f=0;f<h;f++)c.push(l.readUint(n,r+(f<<2)));return c},e.maxp={},e.maxp.parse=function(n,r,o){var a=e._bin,l={},c=a.readUint(n,r);return r+=4,l.numGlyphs=a.readUshort(n,r),r+=2,c==65536&&(l.maxPoints=a.readUshort(n,r),r+=2,l.maxContours=a.readUshort(n,r),r+=2,l.maxCompositePoints=a.readUshort(n,r),r+=2,l.maxCompositeContours=a.readUshort(n,r),r+=2,l.maxZones=a.readUshort(n,r),r+=2,l.maxTwilightPoints=a.readUshort(n,r),r+=2,l.maxStorage=a.readUshort(n,r),r+=2,l.maxFunctionDefs=a.readUshort(n,r),r+=2,l.maxInstructionDefs=a.readUshort(n,r),r+=2,l.maxStackElements=a.readUshort(n,r),r+=2,l.maxSizeOfInstructions=a.readUshort(n,r),r+=2,l.maxComponentElements=a.readUshort(n,r),r+=2,l.maxComponentDepth=a.readUshort(n,r),r+=2),l},e.name={},e.name.parse=function(n,r,o){var a=e._bin,l={};a.readUshort(n,r),r+=2;var c=a.readUshort(n,r);r+=2,a.readUshort(n,r);for(var u,h=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],f=r+=2,d=0;d<c;d++){var p=a.readUshort(n,r);r+=2;var _=a.readUshort(n,r);r+=2;var g=a.readUshort(n,r);r+=2;var m=a.readUshort(n,r);r+=2;var y=a.readUshort(n,r);r+=2;var v=a.readUshort(n,r);r+=2;var x,S=h[m],b=f+12*c+v;if(p==0)x=a.readUnicode(n,b,y/2);else if(p==3&&_==0)x=a.readUnicode(n,b,y/2);else if(_==0)x=a.readASCII(n,b,y);else if(_==1)x=a.readUnicode(n,b,y/2);else if(_==3)x=a.readUnicode(n,b,y/2);else{if(p!=1)throw"unknown encoding "+_+", platformID: "+p;x=a.readASCII(n,b,y),console.debug("reading unknown MAC encoding "+_+" as ASCII")}var E="p"+p+","+g.toString(16);l[E]==null&&(l[E]={}),l[E][S!==void 0?S:m]=x,l[E]._lang=g}for(var A in l)if(l[A].postScriptName!=null&&l[A]._lang==1033)return l[A];for(var A in l)if(l[A].postScriptName!=null&&l[A]._lang==0)return l[A];for(var A in l)if(l[A].postScriptName!=null&&l[A]._lang==3084)return l[A];for(var A in l)if(l[A].postScriptName!=null)return l[A];for(var A in l){u=A;break}return console.debug("returning name table with languageID "+l[u]._lang),l[u]},e["OS/2"]={},e["OS/2"].parse=function(n,r,o){var a=e._bin.readUshort(n,r);r+=2;var l={};if(a==0)e["OS/2"].version0(n,r,l);else if(a==1)e["OS/2"].version1(n,r,l);else if(a==2||a==3||a==4)e["OS/2"].version2(n,r,l);else{if(a!=5)throw"unknown OS/2 table version: "+a;e["OS/2"].version5(n,r,l)}return l},e["OS/2"].version0=function(n,r,o){var a=e._bin;return o.xAvgCharWidth=a.readShort(n,r),r+=2,o.usWeightClass=a.readUshort(n,r),r+=2,o.usWidthClass=a.readUshort(n,r),r+=2,o.fsType=a.readUshort(n,r),r+=2,o.ySubscriptXSize=a.readShort(n,r),r+=2,o.ySubscriptYSize=a.readShort(n,r),r+=2,o.ySubscriptXOffset=a.readShort(n,r),r+=2,o.ySubscriptYOffset=a.readShort(n,r),r+=2,o.ySuperscriptXSize=a.readShort(n,r),r+=2,o.ySuperscriptYSize=a.readShort(n,r),r+=2,o.ySuperscriptXOffset=a.readShort(n,r),r+=2,o.ySuperscriptYOffset=a.readShort(n,r),r+=2,o.yStrikeoutSize=a.readShort(n,r),r+=2,o.yStrikeoutPosition=a.readShort(n,r),r+=2,o.sFamilyClass=a.readShort(n,r),r+=2,o.panose=a.readBytes(n,r,10),r+=10,o.ulUnicodeRange1=a.readUint(n,r),r+=4,o.ulUnicodeRange2=a.readUint(n,r),r+=4,o.ulUnicodeRange3=a.readUint(n,r),r+=4,o.ulUnicodeRange4=a.readUint(n,r),r+=4,o.achVendID=[a.readInt8(n,r),a.readInt8(n,r+1),a.readInt8(n,r+2),a.readInt8(n,r+3)],r+=4,o.fsSelection=a.readUshort(n,r),r+=2,o.usFirstCharIndex=a.readUshort(n,r),r+=2,o.usLastCharIndex=a.readUshort(n,r),r+=2,o.sTypoAscender=a.readShort(n,r),r+=2,o.sTypoDescender=a.readShort(n,r),r+=2,o.sTypoLineGap=a.readShort(n,r),r+=2,o.usWinAscent=a.readUshort(n,r),r+=2,o.usWinDescent=a.readUshort(n,r),r+=2},e["OS/2"].version1=function(n,r,o){var a=e._bin;return r=e["OS/2"].version0(n,r,o),o.ulCodePageRange1=a.readUint(n,r),r+=4,o.ulCodePageRange2=a.readUint(n,r),r+=4},e["OS/2"].version2=function(n,r,o){var a=e._bin;return r=e["OS/2"].version1(n,r,o),o.sxHeight=a.readShort(n,r),r+=2,o.sCapHeight=a.readShort(n,r),r+=2,o.usDefault=a.readUshort(n,r),r+=2,o.usBreak=a.readUshort(n,r),r+=2,o.usMaxContext=a.readUshort(n,r),r+=2},e["OS/2"].version5=function(n,r,o){var a=e._bin;return r=e["OS/2"].version2(n,r,o),o.usLowerOpticalPointSize=a.readUshort(n,r),r+=2,o.usUpperOpticalPointSize=a.readUshort(n,r),r+=2},e.post={},e.post.parse=function(n,r,o){var a=e._bin,l={};return l.version=a.readFixed(n,r),r+=4,l.italicAngle=a.readFixed(n,r),r+=4,l.underlinePosition=a.readShort(n,r),r+=2,l.underlineThickness=a.readShort(n,r),r+=2,l},e==null&&(e={}),e.U==null&&(e.U={}),e.U.codeToGlyph=function(n,r){var o=n.cmap,a=-1;if(o.p0e4!=null?a=o.p0e4:o.p3e1!=null?a=o.p3e1:o.p1e0!=null?a=o.p1e0:o.p0e3!=null&&(a=o.p0e3),a==-1)throw"no familiar platform and encoding!";var l=o.tables[a];if(l.format==0)return r>=l.map.length?0:l.map[r];if(l.format==4){for(var c=-1,u=0;u<l.endCount.length;u++)if(r<=l.endCount[u]){c=u;break}return c==-1||l.startCount[c]>r?0:65535&(l.idRangeOffset[c]!=0?l.glyphIdArray[r-l.startCount[c]+(l.idRangeOffset[c]>>1)-(l.idRangeOffset.length-c)]:r+l.idDelta[c])}if(l.format==12){if(r>l.groups[l.groups.length-1][1])return 0;for(u=0;u<l.groups.length;u++){var h=l.groups[u];if(h[0]<=r&&r<=h[1])return h[2]+(r-h[0])}return 0}throw"unknown cmap table format "+l.format},e.U.glyphToPath=function(n,r){var o={cmds:[],crds:[]};if(n.SVG&&n.SVG.entries[r]){var a=n.SVG.entries[r];return a==null?o:(typeof a=="string"&&(a=e.SVG.toPath(a),n.SVG.entries[r]=a),a)}if(n.CFF){var l={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:n.CFF.Private?n.CFF.Private.defaultWidthX:0,open:!1},c=n.CFF,u=n.CFF.Private;if(c.ROS){for(var h=0;c.FDSelect[h+2]<=r;)h+=2;u=c.FDArray[c.FDSelect[h+1]].Private}e.U._drawCFF(n.CFF.CharStrings[r],l,c,u,o)}else n.glyf&&e.U._drawGlyf(r,n,o);return o},e.U._drawGlyf=function(n,r,o){var a=r.glyf[n];a==null&&(a=r.glyf[n]=e.glyf._parseGlyf(r,n)),a!=null&&(a.noc>-1?e.U._simpleGlyph(a,o):e.U._compoGlyph(a,r,o))},e.U._simpleGlyph=function(n,r){for(var o=0;o<n.noc;o++){for(var a=o==0?0:n.endPts[o-1]+1,l=n.endPts[o],c=a;c<=l;c++){var u=c==a?l:c-1,h=c==l?a:c+1,f=1&n.flags[c],d=1&n.flags[u],p=1&n.flags[h],_=n.xs[c],g=n.ys[c];if(c==a)if(f){if(!d){e.U.P.moveTo(r,_,g);continue}e.U.P.moveTo(r,n.xs[u],n.ys[u])}else d?e.U.P.moveTo(r,n.xs[u],n.ys[u]):e.U.P.moveTo(r,(n.xs[u]+_)/2,(n.ys[u]+g)/2);f?d&&e.U.P.lineTo(r,_,g):p?e.U.P.qcurveTo(r,_,g,n.xs[h],n.ys[h]):e.U.P.qcurveTo(r,_,g,(_+n.xs[h])/2,(g+n.ys[h])/2)}e.U.P.closePath(r)}},e.U._compoGlyph=function(n,r,o){for(var a=0;a<n.parts.length;a++){var l={cmds:[],crds:[]},c=n.parts[a];e.U._drawGlyf(c.glyphIndex,r,l);for(var u=c.m,h=0;h<l.crds.length;h+=2){var f=l.crds[h],d=l.crds[h+1];o.crds.push(f*u.a+d*u.b+u.tx),o.crds.push(f*u.c+d*u.d+u.ty)}for(h=0;h<l.cmds.length;h++)o.cmds.push(l.cmds[h])}},e.U._getGlyphClass=function(n,r){var o=e._lctf.getInterval(r,n);return o==-1?0:r[o+2]},e.U._applySubs=function(n,r,o,a){for(var l=n.length-r-1,c=0;c<o.tabs.length;c++)if(o.tabs[c]!=null){var u,h=o.tabs[c];if(!h.coverage||(u=e._lctf.coverageIndex(h.coverage,n[r]))!=-1){if(o.ltype==1)n[r],h.fmt==1?n[r]=n[r]+h.delta:n[r]=h.newg[u];else if(o.ltype==4)for(var f=h.vals[u],d=0;d<f.length;d++){var p=f[d],_=p.chain.length;if(!(_>l)){for(var g=!0,m=0,y=0;y<_;y++){for(;n[r+m+(1+y)]==-1;)m++;p.chain[y]!=n[r+m+(1+y)]&&(g=!1)}if(g){for(n[r]=p.nglyph,y=0;y<_+m;y++)n[r+y+1]=-1;break}}}else if(o.ltype==5&&h.fmt==2)for(var v=e._lctf.getInterval(h.cDef,n[r]),x=h.cDef[v+2],S=h.scset[x],b=0;b<S.length;b++){var E=S[b],A=E.input;if(!(A.length>l)){for(g=!0,y=0;y<A.length;y++){var M=e._lctf.getInterval(h.cDef,n[r+1+y]);if(v==-1&&h.cDef[M+2]!=A[y]){g=!1;break}}if(g){var w=E.substLookupRecords;for(d=0;d<w.length;d+=2)w[d],w[d+1]}}}else if(o.ltype==6&&h.fmt==3){if(!e.U._glsCovered(n,h.backCvg,r-h.backCvg.length)||!e.U._glsCovered(n,h.inptCvg,r)||!e.U._glsCovered(n,h.ahedCvg,r+h.inptCvg.length))continue;var I=h.lookupRec;for(b=0;b<I.length;b+=2){v=I[b];var R=a[I[b+1]];e.U._applySubs(n,r+v,R,a)}}}}},e.U._glsCovered=function(n,r,o){for(var a=0;a<r.length;a++)if(e._lctf.coverageIndex(r[a],n[o+a])==-1)return!1;return!0},e.U.glyphsToPath=function(n,r,o){for(var a={cmds:[],crds:[]},l=0,c=0;c<r.length;c++){var u=r[c];if(u!=-1){for(var h=c<r.length-1&&r[c+1]!=-1?r[c+1]:0,f=e.U.glyphToPath(n,u),d=0;d<f.crds.length;d+=2)a.crds.push(f.crds[d]+l),a.crds.push(f.crds[d+1]);for(o&&a.cmds.push(o),d=0;d<f.cmds.length;d++)a.cmds.push(f.cmds[d]);o&&a.cmds.push("X"),l+=n.hmtx.aWidth[u],c<r.length-1&&(l+=e.U.getPairAdjustment(n,u,h))}}return a},e.U.P={},e.U.P.moveTo=function(n,r,o){n.cmds.push("M"),n.crds.push(r,o)},e.U.P.lineTo=function(n,r,o){n.cmds.push("L"),n.crds.push(r,o)},e.U.P.curveTo=function(n,r,o,a,l,c,u){n.cmds.push("C"),n.crds.push(r,o,a,l,c,u)},e.U.P.qcurveTo=function(n,r,o,a,l){n.cmds.push("Q"),n.crds.push(r,o,a,l)},e.U.P.closePath=function(n){n.cmds.push("Z")},e.U._drawCFF=function(n,r,o,a,l){for(var c=r.stack,u=r.nStems,h=r.haveWidth,f=r.width,d=r.open,p=0,_=r.x,g=r.y,m=0,y=0,v=0,x=0,S=0,b=0,E=0,A=0,M=0,w=0,I={val:0,size:0};p<n.length;){e.CFF.getCharString(n,p,I);var R=I.val;if(p+=I.size,R=="o1"||R=="o18")c.length%2!=0&&!h&&(f=c.shift()+a.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(R=="o3"||R=="o23")c.length%2!=0&&!h&&(f=c.shift()+a.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(R=="o4")c.length>1&&!h&&(f=c.shift()+a.nominalWidthX,h=!0),d&&e.U.P.closePath(l),g+=c.pop(),e.U.P.moveTo(l,_,g),d=!0;else if(R=="o5")for(;c.length>0;)_+=c.shift(),g+=c.shift(),e.U.P.lineTo(l,_,g);else if(R=="o6"||R=="o7")for(var z=c.length,C=R=="o6",N=0;N<z;N++){var k=c.shift();C?_+=k:g+=k,C=!C,e.U.P.lineTo(l,_,g)}else if(R=="o8"||R=="o24"){z=c.length;for(var H=0;H+6<=z;)m=_+c.shift(),y=g+c.shift(),v=m+c.shift(),x=y+c.shift(),_=v+c.shift(),g=x+c.shift(),e.U.P.curveTo(l,m,y,v,x,_,g),H+=6;R=="o24"&&(_+=c.shift(),g+=c.shift(),e.U.P.lineTo(l,_,g))}else{if(R=="o11")break;if(R=="o1234"||R=="o1235"||R=="o1236"||R=="o1237")R=="o1234"&&(y=g,v=(m=_+c.shift())+c.shift(),w=x=y+c.shift(),b=x,A=g,_=(E=(S=(M=v+c.shift())+c.shift())+c.shift())+c.shift(),e.U.P.curveTo(l,m,y,v,x,M,w),e.U.P.curveTo(l,S,b,E,A,_,g)),R=="o1235"&&(m=_+c.shift(),y=g+c.shift(),v=m+c.shift(),x=y+c.shift(),M=v+c.shift(),w=x+c.shift(),S=M+c.shift(),b=w+c.shift(),E=S+c.shift(),A=b+c.shift(),_=E+c.shift(),g=A+c.shift(),c.shift(),e.U.P.curveTo(l,m,y,v,x,M,w),e.U.P.curveTo(l,S,b,E,A,_,g)),R=="o1236"&&(m=_+c.shift(),y=g+c.shift(),v=m+c.shift(),w=x=y+c.shift(),b=x,E=(S=(M=v+c.shift())+c.shift())+c.shift(),A=b+c.shift(),_=E+c.shift(),e.U.P.curveTo(l,m,y,v,x,M,w),e.U.P.curveTo(l,S,b,E,A,_,g)),R=="o1237"&&(m=_+c.shift(),y=g+c.shift(),v=m+c.shift(),x=y+c.shift(),M=v+c.shift(),w=x+c.shift(),S=M+c.shift(),b=w+c.shift(),E=S+c.shift(),A=b+c.shift(),Math.abs(E-_)>Math.abs(A-g)?_=E+c.shift():g=A+c.shift(),e.U.P.curveTo(l,m,y,v,x,M,w),e.U.P.curveTo(l,S,b,E,A,_,g));else if(R=="o14"){if(c.length>0&&!h&&(f=c.shift()+o.nominalWidthX,h=!0),c.length==4){var $=c.shift(),q=c.shift(),V=c.shift(),G=c.shift(),j=e.CFF.glyphBySE(o,V),O=e.CFF.glyphBySE(o,G);e.U._drawCFF(o.CharStrings[j],r,o,a,l),r.x=$,r.y=q,e.U._drawCFF(o.CharStrings[O],r,o,a,l)}d&&(e.U.P.closePath(l),d=!1)}else if(R=="o19"||R=="o20")c.length%2!=0&&!h&&(f=c.shift()+a.nominalWidthX),u+=c.length>>1,c.length=0,h=!0,p+=u+7>>3;else if(R=="o21")c.length>2&&!h&&(f=c.shift()+a.nominalWidthX,h=!0),g+=c.pop(),_+=c.pop(),d&&e.U.P.closePath(l),e.U.P.moveTo(l,_,g),d=!0;else if(R=="o22")c.length>1&&!h&&(f=c.shift()+a.nominalWidthX,h=!0),_+=c.pop(),d&&e.U.P.closePath(l),e.U.P.moveTo(l,_,g),d=!0;else if(R=="o25"){for(;c.length>6;)_+=c.shift(),g+=c.shift(),e.U.P.lineTo(l,_,g);m=_+c.shift(),y=g+c.shift(),v=m+c.shift(),x=y+c.shift(),_=v+c.shift(),g=x+c.shift(),e.U.P.curveTo(l,m,y,v,x,_,g)}else if(R=="o26")for(c.length%2&&(_+=c.shift());c.length>0;)m=_,y=g+c.shift(),_=v=m+c.shift(),g=(x=y+c.shift())+c.shift(),e.U.P.curveTo(l,m,y,v,x,_,g);else if(R=="o27")for(c.length%2&&(g+=c.shift());c.length>0;)y=g,v=(m=_+c.shift())+c.shift(),x=y+c.shift(),_=v+c.shift(),g=x,e.U.P.curveTo(l,m,y,v,x,_,g);else if(R=="o10"||R=="o29"){var Y=R=="o10"?a:o;if(c.length==0)console.debug("error: empty stack");else{var te=c.pop(),ge=Y.Subrs[te+Y.Bias];r.x=_,r.y=g,r.nStems=u,r.haveWidth=h,r.width=f,r.open=d,e.U._drawCFF(ge,r,o,a,l),_=r.x,g=r.y,u=r.nStems,h=r.haveWidth,f=r.width,d=r.open}}else if(R=="o30"||R=="o31"){var _e=c.length,Ee=(H=0,R=="o31");for(H+=_e-(z=-3&_e);H<z;)Ee?(y=g,v=(m=_+c.shift())+c.shift(),g=(x=y+c.shift())+c.shift(),z-H==5?(_=v+c.shift(),H++):_=v,Ee=!1):(m=_,y=g+c.shift(),v=m+c.shift(),x=y+c.shift(),_=v+c.shift(),z-H==5?(g=x+c.shift(),H++):g=x,Ee=!0),e.U.P.curveTo(l,m,y,v,x,_,g),H+=4}else{if((R+"").charAt(0)=="o")throw console.debug("Unknown operation: "+R,n),R;c.push(R)}}}r.x=_,r.y=g,r.nStems=u,r.haveWidth=h,r.width=f,r.open=d};var t=e,i={Typr:t};return s.Typr=t,s.default=i,Object.defineProperty(s,"__esModule",{value:!0}),s}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function gb(){return function(s){var e=Uint8Array,t=Uint16Array,i=Uint32Array,n=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),r=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),o=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(R,z){for(var C=new t(31),N=0;N<31;++N)C[N]=z+=1<<R[N-1];var k=new i(C[30]);for(N=1;N<30;++N)for(var H=C[N];H<C[N+1];++H)k[H]=H-C[N]<<5|N;return[C,k]},l=a(n,2),c=l[0],u=l[1];c[28]=258,u[258]=28;for(var h=a(r,0)[0],f=new t(32768),d=0;d<32768;++d){var p=(43690&d)>>>1|(21845&d)<<1;p=(61680&(p=(52428&p)>>>2|(13107&p)<<2))>>>4|(3855&p)<<4,f[d]=((65280&p)>>>8|(255&p)<<8)>>>1}var _=function(R,z,C){for(var N=R.length,k=0,H=new t(z);k<N;++k)++H[R[k]-1];var $,q=new t(z);for(k=0;k<z;++k)q[k]=q[k-1]+H[k-1]<<1;if(C){$=new t(1<<z);var V=15-z;for(k=0;k<N;++k)if(R[k])for(var G=k<<4|R[k],j=z-R[k],O=q[R[k]-1]++<<j,Y=O|(1<<j)-1;O<=Y;++O)$[f[O]>>>V]=G}else for($=new t(N),k=0;k<N;++k)R[k]&&($[k]=f[q[R[k]-1]++]>>>15-R[k]);return $},g=new e(288);for(d=0;d<144;++d)g[d]=8;for(d=144;d<256;++d)g[d]=9;for(d=256;d<280;++d)g[d]=7;for(d=280;d<288;++d)g[d]=8;var m=new e(32);for(d=0;d<32;++d)m[d]=5;var y=_(g,9,1),v=_(m,5,1),x=function(R){for(var z=R[0],C=1;C<R.length;++C)R[C]>z&&(z=R[C]);return z},S=function(R,z,C){var N=z/8|0;return(R[N]|R[N+1]<<8)>>(7&z)&C},b=function(R,z){var C=z/8|0;return(R[C]|R[C+1]<<8|R[C+2]<<16)>>(7&z)},E=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],A=function(R,z,C){var N=new Error(z||E[R]);if(N.code=R,Error.captureStackTrace&&Error.captureStackTrace(N,A),!C)throw N;return N},M=function(R,z,C){var N=R.length;if(!N||C&&!C.l&&N<5)return z||new e(0);var k=!z||C,H=!C||C.i;C||(C={}),z||(z=new e(3*N));var $,q=function(Be){var F=z.length;if(Be>F){var K=new e(Math.max(2*F,Be));K.set(z),z=K}},V=C.f||0,G=C.p||0,j=C.b||0,O=C.l,Y=C.d,te=C.m,ge=C.n,_e=8*N;do{if(!O){C.f=V=S(R,G,1);var Ee=S(R,G+1,3);if(G+=3,!Ee){var De=R[(ze=(($=G)/8|0)+(7&$&&1)+4)-4]|R[ze-3]<<8,xe=ze+De;if(xe>N){H&&A(0);break}k&&q(j+De),z.set(R.subarray(ze,xe),j),C.b=j+=De,C.p=G=8*xe;continue}if(Ee==1)O=y,Y=v,te=9,ge=5;else if(Ee==2){var fe=S(R,G,31)+257,D=S(R,G+10,15)+4,pe=fe+S(R,G+5,31)+1;G+=14;for(var J=new e(pe),de=new e(19),re=0;re<D;++re)de[o[re]]=S(R,G+3*re,7);G+=3*D;var Pe=x(de),Ae=(1<<Pe)-1,Te=_(de,Pe,1);for(re=0;re<pe;){var ze,Ge=Te[S(R,G,Ae)];if(G+=15&Ge,(ze=Ge>>>4)<16)J[re++]=ze;else{var je=0,U=0;for(ze==16?(U=3+S(R,G,3),G+=2,je=J[re-1]):ze==17?(U=3+S(R,G,7),G+=3):ze==18&&(U=11+S(R,G,127),G+=7);U--;)J[re++]=je}}var T=J.subarray(0,fe),W=J.subarray(fe);te=x(T),ge=x(W),O=_(T,te,1),Y=_(W,ge,1)}else A(1);if(G>_e){H&&A(0);break}}k&&q(j+131072);for(var ve=(1<<te)-1,ie=(1<<ge)-1,le=G;;le=G){var Se=(je=O[b(R,G)&ve])>>>4;if((G+=15&je)>_e){H&&A(0);break}if(je||A(2),Se<256)z[j++]=Se;else{if(Se==256){le=G,O=null;break}var ce=Se-254;if(Se>264){var ye=n[re=Se-257];ce=S(R,G,(1<<ye)-1)+c[re],G+=ye}var Fe=Y[b(R,G)&ie],Ne=Fe>>>4;if(Fe||A(3),G+=15&Fe,W=h[Ne],Ne>3&&(ye=r[Ne],W+=b(R,G)&(1<<ye)-1,G+=ye),G>_e){H&&A(0);break}k&&q(j+131072);for(var me=j+ce;j<me;j+=4)z[j]=z[j-W],z[j+1]=z[j+1-W],z[j+2]=z[j+2-W],z[j+3]=z[j+3-W];j=me}}C.l=O,C.p=le,C.b=j,O&&(V=1,C.m=te,C.d=Y,C.n=ge)}while(!V);return j==z.length?z:function(Be,F,K){(F==null||F<0)&&(F=0),(K==null||K>Be.length)&&(K=Be.length);var ae=new(Be instanceof t?t:Be instanceof i?i:e)(K-F);return ae.set(Be.subarray(F,K)),ae}(z,0,j)},w=new e(0),I=typeof TextDecoder<"u"&&new TextDecoder;try{I.decode(w,{stream:!0})}catch{}return s.convert_streams=function(R){var z=new DataView(R),C=0;function N(){var fe=z.getUint16(C);return C+=2,fe}function k(){var fe=z.getUint32(C);return C+=4,fe}function H(fe){De.setUint16(xe,fe),xe+=2}function $(fe){De.setUint32(xe,fe),xe+=4}for(var q={signature:k(),flavor:k(),length:k(),numTables:N(),reserved:N(),totalSfntSize:k(),majorVersion:N(),minorVersion:N(),metaOffset:k(),metaLength:k(),metaOrigLength:k(),privOffset:k(),privLength:k()},V=0;Math.pow(2,V)<=q.numTables;)V++;V--;for(var G=16*Math.pow(2,V),j=16*q.numTables-G,O=12,Y=[],te=0;te<q.numTables;te++)Y.push({tag:k(),offset:k(),compLength:k(),origLength:k(),origChecksum:k()}),O+=16;var ge,_e=new Uint8Array(12+16*Y.length+Y.reduce(function(fe,D){return fe+D.origLength+4},0)),Ee=_e.buffer,De=new DataView(Ee),xe=0;return $(q.flavor),H(q.numTables),H(G),H(V),H(j),Y.forEach(function(fe){$(fe.tag),$(fe.origChecksum),$(O),$(fe.origLength),fe.outOffset=O,(O+=fe.origLength)%4!=0&&(O+=4-O%4)}),Y.forEach(function(fe){var D,pe=R.slice(fe.offset,fe.offset+fe.compLength);if(fe.compLength!=fe.origLength){var J=new Uint8Array(fe.origLength);D=new Uint8Array(pe,2),M(D,J)}else J=new Uint8Array(pe);_e.set(J,fe.outOffset);var de=0;(O=fe.outOffset+fe.origLength)%4!=0&&(de=4-O%4),_e.set(new Uint8Array(de).buffer,fe.outOffset+fe.origLength),ge=O+de}),Ee.slice(0,ge)},Object.defineProperty(s,"__esModule",{value:!0}),s}({}).convert_streams}function _b(s,e){const t={M:2,L:2,Q:4,C:6,Z:0},i={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},n=1,r=2,o=4,a=8,l=16,c=32;let u;function h(E){if(!u){const A={R:r,L:n,D:o,C:l,U:c,T:a};u=new Map;for(let M in i){let w=0;i[M].split(",").forEach(I=>{let[R,z]=I.split("+");R=parseInt(R,36),z=z?parseInt(z,36):0,u.set(w+=R,A[M]);for(let C=z;C--;)u.set(++w,A[M])})}}return u.get(E)||c}const f=1,d=2,p=3,_=4,g=[null,"isol","init","fina","medi"];function m(E){const A=new Uint8Array(E.length);let M=c,w=f,I=-1;for(let R=0;R<E.length;R++){const z=E.codePointAt(R);let C=h(z)|0,N=f;C&a||(M&(n|o|l)?C&(r|o|l)?(N=p,(w===f||w===p)&&A[I]++):C&(n|c)&&(w===d||w===_)&&A[I]--:M&(r|c)&&(w===d||w===_)&&A[I]--,w=A[R]=N,M=C,I=R,z>65535&&R++)}return A}function y(E,A){const M=[];for(let I=0;I<A.length;I++){const R=A.codePointAt(I);R>65535&&I++,M.push(s.U.codeToGlyph(E,R))}const w=E.GSUB;if(w){const{lookupList:I,featureList:R}=w;let z;const C=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,N=[];R.forEach(k=>{if(C.test(k.tag))for(let H=0;H<k.tab.length;H++){if(N[k.tab[H]])continue;N[k.tab[H]]=!0;const $=I[k.tab[H]],q=/^(isol|init|fina|medi)$/.test(k.tag);q&&!z&&(z=m(A));for(let V=0;V<M.length;V++)(!z||!q||g[z[V]]===k.tag)&&s.U._applySubs(M,V,$,I)}})}return M}function v(E,A){const M=new Int16Array(A.length*3);let w=0;for(;w<A.length;w++){const C=A[w];if(C===-1)continue;M[w*3+2]=E.hmtx.aWidth[C];const N=E.GPOS;if(N){const k=N.lookupList;for(let H=0;H<k.length;H++){const $=k[H];for(let q=0;q<$.tabs.length;q++){const V=$.tabs[q];if($.ltype===1){if(s._lctf.coverageIndex(V.coverage,C)!==-1&&V.pos){z(V.pos,w);break}}else if($.ltype===2){let G=null,j=I();if(j!==-1){const O=s._lctf.coverageIndex(V.coverage,A[j]);if(O!==-1){if(V.fmt===1){const Y=V.pairsets[O];for(let te=0;te<Y.length;te++)Y[te].gid2===C&&(G=Y[te])}else if(V.fmt===2){const Y=s.U._getGlyphClass(A[j],V.classDef1),te=s.U._getGlyphClass(C,V.classDef2);G=V.matrix[Y][te]}if(G){G.val1&&z(G.val1,j),G.val2&&z(G.val2,w);break}}}}else if($.ltype===4){const G=s._lctf.coverageIndex(V.markCoverage,C);if(G!==-1){const j=I(R),O=j===-1?-1:s._lctf.coverageIndex(V.baseCoverage,A[j]);if(O!==-1){const Y=V.markArray[G],te=V.baseArray[O][Y.markClass];M[w*3]=te.x-Y.x+M[j*3]-M[j*3+2],M[w*3+1]=te.y-Y.y+M[j*3+1];break}}}else if($.ltype===6){const G=s._lctf.coverageIndex(V.mark1Coverage,C);if(G!==-1){const j=I();if(j!==-1){const O=A[j];if(x(E,O)===3){const Y=s._lctf.coverageIndex(V.mark2Coverage,O);if(Y!==-1){const te=V.mark1Array[G],ge=V.mark2Array[Y][te.markClass];M[w*3]=ge.x-te.x+M[j*3]-M[j*3+2],M[w*3+1]=ge.y-te.y+M[j*3+1];break}}}}}}}}else if(E.kern&&!E.cff){const k=I();if(k!==-1){const H=E.kern.glyph1.indexOf(A[k]);if(H!==-1){const $=E.kern.rval[H].glyph2.indexOf(C);$!==-1&&(M[k*3+2]+=E.kern.rval[H].vals[$])}}}}return M;function I(C){for(let N=w-1;N>=0;N--)if(A[N]!==-1&&(!C||C(A[N])))return N;return-1}function R(C){return x(E,C)===1}function z(C,N){for(let k=0;k<3;k++)M[N*3+k]+=C[k]||0}}function x(E,A){const M=E.GDEF&&E.GDEF.glyphClassDef;return M?s.U._getGlyphClass(A,M):0}function S(...E){for(let A=0;A<E.length;A++)if(typeof E[A]=="number")return E[A]}function b(E){const A=Object.create(null),M=E["OS/2"],w=E.hhea,I=E.head.unitsPerEm,R=S(M&&M.sTypoAscender,w&&w.ascender,I),z={unitsPerEm:I,ascender:R,descender:S(M&&M.sTypoDescender,w&&w.descender,0),capHeight:S(M&&M.sCapHeight,R),xHeight:S(M&&M.sxHeight,R),lineGap:S(M&&M.sTypoLineGap,w&&w.lineGap),supportsCodePoint(C){return s.U.codeToGlyph(E,C)>0},forEachGlyph(C,N,k,H){let $=0;const q=1/z.unitsPerEm*N,V=y(E,C);let G=0;const j=v(E,V);return V.forEach((O,Y)=>{if(O!==-1){let te=A[O];if(!te){const{cmds:ge,crds:_e}=s.U.glyphToPath(E,O);let Ee="",De=0;for(let J=0,de=ge.length;J<de;J++){const re=t[ge[J]];Ee+=ge[J];for(let Pe=1;Pe<=re;Pe++)Ee+=(Pe>1?",":"")+_e[De++]}let xe,fe,D,pe;if(_e.length){xe=fe=1/0,D=pe=-1/0;for(let J=0,de=_e.length;J<de;J+=2){let re=_e[J],Pe=_e[J+1];re<xe&&(xe=re),Pe<fe&&(fe=Pe),re>D&&(D=re),Pe>pe&&(pe=Pe)}}else xe=D=fe=pe=0;te=A[O]={index:O,advanceWidth:E.hmtx.aWidth[O],xMin:xe,yMin:fe,xMax:D,yMax:pe,path:Ee}}H.call(null,te,$+j[Y*3]*q,j[Y*3+1]*q,G),$+=j[Y*3+2]*q,k&&($+=k*N)}G+=C.codePointAt(G)>65535?2:1}),$}};return z}return function(A){const M=new Uint8Array(A,0,4),w=s._bin.readASCII(M,0,4);if(w==="wOFF")A=e(A);else if(w==="wOF2")throw new Error("woff2 fonts not supported");return b(s.parse(A)[0])}}const vb=Fs({name:"Typr Font Parser",dependencies:[mb,gb,_b],init(s,e,t){const i=s(),n=e();return t(i,n)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function yb(){return function(s){var e=function(){this.buckets=new Map};e.prototype.add=function(v){var x=v>>5;this.buckets.set(x,(this.buckets.get(x)||0)|1<<(31&v))},e.prototype.has=function(v){var x=this.buckets.get(v>>5);return x!==void 0&&(x&1<<(31&v))!=0},e.prototype.serialize=function(){var v=[];return this.buckets.forEach(function(x,S){v.push((+S).toString(36)+":"+x.toString(36))}),v.join(",")},e.prototype.deserialize=function(v){var x=this;this.buckets.clear(),v.split(",").forEach(function(S){var b=S.split(":");x.buckets.set(parseInt(b[0],36),parseInt(b[1],36))})};var t=Math.pow(2,8),i=t-1,n=~i;function r(v){var x=function(b){return b&n}(v).toString(16),S=function(b){return(b&n)+t-1}(v).toString(16);return"codepoint-index/plane"+(v>>16)+"/"+x+"-"+S+".json"}function o(v,x){var S=v&i,b=x.codePointAt(S/6|0);return((b=(b||48)-48)&1<<S%6)!=0}function a(v,x){var S;(S=v,S.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(b){return b.split("-").map(function(E){return parseInt(E.trim(),16)})})).forEach(function(b){var E=b[0],A=b[1];A===void 0&&(A=E),x(E,A)})}function l(v,x){a(v,function(S,b){for(var E=S;E<=b;E++)x(E)})}var c={},u={},h=new WeakMap,f="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function d(v){var x=h.get(v);return x||(x=new e,l(v.ranges,function(S){return x.add(S)}),h.set(v,x)),x}var p,_=new Map;function g(v,x,S){return v[x]?x:v[S]?S:function(b){for(var E in b)return E}(v)}function m(v,x){var S=x;if(!v.includes(S)){S=1/0;for(var b=0;b<v.length;b++)Math.abs(v[b]-x)<Math.abs(S-x)&&(S=v[b])}return S}function y(v){return p||(p=new Set,l("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(x){p.add(x)})),p.has(v)}return s.CodePointSet=e,s.clearCache=function(){c={},u={}},s.getFontsForString=function(v,x){x===void 0&&(x={});var S,b=x.lang;b===void 0&&(b=/\p{Script=Hangul}/u.test(S=v)?"ko":/\p{Script=Hiragana}|\p{Script=Katakana}/u.test(S)?"ja":"en");var E=x.category;E===void 0&&(E="sans-serif");var A=x.style;A===void 0&&(A="normal");var M=x.weight;M===void 0&&(M=400);var w=(x.dataUrl||f).replace(/\/$/g,""),I=new Map,R=new Uint8Array(v.length),z={},C={},N=new Array(v.length),k=new Map,H=!1;function $(G){var j=_.get(G);return j||(j=fetch(w+"/"+G).then(function(O){if(!O.ok)throw new Error(O.statusText);return O.json().then(function(Y){if(!Array.isArray(Y)||Y[0]!==1)throw new Error("Incorrect schema version; need 1, got "+Y[0]);return Y[1]})}).catch(function(O){if(w!==f)return H||(console.error('unicode-font-resolver: Failed loading from dataUrl "'+w+'", trying default CDN. '+O.message),H=!0),w=f,_.delete(G),$(G);throw O}),_.set(G,j)),j}for(var q=function(G){var j=v.codePointAt(G),O=r(j);N[G]=O,c[O]||k.has(O)||k.set(O,$(O).then(function(Y){c[O]=Y})),j>65535&&(G++,V=G)},V=0;V<v.length;V++)q(V);return Promise.all(k.values()).then(function(){k.clear();for(var G=function(O){var Y=v.codePointAt(O),te=null,ge=c[N[O]],_e=void 0;for(var Ee in ge){var De=C[Ee];if(De===void 0&&(De=C[Ee]=new RegExp(Ee).test(b||"en")),De){for(var xe in _e=Ee,ge[Ee])if(o(Y,ge[Ee][xe])){te=xe;break}break}}if(!te){e:for(var fe in ge)if(fe!==_e){for(var D in ge[fe])if(o(Y,ge[fe][D])){te=D;break e}}}te||(console.debug("No font coverage for U+"+Y.toString(16)),te="latin"),N[O]=te,u[te]||k.has(te)||k.set(te,$("font-meta/"+te+".json").then(function(pe){u[te]=pe})),Y>65535&&(O++,j=O)},j=0;j<v.length;j++)G(j);return Promise.all(k.values())}).then(function(){for(var G,j=null,O=0;O<v.length;O++){var Y=v.codePointAt(O);if(j&&(y(Y)||d(j).has(Y)))R[O]=R[O-1];else{j=u[N[O]];var te=z[j.id];if(!te){var ge=j.typeforms,_e=g(ge,E,"sans-serif"),Ee=g(ge[_e],A,"normal"),De=m((G=ge[_e])===null||G===void 0?void 0:G[Ee],M);te=z[j.id]=w+"/font-files/"+j.id+"/"+_e+"."+Ee+"."+De+".woff"}var xe=I.get(te);xe==null&&(xe=I.size,I.set(te,xe)),R[O]=xe}Y>65535&&(O++,R[O]=R[O-1])}return{fontUrls:Array.from(I.keys()),chars:R}})},Object.defineProperty(s,"__esModule",{value:!0}),s}({})}function xb(s,e){const t=Object.create(null),i=Object.create(null);function n(o,a){const l=c=>{console.error(`Failure loading font ${o}`,c)};try{const c=new XMLHttpRequest;c.open("get",o,!0),c.responseType="arraybuffer",c.onload=function(){if(c.status>=400)l(new Error(c.statusText));else if(c.status>0)try{const u=s(c.response);u.src=o,a(u)}catch(u){l(u)}},c.onerror=l,c.send()}catch(c){l(c)}}function r(o,a){let l=t[o];l?a(l):i[o]?i[o].push(a):(i[o]=[a],n(o,c=>{c.src=o,t[o]=c,i[o].forEach(u=>u(c)),delete i[o]}))}return function(o,a,{lang:l,fonts:c=[],style:u="normal",weight:h="normal",unicodeFontsURL:f}={}){const d=new Uint8Array(o.length),p=[];o.length||y();const _=new Map,g=[];if(u!=="italic"&&(u="normal"),typeof h!="number"&&(h=h==="bold"?700:400),c&&!Array.isArray(c)&&(c=[c]),c=c.slice().filter(x=>!x.lang||x.lang.test(l)).reverse(),c.length){let E=0;(function A(M=0){for(let w=M,I=o.length;w<I;w++){const R=o.codePointAt(w);if(E===1&&p[d[w-1]].supportsCodePoint(R)||w>0&&/\s/.test(o[w]))d[w]=d[w-1],E===2&&(g[g.length-1][1]=w);else for(let z=d[w],C=c.length;z<=C;z++)if(z===C){const N=E===2?g[g.length-1]:g[g.length]=[w,w];N[1]=w,E=2}else{d[w]=z;const{src:N,unicodeRange:k}=c[z];if(!k||v(R,k)){const H=t[N];if(!H){r(N,()=>{A(w)});return}if(H.supportsCodePoint(R)){let $=_.get(H);typeof $!="number"&&($=p.length,p.push(H),_.set(H,$)),d[w]=$,E=1;break}}}R>65535&&w+1<I&&(d[w+1]=d[w],w++,E===2&&(g[g.length-1][1]=w))}m()})()}else g.push([0,o.length-1]),m();function m(){if(g.length){const x=g.map(S=>o.substring(S[0],S[1]+1)).join(`
`);e.getFontsForString(x,{lang:l||void 0,style:u,weight:h,dataUrl:f}).then(({fontUrls:S,chars:b})=>{const E=p.length;let A=0;g.forEach(w=>{for(let I=0,R=w[1]-w[0];I<=R;I++)d[w[0]+I]=b[A++]+E;A++});let M=0;S.forEach((w,I)=>{r(w,R=>{p[I+E]=R,++M===S.length&&y()})})})}else y()}function y(){a({chars:d,fonts:p})}function v(x,S){for(let b=0;b<S.length;b++){const[E,A=E]=S[b];if(E<=x&&x<=A)return!0}return!1}}}const Sb=Fs({name:"FontResolver",dependencies:[xb,vb,yb],init(s,e,t){return s(e,t())}});function Mb(s,e){const i=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,n="[^\\S\\u00A0]",r=new RegExp(`${n}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function o({text:p,lang:_,fonts:g,style:m,weight:y,preResolvedFonts:v,unicodeFontsURL:x},S){const b=({chars:E,fonts:A})=>{let M,w;const I=[];for(let R=0;R<E.length;R++)E[R]!==w?(w=E[R],I.push(M={start:R,end:R,fontObj:A[E[R]]})):M.end=R;S(I)};v?b(v):s(p,b,{lang:_,fonts:g,style:m,weight:y,unicodeFontsURL:x})}function a({text:p="",font:_,lang:g,sdfGlyphSize:m=64,fontSize:y=400,fontWeight:v=1,fontStyle:x="normal",letterSpacing:S=0,lineHeight:b="normal",maxWidth:E=1/0,direction:A,textAlign:M="left",textIndent:w=0,whiteSpace:I="normal",overflowWrap:R="normal",anchorX:z=0,anchorY:C=0,metricsOnly:N=!1,unicodeFontsURL:k,preResolvedFonts:H=null,includeCaretPositions:$=!1,chunkedBoundsSize:q=8192,colorRanges:V=null},G){const j=h(),O={fontLoad:0,typesetting:0};p.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),p=p.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),y=+y,S=+S,E=+E,b=b||"normal",w=+w,o({text:p,lang:g,style:x,weight:v,fonts:typeof _=="string"?[{src:_}]:_,unicodeFontsURL:k,preResolvedFonts:H},Y=>{O.fontLoad=h()-j;const te=isFinite(E);let ge=null,_e=null,Ee=null,De=null,xe=null,fe=null,D=null,pe=null,J=0,de=0,re=I!=="nowrap";const Pe=new Map,Ae=h();let Te=w,ze=0,Ge=new f;const je=[Ge];Y.forEach(ie=>{const{fontObj:le}=ie,{ascender:Se,descender:ce,unitsPerEm:ye,lineGap:Fe,capHeight:Ne,xHeight:me}=le;let Be=Pe.get(le);if(!Be){const Me=y/ye,B=b==="normal"?(Se-ce+Fe)*Me:b*y,be=(B-(Se-ce)*Me)/2,oe=Math.min(B,(Se-ce)*Me),Z=(Se+ce)/2*Me+oe/2;Be={index:Pe.size,src:le.src,fontObj:le,fontSizeMult:Me,unitsPerEm:ye,ascender:Se*Me,descender:ce*Me,capHeight:Ne*Me,xHeight:me*Me,lineHeight:B,baseline:-be-Se*Me,caretTop:Z,caretBottom:Z-oe},Pe.set(le,Be)}const{fontSizeMult:F}=Be,K=p.slice(ie.start,ie.end+1);let ae,ue;le.forEachGlyph(K,y,S,(Me,B,be,oe)=>{B+=ze,oe+=ie.start,ae=B,ue=Me;const Z=p.charAt(oe),he=Me.advanceWidth*F,Ue=Ge.count;let Le;if("isEmpty"in Me||(Me.isWhitespace=!!Z&&new RegExp(n).test(Z),Me.canBreakAfter=!!Z&&r.test(Z),Me.isEmpty=Me.xMin===Me.xMax||Me.yMin===Me.yMax||i.test(Z)),!Me.isWhitespace&&!Me.isEmpty&&de++,re&&te&&!Me.isWhitespace&&B+he+Te>E&&Ue){if(Ge.glyphAt(Ue-1).glyphObj.canBreakAfter)Le=new f,Te=-B;else for(let rt=Ue;rt--;)if(rt===0&&R==="break-word"){Le=new f,Te=-B;break}else if(Ge.glyphAt(rt).glyphObj.canBreakAfter){Le=Ge.splitAt(rt+1);const qe=Le.glyphAt(0).x;Te-=qe;for(let st=Le.count;st--;)Le.glyphAt(st).x-=qe;break}Le&&(Ge.isSoftWrapped=!0,Ge=Le,je.push(Ge),J=E)}let Xe=Ge.glyphAt(Ge.count);Xe.glyphObj=Me,Xe.x=B+Te,Xe.y=be,Xe.width=he,Xe.charIndex=oe,Xe.fontData=Be,Z===`
`&&(Ge=new f,je.push(Ge),Te=-(B+he+S*y)+w)}),ze=ae+ue.advanceWidth*F+S*y});let U=0;je.forEach(ie=>{let le=!0;for(let Se=ie.count;Se--;){const ce=ie.glyphAt(Se);le&&!ce.glyphObj.isWhitespace&&(ie.width=ce.x+ce.width,ie.width>J&&(J=ie.width),le=!1);let{lineHeight:ye,capHeight:Fe,xHeight:Ne,baseline:me}=ce.fontData;ye>ie.lineHeight&&(ie.lineHeight=ye);const Be=me-ie.baseline;Be<0&&(ie.baseline+=Be,ie.cap+=Be,ie.ex+=Be),ie.cap=Math.max(ie.cap,ie.baseline+Fe),ie.ex=Math.max(ie.ex,ie.baseline+Ne)}ie.baseline-=U,ie.cap-=U,ie.ex-=U,U+=ie.lineHeight});let T=0,W=0;if(z&&(typeof z=="number"?T=-z:typeof z=="string"&&(T=-J*(z==="left"?0:z==="center"?.5:z==="right"?1:c(z)))),C&&(typeof C=="number"?W=-C:typeof C=="string"&&(W=C==="top"?0:C==="top-baseline"?-je[0].baseline:C==="top-cap"?-je[0].cap:C==="top-ex"?-je[0].ex:C==="middle"?U/2:C==="bottom"?U:C==="bottom-baseline"?-je[je.length-1].baseline:c(C)*U)),!N){const ie=e.getEmbeddingLevels(p,A);ge=new Uint16Array(de),_e=new Uint8Array(de),Ee=new Float32Array(de*2),De={},D=[1/0,1/0,-1/0,-1/0],pe=[],$&&(fe=new Float32Array(p.length*4)),V&&(xe=new Uint8Array(de*3));let le=0,Se=-1,ce=-1,ye,Fe;if(je.forEach((Ne,me)=>{let{count:Be,width:F}=Ne;if(Be>0){let K=0;for(let oe=Be;oe--&&Ne.glyphAt(oe).glyphObj.isWhitespace;)K++;let ae=0,ue=0;if(M==="center")ae=(J-F)/2;else if(M==="right")ae=J-F;else if(M==="justify"&&Ne.isSoftWrapped){let oe=0;for(let Z=Be-K;Z--;)Ne.glyphAt(Z).glyphObj.isWhitespace&&oe++;ue=(J-F)/oe}if(ue||ae){let oe=0;for(let Z=0;Z<Be;Z++){let he=Ne.glyphAt(Z);const Ue=he.glyphObj;he.x+=ae+oe,ue!==0&&Ue.isWhitespace&&Z<Be-K&&(oe+=ue,he.width+=ue)}}const Me=e.getReorderSegments(p,ie,Ne.glyphAt(0).charIndex,Ne.glyphAt(Ne.count-1).charIndex);for(let oe=0;oe<Me.length;oe++){const[Z,he]=Me[oe];let Ue=1/0,Le=-1/0;for(let Xe=0;Xe<Be;Xe++)if(Ne.glyphAt(Xe).charIndex>=Z){let rt=Xe,qe=Xe;for(;qe<Be;qe++){let st=Ne.glyphAt(qe);if(st.charIndex>he)break;qe<Be-K&&(Ue=Math.min(Ue,st.x),Le=Math.max(Le,st.x+st.width))}for(let st=rt;st<qe;st++){const Pt=Ne.glyphAt(st);Pt.x=Le-(Pt.x+Pt.width-Ue)}break}}let B;const be=oe=>B=oe;for(let oe=0;oe<Be;oe++){const Z=Ne.glyphAt(oe);B=Z.glyphObj;const he=B.index,Ue=ie.levels[Z.charIndex]&1;if(Ue){const Le=e.getMirroredCharacter(p[Z.charIndex]);Le&&Z.fontData.fontObj.forEachGlyph(Le,0,0,be)}if($){const{charIndex:Le,fontData:Xe}=Z,rt=Z.x+T,qe=Z.x+Z.width+T;fe[Le*4]=Ue?qe:rt,fe[Le*4+1]=Ue?rt:qe,fe[Le*4+2]=Ne.baseline+Xe.caretBottom+W,fe[Le*4+3]=Ne.baseline+Xe.caretTop+W;const st=Le-Se;st>1&&u(fe,Se,st),Se=Le}if(V){const{charIndex:Le}=Z;for(;Le>ce;)ce++,V.hasOwnProperty(ce)&&(Fe=V[ce])}if(!B.isWhitespace&&!B.isEmpty){const Le=le++,{fontSizeMult:Xe,src:rt,index:qe}=Z.fontData,st=De[rt]||(De[rt]={});st[he]||(st[he]={path:B.path,pathBounds:[B.xMin,B.yMin,B.xMax,B.yMax]});const Pt=Z.x+T,er=Z.y+Ne.baseline+W;Ee[Le*2]=Pt,Ee[Le*2+1]=er;const tr=Pt+B.xMin*Xe,Un=er+B.yMin*Xe,pi=Pt+B.xMax*Xe,In=er+B.yMax*Xe;tr<D[0]&&(D[0]=tr),Un<D[1]&&(D[1]=Un),pi>D[2]&&(D[2]=pi),In>D[3]&&(D[3]=In),Le%q===0&&(ye={start:Le,end:Le,rect:[1/0,1/0,-1/0,-1/0]},pe.push(ye)),ye.end++;const fn=ye.rect;if(tr<fn[0]&&(fn[0]=tr),Un<fn[1]&&(fn[1]=Un),pi>fn[2]&&(fn[2]=pi),In>fn[3]&&(fn[3]=In),ge[Le]=he,_e[Le]=qe,V){const nr=Le*3;xe[nr]=Fe>>16&255,xe[nr+1]=Fe>>8&255,xe[nr+2]=Fe&255}}}}}),fe){const Ne=p.length-Se;Ne>1&&u(fe,Se,Ne)}}const ve=[];Pe.forEach(({index:ie,src:le,unitsPerEm:Se,ascender:ce,descender:ye,lineHeight:Fe,capHeight:Ne,xHeight:me})=>{ve[ie]={src:le,unitsPerEm:Se,ascender:ce,descender:ye,lineHeight:Fe,capHeight:Ne,xHeight:me}}),O.typesetting=h()-Ae,G({glyphIds:ge,glyphFontIndices:_e,glyphPositions:Ee,glyphData:De,fontData:ve,caretPositions:fe,glyphColors:xe,chunkedBounds:pe,fontSize:y,topBaseline:W+je[0].baseline,blockBounds:[T,W-U,T+J,W],visibleBounds:D,timings:O})})}function l(p,_){a({...p,metricsOnly:!0},g=>{const[m,y,v,x]=g.blockBounds;_({width:v-m,height:x-y})})}function c(p){let _=p.match(/^([\d.]+)%$/),g=_?parseFloat(_[1]):NaN;return isNaN(g)?0:g/100}function u(p,_,g){const m=p[_*4],y=p[_*4+1],v=p[_*4+2],x=p[_*4+3],S=(y-m)/g;for(let b=0;b<g;b++){const E=(_+b)*4;p[E]=m+S*b,p[E+1]=m+S*(b+1),p[E+2]=v,p[E+3]=x}}function h(){return(self.performance||Date).now()}function f(){this.data=[]}const d=["glyphObj","x","y","width","charIndex","fontData"];return f.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/d.length)},glyphAt(p){let _=f.flyweight;return _.data=this.data,_.index=p,_},splitAt(p){let _=new f;return _.data=this.data.splice(p*d.length),_}},f.flyweight=d.reduce((p,_,g,m)=>(Object.defineProperty(p,_,{get(){return this.data[this.index*d.length+g]},set(y){this.data[this.index*d.length+g]=y}}),p),{data:null,index:0}),{typeset:a,measure:l}}const Vi=()=>(self.performance||Date).now(),Va=Hf();let Lf;function bb(s,e,t,i,n,r,o,a,l,c,u=!0){return u?Eb(s,e,t,i,n,r,o,a,l,c).then(null,h=>(Lf||(console.warn("WebGL SDF generation failed, falling back to JS",h),Lf=!0),If(s,e,t,i,n,r,o,a,l,c))):If(s,e,t,i,n,r,o,a,l,c)}const ia=[],wb=5;let Bc=0;function vm(){const s=Vi();for(;ia.length&&Vi()-s<wb;)ia.shift()();Bc=ia.length?setTimeout(vm,0):0}const Eb=(...s)=>new Promise((e,t)=>{ia.push(()=>{const i=Vi();try{Va.webgl.generateIntoCanvas(...s),e({timing:Vi()-i})}catch(n){t(n)}}),Bc||(Bc=setTimeout(vm,0))}),Tb=4,Ab=2e3,Uf={};let Cb=0;function If(s,e,t,i,n,r,o,a,l,c){const u="TroikaTextSDFGenerator_JS_"+Cb++%Tb;let h=Uf[u];return h||(h=Uf[u]={workerModule:Fs({name:u,workerId:u,dependencies:[Hf,Vi],init(f,d){const p=f().javascript.generate;return function(..._){const g=d();return{textureData:p(..._),timing:d()-g}}},getTransferables(f){return[f.textureData.buffer]}}),requests:0,idleTimer:null}),h.requests++,clearTimeout(h.idleTimer),h.workerModule(s,e,t,i,n,r).then(({textureData:f,timing:d})=>{const p=Vi(),_=new Uint8Array(f.length*4);for(let g=0;g<f.length;g++)_[g*4+c]=f[g];return Va.webglUtils.renderImageData(o,_,a,l,s,e,1<<3-c),d+=Vi()-p,--h.requests===0&&(h.idleTimer=setTimeout(()=>{Fm(u)},Ab)),{timing:d}})}function Rb(s){s._warm||(Va.webgl.isSupported(s),s._warm=!0)}const Pb=Va.webglUtils.resizeWebGLCanvasWithoutClearing,Rr={defaultFontURL:null,unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048,useWorker:!0},Lb=new Re;function Tr(){return(self.performance||Date).now()}const Df=Object.create(null);function ym(s,e){s=Db({},s);const t=Tr(),{defaultFontURL:i}=Rr,n=[];if(i&&n.push({label:"default",src:Of(i)}),s.font&&n.push({label:"user",src:Of(s.font)}),s.font=n,s.text=""+s.text,s.sdfGlyphSize=s.sdfGlyphSize||Rr.sdfGlyphSize,s.unicodeFontsURL=s.unicodeFontsURL||Rr.unicodeFontsURL,s.colorRanges!=null){let d={};for(let p in s.colorRanges)if(s.colorRanges.hasOwnProperty(p)){let _=s.colorRanges[p];typeof _!="number"&&(_=Lb.set(_).getHex()),d[p]=_}s.colorRanges=d}Object.freeze(s);const{textureWidth:r,sdfExponent:o}=Rr,{sdfGlyphSize:a}=s,l=r/a*4;let c=Df[a];if(!c){const d=document.createElement("canvas");d.width=r,d.height=a*256/l,c=Df[a]={glyphCount:0,sdfGlyphSize:a,sdfCanvas:d,sdfTexture:new yt(d,void 0,void 0,void 0,ft,ft),contextLost:!1,glyphsByFont:new Map},c.sdfTexture.generateMipmaps=!1,Ub(c)}const{sdfTexture:u,sdfCanvas:h}=c;Mm(s).then(d=>{const{glyphIds:p,glyphFontIndices:_,fontData:g,glyphPositions:m,fontSize:y,timings:v}=d,x=[],S=new Float32Array(p.length*4);let b=0,E=0;const A=Tr(),M=g.map(C=>{let N=c.glyphsByFont.get(C.src);return N||c.glyphsByFont.set(C.src,N=new Map),N});p.forEach((C,N)=>{const k=_[N],{src:H,unitsPerEm:$}=g[k];let q=M[k].get(C);if(!q){const{path:Y,pathBounds:te}=d.glyphData[H][C],ge=Math.max(te[2]-te[0],te[3]-te[1])/a*(Rr.sdfMargin*a+.5),_e=c.glyphCount++,Ee=[te[0]-ge,te[1]-ge,te[2]+ge,te[3]+ge];M[k].set(C,q={path:Y,atlasIndex:_e,sdfViewBox:Ee}),x.push(q)}const{sdfViewBox:V}=q,G=m[E++],j=m[E++],O=y/$;S[b++]=G+V[0]*O,S[b++]=j+V[1]*O,S[b++]=G+V[2]*O,S[b++]=j+V[3]*O,p[N]=q.atlasIndex}),v.quads=(v.quads||0)+(Tr()-A);const w=Tr();v.sdf={};const I=h.height,R=Math.ceil(c.glyphCount/l),z=Math.pow(2,Math.ceil(Math.log2(R*a)));z>I&&(console.info(`Increasing SDF texture size ${I}->${z}`),Pb(h,r,z),u.dispose()),Promise.all(x.map(C=>xm(C,c,s.gpuAccelerateSDF).then(({timing:N})=>{v.sdf[C.atlasIndex]=N}))).then(()=>{x.length&&!c.contextLost&&(Sm(c),u.needsUpdate=!0),v.sdfTotal=Tr()-w,v.total=Tr()-t,e(Object.freeze({parameters:s,sdfTexture:u,sdfGlyphSize:a,sdfExponent:o,glyphBounds:S,glyphAtlasIndices:p,glyphColors:d.glyphColors,caretPositions:d.caretPositions,chunkedBounds:d.chunkedBounds,ascender:d.ascender,descender:d.descender,lineHeight:d.lineHeight,capHeight:d.capHeight,xHeight:d.xHeight,topBaseline:d.topBaseline,blockBounds:d.blockBounds,visibleBounds:d.visibleBounds,timings:d.timings}))})}),Promise.resolve().then(()=>{c.contextLost||Rb(h)})}function xm({path:s,atlasIndex:e,sdfViewBox:t},{sdfGlyphSize:i,sdfCanvas:n,contextLost:r},o){if(r)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:l}=Rr,c=Math.max(t[2]-t[0],t[3]-t[1]),u=Math.floor(e/4),h=u%(a/i)*i,f=Math.floor(u/(a/i))*i,d=e%4;return bb(i,i,s,t,c,l,n,h,f,d,o)}function Ub(s){const e=s.sdfCanvas;e.addEventListener("webglcontextlost",t=>{console.log("Context Lost",t),t.preventDefault(),s.contextLost=!0}),e.addEventListener("webglcontextrestored",t=>{console.log("Context Restored",t),s.contextLost=!1;const i=[];s.glyphsByFont.forEach(n=>{n.forEach(r=>{i.push(xm(r,s,!0))})}),Promise.all(i).then(()=>{Sm(s),s.sdfTexture.needsUpdate=!0})})}function Ib({font:s,characters:e,sdfGlyphSize:t},i){let n=Array.isArray(e)?e.join(`
`):""+e;ym({font:s,sdfGlyphSize:t,text:n},i)}function Db(s,e){for(let t in e)e.hasOwnProperty(t)&&(s[t]=e[t]);return s}let Yo;function Of(s){return Yo||(Yo=typeof document>"u"?{}:document.createElement("a")),Yo.href=s,Yo.href}function Sm(s){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:e,sdfTexture:t}=s,{width:i,height:n}=e,r=s.sdfCanvas.getContext("webgl");let o=t.image.data;(!o||o.length!==i*n*4)&&(o=new Uint8Array(i*n*4),t.image={width:i,height:n,data:o},t.flipY=!1,t.isDataTexture=!0),r.readPixels(0,0,i,n,r.RGBA,r.UNSIGNED_BYTE,o)}}const Ob=Fs({name:"Typesetter",dependencies:[Mb,Sb,Nm],init(s,e,t){return s(e,t())}}),Mm=Fs({name:"Typesetter",dependencies:[Ob],init(s){return function(e){return new Promise(t=>{s.typeset(e,t)})}},getTransferables(s){const e=[];for(let t in s)s[t]&&s[t].buffer&&e.push(s[t].buffer);return e}});Mm.onMainThread;const Ff={};function Fb(s){let e=Ff[s];return e||(e=Ff[s]=new hi(1,1,s,s).translate(.5,.5,0)),e}const Nb="aTroikaGlyphBounds",Nf="aTroikaGlyphIndex",Bb="aTroikaGlyphColor";class zb extends Ha{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new At,this.boundingBox=new Et}computeBoundingSphere(){}computeBoundingBox(){}set detail(e){if(e!==this._detail){this._detail=e,(typeof e!="number"||e<1)&&(e=1);let t=Fb(e);["position","normal","uv"].forEach(i=>{this.attributes[i]=t.attributes[i].clone()}),this.setIndex(t.getIndex().clone())}}get detail(){return this._detail}set curveRadius(e){e!==this._curveRadius&&(this._curveRadius=e,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(e,t,i,n,r){this.updateAttributeData(Nb,e,4),this.updateAttributeData(Nf,t,1),this.updateAttributeData(Bb,r,3),this._blockBounds=i,this._chunkedBounds=n,this.instanceCount=t.length,this._updateBounds()}_updateBounds(){const e=this._blockBounds;if(e){const{curveRadius:t,boundingBox:i}=this;if(t){const{PI:n,floor:r,min:o,max:a,sin:l,cos:c}=Math,u=n/2,h=n*2,f=Math.abs(t),d=e[0]/f,p=e[2]/f,_=r((d+u)/h)!==r((p+u)/h)?-f:o(l(d)*f,l(p)*f),g=r((d-u)/h)!==r((p-u)/h)?f:a(l(d)*f,l(p)*f),m=r((d+n)/h)!==r((p+n)/h)?f*2:a(f-c(d)*f,f-c(p)*f);i.min.set(_,e[1],t<0?-m:0),i.max.set(g,e[3],t<0?0:m)}else i.min.set(e[0],e[1],0),i.max.set(e[2],e[3],0);i.getBoundingSphere(this.boundingSphere)}}applyClipRect(e){let t=this.getAttribute(Nf).count,i=this._chunkedBounds;if(i)for(let n=i.length;n--;){t=i[n].end;let r=i[n].rect;if(r[1]<e.w&&r[3]>e.y&&r[0]<e.z&&r[2]>e.x)break}this.instanceCount=t}updateAttributeData(e,t,i){const n=this.getAttribute(e);t?n&&n.array.length===t.length?(n.array.set(t),n.needsUpdate=!0):(this.setAttribute(e,new Yi(t,i)),delete this._maxInstanceCount,this.dispose()):n&&this.deleteAttribute(e)}}const kb=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,Gb=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,Hb=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,Vb=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function Wb(s){const e=Nc(s,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new se},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new it(0,0,0,0)},uTroikaClipRect:{value:new it(0,0,0,0)},uTroikaEdgeOffset:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new se},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new Re},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Ke},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:kb,vertexTransform:Gb,fragmentDefs:Hb,fragmentColorTransform:Vb,customRewriter({vertexShader:t,fragmentShader:i}){let n=/\buniform\s+vec3\s+diffuse\b/;return n.test(i)&&(i=i.replace(n,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),n.test(t)||(t=t.replace(_m,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:t,fragmentShader:i}}});return e.transparent=!0,e.forceSinglePass=!0,Object.defineProperties(e,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),e}const Uu=new jn({color:16777215,side:yn,transparent:!0}),Bf=8421504,zf=new Ve,jo=new P,Hl=new P,os=[],Xb=new P,Vl="+x+y";function kf(s){return Array.isArray(s)?s[0]:s}let bm=()=>{const s=new mt(new hi(1,1),Uu);return bm=()=>s,s},wm=()=>{const s=new mt(new hi(1,1,32,1),Uu);return wm=()=>s,s};const qb={type:"syncstart"},Yb={type:"synccomplete"},Em=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],jb=Em.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");let Tm=class extends mt{constructor(){const e=new zb;super(e,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=Bf,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=Vl,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(e){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(e):(this._isSyncing=!0,this.dispatchEvent(qb),ym({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},t=>{this._isSyncing=!1,this._textRenderInfo=t,this.geometry.updateGlyphs(t.glyphBounds,t.glyphAtlasIndices,t.blockBounds,t.chunkedBounds,t.glyphColors);const i=this._queuedSyncs;i&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{i.forEach(n=>n&&n())})),this.dispatchEvent(Yb),e&&e()})))}onBeforeRender(e,t,i,n,r,o){this.sync(),r.isTroikaTextMaterial&&this._prepareForRender(r)}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}createDerivedMaterial(e){return Wb(e)}get material(){let e=this._derivedMaterial;const t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Uu.clone());if((!e||!e.isDerivedFrom(t))&&(e=this._derivedMaterial=this.createDerivedMaterial(t),t.addEventListener("dispose",function i(){t.removeEventListener("dispose",i),e.dispose()})),this.hasOutline()){let i=e._outlineMtl;return i||(i=e._outlineMtl=Object.create(e,{id:{value:e.id+.1}}),i.isTextOutlineMaterial=!0,i.depthWrite=!1,i.map=null,e.addEventListener("dispose",function n(){e.removeEventListener("dispose",n),i.dispose()})),[i,e]}else return e}set material(e){e&&e.isTroikaTextMaterial?(this._derivedMaterial=e,this._baseMaterial=e.baseMaterial):this._baseMaterial=e}hasOutline(){return!!(this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY)}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(e){this.geometry.detail=e}get curveRadius(){return this.geometry.curveRadius}set curveRadius(e){this.geometry.curveRadius=e}get customDepthMaterial(){return kf(this.material).getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return kf(this.material).getDistanceMaterial()}set customDistanceMaterial(e){}_prepareForRender(e){const t=e.isTextOutlineMaterial,i=e.uniforms,n=this.textRenderInfo;if(n){const{sdfTexture:a,blockBounds:l}=n;i.uTroikaSDFTexture.value=a,i.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),i.uTroikaSDFGlyphSize.value=n.sdfGlyphSize,i.uTroikaSDFExponent.value=n.sdfExponent,i.uTroikaTotalBounds.value.fromArray(l),i.uTroikaUseGlyphColors.value=!t&&!!n.glyphColors;let c=0,u=0,h=0,f,d,p,_=0,g=0;if(t){let{outlineWidth:y,outlineOffsetX:v,outlineOffsetY:x,outlineBlur:S,outlineOpacity:b}=this;c=this._parsePercent(y)||0,u=Math.max(0,this._parsePercent(S)||0),f=b,_=this._parsePercent(v)||0,g=this._parsePercent(x)||0}else h=Math.max(0,this._parsePercent(this.strokeWidth)||0),h&&(p=this.strokeColor,i.uTroikaStrokeColor.value.set(p??Bf),d=this.strokeOpacity,d==null&&(d=1)),f=this.fillOpacity;i.uTroikaEdgeOffset.value=c,i.uTroikaPositionOffset.value.set(_,g),i.uTroikaBlurRadius.value=u,i.uTroikaStrokeWidth.value=h,i.uTroikaStrokeOpacity.value=d,i.uTroikaFillOpacity.value=f??1,i.uTroikaCurveRadius.value=this.curveRadius||0;let m=this.clipRect;if(m&&Array.isArray(m)&&m.length===4)i.uTroikaClipRect.value.fromArray(m);else{const y=(this.fontSize||.1)*100;i.uTroikaClipRect.value.set(l[0]-y,l[1]-y,l[2]+y,l[3]+y)}this.geometry.applyClipRect(i.uTroikaClipRect.value)}i.uTroikaSDFDebug.value=!!this.debugSDF,e.polygonOffset=!!this.depthOffset,e.polygonOffsetFactor=e.polygonOffsetUnits=this.depthOffset||0;const r=t?this.outlineColor||0:this.color;if(r==null)delete e.color;else{const a=e.hasOwnProperty("color")?e.color:e.color=new Re;(r!==a._input||typeof r=="object")&&a.set(a._input=r)}let o=this.orientation||Vl;if(o!==e._orientation){let a=i.uTroikaOrient.value;o=o.replace(/[^-+xyz]/g,"");let l=o!==Vl&&o.match(/^([-+])([xyz])([-+])([xyz])$/);if(l){let[,c,u,h,f]=l;jo.set(0,0,0)[u]=c==="-"?1:-1,Hl.set(0,0,0)[f]=h==="-"?-1:1,zf.lookAt(Xb,jo.cross(Hl),Hl),a.setFromMatrix4(zf)}else a.identity();e._orientation=o}}_parsePercent(e){if(typeof e=="string"){let t=e.match(/^(-?[\d.]+)%$/),i=t?parseFloat(t[1]):NaN;e=(isNaN(i)?0:i/100)*this.fontSize}return e}localPositionToTextCoords(e,t=new se){t.copy(e);const i=this.curveRadius;return i&&(t.x=Math.atan2(e.x,Math.abs(i)-Math.abs(e.z))*Math.abs(i)),t}worldPositionToTextCoords(e,t=new se){return jo.copy(e),this.localPositionToTextCoords(this.worldToLocal(jo),t)}raycast(e,t){const{textRenderInfo:i,curveRadius:n}=this;if(i){const r=i.blockBounds,o=n?wm():bm(),a=o.geometry,{position:l,uv:c}=a.attributes;for(let u=0;u<c.count;u++){let h=r[0]+c.getX(u)*(r[2]-r[0]);const f=r[1]+c.getY(u)*(r[3]-r[1]);let d=0;n&&(d=n-Math.cos(h/n)*n,h=Math.sin(h/n)*n),l.setXYZ(u,h,f,d)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,o.matrixWorld=this.matrixWorld,o.material.side=this.material.side,os.length=0,o.raycast(e,os);for(let u=0;u<os.length;u++)os[u].object=this,t.push(os[u])}}copy(e){const t=this.geometry;return super.copy(e),this.geometry=t,jb.forEach(i=>{this[i]=e[i]}),this}clone(){return new this.constructor().copy(this)}};Em.forEach(s=>{const e="_private_"+s;Object.defineProperty(Tm.prototype,s,{get(){return this[e]},set(t){t!==this[e]&&(this[e]=t,this._needsSync=!0)}})});new Et;new Re;const h1=Ce.forwardRef(({sdfGlyphSize:s=64,anchorX:e="center",anchorY:t="middle",font:i,fontSize:n=1,children:r,characters:o,onSync:a,...l},c)=>{const u=Yt(({invalidate:p})=>p),[h]=Ce.useState(()=>new Tm),[f,d]=Ce.useMemo(()=>{const p=[];let _="";return Ce.Children.forEach(r,g=>{typeof g=="string"||typeof g=="number"?_+=g:p.push(g)}),[p,_]},[r]);return Im(()=>new Promise(p=>Ib({font:i,characters:o},p)),["troika-text",i,o]),Ce.useLayoutEffect(()=>void h.sync(()=>{u(),a&&a(h)})),Ce.useEffect(()=>()=>h.dispose(),[h]),Ce.createElement("primitive",Wi({object:h,ref:c,font:i,text:d,anchorX:e,anchorY:t,fontSize:n,sdfGlyphSize:s},l),f)});function Zb(s,e,t,i){const n=class extends hn{constructor(o={}){const a=Object.entries(s);super({uniforms:a.reduce((l,[c,u])=>{const h=zr.clone({[c]:{value:u}});return{...l,...h}},{}),vertexShader:e,fragmentShader:t}),this.key="",a.forEach(([l])=>Object.defineProperty(this,l,{get:()=>this.uniforms[l].value,set:c=>this.uniforms[l].value=c})),Object.assign(this,o),i&&i(this)}};return n.key=Qc.generateUUID(),n}const $b=()=>parseInt(Gr.replace(/\D+/g,"")),Jb=$b();function Kb(s,e,t){const i=Yt(f=>f.size),n=Yt(f=>f.viewport),r=typeof s=="number"?s:i.width*n.dpr,o=typeof e=="number"?e:i.height*n.dpr,a=(typeof s=="number"?t:s)||{},{samples:l=0,depth:c,...u}=a,h=Ce.useMemo(()=>{const f=new un(r,o,{minFilter:ft,magFilter:ft,type:Xi,...u});return c&&(f.depthTexture=new va(r,o,cn)),f.samples=l,f},[]);return Ce.useLayoutEffect(()=>{h.setSize(r,o),l&&(h.samples=l)},[l,h,r,o]),Ce.useEffect(()=>()=>h.dispose(),[]),h}const Qb=s=>typeof s=="function",d1=Ce.forwardRef(({envMap:s,resolution:e=256,frames:t=1/0,makeDefault:i,children:n,...r},o)=>{const a=Yt(({set:g})=>g),l=Yt(({camera:g})=>g),c=Yt(({size:g})=>g),u=Ce.useRef(null);Ce.useImperativeHandle(o,()=>u.current,[]);const h=Ce.useRef(null),f=Kb(e);Ce.useLayoutEffect(()=>{r.manual||(u.current.aspect=c.width/c.height)},[c,r]),Ce.useLayoutEffect(()=>{u.current.updateProjectionMatrix()});let d=0,p=null;const _=Qb(n);return Ru(g=>{_&&(t===1/0||d<t)&&(h.current.visible=!1,g.gl.setRenderTarget(f),p=g.scene.background,s&&(g.scene.background=s),g.gl.render(g.scene,u.current),g.scene.background=p,g.gl.setRenderTarget(null),h.current.visible=!0,d++)}),Ce.useLayoutEffect(()=>{if(i){const g=l;return a(()=>({camera:u.current})),()=>a(()=>({camera:g}))}},[u,i,a]),Ce.createElement(Ce.Fragment,null,Ce.createElement("perspectiveCamera",Wi({ref:u},r),!_&&n),Ce.createElement("group",{ref:h},_&&n(f.texture)))}),p1=Ce.forwardRef(({makeDefault:s,camera:e,regress:t,domElement:i,enableDamping:n=!0,keyEvents:r=!1,onChange:o,onStart:a,onEnd:l,...c},u)=>{const h=Yt(b=>b.invalidate),f=Yt(b=>b.camera),d=Yt(b=>b.gl),p=Yt(b=>b.events),_=Yt(b=>b.setEvents),g=Yt(b=>b.set),m=Yt(b=>b.get),y=Yt(b=>b.performance),v=e||f,x=i||p.connected||d.domElement,S=Ce.useMemo(()=>new rb(v),[v]);return Ru(()=>{S.enabled&&S.update()},-1),Ce.useEffect(()=>(r&&S.connect(r===!0?x:r),S.connect(x),()=>void S.dispose()),[r,x,t,S,h]),Ce.useEffect(()=>{const b=M=>{h(),t&&y.regress(),o&&o(M)},E=M=>{a&&a(M)},A=M=>{l&&l(M)};return S.addEventListener("change",b),S.addEventListener("start",E),S.addEventListener("end",A),()=>{S.removeEventListener("start",E),S.removeEventListener("end",A),S.removeEventListener("change",b)}},[o,a,l,S,h,_]),Ce.useEffect(()=>{if(s){const b=m().controls;return g({controls:S}),()=>g({controls:b})}},[s,S]),Ce.createElement("primitive",Wi({ref:u,object:S,enableDamping:n},c))}),e1=Zb({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new Re,sectionColor:new Re,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new P,worldPlanePosition:new P},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${Jb>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),m1=Ce.forwardRef(({args:s,cellColor:e="#000000",sectionColor:t="#2080ff",cellSize:i=.5,sectionSize:n=1,followCamera:r=!1,infiniteGrid:o=!1,fadeDistance:a=100,fadeStrength:l=1,fadeFrom:c=1,cellThickness:u=.5,sectionThickness:h=1,side:f=Ht,...d},p)=>{Jp({GridMaterial:e1});const _=Ce.useRef(null);Ce.useImperativeHandle(p,()=>_.current,[]);const g=new En,m=new P(0,1,0),y=new P(0,0,0);Ru(S=>{g.setFromNormalAndCoplanarPoint(m,y).applyMatrix4(_.current.matrixWorld);const b=_.current.material,E=b.uniforms.worldCamProjPosition,A=b.uniforms.worldPlanePosition;g.projectPoint(S.camera.position,E.value),A.value.set(0,0,0).applyMatrix4(_.current.matrixWorld)});const v={cellSize:i,sectionSize:n,cellColor:e,sectionColor:t,cellThickness:u,sectionThickness:h},x={fadeDistance:a,fadeStrength:l,fadeFrom:c,infiniteGrid:o,followCamera:r};return Ce.createElement("mesh",Wi({ref:_,frustumCulled:!1},d),Ce.createElement("gridMaterial",Wi({transparent:!0,"extensions-derivatives":!0,side:f},v,x)),Ce.createElement("planeGeometry",{args:s}))});function Gf(s,e){typeof s=="function"?s(e):s!=null&&(s.current=e)}function t1(s,e=[],t){const[i,n]=Ce.useState();return Ce.useLayoutEffect(()=>{const r=s();return n(r),Gf(t,r),()=>Gf(t,null)},e),i}function g1({showPanel:s=0,className:e,parent:t}){const i=t1(()=>new Bm,[]);return Ce.useEffect(()=>{if(i){const n=t&&t.current||document.body;i.showPanel(s),n==null||n.appendChild(i.dom);const r=(e??"").split(" ").filter(l=>l);r.length&&i.dom.classList.add(...r);const o=HM(()=>i.begin()),a=VM(()=>i.end());return()=>{r.length&&i.dom.classList.remove(...r),n==null||n.removeChild(i.dom),o(),a()}}},[t,i,e,s]),null}export{a1 as C,yn as D,Oe as F,m1 as G,c1 as L,p1 as O,hi as P,g1 as S,h1 as T,P as V,Re as a,d1 as b,Ru as c,Yt as u};
