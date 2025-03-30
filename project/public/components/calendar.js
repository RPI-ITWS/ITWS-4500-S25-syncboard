// creating new events
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
      <div className="modal-overlay">
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
      </div>
    );
  };
  
  // editing existing events
  const EditEventModal = ({ isOpen, onClose, onSubmit, onDelete, eventData }) => {
      const [title, setTitle] = React.useState(eventData ? eventData.title : '');
      const [startTime, setStartTime] = React.useState(
          eventData && eventData.start instanceof Date ? eventData.start.toISOString().slice(11, 16) : '12:00'
      );
      const [endTime, setEndTime] = React.useState(
          eventData && eventData.end instanceof Date ? eventData.end.toISOString().slice(11, 16) : '13:00'
      );

      const handleSubmit = () => {
          if (title && startTime && endTime) {
              const dateStr = eventData && eventData.start instanceof Date ? eventData.start.toISOString().slice(0, 10) : '';
              const startDateTime = `${dateStr}T${startTime}`;
              const endDateTime = `${dateStr}T${endTime}`;
              onSubmit({ title, startDateTime, endDateTime });
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
          <div className="modal-overlay">
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
          </div>
      );
  };

  // actual calendar component
  const CalendarComponent = () => {
    const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const [eventData, setEventData] = React.useState(null);
    const [eventType, setEventType] = React.useState('create');
    const [calendar, setCalendar] = React.useState(null);
  
    const handleCreateSubmit = ({ title, startDateTime, endDateTime }) => {
      // add new event
      calendar.addEvent({
        title,
        start: startDateTime,
        end: endDateTime,
      });
      setCreateModalOpen(false);
      calendar.refetchEvents();
    };
  
    const handleEditSubmit = ({ title, startDateTime, endDateTime }) => {
      // update existing event
      eventData.setProp('title', title);
      eventData.setStart(startDateTime);
      eventData.setEnd(endDateTime);
      setEditModalOpen(false);
      calendar.refetchEvents();
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
        events: [
          {
            // RENDER DB EVENTS HERE!!!
            title: 'Example Event',
            start: new Date().toISOString().slice(0, 10),
          },
        ],
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
    }, []);
  
    return (
      <div>
        <div id="calendar"></div>
        {/*  create event modal */}
        {isCreateModalOpen && (
          <CreateEventModal
            isOpen={isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateSubmit} 
            eventData={eventData}
            type="create"
          />
        )}
        {/* edit event modal */}
        {isEditModalOpen && (
          <EditEventModal
              isOpen={isEditModalOpen}
              onClose={() => setEditModalOpen(false)}
              onSubmit={handleEditSubmit}
              onDelete={handleDelete} 
              eventData={eventData}
              type="edit"
          />
      )}
      </div>
    );
  };
  
  