# Contributing to EValuate

Thank you for your interest in contributing to EValuate! We welcome contributions from the community to help make this EV economics calculator even better.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/ajithrn/evaluate.git
   cd evaluate
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173 in your browser

## How to Contribute

### Reporting Issues
- Use the [GitHub Issues](https://github.com/ajithrn/evaluate/issues) page
- Search existing issues before creating a new one
- Provide clear description and steps to reproduce
- Include browser version and operating system

### Suggesting Features
- Open an issue with the "enhancement" label
- Describe the feature and its benefits
- Explain how it fits with the project's goals

### Code Contributions

#### Pull Request Process
1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test thoroughly:
   - Ensure tooltips work correctly
   - Check for layout shifts
   - Verify calculations are accurate
   - Test on different browsers
4. Commit with clear messages:
   ```bash
   git commit -m "Add: new battery chemistry support"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request

#### Code Style Guidelines
- **JavaScript**: ES6+ modules, class-based architecture
- **HTML**: Semantic markup with accessibility attributes
- **CSS**: Use Tailwind utilities, minimal custom styles
- **Comments**: JSDoc format for functions, inline for complex logic

#### Testing Checklist
- [ ] Tooltips appear correctly next to help buttons
- [ ] No table shifting on hover
- [ ] All calculations are accurate
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Code follows project style

## Project Structure

```
src/
├── js/
│   ├── main.js              # Main application controller
│   ├── components/          # Modular components
│   │   ├── Calculator.js    # Core calculation engine
│   │   ├── ChemistrySelector.js
│   │   ├── SummaryDashboard.js
│   │   └── Tables.js
│   └── utils/               # Utility functions
│       ├── formatters.js
│       └── validators.js
└── styles/
    ├── main.scss           # Main styles
    └── variables.scss      # SCSS variables
```

## Areas for Contribution

- Export functionality (PDF reports)
- Additional battery chemistry support
- Performance optimizations
- Real-time electricity pricing integration
- Vehicle database with popular EV models
- Multi-vehicle comparison matrix
- Enhanced mobile experience
- Multi-language support
- Social sharing features
- Advanced data visualization
- Dark mode theme

## Development Tips

### Adding Battery Chemistries
- Update `chemistryData` in Calculator.js
- Add efficiency values for both 0-100% and 20-80% cycles
- Include descriptive text for user guidance

### Modifying Calculations
- All calculations are in Calculator.js
- Maintain precision for currency formatting
- Update corresponding table displays

## Questions?

- Open a [Discussion](https://github.com/ajithrn/evaluate/discussions)
- Check existing issues and documentation
- Review the README for technical details

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication

Thank you for contributing to EValuate! 🚗⚡
