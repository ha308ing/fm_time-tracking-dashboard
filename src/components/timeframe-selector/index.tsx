import styled from "styled-components";
import { useCallback, memo } from "react";
import { useStore } from "@/hooks";
import { isTimeframeType } from "@/utils";

const List = styled.ul``;

const ListItem = styled.li`
    cursor: pointer;
    color: var(--color-pale-blue);

    [data-value="daily"] &[data-value="daily"],
    [data-value="weekly"] &[data-value="weekly"],
    [data-value="monthly"] &[data-value="monthly"],
    &:hover {
        color: var(--color-timeframe-hover);
    }
`;

interface ITimeframeSelectorProps {
    className?: string;
}

export const TimeframeSelector: React.FC<ITimeframeSelectorProps> = memo(
    ({ className }) => {
        const setTimeframe = useStore((state) => state.setTimeframe);

        const setActiveTimeframe = useCallback(
            (event: React.MouseEvent<HTMLUListElement>) => {
                const value = (event.target as HTMLElement).dataset["value"];

                if (value !== undefined) {
                    const isValid = isTimeframeType(value);
                    if (!isValid) return;
                    event.stopPropagation();
                    setTimeframe(value);
                }
            },
            [setTimeframe],
        );

        return (
            <List onClick={setActiveTimeframe} className={className}>
                <ListItem data-value="daily">Daily</ListItem>
                <ListItem data-value="weekly">Weekly</ListItem>
                <ListItem data-value="monthly">Monthly</ListItem>
            </List>
        );
    },
);
