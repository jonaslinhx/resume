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

    if (window.location.hash !== '#' + tabName) {
      history.replaceState(null, '', '#' + tabName);
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      activateTab(btn.dataset.tab);
    });
  });

  const hashTab = window.location.hash.replace('#', '');
  if (hashTab && document.getElementById(hashTab)) {
    activateTab(hashTab);
  }

  window.SiteTabs = { activateTab };
})();
