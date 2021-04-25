import React from 'react';
import styled from "styled-components";

let CalendarFrame = styled.iframe`
    border: none;
    width: 800px;
    height: 600px;
`;

export default function CalendarPage() {
    return (
        
            <CalendarFrame src='https://calendar.google.com/calendar/embed?src=4nqf7n8slbts8lq3jh7qpjk8a8%40group.calendar.google.com&ctz=America%2FNew_York'></CalendarFrame>
    )
}
