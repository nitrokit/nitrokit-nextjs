# Contributing to Nitrokit

Thank you for your interest in contributing to Nitrokit! 🎉 We welcome contributions from everyone and are grateful for every contribution, no matter how small.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Coding Standards](#-coding-standards)
- [Translation Guidelines](#-translation-guidelines)
- [Testing Guidelines](#-testing-guidelines)
- [Commit Guidelines](#-commit-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Issue Reporting](#-issue-reporting)
- [Community](#-community)

## 🤝 Code of Conduct

This project adheres to a [Code of Conduct](https://github.com/nitrokit/.github/blob/main/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [hello@nitrokit.tr](mailto:hello@nitrokit.tr).

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and yarn
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**

    ```bash
    # Click the "Fork" button on GitHub
    ```

2. **Clone your fork**

    ```bash
    git clone https://github.com/YOUR_USERNAME/nitrokit-nextjs.git
    cd nitrokit-nextjs
    ```

3. **Add upstream remote**

    ```bash
    git remote add upstream https://github.com/nitrokit/nitrokit-nextjs.git
    ```

4. **Install dependencies**

    ```bash
    yarn install
    ```

5. **Set up environment variables**

    ```bash
    cp .env.example .env.local
    # Edit .env.local with your values
    ```

6. **Start development server**

    ```bash
    yarn dev
    ```

7. **Verify setup**
    - Open [http://localhost:3000](http://localhost:3000)
    - Run tests: `yarn test`
    - Check linting: `yarn lint`

## 🔄 Development Workflow

### Before You Start

1. **Check existing issues** to avoid duplicating work
2. **Create or comment on an issue** to discuss your proposed changes
3. **Get approval** for large changes before implementing

### Branch Strategy

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description

# Or for documentation
git checkout -b docs/what-you-are-documenting
```

### Staying Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Update your main branch
git checkout main
git merge upstream/main

# Rebase your feature branch
git checkout feature/your-feature-name
git rebase main
```

## 📏 Coding Standards

### TypeScript Guidelines

- Use **strict TypeScript** configuration
- Prefer **interfaces** over types for object shapes
- Use **explicit return types** for functions
- Avoid `any` type - use `unknown` if needed

```typescript
// ✅ Good
interface UserProps {
    id: string;
    name: string;
    email?: string;
}

function createUser(props: UserProps): User {
    // implementation
}

// ❌ Avoid
function createUser(props: any): any {
    // implementation
}
```

### React Guidelines

- Use **functional components** with hooks
- Prefer **named exports** over default exports
- Use **TypeScript** for prop types
- Follow **React Hooks** rules

```tsx
// ✅ Good
interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
    return (
        <button className={`btn btn-${variant}`} onClick={onClick}>
            {children}
        </button>
    );
}

// ❌ Avoid
export default function Button(props: any) {
    return <button {...props} />;
}
```

### Styling Guidelines

- Use **TailwindCSS** classes
- Follow **mobile-first** approach
- Use **semantic class names** when needed
- Avoid inline styles

```tsx
// ✅ Good
<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-4xl">
    Welcome
  </h1>
</div>

// ❌ Avoid
<div style={{ display: 'flex', flexDirection: 'column' }}>
  <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
    Welcome
  </h1>
</div>
```

### File Organization

```
components/
├── ui/                 # Basic UI components
│   ├── Button/
│   │   ├── index.ts
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
│   └── ...
├── layout/            # Layout components
└── forms/             # Form components
```

## 🌍 Translation Guidelines

### Adding New Translation Keys

1. **Add to source file**

    ```json
    // messages/source.json
    {
        "navigation": {
            "home": "Home",
            "about": "About"
        }
    }
    ```

2. **Run translation script**

    ```bash
    export GEMINI_API_KEY="your-key"
    cd shell
    ./sync_translations_gemini.sh
    ```

3. **Review translations** in all language files

### Translation Best Practices

- Use **descriptive keys**: `navigation.home` not `nav1`
- Keep **context in mind**: Include context in key names
- Use **interpolation** for dynamic content
- Write **clear source text**: AI translates from English

```json
// ✅ Good
{
  "auth.login.title": "Sign in to your account",
  "auth.login.button": "Sign In",
  "auth.login.forgotPassword": "Forgot your password?",
  "profile.greeting": "Hello, {name}!"
}

// ❌ Avoid
{
  "title": "Title",
  "button": "Button",
  "link": "Link",
  "text": "Some text with {value}"
}
```

## 🧪 Testing Guidelines

### Test Structure

```typescript
// components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant class', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
});
```

### Writing Tests

- **Test behavior**, not implementation
- Use **descriptive test names**
- Follow the **AAA pattern** (Arrange, Act, Assert)
- Mock **external dependencies** (`vi.mock` or `vi.fn`)
- Aim for **80%+ coverage**

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run a specific test file
yarn test src/components/Button/Button.test.tsx

# Run tests with coverage
yarn test:coverage
```

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(auth): add social login with Google"

# Bug fix
git commit -m "fix(ui): correct button alignment on mobile"

# Documentation
git commit -m "docs: update installation instructions"

# Breaking change
git commit -m "feat(api)!: change user authentication flow

BREAKING CHANGE: The authentication API now requires OAuth 2.0"
```

## 🔀 Pull Request Process

### Before Submitting

1. **Update your branch** with latest main
2. **Run all checks**:

    ```bash
    yarn lint          # Check linting
    yarn test          # Run tests
    yarn type-check    # Check TypeScript
    yarn build         # Test build
    ```

3. **Update documentation** if needed
4. **Add tests** for new features

### PR Template

Use this template for your pull request:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] New tests added
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or marked as such)
```

### Review Process

1. **Automated checks** must pass
2. **At least one approval** from maintainers
3. **No conflicts** with main branch
4. **All conversations resolved**

## 🐛 Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**

1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**

- OS: [e.g. macOS, Windows]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 1.0.0]
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the feature

**Problem it Solves**
What problem does this solve?

**Proposed Solution**
How would you like it to work?

**Alternative Solutions**
Other approaches considered

**Additional Context**
Any other context or screenshots
```

## 📊 Development Tools

### Recommended VS Code Extensions

```json
{
    "recommendations": [
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss",
        "ms-vscode.vscode-typescript-next",
        "streetsidesoftware.code-spell-checker"
    ]
}
```

### Useful Commands

```bash
# Check all code quality
yarn lint && yarn test && yarn type-check

# Fix formatting issues
yarn format:write

# Update dependencies
yarn upgrade-interactive

# Analyze bundle
yarn build && yarn analyze
```

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

- 🌍 **Translations**: Adding new languages or improving existing ones
- 🎨 **UI Components**: Building reusable components
- 🧪 **Testing**: Adding tests for existing features
- 📖 **Documentation**: Improving guides and examples
- 🐛 **Bug Fixes**: Fixing reported issues
- ⚡ **Performance**: Optimizing app performance
- ♿ **Accessibility**: Making the app more accessible

## 💬 Community

- 🐛 **Issues**: [GitHub Issues](https://github.com/nitrokit/nitrokit-nextjs/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/orgs/nitrokit/discussions)
- 📧 **Email**: [hello@nitrokit.tr](mailto:hello@nitrokit.tr)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Testing Library Docs](https://testing-library.com/docs/)
- [Storybook Documentation](https://storybook.js.org/docs)

---

**Thank you for contributing to Nitrokit! 🙏**

Your contributions help make this project better for everyone.
