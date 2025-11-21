export function trackEvent(eventName: string, properties?: Record<string, any>) {
    // Placeholder for Google Analytics or Segment
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, properties);
    }

    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] ${eventName}`, properties);
    }
}

export const ANALYTICS_EVENTS = {
    QUIZ_START: 'quiz_start',
    QUIZ_COMPLETE: 'quiz_complete',
    OFFER_CLICK: 'offer_click',
    CTA_CLICK: 'cta_click'
};
