// 공통: 큰 데이터 & 가벼운 비동기 지연(네트워크 흉내 — CPU 블로킹 아님)
const DATA = Array.from({ length: 120_000 }, (_, i) => `Item-${i}`);

export function fakeFetch(query, delay = 120) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const out = query ? DATA.filter(s => s.includes(query)) : [];
            resolve(out);
        }, delay);
    });
}

// Optional CPU spinner for synchronous demo workloads
function busySpin(ms = 0) {
    if (!ms) return;
    const now = (typeof performance !== 'undefined' ? () => performance.now() : () => Date.now());
    const end = now() + ms;
    while (now() < end) {}
}

/**
 * Expensive synchronous filter for demo (used with useDeferredValue or startTransition)
 */
export function makeBigList(v, opts = {}) {
    const { cpuMs = 0, caseInsensitive = true } = opts;
    if (!v) return [];
    const q = caseInsensitive ? String(v).toLowerCase() : String(v);
    const out = DATA.filter(item => caseInsensitive ? item.toLowerCase().includes(q) : item.includes(q));
    busySpin(cpuMs);
    return out;
}
