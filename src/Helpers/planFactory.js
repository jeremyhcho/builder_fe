import QuartzIcon from 'Assets/Icons/blue-q-1.svg'

const planFactory = {
  trial: {
    price: 'FREE',
    features: ['One active model', 'One prediction per day'],
    icon: QuartzIcon,
    color: 'var(--font-color)'
  },
  'basic-plan': {
    price: 30,
    features: ['One active model', 'Unlimited predictions'],
    icon: QuartzIcon,
    color: 'var(--blue)'
  },
  'advanced-plan': {
    price: 50,
    features: ['All basic features', 'Advanced models'],
    icon: QuartzIcon,
    color: 'var(--gold)',
    disabled: true
  }
}

export default planFactory
