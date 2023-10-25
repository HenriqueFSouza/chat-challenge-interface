import { Button } from "./ui/button";
import { AddIcon, RegenerateIcon, SendIcon, ShareIcon } from "@/components/ui/icons";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";

type Props = {
  disabled: boolean;
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  onRegenerateResponse: () => void;
}

export const Footer = ({ disabled, onSendMessage, onNewChat, onRegenerateResponse }: Props) => {
  const [message, setMessage] = useState('')
  const textElement = useRef(null)

  useEffect(() => {
    if (textElement.current) {
      const element = textElement.current as any
      element.style.height = '0px'
      let scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px'
    }
  }, [message])

  const handleTextKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code.toLocaleLowerCase() === 'enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (!disabled && message.trim() !== '') {
      onSendMessage(message)
      setMessage('')
    }
  }
  return (
    <footer className='w-full'>
      <div className=' pt-4 md:pt-10'>
        <div className='mx-auto max-w-2xl px-4'>

          <div className='flex h-12 itemns-center justify-center'>
            <div className='flex space-x-2'>
              <Button className='h-8' variant='outline' onClick={onRegenerateResponse}>
                <RegenerateIcon />
                Regenerate response
              </Button>
              <Button className='h-8' variant='outline'>
                <ShareIcon />
                Share
              </Button>
            </div>
          </div>

          <div className='space-y-4 border-t bg-background px-4 h-auto py-4 shadow-lg sm:rounded-t-xl border '>
            <div className=' flex max-h-48 overflow-hidden items-center flex-1  bg-background px-8 sm:rounded-md sm:border sm:px-6'>
              <Button variant='outline' size='icon' className='rounded-full mr-4' onClick={onNewChat}>
                <AddIcon />
              </Button>

              <textarea
                ref={textElement}
                className='flex-1 bg-transparent resize-none border-0 min-h-[60px] max-h-48 pt-4 overflow-y-auto outline-none '
                placeholder='Send a message.'
                value={message}
                disabled={disabled}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={(e) => handleTextKeyUp(e)}
              />

              <Button
                className='inline-flex  h-8 w-10 p-0 items-center justify-center rounded-md text-sm font-medium 
                 disabled:opacity-50 bg-primary text-primary-foreground hover:text-primary-foreground shadow-md hover:bg-primary/90'
                disabled={!message}
                variant='outline'
                size='icon'
                onClick={handleSendMessage}
              >
                <SendIcon />
              </Button>
            </div>

            <p className='text-center text-sm text-muted-foreground'>Open source AI chatbot built with Next.js</p>
          </div>
        </div>
      </div>

    </footer>
  )

}