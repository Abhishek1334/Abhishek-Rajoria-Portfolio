# Abhishek Rajoria's Portfolio 🚀

A modern, responsive portfolio website showcasing my projects, skills, and experience. Built with cutting-edge technologies and best practices in web development.

![Portfolio Preview](src/Media/HomePage.png)

## 🌟 Features

- **Modern Design**: Clean, responsive, and interactive UI built with TailwindCSS
- **Project Showcase**: Interactive project cards with detailed modals
- **Image Gallery**: Advanced image viewing with zoom and pan capabilities
- **Smooth Animations**: Fluid transitions and micro-interactions using Framer Motion
- **Performance Optimized**: Fast loading times and optimized assets
- **SEO Friendly**: Meta tags and semantic HTML for better search engine visibility
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern UI library for building interactive interfaces
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Next-generation frontend tooling for fast development and optimized builds
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library
- **Lucide Icons**: Beautiful, consistent icons
- **Shadcn/ui**: Re-usable components built with Radix UI and Tailwind CSS

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing
- **Vite**: Build tool and development server

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/Abhishek1334/Abhishek-Rajoria-Portfolio.git
cd Abhishek-Rajoria-Portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## 📦 Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── Media/         # Project media files
├── styles/        # Global styles
└── utils/         # Utility functions
```

## 🎨 Customization

### Theme Configuration
The project uses TailwindCSS for styling. You can customize the theme in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Your custom colors
      },
      // Other theme customizations
    }
  }
}
```

### Adding Projects
Add your projects in `src/components/ProjectsSection.tsx`:

```typescript
const projects = [
  {
    id: 'project-id',
    title: 'Project Title',
    // ... other project details
  }
];
```

## 🚀 Deployment

The project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy!

## 📱 Responsive Design

The portfolio is fully responsive and works seamlessly on:
- Desktop
- Tablet
- Mobile devices

## 🔍 SEO Optimization

- Meta tags for better search engine visibility
- Semantic HTML structure
- Optimized images and assets
- Proper heading hierarchy

## 🎯 Performance

- Optimized image loading
- Code splitting
- Lazy loading components
- Efficient asset bundling with Vite

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhishek Rajoria**
- GitHub: [@Abhishek1334](https://github.com/Abhishek1334)
- LinkedIn: [Abhishek Rajoria](https://www.linkedin.com/in/abhishek-rajoria/)

## 🙏 Acknowledgments

- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)

---

⭐️ If you like this project, please give it a star on GitHub!
