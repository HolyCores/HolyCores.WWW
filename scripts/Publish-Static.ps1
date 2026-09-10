$ErrorActionPreference = 'Stop'
$siteRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$siteProject = Join-Path $siteRoot 'src/HolyCores.Web/HolyCores.Web.csproj'
$siteSource = Join-Path $siteRoot 'src/HolyCores.Web/wwwroot'
$siteArtifacts = [IO.Path]::GetFullPath((Join-Path $siteRoot 'artifacts'))
$siteOutput = [IO.Path]::GetFullPath((Join-Path $siteArtifacts 'pages'))

dotnet build $siteProject --configuration Release
if ($LASTEXITCODE -ne 0) { throw 'The .NET project build failed.' }
python (Join-Path $PSScriptRoot 'validate-site.py') $siteSource
if ($LASTEXITCODE -ne 0) { throw 'Website validation failed.' }

# Remove only this generated export, never source or arbitrary caller paths.
if ($siteOutput -ne (Join-Path $siteArtifacts 'pages') -or
    -not $siteOutput.StartsWith($siteRoot + [IO.Path]::DirectorySeparatorChar)) {
    throw 'Unsafe export path.'
}
if (Test-Path -LiteralPath $siteOutput) {
    $siteExisting = Get-Item -LiteralPath $siteOutput
    if ($siteExisting.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Export path must not be a link.' }
    Remove-Item -LiteralPath $siteOutput -Recurse -Force
}
New-Item -ItemType Directory -Path $siteOutput -Force | Out-Null
Get-ChildItem -LiteralPath $siteSource -Force | Copy-Item -Destination $siteOutput -Recurse -Force
New-Item -ItemType File -Path (Join-Path $siteOutput '.nojekyll') -Force | Out-Null
Write-Output "GitHub Pages export: $siteOutput"
