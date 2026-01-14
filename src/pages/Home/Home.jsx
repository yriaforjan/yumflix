import Hero from "../../components/recipes/Hero/Hero";
import Row from "../../components/recipes/Row/Row";

const Home = () => {
  return (
    <main className="home-page">
      <Hero />
      <Row title="Meat Lovers" category="Beef" />
      <Row title="Sweet Treats" category="Dessert" />
      <Row title="Seafood Delights" category="Seafood" />
      <Row title="Vegetarian Options" category="Vegetarian" />
      <Row title="Pork Classics" category="Pork" />
    </main>
  );
};
export default Home;
