# MedAI: Healthcare Professional Assistant Platform

MedAI is an advanced platform for healthcare professionals that combines AI-powered patient interactions, telemedicine capabilities, and medical decision-making training. The application helps doctors manage patient interactions, review intake data, conduct telemedicine sessions, and train AI assistants with their medical expertise.

## Features

- **AI Training**: Train the AI assistant with your unique medical decision-making style using HPI samples and typical responses
- **Voice Recognition**: Capture and process patient interactions using Web Speech API with both text and voice input
- **Telemedicine**: Conduct virtual patient visits with configurable parameters and simulated scenarios
- **Patient Data Management**: Review and manage patient information, symptoms, history, and medications
- **EMR Integration**: Export patient data to Electronic Medical Record systems like Athena Health and Cerner
- **Follow-up Scheduling**: Schedule and manage patient follow-up calls and appointments
- **Voice Model Training**: Create custom AI voices for your virtual assistant using audio samples

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui components
- **Backend**: Firebase Firestore for data storage, Vercel serverless functions
- **Workflow Automation**: n8n for webhook integrations and data processing
- **Authentication**: Form-based authentication with security best practices
- **Deployment**: Lovable platform for easy deployment and collaboration

## Getting Started

### Prerequisites

- Node.js & npm (recommended to install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Docker (for running n8n workflow automation)

### Installation

1. Clone the repository:
   ```sh
   git clone <YOUR_REPOSITORY_URL>
   cd med-ai-entry
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   VITE_N8N_URL=http://localhost:5678
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY=your-private-key
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```
   The application will be available at http://localhost:8080

5. Start n8n for workflow automation:
   ```sh
   docker-compose up -d
   ```
   The n8n interface will be available at http://localhost:5678 (admin/password)

## Workflow Integration

MedAI integrates with n8n for workflow automation, particularly for:

1. Processing voice and text inputs from patient interactions
2. Exporting patient data to EMR systems in appropriate formats (FHIR, HL7)

For detailed setup instructions, see [README-n8n-setup.md](README-n8n-setup.md)

## Project Structure

- `/src`: Main application source code
  - `/components`: Reusable UI components
  - `/pages`: Application pages and routes
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions
  - `/types`: TypeScript type definitions
- `/api`: Serverless API endpoints
- `/public`: Static assets

## Development

- **Development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Development build**: `npm run build:dev`
- **Linting**: `npm run lint`
- **Formatting**: `npm run format`
- **Testing**: `npm run test`

## Deployment

The application can be deployed through the Lovable platform:

1. Open [Lovable](https://lovable.dev/projects/7e293cd0-d505-4ced-88d1-bef9942b7c13)
2. Click on Share -> Publish

You can also connect a custom domain by navigating to Project > Settings > Domains in the Lovable platform.

## Contributing

You can contribute to this project in several ways:

1. **Use Lovable**: Visit the [Lovable Project](https://lovable.dev/projects/7e293cd0-d505-4ced-88d1-bef9942b7c13) and start prompting. Changes made via Lovable will be committed automatically.

2. **Use your preferred IDE**: Clone this repo and push changes. Pushed changes will also be reflected in Lovable.

3. **Edit directly in GitHub**: Navigate to the desired file(s), click the "Edit" button, make your changes and commit.

4. **Use GitHub Codespaces**: Launch a new Codespace environment from the repository page.

## License

This project is proprietary and confidential.
