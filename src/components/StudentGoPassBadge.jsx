import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function StudentGoPassBadge({ onClick }) {
  return (
    <div className="sticky-gopass-badge" onClick={onClick} title="Student discounts & extra baggage allowance">
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        🎓 Student goPass
      </span>
    </div>
  );
}
