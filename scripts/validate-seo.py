"""Validate SEO contracts and reciprocal language URLs in generated static HTML."""
from pathlib import Path
from html.parser import HTMLParser
import json,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parent.parent;SITE=ROOT/'site';BASE='https://holycores.com/'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.meta={};self.links=[];self.titles=0;self.json=[];self.injson=False;self.buf=''
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta':self.meta.setdefault(a.get('name',a.get('property','')),[]).append(a.get('content',''))
  if tag=='link':self.links.append(a)
  if tag=='title':self.titles+=1
  if tag=='script' and a.get('type')=='application/ld+json':self.injson=True;self.buf=''
 def handle_data(self,data):
  if self.injson:self.buf+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.injson:self.json.append(json.loads(self.buf));self.injson=False
pages={}
for p in SITE.glob('*.html'):
 page=Page();page.feed(p.read_text(encoding='utf-8'));pages[p.name]=page
urls=[]
for name,page in pages.items():
 assert page.titles==1,(name,'title count')
 for key in ['description','robots','og:title','og:description','og:url','og:image','twitter:card']:assert len(page.meta.get(key,[]))==1,(name,key)
 canonical=[x['href'] for x in page.links if x.get('rel')=='canonical'];assert len(canonical)==1 and canonical[0].startswith(BASE),(name,'canonical')
 assert canonical[0]==page.meta['og:url'][0],name
 image=page.meta['og:image'][0];assert (SITE/image.removeprefix(BASE)).is_file(),(name,'image')
 if 'noindex' not in page.meta['robots'][0]:
  urls.append(canonical[0]);assert len(page.json)==1,(name,'structured data')
  for alt in [x for x in page.links if x.get('hreflang')]:
   target=alt['href'].removeprefix(BASE) or 'index.html';assert target in pages,(name,target)
   back={x.get('href') for x in pages[target].links if x.get('hreflang')};assert canonical[0] in back,(name,'reciprocal',target)
actual=[node.text for node in ET.parse(SITE/'sitemap.xml').findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert set(urls)==set(actual) and len(actual)==len(set(actual)),'Sitemap mismatch'
assert BASE+'sitemap.xml' in (SITE/'robots.txt').read_text(),'robots sitemap'
print(f'SEO validation passed: {len(pages)} pages, {len(actual)} sitemap URLs, reciprocal languages, JSON-LD and social images.')
