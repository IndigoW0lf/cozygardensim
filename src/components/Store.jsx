import React from 'react';
import { herbalPlants } from '../data/herbalPlants';

const Store = () => (
  <section aria-labelledby="catalog-title">
    <h2 id="catalog-title">Plants to discover</h2>
    <p>The seed shop is planned. Purchases and harvest rewards are not available yet.</p>
    <ul>
      {herbalPlants.map((plant) => <li key={plant.name}>{plant.name}</li>)}
    </ul>
  </section>
);

export default Store;
