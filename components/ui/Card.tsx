import React from 'react';

const Card = ({
    as: Tag = 'div',
    children,
    className = "",
    hoverEffect = true,
    onClick,
    ...props
}: {
    as?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    onClick?: () => void;
    [key: string]: any;
}) => {
    const isInteractive = !!onClick;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };

    return (
        <Tag
            onClick={onClick}
            onKeyDown={handleKeyDown}
            tabIndex={isInteractive ? 0 : undefined}
            // Note: We avoid adding role="button" if there are nested interactive elements like buttons inside,
            // but tabIndex ensures keyboard users can focus and activate the card.
            className={`bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 transition-all duration-300 ${hoverEffect ? 'hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer' : ''} ${className} ${isInteractive ? 'focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600' : ''}`}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default Card;
