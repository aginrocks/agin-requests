import { useRequest } from "@lib/hooks"
import { container, editor, paramsContainer } from "./styles";
import Tabs, { TabType } from "@lib/components/Tabs";
import { RequestBodyType } from "@shared/types";
import Divider from "@lib/components/Divider";
import EditorContainer from "@lib/components/EditorContainer";
import ParamsGroup from "@lib/components/ParamsGroup";
import Param from "@lib/components/Param";
import SecondaryTabs from "@lib/components/SecondaryTabs";
import ThemedEditor from "@lib/components/ThemedEditor";
import { useMemo, useRef } from "react";
import * as monaco from 'monaco-editor';
import { v4 } from "uuid";
import { TailSpin } from "react-loader-spinner";
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
        label: 'URL-encoded',
    },
    // {
    //     id: 'binary',
    //     label: 'Binary',
    // },
];

const connectedTabs = ['json', 'xml', 'text'];

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
                    connected={connectedTabs.includes(request?.values.requestBodyType as RequestBodyType)}
                />
                {['json', 'xml', 'text'].includes(request?.values?.requestBodyType as RequestBodyType) && <EditorContainer>
                    <ThemedEditor
                        height="100%"
                        className={editor}
                        defaultLanguage={request?.values?.requestBodyType}
                        path={request?.values?.requestBodyType}
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
            {/* <TailSpin
                visible={true}
                height="40"
                width="40"
                strokeWidth="3"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="4"
                wrapperStyle={{}}
                wrapperClass=""
            /> */}
            {['formdata', 'urlencoded'].includes(request?.values?.requestBodyType as RequestBodyType) && <div className={paramsContainer}>
                <ParamsGroup
                    property="requestBody"
                    paramProps={request?.values?.requestBodyType == 'formdata' ? {
                        valueProps: {
                            actions: [
                                {
                                    icon: 'new-file',
                                }
                            ]
                        }
                    } : {}}
                />
            </div>}
        </>
    )
}