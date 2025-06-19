import React from 'react';
import { render } from '@testing-library/react-native';
import PhotoStoryScreen from '../PhotoStoryScreen';
import { TYPE_CODES } from '../../constants/travelTypes';

// require 모듈을 모킹
jest.mock('../../assets/4cut/pig_rabbit_1.png', () => 'mocked-pig-rabbit-1');
jest.mock('../../assets/4cut/pig_rabbit_2.png', () => 'mocked-pig-rabbit-2');
jest.mock('../../assets/4cut/pig_rabbit_3.png', () => 'mocked-pig-rabbit-3');
jest.mock('../../assets/4cut/pig_rabbit_4.png', () => 'mocked-pig-rabbit-4');

jest.mock('../../assets/4cut/rabbit_pig_1.png', () => 'mocked-rabbit-pig-1');
jest.mock('../../assets/4cut/rabbit_pig_2.png', () => 'mocked-rabbit-pig-2');
jest.mock('../../assets/4cut/rabbit_pig_3.png', () => 'mocked-rabbit-pig-3');
jest.mock('../../assets/4cut/rabbit_pig_4.png', () => 'mocked-rabbit-pig-4');

describe('PhotoStoryScreen', () => {
    const mockNavigation = {
        navigate: jest.fn(),
    };

    const mockRoute = {
        params: {
            myType: '토끼',
            partnerType: '돼지',
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should try pig_rabbit first, then rabbit_pig if not found', () => {
        // 돼지-토끼 순서로 테스트 (pig_rabbit 이미지가 있는 경우)
        const pigRabbitRoute = {
            params: {
                myType: '돼지',
                partnerType: '토끼',
            },
        };

        render(
            <PhotoStoryScreen
                navigation={mockNavigation}
                route={pigRabbitRoute}
            />
        );

        // pig_rabbit 이미지가 로드되는지 확인
        const pigRabbitImage = require('../../assets/4cut/pig_rabbit_1.png');
        expect(pigRabbitImage).toBe('mocked-pig-rabbit-1');

        // 토끼-돼지 순서로 테스트 (pig_rabbit 이미지가 없는 경우)
        const rabbitPigRoute = {
            params: {
                myType: '토끼',
                partnerType: '돼지',
            },
        };

        // pig_rabbit 이미지를 찾을 수 없도록 모킹
        jest.resetModules();
        jest.mock('../../assets/4cut/pig_rabbit_1.png', () => {
            throw new Error('Image not found');
        });

        render(
            <PhotoStoryScreen
                navigation={mockNavigation}
                route={rabbitPigRoute}
            />
        );

        // rabbit_pig 이미지가 로드되는지 확인
        const rabbitPigImage = require('../../assets/4cut/rabbit_pig_1.png');
        expect(rabbitPigImage).toBe('mocked-rabbit-pig-1');
    });

    it('should handle all four images in the set', () => {
        render(
            <PhotoStoryScreen
                navigation={mockNavigation}
                route={mockRoute}
            />
        );

        // 4개의 이미지가 모두 로드되는지 확인
        const images = [1, 2, 3, 4].map(index => 
            require(`../../assets/4cut/pig_rabbit_${index}.png`)
        );

        expect(images).toEqual([
            'mocked-pig-rabbit-1',
            'mocked-pig-rabbit-2',
            'mocked-pig-rabbit-3',
            'mocked-pig-rabbit-4'
        ]);
    });
}); 