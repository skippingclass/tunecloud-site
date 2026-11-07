'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Pause,
  Code2 as Github,
  Check,
  Copy,
  Menu,
  X,
  Disc3,
  Music2,
  ListMusic,
  Mic2,
  FolderOpen,
  Heart,
  Smartphone,
  Server,
  SlidersHorizontal,
  Headphones,
  Radio,
  Search,
  ChevronDown,
  Terminal,
  Layers,
  AudioLines,
  Clock3,
  Users,
} from 'lucide-react';

const REPO = 'https://github.com/skippingclass/TuneCloud';

type Lang = 'en' | 'ru';

interface ViewItem {
  id: string;
  label: Record<Lang, string>;
  icon: typeof Disc3;
  src: string;
  caption: Record<Lang, string>;
  detail: Record<Lang, string>;
}

const views: ViewItem[] = [
  {
    id: 'home',
    label: { en: 'Home', ru: 'Главная' },
    icon: Disc3,
    src: '/media/home.webp',
    caption: {
      en: 'Your entire collection in one clean interface.',
      ru: 'Вся коллекция. Один красивый дом.',
    },
    detail: {
      en: 'Albums, artists, and favorites cleanly organized without cluttered folders.',
      ru: 'Альбомы, артисты, избранное — без бесконечных папок.',
    },
  },
  {
    id: 'lyrics',
    label: { en: 'Lyrics', ru: 'Лирика' },
    icon: Mic2,
    src: '/media/lyrics.webp',
    caption: {
      en: 'Every word in sync with the beat.',
      ru: 'Каждое слово — в своём моменте.',
    },
    detail: {
      en: 'Real TuneCloud screen recording: OG Buda, 163ONMYNECK, Yanix — "Выдох".',
      ru: 'Реальная запись TuneCloud. OG Buda, 163ONMYNECK, Yanix — «Выдох».',
    },
  },
  {
    id: 'albums',
    label: { en: 'Library', ru: 'Медиатека' },
    icon: Layers,
    src: '/media/albums.webp',
    caption: {
      en: 'Find any album or track in seconds.',
      ru: 'Найди именно тот альбом.',
    },
    detail: {
      en: 'Fast search, multi-attribute filters, sorting options, and two grid sizes.',
      ru: 'Поиск, фильтры, сортировки и два размера сетки.',
    },
  },
  {
    id: 'queue',
    label: { en: 'Queue', ru: 'Очередь' },
    icon: ListMusic,
    src: '/media/queue.webp',
    caption: {
      en: 'You decide what plays next.',
      ru: 'Ты решаешь, что играет дальше.',
    },
    detail: {
      en: 'Drag to reorder, jump between tracks, and save queues to playlists.',
      ru: 'Меняй порядок, возвращайся к прошлым трекам, сохраняй очередь.',
    },
  },
];

const capabilities = [
  {
    icon: Search,
    title: { en: 'Search, Filter & Select', ru: 'Найти. Выбрать. Включить.' },
    text: {
      en: 'Search across tracks, artists, and albums. Range selection with Shift, multi-select with Ctrl / ⌘, and quick context actions.',
      ru: 'Поиск по трекам, артистам и альбомам. Сортировки, диапазоны через Shift, выбор через Ctrl / ⌘ и действия по ПКМ.',
    },
  },
  {
    icon: Heart,
    title: { en: 'Your Listening History', ru: 'Твоя музыкальная память' },
    text: {
      en: 'Favorites, custom playlists, and full listening history — even if one track was on repeat all evening.',
      ru: 'Избранное, личные плейлисты и история прослушиваний. Даже если один трек был на повторе весь вечер.',
    },
  },
  {
    icon: FolderOpen,
    title: { en: 'Smart Library Rescan', ru: 'Умный рескан' },
    text: {
      en: 'New and updated files sync smoothly. Artwork refreshes and moved tracks maintain their playlist relations.',
      ru: 'Новые и изменённые файлы появляются в коллекции. Обложки обновляются, а временно пропавшие треки сохраняют связи с плейлистами.',
    },
  },
  {
    icon: AudioLines,
    title: { en: 'Bit-Perfect Sound', ru: 'Оригинальный звук' },
    text: {
      en: 'Direct streaming of source audio files. Native support for FLAC, MP3, OGG, Opus, M4A, and WAV.',
      ru: 'Сервер отдаёт исходный аудиофайл. FLAC, MP3, Ogg, Opus, M4A и другие форматы — в твоей библиотеке.',
    },
  },
  {
    icon: Clock3,
    title: { en: 'Thoughtful Controls', ru: 'Детали, которые чувствуешь' },
    text: {
      en: 'Sleep timer, queue state recovery, playback position resume, shuffle, and repeat modes.',
      ru: 'Таймер сна, восстановление очереди и позиции, повтор и перемешивание. Открыл снова — продолжил со своего места.',
    },
  },
  {
    icon: Users,
    title: { en: 'Multi-User Support', ru: 'У каждого своё' },
    text: {
      en: 'Separate accounts with independent favorites and history. Administrator role for library scans and tag edits.',
      ru: 'Несколько аккаунтов, личные избранное и история. Администратор управляет доступом и редактированием тегов.',
    },
  },
];

