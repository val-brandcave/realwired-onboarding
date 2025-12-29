"use client";

import React, { useState, ReactNode } from "react";

interface AccordionItemProps {
  id: string;
  title: string;
  count?: number;
  badge?: string;
  children: ReactNode;
  isExpanded?: boolean;
  onToggle?: (id: string) => void;
}

export function AccordionItem({
  id,
  title,
  count,
  badge,
  children,
  isExpanded = false,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border border-border rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => onToggle?.(id)}
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-accent transition-colors"
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${id}`}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {count !== undefined && (
            <span className="text-xs text-muted-foreground">
              ({count} {count === 1 ? "setting" : "settings"})
            </span>
          )}
          {badge && (
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      
      {isExpanded && (
        <div
          id={`accordion-content-${id}`}
          className="p-4 pt-0 bg-card"
          role="region"
          aria-labelledby={`accordion-header-${id}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  children: ReactNode;
  defaultExpanded?: string[];
  allowMultiple?: boolean;
}

export function Accordion({
  children,
  defaultExpanded = [],
  allowMultiple = true,
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      if (prev.includes(id)) {
        // Collapse
        return prev.filter((expandedId) => expandedId !== id);
      } else {
        // Expand
        if (allowMultiple) {
          return [...prev, id];
        } else {
          return [id];
        }
      }
    });
  };

  // Clone children and inject props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === AccordionItem) {
      const props = child.props as any;
      return React.cloneElement(child as React.ReactElement<any>, {
        ...props,
        isExpanded: expandedIds.includes(props.id),
        onToggle: handleToggle,
      });
    }
    return child;
  });

  return <div className="space-y-0">{childrenWithProps}</div>;
}

