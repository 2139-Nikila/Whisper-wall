import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageContainer from "../components/PageContainer";

import {
    FaArrowLeft,
    FaRegComment,
    FaRegHeart,
    FaRegBookmark,
    FaBookmark,
    FaThumbsDown,
    FaHeart
} from "react-icons/fa";

import "../styles/storyDetails.css";


function StoryDetails() {

    const { id } = useParams();
    const navigate = useNavigate();


    /* =====================================================
       STORY STATE
    ===================================================== */

    const [story, setStory] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    /* =====================================================
       COMMENT STATE
    ===================================================== */

    const [comments, setComments] = useState([]);

    const [commentText, setCommentText] = useState("");

    const [commentsLoading, setCommentsLoading] = useState(true);

    const [commentSubmitting, setCommentSubmitting] = useState(false);

    const [commentError, setCommentError] = useState("");


    /* =====================================================
       VOTE STATE
    ===================================================== */

    const [likes, setLikes] = useState(0);

    const [dislikes, setDislikes] = useState(0);

    const [voting, setVoting] = useState(false);


    /* =====================================================
       BOOKMARK STATE
    ===================================================== */

    const [saved, setSaved] = useState(false);

    const [bookmarkLoading, setBookmarkLoading] = useState(false);


    /* =====================================================
       FETCH STORY
    ===================================================== */

    useEffect(() => {

        const fetchStory = async () => {

            try {

                const response = await fetch(
                    `http://localhost:8080/api/stories/${id}`
                );


                if (!response.ok) {

                    throw new Error(
                        "Story not found"
                    );

                }


                const data =
                    await response.json();


                setStory(data);


            } catch (error) {

                console.error(
                    "Error fetching story:",
                    error
                );


                setError(
                    "Unable to load this story."
                );


            } finally {

                setLoading(false);

            }

        };


        fetchStory();

    }, [id]);


    /* =====================================================
       FETCH COMMENTS
    ===================================================== */

    useEffect(() => {

        const fetchComments = async () => {

            try {

                setCommentsLoading(true);

                setCommentError("");


                const token =
                    localStorage.getItem("token");


                const response = await fetch(

                    `http://localhost:8080/api/comments/${id}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );


                if (!response.ok) {

                    throw new Error(
                        "Unable to load comments"
                    );

                }


                const data =
                    await response.json();


                setComments(data);


            } catch (error) {

                console.error(
                    "Error fetching comments:",
                    error
                );


                setCommentError(
                    "Unable to load comments."
                );


            } finally {

                setCommentsLoading(false);

            }

        };


        fetchComments();

    }, [id]);


    /* =====================================================
       FETCH LIKE / DISLIKE COUNTS
    ===================================================== */

    useEffect(() => {

        fetchVoteCounts();

    }, [id]);


    const fetchVoteCounts = async () => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                return;

            }


            const [
                likesResponse,
                dislikesResponse
            ] = await Promise.all([

                fetch(
                    `http://localhost:8080/api/votes/${id}/likes`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                ),

                fetch(
                    `http://localhost:8080/api/votes/${id}/dislikes`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                )

            ]);


            if (
                !likesResponse.ok ||
                !dislikesResponse.ok
            ) {

                throw new Error(
                    "Unable to fetch vote counts"
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

    }, [id]);


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
                        Authorization:
                            `Bearer ${token}`
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
                        bookmark.storyId === Number(id)
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

                `http://localhost:8080/api/votes/${id}`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        voteType:
                            voteType

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


            await fetchVoteCounts();


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
       HANDLE BOOKMARK
    ===================================================== */

    const handleBookmark = async () => {

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


            if (saved) {

                /* =========================================
                   REMOVE BOOKMARK
                ========================================= */

                const response = await fetch(

                    `http://localhost:8080/api/bookmarks/${id}`,

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


            } else {

                /* =========================================
                   ADD BOOKMARK
                ========================================= */

                const response = await fetch(

                    `http://localhost:8080/api/bookmarks/${id}`,

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
       ADD COMMENT
    ===================================================== */

    const handleAddComment = async (e) => {

        e.preventDefault();


        const token =
            localStorage.getItem("token");


        if (!token) {

            alert(
                "Please login to comment on stories."
            );

            return;

        }


        const trimmedComment =
            commentText.trim();


        if (!trimmedComment) {

            setCommentError(
                "Please write a comment first."
            );

            return;

        }


        try {

            setCommentSubmitting(true);

            setCommentError("");


            const response = await fetch(

                `http://localhost:8080/api/comments/${id}`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        content:
                            trimmedComment

                    })

                }

            );


            const message =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    message ||
                    "Unable to add comment."
                );

            }


            /* =============================================
               REFRESH COMMENTS
            ============================================= */

            const commentsResponse =
                await fetch(

                    `http://localhost:8080/api/comments/${id}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );


            if (!commentsResponse.ok) {

                throw new Error(
                    "Comment added, but comments could not be refreshed."
                );

            }


            const updatedComments =
                await commentsResponse.json();


            setComments(updatedComments);

            setCommentText("");


        } catch (error) {

            console.error(
                "Error adding comment:",
                error
            );


            setCommentError(
                error.message ||
                "Unable to add comment."
            );


        } finally {

            setCommentSubmitting(false);

        }

    };


    /* =====================================================
       DELETE COMMENT
    ===================================================== */

    const handleDeleteComment = async (commentId) => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            alert(
                "Please login to delete your comment."
            );

            return;

        }


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this comment?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            const response = await fetch(

                `http://localhost:8080/api/comments/${commentId}`,

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
                    "Unable to delete comment."
                );

            }


            setComments(
                previousComments =>
                    previousComments.filter(
                        comment =>
                            comment.id !== commentId
                    )
            );


        } catch (error) {

            console.error(
                "Error deleting comment:",
                error
            );


            alert(
                error.message ||
                "Unable to delete comment."
            );

        }

    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <PageContainer>

                <div className="story-details-page">

                    <p>
                        Loading story...
                    </p>

                </div>

            </PageContainer>

        );

    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (error || !story) {

        return (

            <PageContainer>

                <div className="story-details-page">

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/feed")
                        }
                    >

                        <FaArrowLeft />

                        Back to Feed

                    </button>


                    <h2>
                        {error ||
                            "Story not found"}
                    </h2>

                </div>

            </PageContainer>

        );

    }


    /* =====================================================
       MAIN UI
    ===================================================== */

    return (

        <PageContainer>

            <div className="story-details-page">


                {/* BACK BUTTON */}

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/feed")
                    }
                >

                    <FaArrowLeft />

                    Back to Feed

                </button>


                {/* =================================================
                    STORY CARD
                ================================================= */}

                <article className="story-details-card">


                    {/* HEADER */}

                    <div className="story-details-header">

                        <span className="story-details-author">

                            ✦ {story.anonymousName}

                        </span>


                        <span className="story-details-date">

                            {
                                new Date(
                                    story.createdAt
                                ).toLocaleDateString()
                            }

                        </span>

                    </div>


                    {/* TITLE */}

                    <h1 className="story-details-title">

                        {story.title}

                    </h1>


                    {/* CONTENT */}

                    <p className="story-details-content">

                        {story.content}

                    </p>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="story-details-actions">


                        {/* LIKE */}

                        <button
                            className="story-action"
                            disabled={voting}
                            onClick={() =>
                                handleVote("LIKE")
                            }
                        >

                            {likes > 0
                                ? <FaHeart />
                                : <FaRegHeart />
                            }

                            <span>
                                {likes}
                            </span>

                        </button>


                        {/* DISLIKE */}

                        <button
                            className="story-action"
                            disabled={voting}
                            onClick={() =>
                                handleVote("DISLIKE")
                            }
                        >

                            <FaThumbsDown />

                            <span>
                                {dislikes}
                            </span>

                        </button>


                        {/* COMMENTS */}

                        <button
                            className="story-action"
                            onClick={() => {

                                document
                                    .querySelector(
                                        ".comments-section"
                                    )
                                    ?.scrollIntoView({
                                        behavior:
                                            "smooth"
                                    });

                            }}
                        >

                            <FaRegComment />

                            <span>
                                {comments.length} Comments
                            </span>

                        </button>


                        {/* SAVE */}

                        <button
                            className={`story-action ${
                                saved
                                    ? "saved-action"
                                    : ""
                            }`}
                            disabled={
                                bookmarkLoading
                            }
                            onClick={
                                handleBookmark
                            }
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

                </article>


                {/* =================================================
                    COMMENTS
                ================================================= */}

                <section className="comments-section">


                    {/* HEADER */}

                    <div className="comments-header">

                        <h2>
                            💬 Comments
                        </h2>


                        <span>
                            {comments.length}
                        </span>

                    </div>


                    {/* COMMENT FORM */}

                    <form
                        className="comment-form"
                        onSubmit={
                            handleAddComment
                        }
                    >

                        <textarea
                            value={commentText}
                            onChange={(e) =>
                                setCommentText(
                                    e.target.value
                                )
                            }
                            placeholder="Share your thoughts..."
                            rows="3"
                            maxLength="500"
                            disabled={
                                commentSubmitting
                            }
                        />


                        <div className="comment-form-bottom">

                            <span>
                                {commentText.length}/500
                            </span>


                            <button
                                type="submit"
                                disabled={
                                    commentSubmitting ||
                                    !commentText.trim()
                                }
                            >

                                {commentSubmitting
                                    ? "Posting..."
                                    : "Post Comment"}

                            </button>

                        </div>

                    </form>


                    {/* COMMENT ERROR */}

                    {commentError && (

                        <p className="comment-error">

                            {commentError}

                        </p>

                    )}


                    {/* COMMENTS LIST */}

                    <div className="comments-list">


                        {commentsLoading ? (

                            <p className="comments-message">

                                Loading comments...

                            </p>

                        ) : comments.length === 0 ? (

                            <div className="comments-empty">

                                <span>
                                    💭
                                </span>

                                <h3>
                                    No comments yet
                                </h3>

                                <p>
                                    Be the first to share
                                    your thoughts.
                                </p>

                            </div>

                        ) : (

                            comments.map(
                                (comment) => (

                                    <article
                                        className="comment-card"
                                        key={comment.id}
                                    >

                                        <div className="comment-card-header">

                                            <div className="comment-author">

                                                <span className="comment-avatar">
                                                    ✦
                                                </span>

                                                <span>
                                                    {
                                                        comment.anonymousName
                                                    }
                                                </span>

                                            </div>


                                            <span className="comment-date">

                                                {
                                                    new Date(
                                                        comment.createdAt
                                                    ).toLocaleDateString()
                                                }

                                            </span>

                                        </div>


                                        <p className="comment-content">

                                            {
                                                comment.content
                                            }

                                        </p>


                                        <button
                                            className="delete-comment-button"
                                            onClick={() =>
                                                handleDeleteComment(
                                                    comment.id
                                                )
                                            }
                                        >

                                            🗑 Delete

                                        </button>

                                    </article>

                                )
                            )

                        )}

                    </div>

                </section>

            </div>

        </PageContainer>

    );

}


export default StoryDetails;