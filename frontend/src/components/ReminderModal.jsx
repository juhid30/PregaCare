// components/ReminderModal.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";

const ReminderModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");

  const handleSave = () => {
    if (title && dosage && time) {
      const newReminder = { title, dosage, time, done: false };
      onSave(newReminder);

      // EmailJS Integration
      emailjs
        .send(
          "your_service_id", // from EmailJS
          "your_template_id",
          {
            reminder_title: title,
            dosage,
            time,
            to_email: "user@example.com",
          },
          "your_user_id"
        )
        .then(
          (res) => console.log("Email sent!", res.text),
          (err) => console.log("Email failed:", err.text)
        );

      setTitle("");
      setDosage("");
      setTime("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-pink-600">
          Add Reminder
        </h2>

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Medication/Supplement"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Dosage (e.g., 2 pills)"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 text-gray-600" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
