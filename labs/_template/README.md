# Lab NN — <title>

> Documentation verified against Microsoft Learn on: <YYYY-MM-DD>
> Preview features used: <none | list them>

## Measured skill

<Which capability this proves, in one or two sentences.>

## Architecture

```text
<caller> -> <Foundry project / Azure service> -> <model or feature>
```

- Authentication: DefaultAzureCredential locally, managed identity in Azure.
- Role assigned: <built-in role and why it is the narrowest that works>

## Prerequisites

- An Azure subscription with permission to create the resources below.
- Azure CLI signed in: `az login`
- Python 3.11 or newer.

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Fill in `.env` with your own values. `.env` is ignored by Git and must stay
that way.

## Provision

```powershell
.\scripts\provision.ps1
```

## Run

```powershell
python verify.py
```

## Verification checklist

- [ ] The happy path produced the expected result.
- [ ] The expected failure path was triggered deliberately and handled.
- [ ] Least-privilege role assignment confirmed with `az role assignment list`.
- [ ] No key, token, connection string or private data was written to the repo.
- [ ] Output or trace evidence recorded (with private data removed).

## Failure scenario

<What you broke on purpose, what the error looked like, and how you fixed it.>

## Exam-style decision points

| Question | Choice | Why |
| --- | --- | --- |
| <which service or deployment option> | <what was chosen> | <reasoning> |

## Cost

| Item | Billing meter | Charged when idle? | Notes |
| --- | --- | --- | --- |
| <resource> | <meter> | <yes/no> | <smallest SKU used> |

- Budget and alert created before sustained use: <yes/no, amount>
- Tags applied: `project=ailab`, `purpose=ai103-study`, `expiry=<date>`
- Actual cost observed in Cost Management: <amount and meter>

## Teardown

```powershell
.\scripts\teardown.ps1
```

Then confirm nothing survived:

```powershell
az resource list --tag purpose=ai103-study --output table
```
