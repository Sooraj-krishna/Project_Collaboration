const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');
require('dotenv').config({ path: '.env' });

async function testFirebaseConnection() {
  console.log('🔌 Testing Firebase connection...');
  
  try {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    console.log('📋 Firebase Config:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      apiKey: firebaseConfig.apiKey ? '✅ Set' : '❌ Missing'
    });

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('✅ Firebase initialized successfully');
    
    // Test Firestore connection
    console.log('🔍 Testing Firestore connection...');
    
    try {
      // Try to access a document (this will test connectivity)
      const testDoc = doc(db, 'test', 'connection-test');
      await getDoc(testDoc);
      console.log('✅ Firestore connection successful');
    } catch (firestoreError) {
      if (firestoreError.code === 'failed-precondition') {
        console.log('⚠️  Firestore offline - this might be expected in some cases');
      } else if (firestoreError.code === 'unavailable') {
        console.log('❌ Firestore unavailable - check your internet connection');
      } else {
        console.log('❌ Firestore error:', firestoreError.code, firestoreError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
  }
}

testFirebaseConnection(); 