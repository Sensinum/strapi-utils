import React from "react";
import { Flex, Field as NativeField } from '@strapi/design-system';
import { FieldContent } from "./styles.js";
export const Field = ({ children, name, hint, label, error, required }) => {
    return (React.createElement(NativeField.Root, { name: name, width: "100%", hint: hint, error: error, required: required },
        React.createElement(Flex, { width: "100%", direction: "column", alignItems: "flex-start", gap: 1 },
            React.createElement(NativeField.Label, null, label),
            React.createElement(FieldContent, { width: "100%", direction: "column", alignItems: "flex-start" }, children),
            React.createElement(NativeField.Hint, null),
            React.createElement(NativeField.Error, null))));
};
