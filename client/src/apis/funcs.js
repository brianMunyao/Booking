import md5 from 'md5';
import moment from 'moment';

import logo from '../assets/arsenal.png';
import arsenal from '../assets/arsenal.png';
import chelsea from '../assets/chelsea.png';
import crystal from '../assets/crystal palace.png';
import leicester from '../assets/leicester city.png';
import liverpool from '../assets/liverpool.png';
import mancity from '../assets/manchester city.png';
import manu from '../assets/manchester united.png';
import newcastle from '../assets/newcastle united.png';
import tot from '../assets/tottenham hotspur.png';
import westham from '../assets/west ham united.png';

export const capitalize = (str = '') => {
    return str
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
};

export const encrypt = (str = '') => {
    return md5(str);
};

export const images = [
    { key: 'arsenal', value: arsenal },
    { key: 'crystal palace', value: crystal },
    { key: 'leicester city', value: leicester },
    { key: 'liverpool', value: liverpool },
    { key: 'manchester city', value: mancity },
    { key: 'manchester united', value: manu },
    { key: 'newcastle united', value: newcastle },
    { key: 'tottenham hotspur', value: tot },
    { key: 'west ham united', value: westham },
    { key: 'chelsea', value: chelsea },
];

export const getImage = (name = '') => {
    const res = images.filter((v) => v.key === name.toLowerCase());

    if (res.length !== 0) {
        return res[0].value;
    }
    return logo;
};

export const getMonthData = (arr = []) => {
    const sorted = arr.sort((a, b) => moment(a.date) - moment(b.date));

    let res = [{ month: 'January 2022', data: [] }];
    sorted.forEach((v) => {
        const mm = moment(v.date).format('MMMM YYYY');

        const mmFound = res.some((elem) => elem.month === mm);

        if (mmFound) {
            const temp = res.map((value, i) =>
                value.month === mm ?
                {...value, data: [...value.data, v] } :
                value
            );
            res = temp;
        } else {
            res.push({ month: mm, data: [v] });
        }
    });

    return res;
};

export const stadium = 'Anfield';