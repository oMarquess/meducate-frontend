"use client";
import {useForm} from "react-hook-form"
import { useFormState } from "./FormContext";
import { useState } from "react";

type TFormValues = {
       technicalLevel: string;
};

export function TechnicalForm() {
    const [isCreated, setCreated] = useState(false);
    const { onHandleBack, setFormData, formData } = useFormState();
    const {register, handleSubmit} = useForm<TFormValues>({
        defaultValues: formData
    });

    function onHandleFormSubmit(data:TFormValues) {
        setFormData((prevFormData) => ({...prevFormData, ...data}));
        setCreated(true);
    }

    return (
        isCreated ? (
            <div>
                <h1>Account created successfully</h1>
                <h3>{JSON.stringify(formData)}</h3>
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
                        Create
                    </button>
                </div>
            </form>
        )
    );
}
