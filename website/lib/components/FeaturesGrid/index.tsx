import { featuresGrid } from "./styles";

export function FeaturesGrid({ children }: { children?: React.ReactNode }) {
    return (
        <div className={featuresGrid}>
            {children}
        </div>
    )
}