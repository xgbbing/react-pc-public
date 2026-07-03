import CryptoJS from 'crypto-js';

export const sha256 = (text: string) => CryptoJS.SHA256(text).toString();
