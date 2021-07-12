import { useCallback, useState } from 'react';

export const useIsAnimating = (animating: boolean): [boolean, () => void] => {
    const [isAnimating, setIsAnimating] = useState(animating);
    const toggle = useCallback(() => setIsAnimating((state) => !state), [setIsAnimating]);

    return [isAnimating, toggle];
};
