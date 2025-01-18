import { useRequest } from '@lib/hooks';
import { container, left, requestName, requestNameContainer, right, typeSelector } from './styles';
import ActionIcon from '../ActionIcon';
import { Icon, IconBrandSocketIo, IconFileText, IconHttpDelete, IconHttpGet, IconHttpHead, IconHttpOptions, IconHttpPatch, IconHttpPost, IconHttpPut, IconPlayerPlay, IconPlugConnected, IconServer } from '@tabler/icons-react';
import { MenuTab } from '../MenuTabs';
import { RequestType } from '@shared/types';
import MessageName from '../MessageName';
import Menu from '../Menu';
import { useDisclosure } from '@mantine/hooks';
import SaveMenu from '../SaveMenu';
import Breadcrumbs from '../Breadcrumbs';

const tabs: MenuTab[] = [
    {
        id: 'design',
        icon: IconFileText,
        label: 'Design'
    },
    {
        id: 'test',
        icon: IconPlayerPlay,
        label: 'Test',
    },
];

const typesToIcons: Record<RequestType, Icon> = {
    ws: IconPlugConnected,
    http: IconHttpGet,
    socketio: IconBrandSocketIo,
    sse: IconServer,
}

const methodsToIcons = {
    get: IconHttpGet,
    post: IconHttpPost,
    patch: IconHttpPatch,
    put: IconHttpPut,
    delete: IconHttpDelete,
    head: IconHttpHead,
    options: IconHttpOptions,
}

export default function RequestTypeSelector() {
    const request = useRequest();

    const [renameOpened, rename] = useDisclosure(false);

    return (
        <div className={container}>
            <div className={left}>
                <div className={typeSelector}>
                    <ActionIcon icon={request?.values.type === 'http' ? methodsToIcons[request?.values.method as keyof typeof methodsToIcons ?? 'get'] : typesToIcons[request?.values.type ?? 'http']} />
                </div>
                <div>
                    <Breadcrumbs path={request?.values.path ?? ''} rightSection={<>
                        <Menu
                            target={
                                <div className={requestNameContainer} onClick={rename.open}>
                                    <div className={requestName({ isDraft: request?.values.isDraft })}>{request?.values.label || 'New Request'}</div>
                                    {request?.values.isDraft && <MessageName label="Draft" withMargin={false} size="xs" clickable={false} />}
                                </div>
                            }
                            opened={renameOpened}
                            onClose={rename.close}
                            position="bottomStart"
                            radius="lg"
                        >
                            <SaveMenu onClose={rename.close} />
                        </Menu>
                    </>} />
                </div>
            </div>
            <div className={right}>
                {/* <EnvSelector />
                <MenuTabs
                    tabs={tabs}
                    active={editMode}
                    onChange={(id) => setEditMode(id as EditMode)}
                    variant="compact"
                    show="label"
                // withAnimation={false}
                /> */}
            </div>
        </div>
    )
}