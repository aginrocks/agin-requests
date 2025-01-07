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
            <Tooltip label={data.type}>
                <div className={styles.argIndex}>
                    {index}
                </div>
            </Tooltip>
            <Highlight language={data.type !== 'string' ? 'json' : 'text'} code={data.data} />
        </div>
    )
}

export const styles = {
    argument: css({
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
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