const steps = [
  {
    name: { en: 'Clone repository', ru: 'Забери исходники' },
    label: { en: '01 / GET THE SOURCE CODE', ru: '01 / КОЛЛЕКЦИЯ НАЧИНАЕТСЯ ЗДЕСЬ' },
    text: {
      en: 'Clone the repository and copy the environment configuration template.',
      ru: 'Склонируй репозиторий и создай свой файл конфигурации.',
    },
    code: 'git clone https://github.com/skippingclass/TuneCloud.git\ncd TuneCloud\ncp .env.example .env',
  },
  {
    name: { en: 'Configure your music', ru: 'Укажи свою музыку' },
    label: { en: '02 / SET UP ONCE', ru: '02 / ОДИН РАЗ НАСТРОИТЬ' },
    text: {
      en: 'Set MUSIC_DIR to your audio folder, configure passwords, and generate JWT_SECRET.',
      ru: 'В .env укажи MUSIC_DIR, задай уникальные пароли администратора и PostgreSQL, создай JWT_SECRET. Все параметры есть в инструкции.',
    },
    code: '# Generate JWT_SECRET\nopenssl rand -hex 32\n\n# Open .env and specify your music folder\n# MUSIC_DIR=/absolute/path/to/music',
  },
  {
    name: { en: 'Launch & Play', ru: 'Нажми Play' },
    label: { en: '03 / READY TO LISTEN', ru: '03 / ОСТАЛОСЬ ТОЛЬКО ВКЛЮЧИТЬ' },
    text: {
      en: 'Start containers with Docker Compose, log in as admin, and trigger your initial music scan.',
      ru: 'Запусти контейнеры, войди под своим администратором и запусти сканирование медиатеки.',
    },
    code: 'docker compose up -d\n\n# Open your server address in browser\n# http://YOUR_SERVER:APP_PORT',
  },
];

const infraItems = [
  {
    icon: Github,
    title: 'GitHub Actions',
    text: { en: 'Checks & automated builds', ru: 'Проверки и сборка' },
  },
  {
    icon: Layers,
    title: 'Docker + GHCR',
    text: { en: 'App container images', ru: 'Контейнеры приложения' },
  },
  {
    icon: Server,
    title: 'Kubernetes',
    text: { en: 'k3s, Helm, Argo CD', ru: 'k3s, Helm, Argo CD' },
  },
  {
    icon: AudioLines,
    title: 'Observability',
    text: { en: 'Prometheus + Grafana', ru: 'Prometheus + Grafana' },
  },
];

const faqItems = [
  {
    q: {
      en: 'Is this a music service with a pre-loaded catalog?',
      ru: 'Это музыкальный сервис с готовым каталогом?',
    },
    a: {
      en: 'TuneCloud is designed for your own audio files. It indexes your collection on your server and turns it into a fast, private streaming web app and Subsonic API endpoint. A pre-loaded commercial catalog is not included.',
      ru: 'TuneCloud работает с твоими собственными аудиофайлами. Он превращает коллекцию на сервере в удобную библиотеку и стриминг. Готовый музыкальный каталог в него не входит.',
    },
  },
  {
    q: {
      en: 'Is Kubernetes required to get started?',
      ru: 'Нужен ли Kubernetes, чтобы начать?',
    },
    a: {
      en: 'No. Docker Compose is all you need for home servers, NAS, or simple VPS hosting. Kubernetes, Helm, and Argo CD are optional components for those interested in cluster GitOps.',
      ru: 'Нет. Для своей установки достаточно Docker Compose. Kubernetes, Helm и Argo CD — отдельная часть проекта для тех, кому интересна инфраструктура и GitOps.',
    },
  },
  {
    q: {
      en: 'What about audio streaming quality?',
      ru: 'Что с качеством аудио?',
    },
    a: {
      en: 'TuneCloud streams your original audio files bit-for-bit with HTTP Range support for instant seeking. There is no lossy server transcoding, so playback quality is identical to your source files.',
      ru: 'TuneCloud отдаёт исходный аудиофайл и поддерживает HTTP Range для перемотки. Серверного транскодирования пока нет, поэтому воспроизведение формата зависит от браузера или клиента.',
    },
  },
  {
    q: {
      en: 'Where do lyrics come from?',
      ru: 'Откуда берутся тексты песен?',
    },
    a: {
      en: 'From local .lrc files alongside your tracks, embedded audio tags, and external lyric APIs like lrc.red and LRCLIB. Synchronized lyrics include active verse highlighting and seek-on-click.',
      ru: 'Из локальных файлов, встроенных тегов, lrc.red и LRCLIB. Для синхронных текстов доступны подсветка и переход по строке; обычный текст показывается без привязки ко времени. Доступность зависит от трека и настройки источников.',
    },
  },
  {
    q: {
      en: 'Can I customize or contribute to the project?',
      ru: 'Можно ли менять проект под себя?',
    },
    a: {
      en: 'Yes. Source code for both frontend and backend is publicly available on GitHub. You can inspect the code, suggest improvements, or build your own custom setup under the project license.',
      ru: 'Да. В репозитории открыты исходники интерфейса и сервера. Можно изучить код, предложить улучшение или собрать собственную версию — условия использования описаны в LICENSE репозитория.',
    },
  },
];

