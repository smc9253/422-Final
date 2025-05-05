# Document Parser

A **Node.js** service that:

1. **Watches** a folder (`inbound/`) for new `.csv` files  
2. **Parses** each CSV (header row → JSON keys) into a pretty‐printed `.json` in `outbound/`  
3. **Moves** the original `.csv` into `processed/`  

---

## Prerequisites

- **Node.js** v14.x or higher  
- **npm**  
- **Docker & Docker Compose**

---

## Installation

```bash
git clone https://github.com/smc9253/422-Final
npm install
```
---

# Configuration
Edit config.json (paths relative to src/):
```json
{
  "watched":   "../inbound",
  "output":    "../outbound",
  "processed": "../processed"
}
```

Create those folders if they don’t exist:
```bash
mkdir -p /inbound /outbound /processed
```

---

# CSV -> JSON Formats
Input CSV must be UTF-8, comma-delimited, with a header row.
Output JSON is a 2-space–indented array of objects

---

# Run Locally
node src/service.js
Drop .csv into data/inbound
Watch for .json in data/outbound and moved .csv in data/processed

---

# Docker Compose

## docker-compose.yml
version: "3.8"
services:
  parser:
    build: .
    volumes:
      - ./inbound:/usr/src/app/inbound
      - ./outbound:/usr/src/app/outbound
      - ./processed:/usr/src/app/processed
    command: node src/service.js

---

```bash
docker-compose up -d --build
docker-compose logs -f parser
```

---

# Testing

```bash
npm test
```

Contains Jest tests for:
parser (JSON creation, CSV move)

---

# Logging
The code uses:
console.info (startup, watching)
console.log (folder creation, parse success)
console.warn (empty CSV)
console.error (parse or I/O failures)