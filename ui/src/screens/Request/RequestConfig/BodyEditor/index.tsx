import { useRequest } from "@lib/hooks"
import { container, paramsContainer, tabs } from "./styles";
import Tabs, { TabType } from "@lib/components/Tabs";
import { RequestBodyType } from "@lib/types";
import Divider from "@lib/components/Divider";
import EditorContainer from "@lib/components/EditorContainer";
import ParamsGroup from "@lib/components/ParamsGroup";
import Param from "@lib/components/Param";
//  'none' | 'json' | 'xml' | 'text' | 'urlencoded' | 'formdata' | 'binary'
export const bodyTypes: TabType[] = [
    {
        id: 'none',
        label: 'None',
    },
    {
        id: 'json',
        label: 'JSON',
    },
    {
        id: 'xml',
        label: 'XML',
    },
    {
        id: 'text',
        label: 'Text',
    },
    {
        id: 'formdata',
        label: 'Form',
    },
    {
        id: 'urlencoded',
        label: 'Form url-encoded',
    },
    {
        id: 'binary',
        label: 'Binary',
    },
];

const conenctedTabs = ['json', 'xml', 'text'];

export default function BodyEditor() {
    const request = useRequest();

    return (
        <>
            <div className={container({ full: ['json', 'xml', 'text'].includes(request?.values?.requestBodyType as RequestBodyType) })}>
                <div className={tabs({ connected: conenctedTabs.includes(request?.values.requestBodyType as RequestBodyType) })}>
                    <Tabs tabs={bodyTypes} active={request?.values.requestBodyType ?? ''} onChange={(tab) => request?.setFieldValue('requestBodyType', tab as RequestBodyType)} />
                </div>
                {['json', 'xml', 'text'].includes(request?.values?.requestBodyType as RequestBodyType) && <EditorContainer>
                    TODO: Editor
                </EditorContainer>}
            </div>
            {['formdata', 'urlencoded'].includes(request?.values?.requestBodyType as RequestBodyType) && <div className={paramsContainer}>
                <ParamsGroup>
                    {request?.values.params.map((p, i) => <Param
                        key={i}
                        name={p.name}
                        value={p.value}
                        enabled={p.enabled}
                        onNameChange={(e) => request.setFieldValue(`params.${i}.name`, e.target.value)}
                        onValueChange={(e) => request.setFieldValue(`params.${i}.value`, e.target.value)}
                        onEnabledChange={(e) => request.setFieldValue(`params.${i}.enabled`, e.target.checked)}
                        onRemove={() => request.removeListItem('params', i)}
                    />)}
                </ParamsGroup>
            </div>}
        </>
    )
}