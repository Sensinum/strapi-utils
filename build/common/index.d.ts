/**
 * VirtusLab Strapi plugins - Common utils
 */
import { Core } from "@strapi/strapi";
export declare const flattenObject: (obj: any, prefix?: string) => any;
export declare const readLocale: (strapi: Core.Strapi) => Promise<{
    defaultLocale: string;
    restLocale: string[];
}>;
