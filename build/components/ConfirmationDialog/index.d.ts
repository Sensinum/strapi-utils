import React, { MouseEvent, MouseEventHandler } from "react";
export type ConfirmationDialogProps = {
    isVisible: boolean;
    isLoading: boolean;
    trigger?: React.ReactNode | Array<React.ReactNode>;
    title: string;
    children: React.ReactNode | Array<React.ReactNode>;
    labelCancel: string;
    labelConfirm: string;
    iconConfirm: React.ReactNode;
    onClose: () => void;
    onConfirm: MouseEventHandler<HTMLButtonElement> & ((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void);
};
export declare const ConfirmationDialog: ({ children, trigger, isVisible, isLoading, title, labelCancel, labelConfirm, iconConfirm, onConfirm, onClose }: ConfirmationDialogProps) => React.JSX.Element;
