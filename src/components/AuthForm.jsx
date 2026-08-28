import { useForm } from '../hooks/useForm'

const loginValues = { email: '', password: '' }
const registerValues = { name: '', email: '', password: '', confirmPassword: '' }

function validateAuth(values, mode) {
  const errors = {}
  if (mode === 'register' && !values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email address'
  if (values.password.length < 8) errors.password = 'Use at least 8 characters'
  if (mode === 'register' && values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match'
  return errors
}

function AuthForm({ mode, onModeChange, onSuccess, onInvalid }) {
  const initialValues = mode === 'login' ? loginValues : registerValues
  const { values, errors, handleChange, validateForm, resetForm } = useForm(initialValues, (currentValues) => validateAuth(currentValues, mode))

  function handleSubmit(event) {
    event.preventDefault()
    if (!validateForm()) {
      onInvalid()
      return
    }
    onSuccess(mode)
    resetForm()
  }

  function switchMode(nextMode) {
    resetForm()
    onModeChange(nextMode)
  }

  return (
    <div className="auth-panel" role="dialog" aria-labelledby="auth-title">
      <div className="auth-header">
        <div><p className="eyebrow">Member access</p><h2 id="auth-title">{mode === 'login' ? 'Welcome back.' : 'Join the conversation.'}</h2></div>
        <button className="auth-close" type="button" onClick={() => onModeChange(null)} aria-label="Close account panel">×</button>
      </div>
      <div className="auth-tabs" role="tablist" aria-label="Account access">
        <button className={mode === 'login' ? 'auth-tab active' : 'auth-tab'} type="button" role="tab" aria-selected={mode === 'login'} onClick={() => switchMode('login')}>Log in</button>
        <button className={mode === 'register' ? 'auth-tab active' : 'auth-tab'} type="button" role="tab" aria-selected={mode === 'register'} onClick={() => switchMode('register')}>Register</button>
      </div>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {mode === 'register' && <label className="field"><span>Name</span><input name="name" value={values.name} onChange={handleChange} placeholder="Your name" aria-invalid={Boolean(errors.name)} />{errors.name && <small className="field-error">{errors.name}</small>}</label>}
        <label className="field"><span>Email</span><input type="email" name="email" value={values.email} onChange={handleChange} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />{errors.email && <small className="field-error">{errors.email}</small>}</label>
        <label className="field"><span>Password</span><input type="password" name="password" value={values.password} onChange={handleChange} placeholder="At least 8 characters" aria-invalid={Boolean(errors.password)} />{errors.password && <small className="field-error">{errors.password}</small>}</label>
        {mode === 'register' && <label className="field"><span>Confirm password</span><input type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} placeholder="Repeat your password" aria-invalid={Boolean(errors.confirmPassword)} />{errors.confirmPassword && <small className="field-error">{errors.confirmPassword}</small>}</label>}
        <button className="submit-button" type="submit">{mode === 'login' ? 'Log in' : 'Create account'} <span aria-hidden="true">↗</span></button>
      </form>
    </div>
  )
}

export default AuthForm
