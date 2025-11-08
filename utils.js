// ============================================
// SHARED UTILITY FUNCTIONS
// ============================================

export const STORAGE_KEY = "gosandyApks";
export const AUTH_KEY = "adminAuthenticated";

// For a static site, we will use a placeholder for credentials
// and add a clear warning. The user's original credentials were:
// const ADMIN_USERNAME = "sandy";
// const ADMIN_PASSWORD = "sandyhacker";
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "password"; // Placeholder, user should change this in the code

/**
 * Get APKs from Local Storage or return default data
 * @returns {Array<Object>} The array of APK objects.
 */
export function getApksData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Error parsing stored APKs:", e);
            return [];
        }
    }
    return [];
}

/**
 * Save APKs to Local Storage
 * @param {Array<Object>} apks - The array of APK objects to save.
 * @returns {boolean} True if save was successful, false otherwise.
 */
export function saveApksData(apks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(apks));
        return true;
    } catch (e) {
        console.error("Error saving APKs:", e);
        return false;
    }
}

/**
 * Get next available ID for new APK
 * @returns {number} The next available ID.
 */
export function getNextApkId() {
    const apks = getApksData();
    // Use a safe way to find the max ID, defaulting to 0 if no APKs exist
    const maxId = apks.reduce((max, apk) => (apk.id > max ? apk.id : max), 0);
    return maxId + 1;
}

console.log('utils.js loaded.');
