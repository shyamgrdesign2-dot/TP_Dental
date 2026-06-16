import React, { useMemo, useState } from 'react';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  CONTEXT_FILTERS,
  FILTER_CHIPS,
  filterCaptures,
} from './utils/neoConsultationUtils';
import { useTatvaPendantData } from './context/TatvaPendantContext';
import CaptureCard from './components/CaptureCard';
import { SearchNormal, TpIcon, TP_COLORS } from './components/TpIcons';
import './Captures.scss';

function Captures() {
  const navigate = useNavigate();
  const { captures, summary, loading, error } = useTatvaPendantData();
  const [activeFilter, setActiveFilter] = useState('all');
  const [contextFilter, setContextFilter] = useState('both');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCaptures = useMemo(
    () => filterCaptures(captures, { activeFilter, contextFilter, searchQuery }),
    [captures, activeFilter, contextFilter, searchQuery]
  );

  return (
    <div className="tp-page tp-captures-page">
      <div className="tp-captures__sticky">
        <header className="tp-captures__header">
          <div>
            <h1 className="tp-captures__title">Captures</h1>
            <p className="tp-captures__subtitle">
              {summary.needReview} of {summary.total} need review
            </p>
          </div>
          <div className="tp-captures__context-toggle" role="group" aria-label="Encounter type">
            {CONTEXT_FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`tp-captures__context-btn ${
                  contextFilter === item.key ? 'tp-captures__context-btn--active' : ''
                }`}
                onClick={() => setContextFilter(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <label className="tp-captures__search">
          <TpIcon icon={SearchNormal} size={16} color="#94a3b8" />
          <input
            type="search"
            placeholder="Search by name, bed, MRN…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>

        <div className="tp-captures__chips">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.key}
              type="button"
              className={`tp-captures__chip ${
                activeFilter === chip.key ? 'tp-captures__chip--active' : ''
              }`}
              onClick={() => setActiveFilter(chip.key)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-captures__list">
        {loading && (
          <div className="tp-captures__loading">
            <Spin />
          </div>
        )}

        {!loading && error && <p className="tp-captures__empty">{error}</p>}

        {!loading && !error && filteredCaptures.map((capture) => (
          <CaptureCard
            key={capture.id}
            capture={capture}
            showReviewFooter={capture.review}
            onClick={() => navigate(`/tatva-pendant/captures/${capture.id}`)}
          />
        ))}

        {!loading && !error && filteredCaptures.length === 0 && (
          <p className="tp-captures__empty">No captures match your filters.</p>
        )}
      </div>
    </div>
  );
}

export default Captures;
