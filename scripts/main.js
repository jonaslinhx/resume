(function () {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel');

  function activateTab(tabName) {
    tabButtons.forEach((btn) => {
      const active = btn.dataset.tab === tabName;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    panels.forEach((panel) => {
      const active = panel.id === tabName;
      panel.classList.toggle('active', active);
      panel.setAttribute('aria-hidden', String(!active));
    });

  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      activateTab(btn.dataset.tab);
    });
  });

  window.SiteTabs = { activateTab };
})();
