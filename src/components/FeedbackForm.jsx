import { useForm } from '../hooks/useForm'

const initialValues = { name: '', email: '', rating: '', message: '' }

function validateFeedback(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name'
  if (!values.email.trim() || !values.email.includes('@')) errors.email = 'Enter a valid email address'
  if (!values.rating) errors.rating = 'Choose a rating from 1 to 5'
  if (!values.message.trim()) errors.message = 'A little detail would be helpful'
  return errors
}

function FeedbackForm({ onSubmit, onInvalid }) {
  const { values, errors, handleChange, validateForm, resetForm } = useForm(initialValues, validateFeedback)

  function handleSubmit(event) {
    event.preventDefault()
    if (!validateForm()) {
      onInvalid()
      return
    }
    onSubmit({ ...values, name: values.name.trim(), message: values.message.trim() })
    resetForm()
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <label className="field">
          <span>Name</span>
          <input name="name" value={values.name} onChange={handleChange} placeholder="Your name" aria-invalid={Boolean(errors.name)} />
          {errors.name && <small className="field-error">{errors.name}</small>}
        </label>
        <label className="field">
          <span>Email</span>
          <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>
      </div>

      <fieldset className={`field rating-field ${errors.rating ? 'has-error' : ''}`}>
        <legend>How would you rate your experience?</legend>
        <div className="stars" aria-label="Rating from 1 to 5">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className={Number(values.rating) >= rating ? 'star selected' : 'star'}>
              <input type="radio" name="rating" value={rating} checked={values.rating === String(rating)} onChange={handleChange} />
              <span aria-hidden="true">★</span>
              <span className="sr-only">{rating} star{rating > 1 ? 's' : ''}</span>
            </label>
          ))}
        </div>
        {errors.rating && <small className="field-error">{errors.rating}</small>}
      </fieldset>

      <label className="field">
        <span>Message</span>
        <textarea name="message" value={values.message} onChange={handleChange} placeholder="What stood out to you?" maxLength="500" rows="5" aria-invalid={Boolean(errors.message)} />
        <span className="field-footer">
          {errors.message ? <small className="field-error">{errors.message}</small> : <span>Be as specific as you like.</span>}
          <span>{values.message.length}/500</span>
        </span>
      </label>

      <button className="submit-button" type="submit">Share feedback <span aria-hidden="true">↗</span></button>
    </form>
  )
}

export default FeedbackForm
