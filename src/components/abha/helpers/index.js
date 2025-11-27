/**
 * Get ABHA domain suffix based on environment
 * @returns {string} "@abdm" for production, "@sbx" for other environments
 */
export const getAbhaDomainSuffix = () => {
    return process.env.REACT_APP_ENV === "prod" ? "@abdm" : "@sbx";
};
