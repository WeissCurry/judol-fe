import { useState } from "react";
import { Vote, Users, Coins, Clock, CheckCircle2, XCircle, Search, Plus, ArrowRight, UserCheck, Copy, ShieldCheck, FileText, Send, Megaphone, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// --- TIPE DATA --- 
interface Proposal {
    id: number;
    title: string;
    description: string;
    type: "journal" | "reviewer" | "treasury" | "policy";
    status: "active" | "passed" | "rejected";
    votesFor: number;
    votesAgainst: number;
    totalVotes: number;
    timeLeft: string;
    requiredVotes: number;
    proposer: string;
}

// --- MOCK DATA --- 
const mockProposals: Proposal[] = [
    { id: 1, title: "Create New Journal: Blockchain in Education", description: "Proposal to establish a dedicated journal for blockchain applications in educational technology.", type: "journal", status: "active", votesFor: 1247, votesAgainst: 328, totalVotes: 1575, timeLeft: "5 DAYS", requiredVotes: 2000, proposer: "0xUnjv...92A" },
    { id: 2, title: "Reviewer Admission: Dr. Sarah Chen", description: "Nomination of Dr. Sarah Chen (SINTA 1, Stanford University) as senior reviewer for AI/ML papers.", type: "reviewer", status: "active", votesFor: 892, votesAgainst: 156, totalVotes: 1048, timeLeft: "2 DAYS", requiredVotes: 1500, proposer: "ReviewerDAO" },
    { id: 3, title: "Treasury Allocation: Early Researcher Grants", description: "Allocate 140 IP for grants supporting SINTA 4-5 researchers.", type: "treasury", status: "passed", votesFor: 2341, votesAgainst: 289, totalVotes: 2630, timeLeft: "ENDED", requiredVotes: 2000, proposer: "TreasuryMultisig" }
];

// --- KONFIGURASI VISUAL NEO-BRUTALIST --- 
const typeConfig = {
    journal: { label: "JOURNAL", color: "bg-blue-300 text-black border-black" },
    reviewer: { label: "REVIEWER", color: "bg-purple-300 text-black border-black" },
    treasury: { label: "TREASURY", color: "bg-yellow-300 text-black border-black" },
    policy: { label: "POLICY", color: "bg-slate-300 text-black border-black" }
};

const statusConfig = {
    active: { label: "ACTIVE", icon: Clock, color: "bg-green-300 text-black border-black" },
    passed: { label: "PASSED", icon: CheckCircle2, color: "bg-blue-300 text-black border-black" },
    rejected: { label: "REJECTED", icon: XCircle, color: "bg-red-300 text-black border-black" }
};

export default function GovernancePage() {
    const [activeTab, setActiveTab] = useState("active");
    const [searchQuery, setSearchQuery] = useState("");
    const [delegateAddress, setDelegateAddress] = useState("");
    const [proposalOpen, setProposalOpen] = useState(false);
    const [newProp, setNewProp] = useState({ title: "", type: "", desc: "" });

    const handleSubmitProposal = () => {
        if (!newProp.title || !newProp.type) {
            toast.error("Please fill in required fields");
            return;
        }
        setProposalOpen(false);
        toast.success("Proposal Submitted On-Chain", { description: "JIP-045 has been created successfully. Pending voting period start.", });
        setNewProp({ title: "", type: "", desc: "" });
    };

    const handleDelegate = () => {
        toast.success("Delegation Successful", { description: `You have delegated 450 VP to ${delegateAddress || "Prof. Expert"}`, });
    };

    const filteredProposals = mockProposals.filter(p => {
        const matchesTab = activeTab === "all" ? true : p.status === activeTab;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white pb-20 font-sans  selection:bg-yellow-300 selection:text-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />


            {/* 1. HERO SECTION */}
            <section className="pt-16 pb-12 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-block bg-black text-white px-3 py-1 text-sm font-bold font-mono mb-4 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(128,128,128,0.5)]">
                        ACADEMIC DAO
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
                        Governance <br /> Dashboard
                    </h1>
                    <p className="text-xl font-medium text-neutral-800 max-w-2xl mx-auto border-l-4 border-black pl-4 text-left md:text-center md:border-none md:pl-0">
                        Participate in shaping the future of academic publishing. <br className="hidden md:inline" /> Your <span className="font-bold bg-yellow-300 px-1">SINTA Level</span> determines your voting weight.
                    </p>
                </div>
            </section>

            {/* 2. STATS OVERVIEW */}
            <section className="container mx-auto px-4 mb-16 relative z-10">
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { label: "Active Voters", value: "2,847", icon: Users, bg: "bg-blue-100 group-hover:bg-blue-300" },
                        { label: "Active Proposals", value: "23", icon: Vote, bg: "bg-purple-100 group-hover:bg-purple-300" },
                        { label: "Treasury (IP)", value: "125K", icon: Coins, bg: "bg-yellow-100 group-hover:bg-yellow-300" },
                        { label: "Participation", value: "89%", icon: CheckCircle2, bg: "bg-green-100 group-hover:bg-green-300" }
                    ].map((stat, i) => (
                        <div key={i} className={`p-6 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white group hover:-translate-y-1 transition-all duration-200`}>
                            <div className={`w-12 h-12 flex items-center justify-center border-2 border-black mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors ${stat.bg}`}>
                                <stat.icon className="h-6 w-6 text-black" />
                            </div>
                            <div className="text-4xl font-black font-mono tracking-tighter mb-1">{stat.value}</div>
                            <div className="text-sm font-bold uppercase tracking-widest text-neutral-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. MAIN CONTENT LAYOUT */}
            <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">

                {/* LEFT COL: PROPOSAL LIST */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Controls */}
                    <div className="flex flex-col gap-6">

                        {/* Tabs & Search */}
                        <div className="bg-neutral-100 p-4 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-4 justify-between items-center">
                            <Tabs defaultValue="active" className="w-full md:w-auto" onValueChange={setActiveTab}>
                                <TabsList className="bg-transparent gap-2 p-0 h-auto flex-wrap justify-start">
                                    {["active", "passed", "rejected", "all"].map((tab) => (
                                        <TabsTrigger
                                            key={tab}
                                            value={tab}
                                            className="
                                h-10 px-4 border-2 border-transparent rounded-none font-bold uppercase 
                                data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black data-[state=active]:shadow-[3px_3px_0px_0px_rgba(128,128,128,0.5)]
                                hover:border-black hover:bg-white transition-all
                            "
                                        >
                                            {tab}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>

                            <div className="relative w-full md:w-[250px] group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
                                <Input
                                    type="search"
                                    placeholder="SEARCH PROPOSALS..."
                                    className="pl-10 h-10 bg-white border-2 border-black rounded-none font-bold placeholder:text-neutral-500 focus-visible:ring-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-black uppercase"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* DIALOG CREATE PROPOSAL */}
                        <Dialog open={proposalOpen} onOpenChange={setProposalOpen}>
                            <DialogContent className="sm:max-w-[500px] border-2 border-black rounded-none bg-white p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <DialogHeader className="p-6 border-b-2 border-black bg-yellow-300">
                                    <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                                        <Megaphone className="h-6 w-6" /> New Proposal
                                    </DialogTitle>
                                    <DialogDescription className="text-black font-bold opacity-80">
                                        Submit a proposal for community voting. Requires 1,000 Voting Power.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-6 p-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title" className="font-bold uppercase">Proposal Title</Label>
                                        <Input id="title" className="border-2 border-black rounded-none h-12 font-bold focus-visible:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]" placeholder="E.G. GRANT FOR BLOCKCHAIN RESEARCH..." value={newProp.title} onChange={(e) => setNewProp({ ...newProp, title: e.target.value })} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="category" className="font-bold uppercase">Category</Label>
                                        <Select onValueChange={(val) => setNewProp({ ...newProp, type: val })}>
                                            <SelectTrigger className="border-2 border-black rounded-none h-12 font-bold focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                                                <SelectValue placeholder="SELECT CATEGORY" />
                                            </SelectTrigger>
                                            <SelectContent className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                <SelectItem value="journal" className="font-bold focus:bg-yellow-200 focus:text-black">NEW JOURNAL</SelectItem>
                                                <SelectItem value="reviewer" className="font-bold focus:bg-yellow-200 focus:text-black">REVIEWER NOMINATION</SelectItem>
                                                <SelectItem value="treasury" className="font-bold focus:bg-yellow-200 focus:text-black">TREASURY/GRANT</SelectItem>
                                                <SelectItem value="policy" className="font-bold focus:bg-yellow-200 focus:text-black">PROTOCOL POLICY</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="desc" className="font-bold uppercase">Description</Label>
                                        <Textarea id="desc" placeholder="Explain your proposal clearly..." className="min-h-[100px] border-2 border-black rounded-none font-medium focus-visible:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]" value={newProp.desc} onChange={(e) => setNewProp({ ...newProp, desc: e.target.value })} />
                                    </div>
                                </div>

                                <DialogFooter className="p-6 pt-0">
                                    <Button type="submit" onClick={handleSubmitProposal} className="w-full h-12 bg-black text-white border-2 border-black rounded-none font-black shadow-[4px_4px_0px_0px_rgba(128,128,128,0.5)] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                        <Send className="mr-2 h-4 w-4" /> SUBMIT ON-CHAIN
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>

                    {/* Proposal Cards */}
                    {filteredProposals.map((proposal) => {
                        const StatusIcon = statusConfig[proposal.status].icon;
                        const votePercentage = (proposal.votesFor / proposal.totalVotes) * 100;
                        const participationPercentage = (proposal.totalVotes / proposal.requiredVotes) * 100;

                        return (
                            <Card key={proposal.id} className="group relative border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden hover:-translate-y-1 transition-transform duration-200">

                                <div className="p-6 md:p-8 space-y-6">

                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex flex-wrap gap-2 items-center">
                                                <Badge variant="outline" className={`${typeConfig[proposal.type].color} rounded-none border-2 px-2 py-0.5 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                                    {typeConfig[proposal.type].label}
                                                </Badge>
                                                <Badge variant="outline" className={`${statusConfig[proposal.status].color} rounded-none border-2 px-2 py-0.5 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                                    <StatusIcon className="w-3 h-3 mr-1" /> {statusConfig[proposal.status].label}
                                                </Badge>
                                                <span className="text-xs font-mono font-bold border border-black px-1 py-0.5 bg-neutral-100">
                                                    #{proposal.id.toString().padStart(3, '0')}
                                                </span>
                                            </div>
                                            <h4 className="text-2xl font-black uppercase leading-tight group-hover:underline decoration-4 underline-offset-4 cursor-pointer">{proposal.title}</h4>
                                            <p className="text-base font-medium text-neutral-600 leading-relaxed border-l-4 border-neutral-300 pl-3">
                                                {proposal.description}
                                            </p>
                                        </div>

                                        {proposal.status === 'active' && (
                                            <div className="flex-shrink-0 text-center border-2 border-black bg-white p-2 min-w-[100px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                <div className="text-[10px] font-bold uppercase border-b border-black pb-1 mb-1">Time Left</div>
                                                <div className="text-xl font-black font-mono text-red-600">{proposal.timeLeft}</div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Progress Bars (Custom Brutalist) */}
                                    <div className="grid sm:grid-cols-2 gap-8 border-t-2 border-black pt-6 border-dashed">

                                        {/* Support Bar */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-black uppercase">
                                                <span className="text-neutral-500">Current Support</span>
                                                <span>{votePercentage.toFixed(1)}%</span>
                                            </div>
                                            <div className="h-4 w-full border-2 border-black bg-white relative">
                                                <div className="absolute top-0 left-0 h-full bg-green-500 border-r-2 border-black" style={{ width: `${votePercentage}%` }} />
                                            </div>
                                        </div>

                                        {/* Quorum Bar */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-black uppercase">
                                                <span className="text-neutral-500">Quorum Progress</span>
                                                <span>{participationPercentage.toFixed(1)}%</span>
                                            </div>
                                            <div className="h-4 w-full border-2 border-black bg-white relative">
                                                <div className="absolute top-0 left-0 h-full bg-blue-500 border-r-2 border-black" style={{ width: `${participationPercentage}%` }} />
                                                {/* Marker */}
                                                <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 left-[75%] z-10"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Footer Action */}
                                {proposal.status === 'active' && (
                                    <div className="bg-neutral-50 border-t-2 border-black p-4 flex justify-end">
                                        <Button className="h-10 bg-black text-white border-2 border-black rounded-none font-bold shadow-[4px_4px_0px_0px_rgba(128,128,128,0.5)] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                            CAST VOTE <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>

                {/* RIGHT COL: SIDEBAR */}
                <div className="space-y-8">

                    {/* Action Card */}
                    <Card className="border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-300 p-0 overflow-hidden">
                        <div className="p-6 border-b-2 border-black bg-white">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-black uppercase text-lg">My Voting Power</h3>
                                <Vote className="h-6 w-6 text-black" />
                            </div>
                            <div className="text-5xl font-black text-black font-mono mb-2">450 <span className="text-lg font-bold">VP</span></div>
                            <div className="text-xs font-bold text-neutral-600 uppercase border border-black p-2 bg-neutral-100 inline-block">
                                SINTA 2 + 150 IP TOKENS
                            </div>
                        </div>

                        <div className="p-6 bg-yellow-300">
                            <Button className="w-full h-12 bg-black text-white border-2 border-black rounded-none font-black shadow-[4px_4px_0px_0px_rgba(128,128,128,0.5)] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mb-3" onClick={() => setProposalOpen(true)}>
                                <Plus className="w-5 h-5 mr-2" /> CREATE PROPOSAL
                            </Button>
                            <p className="text-[10px] text-center font-bold uppercase tracking-widest">
                                REQUIRES 1,000 VP MINIMUM
                            </p>
                        </div>
                    </Card>

                    {/* Delegation Card */}
                    <Card className="border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-6">
                        <h3 className="font-black uppercase mb-6 flex items-center gap-2 text-lg border-b-2 border-black pb-2">
                            <UserCheck className="h-5 w-5" /> Top Delegates
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between group p-2 border-2 border-transparent hover:border-black hover:bg-neutral-50 transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border-2 border-black rounded-none bg-blue-100">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}`} />
                                            <AvatarFallback className="font-bold text-black rounded-none">D{i}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-sm font-bold uppercase group-hover:underline decoration-2">Prof. Expert {i}</div>
                                            <div className="text-xs font-mono font-medium text-neutral-500">SINTA 1 • 45k VP</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-black hover:text-white rounded-none border border-black" onClick={() => setDelegateAddress(`0xProfExpert${i}`)}>
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Separator className="my-6 bg-black h-0.5" />

                        {/* DIALOG DELEGASI */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full h-12 bg-white text-black border-2 border-black rounded-none font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                                    MANAGE DELEGATION
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] border-2 border-black rounded-none p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                                <DialogHeader className="p-6 border-b-2 border-black bg-blue-300">
                                    <DialogTitle className="text-2xl font-black uppercase">Delegate Voting Power</DialogTitle>
                                    <DialogDescription className="text-black font-bold opacity-80">
                                        Select a trusted expert to vote on your behalf.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-6 p-6">
                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase">Delegate Address</Label>
                                        <div className="flex gap-0">
                                            <Input placeholder="0x..." className="border-2 border-black border-r-0 rounded-none h-12 font-mono font-bold focus-visible:ring-0" value={delegateAddress} onChange={(e) => setDelegateAddress(e.target.value)} />
                                            <Button variant="ghost" size="icon" className="h-12 w-12 border-2 border-black rounded-none bg-neutral-100 hover:bg-black hover:text-white">
                                                <Copy className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="bg-yellow-100 border-2 border-black p-4 text-xs font-bold flex gap-3 items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                                        <ShieldCheck className="h-5 w-5 shrink-0" />
                                        <div>DELEGATION DOES NOT TRANSFER TOKEN OWNERSHIP. YOU RETAIN FULL CUSTODY.</div>
                                    </div>
                                </div>

                                <DialogFooter className="p-6 pt-0">
                                    <Button type="submit" onClick={handleDelegate} className="w-full h-12 bg-black text-white border-2 border-black rounded-none font-black shadow-[4px_4px_0px_0px_rgba(128,128,128,0.5)] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                        CONFIRM DELEGATION
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </Card>
                </div>
            </div>
        </div>
    );
}