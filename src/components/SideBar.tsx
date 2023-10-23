import * as React from 'react'
import { Button } from '@/components/ui/button'
import { IconClose, IconMenu } from './ui/icons'

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onClearHistory: () => void;
}

export const SideBar = ({ open, onClose, onClearHistory, children }: Props) => {
  return (
    <section className={`
    fixed left-0 top-0 bottom-0 md:static ease-in-out duration-300 -translate-x-full w-72
    border-r bg-gradient-to-r from-background/10 via-background/50 to-background/80 lg:w-[350px]
    ${open ? ' bg-[#F4F4F5] ml-0 translate-x-0 ' : '-ml-72'} 
    `}>


      <div className='flex flex-col w-full h-full'>

        <div className='flex items-center p-4 pt-6 justify-between w-full h-8'>
          <p className='text-sm font-semibold'>Chat History</p>
          <Button variant='ghost' size='icon' onClick={onClose} className='md:hidden'>
            <IconClose />
          </Button>
        </div>

        <nav className='flex-1 pt-2 overflow-auto'>
          {children}
        </nav>

        <div className='self-end'>
          <Button variant='ghost' onClick={onClearHistory}>
            Clear History
          </Button>
        </div>

      </div >
    </section >
  )
}
