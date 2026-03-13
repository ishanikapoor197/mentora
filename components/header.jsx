
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import {
  ChevronDown,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  PenBox,
  StarsIcon
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"

import { checkUser } from "@/lib/checkUser"

const Header = async () => {

  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-background/60">
      
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo3.png"
            alt="mentora logo"
            width={200}
            height={60}
            className="h-17 py-1 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">

          <SignedIn>

            {/* Industry Insights */}
            <Button asChild variant="outline">
              <Link href="/dashboard">
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden md:block">Industry Insights</span>
                </span>
              </Link>
            </Button>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>

              <DropdownMenuTrigger asChild>
                <Button className=" text-white">
                  <span className="flex items-center gap-2">
                    <StarsIcon className="h-4 w-4" />
                    <span className="hidden md:block">Growth Tools</span>
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48 bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-lg z-50"
              >

                <DropdownMenuItem asChild>
                  <Link
                    href="/resume"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <PenBox className="h-4 w-4" />
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/mocktest"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <ClipboardCheck className="h-4 w-4" />
                    <span>Mock Test</span>
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          </SignedIn>

          {/* Sign In */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          {/* User Profile */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold"
                }
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

        </div>

      </nav>

    </header>
  )
}

export default Header
