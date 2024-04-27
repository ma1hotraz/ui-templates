import styles from './index.module.css'
import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { useColorPalates } from '../../molecules/theme-provider/hooks'
import { useUiConfig } from '../../hook/useConfig'

const HomePage = () => {
  const config = useUiConfig('component', 'homePage')

  const theme = useColorPalates()
  const inputRef = useRef(null)
  const [inputMsg, setInputMsg] = useState('')

  const sendMessage = useCallback(async (msg: string) => {
    if (msg.length === 0) {
      toast.error('Please enter a message to send')
      return
    }
    toast.success('Message sent!')
    setInputMsg('')
  }, [])

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value
    setInputMsg(inputValue)

    // Adjust textarea height dynamically based on content
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.style.height = 'auto'
      //@ts-ignore
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }

  return (
    <>
      <div className={styles.main} style={{ color: theme?.primary?.main }}>
        <>
          <div className={styles.title}>{config?.title}</div>
          {config?.showBtns && (
            <div className={styles.imgButtons}>
              {config?.btns?.map((btn: any, index: number) => (
                <div
                  className={styles.imgBtn}
                  key={index}
                  onClick={() => console.log("clicked")}
                >
                  <img src={btn.image} alt={btn?.title} />
                  <p>{btn?.title}</p>
                </div>
              ))}
            </div>
          )}
          {config?.showMic && (
            <div className={styles.voiceRecorder}>
              {/* Render a recorder component here */}
            </div>
          )}
        </>

        <form onSubmit={(event) => event?.preventDefault()}>
          <div className={`${`${styles.inputBox} ${styles.inputBoxOpen}`}`}>
            <textarea
              ref={inputRef}
              rows={1}
              value={inputMsg}
              onChange={handleInputChange}
              placeholder={config?.placeholder}
            />
            <button type="submit" className={styles.sendButton}>
              <img
                src={config.sendButtonImage}
                width={50}
                height={50}
                alt="sendIcon"
                onClick={() => sendMessage(inputMsg)}
              />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default HomePage
