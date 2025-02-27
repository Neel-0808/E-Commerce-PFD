import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchCartItems();
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/cart/${userId}`);
      console.log("Fetched Cart Items:", response.data);
      setCartItems(response.data);
    } catch (error) {
      setError("Failed to fetch cart items");
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      if (quantity < 1) return;
      await axios.put(`http://127.0.0.1:8000/cart/${userId}/${itemId}?quantity=${quantity}`);
      fetchCartItems();
    } catch (error) {
      setError("Failed to update item quantity");
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/cart/${userId}/${itemId}`);
      fetchCartItems();
    } catch (error) {
      setError("Failed to remove item from cart");
      console.error("Error removing cart item:", error);
    }
  };

  const handleCheckout = () => {
    alert("Checkout process initiated!");
  };

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>₹{item.product?.price ?? 0}</td>
                  <td>₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <button className="btn btn-success" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
