import { useEffect, useState } from 'react';

interface VisitorInfo {
  timestamp: string;
  userAgent: string;
  referrer: string;
  location: string;
  screenResolution: string;
}

export const useVisitorTracking = () => {
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

  const sendVisitorAlert = async (visitorInfo: VisitorInfo) => {
    try {
      // Using Web3Forms (same as contact form) for email alerts
      const formData = new FormData();
      formData.append('access_key', 'bbc2460d-9b5c-47f6-aac0-82bdad208e36');
      formData.append('subject', '🚨 New Portfolio Visitor Alert!');
      formData.append('from_name', 'Portfolio Visitor Tracker');
      formData.append('email', 'noreply@portfolio.com');
      formData.append('message', `
New visitor detected on your portfolio!

🕐 Time: ${visitorInfo.timestamp}
🌍 Location: ${visitorInfo.location}
🖥️ Device: ${visitorInfo.userAgent}
📱 Screen: ${visitorInfo.screenResolution}
🔗 Referrer: ${visitorInfo.referrer || 'Direct visit'}

Visit your analytics dashboard for more details.
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

  const trackVisitor = async () => {
    if (hasTracked) return;

    try {
      const location = await getLocationInfo();
      
      const visitorInfo: VisitorInfo = {
        timestamp: new Date().toLocaleString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        location,
        screenResolution: `${screen.width}x${screen.height}`
      };

      // Send email alert
      await sendVisitorAlert(visitorInfo);
      
      // Mark as tracked to prevent multiple alerts per session
      setHasTracked(true);
      localStorage.setItem('portfolio_visit_tracked', 'true');
      
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  };

  useEffect(() => {
    // Check if already tracked in this session
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
  }, []);

  return { hasTracked };
}; 