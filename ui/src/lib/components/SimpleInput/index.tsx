import React, { forwardRef, Ref } from "react";
import { actionsContainer, input, simpleInputContainer } from "./styles";
import ActionIcon, { ActionIconProps } from "../ActionIcon";

export interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    actions?: ActionIconProps[],
}

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(({ actions, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={simpleInputContainer}>
            <input className={input} ref={ref} {...props} />
            {actions && <div className={actionsContainer}>
                {actions.map((a, i) => <ActionIcon key={i} {...a} />)}
            </div>}
        </div>
    );
});

export default SimpleInput;
