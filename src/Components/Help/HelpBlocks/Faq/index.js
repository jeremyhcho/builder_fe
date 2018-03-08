import React from 'react'

// CSS
import '../HelpBlock.scss'

// Helpers
import FaqFactory from './FaqFactory'

const Faq = () => {
  const answerList = (listOfAnswers) => {
    return (
      <ul>
        {
          listOfAnswers.map(answer => (
            <li key={answer.header}>
              {answer.header && <span className="semibold">{answer.header}: <span>{' '}</span></span>}
              {answer.detail}
            </li>
          ))
        }
      </ul>
    )
  }

  return (
    <main styleName="help-block-1">
      <header>
        Frequently asked questions
      </header>

      {
        FaqFactory.map(faq => (
          <div styleName="sub-section" key={faq.question}>
            <p styleName="sub-header">
              {faq.question}
            </p>

            {
              Array.isArray(faq.answer)
                ? answerList(faq.answer)
                : <p styleName="description">{faq.answer}</p>
            }
          </div>
        ))
      }
    </main>
  )
}

export default Faq
