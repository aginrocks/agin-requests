import React, { forwardRef, Ref } from "react";
import { input, inputContainer } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftSection?: React.ReactNode,
    rightSection?: React.ReactNode,
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ leftSection, rightSection, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={inputContainer}>
            {leftSection}
            <input className={input} ref={ref} {...props} />
            {rightSection}
        </div>
    );
});

export default Input;
