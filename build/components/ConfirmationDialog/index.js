import React from "react";
import { Button, Dialog, Flex, Typography } from '@strapi/design-system';
import { WarningCircle } from "@strapi/icons";
export const ConfirmationDialog = ({ children, trigger, isVisible = false, isLoading = false, title, labelCancel, labelConfirm, iconConfirm, onConfirm, onClose }) => {
    return (React.createElement(Dialog.Root, { open: isVisible },
        trigger && (React.createElement(Dialog.Trigger, null, trigger)),
        React.createElement(Dialog.Content, null,
            React.createElement(Dialog.Header, null, title),
            React.createElement(Dialog.Body, { icon: React.createElement(WarningCircle, null) },
                React.createElement("div", null,
                    React.createElement(Flex, { justifyContent: "center" },
                        React.createElement(Typography, { id: "confirm-description" }, children)))),
            React.createElement(Dialog.Footer, null,
                React.createElement(Dialog.Cancel, null,
                    React.createElement(Button, { onClick: onClose, disabled: isLoading, variant: "tertiary" }, labelCancel)),
                React.createElement(Dialog.Action, null,
                    React.createElement(Button, { onClick: onConfirm, variant: "danger-light", loading: isLoading, disabled: isLoading, startIcon: iconConfirm }, labelConfirm))))));
};
