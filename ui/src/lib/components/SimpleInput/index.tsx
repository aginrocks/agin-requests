import React, { forwardRef, Ref } from "react";
import { input, simpleInputContainer } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const SimpleInput = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={simpleInputContainer}>
            <input className={input} ref={ref} {...props} />
        </div>
    );
});

export default SimpleInput;
