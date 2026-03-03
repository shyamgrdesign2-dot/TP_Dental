import React, { useState, useEffect } from 'react';
import { Drawer, Radio, Dropdown, message } from 'antd';
import { MoreOutlined, PlusOutlined, FileTextOutlined, CloseOutlined } from '@ant-design/icons';
import { getTemplates } from '../services/templateService';
import './TemplateSidebar.scss';

const TemplateSidebar = ({ 
  visible,
  onClose,
  selectedTemplateId, 
  onTemplateSelect, 
  onAddNew,
  templates = [],
  onTemplatesUpdate
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If templates are provided from parent, use them; otherwise load
    if (templates.length > 0) {
      setLoading(false);
    } else {
      loadTemplates();
    }
  }, [templates]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const result = await getTemplates();
      if (result.success) {
        const loadedTemplates = result.data || [];
        if (onTemplatesUpdate) {
          onTemplatesUpdate(loadedTemplates);
        }
      } else {
        message.error(result.error || 'Failed to load templates');
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      message.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (templateId) => {
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
  };

  const handleAddNew = () => {
    if (onAddNew) {
      onAddNew();
    }
  };

  const handleBlankCanvas = () => {
    handleTemplateSelect('blank');
  };

  const getTemplateThumbnail = (template) => {
    // Get the first page image URL if available
    if (template.uploaded_files && template.uploaded_files.length > 0) {
      const firstFile = template.uploaded_files[0];
      return firstFile.file_url || firstFile.url || null;
    }
    return null;
  };

  const getTemplateMenuItems = (template) => {
    return [
      {
        key: 'set-default',
        label: 'Set as Default',
        onClick: () => {
          // TODO: Implement set as default
          message.info('Set as default functionality coming soon');
        }
      },
      {
        key: 'delete',
        label: 'Delete',
        danger: true,
        onClick: () => {
          // TODO: Implement delete
          message.info('Delete functionality coming soon');
        }
      }
    ];
  };

  return (
    <Drawer
      title={null}
      placement="right"
      closable={false}
      onClose={onClose}
      open={visible}
      width={320}
      className="tab-rx-template-drawer"
      mask={false}
      maskClosable={false}
      getContainer={false}
    >
      <div className="tab-rx-template-sidebar">
        <div className="template-sidebar-header">
          <div className="header-left">
            <FileTextOutlined className="header-icon" />
            <h3 className="header-title">Select Letterhead</h3>
          </div>
          <button className="header-close" onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>

        <div className="template-sidebar-content">
        {/* Add New Letterhead Button */}
        <button className="add-new-letterhead-btn" onClick={handleAddNew}>
          <PlusOutlined className="add-icon" />
          <span className="add-text">Add New Letterhead</span>
        </button>

        {/* Blank Canvas Option */}
        <div 
          className={`template-option ${selectedTemplateId === 'blank' ? 'selected' : ''}`}
          onClick={handleBlankCanvas}
        >
          <Radio checked={selectedTemplateId === 'blank'} />
          <div className="template-thumbnail blank-thumbnail">
            <div className="blank-canvas-icon">
              <FileTextOutlined />
            </div>
          </div>
          <div className="tab-rx-template-info">
            <div className="template-name">Blank Canvas</div>
            <div className="template-meta">1 Page Letterhead</div>
          </div>
        </div>

        {/* Templates List */}
        {loading ? (
          <div className="templates-loading">Loading templates...</div>
        ) : templates.length > 0 ? (
          templates.map((template) => {
            const thumbnail = getTemplateThumbnail(template);
            const isSelected = selectedTemplateId === template.id;
            
            return (
              <div
                key={template.id}
                className={`template-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <Radio checked={isSelected} />
                <div className="template-thumbnail">
                  {thumbnail ? (
                    <img src={thumbnail} alt={template.title} />
                  ) : (
                    <div className="template-placeholder">
                      <FileTextOutlined />
                    </div>
                  )}
                </div>
                <div className="tab-rx-template-info">
                  <div className="template-name">{template.title || 'Untitled Template'}</div>
                  <div className="template-meta">
                    {template.uploaded_files?.length || 1} Page Letterhead
                  </div>
                </div>
                <Dropdown
                  menu={{ items: getTemplateMenuItems(template) }}
                  trigger={['click']}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="template-menu-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreOutlined />
                  </button>
                </Dropdown>
              </div>
            );
          })
        ) : (
          <div className="templates-empty">
            No templates found. Click "Add New Letterhead" to create one.
          </div>
        )}
        </div>
      </div>
    </Drawer>
  );
};

export default TemplateSidebar;
