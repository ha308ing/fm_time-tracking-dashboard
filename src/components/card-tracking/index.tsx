import styled from "styled-components";
import { memo } from "react";
import { Card } from "@/components/card";
import { TCard, TCardTimeframes, TTimeframe, TTimeframeType } from "@/hooks";
import { isTimeframeType } from "@/utils";

type TCardType =
    | "work"
    | "play"
    | "study"
    | "exercise"
    | "social"
    | "self-care";

type TCardTimeframesStrings = Record<TTimeframeType, TTimeframe<string>>;

const CardHeading = styled.header`
    display: flex;
    font-size: 1.125rem;
    justify-content: space-between;
    letter-spacing: 0.03ch;
`;

const CardContent = styled(Card)`
    background-color: var(--color-card-background);
    display: flex;
    flex-flow: column nowrap;
    padding: 1.8rem 1.5rem 1.3rem;
    color: var(--color-card);
    height: 100%;

    ${CardHeading} {
        margin-bottom: 0.35rem;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        font-weight: 300;
    }

    & > div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    [data-value="daily"] & [data-value="monthly"],
    [data-value="daily"] & [data-value="weekly"],
    [data-value="weekly"] & [data-value="monthly"],
    [data-value="weekly"] & [data-value="daily"],
    [data-value="monthly"] & [data-value="daily"],
    [data-value="monthly"] & [data-value="weekly"] {
        display: none;
    }

    @media (width>=1110px) {
        padding: 1.8rem 1.85rem 2rem;

        ${CardHeading} {
            margin-bottom: 1.5rem;
        }

        h2 {
            font-size: 3.5rem;
        }

        & > div {
            flex-flow: column nowrap;
            align-items: flex-start;
        }
    }
`;

const CardContainer = styled(Card)<{ type: TCardType }>`
    background-image: ${(props) => `url("images/icon-${props.type}.svg")`};
    background-color: ${(props) => `var(--color-${props.type})`};
    padding-top: 2.35rem;
    background-position: top -0.3rem right 1.3rem;
    background-size: 4.75rem;
    background-repeat: no-repeat;
    cursor: pointer;

    &[type="work"] {
        background-position: top -0.7rem right 1rem;
        background-size: 5rem;
    }

    &[type="study"] {
        background-position: top -0.4rem right 1.1rem;
        background-size: 4.9rem;
    }

    &[type="exercise"] {
        background-position: top 0rem right 1.1rem;
        background-size: 4.9rem;
    }

    &[type="social"] {
        background-position: top -0.9rem right 0.9rem;
        background-size: 4.6rem;
    }

    &[type="self-care"] {
        background-position: top -0.7rem right 0.9rem;
        background-size: 4.2rem;
    }

    &:hover ${CardContent} {
        background-color: var(--color-card-hover-background);
    }

    @media (width>=1110px) {
        padding-top: 2.8rem;
    }
`;

const normalizeTitle = (title: string): TCardType =>
    title.toLocaleLowerCase().replace(" ", "-") as TCardType;

const normalizeTimeframes = (timeframes: TCardTimeframes) => {
    return Object.entries(timeframes).reduce(
        (acc: TCardTimeframesStrings, [timeframeType, timeframeValue]) => {
            if (!isTimeframeType(timeframeType)) return acc;

            const timeframeTail = "hrs";

            const current = timeframeValue.current;

            const previous =
                "Last " +
                (timeframeType === "daily"
                    ? "Day"
                    : timeframeType === "monthly"
                      ? "Month"
                      : timeframeType === "weekly"
                        ? "Week"
                        : "") +
                " - " +
                timeframeValue.previous;

            acc[timeframeType].current = current + timeframeTail;
            acc[timeframeType].previous = previous + timeframeTail;

            return acc;
        },
        {
            daily: {
                current: "",
                previous: "",
            },
            monthly: {
                current: "",
                previous: "",
            },
            weekly: {
                current: "",
                previous: "",
            },
        },
    );
};

const MenuButton = styled.button`
    background-image: url("images/icon-ellipsis.svg#default");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    background-color: initial;
    cursor: pointer;
    inline-size: 1.35rem;
    block-size: 1.35rem;

    &:hover {
        background-image: url("images/icon-ellipsis.svg#hover");
    }
`;

const CardSubtext = styled.div`
    color: var(--color-pale-blue);
    font-size: 0.9375rem;
    margin-block-start: -8px;

    @media (width>=1110px) {
        margin-block-start: 0;
    }
`;

interface TCardProps {
    card: TCard;
}

export const CardTracking: React.FC<TCardProps> = memo(({ card }) => {
    const type = normalizeTitle(card.title);
    const title = card.title;
    const { daily, monthly, weekly } = normalizeTimeframes(card.timeframes);

    return (
        <CardContainer type={type}>
            <CardContent>
                <CardHeading>
                    <span>{title}</span>
                    <MenuButton />
                </CardHeading>
                <div data-value="daily">
                    <h2>{daily.current}</h2>
                    <CardSubtext>{daily.previous}</CardSubtext>
                </div>
                <div data-value="weekly">
                    <h2>{weekly.current}</h2>
                    <CardSubtext>{weekly.previous}</CardSubtext>
                </div>
                <div data-value="monthly">
                    <h2>{monthly.current}</h2>
                    <CardSubtext>{monthly.previous}</CardSubtext>
                </div>
            </CardContent>
        </CardContainer>
    );
});
