(function(){

  /* ---------- header sobreposto (página inicial) ---------- */
  var overlayHeader=document.querySelector('.header--overlay');
  if(overlayHeader){
    var onHeaderScroll=function(){overlayHeader.classList.toggle('scrolled',window.scrollY>60);};
    window.addEventListener('scroll',onHeaderScroll,{passive:true});
    onHeaderScroll();
  }

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
  var langFlag=document.getElementById('langFlag');
  function selectLang(b,translate){
    lang.querySelectorAll('.lang__menu button').forEach(function(x){x.setAttribute('aria-current','false');});
    b.setAttribute('aria-current','true');
    var code=b.dataset.lang;
    langLabel.textContent=code.toUpperCase();
    var svg=b.querySelector('svg');
    if(svg&&langFlag) langFlag.innerHTML=svg.outerHTML;
    if(translate!==false && window.I18N) window.I18N.apply(code);
    document.dispatchEvent(new CustomEvent('langchange',{detail:code}));
  }
  langBtn.addEventListener('click',function(e){
    e.stopPropagation();
    var open=lang.classList.toggle('open');
    langBtn.setAttribute('aria-expanded',open);
  });
  lang.querySelectorAll('.lang__menu button').forEach(function(b){
    b.addEventListener('click',function(){
      selectLang(b,true);
      lang.classList.remove('open');
      langBtn.setAttribute('aria-expanded','false');
    });
  });
  document.addEventListener('click',function(){lang.classList.remove('open');langBtn.setAttribute('aria-expanded','false');});
  /* restaurar idioma guardado */
  (function(){
    var saved=null; try{saved=localStorage.getItem('lang');}catch(e){}
    if(saved){
      var b=lang.querySelector('.lang__menu button[data-lang="'+saved+'"]');
      if(b) selectLang(b,true);
    }
  })();

  /* ---------- slider do hero ---------- */
  var slides=document.querySelectorAll('.hero__slide');
  if(slides.length){
  var dots=document.querySelectorAll('.dot');
  var hero=document.getElementById('hero');
  var title=document.getElementById('heroTitle');
  var sub=document.getElementById('heroSub');
  var heroCopy={
    pt:[
      {t:'Bem-vindo à <span class="accent">Tábua d\'Aço</span>', s:'Cozinha do Douro com sotaque do Tirol, em Tabuaço.'},
      {t:'Boa comida, <span class="accent">bons vinhos</span>', s:'Os vinhos da região demarcada do Douro, a mais antiga do mundo.'},
      {t:'E uma paisagem <span class="accent">à altura</span>', s:'Na margem esquerda do rio, mesmo em frente às Piscinas Municipais.'}
    ],
    en:[
      {t:'Welcome to <span class="accent">Tábua d\'Aço</span>', s:'Douro cuisine with a Tyrolean accent, in Tabuaço.'},
      {t:'Great food, <span class="accent">great wines</span>', s:'Wines from the Douro demarcated region, the oldest in the world.'},
      {t:'And a view <span class="accent">to match</span>', s:'On the left bank of the river, right opposite the Municipal Pools.'}
    ],
    de:[
      {t:'Willkommen im <span class="accent">Tábua d\'Aço</span>', s:'Douro-Küche mit Tiroler Akzent, in Tabuaço.'},
      {t:'Gutes Essen, <span class="accent">gute Weine</span>', s:'Weine aus dem Douro-Anbaugebiet, dem ältesten der Welt.'},
      {t:'Und eine Landschaft <span class="accent">dazu</span>', s:'Am linken Flussufer, direkt gegenüber dem Schwimmbad.'}
    ],
    es:[
      {t:'Bienvenido a <span class="accent">Tábua d\'Aço</span>', s:'Cocina del Duero con acento tirolés, en Tabuaço.'},
      {t:'Buena comida, <span class="accent">buenos vinos</span>', s:'Vinos de la región demarcada del Duero, la más antigua del mundo.'},
      {t:'Y un paisaje <span class="accent">a la altura</span>', s:'En la margen izquierda del río, frente a las Piscinas Municipales.'}
    ],
    fr:[
      {t:'Bienvenue au <span class="accent">Tábua d\'Aço</span>', s:'Cuisine du Douro à l\'accent tyrolien, à Tabuaço.'},
      {t:'Bonne cuisine, <span class="accent">bons vins</span>', s:'Les vins de la région délimitée du Douro, la plus ancienne au monde.'},
      {t:'Et un paysage <span class="accent">à la hauteur</span>', s:'Sur la rive gauche du fleuve, face aux Piscines Municipales.'}
    ]
  };
  var curLang=document.documentElement.getAttribute('lang')||'pt';
  function copyFor(){return heroCopy[curLang]||heroCopy.pt;}
  var i=0, timer=null;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function go(n){
    i=(n+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('active',k===i);});
    dots.forEach(function(d,k){d.classList.toggle('active',k===i);});
    title.innerHTML=copyFor()[i].t;
    sub.textContent=copyFor()[i].s;
  }
  document.addEventListener('langchange',function(e){curLang=(e&&e.detail)||document.documentElement.getAttribute('lang')||'pt';go(i);});
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

  /* ---------- filtros da ementa ---------- */
  var filters=document.querySelectorAll('.mfilter');
  var cards=document.querySelectorAll('.menu__grid .mcat');
  var menuGrid=document.getElementById('menuGrid');
  filters.forEach(function(btn){
    btn.addEventListener('click',function(){
      filters.forEach(function(b){b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active');btn.setAttribute('aria-selected','true');
      var f=btn.dataset.filter;
      cards.forEach(function(c){
        var show=(f==='all'||c.dataset.cat===f);
        c.hidden=!show;
        if(show)c.classList.add('in');
      });
      /* re-dispara a animação: a ementa desenrola-se a partir do traço */
      if(menuGrid){menuGrid.classList.remove('menu-switching');void menuGrid.offsetWidth;menuGrid.classList.add('menu-switching');}
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

  /* ---------- marcas d'água: entram de fora ao rolar (efeito "pull") ---------- */
  var wmIO=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in-view');wmIO.unobserve(e.target);}});
  },{threshold:0,rootMargin:'0px 0px -12% 0px'});
  document.querySelectorAll('.brandzone,.about,.chef').forEach(function(el){wmIO.observe(el);});
})();
