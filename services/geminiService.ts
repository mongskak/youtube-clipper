
import { GoogleGenAI, Type } from "@google/genai";
import { Topic } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            topicTitle: {
                type: Type.STRING,
                description: "Judul klip, menarik, dan ramah SEO.",
            },
            hook: {
                type: Type.STRING,
                description: "Kalimat pembuka yang kuat (3 detik pertama) untuk langsung menarik perhatian penonton.",
            },
            caption: {
                type: Type.STRING,
                description: "Keterangan siap pakai untuk platform seperti TikTok, Instagram Reels, atau YouTube Shorts. Sertakan tagar yang relevan.",
            },
            startTime: {
                type: Type.INTEGER,
                description: "Waktu mulai klip di video asli, dalam total detik. Harus berupa bilangan bulat yang realistis.",
            },
            endTime: {
                type: Type.INTEGER,
                description: "Waktu akhir klip di video asli, dalam total detik. Harus berupa bilangan bulat yang realistis.",
            },
            duration: {
                type: Type.INTEGER,
                description: "Total durasi klip dalam detik. Harus antara 30 dan 60.",
            },
            viralPotential: {
                type: Type.STRING,
                description: "Peringkat potensi klip untuk menjadi viral ('Tinggi', 'Sedang', atau 'Rendah'), dengan justifikasi singkat.",
            },
        },
        required: ["topicTitle", "hook", "caption", "startTime", "endTime", "duration", "viralPotential"],
    },
};

export const generateTopics = async (youtubeUrl: string, transcript: string): Promise<Topic[]> => {
    const model = 'gemini-2.5-flash';

    const prompt = `
        Anda adalah 'Viral Vision AI', seorang manajer media sosial ahli dan editor video yang berspesialisasi dalam mengidentifikasi dan membuat klip video pendek viral dari konten yang lebih panjang. Analisis Anda tajam, kreatif, dan fokus untuk memaksimalkan keterlibatan audiens.

        Tugas Anda adalah menganalisis transkrip video YouTube yang disediakan untuk menemukan momen-momen paling menarik yang berpotensi menjadi viral.
        
        Video YouTube yang relevan adalah: ${youtubeUrl}

        Berikut adalah transkrip lengkap dari video tersebut:
        --- TRANSKRIP MULAI ---
        ${transcript}
        --- TRANSKRIP SELESAI ---

        Berdasarkan transkrip yang diberikan, identifikasi setidaknya 20 klip viral potensial, masing-masing berdurasi antara 30 dan 60 detik.
        Penting: Waktu mulai (startTime) dan waktu akhir (endTime) yang Anda berikan HARUS sesuai dengan waktu sebenarnya di video YouTube. Analisis transkrip untuk memperkirakan waktu ini seakurat mungkin.
        Pastikan setiap klip memiliki judul yang menarik, hook yang kuat, dan caption yang menarik untuk media sosial.

        Untuk setiap klip, berikan informasi yang diminta sesuai skema JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        if (!Array.isArray(parsedData)) {
            throw new Error("API tidak mengembalikan larik topik.");
        }

        // Validate structure of returned data
        const validatedTopics: Topic[] = parsedData.filter(item => 
            item.topicTitle && item.hook && item.caption &&
            typeof item.startTime === 'number' && typeof item.endTime === 'number' &&
            typeof item.duration === 'number' && item.viralPotential
        );
        
        return validatedTopics;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Tidak dapat mengambil atau mengurai topik dari layanan AI.");
    }
};