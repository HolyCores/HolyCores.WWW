# Compatibility entry point: creates local files only; never deploys.
$ErrorActionPreference = 'Stop'
python (Join-Path $PSScriptRoot 'build-static.py')
if ($LASTEXITCODE -ne 0) { throw 'Static website build failed.' }
