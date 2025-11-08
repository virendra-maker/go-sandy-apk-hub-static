// ============================================
// ADMIN PANEL JAVASCRIPT
// ============================================

import { getApksData, saveApksData, getNextApkId, ADMIN_USERNAME, ADMIN_PASSWORD, AUTH_KEY } from './utils.js';

// ============================================
// DOM ELEMENTS
// ============================================

const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const loginForm = document.getElementById('loginForm');
const addApkForm = document.getElementById('addApkForm');
const apkListContainer = document.getElementById('apkListContainer');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

/**
 * Check if user is already logged in
 */
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY) === 'true';
    if (isAuthenticated) {
        showDashboard();
    }
}

/**
 * Handle login
 */
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        showDashboard();
    } else {
        showError('Invalid username or password');
        document.getElementById('password').value = '';
    }
}

/**
 * Logout
 */
function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    loginForm.reset();
    showLogin();
}

/**
 * Show login screen
 */
function showLogin() {
    loginScreen.style.display = 'flex';
    dashboardScreen.style.display = 'none';
}

/**
 * Show dashboard
 */
function showDashboard() {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    loadApksList();
}

// ============================================
// APK MANAGEMENT FUNCTIONS
// ============================================

// Storage and utility functions are now imported from utils.js

/**
 * Add new APK
 */
function addApk(e) {
    e.preventDefault();
    
    const newApk = {
        id: getNextApkId(),
        name: document.getElementById('appName').value.trim(),
        version: document.getElementById('appVersion').value.trim(),
        category: document.getElementById('appCategory').value,
        description: document.getElementById('appDescription').value.trim(),
        downloads: parseInt(document.getElementById('appDownloads').value) || 0,
        image: document.getElementById('appImage').value.trim(),
        downloadUrl: document.getElementById('appDownloadUrl').value.trim()
    };
    
    // Validation
    if (!newApk.name || !newApk.version || !newApk.category || !newApk.description || !newApk.image || !newApk.downloadUrl) {
        showError('Please fill in all required fields');
        return;
    }
    
    // Add to list
    const apks = getApksData();
    apks.push(newApk);
    
    // Save
    if (saveApksData(apks)) {
        showSuccess('APK added successfully!');
        addApkForm.reset();
        loadApksList();
    } else {
        showError('Failed to save APK');
    }
}

/**
 * Delete APK
 */
function deleteApk(id) {
    if (confirm('Are you sure you want to delete this APK?')) {
        const apks = getApksData();
        const filtered = apks.filter(apk => apk.id !== id);
        
        if (saveApksData(filtered)) {
            showSuccess('APK deleted successfully!');
            loadApksList();
        } else {
            showError('Failed to delete APK');
        }
    }
}

/**
 * Load and display APKs list
 */
function loadApksList() {
    const apks = getApksData();
    
    if (apks.length === 0) {
        apkListContainer.innerHTML = '<p style="text-align: center; color: #6B7280; padding: 2rem;">No APKs added yet. Add your first APK above!</p>';
        return;
    }
    
    apkListContainer.innerHTML = apks.map(apk => `
        <div class="apk-list-item">
            <div class="apk-list-info">
                <div class="apk-list-name">${apk.name}</div>
                <div class="apk-list-details">
                    <strong>Version:</strong> ${apk.version} | 
                    <strong>Category:</strong> ${apk.category} | 
                    <strong>Downloads:</strong> ${apk.downloads}
                </div>
                <div class="apk-list-details" style="margin-top: 0.5rem;">
                    <strong>Description:</strong> ${apk.description.substring(0, 100)}${apk.description.length > 100 ? '...' : ''}
                </div>
            </div>
            <div class="apk-list-actions">
                <button class="admin-btn admin-btn-danger" onclick="deleteApk(${apk.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// MESSAGE FUNCTIONS
// ============================================

/**
 * Show success message
 */
function showSuccess(message) {
    successMessage.textContent = '✅ ' + message;
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = '❌ ' + message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================

loginForm.addEventListener('submit', handleLogin);
addApkForm.addEventListener('submit', addApk);

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

console.log('Admin Panel loaded successfully!');
console.log(`Admin Credentials (Placeholder): Username: ${ADMIN_USERNAME}, Password: ${ADMIN_PASSWORD}. Please change these in utils.js for a real deployment.`);
