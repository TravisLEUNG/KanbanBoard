const Button: React.FC<{ label: string; onClick: () => void }> = ({
    label,
    onClick,
}) => {
    return <button onClick={onClick}>{label}</button>;
};

export default Button;
