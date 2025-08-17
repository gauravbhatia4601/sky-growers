"use client";
import Link from "next/link";
import { Leaf, Phone, Calendar, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <div>
                <h3 className="text-xl font-bold">SKY GROWERS</h3>
                <p className="text-sm text-gray-400">Premium Farm-Fresh Vegetables</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A family-owned regenerative farm specializing in premium farm-fresh vegetables. 
              Expansive farmland with sustainable agriculture practices bringing you the finest 
              locally-grown seasonal produce since 2023.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-green-400">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+64 27 730 0400</span>
              </div>
              <div className="flex items-center text-green-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">Christchurch, Canterbury, New Zealand</span>
              </div>
              <div className="flex items-center text-green-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Mon-Fri 9AM-5PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-green-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Bulk Wholesale Supply</li>
              <li>Seasonal Produce Orders</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 SKY GROWERS. All rights reserved. | 
            <Link href="/terms" className="text-green-400 hover:text-green-300 ml-1">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 