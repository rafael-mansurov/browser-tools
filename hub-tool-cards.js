(function () {
  'use strict';

  var ARROW_SVG =
    '<svg class="tool-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

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
      href: 'compress-video.html',
      variant: 'blue',
      hubCats: 'all',
      icon: 'clapperboard',
      badge: 'Видео',
      title: 'Сжать видео',
      desc:
        'Сжатие и\u00a0оптимизация прямо в\u00a0браузере: на\u00a0100% — без перекодирования (только упаковка), ниже — сильнее сжатие. MP4, WebM, MOV и\u00a0другие форматы',
      feats: ['Локально в браузере', 'Слайдер качества', 'Прогресс сжатия'],
    },
    {
      href: 'png-to-svg.html',
      variant: 'violet',
      hubCats: 'all context',
      icon: 'file-image',
      badge: 'SVG',
      title: 'Изображение в SVG',
      desc:
        'Векторизация растра в браузере: порог, трассировка и превью контура. Можно поставить Quick Action или пункт в меню Windows',
      feats: ['Локально в браузере', 'JPG, PNG, WebP', 'Контекстное меню (опционально)'],
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
