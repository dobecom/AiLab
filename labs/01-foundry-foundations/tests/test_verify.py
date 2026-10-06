"""Checks on the lab's own guard rails, runnable without any Azure resource."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

import pytest

LAB_ROOT = Path(__file__).resolve().parents[1]


def load_verify():
    spec = importlib.util.spec_from_file_location("lab01_verify", LAB_ROOT / "verify.py")
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    sys.modules["lab01_verify"] = module
    spec.loader.exec_module(module)
    return module


verify = load_verify()


def test_key_detection_fails_when_a_key_is_present(monkeypatch):
    monkeypatch.setenv("AZURE_OPENAI_API_KEY", "not-a-real-key")
    assert verify.check_no_keys_present() is False


def test_key_detection_passes_without_keys(monkeypatch):
    for name in verify.KEY_LIKE_VARIABLES:
        monkeypatch.delenv(name, raising=False)
    assert verify.check_no_keys_present() is True


def test_require_rejects_placeholder_values(monkeypatch):
    monkeypatch.setenv("FOUNDRY_PROJECT_ENDPOINT", "<project-endpoint>")
    with pytest.raises(SystemExit):
        verify.require("FOUNDRY_PROJECT_ENDPOINT")


def test_require_returns_configured_value(monkeypatch):
    monkeypatch.setenv(
        "FOUNDRY_PROJECT_ENDPOINT",
        "https://example.services.ai.azure.com/api/projects/demo",
    )
    assert verify.require("FOUNDRY_PROJECT_ENDPOINT").startswith("https://")


def test_env_example_contains_no_secret_values():
    text = (LAB_ROOT / ".env.example").read_text(encoding="utf-8")
    lowered = text.lower()
    assert "api_key=" not in lowered
    assert "key=" not in lowered.replace("# authentication is keyless", "")
    for line in text.splitlines():
        if "=" in line and not line.strip().startswith("#"):
            value = line.split("=", 1)[1].strip()
            assert value == "" or value.startswith("<") or len(value) <= 24, (
                f"Suspicious literal value in .env.example: {line}"
            )
