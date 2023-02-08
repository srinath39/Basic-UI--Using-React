import React from "react";
import {useState} from 'react'; 

function ProductCategoryRow(obj) {
  return (
    <tr>
      <th colSpan="2">
        {obj.category}
      </th>
    </tr>
  );
}

function ProductRow(obj) {
  const name = obj.product.stocked ? obj.product.name :
    <span style={{ color: 'red' }}>
      {obj.product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{obj.product.price}</td>
    </tr>
  );
}

function ProductTable(obj) {
  
  // make a change
  const rows = [];
  let lastCategory = null;

  obj.products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        obj.filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (obj.inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar(obj) {
  return (
    <form>
      <input type="text" placeholder="Search..." value={obj.filterText} onChange={(e)=>obj.onFilterTextChange(e.target.value)}/>
      <label>
        <input type="checkbox" checked={obj.inStockOnly} onChange={(e)=>obj.onInStockOnlyChange(e.target.cheked)}/>
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable(obj) {
  const [filterText,setFilterText]=useState('');
  const [inStockOnly,setInStockOnly]=useState(false);
  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}/>
      <ProductTable filterText={filterText} inStockOnly={inStockOnly} products={obj.products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}