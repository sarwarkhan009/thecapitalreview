const $=s=>document.querySelector(s);
const q=new URLSearchParams(location.search);
const ph=a=>`<div class="ph"><img src="assets/${a.cat}-${a.id%2}.jpg" alt="" loading="lazy"></div>`;
const cname=c=>CMETA[c][0];
const link=a=>`article.html?id=${a.id}`;
function shell(active){
 const tk=TICK.map(t=>`<span><b>${t[0]}</b>${t[1]} <span class="${t[3]?'up':'down'}">${t[3]?'▲':'▼'} ${t[2]}</span></span>`).join('');
 $('#top').innerHTML=`<div class="ticker"><div class="wrap row"><span class="tag">MARKETS</span>${tk}</div></div>
 <div class="wrap"><div class="topbar"><span>Wednesday, 28 October 2026</span><span>English</span></div>
 <div class="masthead"><a href="index.html"><img src="assets/logo.png" alt="The Capital Review"></a><div class="sub"><input placeholder="Search The Capital Review" aria-label="Search"><button class="btn">Subscribe</button></div></div></div>
 <nav><div class="wrap"><ul>${CATS.map(c=>`<li><a href="${c[1]}" class="${c[0]===active?'on':''}">${c[0]}</a></li>`).join('')}</ul></div></nav>`;
 $('#foot').innerHTML=`<footer><div class="wrap"><div class="cols"><div><div class="logo"><img src="assets/logo.png" alt=""></div><p>Business, finance and economy, explained clearly. Independent coverage of Indian business, markets and policy.</p></div>
 <div><h5>Sections</h5><ul>${CATS.slice(1,5).map(c=>`<li><a href="${c[1]}">${c[0]}</a></li>`).join('')}</ul></div>
 <div><h5>More</h5><ul>${CATS.slice(5,9).map(c=>`<li><a href="${c[1]}">${c[0]}</a></li>`).join('')}</ul></div>
 <div><h5>Company</h5><ul><li><a href="about.html">About Us</a></li><li><a href="#">Contact</a></li><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms</a></li></ul></div></div>
 <div class="legal">© 2026 The Capital Review · thecapitalreview.in · Demo design: content to be replaced before launch. Not financial advice.</div></div></footer>`;
}
const card=a=>`<div class="card"><a href="${link(a)}">${ph(a)}</a><span class="kicker">${cname(a.cat)}</span><h3><a href="${link(a)}">${a.t}</a></h3><div class="meta">${a.a} · ${a.time}</div></div>`;
const row=a=>`<article><a href="${link(a)}">${ph(a)}</a><div><span class="kicker">${cname(a.cat)}</span><h3><a href="${link(a)}">${a.t}</a></h3><p>${a.b}</p><div class="meta">${a.a} · ${a.time}</div></div></article>`;
const by=c=>ART.filter(a=>a.cat===c);
function side(){
 return `<aside class="side"><div class="box"><h4>Market snapshot</h4><table class="mk">${TICK.slice(0,6).map(t=>`<tr><td>${t[0]}</td><td>${t[1]} <span class="${t[3]?'up':'down'}" style="color:${t[3]?'#12a05c':'#d64545'}">${t[2]}</span></td></tr>`).join('')}</table></div>
 <div class="box trend"><h4>Most read</h4><ol>${[0,7,13,20,26].map(i=>`<li><a href="${link(ART[i])}">${ART[i].t}</a></li>`).join('')}</ol></div></aside>`;
}
function newsletter(){return `<div class="news"><div><h3>The Capital Review Daily</h3><p>Markets, economy and business in one morning email.</p></div><form onsubmit="return false"><input placeholder="Your email address"><button class="btn">Subscribe</button></form></div>`;}
function home(){
 shell('Home');
 const L=ART[0],S=[ART[6],ART[12],ART[18],ART[24]];
 let h=`<div class="wrap"><section class="hero"><div class="lead"><a href="${link(L)}">${ph(L)}</a><span class="kicker" style="display:block;margin-top:12px">Markets</span><h1><a href="${link(L)}">${L.t}</a></h1><p>${L.b}</p><div class="meta">${L.a} · ${L.time}</div></div>
 <div class="stack">${S.map(a=>`<article><span class="kicker">${cname(a.cat)}</span><h3><a href="${link(a)}">${a.t}</a></h3><div class="meta">${a.a} · ${a.time}</div></article>`).join('')}</div></section>`;
 ['markets','economy','business'].forEach(c=>{h+=`<section class="sec"><h2>${cname(c)} <a href="category.html?c=${c}">View all →</a></h2><div class="grid4">${by(c).slice(0,4).map(card).join('')}</div></section>`});
 h+=`<section class="sec"><div class="two"><div><h2>Latest</h2><div class="list">${['personal-finance','investment','policy-governance','geopolitics'].map(c=>row(by(c)[0])).join('')}</div></div>${side()}</div></section>`;
 h+=`<section class="sec"><h2>Explainers <a href="category.html?c=explainers">View all →</a></h2><div class="grid3">${by('explainers').slice(0,3).map(card).join('')}</div></section>`+newsletter()+`</div>`;
 $('#main').innerHTML=h;
}
function category(){
 const c=CMETA[q.get('c')]?q.get('c'):'markets';shell(cname(c));
 document.title=cname(c)+' | The Capital Review';
 const l=by(c);
 $('#main').innerHTML=`<div class="chead"><div class="wrap"><div class="crumb"><a href="index.html">Home</a> / ${cname(c)}</div><h1>${cname(c)}</h1><p>${CMETA[c][1]}</p></div></div>
 <div class="wrap"><section class="sec" style="border:0"><div class="two"><div class="list">${l.concat(l).slice(0,8).map((a,i)=>row(a)).join('')}<div class="pager"><a class="on">1</a><a>2</a><a>3</a><a>Next →</a></div></div>${side()}</div></section>${newsletter()}</div>`;
}
function article(){
 shell('');const a=ART[+q.get('id')]||ART[0];document.title=a.t+' | The Capital Review';
 const rel=by(a.cat).filter(x=>x.id!==a.id).slice(0,3);
 $('#main').innerHTML=`<div class="wrap"><div class="art"><div class="crumb"><a href="index.html">Home</a> / <a href="category.html?c=${a.cat}">${cname(a.cat)}</a></div><span class="kicker">${cname(a.cat)}</span>
 <h1>${a.t}</h1><p class="deck">${a.b}</p>
 <div class="byline"><div class="av">${a.a[0]}</div><div><b style="color:var(--ink)">${a.a}</b><br>Updated ${a.time} · 5 min read</div></div>
 ${ph(a)}<div class="cap">Image: placeholder. Credit to be added.</div>
 ${BODY[a.cat].map((p,k)=>'<p>'+p+'</p>').join('')}
 <div class="tags"><span>${cname(a.cat)}</span><span>India</span><span>Business</span></div></div>
 <section class="sec"><h2>Related stories</h2><div class="grid3">${rel.map(card).join('')}</div></section></div>`;
}
const pg=document.body.dataset.page;
if(pg==='home')home();else if(pg==='category')category();else if(pg==='article')article();
if(pg==='about'){}
