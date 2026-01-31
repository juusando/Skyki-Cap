import React from 'react';
import SvgIcon from '../SvgIcon';
import './SettingsPage.css';

const SettingsPage = ({ settings, onUpdateSettings, onClose }) => {
  const { useCurrentLocation, tempUnit, speedUnit, currentLocationName } = settings;

  const setTempUnit = (unit) => {
    onUpdateSettings({ ...settings, tempUnit: unit });
  };

  const setSpeedUnit = (unit) => {
    onUpdateSettings({ ...settings, speedUnit: unit });
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
       
          <SvgIcon name="back" onClick={onClose}/>
        
        <h1 className="settings-title">Setting</h1>
     
          <SvgIcon name="caution"  />
      
      </div>

      <div className="settings-content">
        {/* Current Location Section */}
        <div className="setting-item">
          <div className="setting-label-group">
            <span className="setting-label">Current Location</span>
            <span className="setting-sublabel">{currentLocationName || 'Unknown'}</span>
          </div>
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${!useCurrentLocation ? 'active' : ''}`} 
              onClick={() => onUpdateSettings({ ...settings, useCurrentLocation: false })}
            >
              OFF
            </button>
            <button 
              className={`toggle-btn ${useCurrentLocation ? 'active' : ''}`} 
              onClick={() => onUpdateSettings({ ...settings, useCurrentLocation: true })}
            >
              ON
            </button>
          </div>
        </div>

        {/* Unit Section */}
        <div className="setting-item">
          <span className="setting-label">Unit</span>
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${tempUnit === 'F' ? 'active' : ''}`} 
              onClick={() => setTempUnit('F')}
            >
              F
            </button>
            <button 
              className={`toggle-btn ${tempUnit === 'C' ? 'active' : ''}`} 
              onClick={() => setTempUnit('C')}
            >
              C
            </button>
          </div>
        </div>

        {/* Speed Unit Section */}
        <div className="setting-item">
          <span className="setting-label">Speed unit</span>
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${speedUnit === 'mph' ? 'active' : ''}`} 
              onClick={() => setSpeedUnit('mph')}
            >
              Mph
            </button>
            <button 
              className={`toggle-btn ${speedUnit === 'km' ? 'active' : ''}`} 
              onClick={() => setSpeedUnit('km')}
            >
              Km
            </button>
          </div>
        </div>

        {/* Theme Section */}
        <div className="setting-item">
          <span className="setting-label">Theme</span>
          <div className="color-picker-group">
            {['#ff6b6b', '#1AB291', '#1A83ED', '#F99908', '#8A3EE2'].map(color => (
              <button
                key={color}
                className={`color-btn ${settings.themeColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => onUpdateSettings({ ...settings, themeColor: color })}
                aria-label={`Select theme color ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Light/Dark Mode Section */}
        <div className="setting-item">
          <span className="setting-label">Light/Dark mode</span>
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${!settings.darkMode ? 'active' : ''}`} 
              onClick={() => onUpdateSettings({ ...settings, darkMode: false })}
            >
              Light
            </button>
            <button 
              className={`toggle-btn ${settings.darkMode ? 'active' : ''}`} 
              onClick={() => onUpdateSettings({ ...settings, darkMode: true })}
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
