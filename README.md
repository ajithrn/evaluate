# EValuate: Your Guide to EV Economics

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Project Overview

**EValuate** is a comprehensive, professional-grade electric vehicle economics calculator designed to empower consumers and industry professionals with data-driven insights for EV decision making. The application provides transparent cost analysis, battery chemistry insights, and comprehensive comparisons across different charging scenarios with a focus on energy/fuel costs for fair EV vs ICE comparisons.

### Purpose

In an increasingly complex EV marketplace, EValuate bridges the information gap by providing:
- **Transparent Cost Analysis**: Fair comparison focusing on energy/fuel costs with maintenance transparency
- **Battery Chemistry Insights**: Detailed analysis of how different battery technologies impact charging efficiency
- **Comprehensive User Guidance**: Step-by-step instructions for determining real-world efficiency and costs
- **Professional Interface**: Polished user experience with perfect tooltip positioning and smooth interactions

## Features

### Core Functionality
- **🔋 Battery Chemistry Selection**: Support for major battery types (LFP, NMC, NCA, LTO) with chemistry-specific efficiency modeling
- **💰 Fair Cost Comparisons**: Focus on energy/fuel costs with maintenance cost transparency for both EV and ICE
- **⚡ Real-World Efficiency Analysis**: Comprehensive energy consumption modeling with practical guidance
- **📊 Interactive Data Tables**: Detailed specifications, charging costs, time analysis, and EV vs ICE comparisons
- **🎯 EV Economics Dashboard**: Quick summary with savings analysis, charging frequency, and options comparison
- **📖 Comprehensive Methodology**: Detailed guides for determining EV efficiency and ICE fuel costs

### Enhanced User Experience
- **🎯 Professional UI**: Modern interface with Inter font and consistent Tailwind CSS design
- **💡 Perfect Tooltips**: Smart positioning system that appears exactly next to help buttons
- **📱 Smooth Interactions**: No table shifting on hover, seamless animations throughout
- **🎨 Beautiful Design**: Darker header background, blue help icons, and consistent color scheme
- **⚙️ Intuitive Controls**: Organized input forms with real-time validation and blue-themed help system
- **📱 Responsive Design**: Mobile-first approach ensuring functionality across all device types

### Advanced Analytics
- **📈 Usage-Based Calculations**: Daily, weekly, and monthly charging time and cost analysis
- **🔄 Charging Frequency Recommendations**: Optimal 20-80% charging patterns for battery longevity
- **💸 Comprehensive Savings Analysis**: Multiple EV vs ICE scenarios with annual projections
- **⏱️ Real-World Time Estimates**: Practical charging time calculations based on actual usage patterns
- **🎛️ Multi-Parameter Analysis**: Organized input grid with all charging parameters and costs

### User Guidance Features
- **📚 EV Efficiency Guide**: Three practical methods to determine km/kWh (trip computer, manual calculation, charging data)
- **⛽ ICE Fuel Cost Guide**: Step-by-step instructions for calculating real-world fuel costs
- **💡 Maintenance Cost Transparency**: Typical maintenance costs for both EV (₹0.20-0.50/km) and ICE (₹1.50-3.00/km)
- **🎯 Fair Comparison Focus**: Calculator focuses on energy/fuel costs only for accurate comparisons
- **📊 Typical Value References**: Real-world efficiency ranges and cost estimates for user guidance

## Technical Implementation

### Frontend Stack
```
├── HTML5: Semantic markup with comprehensive methodology sections
├── Tailwind CSS v4: Utility-first styling with extended color palette
├── JavaScript (ES6+): Modular class-based architecture with perfect UX
├── Feather Icons: Lightweight SVG icon system with blue-themed help buttons
└── Inter Font: Professional typography via Google Fonts
```

### Architecture Philosophy
- **Component-Based Design**: Modular JavaScript classes for maintainable code
- **User Experience First**: Perfect tooltip positioning, smooth interactions, no layout shifts
- **Educational Focus**: Comprehensive guides for accurate data input
- **Fair Comparison**: Energy/fuel cost focus with maintenance transparency
- **Professional Polish**: Consistent design, reliable colors, smooth animations

## Calculation Methodology

### Battery Chemistry Efficiency Modeling

The app employs sophisticated efficiency calculations based on real-world battery chemistry characteristics:

```javascript
const chemistryData = {
  LFP: {
    efficiency0to100: 0.91,    // 91% efficiency for full charge
    efficiency20to80: 0.925,   // 92.5% efficiency for optimal range
    description: 'Most popular in modern EVs. Excellent thermal stability and long cycle life.'
  },
  NMC: {
    efficiency0to100: 0.89,    // 89% efficiency
    efficiency20to80: 0.91,    // 91% efficiency
    description: 'Balanced performance chemistry with good energy density.'
  },
  NCA: {
    efficiency0to100: 0.88,    // 88% efficiency
    efficiency20to80: 0.90,    // 90% efficiency
    description: 'High energy density chemistry with excellent performance.'
  },
  LTO: {
    efficiency0to100: 0.93,    // 93% efficiency
    efficiency20to80: 0.94,    // 94% efficiency
    description: 'Ultra-fast charging chemistry with highest efficiency.'
  }
};
```

