# App Flow, Pages & Roles PRD

## User Role Definition
*Note: As requested, this design eliminates admin-only features. All users have equal access to all functionality.*

### Single User Role: Healthcare Provider
**Permissions:**
- Create and manage patient intakes
- Review AI-generated summaries
- Export data to EHR systems
- Access all historical data
- Modify system templates
- View audit logs

**Context:** Every user is a verified healthcare professional with full system access. Patient access is temporary and session-based only.

## Complete Site Map

```
/ (Landing/Login)
├── /dashboard (Provider Dashboard)
├── /intake/:sessionId (Patient Intake Interface)
├── /review/:appointmentId (Summary Review)
├── /history (Appointment History)
├── /templates (HPI Template Builder)
├── /settings (System Preferences)
├── /audit (Audit Trail Viewer)
└── /help (Documentation & Support)
```

## Detailed Page Specifications

### 1. Landing/Login Page (`/`)
**Purpose:** Secure entry point with role-based routing

**Key Components:**
- MedAI branding and value proposition
- Email/password login form
- "Forgot password" recovery flow
- Medical professional verification notice
- Loading states and error handling

**User Actions:**
- Log in with email/password
- Request password reset
- View system status (uptime, maintenance notices)

**Success Criteria:**
- Authenticated users redirect to dashboard
- Failed login shows clear error messages
- Password reset emails sent within 30 seconds

**Technical Notes:**
- Firebase Auth integration
- Form validation with real-time feedback
- Responsive design for mobile access
- Session management for automatic logout

---

### 2. Provider Dashboard (`/dashboard`)
**Purpose:** Central command center for all active and recent appointments

**Layout Sections:**
```
┌─────────────────┬─────────────────┐
│   Active Intakes │  Quick Actions   │
│                 │                 │
├─────────────────┼─────────────────┤
│   Recent Reviews │   Statistics    │
│                 │                 │
└─────────────────┴─────────────────┘
```

**Key Components:**
1. **Active Intakes Panel**
   - Live status of ongoing patient sessions
   - Real-time progress indicators
   - Time elapsed since session start
   - Quick access to join/monitor session

2. **Quick Actions Toolbar**
   - "Start New Intake" button
   - "Create Template" shortcut
   - "Export Recent" batch action
   - Settings gear icon

3. **Recent Reviews Section**
   - Last 10 completed appointments
   - Status indicators (exported, pending, needs review)
   - Quick action buttons (view, export, edit)
   - Search and filter functionality

4. **Statistics Overview**
   - Daily/weekly intake counts
   - Average processing time
   - Export success rate
   - AI accuracy metrics

**User Actions:**
- Start new patient intake session
- Monitor active sessions in real-time
- Quick-review completed summaries
- Batch export multiple appointments
- Access system statistics

**Data Requirements:**
- Real-time appointment status updates
- Historical performance metrics
- User preference storage
- System health indicators

---

### 3. Patient Intake Interface (`/intake/:sessionId`)
**Purpose:** Patient-facing interface for providing medical information

**Interface Modes:**
1. **Voice Mode (Primary)**
   - Large microphone button
   - Real-time transcript display
   - Interim vs final text differentiation
   - Background noise indicator

2. **Text Mode (Fallback)**
   - Chat-style interface
   - Message bubble design
   - Emoji support for engagement
   - Send button with enter key support

**Key Components:**
1. **Recording Controls**
   - Start/stop recording button
   - Visual recording indicator
   - Audio level meter
   - Push-to-talk alternative

2. **Transcript Display**
   - Scrolling conversation view
   - Timestamp markers
   - Confidence indicators
   - Edit/correction capabilities

3. **Progress Tracking**
   - Session time elapsed
   - Information completeness bar
   - Next question prompts
   - Completion status

4. **Help & Support**
   - Instructions overlay
   - Technical support chat
   - Emergency contact information
   - Accessibility options

**User Actions (Patient):**
- Provide medical history via voice
- Clarify symptoms through conversation
- Review and confirm transcript accuracy
- Submit completed intake for review

**Technical Requirements:**
- Web Speech API integration
- Real-time Firebase sync
- Cross-browser compatibility
- Mobile-responsive design
- Offline capability for basic functions

---

