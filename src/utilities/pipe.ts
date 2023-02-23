
export const buildPipe = <T>() => {
    let listeners: ((T) => void)[] = [];

    const register = (fun: (T) => void) => {
        listeners.push(fun);
    }

    const deregister = (fun: (T) => void) => {
        listeners = listeners.filter(f => f !== fun);
    }

    const trigger = (value: T) => {
        listeners.forEach(f => f(value));
    }

    return {
        register,
        deregister,
        trigger
    }
}

export type Pipe<T> = ReturnType<typeof buildPipe<T>>;

export type Registration<T> = Pipe<T>['register'];

export type Deregistration<T> = Pipe<T>['deregister'];