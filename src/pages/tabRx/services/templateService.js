import { getCustomSyncPadTemplates } from '../../smartSync/services/uploadService';

// Get all templates for tabRx
export const getTemplates = async () => {
  try {
    const result = await getCustomSyncPadTemplates();
    if (result.success && result.data) {
      return {
        success: true,
        data: Array.isArray(result.data) ? result.data : []
      };
    }
    return {
      success: false,
      data: [],
      error: result.error || 'Unable to fetch templates'
    };
  } catch (error) {
    console.error('Error fetching templates:', error);
    return {
      success: false,
      data: [],
      error: 'Failed to fetch templates. Please try again.'
    };
  }
};