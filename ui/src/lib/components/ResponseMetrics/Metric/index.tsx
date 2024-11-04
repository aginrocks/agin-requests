import { labelStyles, metric, valueStyles } from "./styles"

export type MetricProps = {
    label: string,
    value?: string,
    color?: 'red' | 'green',
}

export default function Metric({ label, value, color }: MetricProps) {
    return (
        <div className={metric}>
            <div className={labelStyles}>{label}</div>
            <div className={valueStyles({ color })}>{value}</div>
        </div>
    )
}