"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactForm() {
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
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // For now, create a placeholder order item since the form doesn't have product selection
      // In a full implementation, you'd want to add product selection to the form
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        businessName: formData.business || undefined,
        orderType: formData.orderType as any,
        items: [
          {
            productId: '000000000000000000000000', // Placeholder - will need to be handled on backend
            quantity: 1,
          },
        ],
        notes: `Vegetables requested: ${formData.vegetables}\nQuantity: ${formData.quantity}\n${formData.message || ''}`,
        deliveryDate: formData.deliveryDate || undefined,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit order');
      }

      toast({
        title: "Order Request Submitted!",
        description:
          "Thank you for your interest. We'll contact you within 24 hours to confirm your order details.",
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
        message: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
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

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {isSubmitting ? "Submitting..." : "Submit Order Inquiry"}
      </Button>
    </form>
  );
}

