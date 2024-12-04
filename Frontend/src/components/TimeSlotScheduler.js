import React, { useState } from "react";
import "./TimeSlotScheduler.scss";

const TimeSlotScheduler = ({ onScheduleChange }) => {
  const [schedule, setSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [selectedDay, setSelectedDay] = useState("Monday");
  const [newSlot, setNewSlot] = useState("07:00");
  const handleAddSlot = () => {
    if (newSlot) {
      // Update the schedule state
      setSchedule((prev) => {
        const updatedSchedule = {
          ...prev,
          [selectedDay]: [...prev[selectedDay], newSlot],
        };

        // Notify the parent component about the updated schedule
        if (onScheduleChange) {
          onScheduleChange(updatedSchedule);
        }

        return updatedSchedule;
      });

      // Add 30 minutes to the newSlot
      const [hours, minutes] = newSlot.split(":").map(Number); // Split and convert to numbers
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes + 30); // Add 30 minutes

      const updatedSlot = `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;

      setNewSlot(updatedSlot);
    }
  };

  const handleRemoveSlot = (index) => {
    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].filter((_, i) => i !== index),
    }));
  };

  const handleClearDay = () => {
    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: [],
    }));
  };

  return (
    <div id="scheduler-container">
      {/* Day Navigation */}
      <div id="day-navigation">
        {Object.keys(schedule).map((day) => (
          <button
            type="button"
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`day-button ${selectedDay === day ? "active-day" : ""}`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Time Slot Management */}
      <div id="time-slot-management">
        <div id="add-time-slot">
          <label htmlFor="time-input" id="add-slot-label">
            Add Time Slot:
          </label>
          <div id="slot-input-container">
            <input
              type="time"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              id="time-input"
              required
            />
            <button type="button" onClick={handleAddSlot} id="add-slot-button">
              Add
            </button>
          </div>
        </div>

        {/* Display Slots */}
        <div id="slots-list">
          {schedule[selectedDay].length > 0 ? (
            <ul>
              {schedule[selectedDay].map((time, index) => (
                <li key={index} className="time-slot">
                  <span className="slot-time">{time}</span>
                  <button
                    onClick={() => handleRemoveSlot(index)}
                    className="remove-slot-button"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p id="no-slots-message">No slots added for {selectedDay}.</p>
          )}
        </div>
      </div>

      {/* Clear & Save Buttons */}
      {schedule[selectedDay].length > 0 ? (
        <button type="button" onClick={handleClearDay} id="clear-day-button">
          Clear {selectedDay}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default TimeSlotScheduler;
