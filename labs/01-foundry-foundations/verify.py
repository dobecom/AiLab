"""Lab 01 verification: prove keyless access to a Microsoft Foundry project.

Nothing sensitive is printed. The script reports whether a token could be
acquired, not the token itself.
"""

from __future__ import annotations

import os
import sys

from dotenv import load_dotenv

FOUNDRY_SCOPE = "https://ai.azure.com/.default"

KEY_LIKE_VARIABLES = (
    "AZURE_AI_API_KEY",
    "AZURE_OPENAI_API_KEY",
    "FOUNDRY_API_KEY",
    "COGNITIVE_SERVICES_KEY",
)


def require(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value or value.startswith("<"):
        raise SystemExit(
            f"Missing configuration: set {name} in .env (copy .env.example first)."
        )
    return value


def check_no_keys_present() -> bool:
    """This lab must pass without any API key being available."""
    present = [name for name in KEY_LIKE_VARIABLES if os.getenv(name)]
    if present:
        print(f"FAIL  An API key is present in the environment: {', '.join(present)}")
        print("      Remove it so the lab proves keyless authentication.")
        return False
    print("PASS  No API key in the environment; authentication must be keyless.")
    return True


def check_token() -> bool:
    from azure.core.exceptions import ClientAuthenticationError
    from azure.identity import DefaultAzureCredential

    try:
        credential = DefaultAzureCredential()
        token = credential.get_token(FOUNDRY_SCOPE)
    except ClientAuthenticationError as error:
        print("FAIL  DefaultAzureCredential could not acquire a token.")
        print(f"      Run 'az login' and try again. Reason: {error.__class__.__name__}")
        return False

    print(f"PASS  Keyless token acquired for {FOUNDRY_SCOPE} (expires_on={token.expires_on}).")
    return True


def check_project(endpoint: str) -> bool:
    from azure.core.exceptions import AzureError
    from azure.identity import DefaultAzureCredential

    try:
        from azure.ai.projects import AIProjectClient
    except ImportError:
        print("SKIP  azure-ai-projects is not installed; run pip install -r requirements.txt.")
        return False

    try:
        project = AIProjectClient(endpoint=endpoint, credential=DefaultAzureCredential())
        deployments = [deployment.name for deployment in project.deployments.list()]
    except AzureError as error:
        print("FAIL  The project endpoint did not answer.")
        print(f"      Check the endpoint, the role assignment and the region. {error.__class__.__name__}")
        return False

    if deployments:
        print(f"PASS  Project reachable. Model deployments: {', '.join(deployments)}")
    else:
        print("PASS  Project reachable. No model deployment yet (expected after lab 01).")
    return True


def main() -> int:
    load_dotenv()
    endpoint = require("FOUNDRY_PROJECT_ENDPOINT")

    results = [
        check_no_keys_present(),
        check_token(),
        check_project(endpoint),
    ]

    if all(results):
        print("\nLab 01 verification passed.")
        return 0

    print("\nLab 01 verification failed. Fix the items marked FAIL above.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
