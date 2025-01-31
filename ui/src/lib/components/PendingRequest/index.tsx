import { useRequestController } from '@lib/hooks';
import { TailSpin } from 'react-loader-spinner';
import { pendingRequestClasses } from './styles';
import SubtleButton from '../SubtleButton';
import { css } from '@styled-system/css';

export type PendingRequestProps = {
    visible: boolean;
}

export default function PendingRequest({ visible }: PendingRequestProps) {
    const { status, cancel } = useRequestController();

    const classes = pendingRequestClasses({ visible });

    return (
        <div className={classes.container}>
            <TailSpin
                visible={true}
                height="50"
                width="50"
                color="var(--button-primary-background)"
                ariaLabel="tail-spin-loading"
                radius="0"
                wrapperStyle={{}}
                wrapperClass=""
            />
            <SubtleButton onClick={cancel}>Cancel Request</SubtleButton>
            {/* TODO: Add cancel button */}
        </div>
    )
}