# Implementation Plan

## Step-by-step build sequence
1. **Repo setup:** mono-repo, pnpm, commit lint  
2. **Auth:** Firebase email + roles  
3. **Intake UI:** chat bubbles, Whisper stream  
4. **LLM summary endpoint:** OpenAI, system prompt tuned  
5. **Doctor dashboard:** live transcript via Firestore onSnapshot  
6. **Athena service:** OAuth, /encounter, /chart endpoints  
7. **Audit log middleware:** write every outbound call  
8. **Order suggestion rule engine:** JSON rules → GPT review  
9. **Prod deploy:** Vercel env vars, Access Controls  
10. **HIPAA checklist & BAA signing**

## Timeline with checkpoints
| Week | Deliverable | Demo |
|------|-------------|------|
| 1 | Auth + skeleton UI | Login ✔️ |
| 2 | Voice intake → transcript | Live capture |
| 3 | GPT summary API | HPI JSON |
| 4 | Doctor dashboard + Athena push | End-to-end MVP |

## Team roles & rituals
- **CTO (you):** unblock tech, review PRs daily  
- **PM/Clinician:** weekly spec check, test scripts  
- **FE dev:** UI, accessibility  
- **BE dev:** FHIR, security  
- **QA nurse:** 3-user guerrilla tests every sprint  

Rituals: Daily 10-min stand-up · Friday demo · Fortnightly usability test.

## Optional integrations & stretch goals
- Slack "visit ready" ping  
- Twilio voice fallback  
- Stripe for future SaaS billing