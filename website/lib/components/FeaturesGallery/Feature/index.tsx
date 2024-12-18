import React, { forwardRef } from "react";
import { featureStyles } from "./styles";

type FeatureVaraints = Exclude<Parameters<typeof featureStyles>[0], undefined>;

export interface FeatureProps extends FeatureVaraints, React.HTMLAttributes<HTMLDivElement> {
    label: string;
    description: string;
    image: string;
}

const Feature = forwardRef<HTMLDivElement, FeatureProps>(
    ({ label, description, image, active, ...props }, ref) => {
        const classes = featureStyles({ active });

        return (
            <div ref={ref} className={classes.container} {...props}>
                <div className={classes.label}>{label}</div>
                <div className={classes.description}>{description}</div>
            </div>
        );
    }
);

Feature.displayName = "Feature";

export default Feature;
