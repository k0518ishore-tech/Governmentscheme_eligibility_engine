---
language:
- en
- hi
license: apache-2.0
task_categories:
- text-generation
- question-answering
tags:
- india
- government-schemes
- instruction-tuning
- multilingual
- hindi
- yojana
- welfare
pretty_name: Yojana Sahayak Instruct
size_categories:
- 10K<n<100K
---

# Yojana Sahayak Instruct Dataset

## Overview

Instruction-tuning dataset for building an AI assistant that helps Indian citizens
find and understand government welfare schemes in English and Hindi (Hinglish).

Built as part of the **Yojana Sahayak** project — a multilingual voice assistant
for Indian government schemes using fine-tuned LLMs + RAG + Whisper ASR.

## Dataset Stats

| Split | Records |
|-------|---------|
| Train | ~31,965 |
| Eval  | ~7,992  |
| **Total** | **~39,957** |

| Language | Count |
|----------|-------|
| English  | ~20,961 |
| Hindi / Hinglish | ~18,996 |

## Data Source

- Raw PDFs: [shrijayan/gov_myscheme](https://huggingface.co/datasets/shrijayan/gov_myscheme)
  (scraped from [myscheme.gov.in](https://www.myscheme.gov.in))
- 2,872 Indian government schemes across central and state governments

## Format

Each record contains a `messages` list in chat format (system / user / assistant):

```json
{
  "language": "hi",
  "scheme_name": "PM Kisan Samman Nidhi",
  "field": "eligibility",
  "messages": [
    {"role": "system", "content": "You are Yojana Sahayak..."},
    {"role": "user",   "content": "PM Kisan ke liye kaun eligible hai?"},
    {"role": "assistant", "content": "PM Kisan ke liye yeh log apply kar sakte hain: ..."}
  ]
}
```

## Fields Covered

- `description` — what the scheme is
- `eligibility` — who can apply
- `benefits` — what you receive
- `application_process` — how to apply
- `multi_turn` — two-turn eligibility → benefits conversations

## Intended Use

- Fine-tuning small LLMs (Qwen2.5-1.5B, Llama 3.2 1B) for scheme Q&A
- Building RAG pipelines over scheme documents
- Training multilingual chatbots for citizen services

## Usage

```python
from datasets import load_dataset

ds = load_dataset("Subh24ai/yojana-sahayak-instruct")
print(ds["train"][0])
```

## License

Apache 2.0. Original data sourced from Indian government's public MyScheme portal.

## Citation

If you use this dataset, please cite the original MyScheme data source:
> MyScheme, Government of India. https://www.myscheme.gov.in
