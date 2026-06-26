/* ============================================================
   Nebbos — shared site script
   ============================================================ */
(function(){
  "use strict";
  var html = document.documentElement;
  html.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) html.classList.add('reduce');
  var desktop = window.matchMedia('(min-width:1024px)').matches;
  var pointerFine = window.matchMedia('(pointer:fine)').matches;
  var APP = 'https://app.nebbos.ai';
  var page = document.body.getAttribute('data-page') || '';

  /* ---------- staging guard: noindex anything that isn't production nebbos.ai ----------
     Production = nebbos.ai / www.nebbos.ai (indexed). idvor.ai + *.up.railway.app = staging.
     Canonical tags already point at nebbos.ai (primary signal); this is belt-and-suspenders.
     The robust noindex for the staging deploy is a Disallow-all robots.txt on that env. */
  (function(){
    var host = location.hostname;
    var isProd = host === 'nebbos.ai' || host === 'www.nebbos.ai';
    if(!isProd){
      var m = document.createElement('meta');
      m.name = 'robots';
      m.content = 'noindex, nofollow';
      document.head.appendChild(m);
    }
  })();

  /* ---------- nav + footer (single source) ---------- */
  var NAV = [
    { href:'platform.html', label:'Platform', key:'platform' },
    { href:'pearl.html',    label:'Pearl',    key:'pearl' },
    { href:'security.html', label:'Security', key:'security' },
    { href:'about.html',    label:'About',    key:'about' },
  ];
  var MARK = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">'+
    '<rect x="1" y="13" width="4.5" height="8" rx="1.4" fill="#3B4ACB"/>'+
    '<rect x="8.5" y="8" width="4.5" height="13" rx="1.4" fill="#637DFF"/>'+
    '<rect x="16" y="2" width="4.5" height="19" rx="1.4" fill="#8FA1FF"/></svg>';

  function renderNav(){
    var mount = document.getElementById('nav-mount'); if(!mount) return;
    var links = NAV.map(function(n){
      return '<a href="'+n.href+'"'+(n.key===page?' class="active"':'')+'>'+n.label+'</a>';
    }).join('');
    var mlinks = NAV.map(function(n){ return '<a href="'+n.href+'">'+n.label+'</a>'; }).join('') +
                 '<a href="'+APP+'">Log in</a>';
    mount.innerHTML =
      '<header id="nav"><div class="nav-inner">'+
        '<a class="brand" href="index.html" aria-label="Nebbos home">'+MARK+'nebbos</a>'+
        '<nav class="nav-links">'+links+'</nav>'+
        '<div class="nav-right">'+
          '<a class="btn btn-primary btn-sm mag" href="'+APP+'">Log in <span class="arr">&rarr;</span></a>'+
          '<button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false">'+
          '<svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M0 1h18M0 7h18M0 13h18" stroke="#F4F4F5" stroke-width="1.6"/></svg></button>'+
        '</div>'+
      '</div><div class="mobile-menu" id="mobileMenu">'+mlinks+'</div></header>';
  }

  function renderFooter(){
    var mount = document.getElementById('footer-mount'); if(!mount) return;
    var yr = new Date().getFullYear();
    mount.innerHTML =
      '<footer class="hairline"><div class="container">'+
        '<div class="foot-grid">'+
          '<div style="max-width:300px">'+
            '<div class="brand" style="font-size:20px">'+MARK+'nebbos</div>'+
            '<p class="lead" style="margin-top:14px;font-size:14.5px">Operations Intelligence. Built on the Operational Graph.</p>'+
          '</div>'+
          '<div class="foot-col"><h4>Product</h4>'+
            '<a href="platform.html">Platform</a><a href="pearl.html">Pearl</a><a href="security.html">Security</a></div>'+
          '<div class="foot-col"><h4>Company</h4>'+
            '<a href="about.html">About</a><a href="contact.html">Contact</a></div>'+
          '<div class="foot-col"><h4>Get started</h4>'+
            '<a href="'+APP+'">Log in</a><a href="contact.html">Request access</a></div>'+
          '<div class="foot-col"><h4>Legal</h4>'+
            '<a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></div>'+
        '</div>'+
        '<div class="foot-note">'+
          '<span class="mono" style="max-width:58ch">In the spirit of Mihajlo Pupin, who spent his life carrying faint signals further without losing what they held.</span>'+
          '<span>&copy; '+yr+' Nebbos</span>'+
        '</div>'+
      '</div></footer>';
  }

  renderNav();
  renderFooter();

  /* ---------- preloader (only where present) ---------- */
  var pre = document.getElementById('pre');
  function hidePre(){ if(!pre) return; pre.style.transition='opacity .6s ease'; pre.style.opacity='0'; setTimeout(function(){ pre.style.display='none'; },650); }
  if(pre){
    if(reduce){ pre.style.display='none'; }
    else { var pf=pre.querySelector('.pbar i'); if(pf){ requestAnimationFrame(function(){ pf.style.transition='width 1s cubic-bezier(.4,0,.1,1)'; pf.style.width='100%'; }); } }
  }

  /* ---------- smooth scroll ---------- */
  var lenis=null;
  if(!reduce && typeof Lenis!=='undefined'){
    try{ lenis=new Lenis({lerp:0.1,smoothWheel:true}); (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(); }catch(e){ lenis=null; }
  }

  /* ---------- GSAP ---------- */
  var hasGSAP=(typeof gsap!=='undefined');
  if(hasGSAP){
    gsap.registerPlugin(ScrollTrigger);
    if(lenis){ lenis.on('scroll',ScrollTrigger.update); gsap.ticker.add(function(t){ lenis.raf(t*1000); }); gsap.ticker.lagSmoothing(0); }
    if(!reduce){
      gsap.utils.toArray('.reveal').forEach(function(el){
        gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}});
      });
    } else { gsap.utils.toArray('.reveal').forEach(function(el){ el.style.opacity=1; }); }
  } else { document.querySelectorAll('.reveal').forEach(function(el){ el.style.opacity=1; }); }

  function heroIn(){ if(reduce||!hasGSAP) return; var els=document.querySelectorAll('.hero-el'); if(els.length) gsap.from(els,{opacity:0,y:28,duration:1,ease:'power3.out',stagger:.09,delay:.05}); }

  /* ---------- nav scroll state + progress bar + mobile menu ---------- */
  var nav=document.getElementById('nav'), bar=document.getElementById('bar');
  function onScroll(){
    var y=window.scrollY||window.pageYOffset;
    if(nav) nav.classList.toggle('scrolled', y>24);
    if(bar){ var h=document.documentElement.scrollHeight-window.innerHeight; bar.style.width=(h>0?(y/h*100):0)+'%'; }
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  var menuBtn=document.getElementById('menuBtn'), mob=document.getElementById('mobileMenu');
  if(menuBtn&&mob){ menuBtn.addEventListener('click',function(){ var o=mob.classList.toggle('open'); menuBtn.setAttribute('aria-expanded',o?'true':'false'); }); }

  /* ---------- magnetic buttons ---------- */
  if(!reduce && pointerFine){
    document.querySelectorAll('.mag').forEach(function(b){
      b.addEventListener('mousemove',function(e){ var r=b.getBoundingClientRect(); b.style.transform='translate('+((e.clientX-r.left-r.width/2)*0.18)+'px,'+((e.clientY-r.top-r.height/2)*0.32)+'px)'; });
      b.addEventListener('mouseleave',function(){ b.style.transform=''; });
    });
  }

  /* ---------- kinetic hero line ---------- */
  (function(){
    var kin=document.getElementById('kin'); if(!kin) return;
    var spans=[].slice.call(kin.querySelectorAll('span'));
    var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ#%/<>=';
    function scramble(el,word){ var s=performance.now(),dur=520;
      (function step(now){ var p=Math.min(1,(now-s)/dur),rev=Math.floor(p*word.length),out='';
        for(var i=0;i<word.length;i++){ out+= i<rev?word[i]:chars[(Math.random()*chars.length)|0]; }
        el.textContent=out; if(p<1) requestAnimationFrame(step); else el.textContent=word; })(s);
    }
    if(reduce){ spans.forEach(function(s){ s.classList.add('on'); }); return; }
    var idx=0;
    function tick(){ spans.forEach(function(s,i){ s.classList.toggle('on',i===idx); }); scramble(spans[idx],spans[idx].getAttribute('data-w')); idx=(idx+1)%spans.length; }
    tick(); setInterval(tick,1500);
  })();

  /* ---------- human-in-the-loop demo ---------- */
  document.querySelectorAll('.hitl [data-approve]').forEach(function(ap){
    ap.addEventListener('click',function(){ var card=ap.closest('.hitl'); if(card) card.classList.add('approved'); });
  });

  /* ---------- animated backdrop: the Operational Graph ---------- */
  (function(){
    var c=document.getElementById('bg'); if(!c) return;
    var x=c.getContext('2d'), dpr=Math.min(window.devicePixelRatio||1,2), w=0,hgt=0,nodes=[];
    function build(){ var count=reduce?44:Math.max(38,Math.min(desktop?94:50,Math.floor((w*hgt)/16500)));
      nodes=[]; for(var i=0;i<count;i++){ var z=0.45+Math.random()*0.55,nx=Math.random()*w,ny=Math.random()*hgt; nodes.push({bx:nx,x:nx,y:ny,vx:0,vy:0,z:z,near:0,pulse:0}); } }
    function size(){ w=window.innerWidth; hgt=window.innerHeight; c.width=w*dpr; c.height=hgt*dpr; x.setTransform(dpr,0,0,dpr,0,0); build(); }
    var pmx=-999,pmy=-999,ptx=-999,pty=-999,pvx=0,pvy=0,pressed=false,flow=0,lastS=0;
    if(!reduce){
      window.addEventListener('pointermove',function(e){ if(ptx>-900){ pvx=e.clientX-ptx; pvy=e.clientY-pty; } ptx=e.clientX; pty=e.clientY; },{passive:true});
      window.addEventListener('pointerdown',function(){ pressed=true; });
      window.addEventListener('pointerup',function(){ pressed=false; });
      window.addEventListener('blur',function(){ pressed=false; });
      window.addEventListener('scroll',function(){ var s=window.scrollY||window.pageYOffset; flow+=(s-lastS)*-0.05; lastS=s; },{passive:true});
    }
    window.addEventListener('resize',size);
    var RAD=150,RAD2=RAD*RAD,LINK=120,LINK2=LINK*LINK,LINK_LIT=210,LINK_LIT2=LINK_LIT*LINK_LIT;
    var tick=0;
    function draw(){
      x.clearRect(0,0,w,hgt);
      if(ptx>-900){ if(pmx<-900){pmx=ptx;pmy=pty;} pmx+=(ptx-pmx)*0.18; pmy+=(pty-pmy)*0.18; }
      flow*=0.9; tick++; var i,n;
      // autonomous pulse: wake a random node every ~100 frames so the graph
      // visibly connects even without mouse interaction
      if(!reduce && tick%100===0){ var pk=nodes[(Math.random()*nodes.length)|0]; if(pk) pk.pulse=0.9+Math.random()*0.1; }
      // update physics + store near per node (needed before edge pass)
      for(i=0;i<nodes.length;i++){ n=nodes[i]; n.vx+=(n.bx-n.x)*0.02; n.near=0;
        if(pmx>-900){ var dx=n.x-pmx,dy=n.y-pmy,d2=dx*dx+dy*dy;
          if(d2<RAD2&&d2>0.1){ var d=Math.sqrt(d2),f=1-d/RAD,force=f*f*(pressed?3.2:1.4)*n.z; n.vx+=(dx/d)*force; n.vy+=(dy/d)*force; if(pressed){ n.vx+=pvx*0.05*f; n.vy+=pvy*0.05*f; } n.near=f; } }
        n.pulse*=0.964; if(n.pulse<0.005) n.pulse=0;
        n.vx*=0.86; n.vy*=0.86; var drift=reduce?0:(-0.14*n.z+flow*n.z); n.x+=n.vx; n.y+=n.vy+drift;
        if(n.y<-30){ n.y+=hgt+60; } else if(n.y>hgt+30){ n.y-=hgt+60; } }
      // propagate pulse: lit nodes spread energy to close neighbours so
      // connections "travel" visibly through the graph
      if(!reduce){ for(var a=0;a<nodes.length;a++){ var la=Math.max(nodes[a].near,nodes[a].pulse);
        if(la>0.12){ for(var b=a+1;b<nodes.length;b++){
          var ex=nodes[a].x-nodes[b].x,ey=nodes[a].y-nodes[b].y,edd=ex*ex+ey*ey;
          if(edd<LINK2){ var sp=la*(1-edd/LINK2)*0.38; if(sp>nodes[b].pulse) nodes[b].pulse=sp; } } } } }
      // draw edges — lit nodes reveal connections to farther neighbours and
      // edges connecting them become brighter and thicker
      for(var ea=0;ea<nodes.length;ea++){ for(var eb=ea+1;eb<nodes.length;eb++){
        var na=nodes[ea],nb=nodes[eb],litE=Math.max(na.near,na.pulse,nb.near,nb.pulse);
        var thr=litE>0.1?LINK_LIT2:LINK2,axe=na.x-nb.x,aye=na.y-nb.y,dd=axe*axe+aye*aye;
        if(dd<thr){ var al=(1-dd/thr)*(0.10*Math.min(na.z,nb.z)+litE*0.52);
          x.strokeStyle='rgba(99,125,255,'+Math.min(0.72,al).toFixed(3)+')';
          x.lineWidth=litE>0.08?0.8+litE*1.1:0.75;
          x.beginPath(); x.moveTo(na.x,na.y); x.lineTo(nb.x,nb.y); x.stroke(); } } }
      // draw nodes
      for(i=0;i<nodes.length;i++){ n=nodes[i]; var lit=Math.max(n.near,n.pulse);
        var al2=0.16+0.30*n.z+lit*0.5,r=1.0+n.z*1.3+lit*1.6; x.fillStyle='rgba('+(lit>0.25?'170,186,255':'118,138,232')+','+al2.toFixed(3)+')';
        x.beginPath(); x.arc(n.x,n.y,r,0,6.2832); x.fill(); }
      pvx*=0.8; pvy*=0.8; if(!reduce) requestAnimationFrame(draw);
    }
    size(); draw();
  })();

  /* ---------- card spotlight + glow parallax ---------- */
  if(!reduce && pointerFine){
    document.querySelectorAll('.tile').forEach(function(t){
      t.addEventListener('pointermove',function(e){ var r=t.getBoundingClientRect(); t.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%'); t.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%'); });
    });
    var glows=document.querySelectorAll('.glow');
    if(glows.length){ window.addEventListener('pointermove',function(e){ var rx=e.clientX/window.innerWidth-0.5,ry=e.clientY/window.innerHeight-0.5;
      glows.forEach(function(g,i){ var amt=(i+1)*16; g.style.transform='translate('+(rx*amt).toFixed(1)+'px,'+(ry*amt).toFixed(1)+'px)'; }); },{passive:true}); }
  }

  /* ---------- home signature: five-question scroll narrative ---------- */
  (function(){
    var story=document.getElementById('story'), canvas=document.getElementById('viz');
    if(!story) return;
    var scenes=[].slice.call(document.querySelectorAll('.scene'));
    var railBtns=[].slice.call(document.querySelectorAll('#rail button'));
    function setStage(st){ scenes.forEach(function(s){ s.classList.toggle('active',+s.getAttribute('data-stage')===st); }); railBtns.forEach(function(b,i){ b.classList.toggle('on',i<=st); }); }
    var progress=0, run = canvas && hasGSAP && !reduce && desktop;
    if(!run){ setStage(0); return; }

    var ctx=canvas.getContext('2d'), dpr=Math.min(window.devicePixelRatio||1,2), W=0,H=0;
    function size(){ var r=canvas.getBoundingClientRect(); W=r.width; H=r.height; canvas.width=W*dpr; canvas.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
    size(); window.addEventListener('resize',function(){ size(); ScrollTrigger.refresh(); });

    var N=150,STAGES=5,hubCount=12;
    function sr(s){ var v=Math.sin(s*127.1+11.3)*43758.5453; return v-Math.floor(v); }
    var HUBS=[]; for(var h=0;h<hubCount;h++){ var a=(h/hubCount)*Math.PI*2,rr=0.5+0.32*sr(h+1); HUBS.push({x:Math.cos(a)*rr,y:Math.sin(a)*rr*0.92}); }
    var EDGES=[]; for(var e=0;e<hubCount;e++){ EDGES.push([e,(e+1)%hubCount]); if(e%3===0) EDGES.push([e,(e+5)%hubCount]); }
    var CL=[{x:-0.58,y:-0.42},{x:0.55,y:-0.5},{x:0.6,y:0.46},{x:-0.5,y:0.52},{x:0.02,y:0.04}];
    var P=[]; for(var i=0;i<N;i++){ var r1=sr(i+10),r2=sr(i+220),r3=sr(i+3300),r4=sr(i+44000),px=(i/N)*2-1,cl=CL[i%5],hub=i%hubCount;
      P.push({x:(Math.random()*2-1)*W*0.3+W/2,y:(Math.random()*2-1)*H*0.3+H/2,accent:(i%6===0),
        t:[{x:(r1*2.4-1.2),y:(r2-0.5)*1.05},{x:px*0.95,y:-px*0.5+(r3-0.5)*0.12},{x:cl.x+(r3-0.5)*0.26,y:cl.y+(r4-0.5)*0.26},{x:(r1-0.5)*0.16+0.04,y:(r2-0.5)*0.16},{x:HUBS[hub].x+(r3-0.5)*0.12,y:HUBS[hub].y+(r4-0.5)*0.12}]}); }
    function ease(t){ return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2; }
    (function frame(){
      var cx=W/2,cy=H/2,R=Math.min(W,H)*0.40; ctx.clearRect(0,0,W,H);
      var sf=Math.max(0,Math.min(1,progress))*(STAGES-1),s0=Math.floor(sf),s1=Math.min(s0+1,STAGES-1),tt=ease(sf-s0);
      var knAmt=Math.max(0,Math.min(1,sf-3)),predAmt=1-Math.min(1,Math.abs(sf-1));
      if(knAmt>0){ ctx.lineWidth=1; for(var k=0;k<EDGES.length;k++){ ctx.strokeStyle='rgba(99,125,255,'+(0.20*knAmt)+')'; ctx.beginPath(); ctx.moveTo(cx+HUBS[EDGES[k][0]].x*R,cy+HUBS[EDGES[k][0]].y*R); ctx.lineTo(cx+HUBS[EDGES[k][1]].x*R,cy+HUBS[EDGES[k][1]].y*R); ctx.stroke(); } }
      for(var j=0;j<N;j++){ var p=P[j],ax=p.t[s0].x,ay=p.t[s0].y,bx=p.t[s1].x,by=p.t[s1].y,tx=cx+(ax+(bx-ax)*tt)*R,ty=cy+(ay+(by-ay)*tt)*R;
        p.x+=(tx-p.x)*0.13; p.y+=(ty-p.y)*0.13; var col='rgba(143,161,255,0.66)',rad=1.7;
        if(p.accent&&predAmt>0.35){ col='rgba(246,146,108,'+(0.45+0.55*predAmt)+')'; rad=2.5; }
        ctx.fillStyle=col; ctx.beginPath(); ctx.arc(p.x,p.y,rad,0,6.2832); ctx.fill(); }
      if(knAmt>0){ ctx.fillStyle='rgba(99,125,255,'+(0.95*knAmt)+')'; for(var hh=0;hh<hubCount;hh++){ ctx.beginPath(); ctx.arc(cx+HUBS[hh].x*R,cy+HUBS[hh].y*R,3.4,0,6.2832); ctx.fill(); } }
      requestAnimationFrame(frame);
    })();
    ScrollTrigger.create({ trigger:story,start:'top top',end:'bottom bottom',scrub:true,
      onUpdate:function(self){ progress=self.progress; setStage(Math.round(progress*(STAGES-1))); } });
    setStage(0);
    railBtns.forEach(function(b){ b.addEventListener('click',function(){ var go=+b.getAttribute('data-go'),rect=story.getBoundingClientRect(),top=window.scrollY+rect.top,dist=story.offsetHeight-window.innerHeight,target=top+(go/(STAGES-1))*dist; if(lenis) lenis.scrollTo(target); else window.scrollTo({top:target,behavior:'smooth'}); }); });
  })();

  /* ---------- contact form -> mailto (no backend) ---------- */
  (function(){
    var f=document.getElementById('contactForm'); if(!f) return;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var get=function(n){ var el=f.querySelector('[name="'+n+'"]'); return el?el.value.trim():''; };
      var body='Name: '+get('name')+'%0D%0ACompany: '+get('company')+'%0D%0AEmail: '+get('email')+'%0D%0A%0D%0A'+encodeURIComponent(get('message'));
      window.location.href='mailto:hello@nebbos.ai?subject='+encodeURIComponent('Nebbos — access request')+'&body='+body;
      var note=document.getElementById('formNote'); if(note) note.style.display='block';
    });
  })();

  /* ---------- boot ---------- */
  window.addEventListener('load',function(){ hidePre(); heroIn(); if(hasGSAP) ScrollTrigger.refresh(); });
  setTimeout(hidePre,2600);
})();
