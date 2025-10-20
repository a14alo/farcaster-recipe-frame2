import React, { useEffect, useState } from "react";

export default function App() {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.thecookierookie.com/category/main-courses/"));
        const data = await res.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");
        const links = Array.from(doc.querySelectorAll("a")).filter(a => a.href.includes("/recipe/"));
        const random = links[Math.floor(Math.random() * links.length)];
        setRecipe({ title: random.textContent.trim(), url: random.href });
      } catch (e) {
        console.error(e);
      }
    }
    fetchRecipe();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center", fontFamily: "sans-serif" }}>
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
