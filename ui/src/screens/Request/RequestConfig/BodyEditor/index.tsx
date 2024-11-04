import { useRequest } from "@lib/hooks"
import { container, editor, paramsContainer } from "./styles";
import Tabs, { TabType } from "@lib/components/Tabs";
import { RequestBodyType } from "@lib/types";
import Divider from "@lib/components/Divider";
import EditorContainer from "@lib/components/EditorContainer";
import ParamsGroup from "@lib/components/ParamsGroup";
import Param from "@lib/components/Param";
import SecondaryTabs from "@lib/components/SecondaryTabs";
import ThemedEditor from "@lib/components/ThemedEditor";
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
    // {
    //     id: 'xml',
    //     label: 'XML',
    // },
    // {
    //     id: 'text',
    //     label: 'Text',
    // },
    // {
    //     id: 'formdata',
    //     label: 'Form',
    // },
    {
        id: 'urlencoded',
        label: 'URL-encoded',
    },
    // {
    //     id: 'binary',
    //     label: 'Binary',
    // },
];

const conenctedTabs = ['json', 'xml', 'text'];

export default function BodyEditor() {
    const request = useRequest();

    // FIXME: White flash on other instances when new instance is mounted

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
                    <ThemedEditor
                        height="100%"
                        className={editor}
                        defaultLanguage="json"
                        defaultValue={typeof request?.values.requestBody == 'string' ? request?.values.requestBody : ''}
                        onChange={(value) => request?.setFieldValue('requestBody', value)}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            scrollBeyondLastLine: false,
                        }}
                    />
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