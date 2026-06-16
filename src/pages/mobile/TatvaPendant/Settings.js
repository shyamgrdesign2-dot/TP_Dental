import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { useNeoConsultationContext } from '../../../components/neo/NeoConsultationProvider';
import { SETTINGS_SECTIONS } from './mockData';
import { useTatvaPendantDoctorProfile } from './hooks/useTatvaPendantDoctorProfile';
import {
  CaptureChevronRightIcon,
  SETTINGS_ICONS,
  TpIcon,
} from './components/TpIcons';
import { getDeviceModelLabel } from './utils/tpDisplayUtils';
import './Settings.scss';

function SettingsToggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`tp-settings-toggle ${checked ? 'tp-settings-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="tp-settings-toggle__thumb" />
    </button>
  );
}

function SettingsRow({ item, onAction }) {
  const [toggleOn, setToggleOn] = useState(item.defaultOn ?? false);
  const iconConfig = SETTINGS_ICONS[item.icon];
  const isClickable = item.id === 'pendant' || item.showChevron;

  return (
    <div
      className={`tp-settings-row ${isClickable ? 'tp-settings-row--clickable' : ''}`}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable && !item.toggle ? () => onAction?.(item) : undefined}
      onKeyDown={
        isClickable && !item.toggle
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onAction?.(item);
              }
            }
          : undefined
      }
    >
      {iconConfig && (
        <span className={`tp-settings-row__icon tp-settings-row__icon--${item.icon}`}>
          <TpIcon icon={iconConfig.Icon} size={16} color={iconConfig.color} />
        </span>
      )}
      <div className="tp-settings-row__content">
        <div className="tp-settings-row__title">{item.title}</div>
        <div className="tp-settings-row__subtitle">{item.subtitle}</div>
      </div>
      {item.toggle && (
        <SettingsToggle checked={toggleOn} onChange={setToggleOn} />
      )}
      {item.status && (
        <span className={`tp-settings-row__status tp-settings-row__status--${item.statusType}`}>
          <span className="tp-settings-row__status-dot" aria-hidden />
          {item.status}
        </span>
      )}
      {item.batteryPct != null && (
        <div className="tp-settings-row__battery">
          <span className="tp-settings-row__battery-track">
            <span
              className="tp-settings-row__battery-fill"
              style={{ width: `${item.batteryPct}%` }}
            />
          </span>
          <span className="tp-settings-row__value">{item.value}</span>
        </div>
      )}
      {item.value && item.batteryPct == null && !item.status && (
        <span className="tp-settings-row__value">{item.value}</span>
      )}
      {item.showChevron && (
        <CaptureChevronRightIcon size={16} color="#cbd5e1" className="tp-settings-row__chevron" />
      )}
    </div>
  );
}

function SettingsSection({ title, items, onRowAction }) {
  return (
    <section className="tp-settings-section">
      <h2 className="tp-settings-section__title">{title}</h2>
      <div className="tp-settings-section__card">
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <div className="tp-settings-section__divider" />}
            <SettingsRow item={item} onAction={onRowAction} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function Settings() {
  const { doctorName, subtitle, initials, loading: profileLoading } = useTatvaPendantDoctorProfile();
  const neo = useNeoConsultationContext();

  const deviceItems = useMemo(() => {
    const paired = neo?.pairedDevice;
    const battery =
      neo?.batteryPct
      ?? neo?.deviceTelemetry?.batteryPercent
      ?? null;
    const modelLabel = getDeviceModelLabel(paired);

    let pendantSubtitle = 'Tap to scan and pair your device';
    if (paired) {
      const pairedLabel = paired.paired_at
        ? `Paired ${moment(paired.paired_at).format('D MMM, hh:mm A')}`
        : paired.address
          ? 'Paired'
          : '';
      pendantSubtitle = [modelLabel, pairedLabel].filter(Boolean).join(' · ') || 'Paired';
    }

    let batterySubtitle = 'Connect device to view';
    if (neo?.isCharging) {
      batterySubtitle = 'Charging';
    } else if (battery != null) {
      batterySubtitle = 'Current level';
    } else if (neo?.isConnected) {
      batterySubtitle = 'Loading…';
    }

    const firmwareSubtitle = paired?.firmware
      || (paired ? '—' : 'Pair device to view');

    return [
      {
        id: 'pendant',
        icon: 'pendant',
        title: paired?.name || 'Tatva Pendant',
        subtitle: pendantSubtitle,
        status: neo?.isConnected ? 'Online' : neo?.bridgeUnreachable ? 'Offline' : 'Disconnected',
        statusType: neo?.isConnected ? 'online' : 'offline',
      },
      {
        id: 'battery',
        icon: 'battery',
        title: 'Battery',
        subtitle: batterySubtitle,
        batteryPct: battery,
        value: battery != null ? `${battery}%` : neo?.isConnected ? '…' : '—',
      },
      {
        id: 'firmware',
        icon: 'firmware',
        title: 'Firmware',
        subtitle: firmwareSubtitle,
        showChevron: Boolean(paired?.firmware),
      },
    ];
  }, [
    neo?.pairedDevice,
    neo?.batteryPct,
    neo?.deviceTelemetry,
    neo?.isCharging,
    neo?.isConnected,
    neo?.bridgeUnreachable,
  ]);

  return (
    <div className="tp-page tp-settings">
      <h1 className="tp-settings__page-title">Settings</h1>

      <div className="tp-settings-profile">
        <span className="tp-settings-profile__glow" aria-hidden />
        <div className="tp-avatar tp-avatar--large">
          <span className="tp-avatar__inner">{initials}</span>
          <span className="tp-avatar__status" />
        </div>
        <div className="tp-settings-profile__info">
          <div className="tp-settings-profile__name">
            {profileLoading && !doctorName ? '…' : (doctorName || '—')}
          </div>
          {subtitle && <div className="tp-settings-profile__subtitle">{subtitle}</div>}
        </div>
      </div>

      <SettingsSection
        title="Device"
        items={deviceItems}
        onRowAction={(item) => {
          if (item.id === 'pendant') neo?.openPairing?.();
        }}
      />
      <SettingsSection title="Capture & AI" items={SETTINGS_SECTIONS.captureAi} />
      <SettingsSection title="Notifications" items={SETTINGS_SECTIONS.notifications} />
      <SettingsSection title="Privacy & data" items={SETTINGS_SECTIONS.privacy} />
    </div>
  );
}

export default Settings;
