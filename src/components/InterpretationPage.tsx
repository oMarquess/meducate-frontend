import React from 'react';
import { useRouter } from 'next/router';
import { InterpretationResponse } from '../components/Technical';

const InterpretationPage: React.FC = () => {
    const router = useRouter();
    const { response } = router.query;

    if (!response) {
        return <div>Loading...</div>;
    }

    const interpretationResponse: InterpretationResponse = JSON.parse(response as string);

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-2xl font-semibold mb-6">Interpretation Result</h1>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Summary</h2>
                        <p>{interpretationResponse.interpretation.summary}</p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Key Findings</h2>
                        <ul className="list-disc pl-5">
                            {interpretationResponse.interpretation.key_findings.map((finding, index) => (
                                <li key={index}>{finding}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
                        <ul className="list-disc pl-5">
                            {interpretationResponse.interpretation.recommendations.map((recommendation, index) => (
                                <li key={index}>{recommendation}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Medical Terms</h2>
                        <ul className="list-disc pl-5">
                            {Object.entries(interpretationResponse.interpretation.medical_terms).map(([term, definition], index) => (
                                <li key={index}>
                                    <strong>{term}:</strong> {definition}
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