import Header from "../../components/Header";
import Footer from "../../components/Footer";

const cookieCategories = [
  {
    name: "Essential",
    description: "Required for secure login, cart preservation, and checkout flows.",
    retention: "Session based · deleted when you close the browser.",
  },
  {
    name: "Performance",
    description: "Help us measure page speed, crash reports, and product usage analytics.",
    retention: "90 days · you can opt out anytime.",
  },
  {
    name: "Personalization",
    description: "Remember preferences like currency (EGP), Arabic/English language choice, and saved filters.",
    retention: "180 days · optional and off by default until you consent.",
  },
  {
    name: "Marketing",
    description: "Used for email attribution and relevant ads; never sold to third parties.",
    retention: "30 days · only active if you give consent.",
  },
];

const CookiePolicy = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 pt-32">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Cookie Policy</p>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">Control your browsing data</h1>
            <p className="text-gray-500">
              We keep cookies simple, transparent, and configurable. Below you'll find what each category does and how to manage it.
            </p>
          </div>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">Consent choices</p>
                <h2 className="text-2xl font-semibold text-gray-900">Cookie categories</h2>
              </div>
              <button className="btn btn-sm rounded-full border border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100">
                Manage preferences
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {cookieCategories.map((cookie) => (
                <div key={cookie.name} className="rounded-2xl border border-gray-100 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-gray-900">{cookie.name}</h3>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">{cookie.retention}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{cookie.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <h2 className="text-2xl font-semibold text-gray-900">How to update consent</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-gray-600">
              <li>Tap the cookie badge located at the bottom-right of every page.</li>
              <li>Toggle on/off the optional categories you want to allow.</li>
              <li>Save your preferences. Changes take effect immediately.</li>
            </ol>
            <p className="mt-4 text-xs text-gray-400">
              Clearing your browser cookies resets preferences. We will prompt for consent on your next visit.
            </p>
          </section>

          <section className="rounded-3xl border border-dashed border-teal-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Questions?</h3>
            <p className="mt-2 text-sm text-gray-500">
              Email privacy@cartify.eg for a detailed list of cookies, processors hosted in Egypt/EU, or to request deletion of analytics data.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CookiePolicy;
