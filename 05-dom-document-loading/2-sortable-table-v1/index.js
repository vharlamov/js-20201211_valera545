export default class SortableTable {
    element;
    subElements = {};

    constructor( header, { data } = {} ) {
        this.header = header;
        this.data = data;
        this.render();
    }

    get headerTemplate() {
        const headerTemp = [];
        for( let item of this.header ) {
            headerTemp.push(
                `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}"
                data-order="${item.order}"><span>${item.title}</span></div>
                `
            )
        }
        return headerTemp.join('');
    }

    getTable() {
        return `<div data-element='productContainer' class='product-list__container'>
        ${this.getTableHeader()}
        ${this.getTableBody()}
        </div>`
    }

    getTableHeader() {

        return `<div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.header.map( item => this.getHeaderRow( item ) ).join('')} 
        </div>`
    }

    getHeaderRow( {id, sortable, title} ) {
        return `<div class='sortable-table__cell' data-id=${id} data-sortable=${sortable}><span>${title}</span></div>`;
    }

    getTableBody() {
        return `<div data-element='body' class=sortable-table__body>
        ${this.getRows( this.data )}
        </div>`
    }

    getRows( data ) {
        return data.map( item => {
            return `<a href='/products/${item.id}' class='sortable-table__row'>
            ${this.getRow( item )}
            </a>`
        });
    }

    getRow( item ) {
        const cells = this.header.map( ({id, template}) => {
            return {id, template};
        } );

        const row = cells.map( ({id, template}) => {
            return template 
            ? template( item[id] )
            : `<div class="sortable-table__cell">${item[id]}</div>`;
        });

        return row.join('');
    }

    render() {
        const wrapper = document.createElement('div');
        
        wrapper.innerHTML = this.getTable();
        
        const element = wrapper.firstElementChild;

        this.element = element;

        this.subElements = this.getSubElements( element );
   }

    sort( fieldValue, orderValue ) {

        const sorted = this.sortData( fieldValue, orderValue );
        this.subElements.body.innerHTML = this.getRows( sorted );

    }

    sortData( field, order ) {
        const temp = [...this.data];
        const sortType = this.header.find( item => item.id === field ).sortType;
        const dir = order === 'asc' ? 1 : -1;

            switch( sortType ) {
                case 'string':
                    return temp.sort( (a, b) => a[field].localeCompare( b[field], ['ru', 'en'], {caseFirst: 'upper', sensitivity: 'case', usage: 'sort'}) * dir );
                case 'number': 
                    return temp.sort( (a, b) => (a[field] - b[field]) * dir );
                case 'custom':
                    return temp.sort( (a, b) => customSort(a, b) * dir );
            }
    }

    getSubElements(element) {
        const elements = element.querySelectorAll( '[data-element]' );

        const result = [...elements].reduce( ( accum, item ) => {
            accum[ item.dataset.element ] = item;
            return accum;
        }, {});
        return result;
    }

    destroy() {
        this.element.remove();
        SortableTable.container = null;
    }


}

