// ============================================
// ADMIN CREDENTIALS (For demonstration only)
// ============================================

const ADMIN_USERNAME = "sandy";
const ADMIN_PASSWORD = "sandyhacker";
const STORAGE_KEY = "gosandyApks";

// ============================================
// DEFAULT APK DATA
// ============================================

const defaultApksData = [];

// ============================================
// STORAGE FUNCTIONS
// ============================================

/**
 * Get APKs from Local Storage or return default data
 */
function getApksData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Error parsing stored APKs:", e);
            return defaultApksData;
        }
    }
    return defaultApksData;
}

/**
 * Save APKs to Local Storage
 */
function saveApksData(apks) {
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
 */
function getNextApkId() {
    const apks = getApksData();
    return apks.length > 0 ? Math.max(...apks.map(a => a.id)) + 1 : 1;
}

// ============================================
// DOM ELEMENTS
// ============================================

const apkGrid = document.getElementById('apkGrid');
const categoryButtons = document.querySelectorAll('.category-btn');

// ============================================
// FUNCTIONS
// ============================================

/**
 * Render APK cards to the grid
 */
function renderApks(apksToRender) {
    if (!apkGrid) return; // Exit if not on APK listing page

    if (apksToRender.length === 0) {
        apkGrid.innerHTML = '<div class="empty-state">No APKs available in this category</div>';
        return;
    }

    apkGrid.innerHTML = apksToRender.map(apk => `
        <div class="apk-card">
            <img src="${apk.image}" alt="${apk.name}" class="apk-image">
            <div class="apk-header">
                <h4 class="apk-name">${apk.name}</h4>
                <p class="apk-version">v${apk.version}</p>
            </div>
            <div class="apk-content">
                <p class="apk-description">${apk.description}</p>
                <div class="apk-stats">
                    <strong>Downloads: ${apk.downloads.toLocaleString()}</strong>
                </div>
                <div class="apk-buttons">
                    <button class="apk-btn apk-btn-download" onclick="downloadApk(${apk.id}, '${apk.name}')">
                        📥 Download
                    </button>
                    <button class="apk-btn apk-btn-details" onclick="viewDetails(${apk.id})">
                        Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Filter APKs by category
 */
function filterByCategory(category) {
    const apks = getApksData();
    if (category === 'all') {
        renderApks(apks);
    } else {
        const filtered = apks.filter(apk => apk.category === category);
        renderApks(filtered);
    }
}

/**
 * Handle category button clicks
 */
function setupCategoryFilters() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter APKs
            const category = button.getAttribute('data-category');
            filterByCategory(category);
        });
    });
}

/**
 * Handle APK download
 */
function downloadApk(apkId, apkName) {
    const apks = getApksData();
    const apk = apks.find(a => a.id === apkId);
    if (apk && apk.downloadUrl) {
        window.location.href = apk.downloadUrl;
        console.log(`Download initiated for: ${apkName}`);
    } else {
        alert(`Download link not available for ${apkName}`);
    }
}

/**
 * Handle view details
 */
function viewDetails(apkId) {
    const apks = getApksData();
    const apk = apks.find(a => a.id === apkId);
    if (apk) {
        alert(`Details for ${apk.name}\n\nVersion: ${apk.version}\nCategory: ${apk.category}\nDownloads: ${apk.downloads}\n\nDescription: ${apk.description}`);
        console.log('Viewing details for:', apk);
    }
}

/**
 * Initialize the page
 */
function init() {
    // Only run on APK listing page
    if (apkGrid) {
        const apks = getApksData();
        if (apks.length === 0) {
            apkGrid.innerHTML = '<div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem;"><p style="font-size: 1.2rem; color: #00FF00; text-shadow: 0 0 5px #00FF00;">No APKs available yet.</p><p style="color: #00FFFF; margin-top: 1rem;">Use the Admin Panel to add your APKs.</p></div>';
        } else {
            renderApks(apks);
        }
        setupCategoryFilters();
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', init);

// Support for smooth scrolling and basic analytics
console.log('Go Sandy APK Hub - Static Version loaded successfully!');
console.log('No default APKs loaded. Use the Admin Panel to add APKs.');
