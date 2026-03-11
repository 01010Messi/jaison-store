"use client";

import { use } from "react";
import ProductForm from "../ProductForm";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  // Next.js 14: params may be a plain object or a Promise
  const resolvedParams =
    params instanceof Promise ? use(params) : params;
  return <ProductForm productId={resolvedParams.id} />;
}
