# CountryVote - Frontend

A React-based web application that allows users to vote for their favorite countries and view the top 10 most voted countries.

## Features

- **Voting Form**: Submit your name, email, and favorite country
  - Form validation for required fields
  - Email format validation
  - One vote per email address
  
- **Country Display Table**: View top 10 countries sorted by votes
  - Real-time search functionality
  - Displays country details: name, official name, capital, region, sub-region, and vote count
  - Responsive design

## Tech Stack

- **React 19.2.0**: UI library
- **Vite 7.2.4**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code linting

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd countryVote
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - The app runs on port 4000 by default (configured in `.env`)
   - Backend API should be running on `http://localhost:3000`

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:4000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## Project Structure

```
countryVote/
├── src/
│   ├── components/
│   │   ├── VotingForm.jsx      # Form component for submitting votes
│   │   └── CountryTable.jsx    # Table component displaying top countries
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles with Tailwind directives
├── public/                    # Static assets
├── .env                       # Environment variables
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Project dependencies

```

## Design Choices

### Architecture
- **Component-based structure**: Separated concerns between VotingForm and CountryTable for maintainability
- **State management**: Using React hooks (useState, useEffect) for local state management
- **Styling approach**: Tailwind CSS for rapid UI development and consistent design

### Form Validation
- Client-side validation for immediate user feedback
- Email regex validation to ensure correct format
- Error messages displayed inline for better UX

### Search Functionality
- Real-time filtering without API calls for better performance
- Searches across multiple fields (name, official name, capital, region)

### Responsive Design
- Mobile-first approach using Tailwind's responsive utilities
- Table scrolls horizontally on smaller screens
- Grid layout adapts to screen size

## API Integration

The frontend expects the backend API to provide the following endpoints:

### POST `/api/votes`
Submit a new vote
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "country": "IT"
}
```

### GET `/api/countries/top`
Get top 10 countries with vote counts
```json
[
  {
    "name": "Italy",
    "officialName": "Italian Republic",
    "capital": "Rome",
    "region": "Europe",
    "subRegion": "Southern Europe",
    "votes": 150
  }
]
```

## Trade-offs and Future Improvements

### Time Constraints
- **Mock data**: Currently using mock data for development; needs backend integration
- **Country dropdown**: Static list in dropdown; should be populated from REST Countries API
- **Error handling**: Basic error messages; could be improved with toast notifications
- **Loading states**: Basic loading indicator; could add skeleton screens
- **Vote refresh**: Manual refresh needed; should implement auto-refresh or websockets

### Future Enhancements
- Add flag icons for countries
- Implement pagination for country table
- Add sorting by different columns
- User authentication for tracking votes
- Add charts/visualizations for vote statistics
- Implement debouncing for search
- Add unit and integration tests
- Accessibility improvements (ARIA labels, keyboard navigation)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
