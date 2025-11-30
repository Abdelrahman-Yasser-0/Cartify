import Header from "../../components/Header";
import Footer from "../../components/Footer";

const sections = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "Account information such as your name, email, shipping address, and phone number.",
      "Order details including items purchased, payment method, and transaction identifiers.",
      "Device data like IP address, browser type, and crash diagnostics that help us improve performance.",
      "Support interactions from chat, email, or phone so we can resolve issues and maintain audit trails.",
      "Government-issued IDs when required by Egyptian customs for high-value imports.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use your information",
    body: [
      "Fulfill orders, process payments, and deliver products you purchase.",
      "Provide customer support, fraud detection, and product safety notifications.",
      "Improve the Cartify experience through analytics, personalization, and A/B testing.",
      "Send transactional messages (receipts, shipment updates) and optional marketing if you opt in.",
    ],
  },
  {
    id: "data-sharing",
    title: "When we share data",
    body: [
      "Carriers, payment partners, and vetted vendors who enable delivery of the services.",
      "Law enforcement when legally required or to protect against fraud and abuse.",
      "Marketing and analytics providers with aggregated or de-identified information only.",
    ],
  },
  {
    id: "your-choices",
    title: "Your privacy choices",
    body: [
      "Update or delete your account information from the Account Settings page.",
      "Opt out of marketing emails directly within any message footer.",
      "Manage cookie categories via the Cookie Preferences banner.",
      "Request a copy of your data by emailing privacy@cartify.eg.",
    ],
  },
  {
    id: "data-security",
    title: "Data security & retention",
    body: [
      "All payment information is tokenized and never stored on Cartify servers.",
      "Sensitive data is encrypted in transit (TLS 1.3) and at rest (AES-256) in Cairo- and EU-hosted data centers.",
      "We retain purchase history while your account is active or as legally required under Egyptian tax law.",
      "Security audits, PDPL impact assessments, and penetration tests run at least twice per year.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 pt-32">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
              Privacy Policy
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">Your data, your rules</h1>
            <p className="text-gray-500">
              This summary explains how Cartify collects, uses, and safeguards your personal information.
            </p>
            <p className="text-xs text-gray-400">Effective date: Nov 15, 2025 · Applies to Cartify Egypt</p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <h2 className="text-lg font-semibold text-gray-900">Table of contents</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-2xl border border-gray-100 px-4 py-3 text-sm text-gray-600 transition hover:border-teal-100 hover:text-teal-700"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">
                Section
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900">{section.title}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600">
                {section.body.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

          <div className="rounded-3xl border border-dashed border-teal-100 bg-white p-6 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Need more details?</h3>
            <p className="mt-2 text-sm text-gray-500">
              Email privacy@cartify.eg for a full copy of our privacy program, PDPL commitments, or to open a data request.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
