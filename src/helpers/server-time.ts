import moment from 'moment-timezone';

const getServerTime = () => {
    const currentTz = moment.tz.guess();
    const time = moment.tz(currentTz).toDate();
console.log("getServerTime", time);

    return time;
}

export default getServerTime;