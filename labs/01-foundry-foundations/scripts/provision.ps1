<#
.SYNOPSIS
    Provisions the Microsoft Foundry resource and project for lab 01.

.DESCRIPTION
    Creates a tagged resource group, a Foundry resource with a managed identity
    and project management enabled, a project, and a cost budget. Prints the
    project endpoint to put in .env. No secret is created or stored.

    Values are read from .env in the lab folder.
#>

[CmdletBinding()]
param(
    [string]$EnvFile = (Join-Path $PSScriptRoot '..\.env')
)

$ErrorActionPreference = 'Stop'

function Import-LabEnv {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        throw "Missing $Path. Copy .env.example to .env and fill in your values."
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

function Get-Required {
    param([hashtable]$Values, [string]$Name)

    $value = $Values[$Name]
    if (-not $value -or $value.StartsWith('<')) {
        throw "Set $Name in .env before provisioning."
    }
    return $value
}

$env_ = Import-LabEnv -Path $EnvFile

$subscriptionId = Get-Required $env_ 'AZURE_SUBSCRIPTION_ID'
$resourceGroup = Get-Required $env_ 'AZURE_RESOURCE_GROUP'
$location = Get-Required $env_ 'AZURE_LOCATION'
$resourceName = Get-Required $env_ 'FOUNDRY_RESOURCE_NAME'
$projectName = Get-Required $env_ 'FOUNDRY_PROJECT_NAME'
$expiry = Get-Required $env_ 'RESOURCE_EXPIRY'
$budgetAmount = if ($env_['BUDGET_AMOUNT']) { $env_['BUDGET_AMOUNT'] } else { '10' }

$tags = @("project=ailab", "purpose=ai103-study", "expiry=$expiry")

Write-Host "Using subscription $subscriptionId" -ForegroundColor Cyan
az account set --subscription $subscriptionId

Write-Host "Creating resource group $resourceGroup in $location" -ForegroundColor Cyan
az group create --name $resourceGroup --location $location --tags @tags --output none

Write-Host "Creating Foundry resource $resourceName" -ForegroundColor Cyan
az cognitiveservices account create `
    --name $resourceName `
    --resource-group $resourceGroup `
    --kind AIServices `
    --sku S0 `
    --location $location `
    --custom-domain $resourceName `
    --assign-identity `
    --allow-project-management true `
    --tags @tags `
    --output none

Write-Host "Creating project $projectName" -ForegroundColor Cyan
az cognitiveservices account project create `
    --name $resourceName `
    --resource-group $resourceGroup `
    --project-name $projectName `
    --location $location `
    --output none

$state = az cognitiveservices account show `
    --name $resourceName `
    --resource-group $resourceGroup `
    --query properties.provisioningState --output tsv

Write-Host "Provisioning state: $state"

# A budget is created before any model deployment so cost cannot grow silently.
$startDate = (Get-Date -Day 1).ToString('yyyy-MM-dd')
$endDate = (Get-Date -Day 1).AddYears(1).ToString('yyyy-MM-dd')

Write-Host "Creating budget ailab-$projectName ($budgetAmount)" -ForegroundColor Cyan
try {
    az consumption budget create `
        --budget-name "ailab-$projectName" `
        --amount $budgetAmount `
        --category cost `
        --time-grain monthly `
        --start-date $startDate `
        --end-date $endDate `
        --resource-group $resourceGroup `
        --output none
    Write-Host "Budget created. Add an alert threshold in Cost Management so it notifies you." -ForegroundColor Yellow
}
catch {
    Write-Warning "Budget creation failed (the command is in preview). Create the budget and its alert in Cost Management before sustained use."
}

$endpoint = "https://$resourceName.services.ai.azure.com/api/projects/$projectName"
Write-Host ''
Write-Host "Put this in .env as FOUNDRY_PROJECT_ENDPOINT:" -ForegroundColor Green
Write-Host $endpoint
Write-Host ''
Write-Host "Next: python verify.py" -ForegroundColor Green
