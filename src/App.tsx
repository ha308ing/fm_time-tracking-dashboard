import styled from "styled-components";
import { useRef } from "react";
import { CardProfile, Cards } from "@/components";
import { useStore } from "@/hooks";

const Main = styled.main`
    display: grid;
    gap: 1.5rem;
    grid-template-columns: auto;
    padding: 5rem 1.5rem;

    @media (width >= 1110px) {
        grid-template:
            "profile card card card" auto
            "profile card card card" auto / 1fr 1fr 1fr 1fr;
        gap: 1.9rem;
        max-width: 1110px;
        padding: 0;
    }
`;

const CardProfileStyled = styled(CardProfile)`
    display: grid;
    grid-template-rows: auto auto;
    border-radius: 1.5rem;

    @media (width >= 1110px) {
        grid-template-rows: 68.4% auto;
        grid-area: profile;
    }
`;

export const App = () => {
    const timeframe = useStore((state) => state.timeframe);
    const containerRef = useRef<null | HTMLElement>(null);

    return (
        <Main ref={containerRef} data-value={timeframe}>
            <CardProfileStyled />
            <Cards />
        </Main>
    );
};
