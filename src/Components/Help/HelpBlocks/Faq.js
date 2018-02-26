import React from 'react'

// CSS
import './HelpBlock.scss'

const Faq = () => (
  /* eslint-disable max-len */
  <main styleName="help-block-1">
    <header>
      Frequently asked questions
    </header>

    <div styleName="sub-section">
      <p styleName="sub-header">
        What tools does Quartz offer?
      </p>

      <p styleName="description">
        Quartz allows you to create simplified models by applying "weights" onto key metrics when determining the type of prediction your model makes. These models automatically generate and update predictions throughout the day and if left active, it takes the prediction into its win/loss. You can toggle a model's active state per game (through the game details page) or entirely in the Models section.
      </p>
    </div>

    <div styleName="sub-section">
      <p styleName="sub-header">
        What is the difference between a "standard" and "advanced" model?
      </p>

      <p styleName="description">
        Although not currently available for beta, we intend on creating "advanced" models that give more control to the bettor in customizing the type of predictions it creates.
      </p>
    </div>

    <div styleName="sub-section">
      <p styleName="sub-header">
        Will Quartz be supporting sports other than NBA?
      </p>

      <p styleName="description">
        Definitely! We currently have MLB and NFL in the pipeline.
      </p>
    </div>

    <div styleName="sub-section">
      <p styleName="sub-header">
        What features are coming soon?
      </p>

      <ul>
        <li>
          <span className="semibold">Tracking Bets: </span>
          {' '} We'll be implementing a way for you to keep track of the bets you actually make. We understand that there are times when you bet according to your intuition and gut rather than the prediction of your model and so we want to give you an easy way to keep track of how you're doing throughout the season!
        </li>

        <li>
          <span className="semibold">Sharing: </span>
          {' '} Be it sharing the details of your model, outcomes of your model, or your bet history, you'll be able to selectively share your success with others through the click of a button.
        </li>

        <li>
          <span className="semibold">Pick of the Day: </span>
          {' '} We will be posting a detailed write up of our Pick of the Day shortly. More details coming soon!
        </li>
      </ul>
    </div>
  </main>
  /* eslint-enable max-len */
)

export default Faq
