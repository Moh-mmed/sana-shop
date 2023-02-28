import s from './CheckoutWizard.module.css'

const CheckoutWizard = ({ activeStep = 0 })=> {
  return (
  <div className={s.root}>
    {['Shipping Address', 'Payment Method', 'Place Order'].map(
      (step, index) => (
        <div
          key={step}
          className={`${s.tab} ${ index <= activeStep && s.tab_active }`}
        >
          {step}
        </div>
      )
    )}
  </div>

  );
}

export default CheckoutWizard