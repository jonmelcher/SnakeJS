function Directions() {
    
    var directions = { "up": [38, 87], "down": [40, 83], 
                    "left": [37, 65], "right": [39, 68] };
    
    function getDirections() {
        return Object.keys(directions);
    }
    
    function flip(obj) {
        var flipped = {};
        Object.keys(obj).forEach(function(k) { flipped[obj[k]] = k; });
        return flipped;
    }
    
    function getOppositeDirection(direction) {
        
        var opposites = { "up" : "down", "left" : "right"};
        if (!opposites[direction])
            opposites = flip(opposites);
        return opposites[direction] || null;
    }
    
    function getKeyCodes(direction) {
        return directions[direction];
    }
    
    return { getDirections: getDirections,
             getOppositeDirection: getOppositeDirection,
             getKeyCodes: getKeyCodes };
}