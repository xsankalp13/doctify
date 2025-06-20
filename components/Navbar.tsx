import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const  Navbar = () => {

  const { user } =  useUser();
  const pathName = usePathname();
  const router = useRouter();

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Doctify.ai</h1>
      </div>
      <div className="flex gap-5">
        { user ?
        <div className="flex items-center gap-5">
          { !(pathName === '/') && <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-18 h-18 rounded-sm ", 
              }
            }}
          />}
          { !(pathName === '/dashboard') && <Link href={'/dashboard'}> <Button className="transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer" 
                  size="lg"
          >
            Dashboard
          </Button></Link> }
        </div>
        :
        <Link href={'/sign-in'}><Button className="transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer" 
                size="lg"
        >
          Login
        </Button></Link>
        
        }
        <ModeToggle/>
      </div>
    </nav>
  );
};

export default Navbar;