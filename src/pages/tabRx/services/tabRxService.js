import api from '../../../api/services/axiosService';
import { env } from '../../../EnvironmentConfig';
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from '../../../utils/constants';

// Base URL for tab-rx API calls
const baseUrl = { customBaseUrl: env.digitization_api_url };

const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
const cleanedToken = token?.replace(/['"]+/g, "");

// Get files for tab-rx
export const getTabRxFiles = async (tcmId, patientUniqueId) => {
  try {
    const requestConfig = {
      headers: { Authorization: `Bearer ${cleanedToken}` },
      params: {
        tcm_id: tcmId,
        patient_unique_id: patientUniqueId
      },
      ...baseUrl
    };
    
    const response = await api.get('/api/v1/tab-rx/get-files', requestConfig);
    
    return {
      success: true,
      data: response.data || response
    };
  } catch (error) {
    console.error('Failed to fetch tab-rx files:', error);
    let errorMessage = 'Unable to fetch files. Please try again.';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Upload files for tab-rx
// files: Array of File/Blob objects or { file: File/Blob, fieldName?: string }
export const uploadTabRxFiles = async (files, onProgress) => {
  try {
    // Validate files
    if (!files || !Array.isArray(files) || files.length === 0) {
      throw new Error('Files array is required and must not be empty');
    }

    const formData = new FormData();
    
    // Append files to form data
    // Based on curl: --form '=@"..."' - the field name appears to be empty or optional
    files.forEach((fileItem, index) => {
      if (!fileItem) {
        throw new Error(`File at index ${index} is undefined`);
      }
      
      let file;
      let fieldName = ''; // Empty field name as per curl example
      
      // Support both direct File/Blob or object with file property
      if (fileItem instanceof File || fileItem instanceof Blob) {
        file = fileItem;
      } else if (fileItem.file) {
        file = fileItem.file;
        fieldName = fileItem.fieldName || '';
      } else {
        throw new Error(`Invalid file format at index ${index}. Expected File, Blob, or { file: File/Blob, fieldName?: string }`);
      }
      
      // Append with empty or specified field name
      if (fieldName) {
        formData.append(fieldName, file);
      } else {
        // Append with empty field name (some APIs accept this)
        formData.append('', file);
      }
    });
    
    const requestConfig = {
      headers: { 
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${cleanedToken}`
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.lengthComputable) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
      ...baseUrl
    };
    
    const response = await api.post('/api/v1/tab-rx/upload-files', formData, requestConfig);
    
    return {
      success: true,
      data: response.data || response
    };
  } catch (error) {
    console.error('Failed to upload tab-rx files:', error);
    let errorMessage = 'Upload failed. Please try again.';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Upsert RX for tab-rx
export const upsertTabRxRx = async (rxData) => {
  try {
    // Validate required fields
    if (!rxData) {
      throw new Error('RX data is required');
    }
    
    if (!rxData.patient_unique_id) {
      throw new Error('patient_unique_id is required');
    }
    
    if (!rxData.tcm_id) {
      throw new Error('tcm_id is required');
    }
    
    if (!rxData.canvasFileName) {
      throw new Error('canvasFileName is required');
    }

    const requestConfig = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cleanedToken}`
      },
      ...baseUrl
    };
    
    const response = await api.post('/api/v1/tab-rx/upsert-rx', rxData, requestConfig);
    
    return {
      success: true,
      data: response.data || response
    };
  } catch (error) {
    console.error('Failed to upsert tab-rx RX:', error);
    let errorMessage = 'Failed to save RX. Please try again.';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};
