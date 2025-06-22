"use client"
import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { ArrowRightIcon, Loader, PlusCircleIcon } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu'
import axios from 'axios'
import { toast } from 'sonner'

const StartConsultation = ({ doctor }:{ doctor:string }) => {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleNext = async () => {
    setLoading(true)
    try {
      
      const res = await axios.post('/api/session-chat', {
        note: note,
        selectedDoctor: doctor
      });

      console.log("Session Created", res.data);
      toast.success("Information Saved!");

      setNote("")

    } catch (error) {
      console.error("Failed to create session:", error);
      toast("Something went wrong. Try again.");
    }finally{
      setLoading(false)
    }

  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if(open) {
          setTimeout(() => {
            textareaRef.current?.focus()
          },10);
        }
      }}
    
    >
      <DialogTrigger className='w-full' asChild>
        <Button className='w-full cursor-pointer flex items-center gap-2 text-xs md:text-sm'> <PlusCircleIcon className='hidden md:block'/> Consult With Doctor </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription>
            Add Symptoms or Any Other Details
          </DialogDescription>
        </DialogHeader>
        <DropdownMenu >
          <DropdownMenuTrigger asChild className='w-40'>
              <Button variant={"outline"} >
                  {doctor}
              </Button>
          </DropdownMenuTrigger>

        </DropdownMenu>
        <Textarea placeholder='I have back pain .....' 
                  ref={textareaRef}
                  className='h-44' 
                  value={note}
                  maxLength={500}
                  onChange={(e) => setNote(e.target.value)}/>
          {/* Character validation message */}
        <p className={`text-sm mt-1 ${note?.length < 10 ? 'text-red-400' : 'text-green-400'}`}>
          {note?.length < 10
            ? `Please enter at least 10 characters (${note?.length || 0}/10)`
            : 'Looks good!'}
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {loading ?
          <Button disabled> <Loader className='h-6 w-6 animate-spin text-muted-foreground' /> </Button>
            :
          <Button disabled={note?.length < 10} onClick={handleNext} className='flex items-center gap-2' > Next <ArrowRightIcon/> </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default StartConsultation