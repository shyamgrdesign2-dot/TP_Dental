import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BottomNavigation.scss';
import HomeIcon from '../../../../assets/mobile/arrow-up.svg';
import AppointmentsIcon from '../../../../assets/mobile/Frame.svg';
import PatientsIcon from '../../../../assets/mobile/profile-2user.svg';
import PatientsIconActive from '../../../../assets/mobile/profile-2user2.svg';

function BottomNavigation({ activeTab = 'appointments' }) {
  const navigate = useNavigate();

  const navItems = [
    {
      key: 'home',
      label: 'Home',
      icon: HomeIcon,
      path: '/',
    },
    {
      key: 'appointments',
      label: 'Appointments',
      icon: AppointmentsIcon,
      path: '/',
    },
    {
      key: 'patients',
      label: 'All Patients',
      icon: PatientsIcon,
      iconActive: PatientsIconActive,
      path: '/all_patients',
    },
  ];

  const handleNavClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="bottom-navigation">
      <div className="nav-content">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          const iconSrc = isActive && item.iconActive ? item.iconActive : item.icon;
          
          return (
            <button
              key={item.key}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
              data-tab={item.key}
            >
              <img src={iconSrc} alt={item.label} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="nav-indicator">
        <div className="indicator-bar" />
      </div>
    </div>
  );
}

export default BottomNavigation;
