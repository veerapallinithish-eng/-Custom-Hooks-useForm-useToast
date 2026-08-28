import { useEffect, useState } from 'react'
import AuthForm from './components/AuthForm'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import ToastContainer from './components/ToastContainer'
import { useToast } from './hooks/useToast'
import './App.css'

function App() {
  const [feedback, setFeedback] = useState(() => {
    try { return JSON.parse(localStorage.getItem('feedback-items')) || [] } catch { return [] }
  })
  const { toasts, showToast, dismissToast } = useToast()
  const [authMode, setAuthMode] = useState(null)

  useEffect(() => { localStorage.setItem('feedback-items', JSON.stringify(feedback)) }, [feedback])

  function addFeedback(values) {
    setFeedback((items) => [{ ...values, id: crypto.randomUUID(), date: 'Just now' }, ...items])
    showToast('Feedback submitted!', 'success')
  }

  function handleAuthSuccess(mode) {
    showToast(mode === 'login' ? 'Welcome back!' : 'Account created successfully!', 'success')
    setAuthMode(null)
  }

  return (
    <main className="app-shell">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      <header className="site-header"><a className="brand" href="/" aria-label="Kind words home"><span className="brand-mark">✦</span> kind words</a><div className="header-actions"><span className="header-note">A little room for your thoughts</span><button className="account-button" type="button" onClick={() => setAuthMode(authMode ? null : 'login')}>{authMode ? 'Close' : 'Account'} <span aria-hidden="true">↗</span></button></div></header>
      {authMode && <AuthForm mode={authMode} onModeChange={setAuthMode} onSuccess={handleAuthSuccess} onInvalid={() => showToast('Please check your details', 'error')} />}
      <section className="intro"><p className="eyebrow">Feedback / 01</p><h1>Tell us what<br /><em>you think.</em></h1><p className="intro-copy">Good experiences deserve a moment of attention. Leave a note for the people behind the work.</p></section>
      <section className="content-grid">
        <div className="form-panel"><div className="panel-heading"><span>01</span><h2>Leave a note</h2></div><FeedbackForm onSubmit={addFeedback} onInvalid={() => showToast('Please fix the errors below', 'error')} /></div>
        <div className="list-panel"><div className="panel-heading"><span>02</span><h2>From the community</h2><strong>{feedback.length.toString().padStart(2, '0')}</strong></div><FeedbackList feedback={feedback} /></div>
      </section>
      <footer><span>Made with attention</span><span>© 2024 Kind Words</span></footer>
    </main>
  )
}

export default App
