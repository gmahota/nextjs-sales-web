
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

const Calendar = () => (
  <FullCalendar
    plugins={[interactionPlugin, timeGridPlugin]}
    initialView='timeGridWeek'
    nowIndicator={true}
    editable={true}
    initialEvents={[
      { title: 'nice event', start: new Date() }
    ]}
  />
)

export default Calendar
