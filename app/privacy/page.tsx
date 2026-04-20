export const metadata = {
  title: "Privacy Policy | GenForge",
  description: "How GenForge collects and uses your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: 20 April 2026</p>

        <section className="space-y-8 text-gray-700 leading-relaxed text-[15px]">

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Who we are</h2>
            <p>
              GenForge (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website{" "}
              <a href="https://trygenforge.com" className="text-indigo-600 underline">
                trygenforge.com
              </a>{" "}
              and{" "}
              <a href="https://genforge.co.uk" className="text-indigo-600 underline">
                genforge.co.uk
              </a>
              . We provide AI-powered business tools for entrepreneurs and small businesses.
            </p>
            <p className="mt-2">
              For any privacy-related questions, contact us at:{" "}
              <a href="mailto:hello@trygenforge.com" className="text-indigo-600 underline">
                hello@trygenforge.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. What data we collect</h2>
            <p>
              We collect only the minimum data necessary to process your purchase:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Email address</strong> — provided during checkout, used to send your
                payment confirmation and access details.
              </li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> collect your name, address, or payment card details
              directly. Payment processing is handled securely by{" "}
              <strong>Stripe</strong>, which has its own{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. How we use your data</h2>
            <p>Your email address is used solely to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Send a payment confirmation email.</li>
              <li>Provide access to the tool(s) you have purchased.</li>
              <li>Respond to any support requests you initiate.</li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> send marketing emails or newsletters without your
              explicit consent.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Cookies and analytics</h2>
            <p>
              GenForge does not currently use cookies, tracking pixels, or third-party analytics
              tools. No data about your browsing behaviour is collected or stored.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Data sharing</h2>
            <p>
              We do not sell, rent, or share your personal data with third parties, except:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Stripe</strong> — to process your payment securely.
              </li>
              <li>
                When required by law or to protect our legal rights.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Data retention</h2>
            <p>
              We retain your email address only for as long as necessary to fulfil your purchase
              and any related support. You may request deletion at any time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Your rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Object to or restrict how we process your data.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:hello@trygenforge.com" className="text-indigo-600 underline">
                hello@trygenforge.com
              </a>{" "}
              and we will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Security</h2>
            <p>
              We take reasonable technical measures to protect your data. All payments are
              processed via Stripe over encrypted HTTPS connections. We do not store card details.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated date. Continued use of GenForge after changes constitutes
              acceptance of the revised policy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{" "}
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