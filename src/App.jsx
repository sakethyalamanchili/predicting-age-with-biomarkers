import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import FeatureImportance from './components/FeatureImportance';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict-age`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ features: formData }),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            Age Prediction with Biomarkers
          </h1>
          <p className="text-xl text-gray-300 opacity-90 max-w-2xl mx-auto">
            Discover your biological age through advanced AI analysis of your biomarkers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <PredictionForm onSubmit={handleSubmit} loading={loading} />
          </motion.div>

          <div className="lg:col-span-7">
            {prediction ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <ResultCard 
                  predictedAge={prediction.predicted_age}
                  confidence={prediction.confidence}
                />
                <FeatureImportance />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center p-8 rounded-lg bg-white/5 backdrop-blur-lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Ready to Predict</h2>
                  <p className="text-gray-300">
                    Fill in your biomarker data to see your predicted biological age
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;