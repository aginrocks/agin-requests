import { featureStyles } from "./styles";

type FeatureVaraints = Exclude<Parameters<typeof featureStyles>[0], undefined>;

export interface FeatureProps extends FeatureVaraints {
    label: string;
    description: string;
    image: string;
}

export default function Feature({ label, description, image, active }: FeatureProps) {
    const classes = featureStyles({ active });

    return (
        <div className={classes.container}>
            <div className={classes.label}>{label}</div>
            <div className={classes.description}>{description}</div>
        </div>
    )
}