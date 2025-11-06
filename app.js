// ============================================
// ADMIN CREDENTIALS (For demonstration only)
// ============================================

const ADMIN_USERNAME = "sandy";
const ADMIN_PASSWORD = "sandyhacker";
const STORAGE_KEY = "gosandyApks";

// ============================================
// DEFAULT APK DATA
// ============================================

const defaultApksData = [
    {
        id: 1,
        name: "Go Sandy - Main App",
        version: "2.5.1",
        category: "games",
        description: "The main Go Sandy application with all the latest features and improvements.",
        downloads: 15420,
        image: "https://via.placeholder.com/300x160/DC2626/ffffff?text=Go+Sandy+Main",
        downloadUrl: "https://example.com/go-sandy-main-2.5.1.apk"
    },
    {
        id: 2,
        name: "Go Sandy Lite",
        version: "1.8.0",
        category: "games",
        description: "Lightweight version of Go Sandy optimized for low-end devices.",
        downloads: 8930,
        image: "https://via.placeholder.com/300x160/EF4444/ffffff?text=Go+Sandy+Lite",
        downloadUrl: "https://example.com/go-sandy-lite-1.8.0.apk"
    },
    {
        id: 3,
        name: "Go Sandy Pro",
        version: "3.0.0",
        category: "games",
        description: "Premium version with exclusive features and no ads.",
        downloads: 5210,
        image: "https://via.placeholder.com/300x160/991B1B/ffffff?text=Go+Sandy+Pro",
        downloadUrl: "https://example.com/go-sandy-pro-3.0.0.apk"
    },
    {
        id: 4,
        name: "Sandy Tools",
        version: "1.2.3",
        category: "tools",
        description: "Essential tools and utilities for Go Sandy players.",
        downloads: 3450,
        image: "https://via.placeholder.com/300x160/7F1D1D/ffffff?text=Sandy+Tools",
        downloadUrl: "https://example.com/sandy-tools-1.2.3.apk"
    },
    {
        id: 5,
        name: "Sandy Companion",
        version: "2.1.0",
        category: "tools",
        description: "Companion app for tracking stats and achievements.",
        downloads: 2890,
        image: "https://via.placeholder.com/300x160/DC2626/ffffff?text=Sandy+Companion",
        downloadUrl: "https://example.com/sandy-companion-2.1.0.apk"
    },
    {
        id: 6,
        name: "Sandy Social",
        version: "1.5.2",
        category: "social",
        description: "Connect with other Go Sandy players and share your achievements.",
        downloads: 4120,
        image: "https://via.placeholder.com/300x160/EF4444/ffffff?text=Sandy+Social",
        downloadUrl: "https://example.com/sandy-social-1.5.2.apk"
    },
    {
        id: 7,
        name: "Sandy Chat",
        version: "1.3.1",
        category: "social",
        description: "Real-time chat and messaging for the Go Sandy community.",
        downloads: 3670,
        image: "https://via.placeholder.com/300x160/991B1B/ffffff?text=Sandy+Chat",
        downloadUrl: "https://example.com/sandy-chat-1.3.1.apk"
    },
    {
        id: 8,
        name: "Sandy Planner",
        version: "2.0.0",
        category: "productivity",
        description: "Plan and organize your Go Sandy gaming sessions.",
        downloads: 2340,
        image: "https://via.placeholder.com/300x160/7F1D1D/ffffff?text=Sandy+Planner",
        downloadUrl: "https://example.com/sandy-planner-2.0.0.apk"
    },
    {
        id: 9,
        name: "Sandy Notes",
        version: "1.1.0",
        category: "productivity",
        description: "Take notes and keep track of important game tips.",
        downloads: 1890,
        image: "https://via.placeholder.com/300x160/DC2626/ffffff?text=Sandy+Notes",
        downloadUrl: "https://example.com/sandy-notes-1.1.0.apk"
    }
];

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
        renderApks(apks);
        setupCategoryFilters();
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', init);

// Support for smooth scrolling and basic analytics
console.log('Go Sandy APK Hub - Static Version loaded successfully!');
