// include.js
// Simple HTML partial loader for [data-include] attributes
(function() {
  function loadHTML(el, url) {
    fetch(url)
      .then(res => res.ok ? res.text() : '')
      .then(html => {
        el.outerHTML = html;
      })
      .catch(() => {
        el.outerHTML = '<!-- Failed to load include: ' + url + ' -->';
      });
  }
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-include]').forEach(el => {
      const url = el.getAttribute('data-include');
      if (url) loadHTML(el, url);
    });
  });
})();