function Brand() {
  return (
    <span className="brand">
      <span className="brand-bars">
        <i />
        <i />
        <i />
      </span>
      TuneCloud
    </span>
  );
}

function InlineDemo({ label, lang }: { label: string; lang: Lang }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.current?.play().catch(() => {});
    }
  }, []);

  return (
    <div className="inline-demo">
      <video
        ref={video}
        src="/media/lyrics.mp4"
        poster="/media/lyrics.webp"
        loop
        muted
        playsInline
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={() => {
          const el = video.current;
          if (el?.duration) setProgress(el.currentTime / el.duration);
        }}
      />
      <div className="inline-demo-controls">
        <span>
          <span className="status-dot" /> {lang === 'ru' ? 'ЗАПИСЬ ИНТЕРФЕЙСА' : 'UI RECORDING'}
        </span>
        <button
          aria-label={
            playing
              ? lang === 'ru'
                ? 'Приостановить демо'
                : 'Pause demo'
              : lang === 'ru'
                ? 'Воспроизвести демо'
                : 'Play demo'
          }
          onClick={() => {
            const el = video.current;
            if (el?.paused) el.play().catch(() => {});
            else el?.pause();
          }}
        >
          {playing ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
          {playing ? (lang === 'ru' ? 'Пауза' : 'Pause') : lang === 'ru' ? 'Смотреть' : 'Play'}
        </button>
      </div>
      <div className="inline-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [view, setView] = useState(0);
  const [menu, setMenu] = useState(false);
  const [phone, setPhone] = useState<'namida' | 'web'>('namida');
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const switchLang = (next: Lang) => {
    setLang(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tunecloud_lang', next);
      document.documentElement.lang = next;
      document.title =
        next === 'ru'
          ? 'TuneCloud — твоя музыка. Твои правила.'
          : 'TuneCloud — Your music. Your rules.';
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get('lang');
    if (qLang === 'ru' || qLang === 'en') {
      switchLang(qLang);
      return;
    }
    const saved = localStorage.getItem('tunecloud_lang');
    if (saved === 'ru' || saved === 'en') {
      switchLang(saved);
    } else {
      document.documentElement.lang = 'en';
      document.title = 'TuneCloud — Your music. Your rules.';
    }
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(steps[step].code);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopyError(true);
    }
  };

  const navLinks = [
    { name: lang === 'ru' ? 'Возможности' : 'Features', href: '#features' },
    { name: lang === 'ru' ? 'Плеер' : 'Player', href: '#player' },
    { name: lang === 'ru' ? 'Запуск' : 'Quickstart', href: '#start' },
    { name: lang === 'ru' ? 'Вопросы' : 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <a href="#main" className="skip-link">
        {lang === 'ru' ? 'К содержимому' : 'Skip to content'}
      </a>

      <header className="site-header">
        <a href="#" aria-label="TuneCloud">
          <Brand />
        </a>

        <nav className={menu ? 'navigation is-open' : 'navigation'} aria-label="Navigation">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenu(false)}>
              {item.name}
            </a>
          ))}
          <div className="mobile-nav-lang">
            <span className="mobile-nav-lang-label">
              {lang === 'ru' ? 'Язык' : 'Language'}:
            </span>
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => {
                switchLang('en');
                setMenu(false);
              }}
            >
              EN
            </button>
            <span className="lang-sep">/</span>
            <button
              type="button"
              className={`lang-btn ${lang === 'ru' ? 'is-active' : ''}`}
              onClick={() => {
                switchLang('ru');
                setMenu(false);
              }}
            >
              RU
            </button>
          </div>
        </nav>

        <div className="header-actions">
          <div className="lang-switcher" role="group" aria-label="Language">
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => switchLang('en')}
              aria-label="Switch to English"
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <span className="lang-sep">/</span>
            <button
              type="button"
              className={`lang-btn ${lang === 'ru' ? 'is-active' : ''}`}
              onClick={() => switchLang('ru')}
              aria-label="Переключить на русский"
              aria-pressed={lang === 'ru'}
            >
              RU
            </button>
          </div>

          <a className="header-github" href={REPO} target="_blank" rel="noreferrer">
            <Github size={17} /> GitHub <ArrowUpRight size={15} />
          </a>
        </div>

        <button
          className="menu-toggle"
          aria-label={menu ? 'Close menu' : 'Open menu'}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>

      <main id="main">
        {/* HERO SECTION */}
        <section className="hero wrap">
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="status-dot" />{' '}
              {lang === 'ru'
                ? 'SELF-HOSTED МУЗЫКАЛЬНЫЙ СТРИМИНГ · OPEN SOURCE'
                : 'SELF-HOSTED MUSIC STREAMING · OPEN SOURCE'}
            </span>
            <span className="hero-note">
              {lang === 'ru'
                ? 'Открытый исходный код. Без слежки.'
                : 'No ads. No telemetry. Your files.'}
            </span>
          </div>

          <div className="hero-copy">
            <h1>
              {lang === 'ru' ? (
                <>
                  Твоя музыка.<br />
                  <span>Твои правила.</span>
                </>
              ) : (
                <>
                  Your music.<br />
                  <span>Your rules.</span>
                </>
              )}
            </h1>

            <div className="hero-description">
              <p>
                {lang === 'ru' ? (
                  <>
                    Вся твоя аудиоколлекция — в быстром приватном стриминге,
                    <br className="desktop-break" /> который принадлежит тебе.
                  </>
                ) : (
                  <>
                    Transform your audio collection into a fast, private streaming service
                    <br className="desktop-break" /> you truly own.
                  </>
                )}
              </p>
              <p className="muted">
                {lang === 'ru'
                  ? 'Удобный веб-плеер, синхронная лирика, продуманная очередь и поддержка OpenSubsonic API на твоём сервере.'
                  : 'Lightweight web player, time-synced lyrics, clean queue management, and OpenSubsonic API compatibility on your own server.'}
              </p>
              <div className="hero-buttons">
                <a className="button button-white" href="#start">
                  {lang === 'ru' ? 'Запустить TuneCloud' : 'Get TuneCloud'}{' '}
                  <ArrowUpRight size={17} />
                </a>
                <a className="button button-ghost" href="#lyrics">
                  <Play size={15} fill="currentColor" />{' '}
                  {lang === 'ru' ? 'Смотреть демо' : 'Watch Demo'}
                </a>
              </div>
            </div>
          </div>

          <div className="product-stage" id="player">
            <div className="stage-top">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>
                <span className="tiny-dot" />{' '}
                {lang === 'ru' ? 'личный музыкальный сервер' : 'personal music server'}
              </span>
              <span className="stage-version">TUNECLOUD / WEB PLAYER</span>
            </div>

            <div className="stage-screen">
              {view === 1 ? (
                <InlineDemo
                  label={
                    lang === 'ru'
                      ? 'Демо синхронной лирики: Выдох'
                      : 'Synced lyrics demo: Vydokh'
                  }
                  lang={lang}
                />
              ) : (
                <img
                  src={views[view].src}
                  alt={views[view].caption[lang]}
                  fetchPriority="high"
                />
              )}
            </div>

            <div className="stage-bottom">
              <div className="stage-tabs" role="tablist" aria-label="Player preview tabs">
                {views.map((item, i) => (
                  <button
                    key={item.id}
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={i === view}
                    aria-controls="stage-caption"
                    onClick={() => setView(i)}
                  >
                    <item.icon size={15} />
                    <span>{item.label[lang]}</span>
                  </button>
                ))}
              </div>
              <span className="stage-hint">
                <span className="tiny-dot" />{' '}
                {lang === 'ru'
                  ? 'Интерфейс веб-плеера TuneCloud'
                  : 'Interactive web player interface'}
              </span>
            </div>
          </div>

          <div
            className="stage-caption"
            role="tabpanel"
            id="stage-caption"
            aria-labelledby={`tab-${views[view].id}`}
          >
            <strong>{views[view].caption[lang]}</strong>
            <span>{views[view].detail[lang]}</span>
          </div>

          <div className="format-strip">
            <span>
              {lang === 'ru' ? 'ПРЯМОЕ ВОСПРОИЗВЕДЕНИЕ' : 'ORIGINAL AUDIO BITSTREAM'}
            </span>
            <div>
              {['FLAC', 'MP3', 'OGG', 'OPUS', 'M4A', 'WAV'].map((format) => (
                <span key={format}>{format}</span>
              ))}
            </div>
            <span>
              {lang === 'ru' ? '+ совместимые Subsonic-клиенты' : '+ Subsonic-compatible apps'}{' '}
              <ArrowUpRight size={14} />
            </span>
          </div>
        </section>

        {/* 01 — FEATURES */}
        <section className="intro wrap" id="features">
          <div className="section-index">
            {lang === 'ru' ? '01 — ЗАЧЕМ TUNECLOUD' : '01 — WHY TUNECLOUD'}
          </div>
          <div className="intro-grid">
            <h2>
              {lang === 'ru' ? (
                <>
                  Коллекция — твоя.<br />
                  <span>Опыт — как надо.</span>
                </>
              ) : (
                <>
                  Your library.<br />
                  <span>Built to last.</span>
                </>
              )}
            </h2>
            <p>
              {lang === 'ru'
                ? 'Хватит зависеть от коммерческих стримингов, удаляющих альбомы без предупреждения. TuneCloud превращает локальные файлы в современный персональный стриминг.'
                : 'Stop relying on commercial streaming services that remove albums without notice. TuneCloud turns your local files into a modern streaming experience.'}
            </p>
          </div>

          <div className="principles">
            <div>
              <FolderOpen size={23} />
              <h3>
                {lang === 'ru' ? 'Файлы остаются у тебя' : 'Data Stays on Your Hardware'}
              </h3>
              <p>
                {lang === 'ru'
                  ? 'Твоя коллекция живёт на твоём сервере. TuneCloud сканирует её и создаёт удобную библиотеку, не меняя структуру папок.'
                  : 'Audio files live on your own storage. TuneCloud indexes metadata and delivers fast playback without altering your directory structure.'}
              </p>
            </div>
            <div>
              <SlidersHorizontal size={23} />
              <h3>
                {lang === 'ru' ? 'Контроль в каждом клике' : 'Precision Playback Controls'}
              </h3>
              <p>
                {lang === 'ru'
                  ? 'Гибкая очередь, выделение треков через Shift/Ctrl, редактирование тегов и контекстные действия по правому клику.'
                  : 'Build queues, batch-select tracks with Shift/Ctrl, edit tags, and manage playlists. Everything is responsive and right where you expect.'}
              </p>
            </div>
            <div>
              <Github size={23} />
              <h3>
                {lang === 'ru' ? 'Открыто по-настоящему' : '100% Free & Open Source'}
              </h3>
              <p>
                {lang === 'ru'
                  ? 'Чистый код, готовые образы Docker и GitOps-манифесты. Полный контроль, открытый исходный код и свобода от подписок.'
                  : 'Clean codebase, containerized Docker deployments, and GitOps configurations. Inspect, audit, and modify any component.'}
              </p>
            </div>
          </div>
        </section>

        {/* 02 — LYRICS */}
        <section className="lyrics-feature wrap" id="lyrics">
          <div className="section-index">
            {lang === 'ru' ? '02 — ПОПАСТЬ В МОМЕНТ' : '02 — TIME-SYNCED LYRICS'}
          </div>
          <div className="feature-heading">
            <div>
              <h2>
                {lang === 'ru' ? (
                  <>
                    Не просто слушай.<br />
                    <span>Знай каждую строчку.</span>
                  </>
                ) : (
                  <>
                    Don&apos;t just listen.<br />
                    <span>Follow every line.</span>
                  </>
                )}
              </h2>
            </div>
            <p>
              {lang === 'ru'
                ? 'Синхронный текст следует за треком. Плавная подсветка, фокус на активной строке и переход к нужному моменту одним нажатием.'
                : 'Real-time synchronized scrolling lyrics with active line focus and direct seek to any verse with a single click.'}
            </p>
          </div>

          <div className="lyrics-cinema">
            <InlineDemo
              label={
                lang === 'ru'
                  ? 'Выдох — демонстрация синхронных текстов'
                  : 'Synced lyrics demo: Vydokh'
              }
              lang={lang}
            />
            <div className="cinema-credit">
              <AudioLines size={15} />
              <span>«Выдох» · OG Buda, 163ONMYNECK, Yanix</span>
              <span>
                {lang === 'ru' ? 'ЗАПИСАНО В TUNECLOUD' : 'CAPTURED IN TUNECLOUD'}
              </span>
            </div>
          </div>

          <div className="feature-footnotes">
            <span>
              <Check size={14} />{' '}
              {lang === 'ru' ? 'Локальные и встроенные тексты' : 'Embedded & local .lrc lyrics'}
            </span>
            <span>
              <Check size={14} />{' '}
              {lang === 'ru' ? 'lrc.red и LRCLIB' : 'lrc.red & LRCLIB providers'}
            </span>
            <span>
              <Check size={14} />{' '}
              {lang === 'ru' ? 'Переход по строке' : 'Seek by line click'}
            </span>
            <span>
              <Check size={14} />{' '}
              {lang === 'ru' ? 'Цвета твоей обложки' : 'Cover-matched ambient colors'}
            </span>
          </div>
        </section>

        {/* 03 — QUEUE */}
        <section className="control-feature wrap">
          <div className="control-copy">
            <div className="section-index">
              {lang === 'ru' ? '03 — УПРАВЛЕНИЕ ОЧЕРЕДЬЮ' : '03 — QUEUE & PLAYBACK'}
            </div>
            <h2>
              {lang === 'ru' ? (
                <>
                  Хорошая очередь.<br />
                  <span>Никакого хаоса.</span>
                </>
              ) : (
                <>
                  Clean queue.<br />
                  <span>Zero clutter.</span>
                </>
              )}
            </h2>
            <p>
              {lang === 'ru'
                ? 'Поставь нужное следующим, перетащи лишнее вниз или начни с чистого листа. Очередь — часть твоего прослушивания, а не отдельная головоломка.'
                : 'Queue tracks next, drag items to reorder, or clear the list with one click. The queue adapts to your flow, not the other way around.'}
            </p>
            <ul className="clean-list">
              <li>
                <ListMusic size={17} />
                <span>
                  {lang === 'ru'
                    ? 'Перетаскивание и управление с клавиатуры'
                    : 'Drag & drop reordering and keyboard navigation'}
                </span>
              </li>
              <li>
                <Music2 size={17} />
                <span>
                  {lang === 'ru'
                    ? 'Двойной клик, ПКМ и переход к артисту'
                    : 'Double-click to play, right-click menu, quick artist jump'}
                </span>
              </li>
              <li>
                <Heart size={17} />
                <span>
                  {lang === 'ru'
                    ? 'Сохранение всей очереди в плейлист'
                    : 'Save current active queue into a playlist'}
                </span>
              </li>
            </ul>
            <a className="text-link" href={`${REPO}#features`} target="_blank" rel="noreferrer">
              {lang === 'ru' ? 'Всё о возможностях' : 'Explore all features'}{' '}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="queue-visual">
            <img
              src="/media/queue-panel.webp"
              alt={lang === 'ru' ? 'Очередь TuneCloud' : 'TuneCloud queue interface'}
              loading="lazy"
            />
            <div className="keyboard-note">
              <kbd>Ctrl</kbd>
              <span>+</span>
              <kbd>Shift</kbd>
              <span>
                {lang === 'ru' ? 'Меньше кликов. Больше музыки.' : 'Fewer clicks. More music.'}
              </span>
            </div>
          </div>
        </section>

        {/* 04 — CAPABILITIES */}
        <section className="capabilities wrap">
          <div className="section-index">
            {lang === 'ru' ? '04 — ВОЗМОЖНОСТИ ПЛЕЕРА' : '04 — CAPABILITIES'}
          </div>
          <div className="feature-heading">
            <h2>
              {lang === 'ru' ? (
                <>
                  Всё, что нужно.<br />
                  <span>Без лишнего шума.</span>
                </>
              ) : (
                <>
                  Everything you need.<br />
                  <span>Nothing in your way.</span>
                </>
              )}
            </h2>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article key={item.title[lang]}>
                <item.icon size={23} strokeWidth={1.5} />
                <h3>{item.title[lang]}</h3>
                <p>{item.text[lang]}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 05 — MOBILE & SUBSONIC */}
        <section className="mobile-feature">
          <div className="wrap mobile-inner">
            <div className="mobile-copy">
              <div className="section-index">
                {lang === 'ru' ? '05 — ЗА ПРЕДЕЛАМИ ДЕСКТОПА' : '05 — BEYOND THE DESKTOP'}
              </div>
              <h2>
                {lang === 'ru' ? (
                  <>
                    Тот же вайб.<br />
                    <span>На другом экране.</span>
                  </>
                ) : (
                  <>
                    The same vibe.<br />
                    <span>On any screen.</span>
                  </>
                )}
              </h2>
              <p>
                {lang === 'ru'
                  ? 'Полноценный мобильный веб-плеер с большой обложкой, лирикой и понятным управлением. А если у тебя уже есть любимый Subsonic-клиент — подключай его к TuneCloud.'
                  : 'A responsive mobile web player with full artwork, synchronized lyrics, and smooth touch controls. Prefer a native mobile app? Connect your favorite Subsonic client.'}
              </p>
              <div className="phone-tabs" role="group" aria-label="Mobile preview">
                <button
                  aria-pressed={phone === 'namida'}
                  onClick={() => setPhone('namida')}
                >
                  Namida <ArrowUpRight size={12} />
                </button>
                <button
                  aria-pressed={phone === 'web'}
                  onClick={() => setPhone('web')}
                >
                  {lang === 'ru' ? 'Веб-плеер TuneCloud' : 'TuneCloud Web Player'}
                </button>
              </div>
              <div className="connection-tags">
                <span>
                  <Smartphone size={16} />{' '}
                  {lang === 'ru' ? 'Мобильный веб' : 'Mobile Web Player'}
                </span>
                <span>
                  <Radio size={16} /> OpenSubsonic API
                </span>
              </div>
              <p className="small-muted">
                {lang === 'ru'
                  ? 'Один адрес сервера и тот же аккаунт. Совместимость отдельных функций зависит от клиента.'
                  : 'Single server address and account credentials. Feature support may vary by client.'}
              </p>
            </div>

            <div className="phone-scene">
              <div className="phone-glow" />
              <div className="phone-frame">
                <img
                  src={phone === 'namida' ? '/media/namida.webp' : '/media/mobile.webp'}
                  alt={
                    phone === 'namida'
                      ? lang === 'ru'
                        ? 'Namida — мобильный OpenSubsonic-клиент с коллекцией TuneCloud'
                        : 'Namida mobile Subsonic client connected to TuneCloud'
                      : lang === 'ru'
                        ? 'Мобильный веб-плеер TuneCloud'
                        : 'TuneCloud mobile web player'
                  }
                  loading="lazy"
                />
              </div>
              <span className="phone-side-label">
                {phone === 'namida'
                  ? 'NAMIDA · OPENSUBSONIC CLIENT'
                  : 'TUNECLOUD · MOBILE WEB'}
              </span>
            </div>
          </div>
        </section>

        {/* 06 — INFRASTRUCTURE */}
        <section className="infrastructure wrap">
          <div className="section-index">
            {lang === 'ru'
              ? '06 — ИНФРАСТРУКТУРА И ДЕПЛОЙ'
              : '06 — INFRASTRUCTURE & GITOPS'}
          </div>
          <div className="feature-heading">
            <h2>
              {lang === 'ru' ? (
                <>
                  За кнопкой Play —<br />
                  <span>настоящая инженерия.</span>
                </>
              ) : (
                <>
                  Engineered for<br />
                  <span>real-world self-hosting.</span>
                </>
              )}
            </h2>
            <p>
              {lang === 'ru'
                ? 'TuneCloud — ещё и DevOps-проект с полным циклом доставки. От проверки кода до контейнеров, GitOps и наблюдаемости.'
                : 'TuneCloud is built with production-grade DevOps practices: automated CI/CD pipelines, containerization, GitOps workflows, and full observability.'}
            </p>
          </div>

          <div className="infra-track">
            {infraItems.map((item, i) => (
              <div key={item.title}>
                <span className="infra-number">0{i + 1}</span>
                <item.icon size={23} />
                <h3>{item.title}</h3>
                <p>{item.text[lang]}</p>
                {i < 3 && <ArrowRight className="infra-arrow" size={17} />}
              </div>
            ))}
          </div>

          <a
            className="text-link"
            href="https://github.com/skippingclass/TuneCloud-GitOps"
            target="_blank"
            rel="noreferrer"
          >
            {lang === 'ru' ? 'Посмотреть инфраструктуру' : 'View GitOps infrastructure repository'}{' '}
            <ArrowUpRight size={16} />
          </a>
        </section>

        {/* 07 — QUICKSTART */}
        <section className="start-section wrap" id="start">
          <div className="section-index">
            {lang === 'ru' ? '07 — БЫСТРЫЙ СТАРТ' : '07 — QUICKSTART SETUP'}
          </div>
          <div className="feature-heading">
            <h2>
              {lang === 'ru' ? (
                <>
                  Твой сервер.<br />
                  <span>Твой новый стриминг.</span>
                </>
              ) : (
                <>
                  Your server.<br />
                  <span>Up in minutes.</span>
                </>
              )}
            </h2>
            <p>
              {lang === 'ru'
                ? 'Нужны Docker Compose и папка с музыкой. Исходники открыты — начни с локальной установки или разверни свой сервер.'
                : 'All you need is Docker Compose and your music directory. Fully open source — host at home on a NAS or on any cloud VPS.'}
            </p>
          </div>

          <div className="setup-grid">
            <div className="setup-steps" role="tablist" aria-label="Setup steps">
              {steps.map((item, i) => (
                <button
                  key={item.name[lang]}
                  role="tab"
                  aria-selected={step === i}
                  aria-controls="setup-code"
                  onClick={() => {
                    setStep(i);
                    setCopied(false);
                    setCopyError(false);
                  }}
                >
                  <span>0{i + 1}</span>
                  <div>
                    <strong>{item.name[lang]}</strong>
                    <p>{item.text[lang]}</p>
                  </div>
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>

            <div className="terminal-card" id="setup-code" role="tabpanel">
              <div className="terminal-top">
                <span>
                  <Terminal size={15} /> QUICKSTART
                </span>
                <button
                  onClick={copy}
                  aria-label={
                    copied
                      ? lang === 'ru'
                        ? 'Скопировано'
                        : 'Copied'
                      : lang === 'ru'
                        ? 'Скопировать команды'
                        : 'Copy commands'
                  }
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}{' '}
                  {copied
                    ? lang === 'ru'
                      ? 'Скопировано'
                      : 'Copied'
                    : lang === 'ru'
                      ? 'Копировать'
                      : 'Copy'}
                </button>
              </div>

              <div className="terminal-content">
                <span className="terminal-label">{steps[step].label[lang]}</span>
                <pre>
                  <code>{steps[step].code}</code>
                </pre>
                {copyError && (
                  <p role="alert">
                    {lang === 'ru'
                      ? 'Не удалось скопировать — выдели команды вручную.'
                      : 'Failed to copy. Please select commands manually.'}
                  </p>
                )}
              </div>

              <a href={`${REPO}#quickstart`} target="_blank" rel="noreferrer">
                {lang === 'ru'
                  ? 'Полная инструкция и настройка'
                  : 'Complete documentation & configuration guide'}{' '}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* 08 — FAQ */}
        <section className="faq wrap" id="faq">
          <div>
            <div className="section-index">
              {lang === 'ru' ? 'ВОПРОСЫ И ОТВЕТЫ' : 'FREQUENTLY ASKED QUESTIONS'}
            </div>
            <h2>{lang === 'ru' ? 'Без загадок.' : 'Questions & Answers.'}</h2>
          </div>

          <div className="faq-items">
            {faqItems.map((item) => (
              <details key={item.q[lang]}>
                <summary>
                  {item.q[lang]}
                  <ChevronDown size={18} />
                </summary>
                <p>{item.a[lang]}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta wrap">
          <span className="eyebrow">
            <Headphones size={15} />{' '}
            {lang === 'ru' ? 'ТВОЙ СЕРВЕР — ТВОЙ СТРИМИНГ' : 'SELF-HOSTED & OPEN SOURCE'}
          </span>
          <h2>
            {lang === 'ru' ? (
              <>
                Хорошая музыка<br />
                заслуживает <span>хорошего дома.</span>
              </>
            ) : (
              <>
                Take control of<br />
                <span>your music library.</span>
              </>
            )}
          </h2>
          <p>
            {lang === 'ru'
              ? 'Он уже есть. Осталось принести свою коллекцию.'
              : 'Self-host TuneCloud in minutes and stream your collection on your terms.'}
          </p>
          <div>
            <a className="button button-white" href={REPO} target="_blank" rel="noreferrer">
              <Github size={18} />{' '}
              {lang === 'ru' ? 'Забрать на GitHub' : 'Star on GitHub'}{' '}
              <ArrowUpRight size={17} />
            </a>
            <a
              className="button button-ghost"
              href="https://tune.realgeek.ru"
              target="_blank"
              rel="noreferrer"
            >
              {lang === 'ru' ? 'Открыть приложение' : 'Open Web App'}{' '}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer wrap">
        <a href="#">
          <Brand />
        </a>
        <p>{lang === 'ru' ? 'Твоя музыка. Твои правила.' : 'Your music. Your rules.'}</p>
        <div>
          <a href={REPO} target="_blank" rel="noreferrer">
            {lang === 'ru' ? 'Исходники' : 'Source code'} <ArrowUpRight size={13} />
          </a>
          <a href={`${REPO}/issues`} target="_blank" rel="noreferrer">
            {lang === 'ru' ? 'Предложить идею' : 'Issues & Requests'} <ArrowUpRight size={13} />
          </a>
        </div>
        <small>
          {lang === 'ru'
            ? 'Обложки и тексты принадлежат их авторам. Интерфейс и демо — TuneCloud.'
            : 'Album artwork and lyrics belong to their respective authors. Interface and demo belong to TuneCloud.'}
        </small>
      </footer>
    </>
  );
}
