import { TYPE_IMAGES } from '../constants/images';

/**
 * 이미지 URL에서 타입 이름을 추출합니다.
 * @param {string} imageUrl - 이미지 URL
 * @returns {string} 타입 이름
 */
export const extractTypeNameFromUrl = (imageUrl) => {
    if (!imageUrl) return null;
    
    // URL에서 파일명 추출
    const fileName = imageUrl.split('/').pop();
    if (!fileName) return null;
    
    // URL 디코딩 및 .png 제거
    const decodedName = decodeURIComponent(fileName).replace('.png', '');
    return decodedName;
};

/**
 * 이미지 URL을 로컬 이미지로 매핑합니다.
 * @param {string} imageUrl - 이미지 URL
 * @returns {any} 로컬 이미지 리소스 또는 원본 URL
 */
export const mapImageUrlToLocalImage = (imageUrl) => {
    const typeName = extractTypeNameFromUrl(imageUrl);
    if (!typeName) return { uri: imageUrl };
    
    // TYPE_IMAGES에서 매칭되는 이미지 찾기
    const localImage = TYPE_IMAGES[typeName];
    if (localImage) {
        return localImage;
    }
    
    // 매칭되는 이미지가 없으면 원본 URL 반환
    return { uri: imageUrl };
}; 