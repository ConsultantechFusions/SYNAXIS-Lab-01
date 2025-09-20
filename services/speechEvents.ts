type EventHandler = (data?: any) => void;

class EventEmitter {
    private events: { [key: string]: EventHandler[] } = {};

    on(event: string, listener: EventHandler): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event: string, listener: EventHandler): void {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    emit(event: string, data?: any): void {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(data));
    }
}

export const speechEvents = new EventEmitter();
