
const CheckoutWizard = ({ activeStep = 0 })=> {
  return (
  <div className="mb-5 flex flex-wrap">
    {['Shipping Address', 'Payment Method', 'Place Order'].map(
      (step, index) => (
        <div
          key={step}
          className={`flex-1 text-center py-2 ${
            index <= activeStep
              ? 'border-b-2 border-indigo-500 text-indigo-500 font-medium'
              : 'border-b border-gray-400 text-gray-400'
          }`}
        >
          {step}
        </div>
      )
    )}
  </div>

  );
}

export default CheckoutWizard