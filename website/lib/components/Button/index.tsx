import React from 'react';
import { button } from './styles';
import { Icon } from '@tabler/icons-react';

type ButtonVariants = Exclude<Parameters<typeof button>[0], undefined>;

interface ButtonProps extends ButtonVariants, React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    icon?: Icon;
}

export function Button({ children, icon: Icon, variant }: ButtonProps) {
    const classes = button({ variant });

    return (
        <div className={classes.button}>
            {Icon && <Icon size={20} />}
            {children}
        </div>
    )
}