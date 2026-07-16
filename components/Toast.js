import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onDismiss }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onDismiss) onDismiss()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onDismiss])

  if (!visible) return null

  const bgColor = type === 'success' ? '#E8F5E9' : '#FFEBEE'
  const textColor = type === 'success' ? '#1B5E20' : '#C62828'
  const icon = type === 'success' ? '✅' : '❌'

  return (
    <div className="toast" style={{ backgroundColor: bgColor, color: textColor }}>
      <span>{icon} {message}</span>
      <button onClick={() => setVisible(false)} className="toast-close">×</button>
      <style jsx>{`
        .toast {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: slideDown 0.3s ease;
        }
        .toast-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: inherit;
          padding: 0 4px;
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
