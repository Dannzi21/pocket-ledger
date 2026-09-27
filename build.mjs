// Inline local assets so public/index.html also works when downloaded alone.
// Source modules stay separate for editing and unit tests.
import { readFile, writeFile } from 'node:fs/promises';
const read = path => readFile(new URL(path, import.meta.url), 'utf8');
let html = await read('./public/index.html');
const css = await read('./public/styles.css');
const modules = await Promise.all(['common.js', 'domain.js', 'app.js'].map(name => read('./public/' + name)));
const code = modules.map(source => source.replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]+['"];?/g, '').replace(/\bexport\s+/g, '')).join('\n');
const bundled = '(function(){\n' + code.replace('escapeHTML as h', 'escapeHTML') + '\n})();';
// Imported aliases need a local binding in the standalone bundle.
const script = '<script id="app-bundle">\n' + bundled.replace('(function(){', '(function(){\nconst h = (...args) => escapeHTML(...args);').replace(/<\/script/gi, '<\\/script') + '\n</script>';
html = html.replace(/<style id="app-styles">[\s\S]*?<\/style>/, () => '<style id="app-styles">\n' + css + '\n</style>');
html = html.replace(/<script id="app-bundle">[\s\S]*?<\/script>/, () => script);
await writeFile(new URL('./public/index.html', import.meta.url), html);
console.log('Built standalone public/index.html');
