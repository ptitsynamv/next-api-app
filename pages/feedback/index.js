import { useState } from 'react';
import { buildFilePath, extractFileData } from '../api/feedback';

function FeedbackPage({ feedback }) {
  const [feedbackData, setFeedbackData] = useState();

  function onFeedbackDetails(id) {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedbackData(data.feedback));
  }

  return (
    <>
      {feedbackData && <p>email: {feedbackData.email}</p>}
      <ul>
        {feedback.map(({ id, email, text }) => (
          <li key={id}>
            text: {text}
            <button onClick={() => onFeedbackDetails(id)}>Show Details</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFilePath();
  const feedback = extractFileData(filePath);
  return {
    props: { feedback },
  };
}

export default FeedbackPage;
