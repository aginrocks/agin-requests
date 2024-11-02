import React, { HTMLAttributes } from 'react';
import { actionIcon } from './styles';

interface ActionIconProps extends HTMLAttributes<HTMLDivElement> {
    icon: string;
}

export default function ActionIcon({ icon, ...props }: ActionIconProps) {
    return (
        <div className={actionIcon} {...props}>
            <i className={`codicon codicon-${icon}`} />
        </div>
    );
}
