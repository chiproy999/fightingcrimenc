# GitHub Copilot Instructions for Fighting Crime NC

This document provides guidelines for GitHub Copilot to assist with the Fighting Crime NC project.

## Project Overview

Fighting Crime NC is a modern, fully-responsive crime news aggregation website covering all 100 North Carolina counties. The site provides real-time crime alerts, wanted persons information, missing persons alerts, and community safety resources.

**Live URL:** https://fightingcrimenc-three.vercel.app

## Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Library:** shadcn/ui components
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** TanStack Query (React Query)
- **Forms:** React Hook Form with Zod validation
- **Backend:** Supabase (Authentication & Database)

### Backend/API
- **Platform:** Vercel Serverless Functions
- **Language:** TypeScript
- **Testing:** Jest with ts-jest
- **Web Scraping:** Custom scrapers for NC police departments

## Project Structure

```
/
├── .github/               # GitHub configuration (Copilot instructions)
├── api/                   # Vercel serverless functions
│   ├── __tests__/        # API tests
│   ├── lib/              # Shared utilities and scrapers
│   ├── news-scraper.ts   # Main news scraper endpoint
│   ├── rss.ts            # RSS feed endpoint
│   ├── rss-aggregator.ts # RSS aggregation logic
│   ├── rss-config.ts     # RSS feed configuration
│   └── wral-news-ai.ts   # WRAL news AI processor
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Custom components
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Third-party integrations (Supabase)
│   ├── lib/             # Shared utilities
│   ├── pages/           # Route pages
│   └── App.tsx          # Main app component
├── supabase/            # Supabase configuration
└── Documentation files (*.md)
```

## Development Workflow

### Setup Commands
```bash
npm install              # Install dependencies
npm run dev             # Start development server (port 8080)
npm run build           # Build for production
npm run build:dev       # Build in development mode
npm run preview         # Preview production build
```

### Testing Commands
```bash
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

### Linting
```bash
npm run lint            # Run ESLint
```

## Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use type inference where appropriate

### React Components
- Use functional components with hooks
- Follow the existing component structure in `src/components/`
- Use shadcn/ui components from `src/components/ui/` when possible
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks in `src/hooks/`

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system and color scheme
- Ensure responsive design (mobile-first approach)
- Use the `cn()` utility from `src/lib/utils.ts` for conditional classes

### File Naming
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities/hooks: camelCase (e.g., `useAuth.tsx`)
- API endpoints: kebab-case (e.g., `news-scraper.ts`)
- Test files: `*.test.ts` or `*.spec.ts`

### Code Organization
- Keep files focused and under 300 lines when possible
- Extract complex logic into separate utility functions
- Use barrel exports (`index.ts`) for cleaner imports
- Group related functionality together

## API Development

### Vercel Serverless Functions
- All API endpoints are in the `/api` directory
- Use TypeScript for type safety
- Handle errors gracefully with proper HTTP status codes
- Return JSON responses with consistent structure
- Add CORS headers when necessary

### Example API Structure
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // Your logic here
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}
```

## Testing Guidelines

### Test Structure
- Tests are located in `api/__tests__/` directory
- Use Jest with ts-jest preset
- Write unit tests for utility functions
- Test API endpoints with mock data
- Aim for meaningful test coverage, not just 100%

### Test Naming
- Use descriptive test suite names
- Use "should" statements for test descriptions
- Group related tests using nested `describe` blocks

### Example Test Pattern
```typescript
describe('FunctionName', () => {
  describe('SpecificScenario', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = functionToTest(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

## Database & Authentication

### Supabase Integration
- Configuration is in `src/integrations/supabase/`
- Use the `supabase` client from `src/integrations/supabase/client.ts`
- Authentication is handled via `src/hooks/useAuth.tsx`
- Database types are in `src/integrations/supabase/types.ts`

### Best Practices
- Always handle authentication errors gracefully
- Use RLS (Row Level Security) policies in Supabase
- Don't expose sensitive credentials in client code
- Use environment variables for configuration

## State Management

### React Query (TanStack Query)
- Use for server state management
- Configure query client in `src/App.tsx`
- Use appropriate stale times and cache times
- Handle loading and error states consistently

### Form State
- Use React Hook Form for form management
- Use Zod for validation schemas
- Show validation errors inline
- Provide clear user feedback

## UI/UX Guidelines

### Design Principles
- Modern, clean, and professional appearance
- Dark theme with high contrast
- Mobile-first responsive design
- Accessible (follow WCAG guidelines)
- Fast loading and performance

### Component Patterns
- Use loading states (spinners, skeletons)
- Show error states with clear messages
- Provide user feedback (toasts, alerts)
- Use consistent spacing and typography
- Implement proper focus management

## SEO Considerations

- Use React Helmet Async for meta tags
- Include proper Open Graph and Twitter Card tags
- Use semantic HTML elements
- Optimize images (lazy loading, proper sizing)
- Include structured data (JSON-LD) where appropriate

## Security

### Important Security Practices
- Never commit API keys or secrets to the repository
- Use environment variables for sensitive data
- Validate and sanitize user inputs
- Implement rate limiting on API endpoints
- Use HTTPS for all external requests
- Follow OWASP security guidelines

## Deployment

### Vercel Deployment
- Production: Automatically deploys from `main` branch
- Preview: Automatically deploys from PRs
- Environment variables are configured in Vercel dashboard
- Build command: `npm run build`
- Output directory: `dist`

### Pre-deployment Checklist
- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in browser
- [ ] Mobile responsive
- [ ] Performance optimized

## Documentation

### Code Comments
- Add JSDoc comments for exported functions
- Explain complex logic with inline comments
- Document API endpoints with parameters and return types
- Keep comments up-to-date with code changes

### Project Documentation
- Update relevant markdown files when making significant changes
- Keep HANDOFF.md updated with architectural changes
- Document new features in README.md or relevant guides
- Add troubleshooting steps for common issues

## Common Tasks

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`
4. Add appropriate SEO meta tags
5. Test on mobile and desktop

### Adding a New API Endpoint
1. Create file in `/api` directory
2. Export default function handler
3. Add proper TypeScript types
4. Handle errors appropriately
5. Add tests in `api/__tests__/`
6. Document endpoint behavior

### Adding a New UI Component
1. Check if shadcn/ui has a suitable component first
2. Create in `src/components/` (or `src/components/ui/` for shared UI)
3. Use TypeScript with proper prop types
4. Style with Tailwind CSS
5. Make it responsive
6. Export from appropriate index file

## Important Notes

- **RSS Scrapers:** The web scrapers in `api/lib/` are archived and currently return 0 items. They need debugging but are not actively used.
- **Content Source:** Primary content comes from RSS feeds configured in `api/rss-config.ts`
- **Counties Coverage:** Site covers all 100 NC counties - maintain this coverage
- **Performance:** Keep bundle size reasonable; lazy-load heavy components
- **Analytics:** Google Analytics and Facebook Pixel are configured in `index.html`

## Getting Help

- Read HANDOFF.md for comprehensive project documentation
- Check QUICK-START.md for common setup tasks
- Review existing code for patterns and conventions
- Check issue tracker for known problems
- Test changes locally before committing

## Conclusion

When contributing to this project, prioritize:
1. **User experience** - Keep the site fast and intuitive
2. **Code quality** - Write clean, maintainable code
3. **Type safety** - Use TypeScript effectively
4. **Testing** - Ensure changes don't break existing functionality
5. **Documentation** - Keep docs current and helpful

For questions or clarifications, refer to the project documentation files in the root directory.
