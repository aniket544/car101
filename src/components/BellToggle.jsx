import { useState } from 'react';
import './BellToggle.css';

export default function BellToggle({
  offLabel = 'Notify me',
  onLabel = "You'll be notified",
  color = '#f5f5f5',
  background = '#27272a',
  onColor = '#18181b',
  onBackground = '#f5f5f5',
  size = 'md',
  radius = 22,
  ringAmplitude = 17,
  ringPasses = 5,
  ringDuration = 820,
  count = 0,
  badge = true,
  badgeColor = '#ef4444',
  waves = true,
  clapper = false,
  pressed,
  defaultPressed = false,
  onChange,
  disabled = false,
  className = '',
}) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isOn = pressed ?? internalPressed;
  const [ringing, setRinging] = useState(false);
  const height = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (pressed === undefined) setInternalPressed(next);
    onChange?.(next);
    if (next) {
      setRinging(true);
      window.setTimeout(() => setRinging(false), ringDuration);
    }
  };

  return (
    <button
      type="button"
      className={`bell-toggle ${isOn ? 'is-on' : ''} ${ringing ? 'is-ringing' : ''} ${className}`}
      style={{
        '--bt-color': color,
        '--bt-bg': background,
        '--bt-on-color': onColor,
        '--bt-on-bg': onBackground,
        '--bt-badge': badgeColor,
        '--bt-radius': `${radius}px`,
        '--bt-height': `${height}px`,
        '--bt-ring': `${ringAmplitude}deg`,
        '--bt-ring-duration': `${ringDuration}ms`,
      }}
      aria-pressed={isOn}
      disabled={disabled}
      onClick={toggle}
    >
      <span className="bell-toggle-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {clapper ? (
            <>
              <path d="M6 16.5V10a6 6 0 0 1 12 0v6.5l1.6 2.3H4.4L6 16.5z" />
              <path d="M12 2.5V4" />
              <circle cx="12" cy="20.4" r="1.2" fill="currentColor" />
            </>
          ) : (
            <>
              <path d="M18 9a6 6 0 0 0-12 0c0 7-2.5 7-2.5 9h17C20.5 16 18 16 18 9Z" />
              <path d="M10 21h4" />
            </>
          )}
        </svg>
        {waves && <span className="bell-waves"><i /><i /></span>}
        {badge && isOn && count > 0 && <span className="bell-count">{count > 9 ? '9+' : count}</span>}
      </span>
      <span className="bell-toggle-label">
        <span className={!isOn ? 'label-visible' : ''}>{offLabel}</span>
        <span className={isOn ? 'label-visible' : ''}>{onLabel}</span>
      </span>
    </button>
  );
}
