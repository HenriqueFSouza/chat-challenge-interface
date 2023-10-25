import { ChatMessage } from "@/types/ChatMessage"
import { IconCopy, OpenAIIcon, UserIcon } from "@/components/ui/icons";
import { Button } from "./ui/button";

type Props = {
  message: ChatMessage;
}
export const ChatMessageItem = ({ message }: Props) => {

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    navigator.clipboard.writeText(message.body)
  }

  return (
    <div className='mb-10'>
      <div className='max-w-4xl m-auto flex items-center mb-6'>

        <div className={`flex h-10 w-10 items-center justify-center rounded-md mx-4 md:ml-0 border shadow 
        ${message.author === 'me' ? 'bg-background ' : 'bg-primary text-primary-foreground'}`}
        >
          {message.author === 'me' && <UserIcon />}
          {message.author === 'ai' && <OpenAIIcon />}
        </div>
        <div className='ml-4 flex-1 space-y-2 overflow-hidden px-2'>
          <p className='mb-2 last:mb-0 text-primary/[0.8]' id='message-body'>{message.body} </p>
        </div>

        <div>
          <Button variant='ghost' size='icon' onClick={(e) => handleCopy(e)}>
            <IconCopy />
          </Button>
        </div>
      </div>
    </div >
  )

}