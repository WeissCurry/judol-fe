import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaperCard } from "./PaperCard";
import { Search, Filter, CheckCircle2, Bot, Database, ArrowRight } from "lucide-react";

// --- STATIC FALLBACK DATA (Only used if no local data) ---
const STATIC_FALLBACK = {
  verified: [
    {
      title: "Optimizing ZK-Rollups for High Frequency Trading on Story Protocol",
      abstract: "This paper proposes a novel approach to latency reduction in ZK-Rollups. It has been verified by the Reviewer DAO and is now a mintable Commercial IP Asset.",
      authors: [{ name: "Dr. Sari Wijaya", sintaLevel: 1 }, { name: "Prof. Budi Santoso", sintaLevel: 2 }],
      status: "verified" as const,
      submitDate: "2024-11-15",
      category: "Blockchain Infrastructure",
      views: 2450,
      downloads: 892,
      royaltyShare: "5%",
      aiScore: 98,
      licenseType: "Commercial (PIL)"
    }
  ],
  processing: [],
  data_pool: []
};

export const LayeredBrowsing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // State for paper data
  const [paperData, setPaperData] = useState<{
    verified: any[];
    processing: any[];
    data_pool: any[];
  }>(STATIC_FALLBACK);

  // --- FETCH REAL DATA FROM LOCAL STORAGE ---
  useEffect(() => {
    const localData = localStorage.getItem("myAssets");
    if (localData) {
      const parsedData = JSON.parse(localData);
      
      const newVerified: any[] = [];
      const newProcessing: any[] = [];
      const newDataPool: any[] = [];

      parsedData.forEach((item: any) => {
        // Parse AI Score
        let scoreVal = 85; 
        if(item.aiScore) {
             scoreVal = typeof item.aiScore === 'string' ? parseInt(item.aiScore.replace('%','')) : item.aiScore;
        }

        // Parse Sinta
        let sintaRank = 0;
        if (item.tier && item.tier.includes("SINTA")) {
            const match = item.tier.match(/SINTA\s(\d+)/);
            if (match) sintaRank = parseInt(match[1]);
        }

        // Construct Paper Object
        const paperObj = {
            title: item.title?.toUpperCase() || "Untitled Work",
            abstract: item.abstract || "Abstract content pending verification...",
            authors: [{ name: item.author?.name || "Unknown Author", sintaLevel: sintaRank || 0 }],
            status: item.status, // 'verified', 'processing', or 'data_pool'
            submitDate: item.mintDate || "Just now",
            category: "Uncategorized", // Default category
            views: item.views || 0,
            downloads: item.downloads || 0,
            royaltyShare: item.status === 'verified' ? "5%" : "-",
            aiScore: scoreVal,
            licenseType: item.license || "Pending"
        };

        // Distribute to correct bucket
        if (item.status === 'verified') newVerified.push(paperObj);
        else if (item.status === 'processing') newProcessing.push(paperObj);
        else newDataPool.push(paperObj); // Default to data pool if unknown/rejected
      });

      // Update state if we found local data
      if (newVerified.length > 0 || newProcessing.length > 0 || newDataPool.length > 0) {
          setPaperData({
              verified: newVerified.length > 0 ? newVerified : STATIC_FALLBACK.verified,
              processing: newProcessing,
              data_pool: newDataPool
          });
      }
    }
  }, []);

  const layerStats = {
    verified: paperData.verified.length,
    processing: paperData.processing.length,
    data_pool: paperData.data_pool.length
  };

  return (
    <section className="relative py-20 bg-white border-black">
      
      {/* BUG FIX: Added 'pointer-events-none' so clicks pass through to buttons */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="container relative z-10 px-4 mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b-2 border-black pb-8">
          <div>
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">
              Knowledge Graph
            </h2>
            <p className="text-lg font-medium text-neutral-700 max-w-2xl">
              Discover Verified IP, track works in progress, or access raw data from the Data Pool to train your models.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="bg-yellow-300 border-2 border-black p-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm">
                LIVE DATABASE
             </div>
          </div>
        </div>

        <div className="bg-neutral-100 p-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black pointer-events-none">
                 <Search className="h-5 w-5" />
              </div>
              <Input 
                placeholder="SEARCH IP ASSETS..." 
                className="pl-12 h-14 bg-white border-2 border-black rounded-none text-lg placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-medium text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] h-14 bg-white border-2 border-black rounded-none font-bold text-black focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <SelectValue placeholder="CATEGORY" />
                </SelectTrigger>
                <SelectContent className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                  <SelectItem value="all" className="focus:bg-yellow-200 focus:text-black font-medium text-black">All Categories</SelectItem>
                  <SelectItem value="blockchain" className="focus:bg-yellow-200 focus:text-black font-medium text-black">Blockchain</SelectItem>
                  <SelectItem value="ai" className="focus:bg-yellow-200 focus:text-black font-medium text-black">AI & Data</SelectItem>
                  <SelectItem value="legal" className="focus:bg-yellow-200 focus:text-black font-medium text-black">Legal Tech</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="h-14 px-8 bg-white text-black border-2 border-black rounded-none font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Filter className="w-5 h-5 mr-2" /> FILTER
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="verified" className="w-full">
          
          <TabsList className="w-full h-auto bg-transparent p-0 gap-4 flex flex-col md:flex-row justify-start mb-8">
            
            <TabsTrigger 
              value="verified" 
              className={`
                group h-14 px-6 border-2 border-black rounded-none text-base font-bold flex-1 md:flex-none justify-start
                text-black bg-white
                data-[state=active]:bg-yellow-300 data-[state=active]:text-black 
                data-[state=active]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                data-[state=active]:translate-y-[-4px] 
                transition-all
              `}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              VERIFIED IP
              <Badge variant="secondary" className="ml-auto md:ml-2 bg-black text-white rounded-none border border-transparent">
                {layerStats.verified}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="processing" 
              className="
                group h-14 px-6 border-2 border-black rounded-none text-base font-bold flex-1 md:flex-none justify-start
                text-black bg-white
                data-[state=active]:bg-yellow-300 data-[state=active]:text-black 
                data-[state=active]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                data-[state=active]:translate-y-[-4px] 
                transition-all
              "
            >
              <Bot className="w-5 h-5 mr-2" />
              AI PROCESSING
              <Badge variant="secondary" className="ml-auto md:ml-2 bg-black text-white rounded-none border border-transparent">
                {layerStats.processing}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="data_pool" 
              className="
                group h-14 px-6 border-2 border-black rounded-none text-base font-bold flex-1 md:flex-none justify-start
                text-black bg-white
                data-[state=active]:bg-yellow-300 data-[state=active]:text-black 
                data-[state=active]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                data-[state=active]:translate-y-[-4px] 
                transition-all
              "
            >
              <Database className="w-5 h-5 mr-2" />
              DATA POOL
              <Badge variant="secondary" className="ml-auto md:ml-2 bg-black text-white rounded-none border border-transparent">
                {layerStats.data_pool}
              </Badge>
            </TabsTrigger>

          </TabsList>

          <div className="min-h-[400px]">
            <TabsContent value="verified" className="space-y-6 mt-0">
              <div className="grid gap-6">
                {paperData.verified.slice(0, 3).map((paper, index) => (
                  <PaperCard key={index} {...paper} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="processing" className="space-y-6 mt-0">
              <div className="grid gap-6">
                {paperData.processing.slice(0, 3).map((paper, index) => (
                  <PaperCard key={index} {...paper} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="data_pool" className="space-y-6 mt-0">
              <div className="grid gap-6">
                {paperData.data_pool.slice(0, 3).map((paper, index) => (
                  <PaperCard key={index} {...paper} />
                ))}
              </div>
            </TabsContent>
          </div>
          
        </Tabs>
        
        <div className="mt-12 text-center">
            <Button onClick={() => window.location.href = '/explore'} variant="link" className="text-black font-bold underline decoration-2 underline-offset-4 hover:bg-yellow-300">
                VIEW ALL ASSETS <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
        </div>

      </div>
    </section>
  );
};