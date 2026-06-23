# Xprinta Pro - Design System Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Design Philosophy](#design-philosophy)
3. [CSS Variables (Design Tokens)](#css-variables-design-tokens)
4. [Typography System](#typography-system)
5. [Color Palette](#color-palette)
6. [Spacing Scale](#spacing-scale)
7. [Layout Patterns](#layout-patterns)
8. [Component Patterns](#component-patterns)
9. [Naming Conventions](#naming-conventions)
10. [Best Practices](#best-practices)
11. [Examples](#examples)

---

## Overview

The Xprinta Pro design system is built on **CSS custom properties (variables)** to ensure consistency, maintainability, and scalability across the entire application. All design tokens are centralized in `/src/style.css` under the `:root` selector.

### Key Principles

- ✅ **DRY (Don't Repeat Yourself)**: Zero hardcoded values - everything uses variables
- ✅ **BEM Methodology**: Block Element Modifier naming for classes
- ✅ **Component Composition**: Base classes + modifiers instead of duplication
- ✅ **Semantic Naming**: Variables describe purpose, not appearance
- ✅ **Mobile-First**: Responsive by default

---

## Design Philosophy

### Premium Studio Aesthetic

Inspired by award-winning studios like **Noteworthy**, **Spade**, and **Handhold**:

- Clean, minimal layouts
- Sophisticated typography with tight letter-spacing
- Ample whitespace
- Subtle interactions
- Premium custom cursor
- Smooth GSAP animations

### Token-Based Architecture

```
Design Tokens (CSS Variables)
    ↓
Utility Classes
    ↓
Component Base Classes
    ↓
Component Modifiers
    ↓
Specific Implementations
```

---

## CSS Variables (Design Tokens)

All variables are defined in `:root` in `/src/style.css`.

### Colors

#### Primary Palette
```css
--color-primary: #0A0A0A;     /* Text and primary dark elements */
--color-secondary: #F4F4F5;   /* Background */
--color-tertiary: #FFFFFF;    /* Cards and elevated elements */
--color-highlight: #F18108;   /* Sophisticated vibrant orange */
```

#### Text Colors
```css
--color-text: #0A0A0A;
--color-text-muted: #71717A;
--color-text-inverse: #FFFFFF;
```

#### Borders
```css
--color-border: #E4E4E7;
--color-border-dark: #D4D4D8;
```

#### Neutral Scale (Tailwind-inspired)
```css
--color-neutral-0: #FFFFFF;
--color-neutral-50: #FAFAFA;
--color-neutral-100: #F4F4F5;
--color-neutral-200: #E4E4E7;
--color-neutral-300: #D4D4D8;
--color-neutral-400: #A1A1AA;
--color-neutral-500: #71717A;
--color-neutral-600: #52525B;
--color-neutral-700: #3F3F46;
--color-neutral-800: #27272A;
--color-neutral-900: #18181B;
```

#### Semantic Colors
```css
--color-success: #34B257;  /* Green for success states */
--color-black: #000000;
--color-white: #FFFFFF;
```

### Typography

#### Font Families
```css
--font-family-base: 'Inter', system-ui, sans-serif;
--font-family-serif: 'Merriweather', serif;
--font-family-heading: 'Inter', system-ui, sans-serif;
--font-family-body: 'Inter', system-ui, sans-serif;
```

#### Font Sizes (Type Scale)
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-md: 1.125rem;   /* 18px */
--font-size-lg: 1.25rem;    /* 20px */
--font-size-xl: 1.5rem;     /* 24px */
--font-size-2xl: 2rem;      /* 32px */
--font-size-3xl: 2.5rem;    /* 40px */
--font-size-4xl: 3rem;      /* 48px */
--font-size-5xl: 4rem;      /* 64px */
```

#### Font Weights
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

#### Line Heights
```css
--line-height-tight: 1.1;
--line-height-snug: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;
```

### Spacing

#### Numeric Scale (4px base unit)
```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-7: 1.75rem;   /* 28px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
--spacing-32: 8rem;     /* 128px */
```

#### Semantic Aliases
```css
--spacing-xs: var(--spacing-2);   /* 8px */
--spacing-sm: var(--spacing-4);   /* 16px */
--spacing-md: var(--spacing-6);   /* 24px */
--spacing-lg: var(--spacing-8);   /* 32px */
--spacing-xl: var(--spacing-12);  /* 48px */
--spacing-2xl: var(--spacing-16); /* 64px */
--spacing-3xl: var(--spacing-20); /* 80px */
--spacing-4xl: var(--spacing-24); /* 96px */
--spacing-5xl: var(--spacing-32); /* 128px */
```

### Border Radius
```css
--border-radius-sm: 8px;
--border-radius-md: 16px;
--border-radius-lg: 24px;
--border-radius-xl: 32px;
--border-radius-full: 9999px;

/* Aliases */
--radius-sm: var(--border-radius-sm);
--radius-md: var(--border-radius-md);
--radius-lg: var(--border-radius-lg);
```

### Layout Constants
```css
--container-max-width: 1440px;
--navbar-height: 76px;
--header-height: 90px;
```

### Transitions & Animations
```css
--transition-speed: 0.4s;
--transition-fast: 0.2s;
--transition-base: 0.3s;
--transition-slow: 0.5s;
--transition-slower: 0.8s;

--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-custom: cubic-bezier(0.16, 1, 0.3, 1);
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Z-Index Scale
```css
--z-base: 1;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

---

## Typography System

### Predefined Classes

#### Display Typography
```css
.text-huge {
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 500;
  letter-spacing: -0.05em;
  line-height: 0.9;
}

.text-large {
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.text-caption {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 600;
  color: var(--color-highlight);
}
```

#### Utility Classes
```css
.text-inverse { color: var(--color-text-inverse); }
.text-muted { color: var(--color-text-muted); }
.text-uppercase { text-transform: uppercase; }
```

### Usage Examples

```html
<!-- Hero title -->
<h1 class="text-huge">Innovación en 3D</h1>

<!-- Section title -->
<h2 class="text-large">El Proceso <span class="accent-text">Lineal</span></h2>

<!-- Section label -->
<span class="text-caption">01 / Servicios</span>
```

---

## Color Palette

### Usage Guidelines

#### Primary Colors (Dark UI)
- **Background**: `--color-secondary` (#F4F4F5)
- **Text**: `--color-primary` (#0A0A0A)
- **Accent**: `--color-highlight` (#F18108)

#### Semantic Usage
```css
/* Success states */
background: var(--color-success);

/* Borders */
border: 1px solid var(--color-border);

/* Muted text */
color: var(--color-text-muted);

/* White text on dark backgrounds */
color: var(--color-text-inverse);
```

#### Neutral Scale Usage
```css
/* Light cards */
background: var(--color-neutral-0);

/* Slightly off-white backgrounds */
background: var(--color-neutral-50);

/* Dividers */
border-color: var(--color-neutral-200);

/* Disabled states */
color: var(--color-neutral-400);

/* Dark elements */
background: var(--color-neutral-900);
```

---

## Spacing Scale

### 4px Base Unit System

All spacing follows a **4px base unit** (0.25rem) for consistency:

```
4px → 8px → 12px → 16px → 20px → 24px → 32px → 40px → 48px → 64px → 80px
```

### Usage Examples

```css
/* Component padding */
.card {
  padding: var(--spacing-md); /* 24px */
}

/* Gaps between elements */
.section {
  gap: var(--spacing-lg); /* 32px */
}

/* Margin utilities */
.mt-8 {
  margin-top: var(--spacing-8); /* 32px */
}
```

### When to Use Each Size

- **xs (8px)**: Tight spacing within components
- **sm (16px)**: Default spacing between related elements
- **md (24px)**: Default card/section padding
- **lg (32px)**: Spacing between sections
- **xl (48px)**: Large gutters
- **2xl-5xl (64px-128px)**: Section-level padding

---

## Layout Patterns

### Main Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Sidebar (274px)  │  Main Container              │
│                  │  ┌──────────────────────────┐ │
│                  │  │ Header (90px)            │ │
│                  │  ├──────────────────────────┤ │
│                  │  │ Content Area             │ │
│                  │  │ (padding: 80px)          │ │
│                  │  │ (padding-top: 0)         │ │
│                  │  └──────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Container Pattern

```css
.app-main-container {
  padding: var(--spacing-3xl);     /* 80px - lateral and bottom */
  padding-top: 0;                   /* Header goes flush to top */
}

.page-container {
  width: 100%;
  min-height: 100vh;
  padding-bottom: var(--spacing-3xl); /* 80px */
}
```

### Grid Utilities

```css
.grid { display: grid; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
@media (max-width: 1024px) {
  .grid-cols-4, .grid-cols-3 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .grid-cols-4, .grid-cols-3, .grid-cols-2 { grid-template-columns: 1fr; }
}
```

### Flexbox Utilities

```css
.flex { display: flex; }
.justify-between { justify-content: space-between; }
.align-center { align-items: center; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
```

---

## Component Patterns

### BEM + Modifier Pattern

**Structure**: `.block__element--modifier`

```css
/* Base component */
.card {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  background: var(--color-neutral-0);
}

/* Element within component */
.card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

/* Modifier for variant */
.card--highlighted {
  background: var(--color-highlight);
  color: var(--color-text-inverse);
}

.card--success {
  background: var(--color-success);
}
```

### Usage Example

```html
<div class="card card--highlighted">
  <h3 class="card__title">Premium Feature</h3>
  <p class="card__description">Description text</p>
</div>
```

### Component Composition Example

**Divider Component** (reusable with modifiers):

```css
/* Base shared by ALL dividers */
.divider {
  width: 100px;
  height: 5px;
  border-radius: 5px;
  flex: none;
  flex-grow: 0;
}

/* Only the differences */
.divider--primary { background: var(--color-highlight); }
.divider--success { background: var(--color-success); }
.divider--white { background: var(--color-neutral-0); }
.divider--centered { align-self: center; }
```

**Usage**:
```html
<!-- Orange divider, centered -->
<div class="divider divider--primary divider--centered"></div>

<!-- Green divider, centered -->
<div class="divider divider--success divider--centered"></div>

<!-- White divider -->
<div class="divider divider--white"></div>
```

---

## Naming Conventions

### BEM Methodology

```
Block:    .component-name
Element:  .component-name__element
Modifier: .component-name--variant
```

### Examples

```css
/* ✅ GOOD */
.project-card { }
.project-card__header { }
.project-card__title { }
.project-card--featured { }

/* ❌ BAD */
.projectCard { }            /* camelCase */
.project_card_header { }    /* too many underscores */
.featured-card { }          /* reversed order */
```

### Component Naming Rules

1. **Blocks** describe the component purpose (e.g., `.navbar`, `.hero`, `.footer`)
2. **Elements** describe parts of the component (e.g., `__logo`, `__title`, `__button`)
3. **Modifiers** describe variants or states (e.g., `--active`, `--large`, `--primary`)

---

## Best Practices

### 🏆 Golden Rule: NEVER Hardcode Values

```css
/* ❌ BAD - Hardcoded values */
.card {
  padding: 24px;
  background: #FFFFFF;
  border-radius: 16px;
  color: #0A0A0A;
}

/* ✅ GOOD - Use variables */
.card {
  padding: var(--spacing-md);
  background: var(--color-neutral-0);
  border-radius: var(--radius-md);
  color: var(--color-text);
}
```

### 🚨 Critical: Use `min-height` Instead of `height`

**Problem**: Fixed `height` prevents content from growing dynamically (especially in edit modes with inputs/selects).

```css
/* ❌ BAD - Content gets cut off */
.card {
  height: 185px;
}

/* ✅ GOOD - Allows dynamic growth */
.card {
  min-height: 185px; /* IMPORTANT: min-height allows dynamic growth */
}
```

**Apply to ALL**:
- Cards
- Content containers
- Titles
- Labels and text elements
- Badges
- Input wrappers
- Any element with variable content

**Exceptions** (rare):
- Fixed-size icons (both width/height fixed)
- Decorative elements (dividers)
- Images with fixed aspect ratio

### Component Reusability Checklist

Before creating a new class:

- [ ] Does a similar class exist? → Search the CSS first
- [ ] Can I use modifiers? → Add `--variant` instead of new class
- [ ] Am I duplicating properties? → Extract to base class
- [ ] Am I using CSS variables? → NEVER hardcode values

### Reutilization Hierarchy

```
1. CSS Variables (design tokens)
   ↓
2. Utility Classes (typography, spacing, colors)
   ↓
3. Component Base Classes (.card, .badge, .divider)
   ↓
4. Component Modifiers (--primary, --success, --centered)
   ↓
5. Specific Classes (only if absolutely necessary)
```

### Anti-Patterns to Avoid

#### ❌ Creating separate classes for each color

```css
/* BAD */
.divider-orange { background: #FA8029; }
.divider-green { background: #34B257; }
.divider-white { background: #FFFFFF; }
```

#### ✅ Use semantic modifiers

```css
/* GOOD */
.divider--primary { background: var(--color-highlight); }
.divider--success { background: var(--color-success); }
.divider--white { background: var(--color-neutral-0); }
```

#### ❌ Duplicating entire structures

```css
/* BAD */
.marca-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.importe-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
```

#### ✅ Share base class

```css
/* GOOD */
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
}
```

### Quality Metrics

A well-designed CSS should achieve:

- **DRY**: Maximum 3 duplicate properties before extracting to shared class
- **Modifier Ratio**: 5:1 (5 modifiers per new class)
- **Variable Usage**: 100% (ZERO hardcoded values)
- **Reusability**: >80% of classes should be shared/reused

---

## Examples

### Example 1: Card Component System

```css
/* Base shared by ALL cards */
.card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  gap: var(--spacing-md);
  border-radius: var(--radius-md);
  min-height: 185px; /* IMPORTANT: min-height allows dynamic growth */
  flex: none;
  flex-grow: 0;
}

/* Variants only change what's needed */
.card--white {
  background: var(--color-neutral-0);
  border: 1px solid var(--color-border);
}

.card--success {
  background: var(--color-neutral-900);
  color: var(--color-text-inverse);
}

.card--gradient {
  background: linear-gradient(180deg,
    rgba(52, 178, 87, 0.04) 0%,
    rgba(52, 178, 87, 0.2) 36.06%);
  border: 1px solid var(--color-success);
}
```

**HTML Usage**:
```html
<!-- White card with border -->
<div class="card card--white">
  <h4 class="card__title">Title</h4>
  <p class="card__content">Content</p>
</div>

<!-- Dark success card -->
<div class="card card--success">
  <h4 class="card__title">Success</h4>
  <p class="card__content">Content</p>
</div>

<!-- Gradient card with green accent -->
<div class="card card--gradient">
  <h4 class="card__title">Featured</h4>
  <p class="card__content">Content</p>
</div>
```

### Example 2: Typography Component

```css
/* Base title styles */
.card__title {
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-tight);
  min-height: 22px; /* IMPORTANT: min-height allows dynamic growth */
}

/* Modifiers for specific needs */
.card__title--centered {
  text-align: center;
}

.card__title--muted {
  color: var(--color-text-muted);
}

.card__title--inverse {
  color: var(--color-text-inverse);
}
```

### Example 3: Button Component

```css
/* Base button */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border: none;
  transition: all var(--transition-base) var(--ease-out);
  cursor: pointer;
}

/* Variants */
.btn--primary {
  background: var(--color-highlight);
  color: var(--color-text-inverse);
}

.btn--primary:hover {
  background: var(--color-primary);
}

.btn--secondary {
  background: var(--color-neutral-100);
  color: var(--color-text);
}

.btn--secondary:hover {
  background: var(--color-neutral-200);
}

/* Size modifiers */
.btn--sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.btn--lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}
```

**HTML Usage**:
```html
<!-- Primary button -->
<button class="btn btn--primary">Click Me</button>

<!-- Secondary small button -->
<button class="btn btn--secondary btn--sm">Cancel</button>

<!-- Primary large button -->
<button class="btn btn--primary btn--lg">Get Started</button>
```

### Example 4: Section Layout Pattern

```css
/* Section container */
.section {
  padding: var(--spacing-3xl) 0; /* 80px vertical */
  background: var(--color-background);
}

.section--dark {
  background: var(--color-neutral-900);
  color: var(--color-text-inverse);
}

/* Section header */
.section__header {
  margin-bottom: var(--spacing-2xl);
}

.section__title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  line-height: var(--line-height-tight);
}

.section__subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  max-width: 600px;
}
```

**HTML Usage**:
```html
<section class="section">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title">Our Services</h2>
      <p class="section__subtitle">
        Comprehensive 3D printing solutions for industry
      </p>
    </div>
    <div class="section__content">
      <!-- Content here -->
    </div>
  </div>
</section>
```

---

## CSS Refactoring Summary

### Before Refactoring
- **83 inline styles** scattered across components
- Hardcoded colors: `#FA8029`, `#34B257`, `#FFFFFF`, etc.
- Hardcoded spacing: `20px`, `24px`, `80px`, etc.
- Duplicate CSS across similar components
- Difficult to maintain consistency

### After Refactoring
- **~150 CSS variables** covering all design aspects
- **3-23 inline styles** (mostly dynamic or section-specific)
- All colors, spacing, typography use variables
- Reusable component classes with BEM methodology
- Easy to maintain and scale

### Notable Exceptions

**El Proceso Section** remains with inline styles due to complex flexbox layout that was difficult to abstract without losing exact visual behavior. This is documented as an acceptable exception.

---

## Tools & Commands

### Search for Existing Styles

Before creating new classes, always search:

```bash
# Search for similar component classes
grep -r "\.card" src/styles/
grep -r "\.badge" src/styles/
grep -r "\.divider" src/styles/

# Search for specific patterns
grep -r "background.*gradient" src/
grep -r "min-height" src/style.css
```

### Debug CSS Issues

```css
/* Add temporarily for debugging */
.debug {
  outline: 2px solid red !important;
  overflow: visible !important;
}
```

---

## Resources

- [BEM Methodology](http://getbem.com/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Design Tokens](https://css-tricks.com/what-are-design-tokens/)
- Inspiration: Noteworthy Studio, Spade Studio, Handhold Studios

---

## Changelog

### v1.0.0 (2026-06-23)
- Initial design system documentation
- 150+ CSS variables established
- BEM naming conventions documented
- Component patterns and examples added
- Best practices and anti-patterns documented

---

**Maintained by**: Xprinta Pro Development Team
**Last Updated**: 2026-06-23
