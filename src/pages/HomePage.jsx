import Auth from '../components/Auth';
const HomePage = ({ username }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {username}!</h1>
      <Auth />
    </div>
  );
};

export default HomePage;
