(()=>{const RM=matchMedia('(prefers-reduced-motion:reduce)');const v=document.getElementById('loop');
if(v){if(RM.matches){v.removeAttribute('autoplay');v.pause()}else{
 let inView=true,t=0;v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.setAttribute('webkit-playsinline','');
 const kick=()=>{if(RM.matches||document.hidden||!inView)return;if(v.paused||v.ended){if(v.ended){try{v.currentTime=0}catch{}}const p=v.play();p&&p.catch(()=>{})}};
 ['pause','ended','stalled','suspend','waiting'].forEach(e=>v.addEventListener(e,()=>{clearTimeout(t);t=setTimeout(kick,250)}));
 if('IntersectionObserver'in window)new IntersectionObserver(e=>{inView=e[0].isIntersecting;kick()}).observe(v);
 document.addEventListener('visibilitychange',kick);addEventListener('pageshow',kick);
 ['touchend','click','scroll'].forEach(e=>addEventListener(e,kick,{passive:true}));
 setInterval(kick,2000);kick()}}
const el=document.getElementById('cash');if(!el)return;const t0=performance.now();setInterval(()=>{const s=(performance.now()-t0)/1000;el.textContent='$'+Math.floor(12*s+s*s*.9).toLocaleString()},RM.matches?2000:250)})();
