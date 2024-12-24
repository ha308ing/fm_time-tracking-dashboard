import { useEffect, useMemo } from "react";
import { useStore } from "@/hooks";
import { CardTracking } from "@/components/card-tracking";

export const Cards = () => {
    const fetchTimeframes = useStore((state) => state.fetchTimeframes);
    const cards = useStore((state) => state.cards);

    useEffect(() => {
        fetchTimeframes();
    }, [fetchTimeframes]);

    return useMemo(
        () =>
            cards == null ? (
                <h2>No cards =(</h2>
            ) : (
                cards.map((card, index) => (
                    <CardTracking key={index} card={card} />
                ))
            ),
        [cards],
    );
};
