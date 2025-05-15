import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as tf from "npm:@tensorflow/tfjs@4.11.0";
import { load } from "npm:@tensorflow/tfjs-node@4.11.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { features } = await req.json();

    // Load the model
    const model = await tf.loadLayersModel('rmsprop_dnn_best_model.h5');
    
    // Preprocess the input features
    const preprocessedFeatures = preprocessFeatures(features);
    
    // Make prediction
    const prediction = await model.predict(preprocessedFeatures);
    const age = prediction.dataSync()[0];

    return new Response(
      JSON.stringify({ 
        predicted_age: Math.round(age),
        confidence: calculateConfidence(prediction)
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});