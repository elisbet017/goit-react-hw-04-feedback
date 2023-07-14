import { useState } from 'react';
import { GlobalStyles } from 'utils/GlobalStyles';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onUpdateStatistics = option => {
    switch (option) {
      case 'Good':
        setGood(prev => prev + 1);
        break;
      case 'Neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'Bad':
        setBad(prev => prev + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / (good + neutral + bad)) * 100);
  };

  const hasFeedback = good || neutral || bad;

  return (
    <>
      <Section title="Please leave your feedback">
        <FeedbackOptions
          onLeaveFeedback={option => onUpdateStatistics(option)}
          options={['Good', 'Neutral', 'Bad']}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {hasFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={`${countPositiveFeedbackPercentage()}%`}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
      <GlobalStyles />
    </>
  );
};
