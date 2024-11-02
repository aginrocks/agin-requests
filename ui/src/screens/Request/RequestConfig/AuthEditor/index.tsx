import { useRequest } from "@lib/hooks"
import { container, paramsContainer } from "./styles";
import Tabs, { TabType } from "@lib/components/Tabs";
import { AuthType, RequestBodyType } from "@lib/types";
import Divider from "@lib/components/Divider";
import EditorContainer from "@lib/components/EditorContainer";
import ParamsGroup from "@lib/components/ParamsGroup";
import Param from "@lib/components/Param";
import SecondaryTabs from "@lib/components/SecondaryTabs";

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
    {
        id: 'oauth2',
        label: 'OAuth 2',
    }
];

export default function AuthEditor() {
    const request = useRequest();

    return (
        <>
            <div className={container({ full: false })}>
                <SecondaryTabs
                    tabs={authTypes}
                    active={request?.values.authType ?? ''}
                    onChange={(tab) => request?.setFieldValue('authType', tab as AuthType)}
                />
            </div>

        </>
    )
}