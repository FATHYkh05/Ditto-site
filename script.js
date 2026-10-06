(function(){
document.documentElement.classList.add('js');
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* header shadow */
addEventListener('scroll',function(){$('header').classList.toggle('sc',scrollY>10)},{passive:true});
/* mobile menu */
var nav=$('#nav'),bg=$('#burger');
function closeMenu(){nav.classList.remove('open');bg.setAttribute('aria-expanded',false)}
bg.onclick=function(){bg.setAttribute('aria-expanded',nav.classList.toggle('open'))};
/* buy / rent */
var tabs=$('.tabs');
function setTab(k){
  tabs.classList.toggle('r',k==='rent');
  $$('.tabs button').forEach(function(b){b.setAttribute('aria-selected',b.dataset.tab===k)});
  $$('#cards .card').forEach(function(c){var ok=c.dataset.k===k;c.hidden=!ok;c.classList.remove('in');if(ok){void c.offsetWidth;c.classList.add('in')}});
}
$$('[data-tab]').forEach(function(el){el.addEventListener('click',function(){setTab(el.dataset.tab);closeMenu()})});
$$('nav a').forEach(function(a){a.addEventListener('click',closeMenu)});
/* favourites */
$$('.fav').forEach(function(b){b.onclick=function(){b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')}});
/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})},{threshold:.12});
$$('.rv').forEach(function(e){io.observe(e)});
/* counters */
var co=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;co.unobserve(e.target);
  var n=+e.target.dataset.n,t0=null;
  function f(t){t0=t0||t;var p=Math.min((t-t0)/1500,1);e.target.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString('en-US')+'+';if(p<1)requestAnimationFrame(f)}
  rm?e.target.textContent=n.toLocaleString('en-US')+'+':requestAnimationFrame(f)})},{threshold:.6});
$$('[data-n]').forEach(function(e){co.observe(e)});
/* active nav link */
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){$$('nav a').forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id&&!a.dataset.tab)})}})},{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(function(s){so.observe(s)});
/* contact form */
var f=$('#form'),m=$('#msg');
f.onsubmit=function(e){e.preventDefault();
  var ok=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.e.value);
  if(!f.n.value.trim()||!ok){m.className='msg err';m.textContent='Please enter your name and a valid email address.';return}
  m.className='msg';m.textContent='Thanks '+f.n.value.trim()+'! We will reply to '+f.e.value+' within one working day.';f.reset()};
})();
