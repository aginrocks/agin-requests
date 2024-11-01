import { tab } from "./styles";

export default function Tab({ id, icon, label, badge, active, setActive }: { id: string, label: string, icon?: () => React.ReactNode, badge?: string, active: boolean, setActive: React.Dispatch<React.SetStateAction<string>> }) {
    const classes = tab({ active });
    return (
        <div className={classes.container} onClick={() => setActive(id)}>
            <div className={classes.optionContainer}>
                <div className={classes.text}>
                    {label}
                </div>
            </div>
            <div className={classes.line}></div>
        </div>
    )
}