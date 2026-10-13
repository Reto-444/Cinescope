/* =========================================================
   CineScope — script.js
   Структура:
   1. Данные о фильмах
   2. Состояние приложения
   3. Утилиты
   4. LocalStorage
   5. Логика фильтрации и сортировки
   6. Рендеринг: карточки, каталог, избранное, жанры, селекты
   7. Модальное окно
   8. Избранное
   9. Toast
   10. События
   11. Инициализация
   ========================================================= */

(() => {
  'use strict';

  /* ---------- 1. Данные ---------- */
  // Рейтинги помечены как «Рейтинг CineScope» — это условные демонстрационные значения.
  const MOVIES = [
    {
      id: 'city-after-midnight',
      title: 'Город после полуночи',
      year: 2025,
      genres: ['Триллер', 'Нуар'],
      rating: 8.7,
      popularity: 98,
      duration: 128,
      director: 'Демонстрационный режиссёр',
      description: 'Ночной мегаполис, где каждый перекрёсток хранит чужую тайну. Частный детектив берётся за дело об исчезновении и обнаруживает, что город сам ведёт его к разгадке.',
      fullDescription: 'Демонстрационный фильм проекта CineScope. По сюжету, детектив с безупречной репутацией берётся за исчезновение, которое, как ему кажется, имеет простое объяснение. Но чем глубже он погружается в ночной город, тем яснее понимает: разгадка не в деле, а в нём самом. Мрачная неоновая атмосфера, живая камера и тихий саундтрек создают нуар нового десятилетия.',
      poster: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'interstellar',
      title: 'Интерстеллар',
      year: 2014,
      genres: ['Фантастика', 'Драма', 'Приключения'],
      rating: 9.0,
      popularity: 96,
      duration: 169,
      director: 'Кристофер Нолан',
      description: 'Команда исследователей отправляется сквозь червоточину в поисках нового дома для человечества.',
      fullDescription: 'Земля на грани выживания: пыльные бури, голод и необратимые изменения климата. Бывший пилот НАСА соглашается на отчаянную миссию — пройти сквозь червоточину у Сатурна и найти планету, пригодную для жизни. Но чем дальше уходит экспедиция, тем выше цена времени.',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
    },
    {
      id: 'inception',
      title: 'Начало',
      year: 2010,
      genres: ['Фантастика', 'Триллер', 'Боевик'],
      rating: 8.8,
      popularity: 95,
      duration: 148,
      director: 'Кристофер Нолан',
      description: 'Профессиональный вор умеет красть идеи из снов. Теперь ему заказали нечто невозможное — внедрение.',
      fullDescription: 'Доминик Кобб — специалист по извлечению секретов из глубин подсознания. Его нанимают для последнего дела: не украсть идею, а наоборот — внедрить её в разум наследника корпорации. Чтобы выполнить задание, команде придётся погружаться в сон внутри сна, где реальность становится самой опасной иллюзией.',
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
    },
    {
      id: 'dune-2',
      title: 'Дюна: Часть вторая',
      year: 2024,
      genres: ['Фантастика', 'Приключения', 'Драма'],
      rating: 8.9,
      popularity: 94,
      duration: 166,
      director: 'Дени Вильнёв',
      description: 'Пол Атрейдес объединяется с фременами, чтобы отомстить за семью и изменить судьбу Арракиса.',
      fullDescription: 'Пол Атрейдес идёт по пути пророчества, впитывая обычаи фременов и учась управлять песками Арракиса. Но месть дому Харконненов сталкивает его с выбором, который решит судьбу всей галактики. Эпическая сага о власти, вере и цене предвидения.',
      poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg'
    },
    {
      id: 'blade-runner-2049',
      title: 'Бегущий по лезвию 2049',
      year: 2017,
      genres: ['Фантастика', 'Драма', 'Триллер'],
      rating: 8.4,
      popularity: 88,
      duration: 164,
      director: 'Дени Вильнёв',
      description: 'Офицер Кейд раскрывает тайну, способную разрушить хрупкое равновесие между людьми и репликантами.',
      fullDescription: 'Спустя десятилетия после событий оригинала Лос-Анджелес утопает в тумане и голограммах. Офицер Кейд, сам того не желая, находит след давно забытого дела — и вместе с ним вопрос, который официально запрещён: где граница между человеком и машиной.',
      poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg'
    },
    {
      id: 'parasite',
      title: 'Паразиты',
      year: 2019,
      genres: ['Триллер', 'Драма', 'Криминал'],
      rating: 8.8,
      popularity: 91,
      duration: 132,
      director: 'Пон Джун Хо',
      description: 'Бедная семья хитростью проникает в дом богатых. Идеальный план рушится в одну ночь.',
      fullDescription: 'Семья Кимур постепенно втирается в доверие к богатой семье Пак, занимая одно место за другим. Пока всё выглядит как идеальная работа, но за фасадом респектабельного дома скрывается нечто, что превратит их авантюру в трагедию.',
      poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'
    },
    {
      id: 'whiplash',
      title: 'Одержимость',
      year: 2014,
      genres: ['Драма'],
      rating: 8.6,
      popularity: 82,
      duration: 107,
      director: 'Дэмьен Шазелл',
      description: 'Молодой барабанщик попадает к наставнику, чей метод — довести студента до предела.',
      fullDescription: 'Эндрю мечтает стать великим джазовым барабанщиком. Его зачисляют в лучшую консерваторию, где его ведёт Флетчер — дирижёр, уверенный, что гениальность рождается только из боли. Столкновение двух одержимостей превращается в дуэль без права на ошибку.',
      poster: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg'
    },
    {
      id: 'shawshank',
      title: 'Побег из Шоушенка',
      year: 1994,
      genres: ['Драма', 'Криминал'],
      rating: 9.3,
      popularity: 97,
      duration: 142,
      director: 'Фрэнк Дарабонт',
      description: 'Банкир, осуждённый за чужое преступление, находит способ сохранить себя и вырваться на свободу.',
      fullDescription: 'Энди Дюфрейн приговорён к двум пожизненным за убийство, которого не совершал. В стенах Шоушенка он учится выживать, заводит дружбу с человеком по имени Ред и год за годом методично готовит побег, доказывая: надежда — самое сильное оружие.',
      poster: 'https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg'
    },
    {
      id: 'pulp-fiction',
      title: 'Криминальное чтиво',
      year: 1994,
      genres: ['Криминал', 'Драма'],
      rating: 8.9,
      popularity: 90,
      duration: 154,
      director: 'Квентин Тарантино',
      description: 'Несколько историй гангстеров, боксёра и пары грабителей переплетаются в один нелинейный клубок.',
      fullDescription: 'Лос-Анджелес, начало девяностых. Два киллера, боксёр, жена босса и пара мелких бандитов существуют в одной вселенной, где случайности связывают их судьбы. Диалоги, музыка и нелинейный монтаж сделали этот фильм манифестом независимого кино.',
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
    },
    {
      id: 'matrix',
      title: 'Матрица',
      year: 1999,
      genres: ['Фантастика', 'Боевик'],
      rating: 8.7,
      popularity: 93,
      duration: 136,
      director: 'Лана и Лилли Вачовски',
      description: 'Хакер узнаёт, что привычный мир — симуляция, а он — избранный, способный её сломать.',
      fullDescription: 'Нео получает предложение от загадочного Морфеуса: узнать правду. Красная таблетка открывает ему реальность — человечество порабощено машинами, а повседневность — лишь цифровая тюрьма. Теперь ему предстоит стать тем, кто перезапустит систему.',
      poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
    },
    {
      id: 'edge-of-tomorrow',
      title: 'Грань будущего',
      year: 2014,
      genres: ['Фантастика', 'Боевик', 'Приключения'],
      rating: 8.1,
      popularity: 78,
      duration: 113,
      director: 'Даг Лайман',
      description: 'Майор, погибший в первом бою, застревает во временной петле и получает шанс изменить исход войны.',
      fullDescription: 'Земля атакована пришельцами. Офицер без боевого опыта случайно оказывается на передовой и погибает в первой же стычке — но просыпается в начале того же дня. Каждая смерть даёт ему новый опыт, а вместе с ним — всё больше шансов добраться до ядра противника.',
      poster: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg'
    },
    {
      id: 'arrival',
      title: 'Прибытие',
      year: 2016,
      genres: ['Фантастика', 'Драма', 'Триллер'],
      rating: 8.2,
      popularity: 80,
      duration: 116,
      director: 'Дени Вильнёв',
      description: 'Лингвист пытается понять язык пришельцев и заодно меняет собственное восприятие времени.',
      fullDescription: 'Над Землёй зависли двенадцать кораблей. Пока военные готовятся к худшему, к одной из групп приставляют лингвиста Луизу Бэнкс. Расшифровывая чужой язык, она начинает воспринимать время иначе — и понимает, что ответ пришельцев касается не будущего, а её самой.',
      poster: 'https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg'
    },
    {
      id: 'mad-max-fury-road',
      title: 'Безумный Макс: Дорога ярости',
      year: 2015,
      genres: ['Боевик', 'Приключения', 'Фантастика'],
      rating: 8.1,
      popularity: 84,
      duration: 120,
      director: 'Джордж Миллер',
      description: 'В постапокалиптической пустоши Макс помогает мятежнице и её отряду бежать от тирании.',
      fullDescription: 'Мир превратился в пустыню, бензин — в валюту, а вода — в оружие. Макс попадает в плен к культу Несмертного Джо и случайно оказывается в центре побега Фуриозы. Два дня безумной погони, где шум, скорость и ярость важнее слов.',
      poster: 'https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg'
    },
    {
      id: 'social-network',
      title: 'Социальная сеть',
      year: 2010,
      genres: ['Драма'],
      rating: 8.0,
      popularity: 76,
      duration: 120,
      director: 'Дэвид Финчер',
      description: 'История создания крупнейшей соцсети — как дружба превратилась в судебные иски.',
      fullDescription: 'Гарвард, 2003 год. Студент Марк Цукерберг в ночь создаёт сайт, который изменит интернет. Вскоре к нему приходят инвестиции, а вместе с ними — иски от тех, кто был рядом в самом начале. История о том, что бывает, когда гений оказывается слишком быстрым.',
      poster: 'https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg'
    },
    {
      id: 'shutter-island',
      title: 'Остров проклятых',
      year: 2010,
      genres: ['Триллер', 'Драма', 'Детектив'],
      rating: 8.2,
      popularity: 82,
      duration: 138,
      director: 'Мартин Скорсезе',
      description: 'Маршалы расследуют исчезновение пациентки из клиники на изолированном острове.',
      fullDescription: '1954 год. Двое федеральных маршалов прибывают в лечебницу для душевнобольных преступников на острове Шаттер. Один из пациентов исчез, и расследование уводит героя в лабиринт собственных воспоминаний, где правда может оказаться разрушительной.',
      poster: 'https://image.tmdb.org/t/p/w500/k93J0MmRru4TQ3DtiJ5KXt6tMyp.jpg'
    },
    {
      id: 'gran-torino',
      title: 'Гран Торино',
      year: 2008,
      genres: ['Драма'],
      rating: 8.1,
      popularity: 72,
      duration: 116,
      director: 'Клинт Иствуд',
      description: 'Ворчливый ветеран неожиданно берёт под защиту соседскую семью иммигрантов.',
      fullDescription: 'Уолт Ковальски — ветеран войны и хозяин старого «Гран Торино». После смерти жены он всё чаще остаётся один на один с прошлым. Знакомство с соседскими детьми-иммигрантами медленно возвращает его к людям — и к решению, которое изменит не только его жизнь.',
      poster: 'https://image.tmdb.org/t/p/w500/o4pb8yHkWnJAsZ7JpRBBEPXPg7h.jpg'
    },
    {
      id: '1917',
      title: '1917',
      year: 2019,
      genres: ['Драма', 'Боевик'],
      rating: 8.3,
      popularity: 85,
      duration: 119,
      director: 'Сэм Мендес',
      description: 'Двое солдат должны пересечь линию фронта, чтобы доставить приказ и спасти 1600 человек.',
      fullDescription: 'Первая мировая. Двум молодым солдатам поручают невозможное: пересечь ничейную землю и доставить приказ об отмене атаки. Один непрерывный дубль превращает их путь в одно бесконечно напряжённое погружение в войну.',
      poster: 'https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg'
    }
  ];

  const GENRES = ['Фантастика', 'Драма', 'Триллер', 'Боевик', 'Криминал', 'Приключения'];

  /* ---------- 2. Состояние ---------- */
  const state = {
    search: '',
    genre: 'all',
    year: 'all',
    rating: 'all',
    sort: 'popularity',
    view: 'grid',
    favorites: new Set(),
    recent: [],
    modalId: null
  };

  /* ---------- 3. Утилиты ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const getMovie = id => MOVIES.find(m => m.id === id);

  const escapeHtml = (str = '') =>
    String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

  const formatDuration = min => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h ? `${h} ч ${m} мин` : `${m} мин`;
  };

  /* ---------- 4. LocalStorage ---------- */
  const LS = {
    FAV: 'cinescope:favorites',
    THEME: 'cinescope:theme'
  };

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(LS.FAV);
      if (!raw) return;
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        const valid = arr.filter(id => typeof id === 'string' && getMovie(id));
        state.favorites = new Set(valid);
      }
    } catch (_) {
      state.favorites = new Set();
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(LS.FAV, JSON.stringify([...state.favorites]));
    } catch (_) { /* приватный режим — просто игнорируем */ }
  }

  function loadTheme() {
    let saved = null;
    try { saved = localStorage.getItem(LS.THEME); } catch (_) {}
    const theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }

  function saveTheme(theme) {
    try { localStorage.setItem(LS.THEME, theme); } catch (_) {}
  }

  /* ---------- 5. Фильтрация и сортировка ---------- */
  function getFilteredMovies() {
    const query = state.search.trim().toLowerCase();

    let list = MOVIES.filter(m => {
      if (query && !m.title.toLowerCase().includes(query)) return false;
      if (state.genre !== 'all' && !m.genres.includes(state.genre)) return false;
      if (state.year !== 'all' && m.year !== Number(state.year)) return false;
      if (state.rating !== 'all' && m.rating < Number(state.rating)) return false;
      return true;
    });

    const sorters = {
      popularity: (a, b) => b.popularity - a.popularity,
      rating:     (a, b) => b.rating - a.rating,
      year:       (a, b) => b.year - a.year,
      title:      (a, b) => a.title.localeCompare(b.title, 'ru')
    };
    list.sort(sorters[state.sort] || sorters.popularity);

    return list;
  }

  /* ---------- 6. Рендеринг ---------- */
  function posterImg(movie, size = 'w500') {
    const src = movie.poster || '';
    return `
      <div class="poster" data-title="${escapeHtml(movie.title)}">
        <img src="${escapeHtml(src)}" alt="Постер «${escapeHtml(movie.title)}»" loading="lazy"
             onerror="this.closest('.poster').classList.add('is-fallback'); this.remove();">
        <div class="poster__placeholder">${escapeHtml(movie.title)}</div>
        <span class="poster__rating" aria-label="Рейтинг CineScope">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
          </svg>
          ${movie.rating.toFixed(1)}
        </span>
      </div>`;
  }

  function favIcon() {
    return `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 10-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 000-7.8z"/>
      </svg>`;
  }

  function renderCard(movie, index = 0) {
    const isFav = state.favorites.has(movie.id);
    return `
      <article class="movie-card" style="animation-delay:${Math.min(index * 25, 300)}ms" data-id="${movie.id}">
        <button class="fav-btn ${isFav ? 'is-active' : ''}"
                data-fav="${movie.id}"
                aria-label="${isFav ? 'Убрать из избранного' : 'Добавить в избранное'}"
                aria-pressed="${isFav}">
          ${favIcon()}
        </button>

        <a href="#movie-${movie.id}" class="poster-link" data-open-movie="${movie.id}" aria-label="Открыть «${escapeHtml(movie.title)}»">
          ${posterImg(movie)}
          <div class="poster__hover" aria-hidden="true">
            <span class="btn btn--primary">Подробнее</span>
          </div>
        </a>

        <div class="movie-card__body">
          <h3 class="movie-card__title">
            <a href="#movie-${movie.id}" data-open-movie="${movie.id}">${escapeHtml(movie.title)}</a>
          </h3>
          <div class="movie-card__meta">
            <span>${movie.year}</span>
            <span class="dot" aria-hidden="true"></span>
            <span>${escapeHtml(movie.genres[0] || '')}</span>
          </div>
          ${state.view === 'list'
            ? `<p class="movie-card__desc">${escapeHtml(movie.description)}</p>`
            : ''}
        </div>
      </article>`;
  }

  function renderCatalog() {
    const grid = $('#moviesGrid');
    const empty = $('#catalogEmpty');
    const list = getFilteredMovies();

    $('#resultCount').textContent = list.length;
    $('#totalCount').textContent = MOVIES.length;

    grid.classList.toggle('movies--list', state.view === 'list');
    grid.classList.toggle('movies--compact', false);

    if (!list.length) {
      grid.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    grid.innerHTML = list.map((m, i) => renderCard(m, i)).join('');
  }

  function renderFavorites() {
    const grid = $('#favGrid');
    const empty = $('#favEmpty');
    const count = state.favorites.size;
    $('#favCount').textContent = count;
    $('#favBadge').textContent = count;
    $('#favBadge').hidden = count === 0;

    if (!count) {
      grid.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    // Порядок: как добавлено (по возрастанию индекса в Set), отфильтровываем несуществующие
    const favMovies = [...state.favorites].map(getMovie).filter(Boolean);
    grid.classList.remove('movies--list');
    grid.classList.add('movies--compact');
    grid.innerHTML = favMovies.map((m, i) => renderCard(m, i)).join('');
  }

  function renderRecent() {
    const section = $('#recent');
    const grid = $('#recentGrid');
    const list = state.recent.map(getMovie).filter(Boolean).slice(0, 6);

    $('#recentCount').textContent = list.length;

    if (!list.length) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    grid.innerHTML = list.map((m, i) => renderCard(m, i)).join('');
  }

  function renderGenres() {
    const wrap = $('#genresList');
    const counts = Object.fromEntries(GENRES.map(g => [g, MOVIES.filter(m => m.genres.includes(g)).length]));

    wrap.innerHTML = GENRES.map(g => {
      const active = state.genre === g;
      return `
        <button class="genre-chip ${active ? 'is-active' : ''}"
                data-genre="${escapeHtml(g)}"
                role="listitem"
                aria-pressed="${active}">
          ${escapeHtml(g)}
          <span class="genre-chip__count">${counts[g] || 0}</span>
        </button>`;
    }).join('');
  }

  function renderSelects() {
    // Жанры
    const genreSel = $('#filterGenre');
    const currentGenre = state.genre;
    genreSel.innerHTML = '<option value="all">Все жанры</option>' +
      GENRES.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');
    genreSel.value = currentGenre;

    // Годы
    const years = [...new Set(MOVIES.map(m => m.year))].sort((a, b) => b - a);
    const yearSel = $('#filterYear');
    yearSel.innerHTML = '<option value="all">Все годы</option>' +
      years.map(y => `<option value="${y}">${y}</option>`).join('');
    yearSel.value = state.year;

    // Остальные селекты
    $('#filterRating').value = state.rating;
    $('#sortSelect').value = state.sort;

    // Кнопки вида
    $$('.view-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.view === state.view);
    });
  }

  /* ---------- 7. Модальное окно ---------- */
  const modal = $('#modal');
  const modalBody = $('#modalBody');
  let lastFocused = null;

  function openModal(id) {
    const movie = getMovie(id);
    if (!movie) return;

    state.modalId = id;
    lastFocused = document.activeElement;

    const isFav = state.favorites.has(id);

    modalBody.innerHTML = `
      <div class="modal__poster" data-title="${escapeHtml(movie.title)}">
        <img src="${escapeHtml(movie.poster)}" alt="Постер «${escapeHtml(movie.title)}»"
             onerror="this.closest('.modal__poster').classList.add('is-fallback'); this.remove();">
        <div class="poster__placeholder">${escapeHtml(movie.title)}</div>
      </div>

      <div class="modal__content">
        <span class="modal__eyebrow">Кинокартина</span>
        <h2 class="modal__title" id="modalTitle">${escapeHtml(movie.title)}</h2>

        <div class="modal__meta">
          <span>${movie.year}</span>
          <span class="dot" aria-hidden="true"></span>
          <span>${formatDuration(movie.duration)}</span>
          <span class="dot" aria-hidden="true"></span>
          <span class="modal__rating">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
            </svg>
            ${movie.rating.toFixed(1)} <span class="muted">CineScope</span>
          </span>
        </div>

        <div class="modal__genres">
          ${movie.genres.map(g => `<span class="tag">${escapeHtml(g)}</span>`).join('')}
        </div>

        <div class="modal__divider"></div>

        <p class="modal__desc">${escapeHtml(movie.fullDescription || movie.description)}</p>

        <div class="modal__facts">
          <div class="fact">
            <span class="fact__label">Режиссёр</span>
            <span class="fact__value">${escapeHtml(movie.director || '—')}</span>
          </div>
          <div class="fact">
            <span class="fact__label">Продолжительность</span>
            <span class="fact__value">${formatDuration(movie.duration)}</span>
          </div>
          <div class="fact">
            <span class="fact__label">Год выпуска</span>
            <span class="fact__value">${movie.year}</span>
          </div>
          <div class="fact">
            <span class="fact__label">Жанры</span>
            <span class="fact__value">${movie.genres.map(escapeHtml).join(', ')}</span>
          </div>
        </div>

        <div class="modal__actions">
          <button class="btn ${isFav ? 'btn--ghost is-active' : 'btn--primary'}"
                  data-fav="${movie.id}" aria-pressed="${isFav}">
            ${favIcon()}
            <span class="fav-label">${isFav ? 'В избранном' : 'В избранное'}</span>
          </button>
          <button class="btn btn--ghost" data-close-modal>Закрыть</button>
        </div>
      </div>
    `;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Добавляем в недавние
    state.recent = [id, ...state.recent.filter(x => x !== id)].slice(0, 6);
    renderRecent();

    // Фокус на кнопку закрытия
    requestAnimationFrame(() => {
      const closeBtn = $('.modal__close', modal);
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    state.modalId = null;

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  /* ---------- 8. Избранное ---------- */
  function toggleFavorite(id) {
    const movie = getMovie(id);
    if (!movie) return;

    const wasFav = state.favorites.has(id);
    if (wasFav) {
      state.favorites.delete(id);
    } else {
      state.favorites.add(id);
    }
    saveFavorites();

    // Обновляем все кнопки этого фильма
    $$(`[data-fav="${id}"]`).forEach(btn => {
      const active = state.favorites.has(id);
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active);
      btn.setAttribute('aria-label', active ? 'Убрать из избранного' : 'Добавить в избранное');

      const label = $('.fav-label', btn);
      if (label) label.textContent = active ? 'В избранном' : 'В избранное';
    });

    renderFavorites();

    showToast(wasFav
      ? `«${movie.title}» убрано из избранного`
      : `«${movie.title}» добавлено в избранное`);
  }

  function clearFavorites() {
    if (!state.favorites.size) return;
    if (!confirm('Очистить весь список избранного?')) return;
    state.favorites.clear();
    saveFavorites();
    renderFavorites();
    // Обновим карточки каталога
    renderCatalog();
    showToast('Избранное очищено');
  }

  /* ---------- 9. Toast ---------- */
  let toastTimer = null;
  function showToast(message) {
    const toast = $('#toast');
    toast.innerHTML = `<span class="toast__dot" aria-hidden="true"></span>${escapeHtml(message)}`;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  /* ---------- 10. События ---------- */
  function setupEvents() {
    // Делегирование кликов
    document.addEventListener('click', e => {
      // Открытие модального окна
      const openBtn = e.target.closest('[data-open-movie]');
      if (openBtn) {
        e.preventDefault();
        openModal(openBtn.dataset.openMovie);
        return;
      }

      // Избранное
      const favBtn = e.target.closest('[data-fav]');
      if (favBtn) {
        e.preventDefault();
        toggleFavorite(favBtn.dataset.fav);
        return;
      }

      // Закрытие модального окна
      if (e.target.closest('[data-close-modal]')) {
        closeModal();
        return;
      }

      // Жанры
      const genreChip = e.target.closest('.genre-chip');
      if (genreChip) {
        const genre = genreChip.dataset.genre;
        state.genre = state.genre === genre ? 'all' : genre;
        renderGenres();
        renderSelects();
        renderCatalog();
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      // Переключение вида
      const viewBtn = e.target.closest('.view-btn');
      if (viewBtn) {
        state.view = viewBtn.dataset.view;
        renderSelects();
        renderCatalog();
        return;
      }
    });

    // Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    // Кнопки-«открывашки» для клавиатуры
    document.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const openLink = e.target.closest('[data-open-movie]');
      if (openLink && openLink.tagName !== 'BUTTON') {
        e.preventDefault();
        openModal(openLink.dataset.openMovie);
      }
    });

    // Поиск в каталоге
    $('#catalogSearch').addEventListener('input', e => {
      state.search = e.target.value;
      renderCatalog();
    });

    // Селекты
    $('#filterGenre').addEventListener('change', e => {
      state.genre = e.target.value;
      renderGenres();
      renderCatalog();
    });
    $('#filterYear').addEventListener('change', e => {
      state.year = e.target.value;
      renderCatalog();
    });
    $('#filterRating').addEventListener('change', e => {
      state.rating = e.target.value;
      renderCatalog();
    });
    $('#sortSelect').addEventListener('change', e => {
      state.sort = e.target.value;
      renderCatalog();
    });

    // Сброс
    const resetAll = () => {
      state.search = '';
      state.genre = 'all';
      state.year = 'all';
      state.rating = 'all';
      state.sort = 'popularity';
      $('#catalogSearch').value = '';
      renderSelects();
      renderGenres();
      renderCatalog();
      showToast('Фильтры сброшены');
    };
    $('#resetFilters').addEventListener('click', resetAll);
    $('#emptyReset').addEventListener('click', resetAll);

    // Очистка избранного
    $('#clearFav').addEventListener('click', clearFavorites);

    // Тема
    $('#themeToggle').addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      saveTheme(next);
      showToast(next === 'dark' ? 'Тёмная тема' : 'Светлая тема');
    });

    // Мобильное меню
    const nav = $('#nav');
    const menuToggle = $('#menuToggle');
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('.nav__link')) {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Поиск в шапке
    const searchBar = $('#searchBar');
    const headerSearch = $('#headerSearch');
    $('#searchToggle').addEventListener('click', () => {
      const isOpen = !searchBar.hidden;
      if (isOpen) {
        searchBar.hidden = true;
        $('#searchToggle').setAttribute('aria-expanded', 'false');
      } else {
        searchBar.hidden = false;
        $('#searchToggle').setAttribute('aria-expanded', 'true');
        headerSearch.focus();
      }
    });
    $('#searchClose').addEventListener('click', () => {
      searchBar.hidden = true;
      $('#searchToggle').setAttribute('aria-expanded', 'false');
    });
    headerSearch.addEventListener('input', e => {
      state.search = e.target.value;
      $('#catalogSearch').value = e.target.value;
      renderCatalog();
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Активная ссылка при скролле
    const sections = ['home', 'catalog', 'genres', 'favorites'].map(id => document.getElementById(id));
    const navLinks = $$('.nav__link');
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = 'home';
      for (const s of sections) {
        if (!s) continue;
        if (s.offsetTop <= scrollY) current = s.id;
      }
      navLinks.forEach(l => l.classList.toggle('is-active', l.dataset.nav === current));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 11. Инициализация ---------- */
  function init() {
    loadTheme();
    loadFavorites();

    $('#year').textContent = new Date().getFullYear();

    renderGenres();
    renderSelects();
    renderCatalog();
    renderFavorites();
    renderRecent();
    setupEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();