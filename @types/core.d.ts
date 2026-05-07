import { EventEmitter } from 'events';
import React from 'react';
import { MessageDescriptor } from 'react-intl';
import { StrapiRequestContext } from './api.js';
import { HTTPMethod, Primitive, StringMap, TypeResult } from './common.js';
import { StrapiContentTypeFullSchema, StrapiContentTypeSchema } from './contentType.js';
import { OnlyStrings } from './utils.js';

export type StrapiEvents =
  | `${'entry' | 'media'}.${StrapiEventsCrudFlow}`
  | `entry.${StrapiEventsPublishFlow}`;
type StrapiEventsCrudFlow = 'create' | 'update' | 'delete';
type StrapiEventsPublishFlow = 'publish' | 'unpublish';

export type StrapiService = any;
export type StrapiController<
  TResult = unknown,
  TBody extends {} = StringMap<string | number>,
  TQuery extends {} = StringMap<string | number>,
  TParams extends {} = StringMap<string | number>,
  TContextExtra extends {} = {},
> = (context: StrapiRequestContext<TBody, TQuery, TParams> & TContextExtra) => TResult;
export type StrapiMiddleware = Object;
export type StrapiContentType<T extends StrapiContentTypeSchema> = T;
export type StrapiPolicy = Object;
export type StrapiHook = Object;

export type StrapiWebhook = {
  id?: Id;
  name: string;
  type: string;
  url: string;
  headers: StringMap<string>;
  events: StrapiEvents[];
  enabled: boolean;
};
export type StrapiWebhookRunner = {
  config: StringMap<unknown>;
  eventHub: EventEmitter;
  listeners: Map<StrapiEvents, Function>;
  logger: unknown;
  queue: unknown;
  webhooksMap: Map<StrapiEvents, StrapiWebhook[]>;
};
export type StrapiWebhookStore = {
  createWebhook: (data: StrapiWebhook) => any;
  deleteWebhook: (id) => any;
  findWebhook: (id) => StrapiWebhook;
  findWebhooks: () => StrapiWebhook[];
  updateWebhook: (data: StrapiWebhook) => any;
};

export type StrapiApi = Object;
export type StrapiAuth = Object;

export type StrapiPluginConfig<T> = TypeResult<T>;

export type StrapiConfigContainer = StringMap<any> & {
  get: Function;
};

export type StrapiStore = {
  get: <T extends string = string, U = unknown>({ key: T }) => U;
  set: <T extends string = string, U = unknown>({ key: T, value: U }) => void;
  delete: <T extends string = string>({ key: T }) => void;
};

export type StrapiStoreQuery = {
  type: string;
  name?: string;
};

// https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#logical-operators

type EqualWhereOperator<T = unknown> = { $eq: T };
type NotEqualWhereOperator<T = unknown> = { $ne: T };
type InWhereOperator<T = string> = { $in: Array<T> };
type NotInWhereOperator<T = string> = { $notIn: Array<T> };
type LessThanWhereOperator = { $lt: number };
type LessThanEqualWhereOperator = { $lte: number };
type GreaterThanWhereOperator = { $gt: number };
type GreaterThanEqualWhereOperator = { $gte: number };
type BetweenWhereOperator = { $between: Array<number> };
type ContainsWhereOperator = { $contains: string };
type NotContainsWhereOperator = { $notContains: string };
type ContainsCaseInsensitiveWhereOperator = { $containsi: string };
type NotContainsCaseInsensitiveWhereOperator = { $notContainsi: string };
type StartsWithWhereOperator = { $startsWith: string };
type EndsWithWhereOperator = { $endsWith: string };
type IsNullWhereOperator = { $null: boolean };
type IsNotNullWhereOperator = { $notNull: boolean };
type NotWhereOperator<TKey extends string, TValue> = {
  $not: {
    [TKey]: [TValue];
  };
};
type AndWhereOperator<T> = { $and: Partial<T>[] };
type OrWhereOperator<T> = { $or: Partial<T>[] };

