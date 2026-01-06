"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface VegetableItem {
  name: string;
  quantity: string;
  unit: string;
}

export default function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    orderType: "",
    deliveryDate: "",
    message: "",
  });

  const [vegetables, setVegetables] = useState<VegetableItem[]>([
    { name: "", quantity: "", unit: "lbs" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addVegetableField = () => {
    setVegetables([...vegetables, { name: "", quantity: "", unit: "lbs" }]);
  };

  const removeVegetableField = (index: number) => {
    if (vegetables.length > 1) {
      setVegetables(vegetables.filter((_, i) => i !== index));
    }
  };

  const updateVegetable = (index: number, field: keyof VegetableItem, value: string) => {
    const updated = [...vegetables];
    updated[index] = { ...updated[index], [field]: value };
    setVegetables(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate at least one vegetable is filled
      const validVegetables = vegetables.filter(
        (v) => v.name.trim() && v.quantity.trim()
      );

      if (validVegetables.length === 0) {
        toast({
          title: "Validation Error",
          description: "Please add at least one vegetable with name and quantity",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create order items from vegetables
      const items = validVegetables.map((veg) => ({
        productName: veg.name.trim(),
        quantity: parseFloat(veg.quantity) || 0,
        unit: veg.unit,
      }));

      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        businessName: formData.business || undefined,
        orderType: formData.orderType as any,
        items: items,
        notes: formData.message.trim() || undefined,
        deliveryDate: formData.deliveryDate || undefined,
        // Honeypot field (should be empty - bots will fill it)
        website: '',
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
        deliveryDate: "",
        message: "",
      });
      setVegetables([{ name: "", quantity: "", unit: "lbs" }]);
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
      {/* Honeypot field for bot detection - hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />
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
        <div className="space-y-3">
          {vegetables.map((veg, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-5">
                <Input
                  type="text"
                  placeholder="Vegetable name"
                  value={veg.name}
                  onChange={(e) => updateVegetable(index, "name", e.target.value)}
                  required={index === 0}
                  className="w-full"
                />
              </div>
              <div className="col-span-3">
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={veg.quantity}
                  onChange={(e) => updateVegetable(index, "quantity", e.target.value)}
                  required={index === 0}
                  min="0"
                  step="0.1"
                  className="w-full"
                />
              </div>
              <div className="col-span-3">
                <Select
                  value={veg.unit}
                  onValueChange={(value) => updateVegetable(index, "unit", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lbs">lbs</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="piece">piece</SelectItem>
                    <SelectItem value="bunch">bunch</SelectItem>
                    <SelectItem value="box">box</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1">
                {vegetables.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeVegetableField(index)}
                    className="w-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addVegetableField}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Vegetable
          </Button>
        </div>
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

