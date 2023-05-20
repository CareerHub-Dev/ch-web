interface IToastStrategy {
    notify(message: string, currentToastId?: number): void;
}
export default IToastStrategy;
