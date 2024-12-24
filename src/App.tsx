import styled from "styled-components";
import { useRef } from "react";
import { CardProfile, Cards } from "@/components";
import { useStore } from "@/hooks";

const Main = styled.main`
    display: grid;
    grid-template:
        "profile card card card" auto
        "profile card card card" auto / 1fr 1fr 1fr 1fr;
    gap: 1.9rem;
    max-width: 1110px;
`;

const CardProfileStyled = styled(CardProfile)`
    grid-area: profile;
    display: grid;
    grid-template-rows: 68.4% auto;
    border-radius: 1.5rem;
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
