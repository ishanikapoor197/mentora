import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import Chatbot from "@/components/chatbot";


const inter= Inter({subsets:["latin"]});


export const metadata = {
  title: "Mentora- Ai Career Coach",
  description: "This app is developed by Ishan and Ishani ",
};

export default function RootLayout({ children }) {
  return (
      <ClerkProvider appearance={{
        baseTheme:dark,
      }}>



    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} `}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
            >
            {/* header */}
            <Header/>
            <main className="min-h-screen">

            {children}
            </main>
            <Chatbot/>
            <Toaster richColors />
           
<footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-red-200 ">
                <p>Made with ❤️‍🔥 by <span className="text-blue-500">Ishan and Ishani </span></p>
              </div>
            </footer>
          </ThemeProvider>
        
      </body>
    </html>

</ClerkProvider>
  );
}

