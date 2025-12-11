import { GitGraph, UploadCloud, BrainCircuit, FileClock, Users, CheckCircle2, Database, XCircle, ArrowDown } from "lucide-react";

export const WorkflowSection = () => {
  return (
    <section className="py-24 bg-yellow-300 border-t-4 border-b-4 border-black font-sans relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-sm font-bold font-mono shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] mb-4 transform -rotate-1">
            <GitGraph className="w-4 h-4" />
            THE PROTOCOL LOGIC
          </div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-black">
            Submission Flow
          </h2>
        </div>

        {/* --- FLOWCHART CONTAINER --- */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Main Vertical Line (The Spine) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-32 w-1.5 bg-black -translate-x-1/2 md:translate-x-0 z-0"></div>

          {/* STEP 1: UPLOAD */}
          <div className="relative z-10 flex flex-col md:flex-row items-center mb-16 group">
            {/* Content Left (Empty on Desktop for ZigZag effect or Text) */}
            <div className="flex-1 md:text-right md:pr-12 order-2 md:order-1 pl-12 md:pl-0 mt-4 md:mt-0 w-full">
               <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200">
                  <h3 className="font-black text-xl uppercase mb-2">1. Author Upload</h3>
                  <p className="text-sm font-medium text-neutral-600 leading-snug">
                    Researcher uploads PDF manuscript. File is encrypted and stored on <span className="bg-blue-100 px-1 border border-black text-xs font-bold">IPFS / PINATA</span>.
                  </p>
               </div>
            </div>
            
            {/* Center Node */}
            <div className="absolute left-4 md:left-1/2 w-12 h-12 bg-black text-white border-4 border-white flex items-center justify-center font-black rounded-full z-20 -translate-x-1/2 md:translate-x-[-50%] order-1 shadow-[0px_0px_0px_4px_black]">
               <UploadCloud className="w-6 h-6" />
            </div>

            {/* Content Right (Empty) */}
            <div className="flex-1 hidden md:block order-3"></div>
          </div>

          {/* STEP 2: AI AGENT */}
          <div className="relative z-10 flex flex-col md:flex-row items-center mb-16 group">
            {/* Content Left (Empty) */}
            <div className="flex-1 hidden md:block order-1"></div>

            {/* Center Node */}
            <div className="absolute left-4 md:left-1/2 w-12 h-12 bg-purple-600 text-white border-4 border-white flex items-center justify-center font-black rounded-full z-20 -translate-x-1/2 md:translate-x-[-50%] order-1 shadow-[0px_0px_0px_4px_black]">
               <BrainCircuit className="w-6 h-6" />
            </div>

            {/* Content Right */}
            <div className="flex-1 md:pl-12 order-2 pl-12 mt-4 md:mt-0 w-full">
               <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[-4px] transition-all duration-200">
                  <h3 className="font-black text-xl uppercase mb-2">2. AI Pre-Screening</h3>
                  <p className="text-sm font-medium text-neutral-600 leading-snug">
                    AI scans for plagiarism & structure. Generates a <span className="bg-purple-100 px-1 border border-black text-xs font-bold">PREDICTED SINTA SCORE</span> as initial metadata.
                  </p>
               </div>
            </div>
          </div>

          {/* STEP 3: MINT DRAFT */}
          <div className="relative z-10 flex flex-col md:flex-row items-center mb-16 group">
            <div className="flex-1 md:text-right md:pr-12 order-2 md:order-1 pl-12 md:pl-0 mt-4 md:mt-0 w-full">
               <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200">
                  <h3 className="font-black text-xl uppercase mb-2">3. Mint "Draft" Asset</h3>
                  <p className="text-sm font-medium text-neutral-600 leading-snug">
                    Registered on Story Protocol as <span className="bg-orange-200 px-1 border border-black text-xs font-bold">UNVERIFIED IP</span>. License is restricted (Non-Commercial).
                  </p>
               </div>
            </div>
            <div className="absolute left-4 md:left-1/2 w-12 h-12 bg-orange-500 text-white border-4 border-white flex items-center justify-center font-black rounded-full z-20 -translate-x-1/2 md:translate-x-[-50%] order-1 shadow-[0px_0px_0px_4px_black]">
               <FileClock className="w-6 h-6" />
            </div>
            <div className="flex-1 hidden md:block order-3"></div>
          </div>

          {/* STEP 4: PEER REVIEW */}
          <div className="relative z-10 flex flex-col md:flex-row items-center mb-24 group">
            <div className="flex-1 hidden md:block order-1"></div>
            <div className="absolute left-4 md:left-1/2 w-12 h-12 bg-blue-600 text-white border-4 border-white flex items-center justify-center font-black rounded-full z-20 -translate-x-1/2 md:translate-x-[-50%] order-1 shadow-[0px_0px_0px_4px_black]">
               <Users className="w-6 h-6" />
            </div>
            <div className="flex-1 md:pl-12 order-2 pl-12 mt-4 md:mt-0 w-full">
               <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[-4px] transition-all duration-200">
                  <h3 className="font-black text-xl uppercase mb-2">4. Expert Verification</h3>
                  <p className="text-sm font-medium text-neutral-600 leading-snug">
                    Expert Nodes (SINTA 1-2) review the paper manually to validate the AI's findings.
                  </p>
               </div>
            </div>
          </div>

          {/* --- FINAL BRANCHING (SPLIT) --- */}
          
          {/* Connector Lines for Split */}
          <div className="absolute bottom-[200px] md:bottom-[220px] left-4 md:left-1/2 w-1 md:w-[60%] h-1 bg-black -translate-x-1/2 md:-translate-x-1/2 z-0 hidden md:block"></div>
          
          {/* Vertical Connectors for Split */}
          <div className="hidden md:block absolute bottom-[200px] left-[20%] w-1.5 h-8 bg-black"></div>
          <div className="hidden md:block absolute bottom-[200px] right-[20%] w-1.5 h-8 bg-black"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 md:pt-8 pl-12 md:pl-0">
            
            {/* OUTCOME A: REJECTED */}
            <div className="relative group">
                {/* Mobile Connector */}
                <div className="absolute -left-8 top-8 w-8 h-1 bg-black md:hidden"></div>
                <div className="absolute -left-[34px] top-8 w-3 h-3 bg-black rounded-full md:hidden"></div>

                <div className="bg-neutral-100 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col items-center text-center hover:translate-y-[-4px] transition-transform relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase">
                        PATH A
                    </div>
                    <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center rounded-full mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                        <Database className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-black text-2xl uppercase mb-2">Data Asset</h4>
                    <div className="bg-red-100 text-red-800 border-2 border-red-200 px-2 py-1 text-xs font-bold uppercase mb-4 inline-block">
                        License: Data-Only
                    </div>
                    <p className="text-sm font-medium text-neutral-600">
                        Paper is rejected for publication but minted as a raw dataset to <span className="font-bold underline">train AI models</span>.
                    </p>
                </div>
            </div>

            {/* OUTCOME B: APPROVED */}
            <div className="relative group mt-8 md:mt-0">
                {/* Mobile Connector */}
                <div className="absolute -left-8 top-8 w-8 h-1 bg-black md:hidden"></div>
                <div className="absolute -left-[34px] top-8 w-3 h-3 bg-black rounded-full md:hidden"></div>

                <div className="bg-blue-50 border-4 border-black p-6 shadow-[8px_8px_0px_0px_#0065D1] h-full flex flex-col items-center text-center hover:translate-y-[-4px] transition-transform relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold px-2 py-1 uppercase">
                        PATH B
                    </div>
                    <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center rounded-full mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-black text-2xl uppercase mb-2">Liquid IP Asset</h4>
                    <div className="bg-green-100 text-green-800 border-2 border-green-200 px-2 py-1 text-xs font-bold uppercase mb-4 inline-block">
                        License: Commercial (PIL)
                    </div>
                    <p className="text-sm font-medium text-neutral-600">
                        Paper is published. Author earns <span className="font-bold underline">Programmatic Royalties</span> for every citation & remix.
                    </p>
                </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};