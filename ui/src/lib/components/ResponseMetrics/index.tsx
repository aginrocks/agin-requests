import { metricsLeftStyles, metricsRightStyles, metricsStyles } from "./styles";

export default function ResponseMetrics({ children, rightSection }: { children: React.ReactNode, rightSection?: React.ReactNode }) {
    return (
        <div className={metricsStyles}>
            <div className={metricsLeftStyles}>
                {children}
            </div>
            <div className={metricsRightStyles}>
                {rightSection}
            </div>
        </div>
    )
}