function ProductCard({ item }) {
  return (
    <div className="card">
      <h2>{item.name}</h2>

      <p className="product-description">{item.description}</p>

      <div className="card-footer">
        <p className="product-category">{item.category}</p>

        <p className="product-price">${item.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
