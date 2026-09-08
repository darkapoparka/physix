#!/usr/bin/env python3
"""Verify original frontend handoff assets without modifying any file."""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path


def main() -> int:
    root = Path(__file__).resolve().parent
    try:
        manifest = json.loads((root / "asset-manifest.json").read_text(encoding="utf-8"))
        assets = manifest["assets"]
        if not isinstance(assets, list):
            raise ValueError("Manifest assets must be a list")
        failures = 0
        for asset in assets:
            relative = asset["path"]
            path = (root / relative).resolve()
            if not path.is_relative_to(root):
                raise ValueError(f"Asset path escapes frontend/: {relative}")
            if not path.is_file():
                print(f"MISSING  {relative}")
                failures += 1
                continue
            data = path.read_bytes()
            valid = (
                len(data) == asset["bytes"]
                and hashlib.sha256(data).hexdigest() == asset["sha256"]
            )
            print(f"{'OK' if valid else 'MISMATCH'}  {relative}")
            failures += not valid
        print(f"{len(assets) - failures}/{len(assets)} original assets verified.")
        return 1 if failures else 0
    except (OSError, ValueError, KeyError, TypeError) as exc:
        print(f"Cannot verify frontend assets: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
