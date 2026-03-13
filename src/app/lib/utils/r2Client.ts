
// Minimal R2 helper for frontend (Next.js or plain TypeScript).
// Handles image upload, retrieval, and deletion using your backend endpoints.
import { API_BASE_URL } from '../config';
const API_BASE = `${API_BASE_URL.replace(/\/$/, '')}/r2`;
/**
 * Upload a file or Blob to Cloudflare R2.
 * Calls backend → gets presigned URL → uploads to R2 → returns { key, accessUrl }.
 */
export async function uploadToR2(
  input: File | Blob | string
): Promise<{ key: string; accessUrl: string }> {
  // 1️⃣ Determine Content-Type and normalize input into a Blob
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

  const fileType = blob.type || "application/octet-stream";

  // 1️⃣ Get presigned upload URL
  const uploadUrlRes = await fetch(`${API_BASE}/generate-upload-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: input instanceof File ? input.name : `upload-${Date.now()}`,
      fileType,
    }),
  });

  if (!uploadUrlRes.ok) {
    throw new Error(`Failed to get presigned upload URL: ${uploadUrlRes.status}`);
  }

  const { uploadUrl, key } = await uploadUrlRes.json();

  // 2️⃣ Upload file directly to R2
  let putRes: Response;
  try {
    putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": fileType },
      body: blob,
    });
  } catch (err: any) {
    console.error("❌ R2 Fetch Network Error:", err);
    if (err.message === "Failed to fetch") {
      throw new Error(
        "Upload failed. This is likely a CORS issue or interference from a browser extension (like 'Video Downloader Professional'). Please ensure R2 CORS is configured and try disabling extensions."
      );
    }
    throw err;
  }

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

  const data = await accessRes.json();
  const accessUrl = data.accessUrl || data.url || data.signedUrl;

  // 4️⃣ Return key and access URL
  return { key, accessUrl };
}

/**
 * Get a temporary access URL for a stored R2 object.
 * Use the key you previously stored in your DB.
 */
export async function getFromR2(key: string): Promise<string> {
  const res = await fetch(
    `${API_BASE}/generate-access-url?key=${encodeURIComponent(key)}`
  );

  if (!res.ok) throw new Error("Failed to get access URL");

  const data: any = await res.json();
  const resolved = data?.accessUrl || data?.url || data?.href || data?.signedUrl;
  if (!resolved || typeof resolved !== 'string') {
    throw new Error('Access URL not present in response');
  }
  return resolved;
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
