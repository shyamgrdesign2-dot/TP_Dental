import React from "react";
import { Modal } from "antd";

import fullicon from '../assets/images/full-icon.svg';

function VideoModal({ videoLink, onCancel, isOpen }) {
    return (
        <Modal
            open={isOpen}
            centered
            footer={null}
            width={1000}
            className="prescription-pad"
            onCancel={onCancel}
        >
            <div className='use-prescription d-flex w-100 justify-content-between'>
                <h5 className="mb-0">Voice Rx Tutorial</h5>
                <a href={videoLink?.link} target='_blank' rel="noopener noreferrer">
                    <img src={fullicon} alt="Full screen" />
                </a>
            </div>
            <div className="videodrawer">
                <iframe 
                    width="100%" 
                    height="460" 
                    src={videoLink?.link} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                ></iframe>
            </div>
        </Modal>
    );
}

export default React.memo(VideoModal);
