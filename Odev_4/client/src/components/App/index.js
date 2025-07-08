import { Routes, Route } from "react-router-dom";
import { Row, Col } from "antd";
import styles from "./styles.module.css";

// Pages
import Home from "pages/Home/index";
import NewLocation from "pages/NewLocation/index";
import Post from "pages/Location/index";
import HeaderMenu from "./HeaderMenu";

function App() {
  return (
    <div className="App">
      <Row justify={"center"}>
        <Col span={14} className={styles.col}>
          <HeaderMenu/>
          <div className={styles.content}>
            <Routes>
              <Route path="/new" element={<NewLocation />} />
              <Route path="/location/:id" element={<Post />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
