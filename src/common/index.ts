/**
 * VirtusLab Strapi plugins - Common utils
 */

import { Core } from "@strapi/strapi";

export const flattenObject = (obj: any, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? `${prefix}.` : '';
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {} as any);
};

export const readLocale = async (strapi: Core.Strapi) => {
  const localeService = strapi.plugin('i18n').service('locales');

  let defaultLocale: string = await localeService.getDefaultLocale();
  let restLocale: string[] = (await localeService.find({}))
    .map(({ code }: { code: string }) => code)
    .filter((code: string) => code !== defaultLocale);

  if (!defaultLocale) {
    defaultLocale = restLocale[0];
    restLocale = restLocale.slice(1);
  }

  return {
    defaultLocale,
    restLocale,
  };
};
