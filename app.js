// ============================================
// SAMPLE APK DATA
// ============================================

const apksData = [
    {
        id: 1,
        name: "Go Sandy - Main App",
        version: "2.5.1",
        category: "games",
        description: "The main Go Sandy application with all the latest features and improvements.",
        downloads: 15420,
        image: "https://via.placeholder.com/300x160/DC2626/ffffff?text=Go+Sandy+Main"
    },
    {
        id: 2,
        name: "Go Sandy Lite",
        version: "1.8.0",
        category: "games",
        description: "Lightweight version of Go Sandy optimized for low-end devices.",
        downloads: 8930,
        image: "https://via.placeholder.com/300x160/EF4444/ffffff?text=Go+Sandy+Lite"
    },
    {
        id: 3,
        name: "Go Sandy Pro",
        version: "3.0.0",
        category: "games",
        description: "Premium version with exclusive features and no ads.",
        downloads: 5210,
        image: "https://via.placeholder.com/300x160/991B1B/ffffff?text=Go+Sandy+Pro"
    },
    {
        id: 4,
        name: "Sandy Tools",
        version: "1.2.3",
        category: "tools",
        description: "Essential tools and utilities for Go Sandy players.",
        downloads: 3450,
        image: "https://via.placeholder.com/300x160/7F1D1D/ffffff?text=Sandy+Tools"
    },
    {
        id: 5,
        name: "Sandy Companion",
        version: "2.1.0",
        category: "tools",
        description: "Companion app for tracking stats and achievements.",
        downloads: 2890,
        image: "https://via.placeholder.com/300x160/DC2626/ffffff?text=Sandy+Companion"
    },
    {
        id: 6,
        name: "Sandy Social",
        version: "1.5.2",
        category: "social",
        description: "Connect with other Go Sandy players and share your achievements.",
        downloads: 4120,
        image: "https://via.placeholder.com/300x160/EF4444/ffffff?text=Sandy+Social"
    },
    {
        id: 7,
        name: "Sandy Chat",
        version: "1.3.1",
        category: "social",
        description: "Real-time chat and messaging for the Go Sandy community.",
        downloads: 3670,
        image: "https://via.placeholder.com/300x160/991B1B/ffffff?text=Sandy+Chat"
    },
    {
        id: 8,
        name: "Sandy Planner",
        version: "2.0.0",
        category: "productivity",
        description: "Plan and organize your Go Sandy gaming sessions.",
        downloads: 2340,
        image: "https://via.placeholder.com/300x160/7F1D1D/ffffff?text=Sandy+Planner"
    },
    {
        id: 9,
        name: "Sandy Notes",
        version: "1.1.0",
        category: "productivity",
        description: "Take notes and keep track of important game tips.",
        downloads: 1890,
        image: "https://via.placeholder.com/300x160/DC2626/ffffff?text=Sandy+Notes"
    }
];

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
    if (category === 'all') {
        renderApks(apksData);
    } else {
        const filtered = apksData.filter(apk => apk.category === category);
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
    const apk = apksData.find(a => a.id === apkId);
    if (apk) {
        // Simulate download - in real app, this would be a backend API call
        alert(`Downloading ${apkName} v${apk.version}...\n\nIn a real application, this would download the APK file.`);
        console.log(`Download initiated for: ${apkName}`);
    }
}

/**
 * Handle view details
 */
function viewDetails(apkId) {
    const apk = apksData.find(a => a.id === apkId);
    if (apk) {
        // In a real app, this would navigate to a detail page
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
        renderApks(apksData);
        setupCategoryFilters();
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', init);

// Support for smooth scrolling and basic analytics
console.log('Go Sandy APK Hub - Static Version loaded successfully!');
