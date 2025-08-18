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
    "Get in touch with Sky Growers for wholesale and family orders. Farm-fresh vegetables with delivery across Canterbury, NZ.",
  keywords: KEYWORDS,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "article",
    locale: siteConfig.locale,
    title: "Contact Sky Growers",
    description:
      "Order premium farm-fresh vegetables from Sky Growers in Christchurch, New Zealand.",
    url: "/contact",
    images: [
      { url: "/images/farm.jpg", width: 1200, height: 630, alt: "Sky Growers farm" },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact Sky Growers — Christchurch, NZ",
    description:
      "Wholesale and family orders for farm-fresh vegetables across Canterbury.",
    images: ["/images/farm.jpg"],
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
                  <a
                    href="https://wa.me/64277300400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
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
            {/* Seasonal Availability - Commented out due to beetroot removal */}
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
      
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/64277300400"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Chat with us on WhatsApp"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>
      
      <Footer />
    </div>
  );
} 