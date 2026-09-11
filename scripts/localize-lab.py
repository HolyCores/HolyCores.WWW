"""Keep the English quantum renderer in sync with the shared Chinese source."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
translations = {}
for line in (root / 'scripts/lab-en.tsv').read_text(encoding='utf-8-sig').splitlines():
    if line.strip():
        source, target = line.split('\t', 1)
        translations[source] = target

def translate(text):
    for source in sorted(translations, key=len, reverse=True):
        text = text.replace(source, translations[source])
    return text

renderer = translate((root / 'site/assets/quantum-optics.js').read_text(encoding='utf-8'))
page_path = root / 'site/en-lab.html'
page = translate(page_path.read_text(encoding='utf-8'))
page = page.replace('Interactive demonstrations are in Chinese.', 'Explore both interactive experiments below.')
page = re.sub(r'assets/quantum-optics(?:\.en)?\.js\?v=[^"\s]+',
              'assets/quantum-optics.en.js?v=20260911-reference-mirror', page)
for name, text in [('English page', page), ('English renderer', renderer)]:
    remaining = re.findall(r'[^<>\n]{0,40}[\u4e00-\u9fff]+[^<>\n]{0,70}', text)
    if remaining:
        raise ValueError(f'{name}: untranslated text: {remaining}')
(root / 'site/assets/quantum-optics.en.js').write_text(renderer, encoding='utf-8')
page_path.write_text(page, encoding='utf-8')
print('English laboratory: controls, dialogs, canvas labels and dynamic states translated.')
