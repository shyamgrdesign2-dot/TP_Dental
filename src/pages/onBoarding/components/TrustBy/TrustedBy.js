import React from 'react';
import './TrustBy.scss';
import Trustby from '../../../../assets/images/Trustby.svg';

const TrustBy = () => {
  const logos = [
    require('../../../../assets/images/website-images/Apollo.webp'),
    require('../../../../assets/images/website-images/ApolloCradleLogo.webp'),
    require('../../../../assets/images/onboard-page-icons/MunshiHosLogo.webp'),
    require('../../../../assets/images/website-images/ZydusLogo.webp'),
    require('../../../../assets/images/onboard-page-icons/HospitalsLogo.webp'),
    require('../../../../assets/images/onboard-page-icons/ApexOrthoHosLogo1.webp'),
    require('../../../../assets/images/onboard-page-icons/NavijivanHosLogo1.webp'),
  ];

  return (
    <div id="trusted-by-section" className="trusted-by-container">
      <h2 className="trusted-by-title">
        Trusted by <img src={Trustby} alt="heart" className="heart" />
      </h2>
      
      <div className="logos-container">
        <div className="logos-slide">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div key={`logo-1-${index}`} className="logo-item">
              <img src={logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
          {/* Duplicate set of logos for seamless loop */}
          {logos.map((logo, index) => (
            <div key={`logo-2-${index}`} className="logo-item">
              <img src={logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
          {/* Duplicate set of logos for seamless loop */}
          {logos.map((logo, index) => (
            <div key={`logo-2-${index}`} className="logo-item">
              <img src={logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBy;
