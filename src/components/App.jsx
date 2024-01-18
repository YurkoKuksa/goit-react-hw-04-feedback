import React, { useState } from 'react';
import { MainContainer } from './App.styled';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [option, setOption] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = option => {
    setOption(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return option.good + option.neutral + option.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    if (totalFeedback === 0) {
      return 0;
    }
    return Math.round((option.good / totalFeedback) * 100);
  };

  const totalFeedback = countTotalFeedback();
  const hasFeedback = totalFeedback > 0;
  return (
    <MainContainer>
      <Section title="Please Leave Feedback">
        <FeedbackOptions
          options={Object.keys(option)}
          onLeaveFeedback={handleClick}
        />
      </Section>

      {hasFeedback ? (
        <Section title="Statistics">
          <Statistics
            good={option.good}
            neutral={option.neutral}
            bad={option.bad}
            total={totalFeedback}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </MainContainer>
  );
};

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleClick = option => {
//     this.setState(prevState => ({ [option]: prevState[option] + 1 }));
//   };

//   countTotalFeedback = () => {
//     return this.state.good + this.state.neutral + this.state.bad;
//   };

//   countPositiveFeedbackPercentage = () => {
//     const totalFeedback = this.countTotalFeedback();
//     if (totalFeedback === 0) {
//       return 0;
//     }
//     return Math.round((this.state.good / totalFeedback) * 100);
//   };

//   render() {
//     const totalFeedback = this.countTotalFeedback();
//     const hasFeedback = totalFeedback > 0;
//     return (
//       <MainContainer>
//         <Section title="Please Leave Feedback">
//           <FeedbackOptions
//             options={Object.keys(this.state)}
//             onLeaveFeedback={this.handleClick}
//           />
//         </Section>

//         {hasFeedback ? (
//           <Section title="Statistics">
//             <Statistics
//               good={this.state.good}
//               neutral={this.state.neutral}
//               bad={this.state.bad}
//               total={totalFeedback}
//               positivePercentage={this.countPositiveFeedbackPercentage()}
//             />
//           </Section>
//         ) : (
//           <Notification message="There is no feedback" />
//         )}
//       </MainContainer>
//     );
//   }
// }
