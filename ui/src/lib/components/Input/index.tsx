import React, { forwardRef, Ref } from "react";
import { input, inputContainer } from "./styles";

type InputVariants = Exclude<Parameters<typeof inputContainer>[0], undefined>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputVariants {

}

const Input = forwardRef<HTMLInputElement, InputProps>(({ withRightBorder, withLeftBorder, withLeftRadius, withRightRadius, radius, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={inputContainer({ withRightBorder, withLeftBorder, withLeftRadius, withRightRadius, radius, })}>
            <input className={input} ref={ref} {...props} />
        </div>
    );
});

export default Input;
