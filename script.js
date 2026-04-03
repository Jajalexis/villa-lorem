// Navbar scroll + transparent on hero
const navbar=document.getElementById('navbar');
const hero=document.querySelector('.hero');
function updateNavbar(){
  const scrollY=window.scrollY;
  const heroH=hero.offsetHeight;
  navbar.classList.toggle('scrolled',scrollY>50);
  navbar.classList.toggle('transparent',scrollY<heroH-100);
}
window.addEventListener('scroll',updateNavbar);
updateNavbar();

// Reveal — all animated elements
const obs=new IntersectionObserver(e=>{e.forEach(el=>{if(el.isIntersecting)el.target.classList.add('visible')})},{threshold:.08,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal,.reveal-children,.reveal-left,.reveal-right,.reveal-scale').forEach(el=>obs.observe(el));

// Parallax on scroll
function parallax(){
  const scrollY=window.scrollY;
  const vh=window.innerHeight;

  // Hero layers — different speeds
  const heroBg=document.querySelector('.hero-bg img');
  const heroTitle=document.querySelector('.hero-title-wrap');
  const heroAlula=document.querySelector('.hero-alula');
  if(heroBg) heroBg.style.transform=`translateY(${scrollY*0.35}px)`;
  if(heroTitle) heroTitle.style.transform=`translate(-50%,-50%) translateY(${scrollY*-0.15}px)`;
  if(heroAlula) heroAlula.style.transform=`translateY(${scrollY*-0.1}px)`;

  // Parallax images — subtle vertical shift
  document.querySelectorAll('.parallax-img img').forEach(img=>{
    const rect=img.parentElement.getBoundingClientRect();
    const center=rect.top+rect.height/2;
    const offset=(center-vh/2)/vh;
    img.style.transform=`translateY(${offset*-30}px) scale(1.08)`;
  });

  // Map terrain parallax
  const mapImg=document.querySelector('.map-terrain img');
  if(mapImg){
    const mapRect=document.querySelector('.map-section').getBoundingClientRect();
    const mapOffset=(mapRect.top)/vh;
    mapImg.style.transform=`translateY(${mapOffset*-40}px) scale(1.1)`;
  }
}
window.addEventListener('scroll',parallax,{passive:true});
parallax();

// ===== CAROUSEL — SCROLL HIJACK WITH FANNED CARDS =====
const cardsData=[
  {title:"Grand Format",sub:"Les récits immersifs qui donnent à voir AlUla.",link:"Découvrir",
   shapes:[{t:"rect",w:140,h:180,x:-10,y:-20,rot:-6,bg:"#E8E0D0",o:.6},{t:"rect",w:140,h:180,x:0,y:-30,rot:-2,bg:"#D4C5A9",o:.7},{t:"rect",w:140,h:180,x:10,y:-40,rot:3,bg:"#C4956A",o:.4}]},
  {title:"Focus",sub:"Regards croisés sur l'architecture et le patrimoine.",link:"Découvrir",
   shapes:[{t:"semi",w:120,h:60,x:0,y:-30,bg:"#D4C5A9",o:.5},{t:"semi",w:140,h:50,x:-10,y:15,bg:"#C4956A",o:.45},{t:"semi",w:160,h:55,x:-20,y:50,bg:"#8A8578",o:.5}]},
  {title:"Témoignages",sub:"Ceux qui font AlUla racontent leur vision.",link:"Découvrir",
   shapes:[{t:"circle",s:100,x:-20,y:-20,bg:"#D4C5A9",o:.4},{t:"circle",s:100,x:30,y:0,bg:"#C4956A",o:.35},{t:"circle",s:60,x:10,y:30,bg:"#8A8578",o:.3}]},
  {title:"Le Regard de",sub:"Entretiens avec les créateurs qui façonnent le futur.",link:"Découvrir",
   shapes:[{t:"ring",s:130,x:-15,y:-25,bg:"#D4C5A9",o:.3,sw:16},{t:"circle",s:80,x:10,y:0,bg:"#C4956A",o:.25},{t:"circle",s:30,x:35,y:25,bg:"#8A8578",o:.5}]},
  {title:"Les Brèves",sub:"L'actualité d'AlUla en quelques lignes.",link:"Découvrir",
   shapes:[{t:"rect",w:160,h:8,x:-30,y:-40,bg:"#D4C5A9",o:.5,r:4},{t:"rect",w:120,h:8,x:-10,y:-15,bg:"#C4956A",o:.4,r:4},{t:"rect",w:140,h:8,x:-20,y:10,bg:"#D4C5A9",o:.35,r:4},{t:"rect",w:80,h:8,x:10,y:35,bg:"#8A8578",o:.3,r:4},{t:"rect",w:100,h:8,x:0,y:60,bg:"#D4C5A9",o:.25,r:4}]},
];

// Build cards
const viewport=document.getElementById('carouselViewport');
cardsData.forEach((card,i)=>{
  const el=document.createElement('div');
  el.className='carousel-card';
  el.dataset.index=i;
  let shapesHTML='';
  card.shapes.forEach(sh=>{
    const style=`position:absolute;opacity:${sh.o};`;
    if(sh.t==='rect') shapesHTML+=`<div style="${style}width:${sh.w}px;height:${sh.h}px;transform:translate(${sh.x}px,${sh.y}px) rotate(${sh.rot||0}deg);background:${sh.bg};border-radius:${sh.r||4}px;"></div>`;
    else if(sh.t==='circle') shapesHTML+=`<div style="${style}width:${sh.s}px;height:${sh.s}px;transform:translate(${sh.x}px,${sh.y}px);background:${sh.bg};border-radius:50%;"></div>`;
    else if(sh.t==='semi') shapesHTML+=`<div style="${style}width:${sh.w}px;height:${sh.h}px;transform:translate(${sh.x}px,${sh.y}px);background:${sh.bg};border-radius:${sh.w}px ${sh.w}px 0 0;"></div>`;
    else if(sh.t==='ring') shapesHTML+=`<div style="${style}width:${sh.s}px;height:${sh.s}px;transform:translate(${sh.x}px,${sh.y}px);border:${sh.sw}px solid ${sh.bg};border-radius:50%;background:transparent;"></div>`;
  });
  el.innerHTML=`
    <div class="card-illu"><div style="position:relative;width:160px;height:200px;display:flex;align-items:center;justify-content:center">${shapesHTML}</div></div>
    <div class="card-body">
      <div class="card-title">${card.title}</div>
      <div class="card-sub">${card.sub}</div>
      <div class="card-link">→ ${card.link}</div>
    </div>`;
  viewport.appendChild(el);
});

const cards=document.querySelectorAll('.carousel-card');
const pinSection=document.querySelector('.carousel-pin');
const totalCards=cardsData.length;
let activeCard=0;

function layoutCards(progress){
  const cardProgress=progress*(totalCards-1);
  const currentIdx=Math.min(Math.floor(cardProgress),totalCards-1);

  cards.forEach((card,i)=>{
    let offset=i-cardProgress;
    const x=offset*420;
    const rotation=offset*8;
    const scale=1-Math.abs(offset)*0.06;
    const opacity=Math.max(0,1-Math.abs(offset)*0.35);
    const z=100-Math.round(Math.abs(offset)*10);
    const y=Math.abs(offset)*15;

    card.style.transform=`translateX(${x}px) translateY(${y}px) rotate(${rotation}deg) scale(${scale})`;
    card.style.opacity=opacity;
    card.style.zIndex=z;

    const isActive=Math.abs(offset)<0.5;
    card.classList.toggle('active',isActive);
  });

  const displayIdx=Math.round(cardProgress);
  document.getElementById('carCount').textContent=String(displayIdx+1).padStart(2,'0');
  document.getElementById('carProgress').style.width=`${(displayIdx+1)/totalCards*100}%`;

  document.querySelectorAll('#cDots .dot').forEach((d,j)=>{
    d.classList.toggle('active',j===displayIdx);
  });

  activeCard=displayIdx;
}

// Scroll-driven animation
function updateCarouselScroll(){
  const rect=pinSection.getBoundingClientRect();
  const stickyHeight=pinSection.offsetHeight-window.innerHeight;
  const scrolled=-rect.top;
  const progress=Math.max(0,Math.min(1,scrolled/stickyHeight));
  layoutCards(progress);
}
window.addEventListener('scroll',updateCarouselScroll,{passive:true});
layoutCards(0);

// Dot clicks
document.querySelectorAll('#cDots .dot').forEach(d=>{
  d.addEventListener('click',()=>{
    const i=parseInt(d.dataset.i);
    const stickyHeight=pinSection.offsetHeight-window.innerHeight;
    const targetScroll=pinSection.offsetTop+(i/(totalCards-1))*stickyHeight;
    window.scrollTo({top:targetScroll,behavior:'smooth'});
  });
});

// Map pins
document.querySelectorAll('.map-pin:not(.active)').forEach(p=>{
  p.addEventListener('mouseenter',()=>{p.style.transform='scale(1.5)';p.style.background='#C4956A';p.style.borderColor='#fff';p.style.boxShadow='0 0 16px rgba(196,149,106,.5)'});
  p.addEventListener('mouseleave',()=>{p.style.transform='';p.style.background='';p.style.borderColor='';p.style.boxShadow=''});
});
