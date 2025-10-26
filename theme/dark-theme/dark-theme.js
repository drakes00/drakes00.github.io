/**
 * Dark Theme Switcher - Hybrid Mode
 * Combines automatic system preference detection with manual override
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'theme-preference';
  const THEME_CLASS = 'dark-theme';

  /**
   * Get the current theme preference
   * Priority: 1. User manual choice (localStorage)
   *           2. System preference
   *           3. Default (light)
   */
  function getThemePreference() {
    const saved = localStorage.getItem(STORAGE_KEY);
    
    // If user has manually chosen, respect that
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    
    // If saved as 'auto' or not set, check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  /**
   * Apply the theme to the document
   */
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add(THEME_CLASS);
    } else {
      document.body.classList.remove(THEME_CLASS);
    }
    console.log(document.body.classList);
  }

  /**
   * Set theme and save preference
   * @param {string} mode - 'light', 'dark', or 'auto'
   */
  function setTheme(mode) {
    localStorage.setItem(STORAGE_KEY, mode);
    
    let themeToApply;
    if (mode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      themeToApply = prefersDark ? 'dark' : 'light';
    } else {
      themeToApply = mode;
    }
    
    applyTheme(themeToApply);
    updateThemeButtons(mode);
  }

  /**
   * Toggle between light and dark (for simple toggle button)
   */
  function toggleTheme() {
    const current = getThemePreference();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  /**
   * Update theme button states (if using multiple buttons)
   */
  function updateThemeButtons(activeMode) {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const mode = btn.dataset.themeToggle;
      if (mode === activeMode) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Listen for system preference changes (when in auto mode)
   */
  function watchSystemPreference() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Only react to system changes if user hasn't manually set a preference
      if (!saved || saved === 'auto') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Initialize theme on page load
   */
  function init() {
    const theme = getThemePreference();
    applyTheme(theme);
    
    const savedMode = localStorage.getItem(STORAGE_KEY) || 'auto';
    updateThemeButtons(savedMode);
    
    watchSystemPreference();
  }

  // Initialize immediately
  init();

  // Expose functions globally
  window.themeManager = {
    setTheme: setTheme,
    toggleTheme: toggleTheme,
    getCurrentTheme: getThemePreference
  };

})();
