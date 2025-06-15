// Utility functions for grid operations
export function isTileClickable(tileName, unclickableTiles) {
    return !unclickableTiles.includes(tileName);
}

export function calculateZoomLevel(currentZoom, deltaY, zoomPerStep, minZoom = 0.1, maxZoom = 4) {
    let newZoom = currentZoom;
    
    if (deltaY < 0) {
        newZoom = currentZoom + zoomPerStep;
    } else if (deltaY > 0) {
        newZoom = currentZoom - zoomPerStep;
    }
    
    return Math.max(minZoom, Math.min(maxZoom, newZoom));
}

export function validateGridPosition(x, y, gridWidth = 15, gridLength = 15) {
    return x >= 0 && x <= gridWidth && y >= 0 && y <= gridLength;
}

export function hasWallBuilding(buildings) {
    return buildings.some(building => building.name === 'Wall' && building.level > 0);
}

export function getGridDimensions(gridWidth = 15, gridLength = 15) {
    return {
        width: gridWidth + 1,
        height: gridLength + 1,
        totalTiles: (gridWidth + 1) * (gridLength + 1)
    };
} 