### Fair Cost Comparison Framework

#### 1. EV Energy Cost Analysis
```
EV Cost per km = Electricity Rate ÷ Wall-to-Wheel Efficiency
Wall-to-Wheel Efficiency = Vehicle Efficiency × Battery Chemistry Efficiency
```

#### 2. ICE Fuel Cost Analysis
```
ICE Cost per km = Fuel Price ÷ Real-World Mileage
Real-World Mileage = Distance Driven ÷ Fuel Consumed (tank-to-tank method)
```

#### 3. Maintenance Cost Transparency
- **EV Maintenance (typical)**: ₹0.20-0.50/km (brake pads, tires, cabin filter, coolant)
- **ICE Maintenance (typical)**: ₹1.50-3.00/km (oil changes, filters, spark plugs, belts, clutch, engine repairs)
- **Calculator Focus**: Energy/fuel costs only for fair comparison

### User Guidance System

#### EV Efficiency Determination Methods
1. **Trip Computer Data**: Check vehicle's infotainment system for km/kWh readings
2. **Manual Calculation**: Record battery % and distance, calculate efficiency
3. **Charging Data**: Use charging app data with 10-15% loss compensation

**Typical Values**: City: 8-12 km/kWh | Highway: 5-8 km/kWh | Mixed: 6-9 km/kWh

#### ICE Fuel Cost Calculation Methods
1. **Fuel Cost Calculation**: Fuel Price ÷ Mileage = Cost per km
2. **Real-World Mileage**: Tank-to-tank method over 200-300 km
3. **Fuel Price Considerations**: Local prices, seasonal variations, fuel grades

**Quick Estimate**: Petrol @₹100/L, 15km/L mileage = ₹6.67/km fuel cost

## Usage

