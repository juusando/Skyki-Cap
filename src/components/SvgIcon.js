import React from 'react';
import PropTypes from 'prop-types';
import './SvgIcon.css';

import { ReactComponent as LogoIcon } from '../assets/icons/logo.svg';
import { ReactComponent as CalIcon } from '../assets/icons/cal.svg';
import { ReactComponent as WindowsIcon } from '../assets/icons/windows.svg';
import { ReactComponent as WindowsFillIcon } from '../assets/icons/windows_fill.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';

const iconComponents = {
  logo: LogoIcon,
  cal: CalIcon,
  windows: WindowsIcon,
  windowsFill: WindowsFillIcon,
  search: SearchIcon,
  user: UserIcon,
};

const SvgIcon = ({ name, className, ...props }) => {  const IconComponent = iconComponents[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  const combinedClassName = `svg-icon ${className || ''}`.trim();

  return <IconComponent className={combinedClassName} {...props} />;
};

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SvgIcon.defaultProps = {
  className: '',
};

export default SvgIcon;