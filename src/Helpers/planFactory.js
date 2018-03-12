import QuzeIcon from 'Assets/Icons/blue-q-1.svg'

const planFactory = {
  trial: {
    price: 'FREE',
    features: ['One active model', 'One prediction per day'],
    icon: QuzeIcon,
    color: 'var(--font-color)'
  },
  'single-plan': {
    price: 30,
    features: ['One active model', 'Unlimited predictions'],
    icon: QuzeIcon,
    color: 'var(--blue)'
  },
  'multi-plan': {
    price: 50,
    features: ['Up to three active models', 'Unlimited predictions'],
    icon: QuzeIcon,
    color: 'var(--gold)',
    disabled: true
  }
}

export default planFactory
