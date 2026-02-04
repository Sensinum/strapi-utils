import React from "react";

import {
  Flex,
  Field as NativeField
} from '@strapi/design-system';
import { FieldContent } from "./styles.js";

export type FieldProps = {
  children: React.ReactNode | Array<React.ReactNode>;
  name: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

export const Field = ({
  children,
  name,
  hint,
  label,
  error,
  required }: FieldProps) => {
  return (<NativeField.Root name={name} width="100%" hint={hint} error={error} required={required}>
    <Flex width="100%" direction="column" alignItems="flex-start" gap={1}>
      <NativeField.Label>{label}</NativeField.Label>
      <FieldContent width="100%" direction="column" alignItems="flex-start">
        {children}
      </FieldContent>
      <NativeField.Hint />
      <NativeField.Error />
    </Flex>
  </NativeField.Root>)
};