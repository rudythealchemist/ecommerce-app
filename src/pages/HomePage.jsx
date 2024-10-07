import Auth from '../components/Auth';
const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>

      <Auth />
      {/* <ProductList /> */}
    </div>
  );
};

export default HomePage;
