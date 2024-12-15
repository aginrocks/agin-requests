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
            // Remove the existing language class
            codeRef.current.className = '';
            codeRef.current.classList.add(language);

            // Highlight the code block
            hljs.highlightElement(codeRef.current);
        }
    }, [code, language]);

    return (
        <pre>
            <code ref={codeRef} className={language}>
                {code}
            </code>
        </pre>
    );
};

export default Highlight;
