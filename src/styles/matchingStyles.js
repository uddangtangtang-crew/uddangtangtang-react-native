import { StyleSheet } from 'react-native';

export const matchingStyles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    headerTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6E3209',
    },
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
        gap: 20,
    },
    selectionCardContainer: {
        alignItems: 'center',
    },
    selectionTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E3209',
        marginTop: 10,
        marginBottom: 20,
    },
    selectionCard: {
        width: 140,
        height: 140,
        borderRadius: 15,
        overflow: 'hidden',
    },
    selectedTypeImage: {
        width: 140,
        height: 140,
    },
    qmarkImage: {
        width: 40,
        height: 40,
    },
    heartIcon: {
        fontSize: 24,
        top: -22,
    },
    typesContainer: {
        flex: 1,
        marginBottom: 20,
    },
    typesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    typeCardWrapper: {
        width: '48%',
        alignItems: 'center',
        marginBottom: 20,
    },
    typeCard: {
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    typeImage: {
        width: 140,
        height: 140,
    },
    typeNameImage: {
        width: 140,
        height: 20,
    },
    selectionCardGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeSelectionCard: {
        borderWidth: 3,
        borderColor: '#CC6548',
        shadowColor: '#CC6548',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    activeSelectionTitle: {
        fontWeight: 'bold',
        color: '#CC6548',
    },
}); 