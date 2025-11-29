import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const featuredResources = [
  {
    label: "Privacy Policy",
    description: "Understand how we collect, store, and protect your data.",
    to: "/privacy-policy",
    tag: "Updated",
  },
  {
    label: "Terms of Service",
    description: "Review the agreement that governs using Cartify.",
    to: "/terms-of-service",
    tag: "Legal",
  },
  {
    label: "Cookie Policy",
    description: "Control optional cookies and personalization settings.",
    to: "/cookie-policy",
    tag: "Cookies",
  },
  {
    label: "Accessibility Statement",
    description: "Learn about our WCAG compliance roadmap.",
    to: "/accessibility",
    tag: "Inclusive",
  },
  {
    label: "Shipping & Returns",
    description: "Find shipping options, timelines, and refund details.",
    to: "/shipping-returns",
    tag: "Support",
  },
  {
    label: "Support Center",
    description: "Browse FAQs or contact our team for tailored help.",
    to: "/faqs",
    tag: "Help",
  },
];

const quickContacts = [
  {
    title: "Need immediate help?",
    body: "Chat with a specialist or open a support ticket 24/7.",
    cta: "Contact Support",
    to: "/contact-us",
  },
  {
    title: "Track policy changes",
    body: "Subscribe to product updates and legal notices.",
    cta: "Manage preferences",
    to: "/account/preferences",
  },
];

const LegalHub = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 pt-32">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
              Support & Legal Hub
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              Policy resources made readable
            </h1>
            <p className="text-gray-500">
              Everything about privacy, terms, compliance, and Cairo customer care in one place.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
                  Recently updated
                </p>
                <h2 className="text-2xl font-semibold text-gray-900">Top resources</h2>
              </div>
              <p className="text-sm text-gray-500">
                Updated quarterly · Last review: Nov 2025 (Cartify Egypt)
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {featuredResources.map((resource) => (
                <Link
                  key={resource.label}
                  to={resource.to}
                  className="group rounded-2xl border border-gray-100 p-5 transition hover:-translate-y-1 hover:border-teal-100 hover:shadow-md"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                    {resource.tag}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-teal-700">
                    {resource.label}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {quickContacts.map((card) => (
              <div key={card.title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Next steps
                </p>
                <h3 className="mt-3 text-xl font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{card.body}</p>
                <Link
                  to={card.to}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-500"
                >
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LegalHub;
