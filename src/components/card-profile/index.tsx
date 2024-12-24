import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/hooks";
import { Card } from "@/components/card";
import { TimeframeSelector } from "@/components/timeframe-selector";

const TimeframeSelectorStyled = styled(TimeframeSelector)`
    color: var(--color-desaturated-blue);
    display: flex;
    flex-flow: column nowrap;
    gap: 1.2rem;
    font-weight: 300;

    font-size: 1.2rem;
    letter-spacing: -0.3px;
    padding-block-start: 1.5rem;
    padding-inline-start: 2rem;
    border-radius: 0 0 var(--card-border-radius) var(--card-border-radius);
`;

interface ICardProfileProps {
    className?: string;
}

const ProfileContainer = styled(Card)`
    background-color: var(--color-profile-background);
    color: var(--color-profile);
    padding: 2.2rem 2rem 2rem;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 5.25rem;
    height: 5.25rem;
    display: block;
    margin-block-end: 2.5rem;
    border: 3px solid white;
    margin-inline-start: -0.2rem;
`;

const ProfileName = styled.h1`
    font-size: 2.4rem;
    line-height: 1.25;
    letter-spacing: 0.045ch;
    font-weight: 300;
    margin-block-start: 2px;
    color: var(--color-profile-name);
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
                Report for <ProfileName>{name}</ProfileName>
            </ProfileContainer>
            <TimeframeSelectorStyled />
        </CardProfileStyled>
    );
};
