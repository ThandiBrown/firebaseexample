
import { readDB, writeDB } from './data/talkToDatabase.js';

const DEFAULT_INVENTORY = {
  "lemon verbena": 10,
  "lemon verbena lavender": 10,
  "orange guava": 10,
  "pineapple": 10,
  "chamomile lavender": 10,
  "spearmint": 10,
  "tumeric ginger": 10,
  /* … */
  "mango": 2,
  "watermelon": 10,
};

const IGNORED_ITEMS = [
  "pineapple",
  "orange guava",
  "lemon verbena",
  "lemon verbena lavender",
  "chamomile lavender",
  "spearmint",
  "tumeric ginger",
];

class KombuchaApp {
  constructor() {
    this.state = {
      fullInventory: { ...DEFAULT_INVENTORY },
      inventory: {},
      readyNow: {},
    };

    this.init();
  }

  init() {
    // wire up a couple of top‑level listeners
    document.getElementById('button')
            .addEventListener('click', () => this.submitOrder());
    document.body.addEventListener('click', e => this.onBodyClick(e));

    this.loadingSettings();
  }

  loadingSettings() {
    // the three loading options from the original code, kept for clarity
    if (false) {
      readDB('', resp => this.loadingPage(resp));
    } else if (false) {
      this.loadingPage([{
        inventory: this.state.fullInventory,
        readyNow: {},
      }]);
    } else {
      writeDB('', { inventory: this.state.fullInventory, readyNow: {} },
              () => readDB('', resp => this.loadingPage(resp)));
    }
  }

  loadingPage(response) {
    const storage = response[0] || {};
    this.state.fullInventory = storage.inventory || this.state.fullInventory;
    this.state.inventory = this.state.fullInventory;
    this.state.readyNow = storage.readyNow || {};
    this.render();
  }

  render() {
    const page = document.querySelector('.page');
    page.innerHTML = `
      <h2>Homepage</h2>
      ${this.renderBox('Ready Now', this.state.readyNow, { rn: true })}
      ${this.renderBox('Build Order', this.state.inventory)}
      ${this.renderBox('Selected', {}, { selected: true })}
    ` + page.innerHTML;
  }

  renderBox(title, items, { rn = false, selected = false } = {}) {
    // the warning is only shown on the build‑order box
    const warning = selected
      ? `<span id="quantity-warning" style="color:red;display:none;">
           Please only select up to 6 unique flavors
         </span>`
      : '';

    return `
      <div class="box">
        <div class="box-title">${title}${warning}</div>
        <div class="box-container">
          <div class="flavor-column">
            <div class="title">Flavor</div>
            ${this.flavorList(items, { rn, selected })}
          </div>
          <div class="availability-column">
            <div class="title">${selected ? 'Amount' : 'Availability'}</div>
            ${this.quantityList(items, { rn, selected })}
          </div>
        </div>
      </div>
    `;
  }

  flavorList(items, { rn, selected }) {
    return Object.entries(items).map(([flavor, qty]) => {
      const id = this.makeId(flavor, { rn, selected });
      const display = this.formatName(flavor, { rn, selected });
      const cls = selected
        ? (rn ? 'flavor-selected-rn' : 'flavor-selected')
        : 'flavor';
      const dataName = rn && selected ? ` data-name="${display}"` : '';
      return `<div class="${cls}" id="${id}"${dataName}>${display}</div>`;
    }).join('');
  }

  quantityList(items, { rn, selected }) {
    if (selected) {
      return Object.entries(items).map(([flavor, qty]) => {
        const max = qty;
        const id = this.makeId(flavor, { rn, selected, quantity: true });
        const numberCls = rn ? 'quantity-selected-rn' : 'quantity-selected';
        return `
          <div class="input" id="${id}">
            <div class="number ${numberCls}">1</div>
            <div class="arrows">
              <div class="up" data-min="1" data-max="${max}"></div>
              <div class="down" data-min="1" data-max="${max}"></div>
            </div>
          </div>`;
      }).join('');
    } else {
      return Object.values(items).map(qty => `<div class="quantity">${qty}</div>`).join('');
    }
  }

  makeId(flavor, { rn = false, selected = false, quantity = false } = {}) {
    let id = flavor.toLowerCase().replace(/\s+/g, '-');
    if (rn) id += '-rn';
    if (selected) id += '-selected';
    if (quantity) id += '-quantity';
    return id;
  }

  formatName(flavor, { rn = false, selected = false } = {}) {
    const cap = flavor.charAt(0).toUpperCase() + flavor.slice(1);
    return rn && selected ? `${cap} (RN)` : cap;
  }

  onBodyClick(e) {
    if (e.target.matches('.flavor')) {
      this.processFlavorClick(e);
    } else if (e.target.matches('.up, .down')) {
      this.changeQuantity(e);
    }
  }

