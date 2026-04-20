export const metadata = {
  title: "Contact | GenForge",
  description: "Get in touch with the GenForge team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-sm text-gray-400 mb-10">We typically respond within 1–2 business days.</p>

        <section className="space-y-8 text-gray-700 leading-relaxed text-[15px]">

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Get in touch</h2>
            <p>
              Have a question, issue, or feedback? We&apos;d love to hear from you.
              The best way to reach us is by email:
            </p>
            <p className="mt-4">
              <a
                href="mailto:hello@trygenforge.com"
                className="text-indigo-600 underline text-lg font-medium"
              >
                hello@trygenforge.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Support topics</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Questions about a tool or output</li>
              <li>Payment or billing issues</li>
              <li>Refund requests</li>
              <li>Feature suggestions</li>
              <li>General feedback</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Response time</h2>
            <p>
              We aim to respond to all enquiries within <strong>1–2 business days</strong>.
              For urgent payment issues, please include your order details in your email.
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}