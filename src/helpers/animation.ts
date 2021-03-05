import { useCallback, useState } from 'react';

export const useIsAnimating = (animating: boolean): any[] => {
    const [isAnimating, setIsAnimating] = useState(animating);
    const toggle = useCallback(() => setIsAnimating((state) => !state), [
        setIsAnimating,
    ]);

    return [isAnimating, toggle];
};
