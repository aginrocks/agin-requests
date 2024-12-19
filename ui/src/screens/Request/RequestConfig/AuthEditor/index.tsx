import { useRequest } from "@lib/hooks"
import { container, authContainer } from "./styles";
import { TabType } from "@lib/components/Tabs";
import { AuthType } from "@shared/types";
import ParamsGroup from "@lib/components/ParamsGroup";
import SecondaryTabs from "@lib/components/SecondaryTabs";
import InputRow from "@lib/components/InputRow";
import { useMemo, useState } from "react";
import EditorContainer from "@lib/components/EditorContainer";
import ThemedEditor from "@lib/components/ThemedEditor";
import { editor } from "../BodyEditor/styles";

const connectedTabs = ['socketio'];

export default function AuthEditor() {
    const request = useRequest();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const authTypes: TabType[] = useMemo(() => [
        {
            id: 'none',
            label: 'None',
        },
        {
            id: 'basic',
            label: 'Basic',
        },
        {
            id: 'bearer',
            label: 'Bearer',
        },
        ...(request?.values.type == 'socketio' ? [{
            id: 'socketio',
            label: 'Socket.IO Auth',
        }] : []),
        // {
        //     id: 'oauth2',
        //     label: 'OAuth 2',
        // }
    ], [request?.values.type]);

    return (
        <>
            <div className={container({ full: connectedTabs.includes(request?.values.authType as AuthType) })}>
                <SecondaryTabs
                    tabs={authTypes}
                    active={request?.values.authType ?? ''}
                    onChange={(tab) => request?.setFieldValue('authType', tab as AuthType)}
                    connected={connectedTabs.includes(request?.values.authType as AuthType)}
                />
                {connectedTabs.includes(request?.values?.authType as AuthType) && <EditorContainer>
                    <ThemedEditor
                        height="100%"
                        className={editor}
                        defaultLanguage="json"
                        path={request?.values?.authType}
                        defaultValue={request?.values.auth.socketio ?? ''}
                        onChange={(value) => request?.setFieldValue('auth.socketio', value)}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            scrollBeyondLastLine: false,
                        }}
                    />
                </EditorContainer>}
            </div>
            <div className={authContainer}>
                {request?.values.authType == 'basic' && <ParamsGroup>
                    <InputRow label="Username" value={request?.values.auth?.basic?.username} onChange={e => request.setFieldValue('auth.basic.username', e.target.value)} />
                    <InputRow label="Password" value={request?.values.auth?.basic?.password} onChange={e => request.setFieldValue('auth.basic.password', e.target.value)} type={passwordVisible ? 'text' : 'password'} actions={[
                        {
                            icon: passwordVisible ? 'eye-closed' : 'eye',
                            onClick: () => setPasswordVisible(x => !x),
                        },
                    ]} />
                </ParamsGroup>}
                {request?.values.authType == 'bearer' && <ParamsGroup>
                    <InputRow label="Token" value={request?.values.auth?.bearer?.token} onChange={e => request.setFieldValue('auth.bearer.token', e.target.value)} />
                    <InputRow label="Prefix" value={request?.values.auth?.bearer?.prefix} onChange={e => request.setFieldValue('auth.bearer.prefix', e.target.value)} />
                </ParamsGroup>}
            </div>
        </>
    )
}