'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CHATBOT_POSITIONS } from './constant';
import type { ChatButtonProps } from './type';

export function ChatButton({
  onClick,
  isOpen,
  position = 'bottom-right',
  dictionary
}: ChatButtonProps) {
  return (
    <>
      {!isOpen && (
        <button
          onClick={onClick}
          data-chat-button
          className={cn(
            CHATBOT_POSITIONS[position],
            'hidden md:flex items-center justify-center',
            'z-[9999] transition-all duration-300 ease-in-out',
            'h-12 w-12 rounded-full',
            'bg-primary hover:bg-primary/90',
            'shadow-lg hover:shadow-xl',
            'hover:scale-105'
          )}
          aria-label={dictionary.openChat}
        >
          <Image
            src="/robot.png"
            alt="Chatbot"
            width={28}
            height={28}
            className="h-7 w-7 object-contain brightness-0 invert"
          />
        </button>
      )}
    </>
  );
}
