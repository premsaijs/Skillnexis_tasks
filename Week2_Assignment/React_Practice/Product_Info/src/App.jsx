import ProductCard from './components/ProductCard';
import './App.css';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 59.99,
    description: 'Over-ear wireless headphones with noise cancellation.',
    inStock: true,
    imageUrl: 'https://via.placeholder.com/300x200?text=Headphones'
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    price: 89.5,
    description: 'RGB backlit mechanical keyboard with blue switches.',
    inStock: false,
    imageUrl: 'https://via.placeholder.com/300x200?text=Keyboard'
  },
  {
    id: 3,
    name: 'USB-C Hub',
    price: 24.0,
    description: '7-in-1 USB-C hub with HDMI and card reader.',
    inStock: true,
    imageUrl: 'https://via.placeholder.com/300x200?text=USB-C+Hub'
  }
];

function App() {
  return (
    <div className="app">
      <h1>Product Information</h1>
      <p className="app-subtitle">Exercise 1 - a reusable component that shows product info using props.</p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            inStock={product.inStock}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
