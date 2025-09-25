# Admin Dashboard Setup Guide

This guide will help you set up and use the admin dashboard for your website.

## 🚀 Features

The admin dashboard includes:

- **Messages Management**: View and manage all contact form submissions
- **Chat Analytics**: Track AI chatbot interactions and user engagement
- **Website Analytics**: Monitor page views, traffic sources, and user behavior
- **Testimonials Management**: Add, edit, and manage client testimonials
- **Public Testimonials Page**: Display testimonials on your website

## 🔧 Setup Instructions

### 1. Firebase Authentication Setup

First, you need to enable Firebase Authentication in your Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** > **Sign-in method**
4. Enable **Email/Password** authentication
5. Save the changes

### 2. Create Admin User

#### Option A: Using Firebase Console (Recommended)

1. Go to **Authentication** > **Users** in Firebase Console
2. Click **Add user**
3. Enter your admin email and password
4. Click **Add user**
5. Click on the created user
6. Go to **Custom claims** tab
7. Add the following JSON:
   ```json
   {
     "admin": true,
     "role": "admin"
   }
   ```
8. Click **Save**

#### Option B: Using the Setup Script

1. Download your Firebase service account key:
   - Go to **Project Settings** > **Service Accounts**
   - Click **Generate new private key**
   - Save the JSON file

2. Update the setup script:
   ```bash
   # Edit setup-admin.js and update these lines:
   const serviceAccount = require('./path-to-your-service-account-key.json');
   projectId: 'your-project-id'
   ```

3. Run the setup script:
   ```bash
   node setup-admin.js
   ```

### 3. Deploy Firestore Rules

Deploy the updated Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

### 4. Deploy the Application

Deploy your updated application:

```bash
npm run build
firebase deploy
```

## 🔐 Accessing the Admin Dashboard

1. Navigate to `/admin/login` on your website
2. Enter your admin email and password
3. You'll be redirected to the admin dashboard

## 📊 Using the Admin Dashboard

### Messages Management
- View all contact form submissions
- Mark messages as read/unread
- Delete messages
- View detailed message content

### Chat Analytics
- Track chatbot interactions
- Monitor session duration and message counts
- View user satisfaction metrics
- Filter by date ranges

### Website Analytics
- Monitor page views and unique visitors
- Track traffic sources
- View device type breakdowns
- Monitor recent user activity

### Testimonials Management
- Add new testimonials with client information
- Edit existing testimonials
- Control visibility (show/hide on website)
- Set ratings and project associations

## 🎨 Public Testimonials Page

The testimonials page is automatically available at `/testimonials` and displays all visible testimonials in a beautiful, responsive layout.

## 🔒 Security Features

- **Authentication Required**: All admin features require Firebase Authentication
- **Protected Routes**: Admin pages are protected and redirect to login if not authenticated
- **Firestore Rules**: Secure database rules prevent unauthorized access
- **Custom Claims**: Admin privileges are managed through Firebase custom claims

## 📱 Responsive Design

The admin dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🛠️ Troubleshooting

### Can't Access Admin Dashboard
- Verify you're logged in with the correct admin account
- Check that custom claims are set correctly
- Ensure Firestore rules are deployed

### Testimonials Not Showing
- Check that testimonials have `isVisible: true`
- Verify Firestore rules allow public read access
- Check browser console for errors

### Analytics Not Working
- Ensure Firebase Analytics is enabled
- Check that tracking events are being sent
- Verify Firestore rules for analytics collection

## 🔄 Updating the System

To update the admin system:

1. Pull the latest changes
2. Run `npm install` to update dependencies
3. Run `npm run build` to build the application
4. Deploy with `firebase deploy`

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify Firebase configuration
3. Check Firestore rules and permissions
4. Ensure all environment variables are set correctly

## 🎯 Next Steps

After setting up the admin dashboard:

1. **Add Testimonials**: Start adding client testimonials to showcase your work
2. **Monitor Analytics**: Keep an eye on website traffic and user behavior
3. **Manage Messages**: Respond to contact form submissions promptly
4. **Track Chat Performance**: Monitor how well your AI assistant is helping visitors

The admin dashboard will help you better understand your website's performance and manage client interactions effectively!
