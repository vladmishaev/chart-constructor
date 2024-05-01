const findLowNearestDivisibleNumber = (
    number: number,
    divisor: number,
): number => {
    return Math.floor(number / divisor) * divisor;
};

const findUppNearestDivisibleNumber = (
    number: number,
    divisor: number,
): number => {
    return Math.ceil(number / divisor) * divisor;
};

export {
    findLowNearestDivisibleNumber as lowDivisorNum,
    findUppNearestDivisibleNumber as uppDivisorNum,
};
