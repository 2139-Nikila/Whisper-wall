import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import StoryCard from "../components/StoryCard";
import "../styles/feed.css";

function Feed() {

  const [stories, setStories] = useState([]);

  useEffect(() => {

    fetchStories();

  }, []);


  const fetchStories = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/stories"
      );

      if (!response.ok) {

        throw new Error(
          "Failed to fetch stories"
        );

      }

      const data = await response.json();

      setStories(data);

    } catch (error) {

      console.error(
        "Error fetching stories:",
        error
      );

    }

  };


  return (

    <PageContainer>

      <div className="feed-page">

        <h1>Story Feed</h1>

        {
          stories.length === 0 ? (

            <p>
              No stories yet. Be the first to share your story.
            </p>

          ) : (

            stories.map((story) => (

              <StoryCard
                key={story.id}
                story={story}
              />

            ))

          )
        }

      </div>

    </PageContainer>

  );

}

export default Feed;