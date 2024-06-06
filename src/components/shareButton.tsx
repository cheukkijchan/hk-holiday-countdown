'use client';

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

type Props = {
  selectedDays: Date[];
};

export function ShareButton({ selectedDays }: Props) {
  // Save and store into URL state
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const params = new URLSearchParams(searchParams);
  selectedDays.forEach((day) => {
    params.append('selected', day.toDateString());
  });

  function handleClick() {
    const shareUrl = `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;
    toast({ title: 'Copied to clipboard' });
    navigator.clipboard.writeText(shareUrl);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline' onClick={handleClick}>
            Share Your Plan
            <Share className='ml-2 h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
