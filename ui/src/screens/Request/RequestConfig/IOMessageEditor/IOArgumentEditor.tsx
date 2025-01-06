import ThemedEditor from '@lib/components/ThemedEditor';
import { SocketIOArgument } from '@shared/types';
import { useRef } from 'react';
import * as monaco from 'monaco-editor';
import { css } from '@styled-system/css';
import Select from '@lib/components/Select';
import CompactSelect from '@lib/components/CompactSelect';
import { container, containerActions, containerLeft, editorContainer, header } from './argumentStyles';
import { OptionProps } from '@lib/components/Menu/Option';
import ThemeIcon from '@lib/components/ThemeIcon';
import { IconArrowDown, IconArrowUp, IconTrash } from '@tabler/icons-react';
import ActionIcon from '@lib/components/ActionIcon';
import { useRealtimeMessages } from '@lib/hooks/useRealtimeMessages';

export type IOArgumentEditorProps = {
    data: SocketIOArgument;
    index: number;
}

const types: OptionProps[] = [
    {
        label: 'JSON',
        value: 'json',
    },
    {
        label: 'String',
        value: 'string',
    },
    {
        label: 'Number',
        value: 'number',
    },
    {
        label: 'Boolean',
        value: 'boolean',
    },
]

export default function IOArgumentEditor({ data, index }: IOArgumentEditorProps) {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    const msg = useRealtimeMessages();

    return (
        <div className={container}>
            <div className={header}>
                <div className={containerLeft}>
                    <CompactSelect
                        options={types}
                        value={data.type}
                        onChange={(value) => msg?.setFieldValue(`activeMessage.args.${index}.type`, value)}
                        variant='subtle'
                    />
                </div>
                <div className={containerActions}>
                    <ActionIcon icon={IconArrowUp} size={14} />
                    <ActionIcon icon={IconArrowDown} size={14} />
                    <ActionIcon icon={IconTrash} size={14} onClick={() => msg?.removeListItem('activeMessage.args', index)} />
                </div>
            </div>
            <div className={editorContainer({ type: (data.type === 'number' || data.type === 'boolean') ? 'short' : 'long' })}>
                <ThemedEditor
                    height="100%"
                    // className={editor}
                    defaultLanguage="json"
                    defaultValue=""
                    // onChange={(value) => msg?.setFieldValue('activeMessage.data', value ?? '')}
                    onMount={(editor, monaco) => {
                        editorRef.current = editor;
                    }}
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        lineNumbers: 'off',
                        renderLineHighlightOnlyWhenFocus: true,
                        scrollBeyondLastLine: false,
                        folding: false,
                        hideCursorInOverviewRuler: true,
                        overviewRulerBorder: false,
                        wordWrap: 'on',
                        // lineDecorationsWidth: 0,
                        // lineNumbersMinChars: 0
                    }}
                />
            </div>
        </div>
    )
}