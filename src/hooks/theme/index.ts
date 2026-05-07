import { useState, useEffect } from 'react';

import { lightTheme, darkTheme } from '@strapi/design-system';

type StrapiTheme = 'light' | 'dark' | 'system';
type PluginTheme = 'light' | 'dark';

export const usePluginTheme = () => {
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState<PluginTheme>();

  useEffect(() => {
    const isDarkSystemTheme = getSystemTheme();
    const systemTheme: PluginTheme = isDarkSystemTheme ? 'dark' : 'light';
    const strapiTheme: StrapiTheme = window.localStorage?.STRAPI_THEME;
    setTheme(strapiTheme === 'system' ? systemTheme : strapiTheme);
  }, []);

  return {
    theme: theme === 'dark' ? darkTheme : lightTheme,
    themeName: theme,
  };
};
