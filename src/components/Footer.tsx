import React from 'react';
import { Twitter, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full py-8 mt-auto animate-fade-in text-center z-10 relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4">

                {/* Brand & Copyright */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-muted-foreground/60">
                        &copy; {new Date().getFullYear()} StarHub. All rights reserved.
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                    <a
                        href="https://t.me/hossiydev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-border/40 text-muted-foreground/60 hover:text-foreground hover:border-foreground/50 hover:bg-secondary/20 transition-all duration-200"
                        aria-label="Telegram"
                    >
                        <Send className="w-4 h-4" />
                    </a>

                </div>

                {/* Built With */}
                <div className="text-[10px] text-muted-foreground/30 font-medium tracking-wide">
                    BUILT FOR DEVELOPERS
                </div>
            </div>
        </footer>
    );
}
