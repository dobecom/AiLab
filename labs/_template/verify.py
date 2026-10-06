"""Template verification script.

Replace the body with the smallest runnable proof that this lab works, and
keep the two rules below:

1. Never print a secret, token or connection string.
2. Exercise the expected failure path as well as the happy path.
"""

from __future__ import annotations

import os
import sys

from dotenv import load_dotenv


def require(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value or value.startswith("<"):
        raise SystemExit(f"Missing configuration: set {name} in .env (see .env.example).")
    return value


def main() -> int:
    load_dotenv()
    project_endpoint = require("FOUNDRY_PROJECT_ENDPOINT")
    print(f"Project endpoint configured: {project_endpoint}")
    print("Replace this template with the real verification for the lab.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
