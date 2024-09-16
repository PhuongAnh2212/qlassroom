import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Sidebar } from "./(dashboard)/_components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
        <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
          <div className="flex items-center">
            <Sidebar />
          </div>
          {/* <div className="flex items-center space-x-4 pt-70">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div> */}
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
