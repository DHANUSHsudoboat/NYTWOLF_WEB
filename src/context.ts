import React from 'react';

export const MouseGlowContext = React.createContext<{isHoveringCard: boolean; setIsHoveringCard: (value: boolean) => void;}>({isHoveringCard: false, setIsHoveringCard: () => { }});
