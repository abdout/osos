"use client";

import React from "react";
import { Dictionary } from "@/components/internationalization/types";

interface MainNavProps {
  dictionary: Dictionary;
}

export default function MainNav({ dictionary }: MainNavProps) {
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
    <div className="hidden md:flex w-4/6">
      <div className="w-1/4">
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
      <div className="w-1/4">
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
      <div className="w-1/4">
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
      <div className="w-1/4">
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
    </div>
  );
}
