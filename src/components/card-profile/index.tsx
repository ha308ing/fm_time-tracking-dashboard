import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/hooks";
import { Card } from "@/components/card";
import { TimeframeSelector } from "@/components/timeframe-selector";

const TimeframeSelectorStyled = styled(TimeframeSelector)`
    color: var(--color-desaturated-blue);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    font-weight: 300;

    font-size: 1.2rem;
    letter-spacing: -0.3px;
    padding-block-start: 1.5rem;
    border-radius: 0 0 var(--card-border-radius) var(--card-border-radius);
    padding-block-end: 1.5rem;

    @media (width>=1110px) {
        justify-content: flex-start;
        flex-flow: column nowrap;
        padding-inline-start: 2rem;
        gap: 1.2rem;
    }
`;

interface ICardProfileProps {
    className?: string;
}

const ProfileContainer = styled(Card)`
    background-color: var(--color-profile-background);
    color: var(--color-profile);
    padding: 2rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 1.1rem;

    @media (width>=1110px) {
        flex-flow: column nowrap;
        gap: 2.5rem;
        padding: 2.2rem 2rem 2rem;
        align-items: flex-start;
    }
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 4.3rem;
    height: 4.3rem;
    display: block;
    border: 3px solid white;
    margin-inline-start: -0.2rem;

    @media (width>=1110px) {
        /* margin-block-end: 2.5rem; */
        flex-flow: column nowrap;
        width: 5.25rem;
        height: 5.25rem;
    }
`;

const ProfileName = styled.h1`
    font-size: 1.45rem;
    line-height: 1;
    letter-spacing: 0.045ch;
    font-weight: 300;
    color: var(--color-profile-name);
    margin-block-start: 6px;

    @media (width>=1110px) {
        font-size: 2.4rem;
        line-height: 1.25;
        margin-block-start: 2px;
    }
`;

const CardProfileStyled = styled(Card)`
    background-color: var(--color-card-background);
    font-size: 0.9375rem;
`;

export const CardProfile: React.FC<ICardProfileProps> = ({ className }) => {
    const { name, image } = useStore(
        useShallow((state) => ({
            name: state.profile.name,
            image: state.profile.image,
        })),
    );

    return (
        <CardProfileStyled className={className}>
            <ProfileContainer>
                <ProfileImage src={image} />
                <div>
                    Report for <ProfileName>{name}</ProfileName>
                </div>
            </ProfileContainer>
            <TimeframeSelectorStyled />
        </CardProfileStyled>
    );
};
