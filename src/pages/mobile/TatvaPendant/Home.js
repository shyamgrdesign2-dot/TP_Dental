import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import moment from 'moment';
import { useTatvaPendantData } from './context/TatvaPendantContext';
import { useTatvaPendantDoctorProfile } from './hooks/useTatvaPendantDoctorProfile';
import CaptureCard from './components/CaptureCard';
import TatvaPendantHero from './components/TatvaPendantHero';
import { ArrowRight2, STAT_ICONS } from './components/TpIcons';

const STAT_LABELS = {
  conversations: 'Conversations',
  review: 'Need review',
  assigned: 'Assigned',
};

function getGreeting() {
  const hour = moment().hour();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function Home() {
  const navigate = useNavigate();
  const { doctorName, subtitle, initials, loading: profileLoading } = useTatvaPendantDoctorProfile();
  const { captures, summary, loading, error } = useTatvaPendantData();
  const reviewCaptures = useMemo(
    () => captures.filter((c) => c.review).slice(0, 3),
    [captures]
  );

  const stats = useMemo(
    () => [
      { key: 'conversations', value: summary.total },
      { key: 'review', value: summary.needReview },
      { key: 'assigned', value: summary.assigned },
    ],
    [summary]
  );

  return (
    <div className="tp-page tp-home">
      <header className="tp-page-header">
        <div className="tp-page-header__text">
          <div className="tp-page-header__greeting">{getGreeting()}</div>
          <h1 className="tp-page-header__name">
            {profileLoading && !doctorName ? '…' : (doctorName || '—')}
          </h1>
          {subtitle && <p className="tp-page-header__subtitle">{subtitle}</p>}
        </div>
        <div className="tp-avatar" aria-hidden>
          <span className="tp-avatar__inner">{initials}</span>
          <span className="tp-avatar__status" />
        </div>
      </header>

      <TatvaPendantHero />

      <div className="tp-stats-row">
        {stats.map((stat) => {
          const { Icon, color, bg } = STAT_ICONS[stat.key];
          return (
            <div key={stat.key} className="tp-stat-card">
              <span className="tp-stat-card__border" aria-hidden />
              <span
                className="tp-stat-card__icon"
                style={{ backgroundColor: bg }}
              >
                <Icon size={16} color={color} />
              </span>
              <p className="tp-stat-card__value">{stat.value}</p>
              <p className="tp-stat-card__label">{STAT_LABELS[stat.key]}</p>
            </div>
          );
        })}
      </div>

      <div className="tp-section-header">
        <h2 className="tp-section-title">Needs your review</h2>
        <button
          type="button"
          className="tp-link"
          onClick={() => navigate('/tatva-pendant/captures')}
        >
          View all
          <ArrowRight2 size={13} color="#3b82f6" variant="Linear" />
        </button>
      </div>

      {loading && (
        <div className="tp-home__loading">
          <Spin />
        </div>
      )}

      {!loading && error && <p className="tp-captures__empty">{error}</p>}

      {!loading && !error && reviewCaptures.length > 0 && (
        <div className="tp-capture-list">
          {reviewCaptures.map((capture) => (
            <CaptureCard
              key={capture.id}
              capture={capture}
              showReviewFooter
              onClick={() => navigate(`/tatva-pendant/captures/${capture.id}`)}
            />
          ))}
        </div>
      )}

      {!loading && !error && reviewCaptures.length === 0 && captures.length > 0 && (
        <div className="tp-capture-list">
          <CaptureCard
            capture={captures[0]}
            onClick={() => navigate(`/tatva-pendant/captures/${captures[0].id}`)}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
