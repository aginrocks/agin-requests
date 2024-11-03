import { useRequest } from "@lib/hooks"
import { container, authContainer } from "./styles";
import Tabs, { TabType } from "@lib/components/Tabs";
import { AuthType, RequestBodyType } from "@lib/types";
import Divider from "@lib/components/Divider";
import EditorContainer from "@lib/components/EditorContainer";
import ParamsGroup from "@lib/components/ParamsGroup";
import Param from "@lib/components/Param";
import SecondaryTabs from "@lib/components/SecondaryTabs";
import InputRow from "@lib/components/InputRow";
import { useState } from "react";

export const authTypes: TabType[] = [
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
    // {
    //     id: 'oauth2',
    //     label: 'OAuth 2',
    // }
];

export default function AuthEditor() {
    const request = useRequest();

    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <>
            <div className={container({ full: false })}>
                <SecondaryTabs
                    tabs={authTypes}
                    active={request?.values.authType ?? ''}
                    onChange={(tab) => request?.setFieldValue('authType', tab as AuthType)}
                />
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