type WhereOperator<T = unknown> =
  | T
  | EqualWhereOperator<T>
  | NotEqualWhereOperator<T>
  | InWhereOperator<T>
  | NotInWhereOperator<T>
  | LessThanWhereOperator
  | LessThanEqualWhereOperator
  | GreaterThanWhereOperator
  | GreaterThanEqualWhereOperator
  | BetweenWhereOperator
  | ContainsWhereOperator
  | NotContainsWhereOperator
  | ContainsCaseInsensitiveWhereOperator
  | NotContainsCaseInsensitiveWhereOperator
  | StartsWithWhereOperator
  | EndsWithWhereOperator
  | EndsWithWhereOperator
  | IsNullWhereOperator
  | IsNotNullWhereOperator;

type WhereClause<TKeys extends string = string, TValues = Primitive> = Partial<
  Record<TKeys, WhereOperator<TValues>> &
    OrWhereOperator<Partial<Record<TKeys, WhereOperator<TValues>>>> &
    AndWhereOperator<Partial<Record<TKeys, WhereOperator<TValues>>>>
>;

type PopulateClause<TKeys extends string = string> =
  | Partial<Record<TKeys, boolean | Array<string> | StringMap<unknown>>>
  | Array<TKeys>
  | boolean;

type SelectClause<TKeys extends string = string> = TKeys | Array<TKeys> | '*';

export type StrapiAdmin = any;

export type StrapiAdminInstance = {
  addMenuLink: (input: ToBeFixed) => ToBeFixed;
  createSettingSection: (...input: Array<ToBeFixed>) => ToBeFixed;
  addReducers: (input: ToBeFixed) => ToBeFixed;
  registerPlugin: (input: ToBeFixed) => ToBeFixed;
  customFields: StrapiAdminCustomFields;
};

export type StrapiLog = {
  log: Function;
  error: Function;
  warn: Function;
};

export type StrapiCron = {
  add: Function;
  remove: Function;
  jobs: any[];
};

export type AllowedCustomFieldType =
  | 'biginteger'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'decimal'
  | 'email'
  | 'enumeration'
  | 'float'
  | 'integer'
  | 'json'
  | 'password'
  | 'richtext'
  | 'string'
  | 'text'
  | 'time'
  | 'timestamp'
  | 'uid';

export type StrapiServerCustomFieldRegisterInput = {
  name: string;
  plugin?: string;
  type: AllowedCustomFieldType;
};

export type StrapiServerCustomFields = {
  register: (input: StrapiServerCustomFieldRegisterInput) => void;
};

export type CustomFieldInputAttribute = {
  type: string;
  customField: string;
};

export type CustomFieldInputOption = {
  key: string;
  value: string;
};

export type CustomFieldInputProps = {
  attribute: CustomFieldInputAttribute;
  contentTypeUID: string;
  multiple: boolean;
  withDefaultValue: boolean;
  description?: string;
  disabled: boolean;
  intlLabel: MessageDescriptor;
  labelAction: string;
  error?: ToBeFixed;
  name: string;
  options: CustomFieldInputOption[];
  required: boolean;
  placeholder?: string;
  type: string;
  value?: unknown;
  onChange?: React.EventHandler<ToBeDefined>;
};

export type StrapiAdminCustomFieldRegisterInput = {
  pluginId?: string;
  icon?: React.ComponentType;
  intlLabel: MessageDescriptor;
  intlDescription: MessageDescriptor;
  // TODO: update once implementation doesn't require async components read
  components: { Input: () => Promise<ToBeDefined> };
  options: {
    base: Array<ToBeDefined>;
    advanced: Array<ToBeDefined>;
    validator: (...args: Array<ToBeDefined>) => Record<string, ToBeDefined>;
  };
} & StrapiServerCustomFieldRegisterInput;

export type StrapiAdminCustomFields = {
  register: (input: StrapiAdminCustomFieldRegisterInput) => void;
};

export type StrapiRoute = {
  method: HTTPMethod;
  path: string;
  handler: string;
  config: StrapiRouteConfig;
};

export type StrapiRouteConfig = {
  policies: Array<string>;
  description?: string;
  tag?: StrapiRouteConfigTag;
};

export type StrapiRouteConfigTag = {
  plugin: string;
  name?: string;
  actionType?: string;
};

export type StrapiAdminUser = any;

export type StrapiUser = {
  id: Id;
  email: string;
  username: string;
} & StringMap<unknown>;
