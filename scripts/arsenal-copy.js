// ===========================================================================
// Terminal Data — Arsenal Page Copy Dictionary
// B2B (business/technical) vs B2C (consumer/family) variants.
// Keys match data-i18n attributes in arsenal.html
// ===========================================================================

export const ARSENAL_COPY = {
  // Hero Eyebrow
  arsenalEyebrow: {
    b2b: "PROPRIETARY TOOLCHAIN // ZERO THIRD-PARTY BLOAT",
    b2c: "CUSTOM-BUILT INSTRUMENTS // ZERO CLOUD MIDDLEMEN"
  },
  // Hero Headline
  arsenalTitle: {
    b2b: "Built at the Metal, Not Rented from the Cloud.",
    b2c: "Purpose-Built Tools Crafted for Irreplaceable Files."
  },
  // Hero Lead
  arsenalLead: {
    b2b: "Commercial SaaS platforms wrap basic file operations in bloated interfaces, recurring fees, and third-party exposure. Terminal Data engineers proprietary, zero-dependency command-line utilities that execute directly against your local filesystem—delivering deterministic speed and verifiable integrity.",
    b2c: "Off-the-shelf apps are designed for convenience, not care—often compressing your photos, locking your files into proprietary formats, or uploading them to corporate servers. We build our own precision tools from scratch to sort, clean, and protect your personal archives safely on your own hardware."
  },

  // Section 01 — Comparison Matrix
  section01Label: {
    b2b: "01 // EXECUTION PARADIGM",
    b2c: "01 // EXECUTION PARADIGM"
  },
  section01Title: {
    b2b: "Why Custom Code Outperforms Off-the-Shelf Software",
    b2c: "Why Custom Code Outperforms Off-the-Shelf Software"
  },
  pillarThroughput: {
    b2b: "Throughput & Overhead",
    b2c: "Throughput & Overhead"
  },
  pillarIntegrity: {
    b2b: "Data Integrity",
    b2c: "Data Integrity"
  },
  pillarPrivacy: {
    b2b: "Privacy & Custody",
    b2c: "Privacy & Custody"
  },
  pillarLongevity: {
    b2b: "Longevity & Ownership",
    b2c: "Longevity & Ownership"
  },
  saasThroughput: {
    b2b: "Browser/GUI bottlenecks and background telemetry slow operations to a crawl.",
    b2c: "Browser/GUI bottlenecks and background telemetry slow operations to a crawl."
  },
  customThroughput: {
    b2b: "Direct filesystem I/O processes terabytes in minutes with zero overhead.",
    b2c: "Direct filesystem I/O processes terabytes in minutes with zero overhead."
  },
  saasIntegrity: {
    b2b: "Silent metadata stripping, lossy re-encoding, and opaque black-box databases.",
    b2c: "Silent metadata stripping, lossy re-encoding, and opaque black-box databases."
  },
  customIntegrity: {
    b2b: "Bit-exact preservation with cryptographic checksum verification on every file.",
    b2c: "Bit-exact preservation with cryptographic checksum verification on every file."
  },
  saasPrivacy: {
    b2b: "Mandatory cloud uploads and third-party API exposure by design.",
    b2c: "Mandatory cloud uploads and third-party API exposure by design."
  },
  customPrivacy: {
    b2b: "100% air-gapped local execution—zero bytes leave your hardware.",
    b2c: "100% air-gapped local execution—zero bytes leave your hardware."
  },
  saasLongevity: {
    b2b: "Recurring subscriptions, deprecated APIs, and vendor lock-in.",
    b2c: "Recurring subscriptions, deprecated APIs, and vendor lock-in."
  },
  customLongevity: {
    b2b: "Self-contained, human-readable directory trees accessible for decades.",
    b2c: "Self-contained, human-readable directory trees accessible for decades."
  },

  // Section 02 — Instrument Suite
  section02Label: {
    b2b: "02 // ACTIVE INSTRUMENT SUITE",
    b2c: "02 // ACTIVE INSTRUMENT SUITE"
  },
  section02Title: {
    b2b: "Specialized Utilities for Deterministic Data Operations",
    b2c: "Specialized Utilities for Deterministic Data Operations"
  },

  // INSTRUMENT_01 — SCOUT
  scoutName: {
    b2b: "SCOUT",
    b2c: "SCOUT"
  },
  scoutSubtitle: {
    b2b: "Pre-Flight Auditor & Recon Engine (Read-Only)",
    b2c: "Pre-Flight Auditor & Recon Engine (Read-Only)"
  },
  scoutBadge: {
    b2b: "RECON",
    b2c: "RECON"
  },
  scoutDesc: {
    b2b: "Maps multi-terabyte storage footprints, isolates silent bit-rot candidates, and generates executive reconnaissance reports prior to migration without altering a single byte.",
    b2c: "Safely inventories every file across old hard drives and laptops first, flagging failing drives and storage anomalies before a single file is moved."
  },

  // INSTRUMENT_02 — TOMAHAWK
  tomahawkName: {
    b2b: "TOMAHAWK",
    b2c: "TOMAHAWK"
  },
  tomahawkSubtitle: {
    b2b: "Logistics & Transport Engine (Inbound/Outbound)",
    b2c: "Logistics & Transport Engine (Inbound/Outbound)"
  },
  tomahawkBadge: {
    b2b: "TRANSPORT",
    b2c: "TRANSPORT"
  },
  tomahawkDesc: {
    b2b: "Executes raw, verified data transport across local network nodes, staging servers, and permanent storage arrays with zero packet loss or cloud exposure.",
    b2c: "Moves massive photo libraries and archives swiftly and securely between local drives without relying on slow or insecure cloud transfers."
  },

  // INSTRUMENT_03 — SAMURAI
  samuraiName: {
    b2b: "SAMURAI",
    b2c: "SAMURAI"
  },
  samuraiSubtitle: {
    b2b: "Router & Dispatcher (Central Brain)",
    b2c: "Router & Dispatcher (Central Brain)"
  },
  samuraiBadge: {
    b2b: "ROUTING",
    b2c: "ROUTING"
  },
  samuraiDesc: {
    b2b: "Performs deep magic-byte inspection to identify true MIME types, orchestrating automated classification and dispatch across complex enterprise volumes.",
    b2c: "Automatically inspects and sorts mixed incoming files behind the scenes, routing every document, photo, and spreadsheet to its proper specialist handler."
  },

  // INSTRUMENT_04 — KATANA (Media Specialist)
  katanaName: {
    b2b: "KATANA",
    b2c: "KATANA"
  },
  katanaSubtitle: {
    b2b: "Media Specialist (Images & Videos)",
    b2c: "Media Specialist (Images & Videos)"
  },
  katanaBadge: {
    b2b: "MEDIA",
    b2c: "MEDIA"
  },
  katanaDesc: {
    b2b: "Ingests production assets into strict ISO-8601 chronological hierarchies with EXIF extraction, dynamic timestamp sorting, and dry-run safety contracts.",
    b2c: "Untangles mixed phone backups and SD cards into clean year/month/event folders automatically."
  },

  // INSTRUMENT_05 — STILETTO (PDF Specialist)
  stilettoName: {
    b2b: "STILETTO",
    b2c: "STILETTO"
  },
  stilettoSubtitle: {
    b2b: "Document Specialist (PDFs)",
    b2c: "Document Specialist (PDFs)"
  },
  stilettoBadge: {
    b2b: "DOCUMENTS",
    b2c: "DOCUMENTS"
  },
  stilettoDesc: {
    b2b: "Converts legacy scanned contracts and invoices into searchable text without cloud exposure via smart OCR fallback and table-to-CSV exporting.",
    b2c: "Turns boxes of scanned tax forms and paperwork into searchable digital records."
  },

  // INSTRUMENT_06 — SCYTHE (Tabular Data Specialist)
  scytheName: {
    b2b: "SCYTHE",
    b2c: "SCYTHE"
  },
  scytheSubtitle: {
    b2b: "Tabular Data Specialist",
    b2c: "Tabular Data Specialist"
  },
  scytheBadge: {
    b2b: "TABULAR",
    b2c: "TABULAR"
  },
  scytheDesc: {
    b2b: "Cleans and normalizes messy departmental spreadsheets and financial exports via schema validation, column alignment, and terminal summary stats.",
    b2c: "Harmonizes mixed spreadsheet formats and purges redundant tabular clutter."
  },

  // INSTRUMENT_07 — RAPIER (Text Specialist)
  rapierName: {
    b2b: "RAPIER",
    b2c: "RAPIER"
  },
  rapierSubtitle: {
    b2b: "Text Specialist (Word Docs & Text)",
    b2c: "Text Specialist (Word Docs & Text)"
  },
  rapierBadge: {
    b2b: "TEXT",
    b2c: "TEXT"
  },
  rapierDesc: {
    b2b: "Converts legacy documentation and text blocks into clean, version-control-ready Markdown with hierarchical header mapping and embedded asset extraction.",
    b2c: "Strips formatting bloat from old personal notes and text documents."
  },

  // INSTRUMENT_08 — MACHETE (Archive Specialist)
  macheteName: {
    b2b: "MACHETE",
    b2c: "MACHETE"
  },
  macheteSubtitle: {
    b2b: "Archive Specialist (Compressed & Legacy)",
    b2c: "Archive Specialist (Compressed & Legacy)"
  },
  macheteBadge: {
    b2b: "ARCHIVES",
    b2c: "ARCHIVES"
  },
  macheteDesc: {
    b2b: "Safely unpacks, audits, and prunes massive legacy archive trees via recursive decompression, hash-based duplicate purging, and junk file removal.",
    b2c: "Cleans up chaotic nested zip files and purges hidden junk files across old backups."
  },

  // Section 03 — Safety Protocol
  section03Label: {
    b2b: "03 // SAFETY PROTOCOL",
    b2c: "03 // SAFETY PROTOCOL"
  },
  section03Title: {
    b2b: "Three Non-Negotiable Engineering Rules",
    b2c: "Three Non-Negotiable Engineering Rules"
  },
  safetyRule1Title: {
    b2b: "Read-Only Discovery First",
    b2c: "Read-Only Discovery First"
  },
  safetyRule1Desc: {
    b2b: "No file is ever modified until a full pre-flight inventory is logged.",
    b2c: "No file is ever modified until a full pre-flight inventory is logged."
  },
  safetyRule2Title: {
    b2b: "Non-Destructive Execution",
    b2c: "Non-Destructive Execution"
  },
  safetyRule2Desc: {
    b2b: "Operations default to verified copy-and-hash workflows rather than in-place overwrites.",
    b2c: "Operations default to verified copy-and-hash workflows rather than in-place overwrites."
  },
  safetyRule3Title: {
    b2b: "Plain-Text Audit Manifests",
    b2c: "Plain-Text Audit Manifests"
  },
  safetyRule3Desc: {
    b2b: "Clients receive a human-readable ledger detailing every file processed, moved, or deduplicated.",
    b2c: "Clients receive a human-readable ledger detailing every file processed, moved, or deduplicated."
  },

  // CTA
  arsenalCtaEyebrow: {
    b2b: "INITIAL DIAGNOSTIC // NO OBLIGATION",
    b2c: "FREE CONSULTATION // NO PRESSURE"
  },
  arsenalCtaTitle: {
    b2b: "Start with a Free 30-Minute Data & Storage Triage",
    b2c: "Start with a Free 30-Minute Photo & File Checkup"
  },
  arsenalCtaBody: {
    b2b: "Not sure what is sitting on your old drives or how to structure a growing archive? We will map out your current storage footprint, identify silent data-rot risks, and hand you a plain-English action plan.",
    b2c: "Not sure what is trapped on a drawer full of old hard drives or laptops? We will review what you have, flag any failing drives before memories are lost, and give you a simple plan to get everything organized."
  },
  arsenalCtaBtn: {
    b2b: "Request Consultation via Email",
    b2c: "Request Consultation via Email"
  },
  arsenalCtaMailtoSubject: {
    b2b: "Terminal Data - Free Business Triage",
    b2c: "Terminal Data - Free Personal Checkup"
  }
};
