# Premium Developer Portfolio & CV Website

A beautiful, interactive, single-page portfolio and resume website built with a premium glassmorphic dark-mode design. It features an interactive particle network background, text typing animations, smooth scroll reveals, project filtering tabs, and a fully functional contact form.

---

## 🚀 Getting Started

The project is built entirely on standard Web standards and has **zero build dependencies**. 

### 1. Previewing Locally
To view the portfolio:
- Simply double-click [index.html](index.html) to open it in your browser.
- Alternatively, you can run a local web server (like VS Code's Live Server extension, or `npx serve .` / `python -m http.server`) to test the particle background and API scripts locally.

### 2. Setting Up the Contact Form
The contact form is connected to **[Web3Forms](https://web3forms.com/)**, a free, serverless contact form service. To receive emails directly:
1. Go to [web3forms.com](https://web3forms.com/) and enter your email address to get a **free Access Key** sent to you.
2. Open [index.html](index.html) and locate this line (around line 337):
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. Replace `"YOUR_ACCESS_KEY_HERE"` with your actual Web3Forms access key.
4. Save the file and test submitting the form. You'll receive emails instantly!

---

## 🛠️ Personalization Guide

You can fully customize all aspects of this portfolio by editing the source files:

### 1. Update Profile & Information
Open [index.html](index.html) and modify the text within:
- **Hero Title**: Update your name in `Hi, I'm <span class="highlight">Alex Morgan</span>`.
- **Dynamic Titles**: Locate the array `const words = [...]` at the top of [index.js](index.js) (around line 32) to change the titles typed out in the typing animation:
  ```javascript
  const words = ["Software Engineer", "Full-Stack Developer", "Creative Coder", "Problem Solver"];
  ```
- **Social Links**: Replace the link values in the `profile-socials` container (lines 65–85) with your GitHub, LinkedIn, and Twitter profiles.

### 2. Customizing Skills
Open [index.html](index.html) and navigate to the `<section id="skills">` section (around line 144). You can add, edit, or delete `<span class="skill-tag">` tags to match your skillset.

### 3. Modifying Experience Timeline
Open [index.html](index.html) and navigate to `<section id="experience">` (around line 198). Each experience block is represented by:
```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content glass-card">
        <span class="timeline-date">START - END</span>
        <h3 class="timeline-role">Your Role</h3>
        <h4 class="timeline-company">Company Name</h4>
        <p class="timeline-desc">Description of your responsibilities...</p>
    </div>
</div>
```
Add or remove as many milestones as you require.

### 4. Customizing Projects
Open [index.html](index.html) and navigate to `<section id="projects">` (around line 241).
- **Categories**: Each project card has a `data-category` attribute (e.g. `data-category="fullstack"`, `data-category="frontend"`, or `data-category="creative"`).
- **Filters**: Make sure the category matches one of the filter button `data-filter` names in the navigation tabs (e.g. `data-filter="frontend"`).
- **Icons**: You can swap the SVG markup inside `.project-image-placeholder` to represent your project.

---

## 🎨 Modifying Visual Colors
You can tweak the theme colors, glow colors, and font styling inside [index.css](index.css) within the `:root` rule (lines 4–28). For example:
- To change the primary purple accent to blue, update:
  ```css
  --primary: #3b82f6; /* Modern Blue */
  --primary-glow: rgba(59, 130, 246, 0.2);
  ```

---

## 📦 Deployment
Since this website consists entirely of static assets (`index.html`, `index.css`, and `index.js`), you can host it for free on:
- **GitHub Pages**
- **Vercel**
- **Netlify**
- **Cloudflare Pages**
- **GitHub gist / sandbox**
