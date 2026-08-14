import PropTypes from 'prop-types';

// simple reusable component - just displays product info passed in via props
function ProductCard({ name, price, description, inStock, imageUrl }) {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-card__image" />
      <div className="product-card__body">
        <h2 className="product-card__name">{name}</h2>
        <p className="product-card__description">{description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">${price.toFixed(2)}</span>
          <span className={`product-card__stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string,
  inStock: PropTypes.bool,
  imageUrl: PropTypes.string
};

ProductCard.defaultProps = {
  description: 'No description available.',
  inStock: true,
  imageUrl: 'https://via.placeholder.com/300x200?text=Product'
};

export default ProductCard;
