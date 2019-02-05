export type IListener<T> = (event: T) => void;

export interface IDisposable {
    dispose(): void;
}

export class TypedEvent<T> {
    private listeners: Array<IListener<T>> = [];
    private oneTimeListeners: Array<IListener<T>> = [];

    public on(listener: IListener<T>): IDisposable {
        this.listeners.push(listener);
        return {
            dispose: () => this.off(listener),
        };
    }

    public once(listener: IListener<T>): IDisposable {
        this.oneTimeListeners.push(listener);
        return {
            dispose: () => this.off(listener),
        };
    }

    public off(listenerToRemove: IListener<T>): void {
        const filterFuntion = (listener: IListener<T>) => listener !== listenerToRemove;

        this.listeners = this.listeners.filter(filterFuntion);
        this.oneTimeListeners = this.oneTimeListeners.filter(filterFuntion);
    }

    public emit(event: T): void {
        /** Update any general listeners */
        this.listeners.forEach((listener) => listener(event));

        /** Clear the `once` queue */
        this.oneTimeListeners.forEach((listener) => listener(event));
        this.oneTimeListeners = [];
    }

    public pipe(typedEvent: TypedEvent<T>): IDisposable {
        return this.on((event) => typedEvent.emit(event));
    }
}