### 4. Summary Review Page (`/review/:appointmentId`)
**Purpose:** Provider reviews and edits AI-generated medical summaries

**Layout Structure:**
```
┌─────────────────────┬─────────────────────┐
│                     │                     │
│   Original          │   AI Generated      │
│   Transcript        │   Summary           │
│                     │                     │
├─────────────────────┼─────────────────────┤
│                     │                     │
│   Suggested         │   Export            │
│   Orders            │   Options           │
│                     │                     │
└─────────────────────┴─────────────────────┘
```

**Key Components:**
1. **Transcript Panel**
   - Full conversation history
   - Audio playback sync
   - Highlight important sections
   - Add provider notes

2. **AI Summary Panel**
   - Structured HPI output
   - Chief complaint identification
   - Symptom categorization
   - Medical history extraction
   - Editable text fields

3. **Suggested Orders Section**
   - Lab test recommendations
   - Imaging study suggestions
   - Referral recommendations
   - Medication considerations
   - Approval/rejection toggles

4. **Export Options Panel**
   - EHR system selection (Athena, Cerner, Custom)
   - Data format options (FHIR, HL7, PDF)
   - Export preview
   - Send button with confirmation

**User Actions:**
- Review AI accuracy against transcript
- Edit summary text for accuracy
- Approve/reject suggested orders
- Add additional provider notes
- Export to chosen EHR system
- Save draft for later completion

**Validation Rules:**
- Required fields must be completed
- Medical terminology spell-check
- Contraindication warnings
- Export format validation

---

### 5. Appointment History (`/history`)
**Purpose:** Searchable archive of all past appointments and exports

**Features:**
1. **Search & Filter**
   - Patient name search
   - Date range picker
   - Status filter (exported, pending, draft)
   - Provider filter
   - Tag-based organization

2. **List View**
   - Sortable columns (date, patient, status, provider)
   - Quick action buttons
   - Batch selection capability
   - Export status indicators

3. **Detail View**
   - Full appointment summary
   - Export history and timestamps
   - Audit trail access
   - Re-export capabilities

**User Actions:**
- Search historical appointments
- Bulk export selections
- View detailed appointment summaries
- Re-process old appointments
- Generate reports

---

### 6. Template Builder (`/templates`)
**Purpose:** Create and manage custom HPI collection templates

**Template Components:**
1. **Question Flow Designer**
   - Drag-and-drop question ordering
   - Conditional logic setup
   - Branching conversation paths
   - Voice prompt customization

2. **Medical Field Mapping**
   - Symptom category definitions
   - Required information checklist
   - Validation rule setup
   - Output format configuration

3. **Template Library**
   - Specialty-specific templates
   - Saved custom templates
   - Import/export template functionality
   - Version control and rollback

**User Actions:**
- Create new intake templates
- Modify existing question flows
- Test template effectiveness
- Share templates with colleagues
- Set default templates per specialty

---

### 7. System Settings (`/settings`)
**Purpose:** Configure personal and system-wide preferences

**Settings Categories:**
1. **User Preferences**
   - Dashboard layout options
   - Notification preferences
   - Default EHR selection
   - Language and timezone

2. **Integration Settings**
   - EHR connection management
   - API key configuration
   - Webhook setup
   - Export format preferences

3. **Security Settings**
   - Password change
   - Two-factor authentication
   - Session timeout preferences
   - Audit trail access

**User Actions:**
- Update personal preferences
- Configure EHR integrations
- Manage security settings
- Test system connections

---

### 8. Audit Trail Viewer (`/audit`)
**Purpose:** HIPAA-compliant logging of all system activities

**Audit Features:**
1. **Activity Log**
   - Chronological event listing
   - User action tracking
   - Data access logging
   - Export activity monitoring

2. **Compliance Reports**
   - HIPAA audit summaries
   - User activity reports
   - Data retention compliance
   - Security event alerts

**User Actions:**
- View personal activity history
- Generate compliance reports
- Search audit events
- Export audit logs

---

## Primary User Journeys

### Journey 1: Complete Intake to Export (Provider)
```
Dashboard → Start New Intake → Monitor Session → Review Summary → Export to EHR
```

