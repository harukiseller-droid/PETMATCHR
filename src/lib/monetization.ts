// FILE: src/lib/monetization.ts
import pageMonetization from "@/data_v7/page_monetization.json";
import { PageMonetization, CTAConfig, PageType, QuizCTA, OfferCTA } from "@/lib/types";

export async function getPageMonetization(slug: string): Promise<PageMonetization | null> {
    const data = (pageMonetization as any[]).find((p) => p.slug === slug);
    return (data as PageMonetization) || null;
}

export function resolvePageCTAs(pageType: PageType, monetization?: PageMonetization | null): CTAConfig {
    // Default configuration if no specific monetization rule exists
    const defaults: CTAConfig = {
        quizPrimary: null,
        quizSecondary: [],
        offerPrimary: null,
        offerSecondary: [],
        showAds: true,
        showEmailCapture: true,
    };

    if (!monetization) {
        // Fallback logic based on page type
        if (pageType === 'cost') {
            defaults.quizPrimary = {
                visible: true,
                quizSlug: 'pet-insurance-quiz',
                label: 'Calculate Your Rate',
                description: 'See how much you could save on vet bills.'
            };
            defaults.offerPrimary = {
                visible: true,
                offerType: 'insurance',
                label: 'Get a Quote',
                description: 'Protect your pup with top-rated insurance.'
            };
        } else if (pageType === 'problem' || pageType === 'anxiety') {
            defaults.quizPrimary = {
                visible: true,
                quizSlug: 'behavior-assessment',
                label: 'Analyze Behavior',
                description: 'Find the root cause of your dog\'s issue.'
            };
            defaults.offerPrimary = {
                visible: true,
                offerType: 'training',
                label: 'Start Training',
                description: 'Professional training course for behavior issues.'
            };
        } else {
            defaults.quizPrimary = {
                visible: true,
                quizSlug: 'breed-match',
                label: 'Find Your Perfect Breed',
                description: 'Take our lifestyle quiz to find your match.'
            };
        }
        return defaults;
    }

    // Map Monetization Rule to CTA Config
    return {
        quizPrimary: mapQuiz(monetization.primary_funnel, monetization.primary_quiz_slug),
        quizSecondary: monetization.secondary_funnels.map((f, i) => mapQuiz(f, monetization.secondary_quiz_slugs[i] || null)).filter(q => q.visible),
        offerPrimary: mapOffer(monetization.primary_offer_type),
        offerSecondary: monetization.secondary_offer_types.map(mapOffer).filter(o => o.visible),
        showAds: monetization.show_ads,
        showEmailCapture: monetization.show_email_capture
    };
}

function mapQuiz(funnelType: string, slug: string | null): QuizCTA {
    if (funnelType === 'none' || !slug) return { visible: false, quizSlug: null, label: '', description: '' };

    const labels: Record<string, string> = {
        'insurance_quiz': 'Check Insurance Rates',
        'behavior_quiz': 'Free Behavior Assessment',
        'anxiety_quiz': 'Anxiety Score Test',
        'lifestyle_quiz': 'Find Your Breed Match'
    };

    return {
        visible: true,
        quizSlug: slug,
        label: labels[funnelType] || 'Take the Quiz',
        description: 'Get personalized results in 2 minutes.'
    };
}

function mapOffer(offerType: string): OfferCTA {
    if (offerType === 'none') return { visible: false, offerType: 'none', label: '', description: '' };

    const details: Record<string, { label: string, desc: string }> = {
        'insurance_offer': { label: 'Get Protected', desc: 'Up to 90% reimbursement on vet bills.' },
        'training_course': { label: 'Train at Home', desc: 'Eliminate bad behaviors with Brain Training.' },
        'cbd_offer': { label: 'Calm Your Dog', desc: 'Natural relief for anxiety and pain.' },
        'generic_affiliate': { label: 'Shop Now', desc: 'Recommended products for your dog.' }
    };

    const d = details[offerType] || { label: 'Learn More', desc: '' };

    return {
        visible: true,
        offerType: offerType as any,
        label: d.label,
        description: d.desc
    };
}
