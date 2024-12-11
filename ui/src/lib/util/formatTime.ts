export function formatTime(ms: number) {
    if (ms < 1000) {
        return `${ms.toFixed(2)} ms`;
    }

    const seconds = ms / 1000;
    return `${seconds.toFixed(2)} s`;
}