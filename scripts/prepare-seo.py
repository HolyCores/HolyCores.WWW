"""Generate deterministic SEO metadata for the static bilingual website."""
from pathlib import Path
from html import escape, unescape
import json,re,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parent.parent
SITE=ROOT/'site'
BASE='https://holycores.com/'
CONFIG=json.loads((ROOT/'scripts/seo-pages.json').read_text(encoding='utf-8'))
PRIVATE={'home-motion-preview.html','career-details.html','en-career-details.html','lab-quantum-optics.html','lab-metasurface-chip.html','404.html'}
def url(name):return BASE if name=='index.html' else BASE+name
def pair(name):
 if name in {'chat.html','en-chat.html'}:return None
 if name=='index.html':return 'en.html'
 if name=='en.html':return 'index.html'
 return name[3:] if name.startswith('en-') else 'en-'+name
indexed=[]
for path in sorted(SITE.glob('*.html')):
 name=path.name;s=path.read_text(encoding='utf-8-sig')
 en=name.startswith('en-') or name=='en.html';lang='en' if en else 'zh-CN'
 s=re.sub(r'<html\b[^>]*>',f'<html lang="{lang}">',s,count=1)
 head=re.search(r'<head>(.*?)</head>',s,re.S).group(1)
 original=re.search(r'<title>(.*?)</title>',head,re.S)
 title=CONFIG.get(name,{}).get('title',unescape(original.group(1)) if original else 'HOLYCORES')
 description=CONFIG.get(name,{}).get('description')
 if not description:
  match=re.search(r'<meta\s+name="description"\s+content="([^"]*)"',head)
  description=unescape(match.group(1)) if match else ('HOLYCORES information and resources.' if en else 'HOLYCORES 信息与资源。')
 head=re.sub(r'\n?<!-- SEO:START -->.*?<!-- SEO:END -->\n?', '\n', head,flags=re.S)
 # Replace existing metadata to ensure there is exactly one source of truth.
 head=re.sub(r'<title>.*?</title>','',head,flags=re.S)
 head=re.sub(r'<meta\b(?=[^>]*(?:name|property)=["\'](?:description|robots|og:[^"\']+|twitter:[^"\']+)["\'])[^>]*>','',head,flags=re.I)
 head=re.sub(r'<link\b(?=[^>]*rel=["\'](?:canonical|alternate)["\'])[^>]*>','',head,flags=re.I)
 canonical=url(name);other=pair(name);is_public=name not in PRIVATE
 image='assets/img/page/helios-chip-hero-metrology-2026.jpg'
 for candidate in re.findall(r'<img[^>]+src="([^"]+)"',s):
  if 'assets/img/page/' in candidate and not candidate.startswith('data:'):image=candidate.split('?')[0];break
 tags=[f'<title>{escape(title)}</title>',f'<meta name="description" content="{escape(description,quote=True)}">',f'<meta name="robots" content="'+('index, follow, max-image-preview:large' if is_public else 'noindex, follow')+'">',f'<link rel="canonical" href="{canonical}">']
 if is_public and other and (SITE/other).exists():
  zh=other if en else name;eng=name if en else other
  tags += [f'<link rel="alternate" hreflang="{l}" href="{url(n)}">' for l,n in [('zh-CN',zh),('en',eng),('x-default',zh)]]
  # Fix visible language switch links without modifying unrelated product links.
  s=re.sub(r'<a([^>]*?)href="[^"]+"([^>]*?)>(EN|ENGLISH|中文|Chinese)</a>',lambda m:f'<a{m[1]}href="{other}"{m[2]}>{m[3]}</a>',s)
 for key,value in [('og:type','website'),('og:site_name','HOLYCORES'),('og:title',title),('og:description',description),('og:url',canonical),('og:locale','en_US' if en else 'zh_CN'),('og:image',BASE+image),('og:image:alt',title)]:tags.append(f'<meta property="{key}" content="{escape(value,quote=True)}">')
 for key,value in [('twitter:card','summary_large_image'),('twitter:title',title),('twitter:description',description),('twitter:image',BASE+image)]:tags.append(f'<meta name="{key}" content="{escape(value,quote=True)}">')
 if is_public:
  org={'@type':'Organization','@id':BASE+'#organization','name':'HOLYCORES','url':BASE,'logo':BASE+'assets/brand/logo-1.0.svg','email':'hello@holycores.com'}
  website={'@type':'WebSite','@id':BASE+'#website','url':BASE,'name':'HOLYCORES','publisher':{'@id':BASE+'#organization'},'inLanguage':['zh-CN','en']}
  page={'@type':'ContactPage' if 'contact' in name else 'AboutPage' if 'company' in name else 'WebPage','@id':canonical+'#webpage','url':canonical,'name':title,'description':description,'inLanguage':lang,'isPartOf':{'@id':BASE+'#website'}}
  tags.append('<script type="application/ld+json">'+json.dumps({'@context':'https://schema.org','@graph':[org,website,page]},ensure_ascii=True,separators=(',',':'))+'</script>')
  indexed.append((name,other))
 head=re.sub(r'(?m)^[ \t]+$', '', head)
 head=re.sub(r'\n{3,}', '\n\n', head)
 newhead=head.rstrip()+'\n<!-- SEO:START -->\n'+'\n'.join(tags)+'\n<!-- SEO:END -->\n'
 s=re.sub(r'<head>.*?</head>',lambda m:'<head>'+newhead+'</head>',s,count=1,flags=re.S)
 # Decode offscreen photography asynchronously. Keep eager hero images eager.
 s=re.sub(r'<img\b[^>]*>',lambda m:m[0][:-1]+(' decoding="async"' if 'decoding=' not in m[0] else '')+(' fetchpriority="high"' if 'loading="eager"' in m[0] and 'fetchpriority=' not in m[0] else '')+'>',s)
 path.write_text(s,encoding='utf-8')
ns='http://www.sitemaps.org/schemas/sitemap/0.9';xh='http://www.w3.org/1999/xhtml';ET.register_namespace('',ns);ET.register_namespace('xhtml',xh);tree=ET.Element('{'+ns+'}urlset')
for name,other in indexed:
 node=ET.SubElement(tree,'{'+ns+'}url');ET.SubElement(node,'{'+ns+'}loc').text=url(name)
 if other and (SITE/other).exists():
  en=name.startswith('en-') or name=='en.html';zh=other if en else name;eng=name if en else other
  for l,n in [('zh-CN',zh),('en',eng),('x-default',zh)]:ET.SubElement(node,'{'+xh+'}link',{'rel':'alternate','hreflang':l,'href':url(n)})
ET.indent(tree);ET.ElementTree(tree).write(SITE/'sitemap.xml',encoding='utf-8',xml_declaration=True)
(SITE/'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: '+BASE+'sitemap.xml\n',encoding='utf-8')
print(f'SEO: {len(indexed)} indexable pages; canonical, language, social and structured metadata generated.')
