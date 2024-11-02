import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export default function Response() {
    const monaco = useMonaco();

    useEffect(() => {
        // monaco?.editor.defineTheme('userTheme', {

        // });
    });

    return (
        <div>
            <Editor height="100vh" defaultLanguage="javascript" defaultValue="// some comment" />
        </div>
    )
}