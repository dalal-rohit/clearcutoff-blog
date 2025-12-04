"use client";
import React from "react";

export default function BreadcrumbScriptLD({ breadcrumbItems, id="breadcrumbs" }: { breadcrumbItems: any, id?: string }) {

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbItems) }}
    />
  );
}
