import { Primitive, StringMap } from "./common.js";
import { StrapiUser } from "./core.js";

export type ContentType = "collectionType" | "singleType";

export type StrapiContentTypeInfo = {
  singularName: string;
  pluralName: string;
  displayName: string;
  description: string;
};

export type StrapiContentTypeAttributeValidator = {
  required?: boolean;
  max?: number;
  min?: number;
  minLength?: number;
  maxLength?: number;
  private?: boolean;
  configurable?: boolean;
  default?: Primitive;
};
export type SimpleStrapiContentTypeAttributeKeys =
  | "string"
  | "text"
  | "richtext"
  | "email"
  | "password"
  | "date"
  | "time"
  | "datetime"
  | "timestamp"
  | "boolean"
  | "integer"
  | "biginteger"
  | "float"
  | "decimal"
  | "json";

export type SimpleStrapiContentTypeAttribute = {
  type: SimpleStrapiContentTypeAttributeKeys;
} & StrapiContentTypeAttributeValidator;

export type StrapiContentTypeEnumerationAttribute = {
  type: "enumeration";
  enum: Array<string>;
} & StrapiContentTypeAttributeValidator;

export type StrapiContentTypeComponentAttribute = {
  type: "component";
  component: string;
  repeatable?: boolean;
};

export type StrapiContentTypeDynamicZoneAttribute = {
  type: "dynamiczone";
  components: Array<string>;
};

export type StrapiContentTypeMediaAttribute = {
  type: "media";
  allowedTypes: Array<"images" | "videos" | "files">;
  required?: boolean;
};

export type StrapiContentTypeUIDAttribute<T extends string = string> = {
  type: "uid";
  targetField: T;
  options: string;
};

export type StrapiContentTypeRelationType =
  | "oneToOne"
  | "oneToMany"
  | "manyToOne"
  | "manyToMany";

export type StrapiContentTypeRelationAttribute = {
  type: "relation";
  relation: StrapiContentTypeRelationType;
  target: string;
  mappedBy?: string;
  inversedBy?: string;
};

export type StrapiContentTypeAttributes<T extends string = string> = Record<
  T,
  | SimpleStrapiContentTypeAttribute
  | StrapiContentTypeEnumerationAttribute
  | StrapiContentTypeComponentAttribute
  | StrapiContentTypeDynamicZoneAttribute
  | StrapiContentTypeRelationAttribute
  | StrapiContentTypeMediaAttribute
>;

export type StrapiContentTypeFullSchema<TAttributes extends string = string> = {
  kind: ContentType;
  collectionName: string;
  info: StrapiContentTypeInfo;
  options: StringMap<Primitive>;
  attributes: StrapiContentTypeAttributes<TAttributes>;
  actions: StringMap<unknown>;
  lifecycles: StringMap<unknown>;
  uid: string;
  apiName: string;
};

export type StrapiContentTypeSchema<TAttributes extends string = string> = Pick<
  StrapiContentTypeFullSchema<TAttributes>,
  "info" | "kind" | "attributes" | "options"
>;

export type AnyEntity<TAttributes extends string = string>  = {
  id: number;
  documentId: string;
  createdAt: string;
  createdBy?: StrapiUser | number;
  updatedAt: string;
  updatedBy?: StrapiUser | number;
  publishedAt?: string;
  publishedBy?: StrapiUser | number;
} & StrapiContentTypeFullSchema<TAttributes>;

type StrapiImageFormat = {
  name: string;
  hash: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number; 
  path?: string;
  ext: string;
  mime: string;
  url: string;
};

export type StrapiImage = AnyEntity & StrapiImageFormat &{
  name: string;
  alternativeText?: string;
  caption?: string;
  hash: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number; 
  path?: string;
  ext: string;
  mime: string;
  url: string;
  formats: {
    thumnbail: StrapiImageFormat;
    [key: string]: StrapiImageFormat;
  }
  previewUrl?: string;
  provider: string;
  provider_metadata?: StringMap<Primitive>;
  folderPath?: string;
  locale?: string;
  folder?: unknown;
  isUrlSigned: boolean;
};