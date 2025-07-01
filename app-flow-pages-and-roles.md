# App Flow: Pages and Roles

## Site map
- `/` Home  
- `/intake` Patient chat  
- `/dashboard` Active appointments  
- `/review/:id` Summary + Athena push  
- `/builder` HPI Flow Builder  
- `/admin` Settings & audit

## Purpose of each page (1 line)
- **Home:** explain value + branch by role  
- **Intake:** collect HPI via chat/voice  
- **Dashboard:** doctor sees live transcript status  
- **Review:** approve summary, push to EHR  
- **Builder:** create intake templates  
- **Admin:** manage users, logs, billing

## User roles & access levels
| Role | Can view | Can edit |
|------|----------|----------|
| Patient | Intake | — |
| Clinician | Dashboard, Review | Send to Athena |
| Admin | All pages | Templates, Users, Logs |

## Primary user journeys (3 steps max)
1. **Patient → HPI**  
   Home ➜ Intake ➜ Submit  
2. **Doctor → Review**  
   Dashboard ➜ Review ➜ Send to Athena  
3. **Admin → Template**  
   Builder ➜ Save ➜ Publish