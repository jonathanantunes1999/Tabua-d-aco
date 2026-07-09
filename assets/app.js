(function(){

  /* ---------- menu mobile ---------- */
  var burger=document.getElementById('burger');
  var nav=document.getElementById('nav');
  function closeNav(){nav.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Abrir menu');}
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);
    burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeNav);});

  /* ---------- seletor de idioma ---------- */
  var lang=document.getElementById('lang');
  var langBtn=document.getElementById('langBtn');
  var langLabel=document.getElementById('langLabel');
  langBtn.addEventListener('click',function(e){
    e.stopPropagation();
    var open=lang.classList.toggle('open');
    langBtn.setAttribute('aria-expanded',open);
  });
  lang.querySelectorAll('.lang__menu button').forEach(function(b){
    b.addEventListener('click',function(){
      lang.querySelectorAll('.lang__menu button').forEach(function(x){x.setAttribute('aria-current','false');});
      b.setAttribute('aria-current','true');
      langLabel.textContent=b.dataset.lang;
      lang.classList.remove('open');
      langBtn.setAttribute('aria-expanded','false');
    });
  });
  document.addEventListener('click',function(){lang.classList.remove('open');langBtn.setAttribute('aria-expanded','false');});

  /* ---------- slider do hero ---------- */
  var slides=document.querySelectorAll('.hero__slide');
  if(slides.length){
  var dots=document.querySelectorAll('.dot');
  var hero=document.getElementById('hero');
  var title=document.getElementById('heroTitle');
  var sub=document.getElementById('heroSub');
  var copy=[
    {t:'Bem-vindo à <span class="accent">Tábua d\'Aço</span>', s:'Cozinha do Douro com sotaque do Tirol, em Tabuaço.'},
    {t:'Boa comida, <span class="accent">bons vinhos</span>', s:'Os vinhos da região demarcada do Douro, a mais antiga do mundo.'},
    {t:'E uma paisagem <span class="accent">à altura</span>', s:'Na margem esquerda do rio, mesmo em frente às Piscinas Municipais.'}
  ];
  var i=0, timer=null;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function go(n){
    i=(n+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('active',k===i);});
    dots.forEach(function(d,k){d.classList.toggle('active',k===i);});
    title.innerHTML=copy[i].t;
    sub.textContent=copy[i].s;
  }
  function start(){if(!reduce){stop();timer=setInterval(function(){go(i+1);},6500);}}
  function stop(){if(timer){clearInterval(timer);timer=null;}}

  document.getElementById('next').addEventListener('click',function(){go(i+1);start();});
  document.getElementById('prev').addEventListener('click',function(){go(i-1);start();});
  dots.forEach(function(d){d.addEventListener('click',function(){go(+d.dataset.go);start();});});
  hero.addEventListener('mouseenter',stop);
  hero.addEventListener('mouseleave',start);

  /* deslizar com o dedo */
  var x0=null;
  hero.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  hero.addEventListener('touchend',function(e){
    if(x0===null)return;
    var dx=e.changedTouches[0].clientX-x0;
    if(Math.abs(dx)>50){go(dx<0?i+1:i-1);start();}
    x0=null;
  });
  start();
  }

  /* ---------- tabs do menu ---------- */
  var tabs=document.querySelectorAll('.menu__tab');
  var panels=document.querySelectorAll('.menu__panel');
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      tabs.forEach(function(t){t.classList.remove('active');t.setAttribute('aria-selected','false');});
      panels.forEach(function(p){p.classList.remove('active');p.hidden=true;});
      tab.classList.add('active');tab.setAttribute('aria-selected','true');
      var target=document.getElementById('panel-'+tab.dataset.panel);
      target.classList.add('active');target.hidden=false;
    });
  });

  /* ---------- botão topo ---------- */
  var totop=document.getElementById('totop');
  window.addEventListener('scroll',function(){totop.classList.toggle('show',window.scrollY>600);},{passive:true});
  totop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});

  /* ---------- reveal ---------- */
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.14,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
})();
