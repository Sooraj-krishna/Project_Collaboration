require('dotenv').config({ path: '.env' });

async function testFirebaseAdmin() {
  console.log('🔌 Testing Firebase Admin initialization...');
  
  try {
    // Test if environment variable is loaded
    console.log('📋 Environment check:');
    console.log('  FIREBASE_ADMIN_SDK_KEY exists:', !!process.env.FIREBASE_ADMIN_SDK_KEY);
    console.log('  FIREBASE_ADMIN_SDK_KEY length:', process.env.FIREBASE_ADMIN_SDK_KEY ? process.env.FIREBASE_ADMIN_SDK_KEY.length : 0);
    
    // Try to parse the service account
    let serviceAccount;
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY);
      console.log('✅ Service account parsed successfully');
      console.log('  Project ID:', serviceAccount.project_id);
      console.log('  Client Email:', serviceAccount.client_email);
    } catch (parseError) {
      console.error('❌ Failed to parse service account:', parseError.message);
      return;
    }
    
    // Test Firebase Admin initialization
    console.log('\n🚀 Testing Firebase Admin initialization...');
    const admin = require('firebase-admin');
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
      });
      console.log('✅ Firebase Admin app initialized');
    } else {
      console.log('✅ Firebase Admin app already exists');
    }
    
    // Test auth functionality
    console.log('\n🔐 Testing Admin Auth...');
    const adminAuth = admin.auth();
    console.log('✅ Admin Auth initialized');
    
    // Test firestore functionality
    console.log('\n📚 Testing Admin Firestore...');
    const adminFirestore = admin.firestore();
    console.log('✅ Admin Firestore initialized');
    
    console.log('\n🎉 All Firebase Admin tests passed!');
    
  } catch (error) {
    console.error('❌ Firebase Admin test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

testFirebaseAdmin(); 