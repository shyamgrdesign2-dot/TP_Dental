import React from 'react';
import { BatteryFull } from 'iconsax-reactjs';
import './NeoBatteryIndicator.scss';

const ICON_VARIANT = 'Linear';

function getBatteryColor(percent) {
  if (percent > 20) return '#4ade80';
  if (percent > 10) return '#fbbf24';
  return '#f87171';
}

/**
 * Neo pendant battery — display battery_pct from ws_server device_state / status.
 * Hide when not connected; show "…" until battery_pct is known.
 */
export function NeoBatteryIndicator({
  isConnected = false,
  batteryPct = null,
  isCharging = false,
  className = '',
  iconSize = 15,
}) {
  if (!isConnected) return null;

  if (batteryPct == null) {
    return (
      <span className={`neo-battery neo-battery--loading ${className}`.trim()} title="Battery loading">
        <BatteryFull variant={ICON_VARIANT} size={iconSize} color="rgba(255,255,255,0.45)" />
        <span className="neo-battery__label">…</span>
      </span>
    );
  }

  const color = getBatteryColor(batteryPct);

  return (
    <span
      className={`neo-battery ${className}`.trim()}
      style={{ color }}
      title={`${batteryPct}%${isCharging ? ' · Charging' : ''}`}
    >
      <BatteryFull variant={ICON_VARIANT} size={iconSize} color={color} />
      <span className="neo-battery__label">
        {batteryPct}%
        {isCharging ? <span className="neo-battery__charge">⚡</span> : null}
      </span>
    </span>
  );
}

export default NeoBatteryIndicator;
