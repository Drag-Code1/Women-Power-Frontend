
// Minimal R2 helper for frontend (Next.js or plain TypeScript).
// Handles image upload, retrieval, and deletion using your backend endpoints.

const API_BASE = "http://localhost:5000/v1/r2";
/**
 * Upload a file or Blob to Cloudflare R2.
 * Calls backend → gets presigned URL → uploads to R2 → returns { key, accessUrl }.
 */
export async function uploadToR2(
  input: File | Blob | string
): Promise<{ key: string; accessUrl: string }> {
  // 🧩 Normalize input into a Blob
  let blob: Blob;

  if (input instanceof File || input instanceof Blob) {
    blob = input;
  } else if (typeof input === "string" && input.startsWith("data:")) {
    // Convert base64 string → Blob
    const parts = input.split(",");
    const mime = parts[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const byteString = atob(parts[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    blob = new Blob([ab], { type: mime });
  } else {
    throw new Error("Invalid input: must be a File, Blob, or base64 data URL string.");
  }

  // 1️⃣ Get presigned upload URL
  const uploadUrlRes = await fetch(`${API_BASE}/generate-upload-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: input instanceof File ? input.name : `upload-${Date.now()}`,
      fileType: blob.type || "application/octet-stream",
    }),
  });

  if (!uploadUrlRes.ok) {
    throw new Error(`Failed to get presigned upload URL: ${uploadUrlRes.status}`);
  }

  const { uploadUrl, key } = await uploadUrlRes.json();

  // 2️⃣ Upload file directly to R2
  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": blob.type },
    body: blob,
  });

  if (!putRes.ok) {
    const bodyText = await putRes.text().catch(() => "");
    throw new Error(`Upload to R2 failed: ${putRes.status} ${bodyText}`);
  }

  // 3️⃣ Get access URL
  const accessRes = await fetch(
    `${API_BASE}/generate-access-url?key=${encodeURIComponent(key)}`
  );

  if (!accessRes.ok) {
    throw new Error(`Failed to get access URL: ${accessRes.status}`);
  }

  const { accessUrl } = await accessRes.json();

  // 4️⃣ Return key and access URL
  return { key, accessUrl };
}

/**
 * Get a temporary access URL for a stored R2 object.
 * Use the key you previously stored in your DB.
 */
export async function getFromR2(key: string): Promise<string> {
  const res = await fetch(
    `${API_BASE}/generate-access-url?key=${key}`
  );

  if (!res.ok) throw new Error("Failed to get access URL");

  const { url } = await res.json();
  console.log("Generated access URL:", url);
  return url;
}

/**
 * Delete a file from R2 by its key.
 */
export async function deleteFromR2(key: string): Promise<void> {
  const res = await fetch(`${API_BASE}/delete-image`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });

  if (!res.ok) throw new Error(`Failed to delete file: ${res.status}`);
}
