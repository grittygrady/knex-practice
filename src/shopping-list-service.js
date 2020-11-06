const ShoppingListService = {
  getAllItems(knex) {
    return knex
      .select('*')
      .from('shopping_list');
  },
  getById(knex, id) {
    return knex
      .from('shopping_list')
      .select('*')
      .where({ id })
      .first();
  },
  deleteItem(knex, id) {
    return knex
      .from('shopping_list')
      .where({ id })
      .delete();
  },
  updateItem(knex, id, newItemFields) {
    return knex
      .from('shopping_list')
      .where({ id })
      .update(newItemFields);
  },
  insertItem(knex, newItem) {
    return knex
      .from('shopping_list')
      .insert(newItem)
      .returning('*')
      .then(rows => rows[0]);
  }
};

module.exports = ShoppingListService;