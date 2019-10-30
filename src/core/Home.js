import React from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
    const [productsBySell, setProductsBySell] = React.useState([]);
    const [productsByArrival, setProductsByArrival] = React.useState([]);
    const [error, setError] = React.useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    React.useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
      <Layout
        title="Home Page"
        description=""
        className="container"
    >
          <Search />
        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
            {productsByArrival.map((product, i) => (
              <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
            ))}
        </div>

        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
            {productsBySell.map((product, i) => (
              <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
            ))}
        </div>
    </Layout>
    );
};

export default Home;
