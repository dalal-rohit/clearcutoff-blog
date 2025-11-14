"use client";
import React from "react";

export default function BreadcrumbScriptLD({ breadcrumbLd }: any) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
    />
  );
}
