import { useEffect, useState, useCallback } from 'react';

interface VisitorInfo {
  timestamp: string;
  userAgent: string;
  referrer: string;
  location: string;
  screenResolution: string;
  language: string;
  platform: string;
  timezone: string;
  deviceType: string;
  name?: string;
  email?: string;
  howFound?: string;
}

export const useVisitorTracking = (userData?: { name?: string; email?: string; howFound?: string }) => {
  const [hasTracked, setHasTracked] = useState(false);

  const getLocationInfo = async (): Promise<string> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return `${data.city}, ${data.region}, ${data.country_name}`;
    } catch (error) {
      return 'Location unavailable';
    }
  };

  const getDeviceType = (): string => {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return 'Mobile';
    return 'Desktop';
  };

  const sendVisitorAlert = async (visitorInfo: VisitorInfo) => {
    try {
      // Using Web3Forms (same as contact form) for email alerts
      const formData = new FormData();
      formData.append('access_key', 'bbc2460d-9b5c-47f6-aac0-82bdad208e36');
      formData.append('subject', '🚨 New Portfolio Visitor Alert!');
      formData.append('from_name', 'Portfolio Visitor Tracker');
      formData.append('email', 'noreply@portfolio.com');
      formData.append('message', `
<b>🚨 New Portfolio Visitor Alert!</b><br/><br/>
<hr/>
<b>Visitor Details:</b><br/>
🙍 <b>Name:</b> ${visitorInfo.name ? visitorInfo.name : 'Not provided'}<br/>
✉️ <b>Email:</b> ${visitorInfo.email ? visitorInfo.email : 'Not provided'}<br/>
🔎 <b>How they found you:</b> ${visitorInfo.howFound ? visitorInfo.howFound : 'Not provided'}<br/>
🕐 <b>Time:</b> ${visitorInfo.timestamp}<br/>
🌍 <b>Location:</b> ${visitorInfo.location}<br/>
🖥️ <b>Device:</b> ${visitorInfo.userAgent}<br/>
📱 <b>Screen:</b> ${visitorInfo.screenResolution}<br/>
🔗 <b>Referrer:</b> ${visitorInfo.referrer || 'Direct visit'}<br/>
🌐 <b>Language:</b> ${visitorInfo.language}<br/>
💻 <b>Platform:</b> ${visitorInfo.platform}<br/>
⏰ <b>Timezone:</b> ${visitorInfo.timezone}<br/>
📱 <b>Device Type:</b> ${visitorInfo.deviceType}<br/>
<hr/>
<small>Visit your analytics dashboard for more details.</small>
      `);

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      console.log('✅ Visitor alert sent successfully');
    } catch (error) {
      console.log('❌ Failed to send visitor alert:', error);
    }
  };

  const trackVisitor = useCallback(async () => {
    if (hasTracked) return;

    try {
      const location = await getLocationInfo();
      
      const visitorInfo: VisitorInfo = {
        timestamp: new Date().toLocaleString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        location,
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
        platform: navigator.platform,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        deviceType: getDeviceType(),
        ...userData,
      };

      // Send email alert
      await sendVisitorAlert(visitorInfo);
      
      // Mark as tracked to prevent multiple alerts per session
      setHasTracked(true);
      localStorage.setItem('portfolio_visit_tracked', 'true');
      
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  }, [hasTracked, userData]);

  useEffect(() => {
    // Only run if userData is present (modal submitted or skipped)
    if (!userData) return;

    const alreadyTracked = localStorage.getItem('portfolio_visit_tracked');
    if (!alreadyTracked) {
      // Delay tracking to ensure page is fully loaded
      const timer = setTimeout(() => {
        trackVisitor();
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHasTracked(true);
    }
  }, [userData, trackVisitor]);

  return { hasTracked };
}; 