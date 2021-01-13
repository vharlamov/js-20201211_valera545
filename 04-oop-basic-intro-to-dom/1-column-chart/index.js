export default class ColumnChart {
    subElements = {};
    chartHeight = 50;

    constructor({
        data = [],
        value = 0,
        link = '',
        label = ''
    } = {}) {
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;
        this.render();
      }


    makeLink() {
        return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
    }

    makeColumns( data ) {
        const max = Math.max( 0, ...data );
        const relHeigth = (this.chartHeight / max);
        let cols = [];

        if( max && data.length ) {
            cols = data.map( item => `<div style='--value: ${Math.floor( item*relHeigth )}' data-tooltip='${(item/max*100).toFixed(0)}%'></div>`);
        } else if( data.length ) {
            cols = data.map( item => `<div style='--value: 1' ></div> `);
        }
        return cols.join('');
        }

    get template() {
        return `<div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                    ${this.label}
                    ${this.makeLink()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                    ${this.value}
                </div>
                <div data-element="body" class="column-chart__chart">
                    ${this.makeColumns( this.data )}
                </div>
            </div>
         </div>`
        ;}

    getSubElements(element) {
        const elements = element.querySelectorAll('[data-element]');

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;

            return accum;
        }, {});
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = this.template;
        this.element = element.firstElementChild;

        if( this.data.length ) {
            this.element.classList.remove( 'column-chart_loading' );
        }

        this.subElements = this.getSubElements( this.element );
     }

      remove () {
        this.element.remove();
      }

      destroy() {
        this.remove();
        this.element = null;
      }

      update( data ) {
        this.subElements.body.innerHTML = this.makeColumns( data );
      }
    
}
