import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTatvaPendantData } from '../context/TatvaPendantContext';
import { NAV_ICONS, TpIcon, TP_COLORS } from './TpIcons';
import './BottomNavigation.scss';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', iconKey: 'home', path: '/tatva-pendant' },
  {
    key: 'captures',
    label: 'Captures',
    iconKey: 'captures',
    path: '/tatva-pendant/captures',
    showCount: true,
  },
  { key: 'settings', label: 'Settings', iconKey: 'settings', path: '/tatva-pendant/settings' },
];

function BottomNavigation({ activeTab = 'home' }) {
  const navigate = useNavigate();
  const { summary } = useTatvaPendantData();

  const navItems = NAV_ITEMS.map((item) => {
    if (item.showCount && summary.total > 0) {
      return { ...item, label: `${summary.total} Captures` };
    }
    return item;
  });

  return (
    <nav className="tp-bottom-navigation" aria-label="Tatva Pendant">
      <div className="tp-bottom-navigation__content">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          const badge = item.key === 'captures' ? summary.needReview : null;
          const Icon = NAV_ICONS[item.iconKey];

          return (
            <button
              key={item.key}
              type="button"
              className={`tp-bottom-navigation__item ${isActive ? 'tp-bottom-navigation__item--active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="tp-bottom-navigation__icon-wrap">
                <TpIcon
                  icon={Icon}
                  size={22}
                  color={isActive ? TP_COLORS.primary : '#94a3b8'}
                  className="tp-bottom-navigation__icon"
                />
                {item.key === 'captures' && badge > 0 && (
                  <span className="tp-bottom-navigation__badge">{badge}</span>
                )}
              </span>
              <span className="tp-bottom-navigation__label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;
