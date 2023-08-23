import { css } from '@styled-system/css'

const message = css({
  margin: 'auto',
  padding: '16px',
  minWidth: '200px',
  border: 'none',
  borderRadius: 'full',
  bgColor: '#3178c6',
  color: 'white',
  fontSize: '20px',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: 'fadeout 0.8s 0.7s linear forwards',
  pointerEvents: 'none',
})

export const showMessage = (text: string) => {
  const messageElement = document.createElement('div')
  messageElement.className = message
  messageElement.popover = 'manual'
  messageElement.innerHTML = text
  document.body.appendChild(messageElement)
  setTimeout(() => {
    messageElement.hidePopover()
    messageElement.remove()
  }, 1500)

  messageElement.showPopover()
}
