import type { Metadata, Viewport } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Phone, Users } from "lucide-react";
import SeoJsonLd from "@/components/SeoJsonLd";
import { getBaseUrl, siteConfig } from "@/lib/seo";
import { KEYWORDS } from "@/seo/keywords";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Sky Growers — Order Farm-Fresh Vegetables in Christchurch, NZ",
  description:
    "Get in touch with Sky Growers for wholesale and family orders. Organic, spray-free, farm-fresh vegetables with delivery across Canterbury, NZ.",
  keywords: KEYWORDS,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "article",
    locale: siteConfig.locale,
    title: "Contact Sky Growers",
    description:
      "Order premium farm-fresh vegetables from Sky Growers in Christchurch, New Zealand.",
    url: "/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact Sky Growers — Christchurch, NZ",
    description:
      "Wholesale and family orders for farm-fresh vegetables across Canterbury.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function Contact() {
  const baseUrl = getBaseUrl();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact SKY GROWERS",
      url: `${baseUrl}/contact`,
      inLanguage: "en-NZ",
      isPartOf: { "@type": "WebSite", name: siteConfig.name, url: baseUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          contactType: "customer service",
          areaServed: "NZ",
          availableLanguage: ["English"],
        },
      ],
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
            backgroundImage: 'url(/images/beetroot.jpg)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact SKY GROWERS</h1>
          <p className="text-xl max-w-3xl mx-auto">
          Ready to order premium farm-fresh vegetables? Contact us for bulk wholesale pricing, 
          seasonal availability.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone & Hours</h3>
                  <p className="text-gray-600">+64 27 730 0400</p>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
              {/* <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Current Season</h3>
                  <p className="text-gray-600">{currentSeason} Harvest</p>
                  <p className="text-gray-600">Peak availability for seasonal vegetables</p>
                  <p className="text-green-600 font-medium">Order now for best selection</p>
                </div>
              </div> */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Farm Address</h3>
                  <p className="text-gray-600">Christchurch, Canterbury</p>
                  <p className="text-gray-600">New Zealand</p>
                </div>
              </div>
            </div>
            {/* Delivery Area Coverage */}
            {/* <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery Area Coverage</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Local Delivery (Free for Bulk)</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Christchurch Central</li>
                    <li>• Merivale</li>
                    <li>• Riccarton</li>
                    <li>• Fendalton</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Extended Area (Charges Apply)</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Canterbury Region</li>
                    <li>• North Canterbury</li>
                    <li>• South Canterbury</li>
                    <li>• Custom Routes</li>
                  </ul>
                </div>
              </div>
            </div> */}
            {/* Seasonal Availability */}
            {/* <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Year-Round Vegetable Availability</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Fresh Coriander:</span>
                  <span className="text-gray-600">Available Year-Round</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Regenerative Spinach:</span>
                  <span className="text-gray-600">Available Year-Round</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Fresh Beetroot:</span>
                  <span className="text-gray-600">Available Year-Round</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Crisp Radish:</span>
                  <span className="text-gray-600">Available Year-Round</span>
                </div>
              </div>
            </div> */}
          </div>
          {/* Order Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Order Inquiry Form</h2>
            <ContactForm />
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">What Happens Next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• We'll contact you within 24 hours to discuss your order</li>
                <li>• Receive custom pricing based on quantity and seasonal availability</li>
                <li>• Schedule delivery or pickup that works for your schedule</li>
                <li>• Enjoy the freshest vegetables straight from our family farm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 