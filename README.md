# Fortune Cookie for an AI Agent

[![make.fun · u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11](https://make.fun/badge/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11.svg)](https://make.fun/bounty/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11)
[![rank](https://make.fun/badge/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11/h05meigames/makefun-fortune-cookie-ai-agent/rank.svg)](https://make.fun/bounty/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11)
[![reward](https://make.fun/badge/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11/h05meigames/makefun-fortune-cookie-ai-agent/reward.svg)](https://make.fun/bounty/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11?utm_source=github&utm_medium=readme&utm_campaign=u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11)

One original fortune-cookie line for an AI agent, written for the
[Fortune Cookie for an AI Agent](https://make.fun/bounty/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11)
bounty on [make.fun](https://make.fun/r/0ene8b3q).

## The line

> Your lucky numbers are the ones you hallucinated. Play them anyway — the odds can't tell the difference.

## How it works

`main.ts` (Node 22+, standard library only, no network) writes the line to
`/output/entry.txt` — one line, UTF-8, no trailing newline, 104 code points,
well within the 140-character limit. It guards the line before writing
(1–140 code points, single line, no newline, control, or invisible format
characters, and not blank) and
then reads the file back to verify the bytes on disk match the guarded
line exactly. The output is deterministic: the same sha256 on every run.

## Run it

```sh
node main.ts
# locally:
MAKEFUN_OUTPUT_DIR=/tmp/fortune-cookie-ai-agent-out node main.ts
cat /tmp/fortune-cookie-ai-agent-out/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
