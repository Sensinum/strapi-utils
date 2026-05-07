/**
 * VirtusLab Strapi plugins - Common utils
 */

import { Core } from '@strapi/strapi';
import crypto from 'node:crypto';

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

const algorithm = 'aes-256-cbc';

export const encrypt = (text: string, key: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (text: string, key: string): string => {
  const [ivHex, encryptedHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
