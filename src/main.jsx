import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Bell, Bookmark, Check, ChevronDown, Heart, Link, Menu, MessageCircle, Play, Plus, Search, Send, Sparkles, Users, Video, X } from 'lucide-react';
import './styles.css';

const members = [
  { name: 'Лера Ким', role: 'режиссёр', initials: 'ЛК', color: 'coral' },
  { name: 'Миша Волков', role: 'видеоблогер', initials: 'МВ', color: 'blue' },
  { name: 'Аня Мороз', role: 'сценарист', initials: 'АМ', color: 'lime' },
  { name: 'Саша Рэй', role: 'фотограф', initials: 'СР', color: 'violet' },
];

const initialComments = [
  { name: 'Аня Мороз', text: 'Какой живой ритм! Особенно понравился переход на 02:14 ✨', time: '12 мин', initials: 'АМ', color: 'lime' },
  { name: 'Миша Волков', text: 'Свет в последней сцене — отдельная любовь. Расскажешь, как снимала?', time: '8 мин', initials: 'МВ', color: 'blue' },
];

const featureImage = `${import.meta.env.BASE_URL}rutube-feature.jpg`;

function Avatar({ initials, color='coral', small=false }) {
  return <div className={`avatar ${color} ${small ? 'small' : ''}`}>{initials}</div>;
}

