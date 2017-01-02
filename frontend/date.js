
export const getDays = () => {
    const count = 31;
    const days = [];
    for(let i = 1; i <= count; i++) {
        days.push(`${i}`);
    }
    return days;
};

export const getMonths = () => {
    return [
        'январь',
        'февраль',
        'март',
        'апрель',
        'май',
        'июнь',
        'июль',
        'август',
        'сентябрь',
        'октябрь',
        'ноябрь',
        'декабрь'
    ]
};

export const getYears = () => {
    const maxAge = 50;
    const minAge = 18;
    const minYear = new Date().getFullYear() - (minAge + maxAge);
    const years = [];
    for(let i = 0; i <= maxAge; i++) {
        years.push(`${minYear + i}`);
    }
    return years;
};