#!/usr/bin/env node

/**
 * Admin Setup Script
 * 
 * This script helps you set up an admin user for your website.
 * Run this script after deploying your Firebase project.
 * 
 * Usage:
 * 1. Make sure you have Firebase CLI installed: npm install -g firebase-tools
 * 2. Login to Firebase: firebase login
 * 3. Set your project: firebase use your-project-id
 * 4. Run this script: node setup-admin.js
 */

const admin = require('firebase-admin');
const readline = require('readline');

// Initialize Firebase Admin (you'll need to download your service account key)
// Download it from: Firebase Console > Project Settings > Service Accounts > Generate New Private Key
const serviceAccount = require('./path-to-your-service-account-key.json'); // Update this path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add your project ID here
  projectId: 'your-project-id' // Update this
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createAdminUser() {
  try {
    console.log('🔧 Admin User Setup for Shaun Fitzgarald Website');
    console.log('================================================\n');

    const email = await askQuestion('Enter admin email: ');
    const password = await askQuestion('Enter admin password (min 6 characters): ');

    if (password.length < 6) {
      console.log('❌ Password must be at least 6 characters long');
      rl.close();
      return;
    }

    console.log('\n⏳ Creating admin user...');

    // Create the user
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: true,
      displayName: 'Admin User'
    });

    console.log('✅ Admin user created successfully!');
    console.log(`📧 Email: ${email}`);
    console.log(`🆔 UID: ${userRecord.uid}`);

    // Set custom claims for admin role
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      admin: true,
      role: 'admin'
    });

    console.log('🔐 Admin privileges granted!');

    // Create admin user document in Firestore
    await admin.firestore().collection('admin_users').doc(userRecord.uid).set({
      email: email,
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: null
    });

    console.log('📝 Admin user document created in Firestore');

    console.log('\n🎉 Setup complete!');
    console.log('You can now login to the admin dashboard at: /admin/login');
    console.log(`Use email: ${email}`);

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    if (error.code === 'auth/email-already-exists') {
      console.log('💡 This email is already registered. You can try logging in instead.');
    }
  } finally {
    rl.close();
  }
}

// Instructions for manual setup
function showManualSetupInstructions() {
  console.log('\n📋 Manual Setup Instructions');
  console.log('============================');
  console.log('If you prefer to set up the admin user manually:');
  console.log('');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com');
  console.log('2. Select your project');
  console.log('3. Go to Authentication > Users');
  console.log('4. Click "Add user"');
  console.log('5. Enter email and password');
  console.log('6. Go to Authentication > Users > [Your User] > Custom Claims');
  console.log('7. Add custom claim: {"admin": true, "role": "admin"}');
  console.log('8. Save the changes');
  console.log('');
  console.log('Then you can login at: /admin/login');
}

async function main() {
  const choice = await askQuestion('Choose setup method:\n1. Automatic (requires service account key)\n2. Manual instructions\nEnter choice (1 or 2): ');

  if (choice === '1') {
    await createAdminUser();
  } else if (choice === '2') {
    showManualSetupInstructions();
  } else {
    console.log('Invalid choice. Exiting...');
  }
}

main().catch(console.error);
