import React, { useState, useEffect } from 'react';
import { Heart, Bell, MessageCircle, User, Settings, Import } from 'lucide-react';
import Navbar from '../components/Navbar';
import SymptomTrackerModal from './SymptomTrackerModal';

const Dashboard = () => {
    // State to store user's pregnancy data and week
    const [weekOfPregnancy, setWeekOfPregnancy] = useState(16); // Default value
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
        
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Load pregnancy data from local storage on component mount
    useEffect(() => {
        const storedData = localStorage.getItem('pregnancyProfileData');
        
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
            
            // If pregnancy week is available, update state
            if (parsedData.pregnancyWeek) {
                setWeekOfPregnancy(parseInt(parsedData.pregnancyWeek, 10));
            }
        }
    }, []);

    // Baby size comparison data by week
    const babySizeData = {
        4: { size: "Poppy Seed", message: "Your little one is just getting started!" },
        8: { size: "Raspberry", message: "Your baby is growing rapidly!" },
        12: { size: "Lime", message: "Congratulations! Your baby is now the size of a lime." },
        16: { size: "Avocado", message: "Amazing! Your baby is now as big as an avocado." },
        20: { size: "Banana", message: "Halfway there! Your baby is the size of a banana!" },
        24: { size: "Corn on the Cob", message: "Your baby continues to grow beautifully!" },
        28: { size: "Eggplant", message: "Your baby is getting bigger and stronger!" },
        32: { size: "Pineapple", message: "Not long to go now! Your baby is thriving!" },
        36: { size: "Honeydew Melon", message: "Almost there! Your baby is almost ready to meet you!" },
        40: { size: "Watermelon", message: "Any day now! Your baby is fully developed and ready for the world!" }
    };

    // Find the closest week for comparison
    const getClosestWeek = (currentWeek) => {
        const weeks = Object.keys(babySizeData).map(Number);
        return weeks.reduce((prev, curr) =>
            Math.abs(curr - currentWeek) < Math.abs(prev - currentWeek) ? curr : prev
        );
    };

    const closestWeek = getClosestWeek(weekOfPregnancy);
    const babySize = babySizeData[closestWeek];

    // Calculate pregnancy progress percentage
    const progressPercentage = (weekOfPregnancy / 40) * 100;

    // Get emoji based on size
    const getSizeEmoji = (size) => {
        const emojiMap = {
            "Poppy Seed": "🌱",
            "Raspberry": "🫐",
            "Lime": "🍋",
            "Avocado": "🥑",
            "Banana": "🍌",
            "Corn on the Cob": "🌽",
            "Eggplant": "🍆",
            "Pineapple": "🍍",
            "Honeydew Melon": "🍈",
            "Watermelon": "🍉"
        };
        return emojiMap[size] || "👶";
    };

    // Get greeting based on user data
    const getGreeting = () => {
        if (userData && userData.firstName) {
            return `Welcome, ${userData.firstName}!`;
        }
        return "Welcome to Your Dashboard";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">{getGreeting()}</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Track your journey and get personalized updates for week {weekOfPregnancy}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mt-8">
                    {/* Left Column with Baby Size and Progress Bar - 3/4 height for baby size, 1/4 for progress */}
                    <div className="md:w-1/3 flex flex-col h-full">
                        {/* Baby Size Component - Taking 3/4 height */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden flex-grow">
                            <div className="p-6 flex flex-col items-center h-full">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Baby This Week</h3>
                                <div className="bg-pink-50 w-full rounded-lg p-6 flex-grow flex flex-col items-center justify-center">
                                    <div className="mb-4 bg-white rounded-full p-6 shadow-md">
                                        {/* Placeholder for fruit/vegetable silhouette */}
                                        <div className="w-32 h-32 flex items-center justify-center">
                                            {/* Replace with actual image of the fruit/vegetable */}
                                            <div className="text-6xl">{getSizeEmoji(babySize.size)}</div>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-bold text-pink-500 mb-2">
                                        Size of {babySize.size === "Avocado" || babySize.size === "Eggplant" ? "an" : "a"} {babySize.size}
                                    </h4>
                                    <p className="text-gray-700 text-center">
                                        {babySize.message}
                                    </p>
                                </div>
                                <button className="mt-4 px-4 py-2 bg-white border border-pink-500 text-pink-500 rounded-full hover:bg-pink-50">
                                    View Development Details
                                </button>
                            </div>
                        </div>

                        {/* Pregnancy Progress Bar Component - Taking 1/4 height */}
                        <div className="bg-white rounded-xl shadow-md mt-6 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pregnancy Progress</h3>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Week 1</span>
                                <span className="font-medium text-pink-600">Week {weekOfPregnancy}</span>
                                <span>Week 40</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-pink-500 h-4 rounded-full relative"
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                    {/* Current position marker */}
                                    <div className="absolute -right-2 -top-1 w-6 h-6 rounded-full bg-pink-600 border-2 border-white shadow-md flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">{weekOfPregnancy}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 text-center text-pink-600 font-medium">
                                {40 - weekOfPregnancy} weeks until you meet your baby!
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Widgets - Right Side */}
                    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Reminders Section */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <Bell className="text-pink-500 mr-2" />
                                    <h3 className="text-xl font-semibold text-gray-900">Daily Reminders</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="border-b pb-3 flex items-center">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                                        <div className="flex-grow">
                                            <p className="font-medium">Prenatal Vitamins</p>
                                            <p className="text-sm text-gray-600">Morning with breakfast</p>
                                        </div>
                                        <div className="ml-2 p-1 rounded-full bg-green-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="border-b pb-3 flex items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                        <div className="flex-grow">
                                            <p className="font-medium">Iron Supplement</p>
                                            <p className="text-sm text-gray-600">Evening after dinner</p>
                                        </div>
                                        <div className="ml-2 p-1 rounded-full bg-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                        <div className="flex-grow">
                                            <p className="font-medium">Calcium Supplement</p>
                                            <p className="text-sm text-gray-600">Afternoon with snack</p>
                                        </div>
                                        <div className="ml-2 p-1 rounded-full bg-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </li>
                                </ul>
                                <button className="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
                                    Add New Reminder
                                </button>
                            </div>
                        </div>

                        {/* Symptoms Tracker */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <Heart className="text-pink-500 mr-2" />
                                    <h3 className="text-xl font-semibold text-gray-900">Today's Wellbeing</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <span className="w-24 text-sm text-gray-600">Energy</span>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-green-500 h-2.5 rounded-full w-3/4"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-24 text-sm text-gray-600">Nausea</span>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-yellow-500 h-2.5 rounded-full w-1/4"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-24 text-sm text-gray-600">Mood</span>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-blue-500 h-2.5 rounded-full w-4/5"></div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={openModal} className="mt-6 w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
                                    Log Today's Symptoms
                                </button>
                                <SymptomTrackerModal
                                    isOpen={isModalOpen}
                                    onClose={closeModal}
                                />
                            </div>
                        </div>

                        {/* Nutrition Tips - Personalized based on trimester */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <User className="text-pink-500 mr-2" />
                                    <h3 className="text-xl font-semibold text-gray-900">Nutrition Tips</h3>
                                </div>
                                {weekOfPregnancy <= 13 ? (
                                    <div className="bg-pink-50 rounded-lg p-4 mb-3">
                                        <p className="text-gray-800">First trimester: Focus on folic acid intake with leafy greens and fortified cereals.</p>
                                    </div>
                                ) : weekOfPregnancy <= 26 ? (
                                    <div className="bg-pink-50 rounded-lg p-4 mb-3">
                                        <p className="text-gray-800">Second trimester: Try to include more leafy greens in your diet this week to boost your iron intake.</p>
                                    </div>
                                ) : (
                                    <div className="bg-pink-50 rounded-lg p-4 mb-3">
                                        <p className="text-gray-800">Third trimester: Increase calcium intake with dairy, beans, and fortified plant milks.</p>
                                    </div>
                                )}
                                <div className="bg-blue-50 rounded-lg p-4 mb-3">
                                    <p className="text-gray-800">Stay hydrated! Aim for at least 8-10 glasses of water daily.</p>
                                </div>
                                <button className="mt-2 w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
                                    View Meal Planner
                                </button>
                            </div>
                        </div>

                        {/* Community Highlights */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <MessageCircle className="text-pink-500 mr-2" />
                                    <h3 className="text-xl font-semibold text-gray-900">Community Highlights</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="border-b pb-3">
                                        <p className="font-medium">Sarah shared a birth story</p>
                                        <p className="text-sm text-gray-600">2 hours ago • 15 comments</p>
                                    </div>
                                    <div className="border-b pb-3">
                                        <p className="font-medium">New poll: Baby names trending in 2025</p>
                                        <p className="text-sm text-gray-600">Yesterday • 42 votes</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Weekly Live Q&A with Dr. Hansen</p>
                                        <p className="text-sm text-gray-600">Tomorrow • 6:00 PM</p>
                                    </div>
                                </div>
                                <button className="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
                                    Join Discussion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;