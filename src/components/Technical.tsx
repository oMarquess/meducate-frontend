"use client";
import {useForm} from "react-hook-form"
import { useFormState } from "./FormContext";
import { useState } from "react";
import axios from 'axios';
import { ProgressBar } from './ProgressBar';
import { API_ENDPOINT } from "@/config";
import { useRouter, Router } from 'next/router';

type TFormValues = {
       technicalLevel: string;
};

export interface InterpretationResponse {
    user_data: {
        username: string;
        email: string;
        education_level: string;
        technical_level: string;
    };
    files: string[];
    interpretation: {
        summary: string;
        key_findings: string[];
        recommendations: string[];
        medical_terms: {
            [key: string]: string;
        };
    };
}

function InterpretationResult({ response }: { response: InterpretationResponse }) {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Interpretation Result</h3>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Username</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{response.user_data.username}</dd>
                    </div> */}
                    {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{response.user_data.email}</dd>
                    </div> */}
                    {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Education Level</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{response.user_data.education_level}</dd>
                    </div> */}
                    {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Technical Level</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{response.user_data.technical_level}</dd>
                    </div> */}
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Files</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                {response.files.map((file, index) => (
                                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <span className="ml-2 flex-1 w-0 truncate">{file}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Summary</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{response.interpretation.summary}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Key Findings</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="list-disc pl-5 space-y-1 bg-[#BCE29E] p-4 rounded-md">
                                {response.interpretation.key_findings.map((finding, index) => (
                                    <li key={index}>{finding}</li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Recommendations</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="list-disc pl-5 space-y-1">
                                {response.interpretation.recommendations.map((recommendation, index) => (
                                    <li key={index}>{recommendation}</li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Medical Terms</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="list-disc pl-5 space-y-1">
                                {Object.entries(response.interpretation.medical_terms).map(([term, definition], index) => (
                                    <li key={index}>
                                        <strong>{term}:</strong> {definition}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export function TechnicalForm() {
    const [isCreated, setCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { onHandleBack, setFormData, formData } = useFormState();
    const {register, handleSubmit} = useForm<TFormValues>({
        defaultValues: formData
    });
    const router = useRouter();

    async function onHandleFormSubmit(data:TFormValues) {
        setFormData((prevFormData) => ({...prevFormData, ...data}));
        console.log('Data being sent to backend:', formData);
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('education_level', formData.educationLevel);
            formDataToSend.append('technical_level', data.technicalLevel);

            // Append each file individually
            if (formData.files) {
                formData.files.forEach((file: File) => {
                    formDataToSend.append('files', file);
                });
            }

            const response = await axios.post(API_ENDPOINT, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Backend response:', response.data);
            setFormData((prevFormData) => ({...prevFormData, response: response.data}));
            setCreated(true);

            // Navigate to the interpretation page
            router.push({
                pathname: '/interpretation',
                query: { response: JSON.stringify(response.data) },
            });
        } catch (error) {
            console.error('Error sending data to backend:', error);
            // Handle error state or display error message to the user
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Router>
            {isCreated && formData.response ? (
                <div>
        
                    <InterpretationResult response={formData.response} />
                </div>
            ) : isLoading ? (
                <div>
                    <h1>Loading...</h1>
                    <ProgressBar />
                </div>
            ) : (
                <form className="space-y-9" onSubmit={handleSubmit(onHandleFormSubmit)}>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="technicalLevel" className="funnel-display-light block font-medium text-gray-800">
                            Which of these perfectly describes your background?
                        </label>
                        <select
                            id="technicalLevel"
                            className="h-11 px-4  pr-8 border rounded-md appearance-none"
                            {...register("technicalLevel")}
                            required
                        >
                            <option value="">Select your background</option>
                            <option value="medicalscience">Medical Science</option>
                            <option value="otherscience">Other Science</option>
                            <option value="nonscience">Non-Science</option>
                       
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onHandleBack}
                            className="h-11 px-6 bg-black text-white rounded-md"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="h-11 px-6 bg-black text-white rounded-md"
                        >
                           Ok!
                        </button>
                    </div>
                </form>
            )}
        </Router>
    );
}
