import { FaTruck, FaCreditCard, FaRegCheckCircle } from "react-icons/fa";

type props = {
  currentStep: number;
};
const Steps = ({ currentStep }: props) => {
  const steps = [
    { label: "Shipping", icon: <FaTruck size={22} /> },
    { label: "Delivery", icon: <FaTruck size={22} /> },
    { label: "Payment", icon: <FaCreditCard size={22} /> },
    { label: "Review", icon: <FaRegCheckCircle size={22} /> },
  ];

  return (
    <div className="w-full flex items-center justify-center max-w-2xl mx-auto py-6">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;

        return (
          <div key={index} className="flex items-center w-full">
            <div
              className={`flex flex-col items-center text-center transition-all duration-300`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300 ${
                  isActive
                    ? "bg-teal-600 text-white border-teal-600"
                    : isCompleted
                    ? "bg-teal-100 border-teal-600 text-teal-700"
                    : "bg-gray-100 border-gray-300 text-gray-500"
                }`}
              >
                {step.icon}
              </div>
              <p className="text-sm mt-2 font-medium">{step.label}</p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                  isCompleted ? "bg-teal-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
