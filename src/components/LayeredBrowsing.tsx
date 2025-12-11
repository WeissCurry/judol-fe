import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaperCard } from "./PaperCard";
import { Search, Filter, CheckCircle2, Bot, Database, ArrowRight, Loader2, RefreshCw } from "lucide-react";

export const LayeredBrowsing = () => {
  const [searchQuery, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const [paperData, setPaperData] = useState<{
    verified: any[];
    processing: any[];
    data_pool: any[];
  }>({ verified: [], processing: [], data_pool: [] });

  const [isLoading, setIsLoading] = useState(true);

  // --- FUNGSI FETCH DATA ---
  const fetchLivedata = useCallback(async () => {
      // Jangan set isLoading true di sini agar tidak flickering saat auto-refresh
      const localData = localStorage.getItem("myAssets");
      
      if (!localData) {
        setPaperData({ verified: [], processing: [], data_pool: [] });
        setIsLoading(false);
        return;
      }

      const parsedIds = JSON.parse(localData);
      
      // Urutkan dari yang terbaru (asumsi array local storage nambah di depan)
      // Kita ambil reversed atau pastikan saat save di MintWizardPage pakai [new, ...old]
      
      const newVerified: any[] = [];
      const newProcessing: any[] = [];
      const newDataPool: any[] = [];

      // Gunakan Promise.all untuk fetch metadata secara paralel
      const promises = parsedIds.map(async (item: any) => {
        let finalTitle = item.title;
        let finalAbstract = item.abstract;
        let finalAuthor = item.author?.name || "Unknown";
        
        // Prioritaskan data yang sudah tersimpan di local untuk kecepatan
        // Fetch IPFS hanya jika data local kurang lengkap (optional improvement)
        if (item.metadataUrl && (!item.abstract || item.abstract.length < 20)) {
            try {
                const res = await fetch(item.metadataUrl);
                if (res.ok) {
                    const meta = await res.json();
                    finalTitle = meta.name;
                    finalAbstract = meta.description;
                    const authorAttr = meta.attributes?.find((a: any) => a.trait_type === "Author");
                    if (authorAttr) finalAuthor = authorAttr.value;
                }
            } catch (err) {
                console.warn(`IPFS fetch failed for ${item.id}`, err);
            }
        }

        let scoreVal = 85; 
        if(item.aiScore) {
             scoreVal = typeof item.aiScore === 'string' ? parseInt(item.aiScore.replace('%','')) : item.aiScore;
        }

        let sintaRank = 0;
        if (item.tier && item.tier.includes("SINTA")) {
            const match = item.tier.match(/SINTA\s(\d+)/);
            if (match) sintaRank = parseInt(match[1]);
        }

        const paperObj = {
            id: item.id,
            title: finalTitle.toUpperCase(),
            abstract: finalAbstract || "Content encrypted pending verification...",
            authors: [{ name: finalAuthor, sintaLevel: sintaRank || 0 }],
            status: item.status, 
            submitDate: item.mintDate || "Recently",
            category: "Research",
            views: item.views || 0,
            downloads: item.downloads || 0,
            royaltyShare: item.status === 'verified' ? "5%" : "-",
            aiScore: scoreVal,
            licenseType: item.license || "Pending"
        };

        if (item.status === 'verified') newVerified.push(paperObj);
        else if (item.status === 'processing') newProcessing.push(paperObj);
        else newDataPool.push(paperObj);
      });

      await Promise.all(promises);

      setPaperData({
          verified: newVerified,
          processing: newProcessing,
          data_pool: newDataPool
      });
      setIsLoading(false);
  }, []);

  // --- EFFECT 1: Fetch saat Mount & Setup Polling ---
  useEffect(() => {
    fetchLivedata(); // Fetch pertama kali

    // Setup Interval (Polling setiap 2 detik) untuk cek perubahan data
    // Ini cara "kotor" tapi efektif buat hackathon agar data selalu fresh tanpa refresh page
    const interval = setInterval(() => {
        fetchLivedata();
    }, 2000); 

    return () => clearInterval(interval);
  }, [fetchLivedata]);

  const layerStats = {
    verified: paperData.verified.length,
    processing: paperData.processing.length,
    data_pool: paperData.data_pool.length
  };

  return (
    <section className="relative py-20 bg-white border-black min-h-[800px]">
      
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
             {/* Tombol Manual Refresh (Opsional, buat gaya aja karena udah auto) */}
             <div className="bg-green-400 text-black border-2 border-black p-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm flex items-center gap-2 cursor-pointer hover:bg-green-500 transition-colors" onClick={fetchLivedata}>
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"/> LIVE SYNC ACTIVE
             </div>
          </div>
        </div>

        {/* ... (Search & Filter Section Sama seperti sebelumnya) ... */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] h-14 bg-white border-2 border-black rounded-none font-bold text-black focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <SelectValue placeholder="CATEGORY" />
                </SelectTrigger>
                <SelectContent className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                  <SelectItem value="all" className="focus:bg-yellow-200 focus:text-black">All Categories</SelectItem>
                  <SelectItem value="blockchain" className="focus:bg-yellow-200 focus:text-black">Blockchain</SelectItem>
                  <SelectItem value="ai" className="focus:bg-yellow-200 focus:text-black">AI & Data</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="h-14 px-8 bg-white text-black border-2 border-black rounded-none font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all">
                <Filter className="w-5 h-5 mr-2" /> FILTER
              </Button>
            </div>
          </div>
        </div>

        {/* TABS CONTENT (Data Mapping sama, hanya state paperData yang kini auto-update) */}
        <Tabs defaultValue="verified" className="w-full">
          
          <TabsList className="w-full h-auto bg-transparent p-0 gap-4 flex flex-col md:flex-row justify-start mb-8">
            <TabsTrigger value="verified" className="group h-14 px-6 border-2 border-black rounded-none text-base font-bold flex-1 md:flex-none justify-start text-black bg-white data-[state=active]:bg-yellow-300 data-[state=active]:text-black data-[state=active]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:translate-y-[-4px] transition-all">
              <CheckCircle2 className="w-5 h-5 mr-2" /> VERIFIED IP
              <Badge variant="secondary" className="ml-auto md:ml-2 bg-black text-white rounded-none border border-transparent">{layerStats.verified}</Badge>
            </TabsTrigger>
            <TabsTrigger value="processing" className="group h-14 px-6 border-2 border-black rounded-none text-base font-bold flex-1 md:flex-none justify-start text-black bg-white data-[state=active]:bg-yellow-300 data-[state=active]:text-black data-[state=active]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:translate-y-[-4px] transition-all">
              <Bot className="w-5 h-5 mr-2" /> AI PROCESSING
              <Badge variant="secondary" className="ml-auto md:ml-2 bg-black text-white rounded-none border border-transparent">{layerStats.processing}</Badge>
            </TabsTrigger>
            <TabsTrigger value="data_pool" className="group h-14 px-6 border-2 border-black rounded-none text-base font-bold flex-1 md:flex-none justify-start text-black bg-white data-[state=active]:bg-yellow-300 data-[state=active]:text-black data-[state=active]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:translate-y-[-4px] transition-all">
              <Database className="w-5 h-5 mr-2" /> DATA POOL
              <Badge variant="secondary" className="ml-auto md:ml-2 bg-black text-white rounded-none border border-transparent">{layerStats.data_pool}</Badge>
            </TabsTrigger>
          </TabsList>

          <div className="min-h-[400px]">
            {/* Tampilkan Loading hanya saat awal sekali (data kosong & isLoading true) */}
            {isLoading && paperData.verified.length === 0 && paperData.processing.length === 0 && paperData.data_pool.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-64 border-4 border-black border-dashed bg-neutral-50">
                  <Loader2 className="h-12 w-12 animate-spin text-black mb-4" />
                  <p className="font-bold text-lg uppercase animate-pulse">Syncing with Story Protocol...</p>
               </div>
            ) : (
               <>
                <TabsContent value="verified" className="space-y-6 mt-0">
                  {paperData.verified.length > 0 ? (
                    <div className="grid gap-6">
                      {paperData.verified.slice(0, 3).map((paper, index) => (
                        <Link to={`/asset/${paper.id}`} key={index} className="block">
                            <PaperCard {...paper} />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center border-4 border-black border-dashed bg-neutral-50 font-bold text-neutral-500 uppercase">No Verified Assets Found</div>
                  )}
                </TabsContent>

                <TabsContent value="processing" className="space-y-6 mt-0">
                  {paperData.processing.length > 0 ? (
                    <div className="grid gap-6">
                      {paperData.processing.slice(0, 3).map((paper, index) => (
                        <Link to={`/asset/${paper.id}`} key={index} className="block">
                            <PaperCard {...paper} />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center border-4 border-black border-dashed bg-neutral-50 font-bold text-neutral-500 uppercase">No Pending Submissions</div>
                  )}
                </TabsContent>

                <TabsContent value="data_pool" className="space-y-6 mt-0">
                  {paperData.data_pool.length > 0 ? (
                    <div className="grid gap-6">
                      {paperData.data_pool.slice(0, 3).map((paper, index) => (
                        <Link to={`/asset/${paper.id}`} key={index} className="block">
                            <PaperCard {...paper} />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center border-4 border-black border-dashed bg-neutral-50 font-bold text-neutral-500 uppercase">Data Pool is Empty</div>
                  )}
                </TabsContent>
               </>
            )}
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