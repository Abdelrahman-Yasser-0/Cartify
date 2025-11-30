import Header from "../../components/Header";
import Footer from "../../components/Footer";

const commitments = [
  {
    title: "WCAG alignment",
    description:
      "Cartify targets WCAG 2.1 AA success criteria across core flows including browsing, checkout, and account management.",
  },
  {
    title: "Keyboard-first navigation",
    description:
      "Interactive components (menus, drawers, carousels) are focus-trapped with visible outlines and logical tab order.",
  },
  {
    title: "Assistive tech support",
    description:
      "All icons include aria-labels, imagery carries descriptive alt text, and we test quarterly with screen readers.",
  },
];

const roadmap = [
  { quarter: "Q1", items: ["Improve form error annunciation", "Add captions to product videos"] },
  { quarter: "Q2", items: ["Dark-mode contrast audit", "Expanded keyboard shortcuts for power users"] },
  { quarter: "Q3", items: ["Partner with external auditors", "Beta test voice search navigation"] },
];

const Accessibility = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 pt-32">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
              Accessibility
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              Shopping that works for everyone
            </h1>
            <p className="text-gray-500">
              We are committed to building an inclusive experience across devices, abilities, and assistive technologies.
            </p>
          </div>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">Our commitments</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {commitments.map((commitment) => (
                <div key={commitment.title} className="rounded-2xl border border-gray-100 p-5">
                  <h3 className="text-base font-semibold text-gray-900">{commitment.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{commitment.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">
                  Continuous improvement
                </p>
                <h2 className="text-2xl font-semibold text-gray-900">Accessibility roadmap</h2>
              </div>
              <p className="text-sm text-gray-500">Updated quarterly with input from our community</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {roadmap.map((entry) => (
                <div key={entry.quarter} className="rounded-2xl border border-gray-100 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                    {entry.quarter} 2026
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-gray-600">
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-dashed border-teal-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Need assistance?</h3>
            <p className="mt-2 text-sm text-gray-500">
              If you encounter accessibility barriers, email access@cartify.eg or call +20 (102) 555 4321. Our Cairo-based specialists
              support Arabic and English requests—include screenshots, device information, or assistive-technology details so we can reproduce issues quickly.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Accessibility;
