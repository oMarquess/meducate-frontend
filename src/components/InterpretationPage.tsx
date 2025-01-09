import React from 'react';
import { InterpretationResponse } from '../components/Technical';

interface InterpretationPageProps {
    response: InterpretationResponse;
}

const InterpretationPage: React.FC<InterpretationPageProps> = ({ response }) => {
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-3xl font-bold mb-8 text-center">Interpretation Result</h1>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Summary</h2>
                        <p className="text-gray-600">{response.interpretation.summary}</p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Key Findings</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {response.interpretation.key_findings.map((finding, index) => (
                                <li key={index} className="text-gray-600">{finding}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {response.interpretation.recommendations.map((recommendation, index) => (
                                <li key={index} className="text-gray-600">{recommendation}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Medical Terms</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {Object.entries(response.interpretation.medical_terms).map(([term, definition], index) => (
                                <li key={index} className="text-gray-600">
                                    <span className="font-semibold">{term}:</span> {definition}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterpretationPage;