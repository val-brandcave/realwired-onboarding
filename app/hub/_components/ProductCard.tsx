"use client";

import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  status: "ready" | "coming-soon";
  isIncluded?: boolean;
  icon: React.ReactNode;
  learnMoreUrl?: string;
  videoUrl?: string;
}

interface ProductCardProps {
  product: Product;
  isInterested: boolean;
  onExpressInterest: (productId: string) => void;
  onLearnMore: (product: Product) => void;
}

export function ProductCard({
  product,
  isInterested,
  onExpressInterest,
  onLearnMore,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative bg-white rounded-xl border border-gray-200
        transition-all duration-200 ease-out
        ${isHovered ? "shadow-xl scale-105 -translate-y-1" : "shadow-md"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status Badges */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
        {product.isIncluded && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
            ✓ Active
          </span>
        )}
        {product.status === "coming-soon" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Coming Soon
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col h-full">
        {/* Icon */}
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-[#9F2E2B] to-[#7a2320] text-white shadow-md">
          {product.icon}
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {product.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {product.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="space-y-3">
          {product.isIncluded ? (
            <button
              onClick={() => onLearnMore(product)}
              className="w-full py-2.5 px-4 rounded-lg font-medium text-sm bg-[#9F2E2B] text-white hover:bg-[#7a2320] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Get Started →
            </button>
          ) : (
            <button
              onClick={() => onExpressInterest(product.id)}
              disabled={product.status === "coming-soon"}
              className={`
                w-full py-2.5 px-4 rounded-lg font-medium text-sm
                transition-all duration-200
                ${
                  isInterested
                    ? "bg-green-100 text-green-800 border-2 border-green-300"
                    : product.status === "coming-soon"
                    ? "bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed"
                    : "bg-white text-[#9F2E2B] border-2 border-[#9F2E2B] hover:bg-[#9F2E2B] hover:text-white"
                }
              `}
            >
              {isInterested ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sales Contacted
                </span>
              ) : product.status === "coming-soon" ? (
                "Coming Soon"
              ) : (
                "Talk to Sales"
              )}
            </button>
          )}

          <button
            onClick={() => onLearnMore(product)}
            className="w-full py-2 text-sm font-medium text-gray-600 hover:text-[#9F2E2B] transition-colors duration-200 flex items-center justify-center gap-1"
          >
            Learn More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

