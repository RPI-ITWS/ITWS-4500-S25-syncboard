// Create Event Modal
const CreateEventModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = React.useState('');
    const [startTime, setStartTime] = React.useState('12:00');
    const [endTime, setEndTime] = React.useState('13:00');
  
    const handleSubmit = () => {
      if (title && startTime && endTime) {
        onSubmit({ title, startDateTime: `${startTime}`, endDateTime: `${endTime}` });
        onClose();
      }
    };
  
    if (!isOpen) return null;
  
    return (
      `<div className="modal-overlay">
        <div className="modal-content">
          <h2>Create Event</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
          />
          <input
            type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="Start Time (HH:MM)"
          />
          <input
            type="text"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="End Time (HH:MM)"
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>`
    );
};

// edit event modal
const EditEventModal = ({ isOpen, onClose, onSubmit, onDelete, eventData }) => {
    const [title, setTitle] = React.useState(eventData ? eventData.eventname : '');
    const [startTime, setStartTime] = React.useState(
        eventData && eventData.starttime ? eventData.starttime : '12:00'
    );
    const [endTime, setEndTime] = React.useState(
        eventData && eventData.endtime ? eventData.endtime : '13:00'
    );

    const handleSubmit = () => {
        if (title && startTime && endTime) {
            onSubmit({ title, startDateTime: `${startTime}`, endDateTime: `${endTime}` });
            onClose();
        }
    };

    const handleDelete = () => {
        if (eventData) {
            onDelete(eventData);
        }
    };

    if (!isOpen) return null;

    return (
        `<div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Event</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Event Title"
                />
                <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="Start Time (HH:MM)"
                />
                <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="End Time (HH:MM)"
                />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Cancel</button>
                {/* Delete button */}
                <button onClick={handleDelete}>Delete Event</button>
            </div>
        </div>`
    );
};

// calendar (using FullCalendar)
const CalendarComponent = () => {
    const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const [eventData, setEventData] = React.useState(null);
    const [eventType, setEventType] = React.useState('create');
    const [calendar, setCalendar] = React.useState(null);
    const [groupId, setGroupId] = React.useState(1); 

    // CHANGE THIS WHEN WE SET UP ACTUAL GROUP IDS
    groupId = 0;
  
    const fetchEvents = async () => {
        try {
            const response = await fetch(`/calendar/${groupId}/events`);
            const events = await response.json();
            return events.map(event => ({
                title: event.eventname,
                start: event.date + 'T' + event.starttime,
                end: event.date + 'T' + event.endtime,
                extendedProps: {
                    groupid: event.groupid,
                    eventid: event.eventid,
                },
            }));
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    };

    const handleCreateSubmit = async ({ title, startDateTime, endDateTime }) => {
        try {
            const response = await fetch(`/calendar/${groupId}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventname: title,
                    date: startDateTime.slice(0, 10),
                    starttime: startDateTime.slice(11),
                    endtime: endDateTime.slice(11),
                }),
            });
            const data = await response.json();
            console.log(data.message);
            calendar.refetchEvents();
            setCreateModalOpen(false);
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };
  
    const handleEditSubmit = async ({ title, startDateTime, endDateTime }) => {
        try {
            const eventId = eventData.extendedProps.eventid;
            const response = await fetch(`/calendar/${groupId}/${eventId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventname: title,
                    starttime: startDateTime.slice(11),
                    endtime: endDateTime.slice(11),
                }),
            });
            const data = await response.json();
            console.log(data.message);
            calendar.refetchEvents();
            setEditModalOpen(false);
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const handleDelete = async (eventData) => {
        try {
            const eventId = eventData.extendedProps.eventid;
            const response = await fetch(`/calendar/${groupId}/${eventId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deleted: true }),
            });
            const data = await response.json();
            console.log(data.message);
            eventData.remove();
            setEditModalOpen(false);
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    React.useEffect(() => {
        const calendarEl = document.getElementById('calendar');
  
        const newCalendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek',
            },
            selectable: true,
            editable: true,
            events: async () => {
                const events = await fetchEvents();
                return events;
            },
            dateClick: function (info) {
                setEventType('create');
                setEventData(info);
                setCreateModalOpen(true); 
            },
            eventClick: function (info) {
                setEventType('edit');
                setEventData(info.event);
                setEditModalOpen(true); 
            },
        });
  
        setCalendar(newCalendar);
        newCalendar.render();
  
        return () => {
            newCalendar.destroy();
        };
    }, [groupId]);
  
    return (
        `<div>
            <div id="calendar"></div>
            {/* Create event modal */}
            {isCreateModalOpen && (
                <CreateEventModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateSubmit}
                />
            )}
            {/* Edit event modal */}
            {isEditModalOpen && (
                <EditEventModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSubmit={handleEditSubmit}
                    onDelete={handleDelete} 
                    eventData={eventData}
                />
            )}
        </div>`
    );
};