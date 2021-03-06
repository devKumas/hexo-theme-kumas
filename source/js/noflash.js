let storageKey = 'darkMode';
let classNameDark = 'dark-mode';
let classNameLight = 'light-mode';

function setClassOnDocumentBody(darkMode) {
  document.body.classList.add(darkMode ? classNameDark : classNameLight);
  document.body.classList.remove(darkMode ? classNameLight : classNameDark);

  let prism = document.getElementById('prism-theme');
  prism && (prism.href = `/css/prism/prism-one-${darkMode ? 'dark' : 'light'}.css`);
}

let preferDarkQuery = '(prefers-color-scheme: dark)';
let mql = window.matchMedia(preferDarkQuery);
let supportsColorSchemeQuery = mql.media === preferDarkQuery;
let localStorageTheme = null;

try {
  localStorageTheme = localStorage.getItem(storageKey);
} catch (err) {}
let localStorageExists = localStorageTheme !== null;
if (localStorageExists) {
  localStorageTheme = JSON.parse(localStorageTheme);
}

// Determine the source of truth
if (localStorageExists) {
  // source of truth from localStorage
  setClassOnDocumentBody(localStorageTheme);
} else if (supportsColorSchemeQuery) {
  // source of truth from system
  setClassOnDocumentBody(mql.matches);
  localStorage.setItem(storageKey, mql.matches);
} else {
  // source of truth from document.body
  let isDarkMode = document.body.classList.contains(classNameDark);
  localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
}

mql.addEventListener('change', (e) => {
  if (e.matches) setClassOnDocumentBody(true);
  else setClassOnDocumentBody(false);

  localStorage.setItem(storageKey, mql.matches);
});

function themeToggle(darkMode) {
  setClassOnDocumentBody(darkMode);
  localStorage.setItem(storageKey, darkMode);
}
