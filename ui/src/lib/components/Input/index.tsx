import React, { forwardRef, Ref } from "react";
import { containerStyles, input, inputContainer, labelStyles, rightSectionStyles } from "./styles";

type InputVariants = Exclude<Parameters<typeof inputContainer>[0], undefined>;
type LabelVariants = Exclude<Parameters<typeof labelStyles>[0], undefined>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputVariants, LabelVariants {
    rightSection?: React.ReactNode;
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ withRightBorder, withLeftBorder, withLeftRadius, withRightRadius, radius, rightSection, variant, label, separate, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={containerStyles}>
            {label && <div className={labelStyles({ separate })}>{label}</div>}
            <div className={inputContainer({ withRightBorder, withLeftBorder, withLeftRadius, withRightRadius, radius, variant, })}>
                <input className={input} ref={ref} {...props} />
                {rightSection && <div className={rightSectionStyles}>
                    {rightSection}
                </div>}
            </div>
        </div>
    );
});

export default Input;
