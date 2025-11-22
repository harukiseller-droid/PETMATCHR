import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | PetMatchr",
    description: "Terms of Service for PetMatchr. Please read these terms carefully before using our website.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-emerald-400">Terms of Service</h1>
                <div className="prose prose-invert prose-lg">
                    <p>Last updated: November 21, 2025</p>
                    <p>
                        These Terms of Service (“Terms”) govern your access to and use of the PetMatchr website. By accessing or using the Service, you agree to be bound by these Terms.
                    </p>
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                    </p>
                    <h2>2. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are and will remain the exclusive property of PetMatchr and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                    </p>
                    <h2>3. Links To Other Web Sites</h2>
                    <p>
                        Our Service may contain links to third-party web sites or services that are not owned or controlled by PetMatchr. PetMatchr has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
                    </p>
                    <h2>4. Termination</h2>
                    <p>
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                    <h2>5. Changes</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                    </p>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at: support@petmatchr.com
                    </p>
                </div>
            </div>
        </div>
    );
}
