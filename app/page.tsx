'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Play, Pause, Code2 as Github, Check, Copy, Menu, X, Disc3, Music2, ListMusic, Mic2, FolderOpen, Heart, Smartphone, Server, SlidersHorizontal, Headphones, Radio, ShieldCheck, Search, ChevronDown, Terminal, Layers, AudioLines, Clock3, Users, FileMusic } from 'lucide-react';
const REPO = 'https://github.com/skippingclass/TuneCloud';
const views = [
  { id: 'home', label: 'Главная', icon: Disc3, src: '/media/home.webp', caption: 'Вся коллекция. Один красивый дом.', detail: 'Альбомы, артисты, избранное — без бесконечных папок.' },
  { id: 'lyrics', label: 'Лирика', icon: Mic2, src: '/media/lyrics.webp', caption: 'Каждое слово — в своём моменте.', detail: 'Реальная запись TuneCloud. OG Buda, 163ONMYNECK, Yanix — «Выдох».' },
  { id: 'albums', label: 'Медиатека', icon: Layers, src: '/media/albums.webp', caption: 'Найди именно тот альбом.', detail: 'Поиск, фильтры, сортировки и два размера сетки.' },
  { id: 'queue', label: 'Очередь', icon: ListMusic, src: '/media/queue.webp', caption: 'Ты решаешь, что играет дальше.', detail: 'Меняй порядок, возвращайся к прошлым трекам, сохраняй очередь.' },
];
const capabilities = [
  { icon: Search, title: 'Найти. Выбрать. Включить.', text: 'Поиск по трекам, артистам и альбомам. Сортировки, диапазоны через Shift, выбор через Ctrl / ⌘ и действия по ПКМ.' },
  { icon: Heart, title: 'Твоя музыкальная память', text: 'Избранное, личные плейлисты и история прослушиваний. Даже если один трек был на повторе весь вечер.' },
  { icon: FolderOpen, title: 'Умный рескан', text: 'Новые и изменённые файлы появляются в коллекции. Обложки обновляются, а временно пропавшие треки сохраняют связи с плейлистами.' },
  { icon: AudioLines, title: 'Оригинальный звук', text: 'Сервер отдаёт исходный аудиофайл. FLAC, MP3, Ogg, Opus, M4A и другие форматы — в твоей библиотеке.' },
  { icon: Clock3, title: 'Детали, которые чувствуешь', text: 'Таймер сна, восстановление очереди и позиции, повтор и перемешивание. Открыл снова — продолжил со своего места.' },
  { icon: Users, title: 'У каждого своё', text: 'Несколько аккаунтов, личные избранное и история. Администратор управляет доступом и редактированием тегов.' },
];
const steps = [
  { name: 'Забери исходники', label: '01 / КОЛЛЕКЦИЯ НАЧИНАЕТСЯ ЗДЕСЬ', text: 'Склонируй репозиторий и создай свой файл конфигурации.', code: 'git clone https://github.com/skippingclass/TuneCloud.git\ncd TuneCloud\ncp .env.example .env' },
  { name: 'Укажи свою музыку', label: '02 / ОДИН РАЗ НАСТРОИТЬ', text: 'В .env укажи MUSIC_DIR, задай уникальные пароли администратора и PostgreSQL, создай JWT_SECRET. Все параметры есть в инструкции.', code: '# Сгенерировать секрет для JWT_SECRET\nopenssl rand -hex 32\n\n# Открой .env и укажи путь к своей коллекции\n# MUSIC_DIR=/absolute/path/to/music' },
  { name: 'Нажми Play', label: '03 / ОСТАЛОСЬ ТОЛЬКО ВКЛЮЧИТЬ', text: 'Запусти контейнеры, войди под своим администратором и запусти сканирование медиатеки.', code: 'docker compose up -d\n\n# Открой адрес своего сервера\n# http://YOUR_SERVER:APP_PORT' },
];
function Brand() { return <span className="brand"><span className="brand-bars"><i/><i/><i/></span>TuneCloud</span>; }
function InlineDemo({ label }: { label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.play().catch(()=>{});
  }, []);
  return <div className="inline-demo"><video ref={video} src="/media/lyrics.mp4" poster="/media/lyrics.webp" loop muted playsInline
    aria-label={label} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onTimeUpdate={()=>{const el=video.current;if(el?.duration)setProgress(el.currentTime/el.duration);}}/>
    <div className="inline-demo-controls"><span><span className="status-dot"/> ЗАПИСЬ ИНТЕРФЕЙСА</span><button aria-label={playing?'Приостановить демо':'Воспроизвести демо'} onClick={()=>{const el=video.current;if(el?.paused)el.play().catch(()=>{});else el?.pause();}}>{playing?<Pause size={13}/>:<Play size={13} fill="currentColor"/>}{playing?'Пауза':'Смотреть'}</button></div>
    <div className="inline-progress" aria-hidden="true"><i style={{transform:`scaleX(${progress})`}}/></div>
  </div>;
}
export default function Home() {
  const [view, setView] = useState(0);
  const [menu, setMenu] = useState(false);
  const [phone, setPhone] = useState<'namida'|'web'>('namida');
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copy = async () => { try { await navigator.clipboard.writeText(steps[step].code); setCopied(true); setCopyError(false); setTimeout(() => setCopied(false), 2200); } catch { setCopyError(true); } };
  return <>
    <a href="#main" className="skip-link">К содержимому</a>
    <header className="site-header"><a href="#" aria-label="TuneCloud — наверх"><Brand/></a>
      <nav className={menu ? 'navigation is-open' : 'navigation'} aria-label="Навигация">
        {[['Возможности','#features'],['Плеер','#player'],['Запуск','#start'],['Вопросы','#faq']].map(([name,href]) => <a key={href} href={href} onClick={()=>setMenu(false)}>{name}</a>)}
      </nav>
      <a className="header-github" href={REPO} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" aria-label={menu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
    </header>
    <main id="main">
      <section className="hero wrap">
        <div className="hero-topline"><span className="eyebrow"><span className="status-dot"/> SELF-HOSTED MUSIC. OPEN SOURCE.</span><span className="hero-note">Собран для тех, кто слушает.</span></div>
        <div className="hero-copy"><h1>Твоя музыка.<br/><span>Твои правила.</span></h1><div className="hero-description"><p>Вся твоя коллекция — в стриминге,<br className="desktop-break"/> который принадлежит тебе.</p><p className="muted">Красивый плеер. Синхронная лирика. Никаких случайных решений за тебя. Только ты, твой сервер и следующий любимый трек.</p><div className="hero-buttons"><a className="button button-white" href="#start">Забрать TuneCloud <ArrowUpRight size={17}/></a><a className="button button-ghost" href="#lyrics"><Play size={15} fill="currentColor"/> Смотреть в деле</a></div></div></div>
        <div className="product-stage" id="player">
          <div className="stage-top"><div className="window-dots"><i/><i/><i/></div><span><span className="tiny-dot"/> твоя личная музыкальная вселенная</span><span className="stage-version">TUNECLOUD / WEB PLAYER</span></div>
          <div className="stage-screen">{view===1 ? <InlineDemo label="Демо синхронной лирики: Выдох"/> : <img src={views[view].src} alt={views[view].caption} fetchPriority="high"/>}</div>
          <div className="stage-bottom"><div className="stage-tabs" role="tablist" aria-label="Посмотреть интерфейс">{views.map((item,i) => <button key={item.id} role="tab" id={`tab-${item.id}`} aria-selected={i===view} aria-controls="stage-caption" onClick={()=>setView(i)}><item.icon size={15}/><span>{item.label}</span></button>)}</div><span className="stage-hint"><span className="tiny-dot"/> Реальный интерфейс. Реальная коллекция.</span></div>
        </div>
        <div className="stage-caption" role="tabpanel" id="stage-caption" aria-labelledby={`tab-${views[view].id}`}><strong>{views[view].caption}</strong><span>{views[view].detail}</span></div>
        <div className="format-strip"><span>ТВОИ ФАЙЛЫ. БЕЗ СМЕНЫ ПРИВЫЧЕК.</span><div>{['FLAC','MP3','OGG','OPUS','M4A','WAV'].map(format=><span key={format}>{format}</span>)}</div><span>+ совместимые Subsonic-клиенты <ArrowUpRight size={14}/></span></div>
      </section>
      <section className="intro wrap" id="features"><div className="section-index">01 — ЗАЧЕМ TUNECLOUD</div><div className="intro-grid"><h2>Коллекция — твоя.<br/><span>Опыт — как надо.</span></h2><p>Ты уже выбрал свою музыку. Теперь ей нужен достойный дом. TuneCloud превращает папки с треками в библиотеку, в которую хочется возвращаться.</p></div>
        <div className="principles"><div><FolderOpen size={23}/><h3>Файлы остаются у тебя</h3><p>Твоя коллекция живёт на твоём сервере. TuneCloud сканирует её и делает удобной для прослушивания.</p></div><div><SlidersHorizontal size={23}/><h3>Контроль в каждом клике</h3><p>Собирай очередь, выделяй треки, редактируй теги. Всё на своих местах, всё под рукой.</p></div><div><Github size={23}/><h3>Открыто по-настоящему</h3><p>Исходники, конфигурация и инфраструктура доступны. Можно разобраться, изменить и собрать по-своему.</p></div></div>
      </section>
      <section className="lyrics-feature wrap" id="lyrics"><div className="section-index">02 — ПОПАСТЬ В МОМЕНТ</div><div className="feature-heading"><div><h2>Не просто слушай.<br/><span>Знай каждую строчку.</span></h2></div><p>Синхронный текст следует за треком. Плавная подсветка, фокус на активной строке и переход к нужному моменту одним нажатием.</p></div>
        <div className="lyrics-cinema"><InlineDemo label="Выдох — демонстрация синхронных текстов"/><div className="cinema-credit"><AudioLines size={15}/><span>«Выдох» · OG Buda, 163ONMYNECK, Yanix</span><span>ЗАПИСАНО В TUNECLOUD</span></div></div>
        <div className="feature-footnotes"><span><Check size={14}/> Локальные и встроенные тексты</span><span><Check size={14}/> lrc.red и LRCLIB</span><span><Check size={14}/> Переход по строке</span><span><Check size={14}/> Цвета твоей обложки</span></div>
      </section>
      <section className="control-feature wrap"><div className="control-copy"><div className="section-index">03 — ТВОЙ СЛЕДУЮЩИЙ ТРЕК</div><h2>Хорошая очередь.<br/><span>Никакого хаоса.</span></h2><p>Поставь нужное следующим, перетащи лишнее вниз или начни с чистого листа. Очередь — часть твоего прослушивания, а не отдельная головоломка.</p><ul className="clean-list"><li><ListMusic size={17}/><span>Перетаскивание и управление с клавиатуры</span></li><li><Music2 size={17}/><span>Двойной клик, ПКМ и переход к артисту</span></li><li><Heart size={17}/><span>Сохранение всей очереди в плейлист</span></li></ul><a className="text-link" href={`${REPO}#features`} target="_blank" rel="noreferrer">Всё о возможностях <ArrowUpRight size={16}/></a></div><div className="queue-visual"><div className="visual-tag"><span className="status-dot"/> YOUR NEXT OBSESSION</div><img src="/media/queue-panel.webp" alt="Очередь TuneCloud с текущим треком, будущими треками и управлением порядком" loading="lazy"/><div className="keyboard-note"><kbd>Ctrl</kbd><span>+</span><kbd>Shift</kbd><span>Меньше кликов. Больше музыки.</span></div></div></section>
      <section className="capabilities wrap"><div className="section-index">04 — ДЕТАЛИ СОСТАВЛЯЮТ ЦЕЛОЕ</div><div className="feature-heading"><h2>Всё, что нужно.<br/><span>Без лишнего шума.</span></h2><span className="quiet-label">MADE FOR YOUR COLLECTION</span></div><div className="capability-grid">{capabilities.map(item=><article key={item.title}><item.icon size={23} strokeWidth={1.5}/><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
      <section className="mobile-feature"><div className="wrap mobile-inner"><div className="mobile-copy"><div className="section-index">05 — ЗА ПРЕДЕЛАМИ ДЕСКТОПА</div><h2>Тот же вайб.<br/><span>На другом экране.</span></h2><p>Полноценный мобильный веб-плеер с большой обложкой, лирикой и понятным управлением. А если у тебя уже есть любимый Subsonic-клиент — подключай его к TuneCloud.</p><div className="phone-tabs" role="group" aria-label="Мобильный клиент"><button aria-pressed={phone==='namida'} onClick={()=>setPhone('namida')}>Namida <ArrowUpRight size={12}/></button><button aria-pressed={phone==='web'} onClick={()=>setPhone('web')}>Веб-плеер TuneCloud</button></div><div className="connection-tags"><span><Smartphone size={16}/> Мобильный веб</span><span><Radio size={16}/> OpenSubsonic API</span></div><p className="small-muted">Один адрес сервера и тот же аккаунт.<br/>Совместимость отдельных функций зависит от клиента.</p></div><div className="phone-scene"><div className="phone-glow"/><div className="phone-frame"><div className="phone-notch"/><img src={phone==='namida'?'/media/namida.webp':'/media/mobile.webp'} alt={phone==='namida'?'Namida — мобильный OpenSubsonic-клиент с коллекцией TuneCloud':'Мобильный веб-плеер TuneCloud'} loading="lazy"/></div><span className="phone-side-label">{phone==='namida'?'NAMIDA · OPENSUBSONIC CLIENT':'TUNECLOUD · MOBILE WEB'}</span></div></div></section>
      <section className="infrastructure wrap"><div className="section-index">06 — КРАСИВО СНАРУЖИ. ПРОДУМАНО ВНУТРИ.</div><div className="feature-heading"><h2>За кнопкой Play —<br/><span>настоящая инженерия.</span></h2><p>TuneCloud — ещё и DevOps-проект с полным циклом доставки. От проверки кода до контейнеров, GitOps и наблюдаемости.</p></div><div className="infra-track">{[{icon:Github,title:'GitHub Actions',text:'Проверки и сборка'},{icon:Layers,title:'Docker + GHCR',text:'Контейнеры приложения'},{icon:Server,title:'Kubernetes',text:'k3s, Helm, Argo CD'},{icon:AudioLines,title:'Наблюдаемость',text:'Prometheus + Grafana'}].map((item,i)=><div key={item.title}><span className="infra-number">0{i+1}</span><item.icon size={23}/><h3>{item.title}</h3><p>{item.text}</p>{i<3&&<ArrowRight className="infra-arrow" size={17}/>}</div>)}</div><a className="text-link" href="https://github.com/egorpirkov/TuneCloud-GitOps" target="_blank" rel="noreferrer">Посмотреть инфраструктуру <ArrowUpRight size={16}/></a></section>
      <section className="start-section wrap" id="start"><div className="section-index">07 — ОТ ПАПКИ ДО PLAY</div><div className="feature-heading"><h2>Твой сервер.<br/><span>Твой новый стриминг.</span></h2><p>Нужны Docker Compose и папка с музыкой. Исходники открыты — начни с локальной установки или разверни свой сервер.</p></div><div className="setup-grid"><div className="setup-steps" role="tablist" aria-label="Шаги установки">{steps.map((item,i)=><button key={item.name} role="tab" aria-selected={step===i} aria-controls="setup-code" onClick={()=>{setStep(i);setCopied(false);setCopyError(false);}}><span>0{i+1}</span><div><strong>{item.name}</strong><p>{item.text}</p></div><ArrowUpRight size={17}/></button>)}</div><div className="terminal-card" id="setup-code" role="tabpanel"><div className="terminal-top"><span><Terminal size={15}/> QUICKSTART</span><button onClick={copy} aria-label="Скопировать команды">{copied?<Check size={15}/>:<Copy size={15}/>} {copied?'Скопировано':'Копировать'}</button></div><div className="terminal-content"><span className="terminal-label">{steps[step].label}</span><pre><code>{steps[step].code}</code></pre>{copyError&&<p role="alert">Не удалось скопировать — выдели команды вручную.</p>}</div><a href={`${REPO}#quickstart`} target="_blank" rel="noreferrer">Полная инструкция и настройка <ArrowUpRight size={15}/></a></div></div></section>
      <section className="faq wrap" id="faq"><div><div className="section-index">ЕЩЁ ПАРА ВОПРОСОВ</div><h2>Без загадок.</h2></div><div className="faq-items">{[
        ['Это музыкальный сервис с готовым каталогом?','TuneCloud работает с твоими собственными аудиофайлами. Он превращает коллекцию на сервере в удобную библиотеку и стриминг. Готовый музыкальный каталог в него не входит.'],
        ['Нужен ли Kubernetes, чтобы начать?','Нет. Для своей установки достаточно Docker Compose. Kubernetes, Helm и Argo CD — отдельная часть проекта для тех, кому интересна инфраструктура и GitOps.'],
        ['Что с качеством аудио?','TuneCloud отдаёт исходный аудиофайл и поддерживает HTTP Range для перемотки. Серверного транскодирования пока нет, поэтому воспроизведение формата зависит от браузера или клиента.'],
        ['Откуда берутся тексты песен?','Из локальных файлов, встроенных тегов, lrc.red и LRCLIB. Для синхронных текстов доступны подсветка и переход по строке; обычный текст показывается без привязки ко времени. Доступность зависит от трека и настройки источников.'],
        ['Можно ли менять проект под себя?','Да. В репозитории открыты исходники интерфейса и сервера. Можно изучить код, предложить улучшение или собрать собственную версию — условия использования описаны в LICENSE репозитория.'],
      ].map(([question,answer])=><details key={question}><summary>{question}<ChevronDown size={18}/></summary><p>{answer}</p></details>)}</div></section>
      <section className="final-cta wrap"><span className="eyebrow"><Headphones size={15}/> СЛЕДУЮЩИЙ ТРЕК — ЗА ТОБОЙ</span><h2>Хорошая музыка<br/>заслуживает <span>хорошего дома.</span></h2><p>Он уже есть. Осталось принести свою коллекцию.</p><div><a className="button button-white" href={REPO} target="_blank" rel="noreferrer"><Github size={18}/> Забрать на GitHub <ArrowUpRight size={17}/></a><a className="button button-ghost" href="https://tune.realgeek.ru" target="_blank" rel="noreferrer">Открыть приложение <ArrowUpRight size={17}/></a></div></section>
    </main>
    <footer className="site-footer wrap"><a href="#"><Brand/></a><p>Твоя музыка. Твои правила.</p><div><a href={REPO} target="_blank" rel="noreferrer">Исходники <ArrowUpRight size={13}/></a><a href={`${REPO}/issues`} target="_blank" rel="noreferrer">Предложить идею <ArrowUpRight size={13}/></a></div><small>Обложки и тексты принадлежат их авторам. Интерфейс и демо — TuneCloud.</small></footer>

  </>;
}
