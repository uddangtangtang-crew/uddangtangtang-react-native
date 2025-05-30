// reason 텍스트를 마지막 문장과 나머지로 분리
export const splitReason = (reasonText) => {
    const sentences = reasonText.split('.');
    if (sentences.length <= 1) return { mainText: reasonText, lastSentence: '' };

    const lastSentence = sentences[sentences.length - 2] + '.';
    const mainText = sentences.slice(0, -2).join('.') + '.';

    return { mainText, lastSentence };
}; 