import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

// 매칭 화면의 상태와 로직을 관리하는 커스텀 훅
export const useMatching = () => {
    const route = useRoute();
    const initialMyType = route.params?.myType || null;
    
    const [myType, setMyType] = useState(initialMyType);
    const [otherType, setOtherType] = useState(null);
    const [activeCard, setActiveCard] = useState(null);

    // 선택 카드 클릭 핸들러
    const handleSelectionCardPress = (cardType) => {
        setActiveCard(cardType);
    };

    // 유형 선택 핸들러
    const handleTypeSelect = (type) => {
        if (activeCard === 'my') {
            setMyType(type);
            // 내 유형을 선택한 후 상대방 유형이 없으면 자동으로 상대방 카드 활성화
            if (!otherType) {
                setActiveCard('other');
            } else {
                setActiveCard(null);
            }
        } else if (activeCard === 'other') {
            setOtherType(type);
            setActiveCard(null);
        } else {
            // 활성화된 카드가 없을 때의 기본 동작
            if (!myType) {
                setMyType(type);
                if (!otherType) {
                    setActiveCard('other');
                }
            } else if (!otherType) {
                setOtherType(type);
            }
        }
    };

    // 결과 보기 핸들러
    const handleShowResult = (navigation) => {
        if (myType && otherType) {
            navigation.navigate('궁합 분석하는 중..', {
                myType,
                partnerType: otherType
            });
        }
    };

    // 결과 보기 버튼 활성화 여부
    const canShowResult = myType && otherType;

    return {
        myType,
        otherType,
        activeCard,
        handleSelectionCardPress,
        handleTypeSelect,
        handleShowResult,
        canShowResult
    };
}; 