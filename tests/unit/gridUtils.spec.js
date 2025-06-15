import { 
    isTileClickable, 
    calculateZoomLevel, 
    validateGridPosition, 
    hasWallBuilding, 
    getGridDimensions 
} from '@/utils/gridUtils'

describe('Grid Utils', () => {
    describe('isTileClickable', () => {
        it('should return true for clickable tiles', () => {
            const unclickableTiles = ['BaseTile', 'WaterTile']
            expect(isTileClickable('BuildingSpot', unclickableTiles)).toBe(true)
            expect(isTileClickable('TownHall', unclickableTiles)).toBe(true)
        })

        it('should return false for unclickable tiles', () => {
            const unclickableTiles = ['BaseTile', 'WaterTile']
            expect(isTileClickable('BaseTile', unclickableTiles)).toBe(false)
            expect(isTileClickable('WaterTile', unclickableTiles)).toBe(false)
        })
    })

    describe('calculateZoomLevel', () => {
        it('should increase zoom when scrolling up', () => {
            const result = calculateZoomLevel(1.0, -10, 0.1)
            expect(result).toBe(1.1)
        })

        it('should decrease zoom when scrolling down', () => {
            const result = calculateZoomLevel(1.0, 10, 0.1)
            expect(result).toBe(0.9)
        })

        it('should not change zoom when deltaY is 0', () => {
            const result = calculateZoomLevel(1.0, 0, 0.1)
            expect(result).toBe(1.0)
        })

        it('should clamp zoom to minimum value', () => {
            const result = calculateZoomLevel(0.1, 10, 0.1)
            expect(result).toBe(0.1)
        })

        it('should clamp zoom to maximum value', () => {
            const result = calculateZoomLevel(4.0, -10, 0.1)
            expect(result).toBe(4.0)
        })
    })

    describe('validateGridPosition', () => {
        it('should return true for valid positions', () => {
            expect(validateGridPosition(5, 5)).toBe(true)
            expect(validateGridPosition(0, 0)).toBe(true)
            expect(validateGridPosition(15, 15)).toBe(true)
        })

        it('should return false for invalid positions', () => {
            expect(validateGridPosition(-1, 5)).toBe(false)
            expect(validateGridPosition(5, -1)).toBe(false)
            expect(validateGridPosition(16, 5)).toBe(false)
            expect(validateGridPosition(5, 16)).toBe(false)
        })
    })

    describe('hasWallBuilding', () => {
        it('should return true when village has wall building with level > 0', () => {
            const buildings = [
                { name: 'TownHall', level: 1 },
                { name: 'Wall', level: 2 }
            ]
            expect(hasWallBuilding(buildings)).toBe(true)
        })

        it('should return false when village has no wall building', () => {
            const buildings = [
                { name: 'TownHall', level: 1 },
                { name: 'Barracks', level: 1 }
            ]
            expect(hasWallBuilding(buildings)).toBe(false)
        })

        it('should return false when wall building has level 0', () => {
            const buildings = [
                { name: 'TownHall', level: 1 },
                { name: 'Wall', level: 0 }
            ]
            expect(hasWallBuilding(buildings)).toBe(false)
        })
    })

    describe('getGridDimensions', () => {
        it('should return correct dimensions for default grid', () => {
            const result = getGridDimensions()
            expect(result).toEqual({
                width: 16,
                height: 16,
                totalTiles: 256
            })
        })

        it('should return correct dimensions for custom grid', () => {
            const result = getGridDimensions(10, 10)
            expect(result).toEqual({
                width: 11,
                height: 11,
                totalTiles: 121
            })
        })
    })
}) 