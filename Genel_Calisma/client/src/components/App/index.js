import { Routes, Route } from "react-router-dom";
import { Row, Col } from "antd";
import styles from "./styles.module.css";

// Pages
import Home from "pages/Home/index";
import NewEvent from "pages/NewEvent/index";
import Post from "pages/Location/index";
import HeaderMenu from "components/HeaderMenu/index";
import UserCounter from "components/UserCounter";
import EventCounter from "components/EventCounter";

function App() {
  return (
    <div className="App">
      <Row justify={"center"}>
        <Col span={14} className={styles.col}>
          <Row>
            <Col span={18}>
              <HeaderMenu />
            </Col>
            <Col span={6}>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "flex-end",
                }}
              >
                <UserCounter />
                <EventCounter />
              </div>
            </Col>
          </Row>
          <div className={styles.content}>
            <Routes>
              <Route path="/new" element={<NewEvent />} />
              <Route path="/location/:_id" element={<Post />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
