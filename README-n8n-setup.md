
# n8n Webhook Integration Setup

This document outlines how to set up the n8n workflows for the medical dashboard application.

## Quick Start

1. **Start n8n with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Access n8n Interface:**
   - URL: http://localhost:5678
   - Username: admin
   - Password: password

## Webhook Endpoints to Create

### 1. Chat Event Webhook (`/webhook/chat-event`)

**Purpose:** Captures voice and text input from the ChatVoicePanel component.

**Setup Steps:**
1. Create a new workflow in n8n
2. Add a **Webhook** node:
   - HTTP Method: POST
   - Path: `chat-event`
3. Add a **Function** node to process the data:
   ```javascript
   return [{
     json: {
       sessionId: $json.body.sessionId,
       text: $json.body.text,
       type: $json.body.type, // 'voice' or 'text'
       timestamp: $json.body.timestamp,
       processed: true
     }
   }];
   ```
4. Add a **HTTP Request** node or **Firestore** node to save to your sessions collection

**Expected Payload:**
```json
{
  "text": "Patient complaint about headaches",
  "type": "voice",
  "sessionId": "session_1234567890",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 2. Export Webhook (`/webhook/export`)

**Purpose:** Handles EMR export requests from the ExportModal component.

**Setup Steps:**
1. Create a new workflow in n8n
2. Add a **Webhook** node:
   - HTTP Method: POST
   - Path: `export`
3. Add a **Function** node to format data for EMR:
   ```javascript
   const target = $json.body.target;
   const sessionData = $json.body.sessionData;
   
   let formattedData = {};
   
   switch(target) {
     case 'athena':
       formattedData = {
         format: 'FHIR',
         patient: sessionData.patient || {},
         encounter: sessionData.encounter || {},
         observations: sessionData.observations || []
       };
       break;
     case 'cerner':
       formattedData = {
         format: 'HL7',
         patientData: sessionData
       };
       break;
     case 'custom':
       formattedData = sessionData;
       break;
   }
   
   return [{
     json: {
       target,
       formattedData,
       exportId: `export_${Date.now()}`
     }
   }];
   ```
4. Add **HTTP Request** nodes for each EMR endpoint:
   - Athena Sandbox: `https://api.sandbox.athenahealth.com/`
   - Cerner Sandbox: `https://fhir-open.cerner.com/`
   - Custom API: Your endpoint

**Expected Payload:**
```json
{
  "target": "athena",
  "sessionData": {
    "patient": {...},
    "transcript": [...],
    "diagnosis": "..."
  },
  "exportType": "emr",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Environment Variables for n8n

Add these to your n8n environment:
- `ATHENA_CLIENT_ID`: Your Athena Health API client ID
- `ATHENA_CLIENT_SECRET`: Your Athena Health API client secret
- `CERNER_CLIENT_ID`: Your Cerner API client ID
- `FIRESTORE_PROJECT_ID`: Your Firestore project ID (optional)

## Testing the Webhooks

You can test the webhooks using curl:

```bash
# Test chat webhook
curl -X POST http://localhost:5678/webhook/chat-event \
  -H "Content-Type: application/json" \
  -d '{"text": "Test message", "type": "text", "sessionId": "test123"}'

# Test export webhook
curl -X POST http://localhost:5678/webhook/export \
  -H "Content-Type: application/json" \
  -d '{"target": "athena", "sessionData": {"test": "data"}}'
```

## Security Notes

- Change the default username/password in production
- Use HTTPS in production
- Implement proper authentication for webhook endpoints
- Validate incoming webhook payloads
