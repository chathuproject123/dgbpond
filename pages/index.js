import { useState } from 'react'
import { supabase, handleSupabaseError } from '../lib/supabase'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import Toast from '../components/Toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [messageType, setMessageType] = useState('')

  const handleResetPassword = async (e) => {
    e.preventDefault()
    
    // Validate email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      setMessageType('error')
      return
    }

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      // Get the Vercel app URL for redirect
      const redirectUrl = `${window.location.origin}/update-password`
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      })

      if (error) throw error

      setMessage('✅ Password reset email sent! Check your inbox.')
      setMessageType('success')
      setEmail('')
    } catch (err) {
      setError(handleSupabaseError(err))
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Reset Password">
      <div className="container">
        <div className="card">
          <div className="logo-container">
            <span className="logo">🏊</span>
            <h1 className="title">DGB Pond</h1>
          </div>
          
          <h2 className="subtitle">Reset Your Password</h2>
          <p className="description">Enter your email to receive a password reset link</p>

          {message && <Toast message={message} type={messageType} onDismiss={() => setMessage(null)} />}
          {error && <Toast message={error} type="error" onDismiss={() => setError(null)} />}

          <form onSubmit={handleResetPassword} className="form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
            >
              {loading ? <LoadingSpinner /> : 'Send Reset Link'}
            </button>
          </form>

          <div className="footer">
            <a href={process.env.NEXT_PUBLIC_APP_DEEP_LINK || 'myapp://login'} className="link">
              ← Back to App
            </a>
          </div>

          <style jsx>{`
            .container {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #1B5E20 100%);
              padding: 20px;
            }
            .card {
              background: white;
              border-radius: 24px;
              padding: 48px 40px;
              max-width: 440px;
              width: 100%;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .logo-container {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              margin-bottom: 24px;
            }
            .logo {
              font-size: 40px;
            }
            .title {
              font-size: 32px;
              font-weight: 800;
              color: #1B5E20;
              margin: 0;
            }
            .subtitle {
              font-size: 22px;
              font-weight: 600;
              color: #1B5E20;
              text-align: center;
              margin: 0 0 8px 0;
            }
            .description {
              color: #666;
              text-align: center;
              margin-bottom: 28px;
              font-size: 15px;
              line-height: 1.6;
            }
            .form {
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            .input-group {
              display: flex;
              flex-direction: column;
              gap: 6px;
            }
            .input-group label {
              font-size: 14px;
              font-weight: 500;
              color: #333;
            }
            .input {
              padding: 14px 16px;
              border: 2px solid #e0e0e0;
              border-radius: 12px;
              font-size: 16px;
              transition: all 0.3s;
              outline: none;
              width: 100%;
            }
            .input:focus {
              border-color: #2E7D32;
              box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.1);
            }
            .input:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }
            .btn {
              padding: 14px;
              border: none;
              border-radius: 12px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 52px;
            }
            .btn-primary {
              background: #2E7D32;
              color: white;
            }
            .btn-primary:hover:not(:disabled) {
              background: #1B5E20;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
            }
            .btn-primary:active:not(:disabled) {
              transform: translateY(0);
            }
            .btn-primary:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }
            .btn-primary.loading {
              opacity: 0.8;
            }
            .footer {
              margin-top: 24px;
              text-align: center;
            }
            .link {
              color: #2E7D32;
              text-decoration: none;
              font-size: 14px;
              font-weight: 500;
              transition: color 0.3s;
            }
            .link:hover {
              color: #1B5E20;
              text-decoration: underline;
            }
          `}</style>
        </div>
      </div>
    </Layout>
  )
}
