import moment from "moment";


const getAllDays = (dateBegin,dateEnd) => {
  let allDays = [];
  let date = moment(dateBegin).format('YYYY-MM-DD');
  let dateE = moment(dateEnd).format('YYYY-MM-DD');
  while (date <= dateE) {
    allDays.push(date);
    date = moment(date).add(1, 'days').format('YYYY-MM-DD');
  }
  return allDays;
}

const getEventsFormShift = (dateBegin,dateEnd,dayOfWeek) => {

  let daysCollection = getAllDays(dateBegin,dateEnd)
    .filter(day => dayOfWeek === moment(day).day())

    return daysCollection
}

const sumDateAndTime = (date,dateAndTime)=>{
  let time = moment(dateAndTime).format('HH:mm');
  let dateTime = moment(date).format('YYYY-MM-DD') + ' ' + time;


  return moment(dateTime).format();
}

export default { getEventsFormShift,getAllDays ,sumDateAndTime,sumDateAndTime}
