const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let resBlog;
    let maxLikes = 0;
    Object.values(blogs).forEach((blog) => {
        if (blog.likes > maxLikes) {
            resBlog = blog;
            maxLikes = blog.likes;
        }
    });
    return resBlog;
}

const mostBlogs = (blogs) => {
    let authorBlogCountMap={};
    Object.values(blogs).forEach((blog) => {
        if (!Object.keys(authorBlogCountMap).includes(blog.author)) {
            authorBlogCountMap[blog.author] = 1;
        } else {
            authorBlogCountMap[blog.author] += 1;
        }
    })
    let resAuthor;
    let maxBlogCount=0;
    Object.keys(authorBlogCountMap).forEach((author) => {
        if(authorBlogCountMap[author]>maxBlogCount){
            maxBlogCount=authorBlogCountMap[author];
            resAuthor=author;
        }
    })
    return {author:resAuthor,blogs:maxBlogCount};
    
}

const mostLikes = (blogs) => {
    let authorBlogLikesMap={};
    Object.values(blogs).forEach((blog) => {
        if (!Object.keys(authorBlogLikesMap).includes(blog.author)) {
            authorBlogLikesMap[blog.author] = blog.likes;
        } else {
            authorBlogLikesMap[blog.author] += blog.likes;
        }
    })
    let resAuthor;
    let maxBlogLikes=0;
    Object.keys(authorBlogLikesMap).forEach((author) => {
        if(authorBlogLikesMap[author]>maxBlogLikes){
            maxBlogLikes=authorBlogLikesMap[author];
            resAuthor=author;
        }
    })
    return {author:resAuthor,likes:maxBlogLikes};
    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}