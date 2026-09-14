import { useState } from "react";
import PageContainer from "../components/PageContainer";

function CreateStory() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/stories",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            title,
            content
          })
        }
      );

      const message = await response.text();

      if (!response.ok) {
        throw new Error(message);
      }

      alert(message);

      setTitle("");
      setContent("");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <PageContainer>
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1>Create Story</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          rows="10"
          placeholder="Tell your story..."
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Post Story
        </button>

      </form>
    </div>
    </PageContainer>
  );
}

export default CreateStory;