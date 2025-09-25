import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Track page views
export const trackPageView = async (pagePath, pageTitle) => {
  try {
    await addDoc(collection(db, 'analytics'), {
      type: 'page_view',
      page: pagePath,
      title: pageTitle,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track chat interactions
export const trackChatEvent = async (eventType, data = {}) => {
  try {
    await addDoc(collection(db, 'analytics'), {
      type: 'chat_event',
      event: eventType,
      data: data,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      language: navigator.language
    });
  } catch (error) {
    console.error('Error tracking chat event:', error);
  }
};

// Track chat sessions
export const trackChatSession = async (sessionData) => {
  try {
    await addDoc(collection(db, 'chat_sessions'), {
      ...sessionData,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      language: navigator.language
    });
  } catch (error) {
    console.error('Error tracking chat session:', error);
  }
};

// Track custom events
export const trackEvent = async (eventType, eventData = {}) => {
  try {
    await addDoc(collection(db, 'analytics'), {
      type: 'custom_event',
      event: eventType,
      data: eventData,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      language: navigator.language
    });
  } catch (error) {
    console.error('Error tracking custom event:', error);
  }
};
