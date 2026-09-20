import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowLeft, ArrowRight, Play, Pause, X, List, Phone, EnvelopeSimple, Stethoscope, FirstAidKit, Heartbeat, Ambulance, LinkedinLogo } from '@phosphor-icons/react';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/noto-sans-thai/400.css';
import '@fontsource/noto-sans-thai/600.css';
gsap.registerPlugin(ScrollTrigger);
// iOS Safari resizes the viewport when the address bar collapses; without this ScrollTrigger
// recalculates mid-scroll and can leave triggers pointing at stale positions.
ScrollTrigger.config({ignoreMobileResize:true});
const asset = p => `/assets/${p}`;
const doctor = asset('Header image/doctor-trimmed.png');
const icons = ['17','21','27'].map(n => asset(`ICON homepage/Screenshot 2026-09-20 at 3.10.${n} PM.png`));
const partners = ['airamb','ezy-airlines','vipjets','siam-seaplane','siam-ambulance'].map(n=>`partners/${n}.png`);
const partnerNames = ['AIRAMB','EZY Airlines','VIPJets','Siam Seaplane','Siam Ambulance Center'];
const copy = {
 en: {nav:['Home','Service','Experience','Team','Contact us'],hero:'Providing the highest standard\nof patient care & transportation is\nour top priority.',years:'Years of Experience',countries:'Countries',cases:'Patient Cases',services:['One Stop Service','Medical Equipment','Transportation Choice'],desc:['With more than 10 trusted partners, we provide seamless support throughout every patient journey.','High-quality medical equipment to support safe and effective patient care throughout the journey','Air ambulance, ground transportation, and ferry services are available to meet your medical transportation needs.'],partners:'Our Partnership',story:'AeroLife Story',storyText:'At AeroLife Thailand, we believe medical transportation is more than simply moving a patient from one destination to another. It is about providing trusted, compassionate care at every step. With a highly experienced medical team, fully equipped medical resources, and exceptional service — treating every patient like a member of our own family.',watch:'Watch our story',voices:'Patient Voices',voiceSub:'Real journeys. Heartfelt words.',care:'When Care Matters Most, We Go Further.',careText:'Combining medical expertise, aviation precision, and genuine compassion,\nwe deliver exceptional care throughout your journey.',team:'Medical Team',teamSub:'Dedicated people. Exceptional care. Meet the specialists who make every journey possible.',director:'Flight Medical Director',directorText:'Leading our medical team with experience, compassion, and a commitment to patient care — from the first conversation to a safe arrival.',roles:['Flight Doctor','Flight Nurse','Paramedic','EMT'],roleText:['Expert medical oversight and patient care in the air.','Attentive monitoring and compassionate care at every step.','Skilled support throughout medical transportation.','Coordinated support from departure to destination.'],contact:'Every journey starts with a conversation.',contactSub:'Speak with our team about your medical transportation needs.',talk:'Contact our team',view:'View letter',pause:'Pause slideshow',resume:'Resume slideshow'},
 th: {nav:['หน้าแรก','บริการ','ประสบการณ์','ทีมแพทย์','ติดต่อเรา'],hero:'เรามุ่งมั่นมอบมาตรฐานสูงสุดในการดูแลและเคลื่อนย้ายผู้ป่วย ด้วยความใส่ใจในทุกการเดินทาง',years:'ปีแห่งประสบการณ์',countries:'ประเทศ',cases:'เคสผู้ป่วย',services:['บริการครบวงจร','อุปกรณ์ทางการแพทย์','ทางเลือกในการเดินทาง'],desc:['ด้วยเครือข่ายพันธมิตรที่ไว้วางใจมากกว่า 10 แห่ง พร้อมดูแลตลอดการเดินทางของผู้ป่วย','อุปกรณ์ทางการแพทย์คุณภาพสูง เพื่อการดูแลผู้ป่วยอย่างมีประสิทธิภาพตลอดการเดินทาง','บริการเครื่องบินพยาบาล การเดินทางภาคพื้นดิน และเรือ ตามความต้องการในการเคลื่อนย้ายผู้ป่วย'],partners:'พันธมิตรของเรา',story:'เรื่องราวของ AeroLife',storyText:'ที่ AeroLife Thailand เราเชื่อว่าการเคลื่อนย้ายผู้ป่วยเป็นมากกว่าการเดินทางจากจุดหนึ่งไปยังอีกจุดหนึ่ง แต่คือการดูแลด้วยความเข้าใจและความไว้วางใจในทุกขั้นตอน ด้วยทีมแพทย์มากประสบการณ์ อุปกรณ์ทางการแพทย์ที่พร้อม และบริการที่ใส่ใจ เราดูแลผู้ป่วยทุกคนเสมือนคนในครอบครัว',watch:'ชมเรื่องราวของเรา',voices:'เสียงจากผู้ใช้บริการ',voiceSub:'ทุกการเดินทาง ทุกความรู้สึกจากใจ',care:'เมื่อการดูแลสำคัญที่สุด เราพร้อมไปให้ไกลกว่า',careText:'ผสานความเชี่ยวชาญทางการแพทย์ ความแม่นยำในการบิน และความใส่ใจ เพื่อดูแลคุณตลอดการเดินทาง',team:'ทีมแพทย์ของเรา',teamSub:'ทีมผู้เชี่ยวชาญที่ทุ่มเท เพื่อการดูแลในทุกการเดินทาง',director:'ผู้อำนวยการฝ่ายแพทย์การบิน',directorText:'นำทีมด้วยประสบการณ์ ความเข้าใจ และความมุ่งมั่นในการดูแลผู้ป่วย ตั้งแต่การติดต่อครั้งแรกจนถึงจุดหมายอย่างปลอดภัย',roles:['แพทย์เวชศาสตร์การบิน','พยาบาลการบิน','นักปฏิบัติการฉุกเฉินการแพทย์','เจ้าพนักงานฉุกเฉินการแพทย์'],roleText:['ดูแลและประเมินผู้ป่วยตลอดการเดินทางทางอากาศ','ติดตามอาการและดูแลอย่างใส่ใจในทุกขั้นตอน','สนับสนุนการดูแลระหว่างการเคลื่อนย้ายผู้ป่วย','ประสานการดูแลตั้งแต่ต้นทางจนถึงปลายทาง'],contact:'ทุกการเดินทางเริ่มต้นด้วยการพูดคุย',contactSub:'ปรึกษาทีมงานเกี่ยวกับการเคลื่อนย้ายผู้ป่วย',talk:'ติดต่อทีมงาน',view:'อ่านจดหมาย',pause:'หยุดสไลด์ชั่วคราว',resume:'เล่นสไลด์ต่อ'}
};
const sections=['home','services','experience','team','contact'];
const roleIcons=[Stethoscope,Heartbeat,FirstAidKit,Ambulance];
export function App(){
 const [lang,setLang]=useState('en');
 const [menu,setMenu]=useState(false);
 const isTeam=new URLSearchParams(window.location.search).get('page')==='team';
 const [active,setActive]=useState(isTeam?'team':'home');
 const [slide,setSlide]=useState(0);
 const [paused,setPaused]=useState(false);
 const [hovered,setHovered]=useState(false);
 const [modal,setModal]=useState(null);
 const [videoPlaying,setVideoPlaying]=useState(false);
 const root=useRef(null),dialog=useRef(null),track=useRef(null),direction=useRef(0);
 const t=copy[lang];
 const letterUrl=i=>asset(`Petient voice/${String(i+1).padStart(2,'0')}.jpg`);
 const changeSlide=delta=>{direction.current=delta;setSlide(n=>(n+delta+11)%11)};
 useEffect(()=>{document.documentElement.lang=lang},[lang]);
 useEffect(()=>{
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const hero=root.current.querySelector('.hero-copy');
   if(hero){gsap.from(hero.children,{y:22,opacity:0,stagger:.13,duration:.85,ease:'power3.out'});gsap.from('.hero-doctor',{y:25,opacity:0,duration:1,ease:'power3.out'})}
   // fromTo with immediateRender:false, never from(): a from() tween hides the element up front and
   // leaves it hidden for good if its ScrollTrigger never fires. Content stays visible either way now.
   gsap.utils.toArray('.reveal').forEach(el=>gsap.fromTo(el,{y:24,opacity:0},{y:0,opacity:1,duration:.65,ease:'power2.out',immediateRender:false,scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
  });
  // Trigger positions are measured before lazy images and webfonts settle; re-measure once they have.
  const refresh=()=>ScrollTrigger.refresh();
  window.addEventListener('load',refresh);
  document.fonts?.ready.then(refresh);
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:'-15% 0px -60% 0px'});
  sections.forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)});
  return()=>{window.removeEventListener('load',refresh);mm.revert();observer.disconnect()};
 },[]);
 useEffect(()=>{
  if(isTeam||paused||hovered||modal||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const id=setInterval(()=>changeSlide(1),5500);return()=>clearInterval(id);
 },[isTeam,paused,hovered,modal]);
 useLayoutEffect(()=>{
  const el=track.current;if(!el)return;
  const position=()=>el.clientWidth+parseFloat(getComputedStyle(el).gap);
  const width=position();
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.fromTo(el,{x:-width+direction.current*width},{x:-width,duration:reduced?0:.6,ease:'power2.inOut',overwrite:true});
  let measuredWidth=width;
  const observer=new ResizeObserver(()=>{const next=position();if(Math.abs(next-measuredWidth)>1){measuredWidth=next;gsap.killTweensOf(el);gsap.set(el,{x:-next})}});
  observer.observe(el);
  return()=>{observer.disconnect();gsap.killTweensOf(el)};
 },[slide]);
 useEffect(()=>{
  if(!modal)return;
  dialog.current?.showModal();
  const old=document.body.style.overflow;document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=old};
 },[modal]);
 const close=()=>{dialog.current?.close();setModal(null)};
 const navHref=id=>id==='team'?'/?page=team':isTeam?`/#${id}`:`#${id}`;
 return <div ref={root}>
  <a className="skip" href="#main">Skip to content</a>
  <header><div className="nav-wrap">
   <a className="wordmark" href={navHref('home')} aria-label="AeroLife home">AeroLife</a>
   <nav id="navigation" className={menu?'open':''} aria-label="Main navigation">{sections.map((id,i)=><a key={id} href={navHref(id)} className={active===id?'active':''} aria-current={active===id?'location':undefined} onClick={()=>setMenu(false)}>{t.nav[i]}</a>)}</nav>
   <div className="language" aria-label="Language">
    <button aria-label="ภาษาไทย" aria-pressed={lang==='th'} onClick={()=>setLang('th')}><span className="fi fi-th" aria-hidden="true"/></button>
    <button aria-label="English" aria-pressed={lang==='en'} onClick={()=>setLang('en')}><span className="fi fi-gb" aria-hidden="true"/></button>
   </div>
   <button className="menu-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(!menu)}>{menu?<X size={26}/>:<List size={26}/>}</button>
  </div></header>
  <main id="main">{isTeam?<>
 <section id="team" className="team container"><div className="team-heading reveal"><h2>{t.team}</h2><p>{t.teamSub}</p></div><article className="director reveal"><div className="director-image"><img src={doctor} alt="Dr. Sura Jaidwatee" loading="lazy"/></div><div><h3>Dr. Sura Jaidwatee MD.</h3><span>{t.director}</span><p>{t.directorText}</p></div></article><div className="team-stats reveal">{[['20+','Physicians'],['23+','Nurses'],['34+','Paramedics']].map(([n,l])=><div key={n}><strong>{n}</strong><span>{l}</span></div>)}</div><div className="team-roles">{t.roles.map((r,i)=>{const Icon=roleIcons[i];return <article className="role-card reveal" key={r}><Icon size={42} weight="light"/><h3>{r}</h3><p>{t.roleText[i]}</p><a href="/#contact">{t.talk}<ArrowUpRight size={18}/></a></article>})}</div></section>

  </>:<>
   <section id="home" className="hero">
    <div className="hero-art" aria-hidden="true">{['top-left','top-right','bottom-left','bottom-right'].map(corner=><img key={corner} className={`hero-pattern ${corner}`} src={asset(`hero-${corner}.svg`)} alt=""/>)}</div>
    <div className="container hero-inner"><div className="hero-copy"><h1>AeroLife<span>Thailand</span></h1><p>{t.hero}</p></div><img className="hero-doctor" src={doctor} alt="Dr. Sura Jaidwatee, Flight Medical Director" fetchPriority="high"/></div>
   </section>
   <div className="stats container">{[['18',t.years],['89+',t.countries],['2,000+',t.cases]].map(([n,label])=><div key={n}><strong>{n}</strong><span>{label}</span></div>)}</div>
   <section id="services" className="services container">{t.services.map((title,i)=><article className="service-card reveal" key={i}><div className="service-icon"><img src={icons[i]} alt=""/></div><h2>{title}</h2><p>{t.desc[i]}</p></article>)}</section>
   <section className="partners"><div className="container"><h2>{t.partners}</h2><div className="partner-grid">{partners.map((p,i)=><img key={p} src={asset(p)} alt={partnerNames[i]} loading="lazy"/>)}</div></div></section>
   <section id="experience" className="story"><div className="story-video reveal">
    {videoPlaying?<iframe src="https://www.youtube-nocookie.com/embed/yntcLjZ2Sq8?autoplay=1" title="AeroLife Thailand — our story" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>:<button className="video-poster" aria-label={t.watch} onClick={()=>setVideoPlaying(true)}><img src={asset('story-poster.jpg')} alt="AeroLife Thailand video story"/><span className="video-play"><Play size={38} weight="fill"/></span></button>}
   </div><div className="story-copy reveal"><h2>{t.story}</h2><p>{t.storyText}</p></div></section>
   <section className="voices" aria-roledescription="carousel" aria-label={t.voices}>
    <div className="container"><div className="section-heading"><h2>{t.voices}</h2><button className="round" onClick={()=>setPaused(!paused)} aria-label={paused?t.resume:t.pause}>{paused?<Play size={20}/>:<Pause size={20}/>}</button></div>
    <div className="letter-window" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setHovered(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setHovered(false)}}>
     <div className="letter-track" ref={track}>{[(slide+10)%11,slide,(slide+1)%11].map((index,position)=><div className="letter-slide" key={position} aria-hidden={position!==1}><button onClick={()=>setModal(index+1)} tabIndex={position===1?0:-1} aria-label={`${t.view} ${index+1}`}><img src={letterUrl(index)} alt={`Patient appreciation letter ${index+1}`}/></button></div>)}</div>
    </div>
    <div className="slider-controls"><button className="round" aria-label="Previous letter" onClick={()=>changeSlide(-1)}><ArrowLeft size={21}/></button><span aria-live="polite">{String(slide+1).padStart(2,'0')} <span className="muted">/ 11</span></span><button className="round" aria-label="Next letter" onClick={()=>changeSlide(1)}><ArrowRight size={21}/></button></div>
    </div>
   </section>
   <section className="care container reveal"><h2>{t.care}</h2><p>{t.careText}</p></section>
  </>}</main>
  <footer id="contact" className="contact-strip"><div className="container">
   <div className="contact-row"><span className="contact-icon"><Phone size={27} weight="fill"/></span><div><a href="tel:+66880123567">+66880123567</a> <a href="tel:+66653242823">+66653242823</a></div></div>
   <a className="contact-row" href="mailto:aerolifethailand@gmail.com"><span className="contact-icon"><EnvelopeSimple size={27}/></span><span>Aerolifethailand@gmail.com</span></a>
   <div className="contact-row"><span className="contact-icon"><LinkedinLogo size={27}/></span><span>Linked in : Dr.Sura Jaidwatee MD.</span></div>
  </div></footer>
  <dialog ref={dialog} onCancel={()=>setModal(null)} onClick={e=>{if(e.target===e.currentTarget)close()}} aria-label="Patient appreciation letter"><button className="modal-close" onClick={close} aria-label="Close letter"><X size={26}/></button>{modal&&<img src={letterUrl(modal-1)} alt={`Patient appreciation letter ${modal}`}/>}</dialog>
 </div>;
}
