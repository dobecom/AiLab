# AiLab labs

Python-first labs that turn each public learning module into something
reproducible. Every lab here is designed to be run from a clean environment,
verified, and then deleted.

## Layout

```text
labs/
  _template/                     copy this to start a new lab
  01-foundry-foundations/        project, keyless access, budget, teardown
```

Each lab directory is self-contained:

```text
<lab>/
  README.md          skill, architecture, steps, verification, cost, teardown
  requirements.txt   pinned Python dependencies for this lab only
  .env.example       placeholders only; never commit a real .env
  verify.py          the runnable check that proves the lab works
  scripts/           provisioning and teardown commands
  tests/             pytest for any reusable logic
```

## Running a lab

```powershell
Set-Location D:\Projects\AiLab\labs\01-foundry-foundations
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env   # fill in your own values, never commit it
az login
python verify.py
```

## Rules that apply to every lab

**Authentication**

- `DefaultAzureCredential` locally, managed identity in Azure.
- API keys only when a lab cannot be completed without one, and never in the
  browser or in Git.
- Assign the narrowest built-in role that makes the lab work.

**Cost**

Creating a Foundry project is cheap; what you attach to it is not. Each lab
README must state:

1. The expected billing meters.
2. The smallest SKU and capacity that still demonstrates the skill.
3. A budget and alert created before any sustained use.
4. Resource tags: `project=ailab`, `purpose=ai103-study`, `expiry=<date>`.
5. A teardown command.
6. A post-deletion check for leftover resources.
7. A note on where the real cost showed up in Cost Management.

Resources that keep charging while idle deserve particular attention: managed
compute, Azure AI Search, provisioned throughput, commitment tiers, fine-tuned
model hosting, and attached storage or monitoring services.

**Evidence**

A lab is done when all of the following are true:

- The README states the measured skill and the architecture.
- Setup works from a clean environment.
- No secret is in Git.
- Both the success path and an expected failure path are exercised.
- The result is demonstrable through AiLab or a documented CLI run.
- Responsible AI, observability, cost and cleanup are addressed.
- Verification evidence is recorded without publishing private data.
- Someone else could repeat it from the written steps.

**Documentation drift**

Microsoft Foundry and its SDKs change quickly. Confirm the current Microsoft
Learn documentation before running a lab, and record the date you verified it
in the lab README. Label anything that is Preview-only.
