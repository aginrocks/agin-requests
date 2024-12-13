import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import './theme.css';

type HighlightProps = {
    language: string;
    code: string;
};

const Highlight: React.FC<HighlightProps> = ({ language, code }) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [code]);

    return (
        <pre>
            <code ref={codeRef} className={language}>
                {code}
            </code>
        </pre>
    );
};

export default Highlight;
