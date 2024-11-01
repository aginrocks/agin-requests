import React, { forwardRef, Ref } from "react";
import { input, inputContainer } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    withRightBorder?: boolean,
    withLeftBorder?: boolean,
    withLeftRadius?: boolean,
    withRightRadius?: boolean,
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ withRightBorder, withLeftBorder, withLeftRadius, withRightRadius, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={inputContainer({ withRightBorder, withLeftBorder, withLeftRadius, withRightRadius, })}>
            <input className={input} ref={ref} {...props} />
        </div>
    );
});

export default Input;
