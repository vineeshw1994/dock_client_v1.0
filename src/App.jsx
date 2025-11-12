import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://api.genzcodershub.com/api/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <h2>Loading users...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Directory</h1>
      <div style={styles.grid}>
        {users.map((user) => (
          <div key={user.id} style={styles.card}>
            <div style={styles.avatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 style={styles.name}>{user.name}</h3>
            <p style={styles.email}>{user.email}</p>
            <span style={styles.id}>ID: {user.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Inline Styles (Clean & Beautiful)
const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "30px",
    fontSize: "2.5rem",
    fontWeight: "700",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    padding: "0 10px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    textAlign: "center",
    cursor: "pointer",
    border: "1px solid #e0e0e0",
  },
  // Hover effect
  cardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 35px rgba(0,0,0,0.15)",
  },
  avatar: {
    width: "70px",
    height: "70px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 auto 16px",
  },
  name: {
    margin: "0 0 8px",
    fontSize: "1.4rem",
    color: "#2c3e50",
    fontWeight: "600",
  },
  email: {
    margin: "0 0 12px",
    color: "#7f8c8d",
    fontSize: "1rem",
    wordBreak: "break-word",
  },
  id: {
    fontSize: "0.85rem",
    color: "#95a5a6",
    background: "#ecf0f1",
    padding: "4px 12px",
    borderRadius: "20px",
    display: "inline-block",
  },
};

// Add hover effect with JS (since inline styles don't support :hover)
document.querySelectorAll('[data-card]').forEach(card => {
  card.addEventListener('mouseenter', () => {
    Object.assign(card.style, styles.cardHover);
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = styles.card.boxShadow;
  });
});

export default App;