# 📘 JUDOL: Journal of Underlying Decentralized Open Ledgers

![JUDOL Banner](public/logo.png)

> **DeSci Platform turning Academic Papers into Liquid IP Assets on Story Protocol.**
> Built for the **Surreal World Assets Buildathon**.

![License](https://img.shields.io/badge/License-MIT-green)
![Story Protocol](https://img.shields.io/badge/Built%20on-Story%20Protocol-black)

## 🚀 Live Demo
**🌐 Visit the App: [https://judol.netlify.app](https://judol.netlify.app)**

---

## 🧐 The Problem
The academic publishing industry is broken:
1.  **Predatory Journals:** Researchers pay high APC (Article Processing Charges) but lose copyright ownership.
2.  **Zero Royalties:** Authors rarely earn from citations or downloads.
3.  **Wasted Data:** "Negative results" or failed experiments are discarded, wasting valuable training data for AI models.
4.  **Slow Review:** Peer review takes months, often blocked by bias.

## 💡 The Solution
**JUDOL** utilizes **Story Protocol** to create an on-chain reputation economy for researchers. We treat academic papers and datasets as **Programmable IP Assets**.

### Core Features:
* **📄 Mint Research as IP:** Researchers upload PDFs to IPFS (via Pinata) and mint them as IP Assets on Story Protocol.
* **🤖 AI Agent Pre-Screening:** Submissions are analyzed by AI for plagiarism, structure, and novelty (SINTA Score prediction) before human review.
* **⚖️ DAO Governance:** Verified experts (SINTA 1-2) vote to approve/reject papers.
* **💰 Royalty & Licensing:**
    * **Verified Papers:** Get a Commercial License (PIL). Authors earn royalties.
    * **Data Pool:** Rejected papers become "Data Assets" for training AI models (monetizing failure).
* **🎨 Neo-Brutalist UI:** A raw, honest, and bold design language emphasizing transparency.

---

## 🛠️ Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Blockchain** | **Story Protocol SDK** | IP Asset Registration, Licensing, Royalty Logic |
| **Framework** | **React + Vite** | Frontend Core |
| **Language** | **TypeScript** | Type Safety |
| **Styling** | **Tailwind CSS** | Neo-Brutalist Design System |
| **Components** | **Shadcn/UI** | Accessible UI Components |
| **Web3** | **Wagmi + RainbowKit** | Wallet Connection & Signing |
| **Storage** | **Pinata (IPFS)** | Decentralized PDF & Metadata Storage |
| **Deployment** | **Netlify** | CI/CD & Hosting |

---

## 📸 Screenshots

| **Home & Hero** | **Explore Graph** |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/6f75d73e-9c29-4446-9306-b7e050457a97" alt="Home & Hero" /> | <img src="https://github.com/user-attachments/assets/03347d55-1f96-495c-89e6-d36d6b2359bb" alt="Explore Graph" /> |

| **Reviewer Hub** | **Minting Wizard** |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/ea2d5287-a766-4f4b-9ebf-99f9f30bb50c" alt="Reviewer Hub" /> | <img src="https://github.com/user-attachments/assets/e7c3b181-01b3-4587-a62d-0e532e4818a5" alt="Minting Wizard" /> |

---

## 🏗️ Local Development

Follow these steps to run JUDOL on your local machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/weisscurry/judol-fe.git](https://github.com/weisscurry/judol-fe.git)
cd judol-fe
