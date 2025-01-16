import { useMemo } from "react";
import { breadcrumbsClasses } from "./styles";

export type BreadcrumbsProps = {
    path: string;
    rightSection?: React.ReactNode;
}

export default function Breadcrumbs({ path, rightSection }: BreadcrumbsProps) {
    const segments = useMemo(() => path.split('/'), [path]);

    const classes = breadcrumbsClasses();

    return (
        <div className={classes.container}>
            {segments.map((segment, index) => segment ? (
                <>
                    <div key={`label-${index}`} className={classes.label}>
                        {segment}
                    </div>
                    {index - 1 !== segments.length && <div key={`divider-${index}`} className={classes.divider}>/</div>}
                </>
            ) : null).filter(x => x !== null)}
            {rightSection}
        </div>
    )
}