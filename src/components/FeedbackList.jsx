function FeedbackList({ feedback }) {
  if (!feedback.length) {
    return <div className="empty-state"><span className="empty-icon" aria-hidden="true">✦</span><p>Your first note will appear here.</p></div>
  }

  return (
    <div className="feedback-list">
      {feedback.map((item) => (
        <article className="feedback-card" key={item.id}>
          <div className="feedback-card-top">
            <div>
              <h3>{item.name}</h3>
              <p className="feedback-date">{item.date}</p>
            </div>
            <div className="card-stars" aria-label={`${item.rating} out of 5 stars`}>{'★'.repeat(Number(item.rating))}<span>{'★'.repeat(5 - Number(item.rating))}</span></div>
          </div>
          <p className="feedback-message">“{item.message}”</p>
        </article>
      ))}
    </div>
  )
}

export default FeedbackList
