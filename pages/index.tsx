import type { NextPage } from "next";
import { HelperLinks } from "src/common/HelperLinks";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        Hello World!
        <br />
        <br />
        <HelperLinks />
      </main>
    </div>
  );
};

export default Home;