  processFlavorClick(e) {
    if (this.countFlexFlavors() >= 6 &&
        e.target.style.backgroundColor !== 'rgb(116, 189, 213)') {
      this.toggleDisplay('quantity-warning');
      return;
    }
    const id = e.target.id;
    this.toggleDisplay(`${id}-selected`);
    this.toggleDisplay(`${id}-quantity`);
    this.toggleBackgroundColor(e.target, 'lightblue', 'rgb(116, 189, 213)');
  }

  toggleDisplay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
  }

  toggleBackgroundColor(el, c1, c2) {
    el.style.backgroundColor =
      el.style.backgroundColor === c1 || el.style.backgroundColor === ''
        ? c2
        : c1;
  }

  submitOrder() {
    const order   = this.returnOrder(0);
    const orderRn = this.returnOrder(1);
    const msg     = this.formMessage(order, orderRn);
    this.confirmOrder(msg, order, orderRn);
  }

  returnOrder(orderRn) {
    const result = {};
    const flavors = orderRn
      ? document.querySelectorAll('.flavor-selected-rn')
      : document.querySelectorAll('.flavor-selected');
    const quantities = orderRn
      ? document.querySelectorAll('.quantity-selected-rn')
      : document.querySelectorAll('.quantity-selected');

    flavors.forEach((flavor, i) => {
      if (getComputedStyle(flavor).display === 'flex') {
        result[flavor.textContent.trim()] =
          quantities[i].innerText || quantities[i].placeholder || '0';
      }
    });
    return result;
  }

  formMessage(order, orderRn) {
    const fs = o => Object.entries(o).map(([f,q])=>`${f}: ${q}`).join('\n');
    let msg = '';
    if (fs(orderRn)) {
      msg += `Ready Now Order\n${fs(orderRn)}\n\n`;
    }
    if (fs(order)) {
      msg += `${orderRn ? 'Next Kombucha Order' : 'Next Order'}\n${fs(order)}`;
    }
    return msg;
  }

  confirmOrder(message, order, orderRn) {
    this.customConfirm(`Please confirm this is your order.\n${message}`)
        .then(yes => {
          if (!yes) return;
          const update = {
            inventory: this.updateInventory(this.state.fullInventory, order),
            readyNow: this.updateInventory(this.state.readyNow, orderRn),
          };
          writeDB('', update, () => this.sendMessage(message));
        });
  }

  customConfirm(message) {
    return new Promise(resolve => {
      const overlay = document.getElementById('confirm');
      const msg = document.getElementById('confirm-message');
      msg.textContent = message;
      overlay.style.display = 'flex';

      const yes = document.getElementById('confirm-yes');
      const no = document.getElementById('confirm-no');

      const cleanup = result => {
        overlay.style.display = 'none';
        yes.removeEventListener('click', y);
        no.removeEventListener('click', n);
        resolve(result);
      };
      const y = () => cleanup(true);
      const n = () => cleanup(false);

      yes.addEventListener('click', y);
      no.addEventListener('click', n);
    });
  }

  customRefresh() {
    return new Promise(resolve => {
      const overlay = document.getElementById('refresh');
      overlay.style.display = 'flex';
      const yes = document.getElementById('refresh-yes');
      const cleanup = () => {
        overlay.style.display = 'none';
        location.reload(true);
      };
      yes.addEventListener('click', cleanup);
    });
  }

  sendMessage(message) {
    this.customRefresh();
    const url = `sms:7067508106?&body=${encodeURIComponent(message)}`;
    window.location.href = url;
  }

  updateInventory(inventory, order) {
    const updated = { ...inventory };
    Object.entries(order).forEach(([item, qtyText]) => {
      const itemKey = item.toLowerCase();
      if (IGNORED_ITEMS.includes(itemKey)) return;
      const qty = parseInt(qtyText, 10) || 0;
      if (updated[itemKey] != null) {
        updated[itemKey] = Math.max(0, updated[itemKey] - qty);
      }
    });
    return updated;
  }

  changeQuantity(e) {
    const arrow = e.currentTarget;
    const num = arrow.closest('.input').querySelector('.number');
    let val = parseInt(num.textContent, 10);
    const min = parseInt(arrow.dataset.min, 10);
    const max = parseInt(arrow.dataset.max, 10);
    if (arrow.classList.contains('up') && val < max) num.textContent = ++val;
    else if (arrow.classList.contains('down') && val > min) num.textContent = --val;
  }

  countFlexFlavors() {
    return [...document.querySelectorAll('.flavor-selected')]
           .filter(el => getComputedStyle(el).display === 'flex').length;
  }
}

export default new KombuchaApp();