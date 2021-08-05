import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

import DatePicker from "react-datepicker";
//import Modal  from 'react-bootstrap/Modal';

const Calendar = ({initialEvents}) => {
  const [weekendsVisible, setWeekendsVisible] = useState(false);
  const [currentEvents,setCurrentEvents]= useState([]);
  const [defaultEvents,setDefaultEvents] = useState(initialEvents)
  function handleClose() {
    this.setState({
      isnewevent: false,
      iseditdelete: false,
      show: false,
    });
  }

  console.log(defaultEvents);

  function handleEventClick(clickInfo) {
    this.setState({
      iseditdelete: true,
      event_title: clickInfo.event.title,
      calenderevent: clickInfo.event,
    });
  }

  function handleDateSelect(selectInfo) {
    this.setState({
      isnewevent: true,
      addneweventobj: selectInfo,
    });
  }
  return (
    <>
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        //editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        //weekends={weekendsVisible}
        initialEvents={defaultEvents} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        // eventContent={renderEventContent} // custom render function
        //eventClick={(clickInfo) => handleEventClick(clickInfo)}
        // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
       */
      />
    </>
  );
};

export default Calendar;
