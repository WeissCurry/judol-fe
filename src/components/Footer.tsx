import Logo from "../../public/logo.png";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative py-12 md:py-16 font-sans overflow-hidden">

            {/* LAYER 1: Background White Opacity 25% (Sesuai Request) */}
            <div className="absolute inset-0 bg-white/25 z-0" />

            {/* LAYER 2: Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

            {/* LAYER 3: Main Content (z-10 agar bisa diklik dan di atas background) */}
            <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

                    {/* Logo Box */}
                    <div className="bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center min-w-[3.5rem] min-h-[3.5rem] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
                        <img src={Logo} alt="JUDOL Logo" className="w-12 h-12 object-contain" />
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-black text-xl uppercase tracking-tighter flex flex-col md:block">
                            JUDOL
                            <span className="text-neutral-500 font-bold text-sm md:ml-2 normal-case tracking-normal">
                                / Journal of Underlying Decentralized Open Ledgers
                            </span>
                        </h4>

                        <p className="text-sm font-medium text-black max-w-md leading-relaxed">
                            Built for
                            <span className="inline-block bg-yellow-300 text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] px-2 py-0.5 font-bold mx-2 transform -rotate-1 hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default text-xs md:text-sm">
                                Surreal World Assets Buildathon
                            </span>
                        </p>

                        <p className="text-sm font-medium text-neutral-600">
                            Powered by{" "}
                            <a
                                href="https://story.foundation"
                                target="_blank"
                                rel="noreferrer"
                                className="font-bold text-black underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-all px-1"
                            >
                                Story Protocol
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/WeissCurry/judol-fe"
                            target="_blank"
                            className="group"
                        >
                            <div className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-neutral-100 transition-all">
                                <Github className="h-5 w-5 text-black" />
                            </div>
                        </a>

                        <a
                            href="https://x.com/muaaaaaals"
                            target="_blank"
                            className="group"
                        >
                            <div className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-neutral-100 transition-all">
                                <Twitter className="h-5 w-5 text-black" />
                            </div>
                        </a>
                    </div>

                    <div className="text-xs font-mono font-bold text-neutral-500 mt-2">
                        © 2025 WEISSCURRY. ALL RIGHTS RESERVED.
                    </div>
                </div>

            </div>
        </footer>
    );
};