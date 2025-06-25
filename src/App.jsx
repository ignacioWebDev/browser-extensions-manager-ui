import { useState, useEffect } from 'react';
import Card from './card.jsx';
import '../src/index.css';
import logoDark from './assets/images/logo-text-white.svg';
import logoLight from './assets/images/logo.svg';
import iconSun from './assets/images/icon-sun.svg';
import iconMoon from "./assets/images/icon-moon.svg";
import DevLens from './assets/images/logo-devlens.svg';
import StyleSpy from './assets/images/logo-style-spy.svg';
import SpeedBoost from './assets/images/logo-speed-boost.svg';
import JSONWizard from './assets/images/logo-json-wizard.svg';
import TabMasterPro from './assets/images/logo-tab-master-pro.svg';
import ViewportBuddy from './assets/images/logo-viewport-buddy.svg';
import MarkupNotes from './assets/images/logo-markup-notes.svg';
import GridGuides from './assets/images/logo-grid-guides.svg';
import PalettePicker from './assets/images/logo-palette-picker.svg';
import LinkChecker from './assets/images/logo-link-checker.svg';
import DOMSnapshot from './assets/images/logo-dom-snapshot.svg';
import ConsolePlus from './assets/images/logo-console-plus.svg';


const initialCardsData = [
  { id: 1, imgUrl: DevLens, name: 'DevLens', description: 'Quickly inspect page layouts and visualize element boundaries.' },
  { id: 2, imgUrl: StyleSpy, name: 'StyleSpy', description: 'Instantly analyze and copy CSS from any webpage element.' },
  { id: 3, imgUrl: SpeedBoost, name: 'SpeedBoost', description: 'Optimizes browser resource usage to accelerate page loading.' },
  { id: 4, imgUrl: JSONWizard, name: 'JSONWizard', description: 'Formats, validates, and prettifies JSON responses in-browser.' },
  { id: 5, imgUrl: TabMasterPro, name: 'TabMaster Pro', description: 'Organizes browser tabs into groups and sessions.' },
  { id: 6, imgUrl: ViewportBuddy, name: 'ViewportBuddy', description: 'Simulates various screen resolutions directly within the browser.' },
  { id: 7, imgUrl: MarkupNotes, name: 'Markup Notes', description: 'Enables annotation and notes directly onto webpages for collaborative debugging.' },
  { id: 8, imgUrl: GridGuides, name: 'GridGuides', description: 'Overlay customizable grids and alignment guides on any webpage.' },
  { id: 9, imgUrl: PalettePicker, name: 'Palette Picker', description: 'Instantly extracts color palettes from any webpage.' },
  { id: 10, imgUrl: LinkChecker, name: 'LinkChecker', description: 'Scans and highlights broken links on any page.' },
  { id: 11, imgUrl: DOMSnapshot, name: 'DOM Snapshot', description: 'Capture and export DOM structures quickly.' }, 
  { id: 12, imgUrl: ConsolePlus, name: 'ConsolePlus', description: 'Enhanced developer console with advanced filtering and logging.' }
];


function App() {
  const [cards, setCards] = useState(initialCardsData);

  const [toggles, setToggles] = useState(
    initialCardsData.reduce((acc, card) => ({ ...acc, [card.id]: false }), {})
  );

  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const handleToggle = (id) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const removeExtension = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    setToggles((prev) => {
      const newToggles = { ...prev };
      delete newToggles[id];
      return newToggles;
    });
  };

  const filteredCards = cards.filter((card) => {
    const isOn = toggles[card.id];
    if (filter === 'active') return isOn;
    if (filter === 'inactive') return !isOn;
    return true;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const logo = theme === 'dark' ? logoDark : logoLight;

  return (
    <>
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <button
          id="theme-btn"
          onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          className="btn-theme"
        >
          {theme === 'dark' ? (
            <img src={iconSun} alt="Light Mode Icon" />
          ) : (
            <img src={iconMoon} alt="Dark Mode Icon" />
          )}
        </button>
      </header>

      <div className='extensions'>
        <h1>Extensions List</h1>
        <div className="filter-buttons">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`filter-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`} onClick={() => setFilter('inactive')}>Inactive</button>
        </div>
      </div>
      <div className="extensions-div">
        {filteredCards.length === 0 ? (
          <p className="empty-message">There are not {filter === 'active' ? 'active' : 'inactive'} extensions.</p>
        ) : (
          filteredCards.map((card) => (
            <Card
              key={card.id}
              {...card}
              toggleOn={toggles[card.id]}
              onToggle={() => handleToggle(card.id)}
              onRemove={() => removeExtension(card.id)}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
