export function makeBigList(v, n = 30000) {
    const out = new Array(n);
    for (let i = 0; i < n; i++) out[i] = `${v}-${i}`;
    return out;
}
  