import React, { useState } from 'react';
import { motion } from 'framer-motion';

const formFields = [
  { name: 'height', label: 'Height (cm)', type: 'number', min: 100, max: 250, icon: '📏' },
  { name: 'weight', label: 'Weight (kg)', type: 'number', min: 30, max: 200, icon: '⚖️' },
  { name: 'bmi', label: 'BMI', type: 'number', min: 15, max: 45, icon: '📊' },
  { name: 'bloodPressureSystolic', label: 'Blood Pressure Systolic', type: 'number', min: 80, max: 200, icon: '❤️' },
  { name: 'bloodPressureDiastolic', label: 'Blood Pressure Diastolic', type: 'number', min: 50, max: 120, icon: '💓' },
  { name: 'cholesterol', label: 'Cholesterol Level', type: 'number', min: 100, max: 300, icon: '🔬' },
  { name: 'glucose', label: 'Blood Glucose Level', type: 'number', min: 70, max: 200, icon: '🩸' },
  { name: 'boneDensity', label: 'Bone Density', type: 'number', min: 0.5, max: 1.5, icon: '🦴' },
  { name: 'sleepHours', label: 'Sleep Hours', type: 'number', min: 4, max: 12, icon: '😴' },
  { name: 'stressLevel', label: 'Stress Level (1-10)', type: 'number', min: 1, max: 10, icon: '😰' },
];

function PredictionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
      <div className="grid grid-cols-1 gap-6">
        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative ${focusedField === field.name ? 'scale-105' : ''}`}
          >
            <label className="block text-lg font-medium text-gray-200 mb-2">
              {field.icon} {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              min={field.min}
              max={field.max}
              step="any"
              required
              onChange={handleChange}
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </motion.div>
        ))}
        <motion.button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </div>
          ) : (
            'Predict Age'
          )}
        </motion.button>
      </div>
    </form>
  );
}

export default PredictionForm;