(()=>{try{
const btns=[...document.querySelectorAll('[data-mus]')];
let ctx,gain,src,buf,loading=null,on=false;
const set=v=>btns.forEach(b=>b.setAttribute('aria-pressed',v?'true':'false'));
const fail=()=>{on=false;set(false);btns.forEach(b=>{b.disabled=true;b.title='Music unavailable';b.setAttribute('aria-label','Music unavailable');const s=b.querySelector('.ml');if(s)s.textContent='Music unavailable'})};
const pick=()=>{const a=document.createElement('audio');return a.canPlayType('audio/webm; codecs="opus"')?'/media/music.webm':'/media/music.m4a'};
async function load(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw 0;ctx=new AC();gain=ctx.createGain();gain.gain.value=0;gain.connect(ctx.destination);
 const r=await fetch(pick());if(!r.ok)throw 0;const ab=await r.arrayBuffer();buf=await new Promise((ok,no)=>{const p=ctx.decodeAudioData(ab,ok,no);p&&p.catch&&p.catch(no)})}
function fade(to,dur){const t=ctx.currentTime;gain.gain.cancelScheduledValues(t);gain.gain.setValueAtTime(gain.gain.value,t);gain.gain.linearRampToValueAtTime(to,t+dur)}
async function start(){if(!ctx){set(true);loading=loading||load();await loading}
 if(ctx.state!=='running')await ctx.resume();
 if(!src){src=ctx.createBufferSource();src.buffer=buf;src.loop=true;src.loopStart=0;src.loopEnd=Math.min(buf.duration,53.3333);src.connect(gain);src.start()}
 fade(1,1.5)}
function stop(){if(!ctx)return;fade(0,.8);setTimeout(()=>{if(!on&&ctx&&ctx.state==='running')ctx.suspend().catch(()=>{})},900)}
async function toggle(){on=!on;set(on);try{on?await start():stop()}catch(e){fail()}}
btns.forEach(b=>b.addEventListener('click',toggle));
document.addEventListener('visibilitychange',()=>{try{if(!ctx||!on)return;document.hidden?ctx.suspend():ctx.resume()}catch{}});

}catch(e){}})();
