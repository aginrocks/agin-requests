import React, { HTMLAttributes } from 'react';
import { Icon } from '@tabler/icons-react';
import { actionIcon } from './styles';

type ActionIconVariants = Exclude<Parameters<typeof actionIcon>[0], undefined>;
export interface ActionIconProps extends HTMLAttributes<HTMLDivElement>, ActionIconVariants {
    icon: string | Icon;
    size?: number;
}

export default function ActionIcon({ icon: Icon, size, disabled, ...props }: ActionIconProps) {
    return (
        <div className={actionIcon({ disabled })} {...props}>
            {typeof Icon == 'string' ? <i className={`codicon codicon-${Icon}`} /> : <Icon size={size ?? 16} />}
        </div>
    );
}
