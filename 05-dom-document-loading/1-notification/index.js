export default class NotificationMessage {
    static activeNotification;

    constructor(
        note = 'success', {
        duration = 2000,
        type = ''
    } = {} ) {

        if( NotificationMessage.activeNotification ) {
            NotificationMessage.activeNotification.remove();
        }
        this.note = note;
        this.duration = duration;
        this.type = type;
        this.render();
    }

    getType() {
        return this.type === 'success' ? 'success' : 'error';
    }

    get template() {
        return `<div class="notification ${this.getType()}" style="--value:${this.duration/1000}s">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">${this.note}</div>
            </div>
        </div>`;
    }

    render() {

        const element = document.createElement('div');

        element.innerHTML = this.template;

        this.element = element.firstElementChild;

        NotificationMessage.activeNotification = this.element;
    }
    show( parent = document.body ) {

        parent.append( this.element );

        setTimeout( () => this.remove(), this.duration );

    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        NotificationMessage.activeNotification = null;
    }

}
