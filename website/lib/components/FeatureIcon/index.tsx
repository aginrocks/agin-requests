import { Icon } from "@tabler/icons-react";
import { featureIcon } from "./styles";

type FeatureIconVariants = Exclude<Parameters<typeof featureIcon>[0], undefined>;

export interface FeatureIconProps extends FeatureIconVariants {
    icon: Icon;
}

export function FeatureIcon({ icon: Icon, size, variant }: FeatureIconProps) {
    const classes = featureIcon({ size, variant });

    return (
        <div className={classes.container}>
            <Icon size={30} />
        </div>
    )
}