import moment from 'moment-timezone';

const getServerTime = () => {
    const currentTz = moment.tz.guess();
    const time = moment.tz(currentTz).toDate();

    return time;
}

export default getServerTime;