### Live Application
Visit **[evaluate.autos](https://evaluate.autos)** to use the calculator directly in your browser.

### Usage Instructions

1. **Launch Application**: Visit [evaluate.autos](https://evaluate.autos) or start the development server with `npm run dev` and open http://localhost:5173
2. **Read Methodology**: Expand "Technical Methodology & Data Input Guidelines" for comprehensive guidance
3. **Select Battery Chemistry**: Choose from LFP, NMC, NCA, or LTO with detailed efficiency specifications
4. **Configure Vehicle Parameters**: Set battery capacity, efficiency mode, and real-world efficiency values
5. **Set Charging Parameters**: Define electricity rates and charging speeds for different scenarios
6. **Input Usage Patterns**: Specify monthly distance and ICE fuel cost for accurate comparison
7. **Review Dashboard**: Analyze savings, charging frequency, and charging options comparison
8. **Explore Detailed Tables**: Use accordion sections for comprehensive technical analysis

### Browser Compatibility
- ✅ Chrome 90+ (Perfect tooltip positioning)
- ✅ Firefox 88+ (Full feature support)
- ✅ Safari 14+ (Smooth animations)
- ✅ Edge 90+ (Complete functionality)
- ⚠️ Internet Explorer not supported

## Project Structure

```
e-valuate/
├── index.html                 # Main application with comprehensive methodology
├── src/
│   ├── js/
│   │   ├── main.js           # Main application controller with perfect tooltips
│   │   ├── components/
│   │   │   ├── Calculator.js      # Core calculation engine
│   │   │   ├── ChemistrySelector.js # Battery chemistry selection
│   │   │   ├── SummaryDashboard.js  # Dashboard with savings analysis
│   │   │   └── Tables.js           # Data tables with smooth interactions
│   │   └── utils/
│   │       ├── formatters.js      # Currency and time formatting
│   │       └── validators.js      # Input validation
│   └── styles/
│       ├── main.scss         # Minimal custom styles with table hover effects
│       └── variables.scss    # SCSS variables for consistent theming
├── tailwind.config.js        # Tailwind configuration with extended colors
├── package.json             # Project dependencies and scripts
├── README.md               # This comprehensive documentation
└── LICENSE                 # MIT license
```

### Key Components

#### JavaScript Architecture
- **`EVCalculatorApp`**: Main application controller with perfect tooltip positioning
- **`Calculator`**: Core calculation engine with chemistry-specific efficiency modeling
- **`ChemistrySelector`**: Battery chemistry selection with visual feedback
- **`SummaryDashboard`**: Quick insights with savings analysis and charging recommendations
- **`Tables`**: Comprehensive data tables with smooth hover effects

#### User Interface Sections
- **Methodology Accordion**: Comprehensive guides for EV efficiency and ICE fuel costs
- **Battery Chemistry Selection**: Visual cards with efficiency percentages
- **Input Parameters**: Organized form with blue help icons and perfect tooltips
- **EV Economics Dashboard**: Quick summary with key insights and recommendations
- **Data Tables**: Four accordion sections with detailed analysis

## Development

### Development Setup
```bash
# Clone the repository
git clone https://github.com/ajithrn/evaluate.git
cd evaluate

# Install dependencies
npm install

# Start development server with hot reload
npm run dev
# Opens at http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Build & Deploy

This project uses **Vite** as the build tool with **Tailwind CSS** and **SCSS** preprocessing.

#### Build Process:
```bash
# Development build with hot reload
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview production build
npm run preview
```

#### Deployment Options:

**Static Hosting (Recommended):**
```bash
# Deploy to Netlify
# 1. Build: npm run build
# 2. Upload dist/ folder to netlify.com
# 3. Or connect GitHub repo with build command: npm run build

# Deploy to Vercel
# 1. Install Vercel CLI: npm i -g vercel
# 2. Build: npm run build
# 3. Deploy: vercel --prod

# Deploy to GitHub Pages
# 1. Build: npm run build
# 2. Push dist/ folder to gh-pages branch
# 3. Or use GitHub Actions for automated deployment

# Deploy to any web server
# 1. Run: npm run build
# 2. Upload contents of dist/ folder to your web server
```

**Build Output:**
- Production files are generated in the `dist/` directory
- All assets are optimized and minified
- CSS is processed through Tailwind and PostCSS
- JavaScript modules are bundled and optimized

### Code Style Guidelines
- **JavaScript**: ES6+ modules, class-based architecture, comprehensive error handling
- **HTML**: Semantic markup, accessibility attributes, comprehensive methodology content
- **CSS**: Tailwind utilities, minimal custom styles, smooth animations
- **Comments**: JSDoc format, inline explanations for complex tooltip positioning logic

### Key Development Features
- **Perfect Tooltip System**: Advanced positioning with viewport awareness and scroll compensation
- **Smooth Interactions**: No layout shifts, professional hover effects, seamless animations
- **Modular Architecture**: Clean component separation for maintainability
- **User Guidance Integration**: Comprehensive methodology sections with practical examples
- **Fair Comparison Focus**: Energy/fuel cost calculations with maintenance transparency

## Contributing

We welcome contributions! Whether you're improving tooltip positioning, adding battery chemistries, or enhancing user guidance, your help makes EValuate better.

### How to Contribute

1. **Fork the Repository**: Create your own copy
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Test Thoroughly**: Ensure tooltips work perfectly and no layout shifts occur
4. **Commit Changes**: `git commit -m 'Add amazing feature'`
5. **Push to Branch**: `git push origin feature/amazing-feature`
6. **Open Pull Request**: Submit for review

## Roadmap

### Future Enhancements
- [ ] Social sharing features
- [ ] Multi-language support
- [ ] Real-time electricity pricing integration
- [ ] Vehicle database with popular EV models
- [ ] Multi-vehicle comparison matrix
- [ ] Enhanced mobile experience

## Methodology & Educational Value

### EV Efficiency Determination
The app provides three practical methods for users to determine their vehicle's real-world efficiency:

1. **Trip Computer Method**: Using built-in vehicle displays
2. **Manual Calculation**: Recording battery usage and distance
3. **Charging Data Method**: Using charging app data with loss compensation

### ICE Fuel Cost Calculation
Comprehensive guide for accurate fuel cost determination:

1. **Basic Formula**: Fuel Price ÷ Real-World Mileage
2. **Mileage Determination**: Tank-to-tank method over 200-300 km
3. **Price Considerations**: Local rates, seasonal variations, fuel grades

### Fair Comparison Framework
- **Focus**: Energy/fuel costs only for accurate comparison
- **Transparency**: Maintenance costs provided but not included in calculations
- **Real-World Data**: Emphasis on actual efficiency and mileage, not manufacturer claims

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Tailwind CSS Team**: For the excellent utility-first CSS framework
- **Feather Icons**: For the beautiful, lightweight icon system
- **Google Fonts**: For the professional Inter font family
- **EV Community**: For insights on real-world efficiency and costs
- **Open Source Contributors**: For making this project possible

## Support & Contact

- **Issues**: Report bugs and request features via [GitHub Issues](https://github.com/ajithrn/evaluate/issues)
- **Discussions**: Join community conversations in [GitHub Discussions](https://github.com/ajithrn/evaluate/discussions)

---

**EValuate**: Your Guide to EV Economics - Empowering informed decisions in the electric vehicle ecosystem.

*Made with ⚡ for a sustainable future*
