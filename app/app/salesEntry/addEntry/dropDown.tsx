"use client"
import { getDocs, collection } from "firebase/firestore"
import * as React from "react"
import { useUser } from "@/app/context"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect,useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const dummy: string [] =
 [
  
     "next.js",
    "remix.js",
     "gastby.js",
     "vue.js",
]

export function ComboboxDemo({value,setValue}: {value: any, setValue: any}) {
    const {db} = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [products,setProducts] = useState<string[]>(dummy);



useEffect(()=>{
(async ()=>{
    try {
let fetchedProducts : any = [];
 const  productsRef = collection(db,"Phones");
const querySnapshot = await getDocs(productsRef);

querySnapshot.forEach((doc) => {
fetchedProducts = [...fetchedProducts,doc.id]
   
  });
setProducts(fetchedProducts)

    } catch (error) {
        console.log(error)
    }
    
})()

}
,[])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between h-[60px] border-stone-900 rounded-none"
        >
          {value
            ? products.find((item) => item === value)
            : "Select IMEI"}
          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search IMEI..." className="h-9" />
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup>
            {products.map((item) => (
              <CommandItem
                key={item}
                value={item}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {item}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === item? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
