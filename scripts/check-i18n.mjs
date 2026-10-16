import es from "../src/i18n/locales/es.json" with { type: "json" };
import en from "../src/i18n/locales/en.json" with { type: "json" };
const shape = (o, p = "") => Array.isArray(o) ? o.flatMap((v, i) => shape(v, `${p}[${i}]`))
  : o && typeof o === "object" ? Object.keys(o).sort().flatMap((k) => shape(o[k], `${p}.${k}`))
  : [`${p}:${typeof o}`];
const a = new Set(shape(es)), b = new Set(shape(en));
const diff = [...a].filter((x) => !b.has(x)).concat([...b].filter((x) => !a.has(x)));
if (diff.length) { console.error(diff.join("\n")); process.exit(1); }
console.log("i18n OK");
