import IToastStrategy from "./strategies/IToastStrategy";
import DefaultStrategy from "./strategies/SuccessToastStrategy";

class ToastContext {
    private strategy: IToastStrategy;

    public constructor(strategy?: IToastStrategy) {
        this.strategy = strategy || new DefaultStrategy();
    }

    public setStrategy(strategy: IToastStrategy) {
        this.strategy = strategy;
        return this;
    }

    public notify(message: string, currentToastId?: number): void {
        this.strategy.notify(message, currentToastId);
    }
}
export default ToastContext;
