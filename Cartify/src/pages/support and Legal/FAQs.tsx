import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const faqCategories = {
  Orders: [
    {
      question: "How do I track my order?",
      answer:
        "Visit the Track Order page, enter your order number and email, and we will show the latest carrier updates in real time.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "Orders can be updated within the first hour after placing them. Contact support with your order number and the requested change.",
    },
    {
      question: "Why is my order taking longer than expected?",
      answer:
        "Severe weather, carrier delays, or high seasonal volume can extend delivery times. Track your package for the latest scan events.",
    },
  ],
  Shipping: [
    {
      question: "What are the available shipping methods?",
      answer:
        "We offer Standard (5-7 business days), Priority (3-5 business days), and Express (1-2 business days) shipping options.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we currently ship to over 40 countries. Duties and taxes are calculated at checkout when available.",
    },
  ],
  Returns: [
    {
      question: "What is your return policy?",
      answer:
        "You have 30 days from the delivery date to request a return. Items must be unused, in original packaging, and include all accessories.",
    },
    {
      question: "How do I start a return?",
      answer:
        "Go to your order history, select the eligible order, and click 'Start Return' to generate a prepaid shipping label.",
    },
  ],
  Payments: [
    {
      question: "Which payment methods do you accept?",
      answer:
        "We accept major credit cards, PayPal, Apple Pay, Google Pay, and Shop Pay Installments for eligible orders.",
    },
  ],
  Account: [
    {
      question: "How do I update my account details?",
      answer:
        "Navigate to Account Settings to update your name, email, saved addresses, and communication preferences.",
    },
  ],
  Technical: [
    {
      question: "Why can't I log into my account?",
      answer:
        "Reset your password from the login page. If the issue continues, clear your browser cache or reach out to support.",
    },
  ],
} as const;

type Category = keyof typeof faqCategories;

type FaqItem = (typeof faqCategories)[Category][number];

const questionId = (question: string) =>
  `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

const FAQs = () => {
  const categories = Object.keys(faqCategories) as Category[];
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = useMemo(() => {
    const faqs = faqCategories[activeCategory];
    if (!searchTerm.trim()) return faqs;
    return faqs.filter((faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [activeCategory, searchTerm]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 pt-32">
        <div className="mx-auto max-w-5xl space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
            Frequently Asked Questions
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Find answers to your questions
          </h1>
          <p className="text-gray-500">
            Browse common topics about orders, shipping, returns, payments, and more.
          </p>
        </div>

        <div className="relative">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-sm text-gray-700 shadow-sm focus:border-teal-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenQuestion(null);
              }}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                category === activeCategory
                  ? "border-teal-200 bg-teal-50 text-teal-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-teal-200 hover:text-teal-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">{activeCategory}</h2>
          <div className="divide-y divide-gray-100">
            {filteredFaqs.map((faq: FaqItem) => {
              const isOpen = openQuestion === faq.question;
              return (
                <button
                  key={faq.question}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={questionId(faq.question)}
                  className="w-full py-4 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-teal-400"
                  onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-medium text-gray-900">
                      {faq.question}
                    </p>
                    <span
                      className={`rounded-full border p-2 text-xs transition ${
                        isOpen
                          ? "border-teal-100 bg-teal-50 text-teal-600"
                          : "border-gray-200 bg-gray-50 text-gray-500"
                      }`}
                    >
                      <FaChevronDown
                        className={`transition ${isOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    </span>
                  </div>
                  <div
                    id={questionId(faq.question)}
                    className={`grid overflow-hidden text-sm text-gray-500 transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden">
                      {faq.answer}
                    </p>
                  </div>
                </button>
              );
            })}
            {filteredFaqs.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                No results found. Try another keyword.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-dashed border-teal-100 bg-white/60 p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-600">
            💬
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Still need help?</h3>
          <p className="mb-6 text-sm text-gray-500">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link to="/contact-us" className="btn rounded-full bg-teal-600 text-white hover:bg-teal-500">
            Contact Support
          </Link>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQs;
