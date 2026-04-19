/**
 * Returns the full URL for an asset (avatar, thumbnail, etc.).
 * If the path is already a full URL (starts with http/https), it returns it as is.
 * Otherwise, it prepends the backend API URL.
 * 
 * @param {string} path - The relative or absolute path to the asset
 * @returns {string} The full asset URL
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  
  // Check if it's already an absolute URL
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Ensure we don't have double slashes if the path starts with /
  const baseUrl = process.env.REACT_APP_API_URL;
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${cleanBaseUrl}${cleanPath}`;
};
