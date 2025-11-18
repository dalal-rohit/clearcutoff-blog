"use client";
import { getBreadcrumbSchema } from "@/utils/google/get-breadcrumb-schema";
import React from "react";

export default function BreadcrumbScriptLD({ breadcrumbItems }: any) {
  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
    />
  );
}
