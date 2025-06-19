// api/training.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import * as fs from 'fs';
import * as path from 'path';

if (!admin.apps.length) {
  try {
    // Try to load from service account file first
    const serviceAccountPath = path.join(process.cwd(), 'med-ai-63fe9-firebase-adminsdk-fbsvc-0ef037abde.json');
    
    if (fs.existsSync(serviceAccountPath)) {
      // Use service account file if it exists
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // Fall back to environment variables if file doesn't exist
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
      });
    }
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}
const db = admin.firestore();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { hpiSample, actions } = req.body;
    await db.collection("trainingSessions").add({
      hpiSample,
      actions,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Write failed" });
  }
} 