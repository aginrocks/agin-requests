import React, { forwardRef, Ref } from "react";
import { input, inputContainer, rightSectionStyles } from "./styles";

type InputVariants = Exclude<Parameters<typeof inputContainer>[0], undefined>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputVariants {
    rightSection?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ withRightBorder, withLeftBorder, withLeftRadius, withRightRadius, radius, rightSection, variant, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={inputContainer({ withRightBorder, withLeftBorder, withLeftRadius, withRightRadius, radius, variant, })}>
            <input className={input} ref={ref} {...props} />
            {rightSection && <div className={rightSectionStyles}>
                {rightSection}
            </div>}
        </div>
    );
});

export default Input;
