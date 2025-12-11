import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, DollarSign, Award, BookOpen, Clock, ArrowRight, BrainCircuit, Database, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
// Import unified data source
import { getPapersByStatus, Paper } from "@/database/MockData";

export default function VerifyPage() {
    // Initialize with processing tasks from our unified "Database"
    const [tasks, setTasks] = useState<Paper[]>([]);

    const [reviewerStats] = useState({
        reputation: 850,
        level: "SENIOR REVIEWER",
        earnings: 450.50,
        reviewedCount: 124,
        nextLevelProgress: 72,
    });

    // --- 1. LOAD TASKS & FETCH IPFS DETAILS ---
    useEffect(() => {
        // 1a. Load initial list from local DB (merges static + local storage)
        const initialTasks = getPapersByStatus("processing");

        // 1b. Enhance with IPFS data if available
        const enrichTasks = async () => {
            const enriched = await Promise.all(initialTasks.map(async (task) => {
                // Clone task to avoid mutation
                const updatedTask = { ...task };

                // If metadataUrl exists, try to fetch fresh data
                if (updatedTask.metadataUrl) {
                    try {
                        const res = await fetch(updatedTask.metadataUrl);
                        if (res.ok) {
                            const meta = await res.json();
                            // Update fields from IPFS
                            updatedTask.title = meta.name || updatedTask.title;
                            updatedTask.abstract = meta.description || updatedTask.abstract;

                            const authorAttr = meta.attributes?.find((a: any) => a.trait_type === "Author");
                            if (authorAttr) updatedTask.author = authorAttr.value;

                            // Parse other attributes if needed, though parseLocalItem in MockData handles most
                        }
                    } catch (e) {
                        console.warn("IPFS fetch failed for verify task", task.id);
                    }
                }
                return updatedTask;
            }));
            setTasks(enriched);
        };

        enrichTasks();
    }, []);

    // --- 2. HANDLE VOTE (Update LocalStorage "Database") ---
    const handleVote = (id: string, decision: 'APPROVE' | 'REJECT') => {
        // A. Update UI Feedback
        if (decision === 'APPROVE') {
            toast.success("Verifikasi Berhasil", {
                description: "License upgraded to Commercial (PIL). Asset is now verified.",
            });
        } else {
            toast("Submission Rejected", {
                description: "License downgraded to 'Data-Only'. Moved to Data Pool.",
                icon: <Database className="h-4 w-4 text-orange-500" />,
            });
        }

        // B. Update LocalStorage (Simulating DB Update)
        const localData = localStorage.getItem("myAssets");
        if (localData) {
            const parsedData = JSON.parse(localData);
            const updatedData = parsedData.map((item: any) => {
                if (item.id === id) {
                    return {
                        ...item,
                        status: decision === 'APPROVE' ? 'verified' : 'data_pool',
                        license: decision === 'APPROVE' ? 'Commercial (PIL)' : 'Data-Only',
                        price: decision === 'APPROVE' ? '50 IP' : 'Free'
                    };
                }
                return item;
            });
            localStorage.setItem("myAssets", JSON.stringify(updatedData));
        }

        // C. Remove from UI list
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="min-h-screen bg-white pb-20 pt-12 font-sans selection:bg-yellow-300 selection:text-black">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* HEADER */}
                <div className="mb-12 border-b-4 border-black pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="inline-block bg-black text-white px-3 py-1 text-sm font-bold font-mono mb-4 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(128,128,128,0.5)]">
                            PEER REVIEW PROTOCOL
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                            Reviewer <br className="md:hidden" /> Hub
                        </h1>
                        <p className="text-xl font-medium text-neutral-800 mt-4 border-l-4 border-black pl-4">
                            Validate AI findings, curate the Knowledge Graph, and earn <span className="font-bold bg-green-200 px-1 border border-black">IP Tokens</span>.
                        </p>
                    </div>

                    <Button className="h-12 border-2 border-black bg-white text-black rounded-none font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <BookOpen className="mr-2 h-5 w-5" /> VIEW GUIDELINES
                    </Button>
                </div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Reputation Card */}
                    <div className="bg-blue-100 p-6 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-white p-2 border-2 border-black">
                                <Award className="h-6 w-6 text-black" />
                            </div>
                            <div className="bg-black text-white px-2 py-0.5 text-xs font-bold uppercase">Level {reviewerStats.level.split(' ')[0]}</div>
                        </div>
                        <div className="text-4xl font-black font-mono mb-1">{reviewerStats.reputation}</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-600 flex items-center gap-1">
                            Reputation Score <span className="text-green-700 bg-green-200 px-1 border border-black text-[10px]">+12</span>
                        </div>
                    </div>

                    {/* Tasks Card */}
                    <div className="bg-purple-100 p-6 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-white p-2 border-2 border-black">
                                <BrainCircuit className="h-6 w-6 text-black" />
                            </div>
                            <div className="bg-red-500 text-white px-2 py-0.5 text-xs font-bold uppercase border border-black animate-pulse">High Priority</div>
                        </div>
                        <div className="text-4xl font-black font-mono mb-1">{tasks.length}</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                            Pending Validations
                        </div>
                    </div>

                    {/* Rewards Card */}
                    <div className="bg-green-100 p-6 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-white p-2 border-2 border-black">
                                <DollarSign className="h-6 w-6 text-black" />
                            </div>
                            <Button variant="link" className="h-auto p-0 text-xs font-bold uppercase text-black underline decoration-2 hover:bg-white px-1">Claim</Button>
                        </div>
                        <div className="text-4xl font-black font-mono mb-1">45.0 <span className="text-xl">IP</span></div>
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                            Unclaimed Rewards
                        </div>
                    </div>
                </div>

                {/* TASK LIST SECTION */}
                <Tabs defaultValue="queue" className="w-full">
                    <div className="flex items-center gap-4 mb-8">
                        <TabsList className="bg-transparent gap-2 p-0 h-auto">
                            <TabsTrigger
                                value="queue"
                                className="h-12 px-6 border-2 border-transparent rounded-none font-black text-lg uppercase data-[state=active]:bg-yellow-300 data-[state=active]:text-black data-[state=active]:border-black data-[state=active]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 transition-all"
                            >
                                Verification Queue
                            </TabsTrigger>
                            <TabsTrigger
                                value="history"
                                className="h-12 px-6 border-2 border-transparent rounded-none font-black text-lg uppercase data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black data-[state=active]:shadow-[4px_4px_0px_0px_rgba(128,128,128,0.5)] hover:bg-neutral-100 transition-all"
                            >
                                My History
                            </TabsTrigger>
                        </TabsList>
                        <div className="h-1 flex-1 bg-black hidden md:block mt-2"></div>
                    </div>

                    <TabsContent value="queue" className="space-y-8">
                        {tasks.length === 0 ? (
                            <div className="text-center py-20 bg-white border-4 border-black border-dashed">
                                <CheckCircle2 className="h-16 w-16 text-black mx-auto mb-4" />
                                <h3 className="text-3xl font-black uppercase mb-2">All Caught Up!</h3>
                                <p className="text-xl font-bold text-neutral-500">No pending verifications. Check back later.</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <Card key={task.id} className="group overflow-visible border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white relative">


                                    {/* Header */}
                                    <div className="p-6 md:p-8 border-b-2 border-black bg-neutral-50 flex flex-col md:flex-row justify-between gap-6 pl-6 pt-12 md:pt-8 md:pl-8">
                                        <div className="space-y-3">
                                            <div className="flex gap-2 items-center flex-wrap">
                                                <Badge variant="outline" className="text-xs font-bold border-2 border-black bg-white rounded-none px-2 py-0.5">
                                                    RESEARCH
                                                </Badge>
                                                <div className="flex items-center gap-1 text-xs font-bold font-mono bg-red-100 px-2 py-0.5 border border-black text-red-600">
                                                    <Clock className="h-3 w-3" /> 23H 59M LEFT
                                                </div>
                                            </div>
                                            <h3 className="text-3xl font-black uppercase leading-none">{task.title}</h3>
                                            <p className="font-bold text-neutral-500 text-sm">
                                                SUBMITTED BY <span className="text-black bg-yellow-200 px-1 border border-black">{task.author}</span>
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <div className="bg-green-100 border-2 border-black p-3 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[120px]">
                                                <div className="text-xs font-bold uppercase mb-1">Bounty</div>
                                                <div className="text-2xl font-black font-mono flex items-center justify-center gap-1">
                                                    <DollarSign className="h-5 w-5" /> 50.0 <span className="text-sm">IP</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid md:grid-cols-3 gap-0">

                                        {/* Abstract (Left Col) */}
                                        <div className="md:col-span-2 p-6 md:p-8 space-y-4 border-r-0 md:border-r-2 border-black">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileText className="h-5 w-5 text-black" />
                                                <h4 className="text-lg font-black uppercase">Abstract</h4>
                                            </div>
                                            <p className="text-base font-medium leading-relaxed bg-white p-4 border-2 border-neutral-200 text-neutral-800 font-mono">
                                                "{task.abstract}"
                                            </p>
                                            <Button variant="link" className="p-0 text-black font-bold uppercase underline decoration-2 hover:bg-yellow-300 px-1">
                                                READ FULL PDF DOCUMENT <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>

                                        {/* AI Insight (Right Col) */}
                                        <div className="md:col-span-1 p-6 md:p-8 bg-neutral-100 space-y-6">
                                            <div className="flex items-center gap-2 mb-2 border-b-2 border-black pb-2">
                                                <BrainCircuit className="h-5 w-5 text-purple-600" />
                                                <h4 className="text-lg font-black uppercase text-purple-600">AI Analysis</h4>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-[10px] font-bold uppercase text-neutral-500 mb-1">Predicted Quality Tier</p>
                                                    <p className="font-black text-xl uppercase leading-tight">{task.tierLabel || "Unverified"}</p>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-xs font-bold uppercase">
                                                        <span>Confidence Score</span>
                                                        <span>{task.aiScore}%</span>
                                                    </div>
                                                    <div className="h-4 w-full border-2 border-black bg-white relative">
                                                        <div className={`absolute top-0 left-0 h-full border-r-2 border-black ${task.aiScore < 80 ? 'bg-orange-400' : 'bg-green-400'}`} style={{ width: `${task.aiScore}%` }} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase">
                                                    <ShieldCheck className="h-4 w-4" /> AI Check Passed
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="p-6 md:p-8 bg-black border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-6">
                                        <p className="text-xs font-mono font-bold text-neutral-400 uppercase hidden md:block">
                                            Action is recorded immutably on Story Protocol.
                                        </p>

                                        <div className="flex gap-4 w-full md:w-auto">
                                            <Button
                                                className="flex-1 md:w-48 h-12 bg-white text-red-600 border-2 border-white hover:bg-red-600 hover:text-white rounded-none font-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                                onClick={() => handleVote(task.id, 'REJECT')}
                                            >
                                                <XCircle className="mr-2 h-5 w-5" /> REJECT ASSET
                                            </Button>
                                            <Button
                                                className="flex-1 md:w-48 h-12 bg-green-500 text-black border-2 border-green-500 hover:bg-green-400 hover:border-green-400 rounded-none font-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                                onClick={() => handleVote(task.id, 'APPROVE')}
                                            >
                                                <CheckCircle2 className="mr-2 h-5 w-5" /> APPROVE LICENSE
                                            </Button>
                                        </div>
                                    </div>

                                </Card>
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="history">
                        <div className="py-20 text-center border-4 border-black border-dashed bg-neutral-50">
                            <p className="text-xl font-bold text-neutral-500 uppercase">History Module Coming Soon</p>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
}