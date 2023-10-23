import { Chat } from "@/types/Chat";
import { ChatPlaceHolder } from "./ChatPlaceHolder";
import { ChatMessageItem } from "./ChatMessageItem";
import { Separator } from "@/components/ui/separator";
import { ChatMessageLoading } from "./ChatMessageLoading";
import { useEffect, useRef } from "react";


type Props = {
  chat: Chat | undefined;
  loading: boolean;
  onSelectShortCut: (shortcut: string) => void;
}
export const ChatArea = ({ chat, loading, onSelectShortCut }: Props) => {
  const refElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    refElement.current?.scrollTo(0, refElement.current.scrollHeight)

  }, [loading, chat?.messages.length])

  return (
    <section ref={refElement} className='flex-auto h-0 overflow-y-scroll'>

      <div className='pb-[200px] pt-4 md:pt-10'>
        <div className='mx-auto max-w-2xl px-4'>

          {!chat && <ChatPlaceHolder onSelectShortCut={onSelectShortCut} />}
          {chat && chat?.messages?.map((message, index) => (
            <>
              <ChatMessageItem
                key={message.id}
                message={message}
              />
              {index !== chat.messages.length - 1 && <Separator className='w-5/6 my-4 md:my-8 mx-auto ' />}
            </>
          ))}
          {loading && <ChatMessageLoading />}

        </div>
      </div>
    </section>
  )
}