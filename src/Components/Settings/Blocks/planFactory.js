import QuartzIcon from 'Assets/Icons/blue-q-1.svg'

const planFactory = {
  'basic-plan': {
    price: 30,
    features: ['Access to basic models', 'Access to predictions', 'Use up to 1 active model'],
    icon: QuartzIcon
  },
  'advanced-plan': {
    price: 50,
    features: ['Access to all basic features', 'Unlimited active models', 'Access to advanced models'],
    icon: QuartzIcon
  }
}

export default planFactory
