import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SvgIcon.css';

const SvgIcon = ({ name, className, ...props }) => {
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Import the SVG as a path
    let iconSrc;
    try {
      iconSrc = require(`../assets/icons/${name}.svg`);
    } catch (err) {
      console.error(`Failed to load icon: ${name}`, err);
      setError(`Icon "${name}" not found`);
      return;
    }

    // Fetch the SVG content
    fetch(iconSrc)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load icon: ${name}`);
        }
        return response.text();
      })
      .then(text => {
        // Set the SVG content
        setSvgContent(text);
      })
      .catch(err => {
        console.error(err);
        setError(`Failed to load icon: ${name}`);
      });
  }, [name]);

  if (error) {
    return <span className="icon-error">{name}</span>;
  }

  if (!svgContent) {
    return <span className="icon-loading">...</span>;
  }

  const combinedClassName = `svg-icon ${className || ''}`.trim();

  // Render the SVG content inside a div
  return (
    <div 
      className={combinedClassName}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
};

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SvgIcon.defaultProps = {
  className: '',
};

export default SvgIcon;