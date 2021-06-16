const randomColors = length => {
    const array = [];
    for (let i = 0; i < length; i++) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let total = 'rgba(' + r + ',' + g + ',' + b + ', 1)';
        array.push(total);
    }
    return array;
};

export default randomColors;