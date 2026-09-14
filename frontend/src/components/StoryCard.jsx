import { motion } from "framer-motion";

import {
  FaRegComment,
  FaRegHeart,
  FaRegBookmark,
  FaBookmark,
  FaThumbsDown
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/storyCard.css";


function StoryCard({ story }) {

  const navigate = useNavigate();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [voting, setVoting] = useState(false);

  /* =====================================================
     BOOKMARK STATE
  ===================================================== */

  const [saved, setSaved] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);


  /*
   * reaction:
   * null      = no animation
   * "like"    = heart animation
   * "dislike" = sad animation
   */

  const [reaction, setReaction] = useState(null);


  /*
   * Changes every time a reaction happens.
   * This forces Framer Motion to start a fresh animation.
   */

  const [reactionKey, setReactionKey] = useState(0);


  /* =====================================================
     FETCH LIKE / DISLIKE COUNTS
  ===================================================== */

  useEffect(() => {

    fetchVoteCounts();

  }, [story.id]);


  const fetchVoteCounts = async () => {

    try {

      const token =
        localStorage.getItem("token");


      if (!token) {

        console.log(
          "No login token found. Vote counts cannot be loaded."
        );

        return;

      }


      const [likesResponse, dislikesResponse] =
        await Promise.all([

          fetch(
            `http://localhost:8080/api/votes/${story.id}/likes`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),

          fetch(
            `http://localhost:8080/api/votes/${story.id}/dislikes`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

        ]);


      if (
        !likesResponse.ok ||
        !dislikesResponse.ok
      ) {

        throw new Error(
          "Failed to fetch vote counts"
        );

      }


      const likesData =
        await likesResponse.json();

      const dislikesData =
        await dislikesResponse.json();


      setLikes(likesData);

      setDislikes(dislikesData);


    } catch (error) {

      console.error(
        "Error fetching votes:",
        error
      );

    }

  };


  /* =====================================================
     FETCH BOOKMARK STATUS
  ===================================================== */

  useEffect(() => {

    fetchBookmarkStatus();

  }, [story.id]);


  const fetchBookmarkStatus = async () => {

    try {

      const token =
        localStorage.getItem("token");


      if (!token) {

        setSaved(false);

        return;

      }


      const response = await fetch(
        "http://localhost:8080/api/bookmarks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      if (!response.ok) {

        throw new Error(
          "Unable to fetch bookmarks"
        );

      }


      const bookmarks =
        await response.json();


      const isSaved =
        bookmarks.some(
          bookmark =>
            bookmark.storyId === story.id
        );


      setSaved(isSaved);


    } catch (error) {

      console.error(
        "Error fetching bookmark status:",
        error
      );

    }

  };


  /* =====================================================
     HANDLE BOOKMARK
  ===================================================== */

  const handleBookmark = async (e) => {

    e.stopPropagation();


    const token =
      localStorage.getItem("token");


    if (!token) {

      alert(
        "Please login to save stories."
      );

      return;

    }


    try {

      setBookmarkLoading(true);


      /* =================================================
         REMOVE BOOKMARK
      ================================================= */

      if (saved) {

        const response = await fetch(

          `http://localhost:8080/api/bookmarks/${story.id}`,

          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );


        const message =
          await response.text();


        if (!response.ok) {

          throw new Error(
            message ||
            "Unable to remove bookmark."
          );

        }


        setSaved(false);

      }


      /* =================================================
         ADD BOOKMARK
      ================================================= */

      else {

        const response = await fetch(

          `http://localhost:8080/api/bookmarks/${story.id}`,

          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );


        const message =
          await response.text();


        if (!response.ok) {

          throw new Error(
            message ||
            "Unable to save story."
          );

        }


        setSaved(true);

      }


    } catch (error) {

      console.error(
        "Bookmark error:",
        error
      );


      alert(
        error.message ||
        "Something went wrong while saving the story."
      );


    } finally {

      setBookmarkLoading(false);

    }

  };


  /* =====================================================
     SHOW REACTION
  ===================================================== */

  const showReaction = (type) => {

    /*
     * Remove any previous animation first.
     */

    setReaction(null);


    /*
     * Give React a new animation key.
     */

    setReactionKey(
      previousKey => previousKey + 1
    );


    /*
     * Start the new animation.
     */

    setTimeout(() => {

      setReaction(type);

    }, 10);


    /*
     * Remove the animation after 1.3 seconds.
     */

    setTimeout(() => {

      setReaction(null);

    }, 1350);

  };


  /* =====================================================
     HANDLE LIKE / DISLIKE
  ===================================================== */

  const handleVote = async (voteType) => {

    const token =
      localStorage.getItem("token");


    if (!token) {

      alert(
        "Please login to vote on stories."
      );

      return;

    }


    try {

      setVoting(true);


      const response = await fetch(

        `http://localhost:8080/api/votes/${story.id}`,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            "Authorization":
              `Bearer ${token}`

          },

          body: JSON.stringify({

            voteType: voteType

          })

        }

      );


      const message =
        await response.text();


      if (!response.ok) {

        throw new Error(
          message ||
          "Unable to submit your vote."
        );

      }


      /*
       * Refresh the database counts.
       */

      await fetchVoteCounts();


      /*
       * Only show the animation after
       * the backend successfully accepts
       * the vote.
       */

      showReaction(
        voteType === "LIKE"
          ? "like"
          : "dislike"
      );


    } catch (error) {

      console.error(
        "Voting error:",
        error
      );


      alert(
        error.message ||
        "Something went wrong while voting."
      );


    } finally {

      setVoting(false);

    }

  };


  /* =====================================================
     STORY CARD
  ===================================================== */

  return (

    <motion.article

      className="story-card"

      onClick={() =>
        navigate(`/story/${story.id}`)
      }


      initial={{
        opacity: 0,
        y: 25
      }}


      animate={{
        opacity: 1,
        y: 0
      }}


      transition={{
        duration: 0.5
      }}


      whileHover={{
        y: -5
      }}

    >


      {/* =================================================
          STORY HEADER
      ================================================= */}

      <div className="story-card-header">

        <span className="story-anonymous-name">

          ✦ {story.anonymousName}

        </span>


        <span className="story-date">

          {
            new Date(
              story.createdAt
            ).toLocaleDateString()
          }

        </span>

      </div>


      {/* =================================================
          STORY TITLE
      ================================================= */}

      <h2 className="story-title">

        {story.title}

      </h2>


      {/* =================================================
          STORY CONTENT
      ================================================= */}

      <p className="story-content">

        {story.content}

      </p>


      {/* =================================================
          STORY ACTIONS
      ================================================= */}

      <div className="story-actions">


        {/* =================================================
            LIKE BUTTON + HEART ANIMATION
        ================================================= */}

        <div className="reaction-anchor">


          {reaction === "like" && (

            <div
              className="reaction-animation"
              key={reactionKey}
            >

              <motion.span
                className="reaction-heart heart-1"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.3, 1, 0.5],
                  x: [0, -12, -28, -40],
                  y: [0, -35, -75, -120],
                  rotate: [0, -10, -25, -40]
                }}
                transition={{
                  duration: 1.25,
                  ease: "easeOut"
                }}
              >
                ❤️
              </motion.span>


              <motion.span
                className="reaction-heart heart-2"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.4, 1, 0.5],
                  x: [0, 5, 15, 25],
                  y: [0, -45, -90, -140],
                  rotate: [0, 8, 20, 35]
                }}
                transition={{
                  duration: 1.3,
                  delay: 0.04,
                  ease: "easeOut"
                }}
              >
                💖
              </motion.span>


              <motion.span
                className="reaction-heart heart-3"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.2, 1, 0.5],
                  x: [0, -3, 8, 18],
                  y: [0, -55, -105, -155],
                  rotate: [0, -5, 10, 25]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.08,
                  ease: "easeOut"
                }}
              >
                💕
              </motion.span>


              <motion.span
                className="reaction-heart heart-4"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.3, 1, 0.5],
                  x: [0, 18, 35, 55],
                  y: [0, -30, -80, -125],
                  rotate: [0, 12, 25, 40]
                }}
                transition={{
                  duration: 1.25,
                  delay: 0.12,
                  ease: "easeOut"
                }}
              >
                💗
              </motion.span>


              <motion.span
                className="reaction-heart heart-5"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.1, 1, 0.4],
                  x: [0, 25, 45, 70],
                  y: [0, -50, -100, -145],
                  rotate: [0, 15, 30, 50]
                }}
                transition={{
                  duration: 1.25,
                  delay: 0.15,
                  ease: "easeOut"
                }}
              >
                ✨
              </motion.span>

            </div>

          )}


          <button

            className="story-action"

            disabled={voting}

            onClick={(e) => {

              e.stopPropagation();

              handleVote("LIKE");

            }}

          >

            <FaRegHeart />

            <span>
              {likes}
            </span>

          </button>


        </div>


        {/* =================================================
            DISLIKE BUTTON + SAD ANIMATION
        ================================================= */}

        <div className="reaction-anchor">


          {reaction === "dislike" && (

            <div
              className="reaction-animation dislike-animation"
              key={reactionKey}
            >

              <motion.span
                className="reaction-sad"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.2, 1, 0.5],
                  x: [0, -15, -30, -40],
                  y: [0, -30, -70, -110],
                  rotate: [0, -10, -20, -30]
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut"
                }}
              >
                😢
              </motion.span>


              <motion.span
                className="reaction-sad"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.2, 1, 0.5],
                  x: [0, 5, 18, 30],
                  y: [0, -40, -80, -125],
                  rotate: [0, 10, 20, 30]
                }}
                transition={{
                  duration: 1.25,
                  delay: 0.05,
                  ease: "easeOut"
                }}
              >
                😔
              </motion.span>


              <motion.span
                className="reaction-sad"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.3, 1, 0.5],
                  x: [0, 10, -5, -20],
                  y: [0, -50, -95, -140],
                  rotate: [0, -5, 10, 20]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.08,
                  ease: "easeOut"
                }}
              >
                💔
              </motion.span>


              <motion.span
                className="reaction-sad"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.15, 1, 0.5],
                  x: [0, 20, 35, 50],
                  y: [0, -35, -75, -120],
                  rotate: [0, 8, 20, 35]
                }}
                transition={{
                  duration: 1.25,
                  delay: 0.1,
                  ease: "easeOut"
                }}
              >
                💧
              </motion.span>

            </div>

          )}


          <button

            className="story-action"

            disabled={voting}

            onClick={(e) => {

              e.stopPropagation();

              handleVote("DISLIKE");

            }}

          >

            <FaThumbsDown />

            <span>
              {dislikes}
            </span>

          </button>


        </div>


        {/* =================================================
            COMMENT
        ================================================= */}

        <button

          className="story-action"

          onClick={(e) => {

            e.stopPropagation();

            navigate(`/story/${story.id}`);

          }}

        >

          <FaRegComment />

          <span>
            Comment
          </span>

        </button>


        {/* =================================================
            SAVE
        ================================================= */}

        <button

          className={`story-action ${
            saved ? "saved-action" : ""
          }`}

          disabled={bookmarkLoading}

          onClick={handleBookmark}

        >

          {saved
            ? <FaBookmark />
            : <FaRegBookmark />
          }


          <span>

            {bookmarkLoading
              ? "Saving..."
              : saved
                ? "Saved"
                : "Save"
            }

          </span>

        </button>


      </div>

    </motion.article>

  );

}


export default StoryCard;