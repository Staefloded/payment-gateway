import {useState, useEffect} from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === 'light' ? 'dark' : 'light';
  useEffect(
    () => {
      const root = document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    },
    [theme],
    colorTheme,
  );
  console.log('ColorTheme', colorTheme);
  return [colorTheme, setTheme];
};
