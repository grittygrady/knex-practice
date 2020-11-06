const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');
const { expect } = require('chai');

describe(`Shopping List Service Object`, function() {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'First test item',
      date_added: new Date('2020-04-20T16:20:09.000Z'),
      price: '4.20',
      category: 'Main',
      checked: false
    },
    {
      id: 2,
      name: 'Second test item',
      date_added: new Date('2020-09-15T21:15:06.000Z'),
      price: '21.00',
      category: 'Snack',
      checked: false
    },
    {
      id: 3,
      name: 'Third test item',
      date_added: new Date('2020-10-08T22:08:00.666Z'),
      price: '99.00',
      category: 'Lunch',
      checked: false
    },
    {
      id: 4,
      name: 'Fourth test item',
      date_added: new Date('2020-10-31T08:15:06.000Z'),
      price: '4.99',
      category: 'Breakfast',
      checked: false
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given shopping list has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems)
    });

    it(`getAllItems() resolves all items from the 'shopping_list' table`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems)
        })
    });

    it(`getById() resolves an item by id from 'shopping_list' table`, () => {
      const targetId = 3
      const thirdItem = testItems[targetId - 1];
      return ShoppingListService.getById(db, targetId)
        .then(actual => {
          expect(actual).to.eql({
            id: targetId,
            name: thirdItem.name,
            date_added: thirdItem.date_added,
            price: thirdItem.price,
            category: thirdItem.category,
            checked: false
          });
        });
    });

    it(`deleteItem() deletes an item from the 'shopping_list' table`, () => {
      const idToDelete = 3;
      return ShoppingListService.deleteItem(db, idToDelete)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          const expected = testItems
            .filter(item => item.id !== idToDelete)
            .map(item => ({
              ...item
            }))
            expect(allItems).to.eql(expected)
        });
    });
    it(`updateItem() updates an item in the 'shopping_list' table`, () => {
      const idToUpdate = 3;
      const newItemData = {
        name: 'Updated title',
        price: '66.66',
        date_added: new Date(),
        checked: true
      };
      const originalItem = testItems[idToUpdate - 1];
      return ShoppingListService.updateItem(db, idToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idToUpdate,
            ...originalItem,
            ...newItemData
          });
        });
    });
  });

  context(`given that 'shopping_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });
    it(`insertItem() inserts an item and resolves it with an id`, () => {
      const newItem = {
        name: 'New item name',
        price: '6.66',
        date_added: new Date('2020-10-31T14:30:06.075Z'),
        category: 'Snack',
        checked: false
      };
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            price: newItem.price,
            date_added: newItem.date_added,
            category: newItem.category,
            checked: newItem.checked
          });
        });
    });
  })
})