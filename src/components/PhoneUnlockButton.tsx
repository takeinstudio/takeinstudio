import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Phone, Lock } from "lucide-react";

export default function PhoneUnlockButton() {
  return (
    <>
      <SignedOut>
        <li className="list-none">
          <SignInButton mode="modal">
            <button className="flex items-center gap-3.5 group cursor-pointer text-left w-full mt-1 mb-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                <Lock size={14} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] sm:text-[13px] font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">Verify Phone to Unlock</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">Secure OTP required for direct contact</span>
              </div>
            </button>
          </SignInButton>
        </li>
      </SignedOut>
      <SignedIn>
        <li className="flex flex-col gap-3 mt-1">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 shadow-sm">
              <Phone size={14} strokeWidth={2.5} />
            </div>
            <a href="tel:+918908233590" className="text-[12px] sm:text-[13px] font-bold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">+91 89082 33590</a>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 shadow-sm">
              <Phone size={14} strokeWidth={2.5} />
            </div>
            <a href="tel:+919124442040" className="text-[12px] sm:text-[13px] font-bold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">+91 91244 42040</a>
          </div>
        </li>
      </SignedIn>
    </>
  );
}
