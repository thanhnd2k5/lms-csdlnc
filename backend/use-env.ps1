param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("tidb", "mysql-replication")]
  [string]$Mode
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$source = Join-Path $root ".env.$Mode"
$target = Join-Path $root ".env"

if (-not (Test-Path $source)) {
  Write-Error "Missing env preset: $source"
  exit 1
}

Copy-Item -LiteralPath $source -Destination $target -Force

$envMap = @{}
Get-Content $source | ForEach-Object {
  $line = $_.Trim()

  if (-not $line -or $line.StartsWith("#")) {
    return
  }

  $parts = $line -split "=", 2
  if ($parts.Length -eq 2) {
    $envMap[$parts[0].Trim()] = $parts[1].Trim()
  }
}

$stateFile = Join-Path $root "tmp\db-role-state.json"
$stateDir = Split-Path -Parent $stateFile

if (-not (Test-Path $stateDir)) {
  New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
}

$state = @{
  activeWriteHost = $envMap["DB_WRITE_HOST"]
  activeWritePort = [int]$envMap["DB_WRITE_PORT"]
  lastFailoverAt = $null
}

$state | ConvertTo-Json | Set-Content -LiteralPath $stateFile
Write-Output "Switched backend .env to mode: $Mode"
