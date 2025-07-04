"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Phone, Calendar, Users } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    orderType: "",
    vegetables: "",
    quantity: "",
    deliveryDate: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Request Submitted!",
      description: "Thank you for your interest. We'll contact you within 24 hours to confirm your order details.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      business: "",
      orderType: "",
      vegetables: "",
      quantity: "",
      deliveryDate: "",
      message: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const currentSeason = new Date().getMonth() >= 3 && new Date().getMonth() <= 8 ? "Spring/Summer" : "Fall/Winter";

  return (
    <div className="min-h-screen bg-white">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business/Organization
                  </label>
                  <Input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Type *
                </label>
                <Select 
                  value={formData.orderType} 
                  onValueChange={(value) => handleSelectChange("orderType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bulk-wholesale">Bulk Wholesale (50+ lbs)</SelectItem>
                    <SelectItem value="restaurant">Restaurant Supply</SelectItem>
                    <SelectItem value="grocery">Grocery Store</SelectItem>
                    <SelectItem value="individual">Individual/Family Order</SelectItem>
                    <SelectItem value="catering">Catering/Events</SelectItem>
                    <SelectItem value="csa">CSA Box Subscription</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vegetables Requested *
                </label>
                <Textarea
                  name="vegetables"
                  value={formData.vegetables}
                  onChange={handleInputChange}
                  required
                  placeholder="Please list specific vegetables you're interested in (e.g., 20 lbs tomatoes, 15 lbs carrots, 10 lbs lettuce mix)"
                  className="w-full"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Quantity
                  </label>
                  <Input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g., 100 lbs total, weekly order"
                    className="w-full"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Delivery Date
                  </label>
                  <Input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Special requests, delivery instructions, or questions about our premium farm-fresh vegetables"
                  className="w-full"
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Submit Order Inquiry
              </Button>
            </form>
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