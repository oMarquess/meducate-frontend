"use client"

import WelcomePage from "@/components/WelcomePage";
import Navbar from "@/components/Navbar";
// import {UsernameForm} from "@/components/Username";
import { FormProvider } from '@/components/FormContext';
import { FormStep } from "@/components/FormStep";

const Home: React.FC = () => {
// const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Page content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <WelcomePage />
            <div className="flex justify-center">
              <div className="max-w-2xl w-full border p-6 rounded-md">
                <FormProvider>
                  <FormStep/>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Home;