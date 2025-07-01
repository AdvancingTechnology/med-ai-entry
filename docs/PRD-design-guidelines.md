# Design Guidelines PRD

## Design Philosophy
Create a calm, professional medical environment that reduces cognitive load while maintaining the precision healthcare demands. Every element should feel purposeful and contribute to efficient workflows.

## Color System

### Primary Palette
```css
/* Core Brand Colors */
--primary-50: hsl(197, 100%, 95%)    /* Light backgrounds */
--primary-100: hsl(197, 100%, 90%)   /* Subtle highlights */
--primary-200: hsl(197, 100%, 80%)   /* Disabled states */
--primary-500: hsl(197, 100%, 53%)   /* Main brand (#0AB4FF) */
--primary-600: hsl(197, 100%, 45%)   /* Hover states */
--primary-700: hsl(197, 100%, 35%)   /* Active states */
--primary-900: hsl(197, 100%, 15%)   /* Dark text */

/* Accent Colors */
--accent-50: hsl(256, 100%, 95%)     /* Light purple backgrounds */
--accent-500: hsl(256, 100%, 65%)    /* Accent purple (#846AFF) */
--accent-600: hsl(256, 100%, 55%)    /* Hover accent */

/* Semantic Colors */
--success-50: hsl(142, 76%, 95%)     /* Success backgrounds */
--success-500: hsl(142, 76%, 45%)    /* Success primary */
--success-600: hsl(142, 76%, 35%)    /* Success hover */

--warning-50: hsl(48, 96%, 95%)      /* Warning backgrounds */
--warning-500: hsl(48, 96%, 55%)     /* Warning primary */
--warning-600: hsl(48, 96%, 45%)     /* Warning hover */

--error-50: hsl(0, 84%, 95%)         /* Error backgrounds */
--error-500: hsl(0, 84%, 55%)        /* Error primary */
--error-600: hsl(0, 84%, 45%)        /* Error hover */
```

### Neutral Palette
```css
/* Grayscale System */
--gray-50: hsl(220, 14%, 98%)        /* Page backgrounds */
--gray-100: hsl(220, 14%, 95%)       /* Card backgrounds */
--gray-200: hsl(220, 14%, 90%)       /* Borders, dividers */
--gray-300: hsl(220, 14%, 80%)       /* Input borders */
--gray-400: hsl(220, 14%, 65%)       /* Placeholder text */
--gray-500: hsl(220, 14%, 50%)       /* Secondary text */
--gray-600: hsl(220, 14%, 35%)       /* Primary text */
--gray-700: hsl(220, 14%, 25%)       /* Headings */
--gray-900: hsl(220, 14%, 10%)       /* High contrast text */
```

### Medical Context Colors
```css
/* Medical Status Indicators */
--critical: hsl(0, 84%, 55%)         /* Critical alerts */
--urgent: hsl(25, 95%, 55%)          /* Urgent notifications */
--stable: hsl(142, 76%, 45%)         /* Stable conditions */
--pending: hsl(48, 96%, 55%)         /* Pending reviews */
--completed: hsl(197, 100%, 53%)     /* Completed tasks */
```

## Typography System

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale
```css
/* Display Sizes */
--text-xs: 0.75rem;      /* 12px - Captions, metadata */
--text-sm: 0.875rem;     /* 14px - Small UI text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Large body text */
--text-xl: 1.25rem;      /* 20px - Small headings */
--text-2xl: 1.5rem;      /* 24px - Section headings */
--text-3xl: 1.875rem;    /* 30px - Page headings */
--text-4xl: 2.25rem;     /* 36px - Display headings */

/* Font Weights */
--font-light: 300;       /* Light emphasis */
--font-normal: 400;      /* Body text */
--font-medium: 500;      /* UI elements */
--font-semibold: 600;    /* Subheadings */
--font-bold: 700;        /* Headings */

/* Line Heights */
--leading-tight: 1.25;   /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.625; /* Long-form content */
```

### Typography Usage Rules
1. **Headings:** Always use semibold (600) or bold (700)
2. **Body Text:** Use normal (400) weight, 16px minimum
3. **UI Labels:** Use medium (500) weight for clarity
4. **Metadata:** Use small (14px) size with gray-500 color
5. **Medical Data:** Use monospace for measurements and IDs

## Spacing System

### 8-Point Grid
```css
/* Spacing Scale (based on 0.5rem = 8px) */
--space-1: 0.25rem;     /* 4px - Tight spacing */
--space-2: 0.5rem;      /* 8px - Base unit */
--space-3: 0.75rem;     /* 12px - Small gaps */
--space-4: 1rem;        /* 16px - Standard padding */
--space-5: 1.25rem;     /* 20px - Medium spacing */
--space-6: 1.5rem;      /* 24px - Large spacing */
--space-8: 2rem;        /* 32px - Section spacing */
--space-10: 2.5rem;     /* 40px - Large sections */
--space-12: 3rem;       /* 48px - Page spacing */
--space-16: 4rem;       /* 64px - Major sections */
--space-20: 5rem;       /* 80px - Hero spacing */
```

### Component Spacing Rules
1. **Card Padding:** 24px (space-6) minimum
2. **Button Padding:** 12px horizontal, 8px vertical
3. **Input Padding:** 12px horizontal, 10px vertical
4. **List Items:** 16px padding with 8px gaps
5. **Section Spacing:** 48px between major sections

