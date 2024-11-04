export function mapContentType(contentType?: string): 'json' | 'html' | 'javascript' | 'css' | 'xml' | '' {
    if (!contentType) return '';
    const typeMap: Record<string, 'json' | 'html' | 'javascript' | 'css' | 'xml'> = {
        'application/json': 'json',
        'text/html': 'html',
        'application/javascript': 'javascript',
        'text/javascript': 'javascript',
        'text/css': 'css',
        'application/xml': 'xml',
        'text/xml': 'xml'
    };

    return typeMap[contentType.toLowerCase()] || '';
}
