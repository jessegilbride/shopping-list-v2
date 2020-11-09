'use strict';

const STORE = [
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false}
];

function generateItemElement(item) {
  return `
  <li data-item-id="${item.id}">
    <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>
    `;
}

function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join("");
}

function renderShoppingList() {
  console.log('`renderShoppingList` ran');
  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function getItemIdFromElement(item) {
  // this function is called in both handleItemCheckClicked() and handleDeleteItemClicked
  return $(item).closest('li').data('item-id');
}

// ==================== functions for adding an item ====================
function addItemToShoppingList(itemName) {
  STORE.push({id: cuid(), name: itemName, checked: false});
  console.log('`addItemToShoppingList` ran');
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
    // console.log(newItemName);
    console.log('`handleNewItemSubmit` ran');
  });
}
// ................................... (END COLLECTION OF ASSOCIATED FUNCTIONS)

// ==================== functions for checking/unchecking an item ====================
function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on a shopping list item.
  console.log('`handleItemCheckClicked` ran');
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    const itemId = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(itemId);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  console.log('`toggleCheckedForListItem` ran');
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked; // invert the boolean for item.checked
}
// ................................... (END COLLECTION OF ASSOCIATED FUNCTIONS)

// ==================== functions for deleting an item ====================
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list item
  console.log('`handleDeleteItemClicked` ran')
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemId = getItemIdFromElement(event.currentTarget);
    deleteListItem(itemId);
    renderShoppingList();
  });
}

function deleteListItem(itemId) {
  // Remove the item from STORE
  console.log('`deleteListItem` ran');
  const itemToDelete = STORE.findIndex(item => item.id === itemId);
  // console.log(itemToDelete);
  STORE.splice(itemToDelete, 1);
}
// ................................... (END COLLECTION OF ASSOCIATED FUNCTIONS)

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);