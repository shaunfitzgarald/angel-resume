import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

// Generate a unique session ID for this user session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Get user fingerprint for anonymous tracking
const getUserFingerprint = () => {
  let fingerprint = localStorage.getItem('user_fingerprint');
  if (!fingerprint) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('User fingerprint', 2, 2);
    
    fingerprint = `${navigator.userAgent}_${window.screen.width}x${window.screen.height}_${navigator.language}_${canvas.toDataURL().slice(-50)}`;
    localStorage.setItem('user_fingerprint', fingerprint);
  }
  return fingerprint;
};

// Track page views
export const trackPageView = async (pagePath, pageTitle) => {
  try {
    const sessionId = getSessionId();
    const fingerprint = getUserFingerprint();
    
    await addDoc(collection(db, 'analytics'), {
      type: 'page_view',
      page: pagePath,
      title: pageTitle,
      timestamp: serverTimestamp(),
      sessionId: sessionId,
      fingerprint: fingerprint,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      url: window.location.href
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
    const sessionId = getSessionId();
    const fingerprint = getUserFingerprint();
    
    await addDoc(collection(db, 'chat_sessions'), {
      ...sessionData,
      sessionId: sessionId,
      fingerprint: fingerprint,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      url: window.location.href
    });
  } catch (error) {
    console.error('Error tracking chat session:', error);
  }
};

// Start a new chat session
export const startChatSession = async (sessionId) => {
  try {
    const fingerprint = getUserFingerprint();
    
    await addDoc(collection(db, 'chat_sessions'), {
      sessionId: sessionId,
      fingerprint: fingerprint,
      startTime: serverTimestamp(),
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      url: window.location.href,
      status: 'active',
      messageCount: 0,
      messages: []
    });
  } catch (error) {
    console.error('Error starting chat session:', error);
  }
};

// Update chat session with new message
export const updateChatSession = async (sessionId, messageData) => {
  try {
    // Find the session document
    const sessionsRef = collection(db, 'chat_sessions');
    const sessionQuery = await getDocs(query(sessionsRef, where('sessionId', '==', sessionId), limit(1)));
    
    if (!sessionQuery.empty) {
      const sessionDoc = sessionQuery.docs[0];
      const sessionData = sessionDoc.data();
      
      await updateDoc(doc(db, 'chat_sessions', sessionDoc.id), {
        lastActivity: serverTimestamp(),
        messageCount: (sessionData.messageCount || 0) + 1,
        messages: [...(sessionData.messages || []), {
          ...messageData,
          timestamp: serverTimestamp()
        }]
      });
    }
  } catch (error) {
    console.error('Error updating chat session:', error);
  }
};

// End chat session
export const endChatSession = async (sessionId, endData = {}) => {
  try {
    const sessionsRef = collection(db, 'chat_sessions');
    const sessionQuery = await getDocs(query(sessionsRef, where('sessionId', '==', sessionId), limit(1)));
    
    if (!sessionQuery.empty) {
      const sessionDoc = sessionQuery.docs[0];
      const sessionData = sessionDoc.data();
      
      const duration = Date.now() - (sessionData.startTime?.toDate?.() || new Date()).getTime();
      
      await updateDoc(doc(db, 'chat_sessions', sessionDoc.id), {
        endTime: serverTimestamp(),
        duration: duration,
        status: 'ended',
        ...endData
      });
    }
  } catch (error) {
    console.error('Error ending chat session:', error);
  }
};

// Track custom events
export const trackEvent = async (eventType, eventData = {}) => {
  try {
    const sessionId = getSessionId();
    const fingerprint = getUserFingerprint();
    
    await addDoc(collection(db, 'analytics'), {
      type: 'custom_event',
      event: eventType,
      data: eventData,
      sessionId: sessionId,
      fingerprint: fingerprint,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      url: window.location.href
    });
  } catch (error) {
    console.error('Error tracking custom event:', error);
  }
};

// Track user interactions
export const trackUserInteraction = async (interactionType, data = {}) => {
  try {
    const sessionId = getSessionId();
    const fingerprint = getUserFingerprint();
    
    await addDoc(collection(db, 'analytics'), {
      type: 'user_interaction',
      interaction: interactionType,
      data: data,
      sessionId: sessionId,
      fingerprint: fingerprint,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      url: window.location.href
    });
  } catch (error) {
    console.error('Error tracking user interaction:', error);
  }
};

// Track button clicks
export const trackButtonClick = async (buttonName, page, data = {}) => {
  await trackUserInteraction('button_click', {
    buttonName,
    page,
    ...data
  });
};

// Track form submissions
export const trackFormSubmission = async (formName, page, data = {}) => {
  await trackUserInteraction('form_submission', {
    formName,
    page,
    ...data
  });
};

// Track link clicks
export const trackLinkClick = async (linkText, linkUrl, page) => {
  await trackUserInteraction('link_click', {
    linkText,
    linkUrl,
    page
  });
};

// Track scroll depth
export const trackScrollDepth = async (depth, page) => {
  await trackUserInteraction('scroll_depth', {
    depth,
    page
  });
};

// Track time on page
export const trackTimeOnPage = async (timeSpent, page) => {
  await trackUserInteraction('time_on_page', {
    timeSpent,
    page
  });
};
