import { API_BASE_URL } from '@env';

export const ENDPOINTS = {
    CHECK_NICKNAME: `${API_BASE_URL}/check_nickname`,
    CHECK_EMAIL: `${API_BASE_URL}/check_email`,
    CHECK_PASSWORD: `${API_BASE_URL}/check_password`,
    REGISTRATION: `${API_BASE_URL}/registration`,
    LOGIN: `${API_BASE_URL}/login`,
    LANGUAGES_LIST: `${API_BASE_URL}/languages`,
    INTERESTS_LIST: `${API_BASE_URL}/interests`,
    REMIND_PASSWORD: `${API_BASE_URL}/remind_password`,
    CONTENT: `${API_BASE_URL}/content`,
    TRANSLATE_WORD: `${API_BASE_URL}/translate_word`,
    MAIN_FOLDERS: `${API_BASE_URL}/main_folders`,
    ALL_FOLDERS: `${API_BASE_URL}/all_folders`,
    FOLDER_CREATION: `${API_BASE_URL}/folder_creation`,    
};