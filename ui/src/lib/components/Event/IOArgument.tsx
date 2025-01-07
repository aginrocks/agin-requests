import { SocketIOArgument } from "@shared/types"
import { css } from "@styled-system/css";
import Tooltip from "../Tooltip";
import Highlight from "../Highlight";

export type IOArgumentProps = {
    data: SocketIOArgument;
    index: number;
}

export default function IOArgument({ data, index }: IOArgumentProps) {
    return (
        <div className={styles.argument}>
            <div className={styles.indexContainer}>
                <Tooltip label={data.type}>
                    <div className={styles.argIndex}>
                        {index}
                    </div>
                </Tooltip>
            </div>
            <div className={styles.argumentValue}>
                <Highlight language={data.type !== 'string' ? 'json' : 'text'} code={data.data} />
            </div>
        </div>
    )
}

export const styles = {
    argument: css({
        display: 'flex',
        gap: '8px',
    }),
    argumentValue: css({
        display: 'flex',
        alignItems: 'center',
    }),
    indexContainer: css({
        width: '17px',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
    }),
    argIndex: css({
        width: '17px',
        height: '25px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--vscode-list-hoverBackground)',
        fontSize: '9px',
        fontWeight: 600,
        color: 'var(--vscode-disabledForeground)'
    }),
};