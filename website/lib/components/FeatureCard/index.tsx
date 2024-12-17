'use client';
import { Icon } from "@tabler/icons-react";
import { card } from "./styles";
import { token } from "@/styled-system/tokens";
import { Card } from "../Card";

type CardVariants = Exclude<Parameters<typeof card>[0], undefined>;

export interface FeatureCardProps extends CardVariants {
    label: string;
    description?: string | React.ReactNode;
    icon: Icon;
}

export function FeatureCard({ label, description, icon: Icon }: FeatureCardProps) {
    const classes = card();

    return (
        <Card>
            <div className={classes.card}>
                <div className={classes.icon}>
                    <Icon size={25} color={token('colors.primary')} />
                </div>
                <div>
                    <div className={classes.label}>{label}</div>
                    <div className={classes.description}>{description}</div>
                </div>
            </div>
        </Card>
    )
}