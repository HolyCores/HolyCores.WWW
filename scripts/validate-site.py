"""Validate local page and asset URLs, including HTML template contents."""
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

root = Path(sys.argv[1]).resolve()
errors = []

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('src', 'href', 'poster'):
            if key in attrs:
                self.urls.append(attrs[key])

pages = list(root.glob('*.html'))
assert (root / 'index.html').is_file(), 'Missing homepage'
assert (root / 'lab.html').is_file(), 'Missing laboratory'
for page in pages:
    parser = References()
    parser.feed(page.read_text(encoding='utf-8'))
    for url in parser.urls:
        parsed = urlsplit(url)
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue
        if parsed.path.startswith('/'):
            errors.append(f'{page.name}: root URL fails on project Pages: {url}')
            continue
        target = (page.parent / unquote(parsed.path)).resolve()
        if not target.is_relative_to(root) or not target.exists():
            errors.append(f'{page.name}: missing local target {url}')
if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'Validated {len(pages)} pages and their local asset/navigation links.')
