import { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";

const MealPlannerModal = ({ onClose }) => {
  const [mealSuggestions, setMealSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedMealPlans") || "[]");
    setSavedPlans(saved);
  }, []);
  const handleGenerate = async () => {
    setLoading(true);

    const report = localStorage.getItem("symptomData") || "{}";
    const profile = JSON.parse(
      localStorage.getItem("pregnancyProfileData") || "{}"
    );
    const weeks = profile.pregnancyWeek || 0;
    const prompt = `
              You are a maternal health assistant and a renowned gynaecologist in India. Based on the following user symptom report:
      
              "${report}"
      
              And the number of weeks completed: ${weeks}
      
              Suggest a personalized weekly meal plan that improves energy, reduces fatigue, and supports overall maternal health. Also suggest the greatest nutritional tips that would be effective in this period of pregnancy. Don't give generalized ones but the ones that are crucial at this stage of pregnancy.
              For each day, list meals (breakfast, lunch, dinner) and include:
                  - Core nutrient focus (e.g., folic acid, iron, calcium, protein)
                  - Top ingredients rich in those nutrients
                Restrict yourself to Indian dietary preferences. Avoid non-vegetarian food. Eggs are fine.
      
              Return the response strictly in JSON format as:
      
              {
              "week": "${weeks}",
              "meals": {
                  "Monday": {
                  "breakfast": {
                      "description": "...",
                      "nutrientFocus": "Folic acid",
                      "ingredients": ["Spinach", "Orange", "Fortified cereals"]
                  },
                  "lunch": {
                      ...
                  },
                  "dinner": {
                      ...
                  }
                  },
                  ...
                  "Sunday": {
                  ...
                  }
              },
              "tips": {
                  "lifestyleTips": [
                  "Tip 1",
                  "Tip 2",
                  "Tip 3"
                  ],
                  "eatingTips": [
                  "Tip 1",
                  "Tip 2",
                  "Tip 3"
                  ]
              }
              }
      
              Ensure the response is valid JSON with no markdown or extra commentary.
              `;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    console.log(response);
    const data = response.text;
    try {
      const cleanText = data.replace(/```json|```/g, "").trim();

      const parsed = JSON.parse(cleanText); // Safely parse it

      localStorage.setItem("geminiMealSuggestions", JSON.stringify(parsed));
      setMealSuggestions(parsed);
    } catch (err) {
      console.error("Invalid JSON from Gemini", err);
    }

    setLoading(false);
  };
  const handleSave = () => {
    const current = JSON.parse(localStorage.getItem("savedMealPlans") || "[]");
    current.push(mealSuggestions);
    localStorage.setItem("savedMealPlans", JSON.stringify(current));
    setSavedPlans(current);
    alert("Saved to history!");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-8 rounded-2xl w-[95%] max-w-5xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="!text-4xl font-bold heading-primary text-gray-900 mb-6 text-center">
          🍽️ Personalized Meal Plan
        </h2>

        {loading ? (
          <p className="text-center text-pink-500 font-medium">
            Getting suggestions from Gemini...
          </p>
        ) : mealSuggestions ? (
          <div className="text-sm text-gray-800 space-y-6">
            {/* Week Display */}
            <div className="text-center text-pink-600 font-semibold">
              For Week {mealSuggestions.week}
            </div>

            {/* Meals Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 border-b pb-1">
                🍱 Meals
              </h3>
              {Object.entries(mealSuggestions.meals).map(([day, details]) => (
                <div
                  key={day}
                  className="bg-pink-50 p-4 rounded-lg shadow-sm mb-4"
                >
                  <h4 className="text-lg font-bold text-pink-600">{day}</h4>
                  {["breakfast", "lunch", "dinner"].map((meal) => (
                    <div
                      key={meal}
                      className="ml-4 mt-2 pl-2 border-l-4 border-pink-300"
                    >
                      <p>
                        <strong className="capitalize">{meal}:</strong>{" "}
                        {details[meal]?.description}
                      </p>
                      <p>
                        <em>Focus:</em> {details[meal]?.nutrientFocus}
                      </p>
                      <p>
                        <em>Ingredients:</em>{" "}
                        {details[meal]?.ingredients?.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 border-b pb-1">
                💡 Tips
              </h3>

              <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-yellow-700">Lifestyle Tips:</p>
                <ul className="list-disc list-inside text-gray-700 mb-3">
                  {mealSuggestions.tips.lifestyleTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>

                <p className="font-semibold text-yellow-700">Eating Tips:</p>
                <ul className="list-disc list-inside text-gray-700">
                  {mealSuggestions.tips.eatingTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No data yet. Click "Generate" below.
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between items-center mt-8 gap-2">
          <button
            onClick={handleGenerate}
            className="px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            Generate New Suggestion
          </button>

          {mealSuggestions && (
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save This
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ml-auto"
          >
            Close
          </button>
        </div>

        {/* Saved Plans */}
        {savedPlans.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              📦 Saved Plans
            </h3>
            <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
              {savedPlans.map((plan, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-pink-700 hover:underline"
                  onClick={() => setMealSuggestions(plan)}
                >
                  Week {plan?.week} — {Object.keys(plan?.meals || {}).length}{" "}
                  days saved
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlannerModal;
