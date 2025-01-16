export function createPath({ path, slug }: { path?: string, slug?: string }) {
    return `${path === '' ? path : !path ? '' : `${path}/`}${slug}`;
}