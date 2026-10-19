export type Theme = 'light' | 'dark';

const KEY = 'mschool-theme';

export const getTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

/** Applies the theme and remembers it. The first paint is handled by the inline script in index.html. */
export const setTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* private mode: the choice just lasts for this visit */
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1b1d21' : '#f6f7f9');
};
