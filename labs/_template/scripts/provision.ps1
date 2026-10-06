<#
.SYNOPSIS
    Provisions the Azure resources this lab needs.

.DESCRIPTION
    Copy from labs/01-foundry-foundations/scripts/provision.ps1 and adapt.
    Always tag resources with project=ailab, purpose=ai103-study and an expiry,
    and create a budget before any sustained use.
#>

[CmdletBinding()]
param(
    [string]$EnvFile = (Join-Path $PSScriptRoot '..\.env')
)

$ErrorActionPreference = 'Stop'

throw 'Replace this template with the provisioning steps for the lab.'
