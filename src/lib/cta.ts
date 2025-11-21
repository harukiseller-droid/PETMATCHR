// FILE: src/lib/cta.ts
import { PageMonetization, CTAConfig, QuizCTA, OfferCTA } from "@/lib/types";

export function resolvePageCTAs(
    monetization: PageMonetization,
    contentData: any
): CTAConfig {
    // 1. Resolve Primary Quiz
    const quizPrimary: QuizCTA | null = monetization.primary_funnel !== "none"
        ? {
            visible: true,
            quizSlug: monetization.primary_quiz_slug,
            label: getQuizLabel(monetization.primary_funnel),
            description: getQuizDescription(monetization.primary_funnel),
        }
        : null;

    // 2. Resolve Secondary Quizzes
    const quizSecondary: QuizCTA[] = monetization.secondary_funnels
        .filter((f) => f !== "none")
        .map((f, idx) => ({
            visible: true,
            quizSlug: monetization.secondary_quiz_slugs[idx] || null,
            label: getQuizLabel(f),
            description: getQuizDescription(f),
        }));

    // 3. Resolve Primary Offer
    // If contentData has a specific slot (e.g. insurance_section.primary_offer_slot), use it to override defaults
    let offerPrimary: OfferCTA | null = null;

    if (monetization.primary_offer_type !== "none") {
        const offerType = monetization.primary_offer_type;
        let label = getOfferLabel(offerType);
        let description = getOfferDescription(offerType);
        let partnerPlaceholder = getDefaultPartnerPlaceholder(offerType);

        // Override from contentData if available
        if (offerType === "insurance_offer" && contentData?.insurance_section?.primary_offer_slot) {
            const slot = contentData.insurance_section.primary_offer_slot;
            label = slot.cta_headline || label;
            description = slot.cta_copy || description;
            partnerPlaceholder = slot.provider_placeholder || partnerPlaceholder;
        } else if (offerType === "training_course" && contentData?.course_recommendation) {
            const slot = contentData.course_recommendation;
            label = slot.cta_button_label || label;
            description = slot.headline || description; // Use headline as description context
            if (slot.affiliate_slot?.partner_placeholder) {
                partnerPlaceholder = slot.affiliate_slot.partner_placeholder;
            }
        }

        offerPrimary = {
            visible: true,
            offerType: mapOfferType(offerType),
            label,
            description,
            partnerPlaceholder,
            deepLinkPlaceholder: getDefaultDeepLinkPlaceholder(offerType),
        };
    }

    // 4. Resolve Secondary Offers
    const offerSecondary: OfferCTA[] = monetization.secondary_offer_types
        .filter((t) => t !== "none")
        .map((t) => ({
            visible: true,
            offerType: mapOfferType(t),
            label: getOfferLabel(t),
            description: getOfferDescription(t),
            partnerPlaceholder: getDefaultPartnerPlaceholder(t),
            deepLinkPlaceholder: getDefaultDeepLinkPlaceholder(t),
        }));

    return {
        quizPrimary,
        quizSecondary,
        offerPrimary,
        offerSecondary,
        showAds: monetization.show_ads,
        showEmailCapture: monetization.show_email_capture,
    };
}

// --- Helpers ---

function mapOfferType(type: string): "insurance" | "training" | "cbd" | "generic" | "none" {
    switch (type) {
        case "insurance_offer": return "insurance";
        case "training_course": return "training";
        case "cbd_offer": return "cbd";
        case "generic_affiliate": return "generic";
        default: return "none";
    }
}

function getQuizLabel(funnel: string): string {
    switch (funnel) {
        case "insurance_quiz": return "Check Insurance Savings";
        case "behavior_quiz": return "Take Behavior Assessment";
        case "anxiety_quiz": return "Anxiety Severity Score";
        case "lifestyle_quiz": return "Find Your Perfect Breed";
        default: return "Take Quiz";
    }
}

function getQuizDescription(funnel: string): string {
    switch (funnel) {
        case "insurance_quiz": return "See if you're overpaying for pet insurance.";
        case "behavior_quiz": return "Understand why your dog acts this way.";
        case "anxiety_quiz": return "Is it separation anxiety or boredom?";
        case "lifestyle_quiz": return "Match your lifestyle to the right dog.";
        default: return "Quick 60-second check.";
    }
}

function getOfferLabel(offerType: string): string {
    switch (offerType) {
        case "insurance_offer": return "View Insurance Quotes";
        case "training_course": return "Start Training Now";
        case "cbd_offer": return "Shop CBD for Dogs";
        case "generic_affiliate": return "Shop Recommended Gear";
        default: return "View Offer";
    }
}

function getOfferDescription(offerType: string): string {
    switch (offerType) {
        case "insurance_offer": return "Protect your pup from unexpected vet bills.";
        case "training_course": return "Professional training from home.";
        case "cbd_offer": return "Natural relief for anxiety and pain.";
        case "generic_affiliate": return "Top rated products for your dog.";
        default: return "Check this out.";
    }
}

function getDefaultPartnerPlaceholder(offerType: string): string {
    switch (offerType) {
        case "insurance_offer": return "EMBRACE_OR_LEMONADE";
        case "training_course": return "BRAIN_TRAINING_FOR_DOGS";
        case "cbd_offer": return "HONEST_PAWS";
        case "generic_affiliate": return "AMAZON_OR_CHEWY";
        default: return "PARTNER_ID";
    }
}

function getDefaultDeepLinkPlaceholder(offerType: string): string {
    return `https://partner.link/${offerType}`;
}
