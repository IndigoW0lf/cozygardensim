#!/usr/bin/env bash
set -euo pipefail
# Linux x64 CI helper; verify the archive before executing its binary.
scan_tmp_dir=$(mktemp -d)
trap 'rm -rf "$scan_tmp_dir"' EXIT
curl --fail --silent --show-error --location --retry 2 \
  https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/gitleaks_8.30.1_linux_x64.tar.gz \
  --output "$scan_tmp_dir/gitleaks.tar.gz"
printf '%s  %s\n' '551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb' "$scan_tmp_dir/gitleaks.tar.gz" | sha256sum --check --status
tar -xzf "$scan_tmp_dir/gitleaks.tar.gz" -C "$scan_tmp_dir" gitleaks
"$scan_tmp_dir/gitleaks" git --redact=100 --log-opts='--all --full-history' .
# The CI scan job has no installed dependencies or generated artifacts.
"$scan_tmp_dir/gitleaks" dir --redact=100 .
