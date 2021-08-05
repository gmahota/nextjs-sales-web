/* eslint-disable import/no-anonymous-default-export */
import moment from "moment";

const formatDate = function formatDate(date,format) {
  try {
    var a = moment(date);

    const dt = a.format(format)
    
    if(dt.toString() === "Invalid date"){
      return ""
    }
    return dt
  } catch (e) {
    return "";
  }
}

const getDateMonth = function getDateMonth(value) {
  try {

    let m = Number(value)-1

    const arr = ["Sunday","Monday","Tuesday", "Wednesday","Thursday", "Friday","Saturday"]

    return arr[m]
  } catch (e) {
    return "";
  }
}

export default { formatDate,getDateMonth }

