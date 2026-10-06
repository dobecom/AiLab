<#
.SYNOPSIS
    Removes everything lab 01 created and checks that nothing survived.

.DESCRIPTION
    Deletes the resource group, then reports any resource still tagged for this
    study project. Azure AI Services accounts are soft-deleted, so the name
    stays reserved until it is purged.
#>

[CmdletBinding()]
param(
    [string]$EnvFile = (Join-Path $PSScriptRoot '..\.env'),
    [switch]$Purge
)

$ErrorActionPreference = 'Stop'

function Import-LabEnv {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        throw "Missing $Path. Nothing to tear down, or restore your .env first."
    }

    $values = @{}
    foreach ($line in Get-Content $Path) {
        $trimmed = $line.Trim()
        if (-not $trimmed -or $trimmed.StartsWith('#')) { continue }
        $pair = $trimmed -split '=', 2
        if ($pair.Count -ne 2) { continue }
        $values[$pair[0].Trim()] = $pair[1].Trim()
    }
    return $values
}

$env_ = Import-LabEnv -Path $EnvFile
$subscriptionId = $env_['AZURE_SUBSCRIPTION_ID']
$resourceGroup = $env_['AZURE_RESOURCE_GROUP']
$resourceName = $env_['FOUNDRY_RESOURCE_NAME']
$location = $env_['AZURE_LOCATION']

az account set --subscription $subscriptionId

Write-Host "Deleting resource group $resourceGroup" -ForegroundColor Cyan
az group delete --name $resourceGroup --yes --output none

if ($Purge) {
    Write-Host "Purging soft-deleted account $resourceName" -ForegroundColor Cyan
    az cognitiveservices account purge `
        --name $resourceName `
        --resource-group $resourceGroup `
        --location $location `
        --output none
}

Write-Host ''
Write-Host 'Remaining resources tagged purpose=ai103-study:' -ForegroundColor Yellow
az resource list --tag purpose=ai103-study --output table

Write-Host ''
Write-Host 'Soft-deleted Cognitive Services accounts (names stay reserved):' -ForegroundColor Yellow
az cognitiveservices account list-deleted --output table

Write-Host ''
Write-Host 'Record the actual cost by meter in Cost Management before closing the lab.' -ForegroundColor Green
