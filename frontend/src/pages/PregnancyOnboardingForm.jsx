import React, { useState } from 'react';
import { Calendar, Clock, Baby, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PregnancyOnboardingForm = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dueDate: '',
    lastPeriodDate: '',
    pregnancyWeek: '',
    firstPregnancy: null,
    previousPregnancies: '',
    healthConditions: [],
    otherCondition: '',
    obGynName: '',
    obGynContact: '',
    hospitalName: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedConditions = [...formData.healthConditions];
    
    if (checked) {
      updatedConditions.push(name);
    } else {
      updatedConditions = updatedConditions.filter(condition => condition !== name);
    }

    setFormData({
      ...formData,
      healthConditions: updatedConditions
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === 'yes'
    });
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default form submission handling - keep this for form validation
  };

  const handleCompleteSetup = () => {
    // Save form data to local storage
    localStorage.setItem('pregnancyProfileData', JSON.stringify(formData));
    
    console.log('Onboarding data submitted and saved to localStorage:', formData);
    
    // If onComplete prop exists, call it with the form data
    if (onComplete) {
      onComplete(formData);
    }
    
    // Navigate to the dashboard page
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-pink-500 px-6 py-4">
          <h1 className="text-xl font-bold text-white">Welcome to Your Pregnancy Journey</h1>
          <p className="text-pink-100 text-sm mt-1">Let's set up your profile to personalize your experience</p>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${currentStep > index + 1 ? 'bg-green-500 text-white' : 
                        currentStep === index + 1 ? 'bg-white text-pink-500' : 
                        'bg-pink-300 text-white'}`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1 text-pink-100">
                    {index === 0 ? 'Personal Info' : 
                     index === 1 ? 'Pregnancy Details' : 
                     'Medical Info'}
                  </span>
                </div>
                
                {index < totalSteps - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-pink-300'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Tell us about yourself</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
                
                <div className="mt-4">
                  <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Pregnancy Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2">About your pregnancy</h2>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                <div className="flex-1">
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Expected Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                <div className="flex-1">
                  <label htmlFor="lastPeriodDate" className="block text-sm font-medium text-gray-700">Last Menstrual Period</label>
                  <input
                    type="date"
                    id="lastPeriodDate"
                    name="lastPeriodDate"
                    value={formData.lastPeriodDate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-pink-500 mr-2" />
                <div className="flex-1">
                  <label htmlFor="pregnancyWeek" className="block text-sm font-medium text-gray-700">Current Week of Pregnancy</label>
                  <select
                    id="pregnancyWeek"
                    name="pregnancyWeek"
                    value={formData.pregnancyWeek}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  >
                    <option value="">Select current week</option>
                    {[...Array(42)].map((_, i) => (
                      <option key={i} value={i+1}>Week {i+1}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700 mb-2">Is this your first pregnancy?</legend>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        id="firstPregnancyYes"
                        name="firstPregnancy"
                        type="radio"
                        value="yes"
                        checked={formData.firstPregnancy === true}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      />
                      <label htmlFor="firstPregnancyYes" className="ml-2 block text-sm text-gray-700">Yes</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="firstPregnancyNo"
                        name="firstPregnancy"
                        type="radio"
                        value="no"
                        checked={formData.firstPregnancy === false}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      />
                      <label htmlFor="firstPregnancyNo" className="ml-2 block text-sm text-gray-700">No</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              
              {formData.firstPregnancy === false && (
                <div>
                  <label htmlFor="previousPregnancies" className="block text-sm font-medium text-gray-700">Number of Previous Pregnancies</label>
                  <select
                    id="previousPregnancies"
                    name="previousPregnancies"
                    value={formData.previousPregnancies}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  >
                    <option value="">Select</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i+1}>{i+1}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="flex items-center mt-4">
                <Baby className="h-5 w-5 text-pink-500 mr-2" />
                <p className="text-sm text-gray-500">We'll use this information to personalize your pregnancy journey and provide week-by-week guidance.</p>
              </div>
            </div>
          )}
          
          {/* Step 3: Medical Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Healthcare Information</h2>
              
              <div>
                <label htmlFor="obGynName" className="block text-sm font-medium text-gray-700">OB-GYN Name</label>
                <input
                  type="text"
                  id="obGynName"
                  name="obGynName"
                  value={formData.obGynName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="obGynContact" className="block text-sm font-medium text-gray-700">OB-GYN Contact Number</label>
                <input
                  type="tel"
                  id="obGynContact"
                  name="obGynContact"
                  value={formData.obGynContact}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">Planned Delivery Hospital</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any of these health conditions?</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'diabetes', label: 'Diabetes' },
                    { id: 'hypertension', label: 'Hypertension' },
                    { id: 'thyroid', label: 'Thyroid Disorder' },
                    { id: 'asthma', label: 'Asthma' },
                    { id: 'heartDisease', label: 'Heart Disease' },
                    { id: 'anemia', label: 'Anemia' }
                  ].map(condition => (
                    <div key={condition.id} className="flex items-center">
                      <input
                        id={condition.id}
                        name={condition.id}
                        type="checkbox"
                        checked={formData.healthConditions.includes(condition.id)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <label htmlFor={condition.id} className="ml-2 block text-sm text-gray-700">
                        {condition.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="otherCondition" className="block text-sm font-medium text-gray-700">Other Health Conditions</label>
                <input
                  type="text"
                  id="otherCondition"
                  name="otherCondition"
                  value={formData.otherCondition}
                  onChange={handleChange}
                  placeholder="List any other conditions here"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              
              <div className="rounded-md bg-blue-50 p-4 mt-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Your information is private and secure. We use it only to personalize your pregnancy experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteSetup}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Complete Setup
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PregnancyOnboardingForm;