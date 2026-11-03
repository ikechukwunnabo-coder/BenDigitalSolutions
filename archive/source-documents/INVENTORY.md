# Source Document Inventory

Project: Ben Digital Solutions — Digital Business Platform Development
Archive location: `archive/source-documents/`
Archive date: 2026-10-31
Archived by: Phase 0 setup (AI-assisted, for Project Manager review)

## Purpose

This inventory provides traceability between the original `.docx` source documents and
their Markdown working copies. The source files are preserved byte-for-byte and must not
be edited. All active project work is performed on the Markdown copies.

## Inventory

| # | Original filename | Version | Document date | Size (bytes) | SHA-256 | Markdown working copy | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `Project Charter and Project Management Plan.docx` | 1.0 | 2026-10-31 | 47,292 | `18F9BABCDFE87067844F0C91481B651542EDC888B898D591BBF31593B2619062` | `project-management/01-initiation/project-charter.md` (Part A)<br>`project-management/02-planning/project-management-plan.md` (Part B) | Proposed — pending approval |
| 2 | `Prompt BenDigitalSolutions.docx` | 1.0 (undated) | 2026-10-31 | 46,131 | `599227C07AE236949E5BFCA9BC58D6912E322307A640F04E9280EC7F57B2DDE0` | `docs/master-engineering-prompt.md` | Governing engineering instruction |
| 3 | `BEN DIGITAL SOLUTIONS.docx` (Work Breakdown Structure) | 1.0 | 2026-10-31 | 20,943 | `55A39DDB6372C950B73E45CD2ADB9AB689DF9672554B1F78CBC19792D83BE092` | `project-management/02-planning/work-breakdown-structure.md` | Proposed baseline — pending approval |
| 4 | `How to monitor your project in practice.docx` | 1.0 (undated) | 2026-10-31 | 21,176 | `5A9C0344AA59451B5D91B1ACE4CE09FF641CBE6A5F610999BD8B93CDD14E0394` | `project-management/02-planning/monitoring-approach.md` | Guidance |
| 5 | `Project decisions.docx` | 1.0 | 2026-10-31 | 16,501 | `82DB26A7C420278B9DB113336D6F6BAD6A74CC56D761FDC1F34D2629C73F2FD8` | `project-management/01-initiation/decision-log.md` | Recorded decisions |
| 6 | `Proceed with both decisions as follows.docx` | 1.0 | 2026-10-31 | 16,759 | `CDB78C4F28FEA895B0F96E3244801FA7403794C0D994A36DC327A47AFABBF2D7` | `project-management/01-initiation/phase0-authorisation.md` | Phase 0 authorised |

## Verification

All six files were hashed before archiving and re-hashed after the move. Every SHA-256
matched. No file content was altered.

## Not archived

| Filename | Reason |
| --- | --- |
| `~$w to monitor your project in practice.docx` | Temporary Microsoft Word lock file. It is not a project document and must not be archived or committed. Word removes it when the document is closed. |

## Naming note

The Work Breakdown Structure was originally saved as `BEN DIGITAL SOLUTIONS.docx`, which is
ambiguous. Per the Phase 0 authorisation, the original filename is retained in the archive
and the working copy is named `work-breakdown-structure.md`.

## Conversion note

Conversion was performed with a one-off script that extracts paragraph and table text from
`word/document.xml`. Heading levels were inferred from numbering and styling. Content is
reproduced verbatim; only structure and whitespace were normalised. Embedded ActiveX
controls and the single embedded image in the charter are not represented in Markdown and
remain available in the archived original.

## Control rules

1. Never edit a file in this archive.
2. If a source document is superseded, add the new file here with a new row and a new hash.
3. Record every Markdown revision in `CHANGELOG.md` and in the relevant document's history.
