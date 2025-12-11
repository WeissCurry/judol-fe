const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;

// 1. FUNGSI UPLOAD FILE (PDF) - Sudah ada sebelumnya
export const uploadFileToIPFS = async (file: File) => {
    if (!PINATA_JWT) {
        throw new Error("Pinata JWT not found in env variables");
    }

    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
        name: file.name,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
        cidVersion: 1,
    });
    formData.append("pinataOptions", options);

    try {
        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${PINATA_JWT}`,
            },
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`Pinata Upload Error: ${res.statusText}`);
        }

        const data = await res.json();
        return data.IpfsHash;

    } catch (error) {
        console.error("Error uploading file to Pinata:", error);
        throw error;
    }
};

// 2. FUNGSI BARU: UPLOAD JSON (METADATA)
// Ini yang akan dipanggil untuk menyimpan Abstrak & Author
export const uploadJSONToIPFS = async (jsonBody: any) => {
    if (!PINATA_JWT) {
        throw new Error("Pinata JWT not found in env variables");
    }

    try {
        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Wajib ada untuk JSON
                Authorization: `Bearer ${PINATA_JWT}`,
            },
            body: JSON.stringify({
                pinataContent: jsonBody, // Isi JSON (Title, Abstract, PDF Link)
                pinataMetadata: {
                    name: `JUDOL-Metadata-${Date.now()}.json`, // Nama file unik di Pinata
                },
            }),
        });

        if (!res.ok) {
            throw new Error(`Pinata JSON Upload Error: ${res.statusText}`);
        }

        const data = await res.json();
        return data.IpfsHash; // Mengembalikan Hash Metadata

    } catch (error) {
        console.error("Error uploading JSON to Pinata:", error);
        throw error;
    }
};