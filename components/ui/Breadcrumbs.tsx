"use client";

import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string; // undefined = current page (not clickable)
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="sticky top-14 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              const isClickable = !isLast && item.href;

              return (
                <li key={index} className="flex items-center gap-2">
                  {/* Item */}
                  {isClickable ? (
                    <Link
                      href={item.href!}
                      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#9F2E2B] transition-colors"
                    >
                      {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                      <span>{item.label}</span>
                    </span>
                  )}

                  {/* Separator */}
                  {!isLast && (
                    <svg
                      className="w-4 h-4 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}

