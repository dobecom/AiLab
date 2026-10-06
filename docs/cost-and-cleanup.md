# Cost and cleanup

"A Foundry project only bills for what I use" is half true. The project itself
is a container, but several things attached to it keep charging whether or not
anyone calls them.

## Usually usage-based

| Item | Billed on |
| --- | --- |
| Standard / serverless model inference | Input and output tokens |
| Vision, Speech and Language API calls | Transactions or audio minutes |
| Document Intelligence | Pages processed |

## Charges while idle

| Item | Why it keeps costing |
| --- | --- |
| Managed compute deployments | Billed per hour while the endpoint exists |
| Azure AI Search | Billed by service tier, continuously |
| Provisioned throughput and commitment tiers | Fixed reserved capacity |
| Fine-tuned model hosting | Hourly hosting on top of training and inference |
| Storage, Log Analytics, Application Insights | Per GB stored and ingested |

A single forgotten Azure AI Search service costs more over a month than every
token an exam-preparation lab will ever spend. Delete it when the lab is done.

## Required for every lab

1. State the expected billing meters in the lab README.
2. Use the smallest SKU and capacity that still demonstrates the skill.
3. Create a budget with an alert **before** sustained use.
4. Tag every resource:

   ```text
   project=ailab
   purpose=ai103-study
   expiry=<YYYY-MM-DD>
   ```

5. Provide a teardown command in `scripts/teardown.ps1`.
6. Check for leftovers after deletion.
7. Record the real cost by resource and meter in Cost Management.

## Leftover checks

```powershell
az resource list --tag purpose=ai103-study --output table
az cognitiveservices account list --output table
az cognitiveservices account list-deleted --output table
az search service list --output table
```

Azure AI Services accounts are soft-deleted and keep their name reserved. Purge
only when you are sure:

```powershell
az cognitiveservices account purge `
  --name <resource-name> `
  --resource-group <resource-group> `
  --location <location>
```

## Habit

Run the leftover checks at the end of every working session, not at the end of
the month. The cheapest resource is the one that was deleted the same day it
stopped being useful.
