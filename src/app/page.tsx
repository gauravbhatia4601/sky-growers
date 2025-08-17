"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { Users, Calendar, Phone } from "lucide-react";

const vegetables = [
  { name: "Fresh Coriander", image: "/images/coriander.jpg", season: "Year-round" },
  { name: "Regenerative Spinach", image: "/images/spinach.jpg", season: "Year-round" },
  { name: "Fresh Beetroot", image: "/images/beetroot.jpg", season: "Year-round" },
  { name: "Crisp Radish", image: "/images/radish.jpg", season: "Year-round" },
  { name: "Cucumber", image: "/images/cucumber.jpg", season: "Year-round" },
  { name: "Onion Greens", image: "/images/onion-greens.jpg", season: "Year-round" },
  { name: "Butter Nut", image: "/images/butter-nut.jpg", season: "Year-round" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    business: "Johnson's Restaurant",
    quote: "SKY GROWERS provides the freshest, highest-quality vegetables for our farm-to-table restaurant. Their premium produce sets us apart.",
  },
  {
    name: "Mike Thompson",
    business: "Thompson Grocery",
    quote: "As a bulk buyer, I appreciate their consistent quality and reliable delivery. Their family's commitment to excellence shows in every harvest.",
  },
  {
    name: "Lisa Chen",
    business: "Family Customer",
    quote: "Nothing compares to the taste of their pesticide-free vegetables. You can truly taste the difference of sustainable agriculture practices.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/images/coriander1.jpg)`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Premium Farm-Fresh Vegetables
              {/* <span className="block text-green-200">From Our Family Farm to Your Table</span> */}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Experience the finest locally-grown seasonal produce from our expansive family-owned regenerative farm. 
              Sustainable agriculture practices meet artisanal vegetable cultivation for unmatched quality since 2023.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Order Fresh Vegetables Today
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Our Farm */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Family-Owned Farming
            </h2>
            {/* <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three generations of heritage farming techniques combined with modern sustainable practices
            </p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-3">Family Heritage</h3>
              <p className="text-gray-600">
                Established in 2023, our family has been committed to farming expertise ensuring traditional quality with modern innovation. 
                Our family legacy guarantees authentic, pesticide-free growing methods.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-3">Year-Round Excellence</h3>
              <p className="text-gray-600">
                We specialize in year-round vegetables including coriander, spinach, beetroot, and radish, ensuring consistent supply and peak flavor. 
                Our sustainable practices maintain soil health throughout the year.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-3">Direct Farm Service</h3>
              <p className="text-gray-600">
                Personal relationships with every customer. From bulk wholesale orders to individual families,
                we provide direct-from-farm delivery with free delivery for bulk orders.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Our Premium Vegetables */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Premium Vegetables</h2>
            <p className="text-lg text-gray-600">
              Year-round artisanal vegetable cultivation using heritage farming techniques
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vegetables.map((vegetable, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={`${vegetable.image}`}
                    alt={vegetable.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{vegetable.name}</h3>
                    <p className="text-green-300">{vegetable.season}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Bulk Orders Welcome */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bulk Wholesale Vegetable Supply</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Restaurants, grocery stores, and institutions trust our consistent quality and reliable delivery. 
            Enjoy free delivery on all bulk orders, with delivery charges applying to smaller orders only.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Wholesale Pricing
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Schedule Farm Visit
            </Link>
          </div>
        </div>
      </section>
      {/* Customer Testimonials */}
      {/* <section className="py-16 d-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">
              Trusted by restaurants, grocery stores, and families across New Zealand
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-green-600 text-sm">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* From Our Family Farm */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              
              <p className="text-lg text-gray-600 mb-6">
                Since 2023, our family has been committed to sustainable agriculture practices 
                and providing the freshest, highest-quality vegetables to our community. Our expansive regenerative farmland produces premium vegetables using time-tested heritage farming techniques.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe in the power of farm-to-table freshness, which is why we offer direct-from-farm 
                delivery with free shipping for bulk orders to ensure you receive the peak flavor and nutritional value in every harvest.
              </p>
              <Link
                href="/about"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-block"
              >
                Learn Our Story
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Family farming heritage"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
}
