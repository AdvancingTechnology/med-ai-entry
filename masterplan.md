# MedAI Master Plan

## 30-second elevator pitch
MedAI is a HIPAA-ready, AI-powered virtual nurse that chats with patients, auto-builds an HPI, suggests orders, and lets doctors push a polished note straight into Athena—all in one frosted-glass web app.

## Problem & mission
- **Problem:** HPI collection drains 6-10 minutes per visit; data re-entry breeds errors.  
- **Mission:** Reclaim those minutes and feed structured, summarised data directly into the EHR—no duplicate typing.

## Target audience
- Outpatient clinicians (MD, DO, PA, NP)  
- Patients (in-office or telehealth)  
- Clinic admins configuring intake flows

## Core features
- Conversational voice/text intake  
- Real-time transcript with sentiment  
- AI HPI summary + ICD/SNOMED tagging  
- Inline order suggestions (labs, imaging)  
- Doctor dashboard with live playback  
- 1-click "Send to Athena" + audit log  
- Chat-based HPI Flow Builder

## High-level tech stack (why it fits)
- **React + Vite + shadcn/ui:** fast, responsive UI  
- **Tailwind CSS:** rapid styling, design token friendly  
- **Firebase Auth + Firestore:** serverless, HIPAA-signable BAA  
- **Vercel Functions:** low-latency FHIR calls  
- **OpenAI GPT & Whisper:** best-in-class language + speech  
- **n8n:** no-code automations (e.g., Slack alerts)

## Conceptual data model (ERD in words)
- **User** (id, role, orgId)  
- **Org** (id, name, Athena creds)  
- **HpiTemplate** (id, orgId, jsonSchema)  
- **Appointment** (id, orgId, patientId, status)  
- **Transcript** (id, appointmentId, text, sentiment)  
- **Summary** (id, appointmentId, hpi, ordersJson)  
- **AuditLog** (id, appointmentId, action, timestamp)

## UI design principles (Krug-aligned)
- Big-Bang: dashboard first, details drill-down  
- 3-click rule: any user reaches core task in ≤3 taps  
- Self-explanatory buttons ("Start Appointment", not "Submit")  
- Visible system status (recording ▸ summarising ▸ ready)

## Security & compliance
- Firebase BAA + encrypted FHIR calls  
- PHI encrypted in transit (TLS 1.3) & at rest (AES-256)  
- Role-based access + audit trail  
- Record retention: store transcripts ≥ 11 yrs (adults) / until age 30 (minors) per NC 10A NCAC 13B.3903  
- Raw audio deleted once note finalised  
- Quarterly penetration test + SOC 2 roadmap

## Phased roadmap
1. **MVP (4 weeks)**  
   - Patient intake ➜ AI summary ➜ doctor review ➜ Athena push  
2. **V1 (+6 weeks)**  
   - Live dashboard + audio playback  
   - Order recommendation engine  
3. **V2 (+3 months)**  
   - Multi-clinic orgs, SSO, analytics  
   - Spanish language intake  
4. **Future**  
   - Epic + Cerner connectors  
   - Predictive risk scoring

## Risks & mitigations
- **EHR API limits:** cache tokens, batch writes  
- **Hallucinated orders:** require explicit MD approval  
- **Voice accuracy in noisy rooms:** add push-to-talk fallback  
- **Regulatory drift:** retain health-law counsel, review quarterly

## Future expansion ideas
- "Ask the chart" LLM search across past visits  
- Patient-facing education summaries  
- Real-time CPT coding suggestions