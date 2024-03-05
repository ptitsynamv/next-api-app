import { useRef, useState } from 'react';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedback, setFeedback] = useState([]);

  function onSubmit(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const text = feedbackInputRef.current.value;

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ email, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function onLoadFeedback() {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then(({ data }) => setFeedback(data));
  }

  return (
    <div>
      <h1>Home page</h1>
      <form action="" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Enter your email: </label>
          <input
            type="email"
            name="email"
            id="email"
            ref={emailInputRef}
            required
          />
        </div>
        <div>
          <label htmlFor="feedback">Enter your feedback: </label>
          <textarea
            name="feedback"
            id="feedback"
            rows="5"
            ref={feedbackInputRef}
            required
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      <button onClick={onLoadFeedback}>Load feedback</button>
      <ul>
        {feedback.map(({ id, email, text }) => (
          <li key={id}>text: {text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
