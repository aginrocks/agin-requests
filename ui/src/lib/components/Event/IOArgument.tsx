import { SocketIOArgument } from "@shared/types"
import { css } from "@styled-system/css";

export type IOArgumentProps = {
    data: SocketIOArgument;
    index: number;
}

export default function IOArgument({ data, index }: IOArgumentProps) {
    return (
        <div className={styles.argument}>
            <div className={styles.argIndex}>
                {index}
            </div>
        </div>
    )
}

const styles = {
    argument: css({
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
    }),
    argIndex: css({
        width: '30px',
        height: '30px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--vscode-list-hoverBackground)',
    }),
}