import React from "react";
import { MdCheck } from "react-icons/md";

const steps = [
  { label: 'Placed', location: 'Your order has been placed.', date: 'Thu, 4th Sep 25 - 11:47am' },
  { label: 'Confirmed', location: 'Shoply Logistics - Your item has been confirmed.', date: 'Fri, 5th Sep 25 - 6:37am' },
  { label: 'Shipped', location: 'Your item has been shipped, Telangana', date: 'Fri, 6th Sep 25 - 9:37am' },
  { label: 'Delivered', location: 'Your item has been delivered.', date: 'Tue, 9th Sep 25 - 10:50am' },
  { label: 'Cancelled', location: 'Your order has been cancelled.', date: '' },
];

const Track_Orders = ({ activeStep, orderStatus }) => {
  const isCancelled = orderStatus === "CANCELLED";
  const isDelivered = orderStatus === "DELIVERED";

  const displaySteps = steps.filter(step => step.label !== "Cancelled" || isCancelled);

  return (
    <div className="p-5 col-span-2 rounded-xl border border-gray-200 relative bg-white shadow-sm">
      <h1 className="mb-8 text-xl font-semibold text-gray-800">Track Order</h1>

      <div className="flex flex-col">
        {displaySteps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          const isCancelStep = step.label === "Cancelled" && isCancelled;

          // Circle color logic
          let circleColor = "bg-gray-300";
          if (isCancelled) circleColor = "bg-red-600";
          else if (isDelivered || isCompleted) circleColor = "bg-green-600";
          else if (isActive) circleColor = "bg-purple-700";

          // Connector line color logic
          let lineColor = "bg-gray-300";
          if (isCancelled) lineColor = "bg-red-600";
          else if (isDelivered || isCompleted) lineColor = "bg-green-600";
          else if (isActive) lineColor = "bg-purple-700";

          return (
            <div key={index} className="flex items-start relative last:mb-0">
              {/* Step Circle */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex justify-center items-center font-bold text-white relative transition-all duration-300 ${circleColor}`}
                >
                  {(isCompleted || isCancelStep || isDelivered) ? <MdCheck size={20} /> : index + 1}

                  {/* Ripple effect for active step */}
                  {isActive && !isCancelStep && !isDelivered && (
                    <span className="absolute w-8 h-8 rounded-full bg-purple-700 opacity-40 animate-ping"></span>
                  )}
                  {isCancelStep && (
                    <span className="absolute w-8 h-8 rounded-full bg-red-600 opacity-40 animate-ping"></span>
                  )}
                </div>

                {/* Connector Line */}
                {index !== displaySteps.length - 1 && (
                  <div
                    className={`w-1.5 h-28 transition-all duration-500 ${lineColor}`}
                  ></div>
                )}
              </div>

              {/* Step Details */}
              <div className="ml-6">
                <div className="flex flex-col">
                  <div
                    className={`text-lg font-medium ${
                      isCancelled ? "text-red-600" :
                      (isDelivered || isCompleted) ? "text-green-600" :
                      isActive ? "text-purple-700" :
                      "text-gray-800"
                    }`}
                  >
                    {step.label} {step.date && `- ${step.date}`}
                  </div>
                  <div
                    className={`mt-1 text-sm ${
                      isCancelled ? "text-red-500" :
                      (isDelivered || isCompleted) ? "text-green-600" :
                      "text-gray-600"
                    }`}
                  >
                    {step.location}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Cancelled Message */}
        {isCancelled && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            <strong>Order Cancelled:</strong> Your order was cancelled. Please check your email for more details.
          </div>
        )}
      </div>
    </div>
  );
};

export default Track_Orders;
