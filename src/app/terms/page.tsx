import type { Metadata, Viewport } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";
import { getBaseUrl, siteConfig } from "@/lib/seo";
import { KEYWORDS } from "@/seo/keywords";

export const metadata: Metadata = {
  title: "Terms & Conditions — Sky Growers New Zealand",
  description:
    "Terms and conditions for ordering premium farm-fresh vegetables from Sky Growers in Christchurch, New Zealand.",
  keywords: KEYWORDS,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "article",
    locale: siteConfig.locale,
    title: "Terms & Conditions",
    description:
      "Ordering policies, payment terms, delivery and quality guarantees for Sky Growers, NZ.",
    url: "/terms",
    images: [
      { url: "/images/farm.jpg", width: 1200, height: 630, alt: "Sky Growers farm" },
    ],
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions — Sky Growers NZ",
    description:
      "Policies for ordering farm-fresh vegetables from Sky Growers in Christchurch.",
    images: ["/images/farm.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function Terms() {
  const baseUrl = getBaseUrl();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms & Conditions",
      url: `${baseUrl}/terms`,
      inLanguage: "en-NZ",
      isPartOf: { "@type": "WebSite", name: siteConfig.name, url: baseUrl },
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <SeoJsonLd data={jsonLd} />
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/coriander2.jpg)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-xl max-w-3xl mx-auto">
          Our business policies and terms for ordering premium farm-fresh vegetables from Green Valley Farm
          </p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Order Policies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Policies and Minimum Quantities</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Minimum Order Requirements</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Bulk Wholesale Orders:</strong> 50 lbs minimum total weight</li>
                <li><strong>Restaurant/Commercial:</strong> 25 lbs minimum per order</li>
                <li><strong>Individual/Family Orders:</strong> $50 minimum order value</li>
                <li><strong>Delivery Orders:</strong> $75 minimum for delivery service</li>
              </ul>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Processing</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• All orders must be placed at least 48 hours in advance</li>
              <li>• Bulk orders (100+ lbs) require 1 week advance notice</li>
              <li>• Order confirmation will be provided within 24 hours</li>
              <li>• Changes to confirmed orders must be made 24 hours before delivery</li>
              <li>• Custom harvesting requests require 2-3 days notice</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Availability</h3>
            <p className="text-gray-700 mb-4">
              Green Valley Farm specializes in locally-grown seasonal produce. Availability varies based on:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Seasonal growing cycles and harvest schedules</li>
              <li>• Weather conditions and crop maturity</li>
              <li>• Previous order commitments and inventory levels</li>
              <li>• Sustainable agriculture practices and crop rotation</li>
            </ul>
          </section>
          {/* Payment Terms */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Terms and Accepted Methods</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Accepted Payment Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Individual Orders:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Cash on delivery</li>
                    <li>• Check (with valid ID)</li>
                    <li>• Credit/Debit cards</li>
                    <li>• Venmo/PayPal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Commercial/Bulk Orders:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Net 30 terms (approved accounts)</li>
                    <li>• Check or ACH transfer</li>
                    <li>• Commercial credit cards</li>
                    <li>• Wire transfer (large orders)</li>
                  </ul>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Terms</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Individual orders: Payment due upon delivery or pickup</li>
              <li>• New commercial accounts: Payment due on delivery (COD)</li>
              <li>• Established accounts: Net 30 payment terms available</li>
              <li>• Credit applications required for Net 30 terms</li>
              <li>• Late payments subject to 1.5% monthly service charge</li>
              <li>• Returned checks incur $35 processing fee</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h3>
            <p className="text-gray-700">
              Pricing for our premium farm-fresh vegetables varies based on seasonal availability, 
              order quantity, and current market conditions. Volume discounts available for bulk 
              wholesale orders. Custom quotes provided for large commercial accounts.
            </p>
          </section>
          {/* Delivery and Pickup */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Delivery and Pickup Policies</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery Service</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Local Delivery (Free):</strong> Orders over $75</li>
                  <li><strong>Extended Area:</strong> $25 delivery fee</li>
                  <li><strong>Delivery Days:</strong> Tuesday, Thursday, Saturday</li>
                  <li><strong>Time Windows:</strong> 8AM-12PM or 1PM-5PM</li>
                  <li><strong>Same-Day Delivery:</strong> Available for emergency orders (+$50)</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Farm Pickup</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Pickup Hours:</strong> Mon-Sat 8AM-6PM</li>
                  <li><strong>Sunday Pickup:</strong> 9AM-4PM (by appointment)</li>
                  <li><strong>Address:</strong> 1234 Green Valley Road, Farmington, CA</li>
                  <li><strong>Advance Notice:</strong> 2 hours minimum</li>
                  <li><strong>Farm Tours:</strong> Available during pickup</li>
                </ul>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery Area Coverage</h3>
            <p className="text-gray-700 mb-4">
              Our direct-from-farm delivery service covers the Central Valley region with regular 
              routes to major cities and custom delivery options for large orders.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Special Delivery Requirements</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Refrigerated transport available for temperature-sensitive orders</li>
              <li>• Loading dock deliveries for commercial accounts</li>
              <li>• Special handling for delicate vegetables</li>
              <li>• Delivery confirmation and tracking available</li>
            </ul>
          </section>
          {/* Quality Guarantee */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quality Guarantee and Return Policy</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Quality Promise</h3>
              <p className="text-gray-700">
                Green Valley Farm guarantees that all vegetables are harvested at peak freshness using 
                sustainable agriculture practices and pesticide-free growing methods. We stand behind 
                the quality of our premium farm-fresh vegetables with a comprehensive satisfaction guarantee.
              </p>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Return and Refund Policy</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Quality issues must be reported within 24 hours of delivery</li>
              <li>• Photo documentation required for quality claims</li>
              <li>• Full refund or replacement for verified quality issues</li>
              <li>• No returns accepted for normal aging or customer handling issues</li>
              <li>• Seasonal variations in appearance are normal and not grounds for return</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Standards</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• All vegetables inspected before harvest and packaging</li>
              <li>• Proper post-harvest handling and temperature control</li>
              <li>• Clean, sanitized packaging materials</li>
              <li>• Traceability records maintained for all products</li>
              <li>• Regular third-party quality audits</li>
            </ul>
          </section>
          {/* Seasonal Availability */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Seasonal Availability Disclaimers</h2>
            <p className="text-gray-700 mb-6">
              As a family-owned regenerative farm specializing in locally-grown seasonal produce, our 
              vegetable availability is naturally dependent on growing seasons, weather conditions, 
              and sustainable farming practices.
            </p>
            <div className="bg-amber-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Seasonal Variations</h3>
              <p className="text-gray-700 mb-4">
                Our crop production follows natural growing cycles to ensure optimal flavor and nutrition:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Spring (March-May):</strong> Cool season crops, leafy greens, early vegetables</li>
                <li><strong>Summer (June-August):</strong> Heat-loving crops, tomatoes, peppers, squash</li>
                <li><strong>Fall (September-November):</strong> Root vegetables, storage crops, winter prep</li>
                <li><strong>Winter (December-February):</strong> Cold-hardy vegetables, stored produce</li>
              </ul>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Weather and Growing Conditions</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Extreme weather may affect harvest timing and availability</li>
              <li>• Drought conditions may limit water-intensive crops</li>
              <li>• Unexpected frost may impact cold-sensitive vegetables</li>
              <li>• Heavy rain may delay harvesting and delivery schedules</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Crop Planning and Rotation</h3>
            <p className="text-gray-700">
              Our sustainable agriculture practices include crop rotation and fallow periods to 
              maintain soil health. Some fields may be temporarily out of production as part of 
              our long-term sustainability commitment.
            </p>
          </section>
          {/* Liability and Insurance */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Liability and Insurance Information</h2>
            <div className="bg-red-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Legal Information</h3>
              <p className="text-gray-700">
                Please read these liability terms carefully. By ordering from Green Valley Farm, 
                you acknowledge and agree to these terms and conditions.
              </p>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Liability</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Fresh produce should be properly washed before consumption</li>
              <li>• Customer assumes responsibility for proper storage and handling</li>
              <li>• Normal variations in agricultural products are not defects</li>
              <li>• Farm inspection welcome by appointment to verify growing practices</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery and Transportation</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Customer responsible for accurate delivery information</li>
              <li>• Delivery delays due to weather or traffic not grounds for compensation</li>
              <li>• Undeliverable orders due to incorrect address subject to redelivery fees</li>
              <li>• Customer must inspect delivery at time of receipt</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Insurance Coverage</h3>
            <p className="text-gray-700 mb-4">
              Green Valley Farm maintains comprehensive insurance coverage including:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• General liability insurance for farm operations</li>
              <li>• Product liability coverage for all vegetables sold</li>
              <li>• Commercial vehicle insurance for delivery operations</li>
              <li>• Property insurance for farm buildings and equipment</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h3>
            <p className="text-gray-700">
              Green Valley Farm's liability for any claim related to our products or services 
              shall not exceed the purchase price of the specific order in question. We are not 
              responsible for consequential, incidental, or punitive damages.
            </p>
          </section>
          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About These Terms</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                If you have questions about these terms and conditions, our order policies, or 
                any aspect of our premium farm-fresh vegetables and services, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> info@greenvalleyfarm.com</p>
                <p><strong>Address:</strong> 1234 Green Valley Road, Farmington, CA 95123</p>
                <p><strong>Business Hours:</strong> Monday-Saturday 8AM-6PM, Sunday 9AM-4PM</p>
              </div>
              <p className="text-gray-700 mt-4">
                <strong>Last Updated:</strong> January 2024
              </p>
              <p className="text-gray-700">
                These terms and conditions are subject to change. Customers will be notified 
                of any significant changes to our policies.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
} 