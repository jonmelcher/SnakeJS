// ******************************************************************************
//  filename:       Directions.js
//  purpose:        module for use in SnakeJS to provide directional functonality
//
//  written by Jonathan Melcher on 2016-03-26
// ******************************************************************************

function Directions() {

    // associative array of directionNames with keyCodes - for use with event handling
    var directions = {
        'up': [ 38, 87 ],
        'down': [ 40, 83 ],
        'left': [ 37, 65 ],
        'right': [ 39, 68 ]
    };

    // retrieves all direction names
    function getDirections() {
        return Object.keys(directions);
    }

    // for use when determining opposite directions -
    // retrieves the object {values : keys} from the given object {keys : values}
    function flip(obj) {
        var flipped = {};
        Object.keys(obj).forEach(function(k) { flipped[obj[k]] = k; });
        return flipped;
    }

    // determines the opposite direction name of the given one - note that the opposite of null is null
    function getOppositeDirection(direction) {
        var opposites = {
            'up': 'down',
            'left': 'right'
        };
        return opposites[direction] || flip(opposites)[direction] || null;
    }

    // retrieves all keycode associated with the given direction name
    function getKeyCodes(direction) {
        return directions[direction];
    }

    // only the following are used externally
    return {
        getDirections: getDirections,
        getOppositeDirection: getOppositeDirection,
        getKeyCodes: getKeyCodes
    };
}
