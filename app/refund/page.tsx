export const metadata = {
  title: "Refund Policy | GenForge",
  description: "GenForge refund and cancellation policy.",
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Refund Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: 20 April 2026</p>

        <section className="space-y-8 text-gray-700 leading-relaxed text-[15px]">

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Our policy</h2>
            <p>
              At GenForge, we want you to be satisfied with your purchase. Because our tools
              deliver AI-generated content instantly upon payment, all sales are generally
              final. However, we will review refund requests on a case-by-case basis.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. When we will issue a refund</h2>
            <p>You may be eligible for a refund if:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>You were charged but did not receive access to the tool or its output.</li>
              <li>You were charged more than once for the same purchase.</li>
              <li>A technical error on our side prevented the tool from working.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. When we will not issue a refund</h2>
            <p>Refunds will not be issued if:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>You simply did not like the AI-generated output.</li>
              <li>You changed your mind after receiving the content.</li>
              <li>The output did not meet your personal expectations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. How to request a refund</h2>
            <p>
              To request a refund, email us at{" "}
              <a href="mailto:hello@trygenforge.com" className="text-indigo-600 underline">
                hello@trygenforge.com
              </a>{" "}
              within <strong>7 days</strong> of your purchase. Please include your email address
              and a brief description of the issue. We will respond within 3 business days.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Processing</h2>
            <p>
              Approved refunds will be processed via Stripe back to your original payment method.
              Please allow 5–10 business days for the refund to appear.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Contact</h2>
            <p>
              Questions about refunds?{" "}
              <a href="mailto:hello@trygenforge.com" className="text-indigo-600 underline">
                hello@trygenforge.com
              </a>
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}