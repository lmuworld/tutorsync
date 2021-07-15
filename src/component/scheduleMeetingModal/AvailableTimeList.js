import {useState, useEffect} from 'react';
import {BsPlusCircleFill} from 'react-icons/bs';
import './modalWindow.css';

/*
  Name: AvailableTimeList
  Author: Colum Murphy

  This component shows the time slots available for a specific date.
  The component allows the user to select a time slot.
  The time slot selected by user is passed up to the parent 
  component using the changeSelectedTimeSlot prop. 
*/

const AvailableTimeList = (props) => {

  const {timeSlotsForDate, changeSelectedTimeSlot} = props;

  // time slot selected by the user
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // this string gets updated whenever the selectedTimeSlot changes
  const selectedTimeSlotString = JSON.stringify(selectedTimeSlot);

  // set the selected time slot to null when the calendar date 
  // is changed (new time slots are available)
  useEffect(() => {
    setSelectedTimeSlot(null);
  }, [timeSlotsForDate])


  // when the selected time slot is changed, 
  // pass it up to the parent component
  useEffect(() => {  
    changeSelectedTimeSlot(selectedTimeSlot);
  // eslint-disable-next-line
  }, [selectedTimeSlotString]);
  
  
  // format the startDateTime and endDateTime 
  // to display a start and end time to the user
  const formatTime = (startDateTime, endDateTime) => {    

    // get the start time, no specific locale, use the users locale
    const startTime = startDateTime.toLocaleString([], 
                        { hour: 'numeric', minute: '2-digit' });

    // get the end time, no specific locale, use the users locale
    const endTime = endDateTime.toLocaleString([], 
                        { hour: 'numeric', minute: '2-digit' });
    
    return `${startTime} - ${endTime}`;
  }

  return (
    <div className='itemsContainer'>
      { timeSlotsForDate.map(timeSlot => {
        return (
          <div 
            key={timeSlot.id}
            className='itemStyle' 
            style={{ backgroundColor: (selectedTimeSlot !== null 
              && selectedTimeSlot.id === timeSlot.id) ? 'yellow' : 'white' }}
          >
            <div>
              {formatTime(timeSlot.startDateTime, timeSlot.endDateTime)}
            </div>              
            <BsPlusCircleFill
              id='addIcon'
              style={{color: 'blue', cursor: 'pointer'}}
              onClick={() => setSelectedTimeSlot(timeSlot)}
            />
          </div>
        )
      })}      
    </div>
  )
}

export default AvailableTimeList;
