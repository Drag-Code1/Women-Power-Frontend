"use server";

export async function submitReviewAction(request: Request) {
  const body = await request.json();

  const rating = body.rating;
  const title = body.title;
  const description = body.rating_description;

  console.log({ rating, title, description });
}