import React, { useState } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";

const SymptomTrackerModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    energy: 3,
    nausea: 1,
    mood: 4,
    sleep: 3,
    appetite: 3,
    headache: 0,
    backPain: 2,
    swelling: 1,
    otherSymptoms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (symptom, value) => {
    // Keep the value between 0 and 5
    const newValue = Math.max(0, Math.min(5, value));
    setFormData({
      ...formData,
      [symptom]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Symptom data submitted:", formData);
    localStorage.setItem("symptomData", JSON.stringify(formData));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-pink-50 z-10">
          <h2 className="text-xl font-bold text-gray-900">
            Log Today's Symptoms
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-4">
              How are you feeling today? Rate your symptoms from 0 (none) to 5
              (severe).
            </p>

            {/* Symptom Rating Section */}
            <div className="space-y-4">
              {/* Energy Level */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-gray-700">
                    Energy Level
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleRatingChange("energy", formData.energy - 1)
                      }
                      className="p-1 text-pink-500 hover:bg-pink-100 rounded-full"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {formData.energy}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleRatingChange("energy", formData.energy + 1)
                      }
                      className="p-1 text-pink-500 hover:bg-pink-100 rounded-full"
                    >
                      <ChevronUp size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${(formData.energy / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Nausea */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-gray-700">Nausea</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleRatingChange("nausea", formData.nausea - 1)
                      }
                      className="p-1 text-pink-500 hover:bg-pink-100 rounded-full"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {formData.nausea}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleRatingChange("nausea", formData.nausea + 1)
                      }
                      className="p-1 text-pink-500 hover:bg-pink-100 rounded-full"
                    >
                      <ChevronUp size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{ width: `${(formData.nausea / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>None</span>
                  <span>Severe</span>
                </div>
              </div>

              {/* Mood */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-gray-700">Mood</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleRatingChange("mood", formData.mood - 1)
                      }
                      className="p-1 text-pink-500 hover:bg-pink-100 rounded-full"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {formData.mood}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleRatingChange("mood", formData.mood + 1)
                      }
                      className="p-1 text-pink-500 hover:bg-pink-100 rounded-full"
                    >
                      <ChevronUp size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${(formData.mood / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Sleep Quality */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-gray-700">
                    Sleep Quality
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleRatingChange("sleep", formData.sleep - 1)
                      }
                      className="p-1 text-pink-500 hover:bg-pink-100 rounded-full"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {formData.sleep}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleRatingChange("sleep", formData.sleep + 1)
                      }
                      className="p-1 text-pink-500 hover:bg-pink-100 rounded-full"
                    >
                      <ChevronUp size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: `${(formData.sleep / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Common Pregnancy Symptoms Checklist */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Common Symptoms</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <input
                  id="headache"
                  type="checkbox"
                  className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor="headache"
                  className="ml-2 text-sm text-gray-700"
                >
                  Headache
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="backPain"
                  type="checkbox"
                  className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor="backPain"
                  className="ml-2 text-sm text-gray-700"
                >
                  Back Pain
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="swelling"
                  type="checkbox"
                  className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor="swelling"
                  className="ml-2 text-sm text-gray-700"
                >
                  Swelling
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="heartburn"
                  type="checkbox"
                  className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor="heartburn"
                  className="ml-2 text-sm text-gray-700"
                >
                  Heartburn
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="constipation"
                  type="checkbox"
                  className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor="constipation"
                  className="ml-2 text-sm text-gray-700"
                >
                  Constipation
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="cramps"
                  type="checkbox"
                  className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                />
                <label htmlFor="cramps" className="ml-2 text-sm text-gray-700">
                  Cramps
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="dizzy"
                  type="checkbox"
                  className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                />
                <label htmlFor="dizzy" className="ml-2 text-sm text-gray-700">
                  Dizziness
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="kicks"
                  type="checkbox"
                  className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                />
                <label htmlFor="kicks" className="ml-2 text-sm text-gray-700">
                  Baby Kicks
                </label>
              </div>
            </div>
          </div>

          {/* Notes - Small contained text area */}
          <div className="mb-6">
            <label
              htmlFor="notes"
              className="block font-medium text-gray-700 mb-2"
            >
              Quick Notes (Optional)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="otherSymptoms"
                id="notes"
                placeholder="Anything else to mention?"
                className="p-2 shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                value={formData.otherSymptoms}
                onChange={handleChange}
                maxLength={100}
              />
              <p className="mt-1 text-xs text-gray-500 text-right">
                {formData.otherSymptoms.length}/100
              </p>
            </div>
          </div>

          <div className="sticky bottom-0 flex justify-end space-x-3 border-t pt-4 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            >
              Save Symptoms
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SymptomTrackerModal;
