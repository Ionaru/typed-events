import { IDisposable, IListener, TypedEvent } from './';

describe('test TypedEvent.once', () => {
    it('one listener', () => {

        expect.assertions(1);

        let eventCalled = false;

        const myEvent = new TypedEvent();
        const listener: IListener<unknown> = () => eventCalled = true;
        myEvent.on(listener);
        myEvent.emit({});

        expect(eventCalled).toBeTruthy();
    });

    it('multiple listeners', () => {

        expect.assertions(2);

        let eventCalled = false;
        let secondEventCalled = false;

        const myEvent = new TypedEvent();
        myEvent.once(() => eventCalled = true);
        myEvent.once(() => secondEventCalled = true);
        myEvent.emit({});

        expect(eventCalled).toBeTruthy();
        expect(secondEventCalled).toBeTruthy();
    });

    it('multiple emits', () => {

        expect.assertions(1);

        let timesCalled = 0;

        const myEvent = new TypedEvent();
        myEvent.once(() => timesCalled++);
        myEvent.emit({});
        myEvent.emit({});

        expect(timesCalled).toBe(1);
    });

    it('emit parameter', () => {

        expect.assertions(1);

        let someNumber;

        const myEvent = new TypedEvent<number>();
        myEvent.once((received) => someNumber = received);
        myEvent.emit(500);

        // noinspection JSUnusedAssignment
        expect(someNumber).toBe(500);
    });
});

describe('test TypedEvent.on', () => {
    it('one listener', () => {

        expect.assertions(1);

        let eventCalled = false;

        const myEvent = new TypedEvent();
        myEvent.on(() => eventCalled = true);
        myEvent.emit({});

        expect(eventCalled).toBeTruthy();
    });

    it('multiple listeners', () => {

        expect.assertions(2);

        let eventCalled = false;
        let secondEventCalled = false;

        const myEvent = new TypedEvent();
        myEvent.on(() => eventCalled = true);
        myEvent.on(() => secondEventCalled = true);
        myEvent.emit({});

        expect(eventCalled).toBeTruthy();
        expect(secondEventCalled).toBeTruthy();
    });

    it('multiple emits', () => {

        expect.assertions(1);

        let timesCalled = 0;

        const myEvent = new TypedEvent();
        myEvent.on(() => timesCalled++);
        myEvent.emit({});
        myEvent.emit({});

        expect(timesCalled).toBe(2);
    });

    it('emit parameter', () => {

        expect.assertions(1);

        let someNumber;

        const myEvent = new TypedEvent<number>();
        myEvent.on((received) => someNumber = received);
        myEvent.emit(500);

        // noinspection JSUnusedAssignment
        expect(someNumber).toBe(500);
    });
});

describe('test TypedEvent.off', () => {
    it('one listener', () => {

        expect.assertions(1);

        let eventCalled = false;

        const myEvent = new TypedEvent();

        const listener = () => eventCalled = true;
        myEvent.on(listener);
        myEvent.off(listener);

        myEvent.emit({});

        expect(eventCalled).toBeFalsy();
    });

    it('one .once listener', () => {

        expect.assertions(1);

        let eventCalled = false;

        const myEvent = new TypedEvent();

        const listener = () => eventCalled = true;
        myEvent.once(listener);
        myEvent.off(listener);

        myEvent.emit({});

        expect(eventCalled).toBeFalsy();
    });

    it('between emits', () => {

        expect.assertions(1);

        let timesCalled = 0;

        const myEvent = new TypedEvent();
        const listener = () => timesCalled++;
        myEvent.on(listener);
        myEvent.emit({});
        myEvent.off(listener);
        myEvent.emit({});

        expect(timesCalled).toBe(1);
    });

    it('no error when dispose after emit.', () => {

        expect.assertions(1);

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

describe('test TypedEvent.pipe', () => {
    it('pipe to another listener', () => {

        expect.assertions(1);

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

describe('test TypedEvent disposable', () => {
    it('remove .on listener through disposable', () => {

        expect.assertions(1);

        let eventCalled = false;

        const myEvent = new TypedEvent();

        const listener = () => eventCalled = true;
        const disposable: IDisposable = myEvent.on(listener);
        disposable.dispose();

        myEvent.emit({});

        expect(eventCalled).toBeFalsy();
    });

    it('remove .once listener through disposable', () => {

        expect.assertions(1);

        let eventCalled = false;

        const myEvent = new TypedEvent();

        const listener = () => eventCalled = true;
        const disposable: IDisposable = myEvent.once(listener);
        disposable.dispose();

        myEvent.emit({});

        expect(eventCalled).toBeFalsy();
    });

    it('disposing multiple times should not error', () => {

        expect.assertions(1);

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
