// src/database/MockData.ts

export interface Paper {
  id: string;
  title: string;
  author: string;
  authorOrg: string;
  abstract: string;
  type: "Research" | "Dataset";
  license: string;
  sinta: number | null;
  aiScore: number;
  tierLabel: string;
  mintDate: string;
  views: number;
  downloads: number;
  price: string;
  status: "verified" | "processing" | "data_pool";
  royaltyShare?: string;
  category?: string;
  metadataUrl?: string;
  timestamp?: number; // [TAMBAHAN PENTING] Agar bisa dihitung time-ago nya
}

// 1. STATIC DATABASE (Seeded Data)
const SEEDED_DATA: Paper[] = [
  {
    id: "1",
    title: "Optimizing ZK-Rollups for High Frequency Trading on Story Protocol",
    author: "Dr. Sari Wijaya",
    authorOrg: "University of Wkwkland",
    abstract: "This paper introduces a novel optimization strategy for reducing latency and improving proof-generation efficiency within ZK-Rollups deployed on the Story Protocol. While ZK-Rollups offer strong security guarantees, their current verification throughput poses challenges for high-frequency trading (HFT) environments that demand sub-second finality. We propose a hybrid batching mechanism combined with circuit-level parallelization to accelerate proof creation, alongside a new scheduling algorithm optimized for HFT-style micro-transactions. The approach is empirically evaluated in a simulated Reviewer DAO environment, demonstrating a 40% reduction in end-to-end latency while maintaining cryptographic integrity. These findings highlight the feasibility of using decentralized ZK infrastructure to support real-time financial applications without compromising on decentralization.",
    type: "Research",
    license: "Commercial (PIL)",
    sinta: 1,
    aiScore: 98,
    tierLabel: "SINTA 1 (High Novelty)",
    mintDate: "2024-11-15",
    views: 2450,
    downloads: 892,
    price: "50 IP",
    status: "verified",
    category: "Blockchain",
    metadataUrl: "https://gateway.pinata.cloud/ipfs/bafkreianxbcza2aey7wl5anugf65q6vogq2tscptth5y5poxyylhn6tjfe"
  },
  {
    id: "2",
    title: "Legal Frameworks for AI-Generated IP Ownership in Indonesia",
    author: "Dr. Ahmad Rahman",
    authorOrg: "Konoha Law School",
    abstract: "This study critically examines the current ambiguity within Indonesian Copyright Law (UU Hak Cipta) regarding non-human authorship. With the exponential rise of Generative AI, traditional definitions of 'creators' are being challenged. This paper analyzes three key legal precedents in Southeast Asia and proposes a tiered licensing framework specifically for AI-generated assets. We argue for a distinction between 'AI-assisted' and 'AI-autonomous' works, suggesting that economic rights should be assigned to the prompter while moral rights remain unassigned. The research provides a crucial roadmap for legislators and IP protocols aiming to tokenize AI artifacts within the Indonesian jurisdiction.",
    type: "Research",
    license: "Commercial (PIL)",
    sinta: 1,
    aiScore: 92,
    tierLabel: "SINTA 1",
    mintDate: "2024-11-20",
    views: 1890,
    downloads: 654,
    price: "45 IP",
    status: "verified",
    category: "Legal Tech",
    metadataUrl: "https://gateway.pinata.cloud/ipfs/bafkreianxbcza2aey7wl5anugf65q6vogq2tscptth5y5poxyylhn6tjfe"
  },
  {
    id: "3",
    title: "Dataset: 50,000 Hours of Bahasa Indonesia Voice Samples",
    author: "VoiceLab Indo",
    authorOrg: "Durian Runtuh University",
    abstract: "We present a comprehensive, high-quality audio dataset comprising 50,000 hours of spoken Bahasa Indonesia, curated specifically for training Large Language Models (LLMs) and Text-to-Speech (TTS) engines. The dataset covers a wide spectrum of dialects (Javanese, Sundanese, and Minang accents), age groups, and emotional tones. All data has been cleaned using advanced noise-cancellation algorithms and is labeled with precise timestamps and phoneme-level transcriptions. This resource aims to bridge the gap in low-resource language processing and serves as a foundational layer for developing hyper-localized conversational AI agents in the Nusantara region.",
    type: "Dataset",
    license: "Data Only",
    sinta: null,
    aiScore: 88,
    tierLabel: "Verified Dataset",
    mintDate: "2024-12-01",
    views: 5200,
    downloads: 1200,
    price: "100 IP",
    status: "verified",
    category: "AI & Data",
    metadataUrl: "https://gateway.pinata.cloud/ipfs/bafkreianxbcza2aey7wl5anugf65q6vogq2tscptth5y5poxyylhn6tjfe"
  },
  {
    id: "4",
    title: "Smart Contract Vulnerabilities in DAO Treasuries",
    author: "Dr. Made Suarta",
    authorOrg: "Gotham Institute of Tech",
    abstract: "This systematic review analyzes major security breaches in DAO treasury contracts throughout 2024, focusing specifically on sophisticated reentrancy attacks and flash loan manipulations. By auditing over 200 compromised smart contracts, we identify a recurring pattern of neglected external call safeguards in governance modules. The paper categorizes vulnerabilities based on the SWC Registry and proposes a new standard for 'Optimistic Governance Guards'—a delay mechanism that allows white-hat intervention during suspicious treasury drain attempts. Currently under review by the Expert Node, this research offers critical patches for existing DAO frameworks.",
    type: "Research",
    license: "Pending",
    sinta: 3,
    aiScore: 78,
    tierLabel: "Candidate SINTA 3",
    mintDate: "2024-11-29",
    views: 890,
    downloads: 234,
    price: "-",
    status: "processing",
    category: "Cybersecurity",
    metadataUrl: "https://gateway.pinata.cloud/ipfs/bafkreianxbcza2aey7wl5anugf65q6vogq2tscptth5y5poxyylhn6tjfe"
  },
  {
    id: "5",
    title: "Failed Replication of Cold Fusion Experiment 2024",
    author: "Budi Santoso",
    authorOrg: "Wakanda Physics Center",
    abstract: "This paper documents the detailed methodology and negative results of our attempt to replicate the controversial 'Room Temperature Fusion' claims made earlier this year. Using a modified palladium-deuterium electrolytic cell setup with enhanced neutron detection sensors, we observed no statistically significant excess heat or neutron emissions over a 30-day continuous run. While the results are negative, publishing this data is vital for the scientific community to avoid redundancy and conserve resources. We provide full open access to our sensor logs and experimental configuration to support further peer verification and theoretical adjustments.",
    type: "Research",
    license: "Data Only",
    sinta: 4,
    aiScore: 45,
    tierLabel: "Unranked (Data Pool)",
    mintDate: "2024-10-10",
    views: 300,
    downloads: 10,
    price: "Free",
    status: "data_pool",
    category: "Physics",
    metadataUrl: "https://gateway.pinata.cloud/ipfs/bafkreianxbcza2aey7wl5anugf65q6vogq2tscptth5y5poxyylhn6tjfe"
  },
];

