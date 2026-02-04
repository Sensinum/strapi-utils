/**
 * VirtusLab Strapi plugins - Common utils
 */
export const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
        const pre = prefix.length ? `${prefix}.` : '';
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(acc, flattenObject(obj[key], pre + key));
        }
        else {
            acc[pre + key] = obj[key];
        }
        return acc;
    }, {});
};
export const readLocale = async (strapi) => {
    const localeService = strapi.plugin('i18n').service('locales');
    let defaultLocale = await localeService.getDefaultLocale();
    let restLocale = (await localeService.find({}))
        .map(({ code }) => code)
        .filter((code) => code !== defaultLocale);
    if (!defaultLocale) {
        defaultLocale = restLocale[0];
        restLocale = restLocale.slice(1);
    }
    return {
        defaultLocale,
        restLocale,
    };
};
