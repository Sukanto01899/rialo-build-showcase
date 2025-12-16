export async function generateFingerprint(): Promise<string> {
  const components: (string | number)[] = [
    // Screen info
    screen.width,
    screen.height,
    screen.colorDepth,
    screen.pixelDepth,

    // Browser info
    navigator.userAgent,
    navigator.language,
    navigator.languages?.join(",") || "",
    navigator.platform,
    navigator.hardwareConcurrency || 0,
    (navigator as any).deviceMemory || 0,

    // Timezone
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    new Date().getTimezoneOffset(),

    // Canvas fingerprint
    await getCanvasFingerprint(),

    // WebGL fingerprint
    getWebGLFingerprint(),
  ];

  const fingerprint = components.join("|");
  return await hashString(fingerprint);
}

/**
 * Canvas fingerprinting - highly unique
 */
async function getCanvasFingerprint(): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "no-canvas";

  canvas.width = 200;
  canvas.height = 50;

  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.fillText("Rialo Builder Hub 🚀", 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
  ctx.fillText("Rialo Builder Hub 🚀", 4, 17);

  return canvas.toDataURL();
}

/**
 * WebGL fingerprinting
 */
function getWebGLFingerprint(): string {
  const canvas = document.createElement("canvas");
  const gl = (canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

  if (!gl) return "no-webgl";

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (debugInfo) {
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string;
    const renderer = gl.getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL,
    ) as string;
    return `${vendor}~${renderer}`;
  }

  return "no-debug-info";
}

/**
 * Hash a string using SubtleCrypto API
 */
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
