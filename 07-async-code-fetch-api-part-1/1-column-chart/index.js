import fetchJson from './utils/fetch-json.js';

export default class ColumnChart {
    element;
    subElements = {};
    chartHeight = 50;
    rootUrl = 'https://course-js.javascript.ru';

    constructor({
        url = '',
        range = {},
        label = '',
        link = '',
        formatHeading = data => data
    } = {}) {
        this.url = new URL( url, this.rootUrl );
        this.range = range;
        this.label = label;
        this.link = link;
        this.formatHeading = formatHeading;
        this.render();
        this.getData();
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

    getTemplate(cols) {
        return `<div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                    ${this.label}
                    ${this.makeLink()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                </div>
                <div data-element="body" class="column-chart__chart">
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

    getSumValues(data) {
        const sumValues = data.reduce( (accum, value) => accum + value, 0 );
        return this.formatHeading(sumValues);
    }

    async getData() {
        const url = this.getRequest();

        this.element.classList.add( 'column-chart_loading' )

        this.subElements.header.textContent = '';
        this.subElements.body.innerHTML = '';

        const respData = await fetchJson(url);
        const data = Object.values(respData);

        if( data && data.length ) {
            this.element.classList.remove( 'column-chart_loading' );
            
            this.subElements.header.textContent = this.getSumValues(data);

            this.subElements.body.innerHTML = this.makeColumns(data);


        } 
    }

    getRequest() {
        const range = this.range;
        let url = this.url;

        for( let [key,value] of Object.entries(range) ) {
        url.searchParams.set( key, value.toISOString() );
        }
        
        return url;
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        this.element = element.firstElementChild;


        this.subElements = this.getSubElements( this.element );

    }

    destroy() {
    this.element.remove();
    }

    async update( start, end ) {
        this.range = {
            from: start,
            to: end
        }
        await this.getData()
    }

}
