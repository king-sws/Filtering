import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

 

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error, e.g., display an error message to the user
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle errors gracefully (e.g., display an error message to the user)
    }
  };
 

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    // (selectedCategory === '' || product.category === selectedCategory)
    product.category.includes(selectedCategory)
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>

      <div className="mb-4">
        <label htmlFor="categorySelect">Filter by Category:</label>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border ml-5 border-gray-300 p-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category}  value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className='bg-zinc-700/10' >
          <tr>
            <th className="py-4 px-6 text-left">ID</th>
            <th className="py-4 px-6 text-left">Title</th>
            <th className="py-4 px-6 text-right">Price</th>
            <th className="py-4 px-6 text-left">Description</th>
            <th className="py-4 px-6 text-left">Category</th>
            <th className="py-4 px-6 text-center">Image</th>
            <th className="py-4 px-6 text-center">Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-4 px-6 text-left">{product.id}</td>
              <td className="py-4 px-6 text-left">{product.title}</td>
              <td className="py-4 px-6 text-right">{product.price}</td>
              <td className="py-4 px-6 text-left">{product.description}</td>
              <td className="py-4 px-6 text-left">{product.category}</td>
              <td className="py-4 px-6 text-center">
                <img className="w-20 h-20 rounded-full object-cover" src={product.image} alt={product.title} />
              </td>
              <td className="py-4 px-6 text-center">{product.rating.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 );
}

export default App;