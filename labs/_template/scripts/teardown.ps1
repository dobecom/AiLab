<#
.SYNOPSIS
    Removes everything this lab created and checks for leftovers.

.DESCRIPTION
    Copy from labs/01-foundry-foundations/scripts/teardown.ps1 and adapt.
    The teardown is part of the lab, not an optional extra.
#>

[CmdletBinding()]
param(
    [string]$EnvFile = (Join-Path $PSScriptRoot '..\.env')
)

$ErrorActionPreference = 'Stop'

throw 'Replace this template with the teardown steps for the lab.'
