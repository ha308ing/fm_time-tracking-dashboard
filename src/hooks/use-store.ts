import { create } from "zustand";

const dataUrl = new URL("/data.json", import.meta.url).href;

type TCardTitle =
    | "Work"
    | "Play"
    | "Study"
    | "Exercise"
    | "Social"
    | "Self Care";

export type TTimeframeType = "daily" | "weekly" | "monthly";

export type TTimeframe<T = number> = {
    current: T;
    previous: T;
};

export type TCardTimeframes = Record<TTimeframeType, TTimeframe>;

export type TCard = {
    title: TCardTitle;
    timeframes: TCardTimeframes;
};

interface IStore {
    profile: {
        name: string;
        image: string;
    };
    cards: TCard[];
    timeframe: TTimeframeType;
    fetchTimeframes: () => Promise<void>;
    setTimeframe: (timeframe: TTimeframeType) => void;
}

export const useStore = create<IStore>()((set) => ({
    profile: {
        name: "Jeremy Robson",
        image: "/images/image-jeremy.png",
    },
    cards: [],
    timeframe: "weekly",
    fetchTimeframes: async () => {
        const response = await fetch(dataUrl);
        if (!response.ok) return;
        const cards = await response.json();
        console.log(cards);
        set({ cards });
    },
    setTimeframe: (timeframe) => set({ timeframe }),
}));