**Detailed Steps:**
1. **Dashboard Entry** (10 seconds)
   - Provider logs in and sees dashboard
   - Clicks "Start New Intake" button
   - System generates unique session ID

2. **Session Setup** (30 seconds)
   - Choose intake template (or use default)
   - Generate patient access link
   - Share link with patient
   - Monitor session status

3. **Patient Intake** (3-8 minutes)
   - Patient accesses intake interface
   - Provides medical information via voice/text
   - System processes and stores conversation
   - AI generates preliminary summary

4. **Provider Review** (2-5 minutes)
   - Provider receives completion notification
   - Reviews AI-generated summary
   - Makes necessary edits and corrections
   - Approves or rejects suggested orders

5. **EHR Export** (30 seconds)
   - Selects target EHR system
   - Confirms export format
   - Triggers export process
   - Receives success confirmation

**Success Metrics:**
- Total time under 15 minutes
- Less than 2 edits needed to summary
- Export succeeds on first attempt
- No system errors or crashes

### Journey 2: Template Creation & Management
```
Dashboard → Templates → Create New → Design Flow → Test → Save → Deploy
```

**Detailed Steps:**
1. **Template Access** (15 seconds)
   - Navigate to template builder
   - Review existing templates
   - Decide to create new or modify existing

2. **Flow Design** (5-15 minutes)
   - Add questions in logical order
   - Set up conditional branching
   - Configure response validation
   - Map outputs to summary fields

3. **Testing & Refinement** (3-10 minutes)
   - Run test conversation
   - Review generated output
   - Adjust question flow as needed
   - Validate medical accuracy

4. **Deployment** (1 minute)
   - Save template with descriptive name
   - Set as default for specific cases
   - Share with team if applicable

### Journey 3: Historical Data Review
```
Dashboard → History → Search/Filter → View Details → Re-export (if needed)
```

**Detailed Steps:**
1. **Access History** (10 seconds)
   - Navigate to appointment history
   - Set relevant date range
   - Apply status filters

2. **Search & Review** (1-5 minutes)
   - Search by patient name or ID
   - Sort by relevant criteria
   - Select appointment for detailed view

3. **Detail Analysis** (2-10 minutes)
   - Review original transcript
   - Check AI summary accuracy
   - Verify export status
   - Make notes if necessary

4. **Action (if needed)** (30 seconds - 2 minutes)
   - Re-export if format changed
   - Update summary if needed
   - Flag for quality review

## Error Handling & Edge Cases

### Common Error Scenarios
1. **Voice Recognition Fails**
   - Automatic fallback to text input
   - Clear error message with next steps
   - Technical support contact information

2. **AI Processing Errors**
   - Manual summary template provided
   - Original transcript preserved
   - Option to reprocess with different settings

3. **EHR Export Failures**
   - Local save of data for retry
   - Clear error message with troubleshooting
   - Manual export options available

4. **Network Connectivity Issues**
   - Offline mode for basic functions
   - Data sync when connection restored
   - Progress preservation during outages

### Data Validation Rules
1. **Required Field Validation**
   - Chief complaint must be present
   - Patient identifier required
   - Provider approval required for export

2. **Medical Data Validation**
   - Spell-check for medical terminology
   - Drug interaction warnings
   - Contraindication alerts

3. **Export Format Validation**
   - FHIR compliance checking
   - Required fields per EHR system
   - Data format consistency

## Performance Requirements

### Page Load Times
- Dashboard: < 2 seconds
- Intake interface: < 1 second
- Review page: < 3 seconds
- Search results: < 1 second

### Real-time Features
- Voice transcription: < 500ms latency
- Status updates: < 1 second propagation
- Collaboration features: < 2 seconds sync

### Mobile Performance
- Touch targets: minimum 44px
- Responsive breakpoints: 320px, 768px, 1024px
- Offline capability: core functions available

## Security & Compliance

### Data Protection
- End-to-end encryption for all PHI
- Role-based access control
- Audit logging for all actions
- Automatic session timeout

### HIPAA Compliance
- Business Associate Agreement with all vendors
- Minimum necessary data access
- Breach notification procedures
- Employee training requirements

### Technical Security
- HTTPS/TLS 1.3 for all connections
- API rate limiting and DDoS protection
- Regular security audits and penetration testing
- Vulnerability management program