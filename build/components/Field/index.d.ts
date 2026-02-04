import React from "react";
export type FieldProps = {
    children: React.ReactNode | Array<React.ReactNode>;
    name: string;
    label?: string;
    hint?: string;
    error?: string;
    required?: boolean;
};
export declare const Field: ({ children, name, hint, label, error, required }: FieldProps) => React.JSX.Element;
