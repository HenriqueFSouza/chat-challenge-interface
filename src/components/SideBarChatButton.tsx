import { Chat } from "@/types/Chat"
import { useState } from "react";
import { IconChatLeft, IconShare, IconTrash } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

type Props = {
  chatItem: Chat;
  active: boolean;
  onClick: (id: string) => void;
  onDelete: () => void;
}

export const SideBarChatButton = ({ chatItem, active, onClick, onDelete }: Props) => {

  return (
    <div className='flex-1 overflow-auto'>
      <div className='h-full flex-1 overflow-auto'>
        <div >
          <div className='relative flex items-center p-3 h-8 w-[300px] cursor-pointer mb-2 mx-h-30' onClick={() => onClick(chatItem.id)}>
            <div className='left-0 top-1 flex h-6 w-6 items-center justify-center'>
              <IconChatLeft className=' pt-1' />
            </div>

            <div className='relative max-h-6 flex-1 select-none overflow-hidden text-ellipsis break-all '>
              <span className={`whitespace-nowrap text-sm ${active ? 'font-semibold' : ''}`}>{chatItem.title}</span>
            </div>

            {active && (
              <div className='flex items-center'>
                <Button className='h-8 w-8' variant='ghost' size='icon' onClick={() => onClick(chatItem.id)}>
                  <IconShare className='h-5 w-5' />
                </Button>

                <Button className='h-8 w-8' variant='ghost' size='icon' onClick={onDelete}>
                  <IconTrash className='h-5 w-5' />
                </Button>

              </div>
            )}
          </div>

        </div>
      </div>
    </div >
  )

}