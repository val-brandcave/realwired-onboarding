"use client";

import { useState } from "react";
import { ProductCard, type Product } from "./ProductCard";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { ProductHeroCarousel } from "./ProductHeroCarousel";

interface ProductDiscoveryProps {
  interestedProducts: string[];
  onExpressInterest: (productId: string) => void;
}

export function ProductDiscovery({
  interestedProducts,
  onExpressInterest,
}: ProductDiscoveryProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: "ai-review-forms",
      name: "AI Review Forms",
      description:
        "Intelligent review form generation powered by AI to streamline appraisal and environmental report reviews.",
      features: [
        "Automated form generation from templates",
        "AI-powered quality checks and recommendations",
        "Custom review criteria and scoring",
        "Integration with existing workflows",
      ],
      status: "ready",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "reporting-microservice",
      name: "Reporting Microservice",
      description:
        "Powerful analytics and reporting engine included with your YouConnect subscription. Generate insights from your appraisal and environmental data.",
      features: [
        "Real-time data visualization dashboards",
        "Custom report builder with drag-and-drop",
        "Scheduled report delivery via email",
        "Export to PDF, Excel, and CSV formats",
      ],
      status: "ready",
      isIncluded: true,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "vendors-circle",
      name: "Vendors Circle",
      description:
        "Vendor collaboration and management platform to streamline vendor relationships and performance tracking.",
      features: [
        "Vendor performance scorecards",
        "Automated credential verification",
        "Collaborative bidding and engagement",
        "Vendor communication hub",
      ],
      status: "coming-soon",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: "glances",
      name: "Glances",
      description:
        "Quick property valuation and risk assessment tool for instant property insights and market analysis.",
      features: [
        "Instant property valuations",
        "Risk assessment scoring",
        "Market trend analysis",
        "Automated property data enrichment",
      ],
      status: "ready",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: "api-platform",
      name: "API Platform",
      description:
        "RESTful API access included with your YouConnect subscription. Integrate Realwired services with your existing systems and workflows.",
      features: [
        "RESTful API with comprehensive documentation",
        "Webhook notifications for real-time updates",
        "Sandbox environment for testing",
        "Rate limiting and usage analytics",
      ],
      status: "ready",
      isIncluded: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <ProductHeroCarousel />

      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Explore Realwired Products
        </h2>
        <p className="text-gray-600">
          Discover additional products and services to enhance your workflow. Products marked as "Included" are automatically available with your YouConnect subscription.
        </p>
      </div>

      {/* Product Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInterested={interestedProducts.includes(product.id)}
            onExpressInterest={onExpressInterest}
            onLearnMore={setSelectedProduct}
          />
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isInterested={interestedProducts.includes(selectedProduct.id)}
          onExpressInterest={onExpressInterest}
        />
      )}
    </div>
  );
}

