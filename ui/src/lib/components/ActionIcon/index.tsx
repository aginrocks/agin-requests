import React, { HTMLAttributes } from 'react';
import { actionIcon } from './styles';

export interface ActionIconProps extends HTMLAttributes<HTMLDivElement> {
    icon: string;
}

export default function ActionIcon({ icon, ...props }: ActionIconProps) {
    return (
        <div className={actionIcon} {...props}>
            <i className={`codicon codicon-${icon}`} />
        </div>
    );
}
