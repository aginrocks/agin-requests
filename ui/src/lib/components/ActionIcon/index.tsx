import React, { HTMLAttributes } from 'react';
import { actionIcon } from './styles';
import { Icon } from '@tabler/icons-react';

export interface ActionIconProps extends HTMLAttributes<HTMLDivElement> {
    icon: string | Icon;
}

export default function ActionIcon({ icon: Icon, ...props }: ActionIconProps) {
    return (
        <div className={actionIcon} {...props}>
            {typeof Icon == 'string' ? <i className={`codicon codicon-${Icon}`} /> : <Icon size={16} />}
        </div>
    );
}
