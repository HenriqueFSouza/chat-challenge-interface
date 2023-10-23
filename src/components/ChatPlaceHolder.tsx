import { ShourtCutChatOptions } from "@/consts/NewChatOptions"
import { Button } from "./ui/button"
import { IconArrowRight } from "./ui/icons"
import { useState } from "react"

type Props = {
  onSelectShortCut: (shortcut: string) => void;
}

export const ChatPlaceHolder = ({ onSelectShortCut }: Props) => {
  const [selectedOption, setSelectedOption] = useState(0)

  return (

    <div className='rounded-lg border bg-background p-8'>
      <h1 className='mb-2 text-lg font-semibold'>
        Welcome to Next.js AI ChatBot!
      </h1>

      <p className='mb-2 leading-normal text-muted-foreground'>
        This is a simple chatbot that responds to your messages. It is built with Next.js, Tailwind CSS, and TypeScript.
      </p><br />

      <p className='mb-2 leading-normal text-muted-foreground'>
        You can start a conversation here or try the following examples:
      </p>

      <div className='flex flex-col space-y-2 items-start' >
        {ShourtCutChatOptions.map((option) => (
          <Button variant='link' className={`mr-2 w-auto ${selectedOption === option.id ? 'underline' : ''}`} key={option.id} onClick={() => {
            onSelectShortCut(option.message)
            setSelectedOption(option.id)
          }}>
            <IconArrowRight className='h-4 w-4 mr-2 text-muted-foreground' />
            {option.label}
          </Button>
        ))}

      </div>
    </div>
  )

}