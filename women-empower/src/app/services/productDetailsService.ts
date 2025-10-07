"use server";

import { revalidatePath } from "next/cache";

export async function submitReviewAction(formData: FormData) {
  const rating = formData.get("rating")as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  // Save to DB here (Prisma, Mongo, etc.)
  console.log("📩 New Review:", { rating, title, description });

//   revalidatePath("/product/[id]"); // revalidate product page
}
