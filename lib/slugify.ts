/**
 * Convert project name to SEO-friendly slug
 * Example: "AI Task Manager Pro!" → "ai-task-manager-pro"
 */
export function createSlug(text: string): string {
  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      // Remove special characters
      .replace(/[^\w\s-]/g, "")
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // Replace multiple hyphens with single hyphen
      .replace(/-+/g, "-")
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "")
  );
}
/**
 * Generate unique slug with random suffix
 * Example: "ai-task-manager-a3f9k2"
 */
export function generateUniqueSlug(title: string): string {
  const baseSlug = createSlug(title);
  const randomSuffix = generateRandomString(6);
  return `${baseSlug}-${randomSuffix}`;
}

/**
 * Generate random alphanumeric string
 */
function generateRandomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate slug with timestamp
 * Example: "ai-task-manager-1703123456"
 */
export function generateSlugWithTimestamp(title: string): string {
  const baseSlug = createSlug(title);
  const timestamp = Date.now().toString().slice(-8);
  return `${baseSlug}-${timestamp}`;
}

/**
 * Generate slug with nanoid (more unique, shorter)
 * Requires: npm install nanoid
 */
export async function generateSlugWithNanoid(title: string): Promise<string> {
  const { nanoid } = await import("nanoid");
  const baseSlug = createSlug(title);
  const uniqueId = nanoid(8); // 8 character unique ID
  return `${baseSlug}-${uniqueId}`;
}
