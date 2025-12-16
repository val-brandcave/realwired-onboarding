"use client";

import { type Product } from "./ProductCard";

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  isInterested: boolean;
  onExpressInterest: (productId: string) => void;
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  isInterested,
  onExpressInterest,
}: ProductDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full transform transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#9F2E2B] to-[#7a2320] text-white shadow-lg flex-shrink-0">
                {product.icon}
              </div>
              <div>
                <h2 id="modal-title" className="text-2xl font-bold text-gray-900 mb-1">
                  {product.name}
                </h2>
                {product.status === "coming-soon" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>

            {/* Video (if available) */}
            {product.videoUrl && (
              <div className="mb-6">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={product.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${product.name} demo video`}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-700 text-base mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            {product.isIncluded ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-sm text-green-800">
                    <p className="font-medium mb-1">Included with Your Subscription</p>
                    <p>
                      This product is automatically included with your YouConnect subscription at no additional cost. Access it anytime from your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Interested in this product?</p>
                    <p>
                      Talk to our sales team to discuss pricing, implementation, and how this product can benefit your organization.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4">
              {product.isIncluded ? (
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-base bg-[#9F2E2B] text-white hover:bg-[#7a2320] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Get Started →
                </button>
              ) : (
                <button
                  onClick={() => {
                    onExpressInterest(product.id);
                    if (!isInterested) {
                      // Show success message
                      setTimeout(() => onClose(), 1500);
                    }
                  }}
                  disabled={product.status === "coming-soon"}
                  className={`
                    flex-1 py-3 px-6 rounded-lg font-semibold text-base
                    transition-all duration-200
                    ${
                      isInterested
                        ? "bg-green-100 text-green-800 border-2 border-green-300"
                        : product.status === "coming-soon"
                        ? "bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed"
                        : "bg-[#9F2E2B] text-white hover:bg-[#7a2320] shadow-md hover:shadow-lg"
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
                    "Available Soon"
                  ) : (
                    "Talk to Sales"
                  )}
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

