import { useRequest } from "@lib/hooks"
import { container, paramsContainer } from "./styles";
import Tabs, { TabType } from "@lib/components/Tabs";
import { RequestBodyType } from "@lib/types";
import Divider from "@lib/components/Divider";
import EditorContainer from "@lib/components/EditorContainer";
import ParamsGroup from "@lib/components/ParamsGroup";
import Param from "@lib/components/Param";
import SecondaryTabs from "@lib/components/SecondaryTabs";
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
                <SecondaryTabs
                    tabs={bodyTypes}
                    active={request?.values.requestBodyType ?? ''}
                    onChange={(tab) => request?.setFieldValue('requestBodyType', tab as RequestBodyType)}
                    connected={conenctedTabs.includes(request?.values.requestBodyType as RequestBodyType)}
                />
                {['json', 'xml', 'text'].includes(request?.values?.requestBodyType as RequestBodyType) && <EditorContainer>
                    TODO: Editor
                </EditorContainer>}
            </div>
            {['formdata', 'urlencoded'].includes(request?.values?.requestBodyType as RequestBodyType) && <div className={paramsContainer}>
                <ParamsGroup>
                    {request?.values.requestBody instanceof Object && request?.values.requestBody?.map((p, i) => <Param
                        key={i}
                        name={p.name}
                        value={p.value}
                        enabled={p.enabled}
                        onNameChange={(e) => request.setFieldValue(`requestBody.${i}.name`, e.target.value)}
                        onValueChange={(e) => request.setFieldValue(`requestBody.${i}.value`, e.target.value)}
                        onEnabledChange={(e) => request.setFieldValue(`requestBody.${i}.enabled`, e.target.checked)}
                        onRemove={() => request.removeListItem('requestBody', i)}
                    />)}
                </ParamsGroup>
            </div>}
        </>
    )
}