"use client";

import React from "react";
import { Dictionary } from "@/components/internationalization/types";

interface MobileNavProps {
  dictionary: Dictionary;
}

export default function MobileNav({ dictionary }: MobileNavProps) {
  const { footer } = dictionary.marketing;

  const productLinks = [
    "Shipment Tracking",
    "Customs Clearance",
    "Documentation",
    "Invoicing",
    "Analytics",
    "Notifications",
  ];

  const companyLinks = ["About", "Careers", "Blog", "Case Studies"];

  const serviceLinks = [
    footer.links.import,
    footer.links.export,
    footer.links.warehouse,
    footer.links.transport,
  ];

  const supportLinks = ["Help Center", footer.contact, "Documentation", "Service Status"];

  return (
    <div className="md:hidden mt-8">
      {/* Mobile: Product and Company in one row */}
      <div className="flex flex-row gap-8 w-full mb-8">
        <div className="w-1/2">
          <p className="mb-[12px] font-medium text-[oklch(1_0_0)]">
            {footer.quickLinks}
          </p>
          <div className="flex flex-col gap-3">
            {productLinks.map((item, index) => (
              <p
                key={index}
                className="hover:cursor-pointer transition-colors text-[oklch(1_0_0/0.8)] hover:text-[oklch(0.97_0_0)]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <p className="mb-[12px] font-medium text-[oklch(1_0_0)]">Company</p>
          <div className="flex flex-col gap-3">
            {companyLinks.map((item, index) => (
              <p
                key={index}
                className="hover:cursor-pointer transition-colors text-[oklch(1_0_0/0.8)] hover:text-[oklch(0.97_0_0)]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Services and Support in one row */}
      <div className="flex flex-row gap-8 w-full">
        <div className="w-1/2">
          <p className="mb-[12px] font-medium text-[oklch(1_0_0)]">
            {footer.contact}
          </p>
          <div className="flex flex-col gap-3">
            {supportLinks.map((item, index) => (
              <p
                key={index}
                className="hover:cursor-pointer transition-colors text-[oklch(1_0_0/0.8)] hover:text-[oklch(0.97_0_0)]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <p className="mb-[12px] font-medium text-[oklch(1_0_0)]">
            {footer.services}
          </p>
          <div className="flex flex-col gap-3">
            {serviceLinks.map((item, index) => (
              <p
                key={index}
                className="hover:cursor-pointer transition-colors text-[oklch(1_0_0/0.8)] hover:text-[oklch(0.97_0_0)]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