## Component Design Specifications

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  border: none;
  min-height: 40px;
}

.btn-primary:hover {
  background: var(--primary-600);
  box-shadow: 0 4px 12px hsl(197, 100%, 53%, 0.3);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: var(--primary-700);
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  background: white;
  color: var(--primary-500);
  border: 1px solid var(--primary-500);
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--primary-50);
  border-color: var(--primary-600);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--gray-600);
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
}

.btn-ghost:hover {
  background: var(--gray-100);
  color: var(--gray-700);
}
```

### Form Elements
```css
/* Input Fields */
.input {
  background: white;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  transition: all 0.2s ease;
  min-height: 44px;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px hsl(197, 100%, 53%, 0.1);
}

.input:error {
  border-color: var(--error-500);
  box-shadow: 0 0 0 3px hsl(0, 84%, 55%, 0.1);
}

/* Textarea */
.textarea {
  /* Inherits from input */
  min-height: 80px;
  resize: vertical;
  line-height: 1.5;
}

/* Select Dropdown */
.select {
  /* Inherits from input */
  appearance: none;
  background-image: url("data:image/svg+xml...");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}
```

### Cards & Containers
```css
/* Base Card */
.card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
  box-shadow: 0 1px 3px hsl(220, 14%, 10%, 0.1);
  overflow: hidden;
}

/* Card with hover effect */
.card-hover {
  transition: all 0.2s ease;
}

.card-hover:hover {
  box-shadow: 0 4px 12px hsl(220, 14%, 10%, 0.15);
  transform: translateY(-2px);
}

/* Medical Alert Card */
.card-alert {
  border-left: 4px solid var(--warning-500);
  background: var(--warning-50);
}

.card-critical {
  border-left: 4px solid var(--error-500);
  background: var(--error-50);
}
```

### Navigation Elements
```css
/* Navigation Item */
.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: var(--gray-600);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.nav-item:hover {
  background: var(--primary-50);
  color: var(--primary-600);
}

.nav-item.active {
  background: var(--primary-100);
  color: var(--primary-700);
  font-weight: 600;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-500);
  font-size: 14px;
}

.breadcrumb-separator {
  color: var(--gray-400);
}
```

### Medical-Specific Components
```css
/* Transcript Message */
.transcript-message {
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  max-width: 80%;
}

.transcript-message.user {
  background: var(--primary-100);
  color: var(--primary-900);
  margin-left: auto;
}

.transcript-message.ai {
  background: var(--gray-100);
  color: var(--gray-700);
}

.transcript-message.interim {
  opacity: 0.7;
  font-style: italic;
}

/* Status Indicators */
.status-recording {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--error-500);
  font-weight: 500;
}

.status-recording::before {
  content: "";
  width: 8px;
  height: 8px;
  background: var(--error-500);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* Progress Indicators */
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500), var(--accent-500));
  transition: width 0.3s ease;
}
```

## Animation & Transitions

### Timing Functions
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Standard Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Pulse (for recording indicator) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Slide In (for modals) */
@keyframes slideIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Loading Spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Hover Effects
1. **Lift Effect:** 2px translateY with subtle shadow
2. **Scale Effect:** 1.02 scale for clickable cards
3. **Color Transition:** 200ms ease for all color changes
4. **Border Highlights:** 3px focus ring with brand color

## Responsive Design Rules

### Breakpoints
```css
--mobile: 640px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1280px;
```

### Layout Principles
1. **Mobile First:** Design for 320px minimum width
2. **Touch Targets:** 44px minimum for interactive elements
3. **Content Hierarchy:** Most important content above the fold
4. **Progressive Enhancement:** Core functionality works without JS

### Medical UI Considerations
1. **Large Text Mode:** Support for visually impaired users
2. **High Contrast:** Alternative color scheme for accessibility
3. **Voice Navigation:** Keyboard shortcuts for all actions
4. **Emergency Access:** Critical functions always visible

## Accessibility Standards

### WCAG AA Compliance
1. **Color Contrast:** 4.5:1 minimum for normal text
2. **Focus Indicators:** Visible on all interactive elements
3. **Screen Reader Support:** Semantic HTML and ARIA labels
4. **Keyboard Navigation:** Tab order and skip links
5. **Alternative Text:** All images and icons described

### Medical Accessibility
1. **Audio Transcription:** All voice content has text alternative
2. **Error Prevention:** Clear validation and confirmation dialogs
3. **Timeout Warnings:** Medical forms never auto-timeout
4. **Critical Information:** Never conveyed by color alone

## Content Guidelines

### Voice & Tone
- **Professional but Warm:** Clinical accuracy with human empathy
- **Clear Instructions:** Every action has clear next steps
- **Error Messages:** Helpful, not technical jargon
- **Success Feedback:** Confirm important actions completed

### Writing Style
1. **Sentence Case:** For all headings and labels
2. **Active Voice:** "Review transcript" not "Transcript to be reviewed"
3. **Action-Oriented:** Buttons use verbs ("Save", "Export", "Review")
4. **Scannable:** Use bullets and short paragraphs
5. **Medical Accuracy:** All terminology verified by clinical staff