function App() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [comment, setComment] = useState('');
  const [showJoin, setShowJoin] = useState(false);
  const [joined, setJoined] = useState(false);
  const [menu, setMenu] = useState(false);
  const [playing, setPlaying] = useState(false);

  const addComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([...comments, { name: 'Вы', text: comment.trim(), time: 'сейчас', initials: 'ВЫ', color: 'violet' }]);
    setComment('');
  };

  const join = (e) => {
    e.preventDefault();
    setJoined(true);
    setTimeout(() => setShowJoin(false), 900);
  };

  return (
    <div className="app">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="logo" href="#top" aria-label="АВТОРЫ"><span>АВТО</span><i>РЫ</i><b>•</b></a>
          <div className={`nav-links ${menu ? 'open' : ''}`}>
            <a href="#community" onClick={() => setMenu(false)}>Сообщество</a>
            <a href="#video" onClick={() => setMenu(false)}>Смотреть</a>
            <a href="#how" onClick={() => setMenu(false)}>Как это работает</a>
          </div>
          <div className="nav-actions">
            <button className="icon-btn hide-mobile" aria-label="Уведомления"><Bell size={19}/><span className="dot" /></button>
            <button className="login hide-mobile">Войти</button>
            <button className="primary small-btn" onClick={() => setShowJoin(true)}>Стать автором <ArrowUpRight size={17}/></button>
            <button className="menu-btn" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15}/> Место, где идеи находят своих</div>
            <h1>Создавай.<br/><span>Показывай.</span><br/>Обсуждай.</h1>
            <p>Пространство для авторов, где видео становятся поводом для настоящего разговора.</p>
            <div className="hero-buttons">
              <button className="primary large" onClick={() => setShowJoin(true)}>Присоединиться <ArrowUpRight size={20}/></button>
              <a className="watch-link" href="#video"><span><Play fill="currentColor" size={16}/></span> Смотреть новое</a>
            </div>
            <div className="social-proof">
              <div className="avatar-stack">
                {members.slice(0,4).map((m, i) => <Avatar key={m.name} {...m} small />)}
              </div>
              <div><strong>2 800+ авторов</strong><small>уже делятся идеями</small></div>
            </div>
          </div>

          <div className="hero-art" aria-label="Творческое сообщество">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-card card-chat">
              <div className="mini-row"><Avatar initials="СР" color="violet" small/><span><b>Саша Рэй</b><small>только что</small></span></div>
              <p>Ребята, новый ролик уже в ленте! Жду честный фидбэк 🙌</p>
              <div className="reaction">🔥 <span>12</span></div>
            </div>
            <div className="art-card card-video">
              <img src={featureImage} alt="Кадр городского видео"/>
              <span className="duration">06:48</span>
              <div className="tiny-play"><Play fill="currentColor" size={18}/></div>
            </div>
            <div className="art-card card-stats"><Heart fill="currentColor"/><b>+128</b><small>сегодня</small></div>
            <div className="yellow-shape"><span>СМОТРИ</span><Play fill="#171716" /></div>
            <div className="blue-shape">&</div>
            <div className="scribble">↝</div>
          </div>
        </section>

        <section className="marquee" aria-hidden="true"><div>ИДЕИ <span>✦</span> ЛЮДИ <span>✦</span> ВИДЕО <span>✦</span> ОБЩЕНИЕ <span>✦</span> ИДЕИ <span>✦</span> ЛЮДИ <span>✦</span> ВИДЕО</div></section>

        <section className="community container" id="community">
          <div className="section-heading">
            <div><div className="section-number">01 / СООБЩЕСТВО</div><h2>Не просто подписчики.<br/><em>Твои люди.</em></h2></div>
            <p>Общайся напрямую, находи соавторов и собирай вокруг своих идей живое сообщество.</p>
          </div>
          <div className="people-grid">
            {members.map((m, i) => (
              <article className={`person-card person-${i}`} key={m.name}>
                <div className="person-top"><span className="online"/><button aria-label="Открыть профиль"><ArrowUpRight/></button></div>
                <Avatar {...m}/>
                <h3>{m.name}</h3><p>{m.role}</p>
                <div className="tags"><span>{['Кино','Образование','Истории','Город'][i]}</span><span>{['Монтаж','Технологии','Фото','Культура'][i]}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="video-section" id="video">
          <div className="container">
            <div className="section-heading light">
              <div><div className="section-number">02 / СЕЙЧАС СМОТРЯТ</div><h2>Один ролик —<br/><em>десятки мыслей.</em></h2></div>
              <a href="https://rutube.ru" target="_blank" rel="noreferrer">Все видео <ArrowUpRight size={18}/></a>
            </div>
            <div className="watch-grid">
              <div>
                <div className={`video-player ${playing ? 'playing' : ''}`}>
                  <img src={featureImage} alt="Обложка видео «Город говорит»"/>
                  {!playing ? <button className="main-play" onClick={() => setPlaying(true)} aria-label="Воспроизвести"><Play fill="currentColor"/></button> : <div className="playing-note"><span className="pulse"/> Просмотр на Rutube <a href="https://rutube.ru" target="_blank" rel="noreferrer">открыть видео</a></div>}
                  <div className="rutube-badge">RUTUBE</div><span className="video-time">12:36</span>
                </div>
                <div className="video-meta">
                  <div className="author-line"><Avatar initials="ЛК" color="coral" small/><span><b>Лера Ким</b><small>вчера в 19:40</small></span></div>
                  <div className="video-actions">
                    <button className={liked ? 'active' : ''} onClick={() => setLiked(!liked)}><Heart size={19} fill={liked ? 'currentColor' : 'none'}/>{128 + (liked ? 1 : 0)}</button>
                    <button><MessageCircle size={19}/>{comments.length}</button>
                    <button className={saved ? 'active' : ''} onClick={() => setSaved(!saved)}><Bookmark size={19} fill={saved ? 'currentColor' : 'none'}/></button>
                  </div>
                </div>
                <h3 className="video-title">Город говорит: люди, которые меняют районы</h3>
                <p className="video-desc">Истории тех, кто превращает обычные дворы в места, где хочется оставаться.</p>
              </div>

              <aside className="comments-panel">
                <div className="comments-head"><div><MessageCircle size={19}/><b>Обсуждение</b></div><span>{comments.length + 22}</span></div>
                <div className="comments-list">
                  {comments.map((c, i) => <div className="comment" key={i}><Avatar initials={c.initials} color={c.color} small/><div><div><b>{c.name}</b><small>{c.time}</small></div><p>{c.text}</p><button>Ответить</button></div></div>)}
                </div>
                <form className="comment-form" onSubmit={addComment}>
                  <Avatar initials="ВЫ" color="violet" small/>
                  <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Добавить комментарий..." aria-label="Комментарий"/>
                  <button type="submit" aria-label="Отправить"><Send size={18}/></button>
                </form>
              </aside>
            </div>
          </div>
        </section>

        <section className="how container" id="how">
          <div className="section-heading">
            <div><div className="section-number">03 / ВСЁ ПРОСТО</div><h2>Три шага.<br/><em>И ты в эфире.</em></h2></div>
          </div>
          <div className="steps">
            <article><span>01</span><div className="step-icon coral-bg"><Users/></div><h3>Создай профиль</h3><p>Расскажи, что делаешь, и найди близких по духу авторов.</p></article>
            <article><span>02</span><div className="step-icon yellow-bg"><Link/></div><h3>Добавь видео</h3><p>Поделись ссылкой на свой ролик с Rutube — без сложных загрузок.</p></article>
            <article><span>03</span><div className="step-icon blue-bg"><MessageCircle/></div><h3>Начни разговор</h3><p>Получай реакции, обсуждай детали и создавай новое вместе.</p></article>
          </div>
        </section>

        <section className="cta container">
          <div className="cta-inner">
            <div className="cta-spark">✦</div><div className="cta-bubble">💬</div>
            <p>ТВОЯ ИДЕЯ УЖЕ ГОТОВА</p><h2>Покажи её <i>своим.</i></h2>
            <button className="dark-button" onClick={() => setShowJoin(true)}>Создать профиль <ArrowUpRight/></button>
            <small>Бесплатно. Без рекламы. По-настоящему.</small>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <a className="logo" href="#top"><span>АВТО</span><i>РЫ</i><b>•</b></a>
        <p>Место для тех, кому есть что сказать.</p>
        <div><a href="#community">Сообщество</a><a href="#video">Видео</a><a href="#how">О проекте</a></div>
        <small>© 2026 АВТОРЫ</small>
      </footer>

      {showJoin && <div className="modal-backdrop" onMouseDown={() => setShowJoin(false)}>
        <div className="modal" onMouseDown={e => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowJoin(false)}><X/></button>
          {joined ? <div className="success"><div><Check/></div><h3>Ты с нами!</h3><p>Проверь почту — мы отправили ссылку для входа.</p></div> : <>
            <div className="eyebrow"><Sparkles size={14}/> Присоединиться</div><h3>Добро пожаловать<br/>в круг авторов</h3><p>Один шаг — и можно делиться, смотреть и обсуждать.</p>
            <form onSubmit={join}><label>Как тебя зовут?<input required placeholder="Например, Настя"/></label><label>Твоя почта<input required type="email" placeholder="hello@example.ru"/></label><button className="primary large" type="submit">Создать профиль <ArrowUpRight/></button></form>
          </>}
        </div>
      </div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
