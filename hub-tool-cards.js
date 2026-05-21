(function () {
  'use strict';

  var ARROW_SVG =
    '<i data-lucide="chevron-right" class="tool-arrow" style="width:18px;height:18px;stroke-width:1.5" aria-hidden="true"></i>';

  var TOOLS = [
    {
      href: 'watermark.html',
      variant: 'cyan',
      hubCats: 'all',
      icon: 'eraser',
      badge: 'Фото',
      title: 'Убрать водяной знак',
      desc:
        'Загружаешь фото, выделяешь зону с\u00a0водяным знаком и браузер восстанавливает фон под ним. Скачиваешь чистое изображение',
      feats: ['Работает офлайн', 'HEIC, PNG, JPG, WEBP', 'Бесплатно в браузере'],
    },
    {
      href: 'merge-pdf.html',
      variant: 'blue',
      hubCats: 'all context',
      icon: 'file-plus-2',
      badge: 'PDF',
      title: 'Объединить PDF',
      desc:
        'Перетаскиваешь несколько PDF, расставляешь нужный порядок и\u00a0скачиваешь один готовый документ',
      feats: ['Любое количество файлов', 'Настройка степени сжатия'],
    },
    {
      href: 'compress-webp.html',
      variant: 'green',
      hubCats: 'all context',
      icon: 'minimize-2',
      badge: 'Фото',
      title: 'Сжать в WebP',
      desc:
        'Размер падает в 3–5 раз, а\u00a0качество остаётся таким же. Выбираешь степень сжатия сам. Поддерживает пакетную обработку',
      feats: ['Пакетная обработка', 'HEIC, JPG, PNG → WebP', 'Слайдер качества'],
    },
    {
      href: 'edit-image.html',
      variant: 'cyan',
      hubCats: 'all',
      icon: 'crop',
      badge: 'Фото',
      title: 'Обрезать и повернуть',
      desc:
        'Загружаешь фото, обрезаешь рамкой, поворачиваешь на 90° или отражаешь — и скачиваешь результат. Всё локально, без загрузки на сервер',
      feats: ['Обрезка перетаскиванием', 'Поворот и отражение', 'JPG, PNG, WebP, HEIC'],
    },
    {
      href: 'https://rafael-mansurov.github.io/trace-logos/',
      variant: 'violet',
      hubCats: 'all',
      icon: 'library',
      badge: 'Иконки',
      title: 'Trace Icon',
      desc:
        'Библиотека логотипов брендов: favicon, полная и английская версии. Скачиваешь SVG или PNG, копируешь SVG прямо в Фигму, забираешь весь набор ZIP-архивом',
      feats: ['SVG и PNG', 'Копировать в Фигму', 'ZIP-архив набора'],
    },
  ];

  function renderToolCards() {
    var list = document.getElementById('hubToolsList');
    if (!list) return;

    list.innerHTML = TOOLS.map(function (t) {
      var feats = t.feats
        .map(function (line) {
          return '<li>' + line + '</li>';
        })
        .join('');

      return (
        '<a href="' +
        t.href +
        '" class="tool-card tool-card--' +
        t.variant +
        '" data-hub-cats="' +
        t.hubCats +
        '">' +
        '<div class="tool-card-top">' +
        '<div class="tool-icon-wrap tool-icon--' +
        t.variant +
        '">' +
        '<i data-lucide="' +
        t.icon +
        '" style="width:20px;height:20px;stroke-width:1.5" aria-hidden="true"></i>' +
        '</div>' +
        '<div class="tool-card-meta">' +
        '<span class="tool-badge tool-badge--' +
        t.variant +
        '">' +
        t.badge +
        '</span>' +
        '</div>' +
        ARROW_SVG +
        '</div>' +
        '<h2 class="tool-card-title">' +
        t.title +
        '</h2>' +
        '<p class="tool-card-desc">' +
        t.desc +
        '</p>' +
        '<ul class="tool-feats">' +
        feats +
        '</ul>' +
        '</a>'
      );
    }).join('');
  }

  function initHubTabs() {
    var tablist = document.querySelector('.hub-tabs');
    var tabs = tablist ? tablist.querySelectorAll('.hub-tab') : [];
    var cards = document.querySelectorAll('#hubToolsList .tool-card');
    if (!tabs.length || !cards.length) return;

    function applyHubFilter(filter) {
      cards.forEach(function (card) {
        var raw = card.getAttribute('data-hub-cats') || 'all';
        var cats = raw.split(/\s+/).filter(Boolean);
        var show = filter === 'all' || cats.indexOf(filter) !== -1;
        card.classList.toggle('is-hub-hidden', !show);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var filter = tab.getAttribute('data-hub-tab') || 'all';
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        applyHubFilter(filter);
      });
    });
  }

  function run() {
    renderToolCards();
    initHubTabs();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
