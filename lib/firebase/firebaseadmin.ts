import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY as string);
} catch (error) {
  console.error('Error parsing FIREBASE_ADMIN_SDK_KEY:', error);
  throw new Error('Invalid FIREBASE_ADMIN_SDK_KEY format');
}

if (!admin.apps.length) {
  try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
  });
    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
}

export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();
