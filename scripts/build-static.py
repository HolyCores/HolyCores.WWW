"""Validate and copy the standalone website to dist; never deploy."""
from pathlib import Path
import shutil
import subprocess
import sys
import os
import stat

root = Path(__file__).resolve().parent.parent
source = root / 'site'
output = root / 'dist'
subprocess.run([sys.executable, str(root / 'scripts/localize-lab.py')], check=True)
subprocess.run([sys.executable, str(root / 'scripts/prepare-seo.py')], check=True)
subprocess.run([sys.executable, str(root / 'scripts/validate-site.py'), str(source)], check=True)
subprocess.run([sys.executable, str(root / 'scripts/validate-seo.py')], check=True)
if output.is_symlink() or output.resolve() != root / 'dist':
    raise RuntimeError('Unsafe static output path')
if output.exists():
    # OneDrive may set the read-only bit on generated directories.
    def clear_readonly(function, path, exc_info):
        os.chmod(path, stat.S_IWRITE | stat.S_IREAD)
        function(path)
    shutil.rmtree(output, onerror=clear_readonly)
shutil.copytree(source, output)
(output / '.nojekyll').touch()
print(f'Static website: {output}')
