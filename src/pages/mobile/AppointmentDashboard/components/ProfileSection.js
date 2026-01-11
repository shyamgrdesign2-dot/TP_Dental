import React from 'react';
import { useSelector } from 'react-redux';
import './ProfileSection.scss';
import AvatarImage from '../../../../assets/mobile/image.svg';

function ProfileSection({ doctorName, specialty, clinicName, profileImage }) {
  const { profile } = useSelector((state) => state.doctors);
  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'D';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="profile-section">
      <div className="profile-content">
        <div className="profile-avatar">
          <img src={AvatarImage} alt={doctorName || 'Doctor'} />
        </div>
         <div className="profile-info">
           <div className="doctor-name">
            {doctorName ? `Hi, ${doctorName}` : 'Hi, Doctor'} <span className="wavy-icon">👋</span>
           </div>
           <div className="doctor-specialty">
            {specialty || 'Specialty'}
           </div>
           {clinicName && (
            <div className="clinic-name">{clinicName || 'Clinic'}</div>
           )}
         </div>
      </div>
    </div>
  );
}

export default ProfileSection;

