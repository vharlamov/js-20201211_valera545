  class Tooltip {
    static instance;
    element;

    constructor() {
      if (this.element) {
        return Tooltip.instance;
      }
      Tooltip.instance = this;
    }

    render(html) {
      this.element = document.createElement('div');
      this.element.className = 'tooltip';
      this.element.innerHTML = html;
      document.body.append(this.element);
    }

    initialize() {
      this.initListeners();
    }

    initListeners() {
      document.addEventListener('pointerover', this.onMouseOver);
      document.addEventListener('pointerout', this.onMouseOut);
    }

    onMouseOver = event => {
      const target = event.target.closest('[data-tooltip]');
      if (target) {
        this.render(target.dataset.tooltip);
        this.moveTooltip(event);
        document.addEventListener('pointermove', this.onMouseMove)
      }
    }
    onMouseMove = event => {
      this.moveTooltip(event);
    }
    onMouseOut = () => {
      this.removeTooltip();
    }

    moveTooltip(event) {
      const ttLeft = event.clientX + 10;
      const ttTop = event.clientY + 10;
      this.element.style.left = `${ttLeft}px`;
      this.element.style.top = `${ttTop}px`
    }

    removeTooltip() {
      if (this.element) {
        this.element.remove();
        this.element = null;
      }
      document.removeEventListener('pointermove', this.onMouseMove);
    }

    remove() {
      this.element.remove();
    }

    destroy() {
      document.removeEventListener('pointerover', this.onMouseOver);
      document.removeEventListener('pointerout', this.onMouseOut);
      this.removeTooltip();
    }
  }

  const tooltip = new Tooltip();

  export default tooltip;