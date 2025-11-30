import Header from "../../components/Header";
import Footer from "../../components/Footer";

const termsSections = [
  {
    title: "Using Cartify",
    content: [
      "Cartify Egypt serves individual shoppers across Cairo and the wider Republic for lawful, personal purchases only.",
      "You must be at least 16 years old or hold guardian consent to create an account or place an order.",
      "Keep your login credentials confidential and notify us immediately of unauthorized use so we can secure your account.",
    ],
  },
  {
    title: "Orders & payment",
    content: [
      "Prices are shown in Egyptian Pounds (EGP) and include VAT where required; shipping is calculated at checkout.",
      "We accept cards issued in Egypt, Meeza wallets, and Cash on Delivery within Greater Cairo (cash is collected before opening the parcel).",
      "Placing an order constitutes an offer to purchase; we may accept, decline, or request verification to prevent fraud.",
    ],
  },
  {
    title: "Returns & refunds",
    content: [
      "You have 30 days from delivery to initiate a return via your account dashboard or at the Mall of Egypt store.",
      "Refunds are issued to the original payment method (or store credit) once items pass inspection at our Cairo fulfillment hub.",
      "Final-sale, hygiene items, SIM cards, and perishable goods are not eligible unless defective on arrival.",
    ],
  },
  {
    title: "Content & intellectual property",
    content: [
      "All trademarks, product photography, and brand assets belong to Cartify or respective license holders.",
      "You may not resell, scrape, or otherwise repurpose site content without written permission.",
      "User-generated reviews must be truthful and respect our community guidelines.",
    ],
  },
  {
    title: "Limitation of liability",
    content: [
      "Cartify is not responsible for indirect, incidental, or consequential damages beyond the order value permitted under Egyptian Consumer Protection Law.",
      "Some governorates or jurisdictions may grant additional mandatory rights; those rights continue to apply.",
    ],
  },
  {
    title: "Dispute resolution",
    content: [
      "Most issues are resolved through support@cartify.eg within 14 days, including replacements and refunds.",
      "If a dispute remains, Egyptian law governs these terms and the Cairo Economic Court has exclusive jurisdiction.",
      "Consumers may also escalate to the Egyptian Consumer Protection Agency before taking legal action.",
    ],
  },
];

const TermsOfService = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 pt-32">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
              Terms of Service
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              The rules of using Cartify
            </h1>
            <p className="text-gray-500">
              By accessing Cartify, you agree to the commitments below. Please read them carefully.
            </p>
            <p className="text-xs text-gray-400">Last updated: Nov 15, 2025</p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <div className="space-y-4">
              {termsSections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                    {section.content.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="my-6 h-px bg-gray-100" />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Continued use of Cartify following updates signifies acceptance of the revised terms.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-teal-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Questions about these terms?</h3>
            <p className="mt-2 text-sm text-gray-500">
              Email legal@cartify.eg or visit our Legal Hub for a change log of previous versions.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
