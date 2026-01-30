import React, { useState, useEffect, useRef } from 'react';
import { Reorder, useDragControls, useMotionValue, motion, useAnimation } from 'framer-motion';
import SvgIcon from '../SvgIcon';
import WeatherDetails from '../weather/WeatherDetails';
import { getWeatherIconName } from '../weather/weatherUtils';
import './ListPage.css';

const SwipeableCityCard = ({ city, index, settings, now, onSelect, onDelete, openCardId, setOpenCardId }) => {
    const { location, weatherData } = city;
    const dragControls = useDragControls();
    const x = useMotionValue(0);
    const controls = useAnimation();
    const timerRef = useRef(null);
    const isReordering = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });
    
    // Stable ID for this card
    const cardId = location.isCurrentLocation 
        ? 'current-location' 
        : `${location.name}-${location.latitude}`;

    // Reset card position if another card is opened
    useEffect(() => {
        if (openCardId !== null && openCardId !== cardId) {
             controls.start({ x: 0, transition: { duration: 0.2 } });
        }
    }, [openCardId, cardId, controls]);

    // Weather Data Processing
    if (!weatherData || !weatherData.current || !weatherData.daily) return null;
    const { current, daily, current_units } = weatherData;
    const { tempUnit, speedUnit } = settings;

    const convertTemp = (t) => {
        if (tempUnit === 'F') return (t * 1.8) + 32;
        return t;
    };
    const temp = Math.round(convertTemp(current.temperature_2m));
    const max = Math.round(convertTemp(daily.temperature_2m_max[0]));
    const min = Math.round(convertTemp(daily.temperature_2m_min[0]));
    const iconName = getWeatherIconName(current.weather_code, current.is_day);

    // Time String Logic
    let timeString = '--:--';
    let dateString = '';
    try {
        const options = { timeZone: location.timezone };
        timeString = now.toLocaleTimeString('en-US', { ...options, hour: '2-digit', minute: '2-digit', hour12: false });
        dateString = now.toLocaleDateString('en-US', { ...options, weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) {
        // Fallback
    }

    const handlePointerDown = (e) => {
        // Record start position to detect movement
        startPos.current = { x: e.clientX, y: e.clientY };
        
        isReordering.current = false;
        
        // Persist event for async use if needed
        if (e.persist) e.persist();

        timerRef.current = setTimeout(() => {
            isReordering.current = true;
            
            // Start drag FIRST, before any state updates
            try {
                dragControls.start(e);
            } catch (err) {
                // Ignore potential start failures if context is lost
            }

            // Fix: Reset slide (close any open card) when long press triggers
            // Only update if actually needed to avoid unnecessary renders
            if (openCardId !== null) {
                setOpenCardId(null);
            }
            
            if (navigator.vibrate) navigator.vibrate(50);
        }, 500);
    };

    const handlePointerMove = (e) => {
        // Fix: Cancel long press if user moves finger (scrolls) before timer fires
        if (timerRef.current) {
             const moveX = Math.abs(e.clientX - startPos.current.x);
             const moveY = Math.abs(e.clientY - startPos.current.y);
             // Increased threshold to 20px to prevent accidental cancellation on touch screens
             if (moveX > 20 || moveY > 20) {
                 clearTimeout(timerRef.current);
                 timerRef.current = null;
             }
        }
    };

    const cancelLongPress = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const handleDragEnd = (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -50 || velocity < -500) {
            // Swiped left enough to open
            controls.start({ x: -100, transition: { duration: 0.2 } });
            setOpenCardId(cardId);
        } else {
            // Snap back
            controls.start({ x: 0, transition: { duration: 0.2 } });
            if (openCardId === cardId) setOpenCardId(null);
        }
    };

    return (
        <Reorder.Item
            value={city}
            dragListener={false}
            dragControls={dragControls}
            className="swipeable-item-container"
            whileDrag={{ scale: 1.02, zIndex: 10 }}
        >
            <div className="delete-background">
                <button className="delete-button" onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                }}>
                    <SvgIcon name="trash" style={{ width: 32, height: 32, fill: 'white', stroke: 'white' }} />
                </button>
            </div>
            
            <motion.div
                className="weather-card"
                style={{ x, touchAction: "pan-y" }}
                animate={controls}
                drag="x"
                dragConstraints={{ left: -100, right: 0 }}
                dragElastic={{ right: 0, left: 0.1 }} // Prevent dragging right
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={cancelLongPress}
                onPointerLeave={cancelLongPress}
                onDragEnd={handleDragEnd}
                onClick={() => {
                    if (!isReordering.current && Math.abs(x.get()) < 10) {
                        onSelect(index);
                    } else if (Math.abs(x.get()) >= 10) {
                        // Close if tapped while open
                         controls.start({ x: 0, transition: { duration: 0.2 } });
                         setOpenCardId(null);
                    }
                }}
            >
                <div className="card-top">
                    <div className="card-info">
                        <h2 className="card-city-name">{location.name}</h2>
                        <p className="card-country-name">{location.country}</p>
                        <p className="card-local-time">
                            <span className="card-time">{timeString}</span> {dateString}
                        </p>
                    </div>
                    <div className="card-weather">
                        <div className="weather-main-small">
                            <SvgIcon name={iconName} className="list-weather-icon" />
                            <div className="temp-container-small">
                                <div className="big-temp-small-wrapper">
                                    {temp < 0 && <span className="minus-small">-</span>}
                                    <span className="big-temp-small">{Math.abs(temp)}°</span>
                                </div>
                                <div className="min-max-small">
                                    <span className="high">{max}°</span>
                                    <span className="low">{min}°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="card-details-container">
                    <WeatherDetails 
                        current={current} 
                        daily={daily} 
                        units={current_units} 
                        speedUnit={speedUnit}
                    />
                </div>
            </motion.div>
        </Reorder.Item>
    );
};

const ListPage = ({ cities, settings, onClose, onSelectCity, onDeleteCity, onReorderCities }) => {
  const [now, setNow] = useState(new Date());
  const [openCardId, setOpenCardId] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="list-page">
      <Reorder.Group as="div" axis="y" values={cities} onReorder={onReorderCities} className="list-content">
        {cities.map((city, index) => {
            const key = city.location.isCurrentLocation 
                ? 'current-location' 
                : `${city.location.name}-${city.location.latitude}`;
                
            return (
               <SwipeableCityCard 
                 key={key} 
                 city={city}
                 index={index}
                 settings={settings}
                 now={now}
                 onSelect={onSelectCity}
                 onDelete={onDeleteCity}
                 openCardId={openCardId}
                 setOpenCardId={setOpenCardId}
               />
            );
        })}
      </Reorder.Group>
    </div>
  );
};

export default ListPage;
