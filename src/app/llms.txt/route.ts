import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/seo';

export async function GET() {
  const content = `# Sky Growers - LLM Context File
# https://skygrowers.com/llms.txt
# Last Updated: ${new Date().toISOString().split('T')[0]}

## Business Overview

> ${siteConfig.name} is a family-owned regenerative farm in ${siteConfig.city}, ${siteConfig.region}, ${siteConfig.country}. We specialize in premium farm-fresh vegetables with sustainable agriculture practices, serving both wholesale B2B customers and local families.

## Key Information

- **Business Name**: ${siteConfig.name}
- **Type**: Family-Owned Regenerative Farm
- **Location**: ${siteConfig.city}, ${siteConfig.region}, ${siteConfig.country}
- **Service Area**: Canterbury Region, South Island NZ
- **Phone**: ${siteConfig.phone}
- **Founded**: 2023
- **Founder**: Upkar Singh Bhatti

## Products & Services

### Fresh Vegetables (Year-Round)
- Fresh Coriander / Cilantro
- Pumpkin
- Butternut Squash
- Crisp Radish
- Cucumber
- Spring Onion
- Spinach
- Beetroot
- Leafy Greens
- Microgreens
- Fresh Herbs (Parsley, Mint, Basil)

### Services Offered
- Wholesale vegetable supply for restaurants and cafes
- Bulk orders for grocery stores and supermarkets
- Direct farm-to-table delivery for families
- Hotel and hospitality produce supply (HORECA)
- Weekly subscription boxes
- Same-day and next-day delivery in Christchurch

## Target Audience

1. **Restaurants & Cafes** - Premium quality vegetables for commercial kitchens
2. **Hotels & Hospitality** - Bulk produce for HORECA sector
3. **Grocery Stores** - Wholesale supply partnerships
4. **Local Families** - Farm-fresh home delivery
5. **Catering Companies** - Event and catering supply

## Certifications & Standards

- GAP (Good Agricultural Practices) Certified
- Food Safety Modernization Act Compliant
- Sustainable Agriculture Practices

## Key Pages

- **Homepage**: https://skygrowers.com/
- **About Us**: https://skygrowers.com/about
- **Contact & Order**: https://skygrowers.com/contact
- **Terms of Service**: https://skygrowers.com/terms

## FAQs

**Q: Where is Sky Growers located?**
A: Christchurch, Canterbury, New Zealand.

**Q: Do you offer wholesale pricing?**
A: Yes, contact us for custom quotes for restaurants, cafes, and stores.

**Q: What vegetables are available year-round?**
A: Coriander, spinach, radish, cucumber, spring onion, pumpkin, butternut.

**Q: Do you deliver?**
A: Yes, across Christchurch and Canterbury.

**Q: Are your vegetables pesticide-free?**
A: Yes, we use sustainable natural pest control methods.

## Contact

- **Phone**: ${siteConfig.phone}
- **WhatsApp**: ${siteConfig.phone}
- **Hours**: Monday - Friday, 9:00 AM - 5:00 PM NZST

---
# For more detailed information, see: https://skygrowers.com/llms-full.txt
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

