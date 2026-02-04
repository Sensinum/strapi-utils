import { useState, useEffect } from 'react';
import { lightTheme, darkTheme, } from '@strapi/design-system';
export const usePluginTheme = () => {
    const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [theme, setTheme] = useState();
    useEffect(() => {
        const isDarkSystemTheme = getSystemTheme();
        const systemTheme = isDarkSystemTheme ? 'dark' : 'light';
        const strapiTheme = window.localStorage?.STRAPI_THEME;
        setTheme(strapiTheme === 'system' ? systemTheme : strapiTheme);
    }, []);
    return {
        theme: theme === 'dark' ? darkTheme : lightTheme,
        themeName: theme,
    };
};
