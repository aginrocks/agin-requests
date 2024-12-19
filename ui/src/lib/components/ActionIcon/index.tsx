import React, { HTMLAttributes } from 'react';
import { actionIcon } from './styles';
import { Icon } from '@tabler/icons-react';

export interface ActionIconProps extends HTMLAttributes<HTMLDivElement> {
    icon: string | Icon;
    size?: number;
}

export default function ActionIcon({ icon: Icon, size, ...props }: ActionIconProps) {
    return (
        <div className={actionIcon} {...props}>
            {typeof Icon == 'string' ? <i className={`codicon codicon-${Icon}`} /> : <Icon size={size ?? 16} />}
        </div>
    );
}
