"use client";
import {useForm} from "react-hook-form"
import { useFormState } from "./FormContext";
import { useState } from "react";

type TFormValues = {
    password: string;
};

export function PasswordForm() {
    const [isCreated, setCreated] = useState(false);
    const { onHandleBack, setFormData,  formData} = useFormState();
    const {register, handleSubmit} = useForm < TFormValues> (
        {defaultValues: formData}
    );
    function onHandleFormSubmit(data:TFormValues){
        setFormData((prevFormData) => ({...prevFormData, ...data}));
        setCreated(true);
        // console.log({ data });
        // onHandleNext();

    }
    return (
        isCreated? (<div><h1>Account created successfully</h1> 
            <h3>{JSON.stringify(formData)}</h3>
            </div>
        ) : (
        <form className="space-y-9" onSubmit={handleSubmit(onHandleFormSubmit)}>
            <div className="flex flex-col gap-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    password
                </label>
                <input
                    type="password"
                    id="password"
                    className="h-11 px-4 border rounded-md"
                    placeholder="Enter your password"
                    {...register("password")}
                    required
                />
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
    ));
}
