import type { Metadata, Viewport } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Users, Calendar, Phone } from "lucide-react";
import SeoJsonLd from "@/components/SeoJsonLd";
import { getBaseUrl, siteConfig } from "@/lib/seo";
import { KEYWORDS } from "@/seo/keywords";

export const metadata: Metadata = {
  title: "About Sky Growers — Family-Owned Regenerative Farm in Christchurch",
  description:
    "Learn about Sky Growers: a family-owned farm in Christchurch, NZ. Sustainable, and premium vegetables grown year-round.",
  keywords: KEYWORDS,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "article",
    locale: siteConfig.locale,
    title: "About Sky Growers",
    description:
      "Family-owned regenerative farm in Christchurch, NZ producing premium vegetables.",
    url: "/about",
    images: [
      { url: "/images/farm.jpg", width: 1200, height: 630, alt: "Sky Growers farm" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sky Growers",
    description:
      "Family-owned regenerative farm in Christchurch, NZ producing premium vegetables.",
    images: ["/images/farm.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const certifications = [
  // "USDA Regenerative Certified",
  "Sustainable Agriculture Practices",
  "GAP (Good Agricultural Practices)",
  "Food Safety Modernization Act Compliant",
  // "Local Regenerative Certification",
  // "Heritage Seed Preservation Program"
];

export default function About() {
  const baseUrl = getBaseUrl();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About SKY GROWERS",
      url: `${baseUrl}/about`,
      inLanguage: "en-NZ",
      isPartOf: { "@type": "WebSite", name: siteConfig.name, url: baseUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      description: siteConfig.defaultDescription,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
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
            backgroundImage: `url(/images/spinach.jpg)`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SKY GROWERS</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A family-owned regenerative farm specializing in premium farm-fresh vegetables 
            with sustainable agriculture practices on our expansive heritage farm in New Zealand.
          </p>
        </div>
      </section>
      {/* Our Family Legacy */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Family Legacy</h2>
              <p className="text-lg text-gray-600 mb-6">
                SKY GROWERS began in 2023 when our founder, Upkar Singh Bhatti, established 
                expansive farmland with a vision to provide the community with the freshest, 
                highest-quality vegetables using traditional farming methods combined with modern techniques.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Today, we continue this proud tradition under the leadership of Upkar Singh Bhatti, 
                combining time-tested heritage farming techniques with modern sustainable 
                agriculture practices to produce premium vegetables that exceed industry standards.
              </p>
              <p className="text-lg text-gray-600">
                Our commitment to family-owned regenerative farming ensures that every vegetable we grow 
                receives personal attention from seed to harvest, maintaining the artisanal vegetable 
                cultivation methods that make our produce truly exceptional.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/farm.jpg"
                alt="Family farming heritage"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Expansive Farmland of Excellence */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Agricultural Excellence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our carefully managed farmland in Christchurch represents sustainable growing practices and soil health improvement
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-3">Crop Rotation</h3>
              <p className="text-gray-600">
                Strategic crop rotation maintains soil fertility and prevents disease, ensuring consistent 
                quality in our locally-grown seasonal produce year after year.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-3">Water Conservation</h3>
              <p className="text-gray-600">
                Advanced irrigation systems and water conservation techniques ensure efficient use of 
                natural resources while maintaining optimal growing conditions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-3">Soil Health</h3>
              <p className="text-gray-600">
                Regular soil testing and regenerative amendment programs maintain the rich, fertile soil 
                that produces our premium farm-fresh vegetables.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <img
              src="/images/spinach.jpg"
              alt="Fresh spinach"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="/images/beetroot1.jpg"
              alt="Fresh beetroot"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="/images/coriander.jpg"
              alt="Fresh coriander"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>
      {/* Meet the Family */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Bhatti Family</h2>
            <p className="text-lg text-gray-600">
              The dedicated team behind every premium vegetable that leaves our farm
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {familyMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img
                    src={`https://images.unsplash.com/${member.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* Our Farming Philosophy */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Farming Philosophy</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Sustainable agriculture practices combined with pesticide-free growing methods
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sustainable Agriculture</h3>
              <p className="text-green-100 mb-6">
                We believe in farming practices that preserve the environment for future generations. 
                Our sustainable methods include natural pest control, composting, cover cropping, 
                and biodiversity enhancement to create a thriving farm ecosystem.
              </p>
              <h3 className="text-xl font-semibold mb-4">Quality Over Quantity</h3>
              <p className="text-green-100">
                Rather than maximizing volume, we focus on producing the highest quality vegetables. 
                This approach ensures that every tomato, carrot, and leafy green meets our strict 
                standards for flavor, nutrition, and freshness.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Community Connection</h3>
              <p className="text-green-100 mb-6">
                Our farm serves as a bridge between traditional agricultural wisdom and modern 
                community needs. We welcome visitors, offer educational tours, and maintain 
                transparent relationships with all our customers.
              </p>
              <h3 className="text-xl font-semibold mb-4">Innovation & Tradition</h3>
              <p className="text-green-100">
                We honor the heritage farming techniques passed down through our family while 
                embracing innovations that improve sustainability, efficiency, and vegetable quality. 
                This balance ensures the future of our farm and community.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Certifications & Standards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Standards</h2>
            <p className="text-lg text-gray-600">
              Our commitment to excellence is verified through rigorous certification programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-green-50 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <h3 className="font-semibold text-gray-900">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Community Impact */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Fresh radish"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Impact & Environmental Stewardship</h2>
              <p className="text-lg text-gray-600 mb-6">
                SKY GROWERS is deeply committed to being a positive force in our local Christchurch community 
                and environment. We partner with local schools to provide educational farm tours, 
                donate fresh vegetables to food banks, and support community gardens.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our environmental stewardship programs include wildlife habitat preservation, 
                watershed protection, and carbon footprint reduction through sustainable farming practices. 
                We believe that healthy farms create healthy communities.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Educational farm tours for local schools</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Regular donations to community food banks</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Wildlife habitat preservation programs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Support for local community gardens</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
} 