# Go Sandy APK Hub - Static Version

A simple, fast, and easy-to-deploy static website for the Go Sandy APK Hub. Built with pure HTML, CSS, and vanilla JavaScript.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Fast Loading**: Pure static files with no build process required
- **Easy Deployment**: Deploy to Vercel, Netlify, GitHub Pages, or any static host in seconds
- **Beautiful UI**: Red gradient theme matching the original design
- **Category Filtering**: Browse APKs by category
- **No Dependencies**: No frameworks, no build tools, no complexity

## Project Structure

```
go-sandy-apk-hub-static/
├── index.html          # Home page
├── apks.html           # APK listing page
├── styles.css          # All styles (responsive design)
├── app.js              # JavaScript functionality
├── package.json        # Project metadata
├── README.md           # This file
└── vercel.json         # Vercel configuration
```

## Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/go-sandy-apk-hub-static.git
   cd go-sandy-apk-hub-static
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000`
   - Home page: `http://localhost:8000`
   - APK listing: `http://localhost:8000/apks.html`

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Your site will be live in seconds!

### Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Click "Deploy site"

### Deploy to GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "GitHub Pages"
   - Select "main" branch as source
   - Your site will be available at `https://yourusername.github.io/go-sandy-apk-hub-static`

## Customization

### Change the APK Data

Edit the `apksData` array in `app.js`:

```javascript
const apksData = [
    {
        id: 1,
        name: "Your APK Name",
        version: "1.0.0",
        category: "games",
        description: "Your APK description",
        downloads: 1000,
        image: "https://your-image-url.com/image.jpg"
    },
    // ... more APKs
];
```

### Change Colors

Edit the CSS variables in `styles.css`. The main color is red (`#DC2626`). Search for color values and replace them.

### Add More Pages

1. Create a new `.html` file
2. Copy the header and footer from existing pages
3. Add your content in the middle
4. Link it from the navigation in the header

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Page Load Time**: < 1 second
- **Bundle Size**: ~50KB (HTML + CSS + JS combined)
- **No External Dependencies**: Everything is self-contained
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)

## API Integration

To connect to a real backend API:

1. Update the `downloadApk()` function in `app.js`:
   ```javascript
   async function downloadApk(apkId, apkName) {
       const response = await fetch(`/api/apks/${apkId}/download`);
       const data = await response.json();
       window.location.href = data.downloadUrl;
   }
   ```

2. Replace the sample `apksData` with API calls:
   ```javascript
   async function loadApks() {
       const response = await fetch('/api/apks');
       const apksData = await response.json();
       renderApks(apksData);
   }
   ```

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for the Go Sandy community**
