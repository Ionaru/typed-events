import { IDisposable, IListener, TypedEvent } from './';

describe('TypedEvent.once', () => {
    test('One listener', () => {

        let eventCalled = false;

        const myEvent = new TypedEvent();
        const listener: IListener<{}> = () => eventCalled = true;
        myEvent.on(listener);
        myEvent.emit({});

        expect(eventCalled).toBeTruthy();
    });

    test('Multiple listeners', () => {

        let eventCalled = false;
        let secondEventCalled = false;

        const myEvent = new TypedEvent();
        myEvent.once(() => eventCalled = true);
        myEvent.once(() => secondEventCalled = true);
        myEvent.emit({});

        expect(eventCalled).toBeTruthy();
        expect(secondEventCalled).toBeTruthy();
    });

    test('Multiple emits', () => {

        let timesCalled = 0;

        const myEvent = new TypedEvent();
        myEvent.once(() => timesCalled++);
        myEvent.emit({});
        myEvent.emit({});

        expect(timesCalled).toBe(1);
    });

    test('Emit parameter', () => {
        let someNumber;

        const myEvent = new TypedEvent<number>();
        myEvent.once((received) => someNumber = received);
        myEvent.emit(500);

        // noinspection JSUnusedAssignment
        expect(someNumber).toBe(500);
    });
});

describe('TypedEvent.on', () => {
    test('One listener', () => {

        let eventCalled = false;

        const myEvent = new TypedEvent();
        myEvent.on(() => eventCalled = true);
        myEvent.emit({});

        expect(eventCalled).toBeTruthy();
    });

    test('Multiple listeners', () => {

        let eventCalled = false;
        let secondEventCalled = false;

        const myEvent = new TypedEvent();
        myEvent.on(() => eventCalled = true);
        myEvent.on(() => secondEventCalled = true);
        myEvent.emit({});

        expect(eventCalled).toBeTruthy();
        expect(secondEventCalled).toBeTruthy();
    });

    test('Multiple emits', () => {

        let timesCalled = 0;

        const myEvent = new TypedEvent();
        myEvent.on(() => timesCalled++);
        myEvent.emit({});
        myEvent.emit({});

        expect(timesCalled).toBe(2);
    });

    test('Emit parameter', () => {
        let someNumber;

        const myEvent = new TypedEvent<number>();
        myEvent.on((received) => someNumber = received);
        myEvent.emit(500);

        // noinspection JSUnusedAssignment
        expect(someNumber).toBe(500);
    });
});

describe('TypedEvent.off', () => {
    test('One listener', () => {

        let eventCalled = false;

        const myEvent = new TypedEvent();

        const listener = () => eventCalled = true;
        myEvent.on(listener);
        myEvent.off(listener);

        myEvent.emit({});

        expect(eventCalled).toBeFalsy();
    });

    test('One .once listener', () => {

        let eventCalled = false;

        const myEvent = new TypedEvent();

        const listener = () => eventCalled = true;
        myEvent.once(listener);
        myEvent.off(listener);

        myEvent.emit({});

        expect(eventCalled).toBeFalsy();
    });

    test('Between emits', () => {

        let timesCalled = 0;

        const myEvent = new TypedEvent();
        const listener = () => timesCalled++;
        myEvent.on(listener);
        myEvent.emit({});
        myEvent.off(listener);
        myEvent.emit({});

        expect(timesCalled).toBe(1);
    });

    test('No error when dispose after emit.', () => {

        let timesCalled = 0;

        const myEvent = new TypedEvent();
        const listener = () => timesCalled++;
        myEvent.once(listener);
        myEvent.emit({});
        myEvent.off(listener);
        myEvent.emit({});

        expect(timesCalled).toBe(1);
    });
});

describe('TypedEvent.pipe', () => {
    test('Pipe to another listener', () => {

        let timesCalled = 0;

        const myEvent = new TypedEvent();
        const mySecondEvent = new TypedEvent();

        const listener = () => timesCalled++;
        myEvent.on(listener);
        mySecondEvent.on(listener);

        myEvent.pipe(mySecondEvent);

        myEvent.emit({});

        expect(timesCalled).toBe(2);
    });
});

describe('TypedEvent disposable', () => {
    test('Remove .on listener through disposable', () => {

        let eventCalled = false;

        const myEvent = new TypedEvent();

        const listener = () => eventCalled = true;
        const disposable: IDisposable = myEvent.on(listener);
        disposable.dispose();

        myEvent.emit({});

        expect(eventCalled).toBeFalsy();
    });

    test('Remove .once listener through disposable', () => {

        let eventCalled = false;

        const myEvent = new TypedEvent();

        const listener = () => eventCalled = true;
        const disposable: IDisposable = myEvent.once(listener);
        disposable.dispose();

        myEvent.emit({});

        expect(eventCalled).toBeFalsy();
    });

    test('Disposing multiple times should not error', () => {

        let eventCalled = false;

        const myEvent = new TypedEvent();

        const listener = () => eventCalled = true;
        const disposable: IDisposable = myEvent.once(listener);
        disposable.dispose();
        disposable.dispose();

        myEvent.emit({});

        expect(eventCalled).toBeFalsy();
    });
});
