import React from "react";
import Layout from "../../components/layout";
import { Jumbotron} from "react-bootstrap";

const Home = (props) => {
  return (
    <Layout sidebar>
      <Jumbotron
        style={{ margin: "5rem", background: "#fff" }}
        className="text-center"
      >
        <h1>Admin Dashboard</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          quisquam nemo similique soluta maxime debitis rerum earum esse nisi
          dolores rem, necessitatibus in, obcaecati non fugit! Eos minima Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Numquam quisquam
          nemo similique soluta maxime debitis rerum earum esse nisi dolores
          rem, necessitatibus in, obcaecati non fugit! Eos minima mLorem ipsum
          dolor sit amet consectetur adipisicing elit. Numquam quisquam nemo
          similique soluta maxime debitis rerum earum esse nisi dolores rem,
          necessitatibus in, obcaecati non fugit! Eos minima mLorem ipsum dolor
          sit amet consectetur adipisicing elit. Numquam quisquam nemo similique
          soluta maxime debitis rerum earum esse nisi dolores rem,
          necessitatibus in, obcaecati non fugit! Eos minima mmodi ab!
        </p>
      </Jumbotron>
    </Layout>
  );
};
export default Home;