// 2. HELPER TO PARSE LOCAL STORAGE ITEM
const parseLocalItem = (item: any): Paper => {
    // A. Parsing AI Score (Handle string "85%" or number 85)
    let scoreVal = 0;
    if (item.aiScore !== undefined && item.aiScore !== null) {
        if (typeof item.aiScore === 'string') {
            scoreVal = parseInt(item.aiScore.replace(/\D/g, '')) || 0;
        } else {
            scoreVal = item.aiScore;
        }
    } else if (item.attributes) {
        // Fallback: Check inside IPFS attributes
        const scoreAttr = item.attributes.find((a: any) => a.trait_type === "AICertainty");
        if (scoreAttr) {
            scoreVal = parseInt(scoreAttr.value.replace(/\D/g, '')) || 0;
        }
    }

    // B. Parsing Sinta Rank
    let sintaRank = null;
    let tierLabel = item.tier || "Unverified";

    if (tierLabel && typeof tierLabel === 'string' && tierLabel.toUpperCase().includes("SINTA")) {
        const match = tierLabel.match(/SINTA\s*(\d+)/i);
        if (match) {
            sintaRank = parseInt(match[1]);
        }
    } else if (item.attributes) {
         const sintaAttr = item.attributes.find((a: any) => a.trait_type === "SintaPrediction");
         if (sintaAttr && sintaAttr.value.toUpperCase().includes("SINTA")) {
             const match = sintaAttr.value.match(/SINTA\s*(\d+)/i);
             if (match) {
                 sintaRank = parseInt(match[1]);
                 tierLabel = sintaAttr.value;
             }
         }
    }

    // C. Parsing Type & Category
    const rawType = item.type || "Research";
    const type = rawType.includes("Data") ? "Dataset" : "Research";
    const category = item.keywords ? item.keywords.split(',')[0] : "General Research"; // Ambil keyword pertama jadi kategori

    return {
        id: item.id,
        title: item.title,
        author: item.author?.name || (typeof item.author === 'string' ? item.author : "Unknown Author"),
        authorOrg: item.author?.org || (item.affiliation) || "UIN Syarif Hidayatullah",
        abstract: item.abstract || (item.description) || "Abstract content pending verification...",
        type: type,
        license: item.license || "Pending",
        sinta: sintaRank,
        aiScore: scoreVal,
        tierLabel: tierLabel,
        mintDate: item.mintDate || "Just now",
        timestamp: item.timestamp || Date.now(), // [PENTING] Pass timestamp
        views: item.views || 0,
        downloads: item.downloads || 0,
        price: item.status === 'verified' ? "50 IP" : "-",
        status: item.status,
        metadataUrl: item.metadataUrl,
        category: category // Pass kategori hasil parsing
    };
};

// 3. MAIN EXPORTED FUNCTION: GET ALL DATA (Merged)
export const getAllPapers = (): Paper[] => {
    const localData = localStorage.getItem("myAssets");
    let localPapers: Paper[] = [];

    if (localData) {
        try {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed)) {
                localPapers = parsed.map(parseLocalItem);
            }
        } catch (e) {
            console.error("Failed to parse myAssets from localStorage", e);
        }
    }

    // Combine: User's fresh mints come first, then seeded database
    return [...localPapers, ...SEEDED_DATA];
};

// 4. GET BY STATUS (For LayeredBrowsing & VerifyPage)
export const getPapersByStatus = (status: "verified" | "processing" | "data_pool"): Paper[] => {
    const all = getAllPapers();
    return all.filter(p => p.status === status);
};

// 5. GET BY ID (For Detail Page)
export const getPaperById = (id: string): Paper | undefined => {
    const all = getAllPapers();
    return all.find(p => p.id === id);
};