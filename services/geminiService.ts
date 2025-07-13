
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
                description: "Keterangan siap pakai untuk TikTok, Instagram Reels, atau YouTube Shorts. Sertakan tagar relevan dan selalu sertakan #fyp.",
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
                description: "Total durasi klip dalam detik.",
            },
            viralPotential: {
                type: Type.STRING,
                description: "Peringkat potensi klip untuk menjadi viral ('Tinggi', 'Sedang', atau 'Rendah'), dengan justifikasi singkat.",
            },
        },
        required: ["topicTitle", "hook", "caption", "startTime", "endTime", "duration", "viralPotential"],
    },
};

export const generateTopics = async (youtubeUrl: string, transcript: string, clipCount: string, clipDuration: string): Promise<Topic[]> => {
    const model = 'gemini-2.5-flash';

    const countInstruction = !clipCount
        ? `identifikasi jumlah klip yang optimal dengan topik yang menarik, edukatif, relevan dan viral potensial. Fokus pada kualitas daripada kuantitas.`
        : `Berdasarkan transkrip yang diberikan, identifikasi sekitar ${clipCount} klip dengan topik yang menarik, edukatif, relevan dan viral potensial.`;

    const durationInstruction = !clipDuration
        ? `Tentukan durasi yang paling cocok untuk setiap klip agar viral, idealnya antara 15 hingga 90 detik.`
        : `Durasi untuk setiap klip harus ${clipDuration}.`;

    const durationSchemaDescription = !clipDuration
        ? `Total durasi klip dalam detik yang dioptimalkan oleh AI untuk potensi viral.`
        : `Total durasi klip dalam detik. Harus sesuai dengan rentang durasi yang diminta (${clipDuration}).`;
    
    // Create a mutable copy of the schema to avoid side effects and update description dynamically
    const dynamicSchema = JSON.parse(JSON.stringify(responseSchema));
    dynamicSchema.items.properties.duration.description = durationSchemaDescription;

    const prompt = `
        Anda adalah 'Viral Vision AI', seorang manajer media sosial ahli dan editor video yang berspesialisasi dalam mengidentifikasi dan membuat klip video pendek viral dari konten yang lebih panjang. Analisis Anda tajam, kreatif, dan fokus untuk memaksimalkan keterlibatan audiens.

        Tugas Anda adalah menganalisis transkrip video YouTube yang disediakan untuk menemukan momen-momen paling menarik yang berpotensi menjadi viral.
        
        Video YouTube yang relevan adalah: ${youtubeUrl}

        Berikut adalah transkrip lengkap dari video tersebut:
        --- TRANSKRIP MULAI ---
        ${transcript}
        --- TRANSKRIP SELESAI ---

        ${countInstruction}
        ${durationInstruction}
        
        Penting: Waktu mulai (startTime) dan waktu akhir (endTime) yang Anda berikan HARUS sesuai dengan waktu sebenarnya di video YouTube. Analisis transkrip untuk memperkirakan waktu ini seakurat mungkin.
        Pastikan setiap klip memiliki judul yang menarik, hook yang kuat, dan caption yang menarik untuk media sosial. Untuk caption, selalu sertakan hashtag #fyp di antara tagar relevan lainnya.

        Untuk setiap klip, berikan informasi yang diminta sesuai skema JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dynamicSchema,
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