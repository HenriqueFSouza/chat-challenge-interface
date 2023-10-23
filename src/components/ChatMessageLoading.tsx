import { OpenAIIcon } from "./ui/icons"

export const ChatMessageLoading = () => {
  return (
    <div className='mb-10'>
      <div className='max-w-4xl m-auto flex items-center mb-6'>

        <div className='flex h-10 w-10 items-center justify-center rounded-md mx-4 md:ml-0 border shadow bg-primary text-primary-foreground'
        >
          <OpenAIIcon />
        </div>
      </div>
    </div >
  )
}