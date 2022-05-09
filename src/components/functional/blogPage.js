import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import PinnedPostDisplay from '../presentational/blogPage/pinnedPostDisplay';
import ForumDisplay from '../presentational/blogPage/forumDisplay';
import '../../assets/css/blogPage.css';
import { fetchAllForumPosts } from '../misc/apiRequests';

const BlogPage = ({
  user, handlePostSelect, handleLoader, handleModal,
}) => {
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [forumTopics, setForumTopics] = useState([]);

  // Populate Pinned Posts
  const populatePins = () => pinnedPosts.map(post => (
    <button type="button" key={post.id} className="bare-btn" onClick={() => handlePostSelect(post)}>
      <PinnedPostDisplay post={post} />
    </button>
  ));

  // Populate all subforums and related posts paginated by 5 posts per page
  const populateAllForums = () => forumTopics.map(forumData => (
    <ForumDisplay
      key={forumData.name}
      user={user}
      forum={forumData}
      handlePostSelect={handlePostSelect}
      postsPages={5}
    />
  ));

  // Grab all pinned Posts, and sort all other posts by forum on Component Load
  useEffect(() => {
    handleLoader(true);
    const forum = { per_page: 5, page: 1 };
    fetchAllForumPosts(forum.per_page, forum.page)
      .then(response => {
        if (response.success) {
          setPinnedPosts(response.pinned_posts.filter(post => !post.admin_only_view));
          setForumTopics(response.forums);
        }
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  }, [handleLoader, handleModal]);

  return (
    <div id="BlogPage" className="bg-main pt-1">
      <div className="container-md">
        <div className="section">
          <div className="forum-section z-2">
            <div className="header-title bg-announcement align-items-base">
              <i className="fas fa-star text-red" />
              <h3>{' Pinned Posts'}</h3>
            </div>
            <div className="pinned-section">{populatePins()}</div>
          </div>
        </div>
        <div className="section">
          <h4 className="text-grey">Forums</h4>
          {populateAllForums()}
        </div>
      </div>
    </div>
  );
};

BlogPage.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  handlePostSelect: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
};

export default BlogPage;
