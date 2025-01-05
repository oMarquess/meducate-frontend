import { useFormState } from "./FormContext";
import { PasswordForm } from "./PasswordForm";
import { EmailForm } from "./UserEmail";
import { UsernameForm } from "./Username";

export function FormStep(){
    const {step} = useFormState();
    switch(step){
        case 1:
            return <UsernameForm/>;
        case 2:
            return <EmailForm/>;
        case 3:
            return <PasswordForm/>;
        default:
            return null;
    }
}