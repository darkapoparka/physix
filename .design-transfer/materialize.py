"""One-time, checksum-verified transfer of authored public design files.
Removes only this owned temporary transport directory after validating every file.
No network access, secrets, application install or database operation.
"""
from pathlib import Path, PurePosixPath
import base64
import hashlib
import json
import lzma
import shutil

ROOT = Path.cwd().resolve()
TEMP = ROOT / '.design-transfer'
EXPECTED = '242972ae75fffc3ac9c64f108039106344906905810c179fbcc4742c1729945a'
CANONICAL = {'AGENTS.md', 'docs/status.md', 'docs/handoff.md', 'docs/design/README.md', 'docs/README.md', 'docs/tasks.md', 'docs/design-system.md'}
parts = [TEMP / f'{i:02d}.b64' for i in range(8)]
assert {p.name for p in TEMP.iterdir()} == {p.name for p in parts} | {'materialize.py'}, 'Unexpected transport files; refusing deletion'
encoded = ''.join(''.join(p.read_text().split()) for p in parts)
compressed = base64.b64decode(encoded, validate=True)
assert hashlib.sha256(compressed).hexdigest() == EXPECTED, 'Transport checksum mismatch'
raw = lzma.decompress(compressed)
assert len(raw) < 2_000_000, 'Unexpected payload size'
payload = json.loads(raw)
writes = {}

def target(path):
    rel = PurePosixPath(path)
    assert not rel.is_absolute() and '..' not in rel.parts, 'Unsafe path'
    dest = (ROOT / path).resolve()
    assert dest.is_relative_to(ROOT), 'Path escaped repository'
    return dest

for path, record in payload['files'].items():
    assert path.startswith('docs/design/public-v2/'), 'Unexpected new-file destination'
    dest = target(path)
    data = record['text'].encode() if 'text' in record else base64.b64decode(record['base64'], validate=True)
    assert hashlib.sha256(data).hexdigest() == record['sha256'], f'File checksum mismatch: {path}'
    if dest.exists():
        assert dest.read_bytes() == data, f'Refusing to overwrite another version: {path}'
    writes[dest] = data

for change in payload['patches']:
    path = change['path']
    assert path in CANONICAL, 'Unexpected canonical document'
    dest = target(path)
    original = dest.read_bytes()
    blob = hashlib.sha1(f'blob {len(original)}\0'.encode() + original).hexdigest()
    assert blob == change['git_blob'], f'Document changed since inspection: {path}'
    if 'content' in change:
        updated = change['content']
    else:
        text = original.decode()
        assert text.count(change['find']) == 1, f'Ambiguous patch: {path}'
        updated = text.replace(change['find'], change['replace'], 1)
    writes[dest] = updated.encode()

for dest, data in writes.items():
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
shutil.rmtree(TEMP)
print(f'Validated and materialized {len(payload["files"])} public reference files and {len(payload["patches"])} document updates. Temporary transport removed.')
