// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
  openDB('contacts', 1, {
    upgrade(db) {
      if(db.objectStoreNames.contains('cards')) {
        console.log('cards database already exists');
        return;
      }
      db.createObjectStore('cards', { keyPath: 'id', autoIncrement:true });
      console.log('cards database created');
    }
  })
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
  console.log('attempting to add card to database')
  const cardsDb = await (openDB('cards', 1));
  const tx = cardsDb.transaction('cards', 'readwrite');
  const store = tx.objectStore('cards');
  const request = store.add( { contact: [name, home, cell, email] });
  const result = await request;
  console.log('contact added to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  console.log('Getting all cards from the database');
  const cardsDb = await openDB('cards', 1);
  const tx = cardsDb.transaction('cards', 'readonly');
  const store = tx.objectStore('cards');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const cardsDb = await openDB('cards', 1);
  const tx = cardsDb.transaction('cards', 'readwrite');
  const store = tx.objectStore('cards');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
