import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | PetMatchr",
    description: "Contact PetMatchr. We’d love to hear from you.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-secondary-700">Contact Us</h1>
                <div className="prose prose-neutral prose-lg">
                    <p>
                        Have a question, suggestion, or just want to say hello? We’d love to hear from you!
                    </p>

                    <div className="bg-white p-8 rounded-xl border border-neutral-200 mt-8 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900">Get in Touch</h2>
                        <p className="mb-6 text-neutral-600">
                            The best way to reach us is via email. We try to respond to all inquiries within 24-48 hours.
                        </p>

                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-10 h-10 bg-secondary-50 rounded-full flex items-center justify-center text-secondary-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">Email</p>
                                <a href="mailto:support@petmatchr.com" className="text-lg font-medium text-secondary-600 hover:underline">support@petmatchr.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
