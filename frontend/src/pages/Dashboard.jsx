import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import PageContainer from "../components/PageContainer";
function Dashboard() {

  const navigate = useNavigate();

  return (
    <PageContainer>

    <div className="dashboard-page">

      <motion.div
        className="dashboard-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >

        <h1>
          Welcome Back ✨
        </h1>

        <p>
          What would you like to do today?
        </p>

        <div className="dashboard-grid">

          <button
            onClick={() =>
              navigate("/create-story")
            }
          >
            ✍️ Tell Your Story
          </button>

          

          <button
            onClick={() =>
              navigate("/stories")
            }
          >
            📖 Read Stories
          </button>

          <button
            onClick={() =>
              navigate("/profile")
            }
          >
            👤 Profile
          </button>

          <button
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              navigate("/login");
            }}
          >
            🚪 Logout
          </button>

        </div>

      </motion.div>

    </div>
    </PageContainer>

  );

}

export default Dashboard;