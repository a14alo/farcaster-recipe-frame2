import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent("https://www.thecookierookie.com/category/main-courses/")
        );
        const data = await res.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");
        const links = Array.from(doc.querySelectorAll("a")).filter(a =>
          a.href.includes("/recipe/")
        );
        const random = links[Math.floor(Math.random() * links.length)];
        setRecipe({ title: random.textContent.trim(), url: random.href });
      } catch (e) {
        console.error(e);
      }
    }
    fetchRecipe();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <h1>🍳 Daily Recipe Suggestion</h1>
      {recipe ? (
        <>
          <p>{recipe.title}</p>
          <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
        </>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
}

// Render to root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
